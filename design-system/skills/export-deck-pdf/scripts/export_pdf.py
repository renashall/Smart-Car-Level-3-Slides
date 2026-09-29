#!/usr/bin/env python3
"""Export a rendered HTML slide deck to a clean 16:9 PDF via headless Edge/Chrome.

Usage:
    python export_pdf.py <deck.html> [out.pdf]

The deck's own ``@media print`` block (a 1280x720 ``@page`` with a page break on
each ``.slide``) makes Chromium emit exactly one 16:9 page per slide, with no
browser header/footer. Because it's a real print (not a screenshot), the PDF keeps
selectable/searchable text and every ``<a href>`` as a clickable link annotation.

Output defaults to ``<deck-stem>.pdf`` beside the HTML (lesson-10.html ->
lesson-10.pdf). Pure standard library. Set the DECK_BROWSER env var to override
the browser path.
"""
import os
import shutil
import subprocess
import sys
import tempfile
import time
from pathlib import Path

BROWSER_CANDIDATES = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
]
WHICH_NAMES = ["microsoft-edge", "google-chrome", "google-chrome-stable",
               "chromium", "chromium-browser", "chrome", "msedge"]


def find_browser():
    """Locate a Chromium-based browser (Edge/Chrome). DECK_BROWSER overrides."""
    env = os.environ.get("DECK_BROWSER")
    if env and Path(env).exists():
        return env
    for cand in BROWSER_CANDIDATES:
        if Path(cand).exists():
            return cand
    for name in WHICH_NAMES:
        found = shutil.which(name)
        if found:
            return found
    sys.exit("No Edge/Chrome found. Set the DECK_BROWSER env var to a "
             "Chromium-based browser executable.")


def render_pdf(html, pdf, browser=None, attempts=3):
    """Print ``html`` to ``pdf``. Uses a fresh throwaway profile each try (so it
    never collides with your everyday browser) and retries a couple of times
    because a cold headless launch occasionally no-ops."""
    html, pdf = Path(html), Path(pdf)
    browser = browser or find_browser()
    url = html.resolve().as_uri()
    for _ in range(attempts):
        if pdf.exists():
            pdf.unlink()
        with tempfile.TemporaryDirectory(prefix="deck-pdf-") as profile:
            cmd = [
                browser, "--headless=new", "--disable-gpu", "--no-sandbox",
                "--no-pdf-header-footer", "--run-all-compositor-stages-before-draw",
                "--virtual-time-budget=12000", "--user-data-dir=" + profile,
                "--print-to-pdf=" + str(pdf), url,
            ]
            try:
                subprocess.run(cmd, timeout=90,
                               stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            except subprocess.TimeoutExpired:
                pass
        if pdf.exists() and pdf.stat().st_size > 0:
            return pdf
        time.sleep(1)
    sys.exit("PDF was not produced after %d attempts: %s" % (attempts, pdf))


def main():
    if len(sys.argv) < 2:
        sys.exit("Usage: python export_pdf.py <deck.html> [out.pdf]")
    html = Path(sys.argv[1]).resolve()
    if not html.exists():
        sys.exit("HTML not found: %s" % html)
    pdf = Path(sys.argv[2]).resolve() if len(sys.argv) > 2 else html.with_suffix(".pdf")
    render_pdf(html, pdf)
    print("wrote %s  (%d bytes)" % (pdf, pdf.stat().st_size))


if __name__ == "__main__":
    main()
