#!/usr/bin/env python3
"""Build the course's shareable PDF/PPTX bundle in the repository's Exports folder.

Usage:
    python design-system/skills/export-all/scripts/export_all.py [--quick | --full | --zip | --pdf_pptx]

Quick is the default. Full includes source Markdown. Zip includes the full bundle
and writes Exports/<repository-name>.zip. PDF/PPTX writes the four course document
PDFs at the root of Exports, with the 12 lesson deck PDFs in Exports/PDF and
the 12 lesson deck PPTXs in Exports/PPTX.
"""

from __future__ import annotations

import argparse
import os
from pathlib import Path, PurePosixPath
import re
import shutil
import subprocess
import sys
import tempfile
from zipfile import ZIP_DEFLATED, ZipFile, is_zipfile


DESIGN_ROOT = Path(__file__).resolve().parents[3]
REPO_ROOT = DESIGN_ROOT.parent
CONTENT = DESIGN_ROOT / "content"
EXPORTS = REPO_ROOT / "Exports"
MARKDOWN_EXPORTER = DESIGN_ROOT / "skills/export-markdown-pdf/scripts/export_markdown_pdf.py"
DECK_PDF_EXPORTER = DESIGN_ROOT / "skills/export-deck-pdf/scripts/export_pdf.py"
DECK_PPTX_EXPORTER = DESIGN_ROOT / "skills/export-deck-pptx-screenshot/scripts/build_pptx.py"
DOCUMENTS = (
    CONTENT / "Guide.md",
    CONTENT / "Info.md",
    CONTENT / "Organization.md",
    CONTENT / "slide-plans/Course-Outline.md",
)
LESSON_PATTERN = re.compile(r"lesson-(\d+)-.+\.md\Z")


def lesson_sources() -> list[tuple[Path, Path, Path]]:
    plans_dir = CONTENT / "slide-plans"
    decks_dir = CONTENT / "slide-decks"
    lessons = []
    for plan in plans_dir.glob("lesson-*.md"):
        match = LESSON_PATTERN.fullmatch(plan.name)
        if not match:
            raise ValueError(f"Unexpected lesson plan name: {plan}")
        number = match.group(1)
        html = decks_dir / plan.stem / f"lesson-{number}.html"
        if not html.is_file():
            raise FileNotFoundError(f"Rendered lesson deck missing: {html}")
        destination = Path("Lessons") / f"Lesson {int(number)}"
        lessons.append((plan, html, destination))
    if not lessons:
        raise FileNotFoundError(f"No lesson plans found in {plans_dir}")
    expected = {html.resolve() for _, html, _ in lessons}
    extra = {path.resolve() for path in decks_dir.glob("lesson-*/*.html")} - expected
    if extra:
        raise ValueError(f"HTML deck has no matching lesson plan: {sorted(extra)[0]}")
    return sorted(lessons, key=lambda item: int(LESSON_PATTERN.fullmatch(item[0].name).group(1)))


def preflight(mode: str = "quick") -> list[tuple[Path, Path, Path]]:
    for source in DOCUMENTS:
        if not source.is_file():
            raise FileNotFoundError(f"Required Markdown source missing: {source}")
    for helper in (MARKDOWN_EXPORTER, DECK_PDF_EXPORTER, DECK_PPTX_EXPORTER):
        if not helper.is_file():
            raise FileNotFoundError(f"Export helper missing: {helper}")
    lessons = lesson_sources()
    if mode == "pdf_pptx":
        numbers = {int(LESSON_PATTERN.fullmatch(plan.name).group(1)) for plan, _, _ in lessons}
        if len(lessons) != 12 or numbers != set(range(12)):
            raise ValueError("PDF/PPTX mode requires exactly lessons 00–11")
    return lessons


def run(helper: Path, source: Path, output: Path | None = None) -> None:
    command = [sys.executable, str(helper), str(source)]
    if output is not None:
        command.append(str(output))
    print(f"Rendering {source.name} with {helper.parent.parent.name}...", flush=True)
    subprocess.run(command, check=True)
    target = output if output is not None else source.with_suffix(".pdf")
    if not target.is_file() or target.stat().st_size == 0:
        raise RuntimeError(f"Exporter did not create a nonempty file: {target}")


def render_deck(html: Path) -> tuple[Path, Path]:
    # The PPTX helper reuses the PDF beside the HTML. Regenerate that PDF
    # first so its screenshots, link hotspots, and notes match this run.
    deck_pdf = html.with_suffix(".pdf")
    deck_pptx = html.with_suffix(".pptx")
    run(DECK_PDF_EXPORTER, html, deck_pdf)
    run(DECK_PPTX_EXPORTER, html, deck_pptx)
    if not is_zipfile(deck_pptx):
        raise RuntimeError(f"PPTX is not a valid PowerPoint package: {deck_pptx}")
    return deck_pdf, deck_pptx


