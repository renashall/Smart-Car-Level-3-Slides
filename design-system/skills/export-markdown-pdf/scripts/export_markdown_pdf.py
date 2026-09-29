#!/usr/bin/env python3
"""Export one Markdown document to a themed, selectable PDF.

Usage: python export_markdown_pdf.py document.md [output.pdf]

Requires markdown-it-py, PyMuPDF, the repository's Rubik fonts, and Edge/Chrome.
The output defaults to the source path with a .pdf suffix.
"""

from __future__ import annotations

import argparse
import base64
import html
import os
from pathlib import Path
import re
import shutil
import subprocess
import tempfile
import unicodedata
from urllib.parse import unquote, urlsplit

import pymupdf
from markdown_it import MarkdownIt


DESIGN_ROOT = Path(__file__).resolve().parents[3]
COLORS_FILE = DESIGN_ROOT / "tokens" / "colors.css"
FONT_DIR = DESIGN_ROOT / "assets" / "fonts" / "Rubik"
BROWSER_CANDIDATES = (
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
)
BROWSER_NAMES = (
    "microsoft-edge", "google-chrome", "google-chrome-stable", "chromium",
    "chromium-browser", "chrome", "msedge",
)


def browser_path() -> str:
    override = os.environ.get("DECK_BROWSER")
    if override:
        candidate = Path(override).expanduser()
        found = str(candidate) if candidate.is_file() else shutil.which(override)
        if not found:
            raise RuntimeError(f"DECK_BROWSER does not identify a browser: {override}")
        return found
    for candidate in BROWSER_CANDIDATES:
        if Path(candidate).is_file():
            return candidate
    for name in BROWSER_NAMES:
        found = shutil.which(name)
        if found:
            return found
    raise RuntimeError("Edge or Chrome was not found. Set DECK_BROWSER to its executable path.")


def font_face(path: Path, style: str) -> str:
    if not path.is_file():
        raise FileNotFoundError(f"Design-system Rubik font not found: {path}")
    encoded = base64.b64encode(path.read_bytes()).decode("ascii")
    return (
        "@font-face { font-family: 'Rubik'; "
        f"font-style: {style}; font-weight: 300 900; "
        f"src: url('data:font/ttf;base64,{encoded}') format('truetype'); }}"
    )


def theme_css() -> str:
    if not COLORS_FILE.is_file():
        raise FileNotFoundError(f"Design-system colors not found: {COLORS_FILE}")
    fonts = "\n".join((
        font_face(FONT_DIR / "Rubik-VariableFont_wght.ttf", "normal"),
        font_face(FONT_DIR / "Rubik-Italic-VariableFont_wght.ttf", "italic"),
    ))
    return COLORS_FILE.read_text(encoding="utf-8") + "\n" + fonts + "\n" + r"""
@page { size: letter; margin: 0.72in 0.72in 0.7in; }
* { box-sizing: border-box; }
html { color: var(--text-body); background: #fff; }
body { margin: 0; font: 10.5pt/1.55 'Rubik', sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
main { max-width: 100%; }
h1, h2, h3, h4, h5, h6 { color: var(--text-strong); font-weight: 700; letter-spacing: -.02em; line-height: 1.2; break-after: avoid; page-break-after: avoid; }
h1 { font-size: 23pt; color: var(--brand-navy); border-bottom: 3px solid var(--brand-teal); padding: 0 0 11pt; margin: 0 0 15pt; }
h2 { font-size: 16pt; color: var(--brand-navy); margin: 24pt 0 9pt; }
h3 { font-size: 12.5pt; margin: 18pt 0 7pt; }
h4, h5, h6 { font-size: 10.5pt; margin: 14pt 0 6pt; }
p { margin: 0 0 10pt; orphans: 3; widows: 3; }
strong { color: var(--text-strong); font-weight: 700; }
em { font-style: italic; }
a { color: var(--text-link); text-decoration: underline; text-decoration-color: var(--brand-teal); text-underline-offset: 2px; overflow-wrap: anywhere; }
ul, ol { margin: 0 0 13pt; padding-left: 21pt; }
li { padding-left: 3pt; margin: 0 0 5pt; }
li::marker { color: var(--teal-600); font-weight: 700; }
li > p { margin-bottom: 4pt; }
blockquote { margin: 14pt 0; padding: 11pt 15pt; border-left: 4px solid var(--brand-teal); background: var(--teal-50); color: var(--text-body); break-inside: avoid; }
blockquote p:last-child { margin-bottom: 0; }
blockquote strong { color: var(--brand-navy); }
table { width: 100%; border-collapse: collapse; margin: 12pt 0 18pt; font-size: 8.6pt; line-height: 1.4; table-layout: auto; }
thead { display: table-header-group; }
tr { break-inside: avoid; page-break-inside: avoid; }
th { color: #fff; background: var(--brand-navy); font-weight: 700; text-align: left; white-space: nowrap; }
th, td { border: 1px solid var(--border-subtle); padding: 7pt 8pt; vertical-align: top; overflow-wrap: anywhere; }
tbody tr:nth-child(even) { background: var(--neutral-50); }
code, pre { font-family: 'JetBrains Mono', Consolas, 'Liberation Mono', monospace; }
code { color: var(--navy-800); background: var(--neutral-100); border-radius: 3px; padding: 1px 3px; font-size: .9em; }
pre { color: #fff; background: var(--surface-code); border-left: 4px solid var(--brand-teal); border-radius: 8px; padding: 12pt 14pt; margin: 12pt 0 15pt; font-size: 8.5pt; line-height: 1.45; white-space: pre-wrap; overflow-wrap: anywhere; break-inside: avoid; }
pre code { color: inherit; background: transparent; padding: 0; font-size: inherit; }
hr { border: 0; border-top: 1px solid var(--border-subtle); margin: 19pt 0; }
img { display: block; max-width: 100%; max-height: 8in; object-fit: contain; margin: 10pt auto 15pt; break-inside: avoid; }
"""


