# 拼 README 的门面图：素材 PNG（dist/readme/）→ docs/images/*.webp。
#
#   python tools/readme-compose.py
#
# 为什么要有这一步：README 里的图要小（仓库要瘦、页面要快），
# 而 Playwright 只会截 PNG。WebP 是同一张图的一半体积。
#
# 产物（进仓库）：
#   docs/images/hero.webp      1600 × 400，首屏横幅，四格
#   docs/images/find.webp       720 × 720，图库
#   docs/images/count.webp
#   docs/images/seen.webp
#   docs/images/gift.webp
#   docs/images/spread.webp     1280 × 800，摊开的两页
import os
import sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'dist', 'readme')
DST = os.path.join(ROOT, 'docs', 'images')

HERO = ['hero-1', 'hero-2', 'hero-3', 'hero-4']
GALLERY = ['find', 'count', 'seen', 'gift']


def load(name):
    path = os.path.join(SRC, name + '.png')
    if not os.path.exists(path):
        print('✗ 缺素材 %s —— 先跑 npm run shots:readme 的截图那一步' % path)
        sys.exit(1)
    return Image.open(path).convert('RGB')


def save(img, name):
    os.makedirs(DST, exist_ok=True)
    out = os.path.join(DST, name + '.webp')
    img.save(out, 'WEBP', quality=88, method=6)
    print('✓ %s  %dx%d  %.0f KB' % (os.path.relpath(out, ROOT), img.width, img.height,
                                    os.path.getsize(out) / 1024))


# 首屏横幅：四格，每格 400 × 400。页面本来就是正方形，
# 缩到正方形再拼——不裁边，因为裁掉的正是贴着页边的字（「你好了 真棒。」那种）。
hero = Image.new('RGB', (1600, 400), 'white')
for i, name in enumerate(HERO):
    panel = load(name)
    panel = panel.resize((400, 400), Image.LANCZOS)
    hero.paste(panel, (i * 400, 0))
save(hero, 'hero')

# 图库：四张正方图
for name in GALLERY:
    img = load(name).resize((720, 720), Image.LANCZOS)
    save(img, name)

# 摊开的两页：原样留着，别缩——它要能看清界面上的按钮
save(load('spread'), 'spread')
