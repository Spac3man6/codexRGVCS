#!/usr/bin/env python3
"""
process_photos.py — turn a folder of raw client photos into web-ready,
correctly-oriented, normalized assets. NO AI involved. Pure image processing.

WORKFLOW (you do the triage by eye; the script does the mechanical part):

1. Download the client's Google Drive photos to a local folder, e.g. ~/rgv-raw/
2. Sort them by EYE into category subfolders (create only the ones you have):

   ~/rgv-raw/
     hero/            one strong wide shot for the homepage hero
     polished/        polished concrete
     epoxy/           epoxy flake floors
     staining/        true concrete staining (the weak category — prioritize)
     decorative/      metallic / decorative coatings
     garage/          garage floor coatings
     team/            owner / crew / process / jobsite
     before-after/    before & after pairs

   (Filenames don't matter. Put each photo in the folder that matches what it shows.)

3. Run:
     pip install Pillow
     python3 tools/process_photos.py ~/rgv-raw

   Output lands in assets/img/site/<category>/<category>-NN.jpg, web-optimized,
   EXIF-rotation fixed, metadata stripped, sized to sensible widths.

4. Replace the <!-- REPLACE: ... --> placeholders in the HTML with these paths.
"""

import sys
import os
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Pillow is not installed. Run:  pip install Pillow")

# category -> (max width in px, JPEG quality)
TARGETS = {
    "hero":         (2400, 82),
    "before-after": (2000, 82),
    "polished":     (1600, 82),
    "epoxy":        (1600, 82),
    "staining":     (1600, 82),
    "decorative":   (1600, 82),
    "garage":       (1600, 82),
    "team":         (1400, 82),
}

REPO_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_BASE = REPO_ROOT / "assets" / "img" / "site"
VALID_EXT = {".jpg", ".jpeg", ".png", ".webp", ".heic", ".tif", ".tiff", ".bmp"}


def process_one(src: Path, dest: Path, max_width: int, quality: int) -> str:
    with Image.open(src) as im:
        im = ImageOps.exif_transpose(im)          # honor camera rotation, then bake it in
        if im.mode in ("RGBA", "P", "LA"):
            im = im.convert("RGB")
        w, h = im.size
        if w > max_width:
            new_h = round(h * max_width / w)
            im = im.resize((max_width, new_h), Image.LANCZOS)
        dest.parent.mkdir(parents=True, exist_ok=True)
        im.save(dest, "JPEG", quality=quality, optimize=True, progressive=True)
    return f"{im.size[0]}x{im.size[1]}"


def main():
    if len(sys.argv) < 2:
        sys.exit("Usage: python3 tools/process_photos.py <path-to-raw-folder>")
    raw = Path(sys.argv[1]).expanduser()
    if not raw.is_dir():
        sys.exit(f"Not a folder: {raw}")

    total = 0
    print(f"Output base: {OUTPUT_BASE}\n")
    for category, (max_width, quality) in TARGETS.items():
        cat_dir = raw / category
        if not cat_dir.is_dir():
            continue
        images = sorted(p for p in cat_dir.iterdir()
                        if p.suffix.lower() in VALID_EXT and p.is_file())
        if not images:
            continue
        print(f"[{category}]  ({len(images)} file(s), max {max_width}px)")
        for i, src in enumerate(images, start=1):
            dest = OUTPUT_BASE / category / f"{category}-{i:02d}.jpg"
            try:
                dims = process_one(src, dest, max_width, quality)
                rel = dest.relative_to(REPO_ROOT)
                print(f"   {src.name}  ->  {rel}  ({dims})")
                total += 1
            except Exception as e:
                print(f"   SKIP {src.name}: {e}")
        print()

    if total == 0:
        print("No images processed. Did you create category subfolders inside the raw folder?")
        print("Expected one or more of:", ", ".join(TARGETS))
    else:
        print(f"Done. {total} image(s) normalized into assets/img/site/.")
        print("Next: swap the <!-- REPLACE: ... --> placeholders in the HTML for these paths.")


if __name__ == "__main__":
    main()