def heading_slug(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value).lower()
    normalized = "".join(char for char in normalized if not unicodedata.combining(char))
    return re.sub(r"(^-|-$)", "", re.sub(r"[^a-z0-9]+", "-", normalized)) or "section"


def local_uri(value: str, source_dir: Path, *, image: bool) -> str:
    parts = urlsplit(value)
    if parts.scheme or value.startswith("#") or value.startswith("//"):
        return value
    target = (source_dir / unquote(parts.path)).resolve()
    if image and not target.is_file():
        raise FileNotFoundError(f"Markdown image not found: {target}")
    return target.as_uri() + (f"#{parts.fragment}" if parts.fragment else "")


def markdown_html(markdown: str, source_dir: Path) -> str:
    parser = MarkdownIt("commonmark", {"html": False, "linkify": False}).enable("table")
    tokens = parser.parse(markdown)
    used_slugs: dict[str, int] = {}

    def visit(items):
        for index, token in enumerate(items):
            if token.type == "heading_open":
                inline = items[index + 1]
                title = "".join(child.content for child in (inline.children or []) if child.type in {"text", "code_inline"})
                base = heading_slug(title)
                count = used_slugs.get(base, 0)
                used_slugs[base] = count + 1
                token.attrSet("id", base if count == 0 else f"{base}-{count}")
            if token.type in {"image", "link_open"}:
                key = "src" if token.type == "image" else "href"
                current = token.attrGet(key)
                if current:
                    token.attrSet(key, local_uri(current, source_dir, image=token.type == "image"))
            if token.children:
                visit(token.children)

    visit(tokens)
    return parser.renderer.render(tokens, parser.options, {})


def render(source: Path, output: Path) -> tuple[int, int]:
    if not source.is_file() or source.suffix.lower() != ".md":
        raise ValueError(f"Input must be an existing .md file: {source}")
    if output.suffix.lower() != ".pdf":
        raise ValueError(f"Output must have a .pdf suffix: {output}")
    markdown = source.read_text(encoding="utf-8-sig")
    if not markdown.strip():
        raise ValueError(f"Markdown file is empty: {source}")
    match = re.search(r"^#\s+(.+)$", markdown, re.MULTILINE)
    title = match.group(1).strip() if match else source.stem
    content = markdown_html(markdown, source.parent)
    page = (
        "<!doctype html><html lang='en'><head><meta charset='utf-8'>"
        f"<title>{html.escape(title)}</title><style>{theme_css()}</style>"
        f"</head><body><main>{content}</main></body></html>"
    )
    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="markdown-pdf-") as work_dir:
        work = Path(work_dir)
        temp_html = work / "document.html"
        temp_pdf = work / "document.pdf"
        temp_html.write_text(page, encoding="utf-8")
        command = [
            browser_path(), "--headless=new", "--disable-gpu", "--no-sandbox",
            "--no-pdf-header-footer", "--allow-file-access-from-files",
            "--user-data-dir=" + str(work / "browser-profile"),
            "--print-to-pdf=" + str(temp_pdf), temp_html.as_uri(),
        ]
        result = subprocess.run(command, capture_output=True, text=True, timeout=90)
        if not temp_pdf.is_file() or temp_pdf.stat().st_size == 0:
            detail = (result.stderr or result.stdout).strip()[-1000:]
            raise RuntimeError(f"Browser did not create a PDF: {detail}")
        with pymupdf.open(temp_pdf) as pdf:
            pages = pdf.page_count
            links = sum(1 for item in pdf for link in item.get_links() if link.get("kind") == pymupdf.LINK_URI)
            if pages == 0:
                raise RuntimeError("Browser created an empty PDF")
        shutil.copyfile(temp_pdf, output)
    return pages, links


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("markdown", type=Path, help="Markdown .md source")
    parser.add_argument("output", nargs="?", type=Path, help="Optional output .pdf path")
    args = parser.parse_args()
    source = args.markdown.expanduser().resolve()
    output = (args.output.expanduser().resolve() if args.output else source.with_suffix(".pdf"))
    try:
        pages, links = render(source, output)
    except (OSError, ValueError, RuntimeError, subprocess.TimeoutExpired) as exc:
        parser.exit(1, f"export-markdown-pdf: {exc}\n")
    print(f"Wrote {output} (pages={pages}, web_links={links})")


if __name__ == "__main__":
    main()