def render_pdf_pptx(stage: Path, lessons: list[tuple[Path, Path, Path]]) -> None:
    for source in DOCUMENTS:
        run(MARKDOWN_EXPORTER, source, stage / f"{source.stem}.pdf")
    pdf_dir = stage / "PDF"
    pptx_dir = stage / "PPTX"
    pdf_dir.mkdir()
    pptx_dir.mkdir()
    for _, html, _ in lessons:
        deck_pdf, deck_pptx = render_deck(html)
        shutil.copy2(deck_pdf, pdf_dir / deck_pdf.name)
        shutil.copy2(deck_pptx, pptx_dir / deck_pptx.name)


def render_bundle(stage: Path, mode: str, lessons: list[tuple[Path, Path, Path]]) -> None:
    for source in DOCUMENTS:
        pdf = stage / f"{source.stem}.pdf"
        pdf.parent.mkdir(parents=True, exist_ok=True)
        run(MARKDOWN_EXPORTER, source, pdf)
        if mode != "quick":
            shutil.copy2(source, stage / source.name)

    for plan, html, relative_dir in lessons:
        target_dir = stage / relative_dir
        target_dir.mkdir(parents=True, exist_ok=True)
        run(MARKDOWN_EXPORTER, plan, target_dir / f"{plan.stem}.pdf")
        if mode != "quick":
            shutil.copy2(plan, target_dir / plan.name)

        deck_pdf, deck_pptx = render_deck(html)
        shutil.copy2(deck_pdf, target_dir / deck_pdf.name)
        shutil.copy2(deck_pptx, target_dir / deck_pptx.name)


def bundle_files(stage: Path) -> list[Path]:
    return sorted(path for path in stage.rglob("*") if path.is_file())


def make_zip(stage: Path) -> None:
    files = bundle_files(stage)
    archive = stage / f"{REPO_ROOT.name}.zip"
    with ZipFile(archive, "w", compression=ZIP_DEFLATED, compresslevel=1) as output:
        for path in files:
            output.write(path, path.relative_to(stage).as_posix())
    if not is_zipfile(archive):
        raise RuntimeError(f"ZIP archive is invalid: {archive}")
    with ZipFile(archive) as check:
        if len(check.namelist()) != len(files) or archive.name in check.namelist() or check.testzip():
            raise RuntimeError(f"ZIP archive failed validation: {archive}")


def safe_relative(name: str) -> Path:
    relative = PurePosixPath(name)
    if (relative.is_absolute() or not relative.parts or "\\" in name or ":" in name
            or any(part in {".", ".."} for part in relative.parts)):
        raise ValueError(f"Invalid export path: {name}")
    root_files = {
        "Guide.pdf", "Guide.md", "Info.pdf", "Info.md", "Organization.pdf",
        "Organization.md", "Course-Outline.pdf", "Course-Outline.md",
        f"{REPO_ROOT.name}.zip",
    }
    if len(relative.parts) == 1 and relative.name in root_files:
        return Path(relative.name)
    if (len(relative.parts) == 2
            and ((relative.parts[0] == "PDF" and re.fullmatch(r"lesson-\d+\.pdf", relative.parts[1]))
                 or (relative.parts[0] == "PPTX" and re.fullmatch(r"lesson-\d+\.pptx", relative.parts[1])))):
        return Path(*relative.parts)
    if (len(relative.parts) == 3 and relative.parts[0] == "Lessons"
            and re.fullmatch(r"Lesson \d+", relative.parts[1])
            and re.fullmatch(r"lesson-\d+(?:-[a-z0-9-]+)?\.(?:pdf|pptx|md)", relative.parts[2])):
        return Path(*relative.parts)
    raise ValueError(f"Unexpected export path: {name}")


def checked_target(relative: Path) -> Path:
    if EXPORTS.is_symlink():
        raise ValueError(f"Exports folder must not be a symbolic link: {EXPORTS}")
    current = EXPORTS
    for part in relative.parts[:-1]:
        current /= part
        if current.is_symlink():
            raise ValueError(f"Export folder must not be a symbolic link: {current}")
    target = EXPORTS / relative
    if target.is_symlink():
        raise ValueError(f"Export file must not be a symbolic link: {target}")
    return target


