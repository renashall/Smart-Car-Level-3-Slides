#!/usr/bin/env python3
"""Compatibility entrypoint for the export-all skill."""

from pathlib import Path
import runpy


if __name__ == "__main__":
    runpy.run_path(
        str(Path(__file__).resolve().parent / "skills/export-all/scripts/export_all.py"),
        run_name="__main__",
    )
