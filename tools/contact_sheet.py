# 联系表：把逐页截图拼成一张总览图，先看整体节奏。
# 用法：python tools/contact_sheet.py dist/shots/*.png -o dist/shots/contact.png [--cols 4] [--cell 330]
import argparse
import glob
import os

from PIL import Image

p = argparse.ArgumentParser()
p.add_argument("inputs", nargs="+")
p.add_argument("-o", "--out", required=True)
p.add_argument("--cols", type=int, default=4)
p.add_argument("--cell", type=int, default=330)
p.add_argument("--gap", type=int, default=12)
p.add_argument("--bg", default="#E8E8E8")
args = p.parse_args()

files = []
for pattern in args.inputs:
    files.extend(sorted(glob.glob(pattern)))
files = [f for f in files if os.path.normpath(f) != os.path.normpath(args.out)]
if not files:
    raise SystemExit("没有找到截图")

cols = min(args.cols, len(files))
rows = (len(files) + cols - 1) // cols
cell = args.cell
gap = args.gap

sheet = Image.new(
    "RGB",
    (cols * cell + (cols + 1) * gap, rows * cell + (rows + 1) * gap),
    args.bg,
)

for i, f in enumerate(files):
    im = Image.open(f).convert("RGB")
    im.thumbnail((cell, cell), Image.LANCZOS)
    x = gap + (i % cols) * (cell + gap)
    y = gap + (i // cols) * (cell + gap)
    sheet.paste(im, (x + (cell - im.width) // 2, y + (cell - im.height) // 2))

sheet.save(args.out)
print(f"✓ {args.out}  {sheet.width} × {sheet.height}  ({len(files)} 张)")