def publish_pdf_pptx(stage: Path) -> int:
    document_names = {f"{source.stem}.pdf" for source in DOCUMENTS}
    if {path.name for path in stage.iterdir()} != document_names | {"PDF", "PPTX"}:
        raise ValueError("PDF/PPTX mode staged unexpected files")
    expected = {
        folder: {path.name for path in (stage / folder).iterdir()}
        for folder in ("PDF", "PPTX")
    }
    if any(len(names) != 12 for names in expected.values()):
        raise ValueError("PDF/PPTX mode did not stage exactly 12 files per folder")
    new_paths = bundle_files(stage)
    if len(new_paths) != 28:
        raise ValueError("PDF/PPTX mode did not stage exactly 28 files")
    for source in new_paths:
        target = checked_target(safe_relative(source.relative_to(stage).as_posix()))
        if target.exists() and not target.is_file():
            raise ValueError(f"Export target is not a file: {target}")
    for folder, names in expected.items():
        destination = EXPORTS / folder
        if destination.exists() and not destination.is_dir():
            raise ValueError(f"Export destination is not a folder: {destination}")
        if destination.is_dir():
            unexpected = {path.name for path in destination.iterdir()} - names
            if unexpected:
                raise ValueError(f"Unexpected entry in {destination}: {sorted(unexpected)[0]}")

    for source in new_paths:
        target = checked_target(source.relative_to(stage))
        target.parent.mkdir(parents=True, exist_ok=True)
        with tempfile.NamedTemporaryFile(prefix=".export-", dir=target.parent, delete=False) as temp:
            temp_path = Path(temp.name)
        try:
            shutil.copy2(source, temp_path)
            os.replace(temp_path, target)
        finally:
            temp_path.unlink(missing_ok=True)
    return len(new_paths)


def publish(stage: Path, mode: str) -> int:
    new_paths = bundle_files(stage)
    for source in new_paths:
        safe_relative(source.relative_to(stage).as_posix())

    EXPORTS.mkdir(parents=True, exist_ok=True)
    if mode == "quick":
        markdown_sources = list(DOCUMENTS) + list((CONTENT / "slide-plans").glob("lesson-*.md"))
        for source in markdown_sources:
            relative = (Path("Lessons") / f"Lesson {int(LESSON_PATTERN.fullmatch(source.name).group(1))}" / source.name
                        if LESSON_PATTERN.fullmatch(source.name) else Path(source.name))
            target = checked_target(safe_relative(relative.as_posix()))
            if target.is_file() and target.read_bytes() == source.read_bytes():
                target.unlink()
            elif target.exists():
                print(f"Preserved edited Markdown export: {target}", file=sys.stderr)
    if mode != "zip":
        archive = checked_target(Path(f"{REPO_ROOT.name}.zip"))
        archive.unlink(missing_ok=True)

    # Remove bookkeeping files left by older versions of this script.
    for name in (".export-manifest.json", ".export-manifest.tmp"):
        legacy = EXPORTS / name
        if legacy.is_file() and not legacy.is_symlink():
            legacy.unlink()

    for source in new_paths:
        relative = source.relative_to(stage)
        target = checked_target(relative)
        target.parent.mkdir(parents=True, exist_ok=True)
        with tempfile.NamedTemporaryFile(prefix=".export-", dir=target.parent, delete=False) as temp:
            temp_path = Path(temp.name)
        try:
            shutil.copy2(source, temp_path)
            os.replace(temp_path, target)
        finally:
            temp_path.unlink(missing_ok=True)

    return len(new_paths)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    modes = parser.add_mutually_exclusive_group()
    modes.add_argument("--quick", action="store_true", help="PDF/PPTX files only (default)")
    modes.add_argument("--full", action="store_true", help="PDF/PPTX files and matching Markdown")
    modes.add_argument("--zip", action="store_true", help="Full bundle and repository-named ZIP")
    modes.add_argument("--pdf_pptx", "--pdf-pptx", dest="pdf_pptx", action="store_true",
                       help="4 course PDFs in Exports, 12 lesson PDFs in PDF, 12 PPTXs in PPTX")
    args = parser.parse_args()
    mode = "pdf_pptx" if args.pdf_pptx else "zip" if args.zip else "full" if args.full else "quick"
    try:
        lessons = preflight(mode)
        temp_root = REPO_ROOT / ".tmp"
        temp_root.mkdir(exist_ok=True)
        with tempfile.TemporaryDirectory(prefix="export-", dir=temp_root) as temporary:
            stage = Path(temporary)
            if mode == "pdf_pptx":
                render_pdf_pptx(stage, lessons)
                count = publish_pdf_pptx(stage)
            else:
                render_bundle(stage, mode, lessons)
                if mode == "zip":
                    make_zip(stage)
                count = publish(stage, mode)
    except (FileNotFoundError, ValueError, RuntimeError, OSError, subprocess.CalledProcessError) as exc:
        parser.exit(1, f"Export failed: {exc}\n")
    print(f"Exported {count} files to {EXPORTS} ({mode} mode)")


if __name__ == "__main__":
    main()
