"""生成《啊呜噜啵！》的笔触特效层。

参考书的"绚丽"来自马克笔笔触本身：大笔触、边缘毛躁、笔画里有飞白。
平涂做不出这个，所以这里的形状都按"笔画"生成：
沿中心线生成带宽度变化、两端平切的闭合填充路径，再在笔画里嵌几条细的飞白。

词汇表（每页换一种，别老是射线）：
  fx-rays        放射线：角色身后的爆发
  fx-rays-corner 角落爆闪：从页面一角冲进来，直接冲出画外
  fx-bands       斜向色带：整页铺满，不留白岛
  fx-swirl       漩涡：一笔画成的螺旋
  fx-disc        实心圆盘：可缩放出血，压住页面边缘
  fx-confetti    彩纸：96 片，位置固定（规格 §7.8）

产物：src/components/effects.svg（确定性，可重跑覆盖）
用法：python tools/gen-effects.py
"""
import math
import os
import random

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "src", "components", "effects.svg")

CONFETTI_COLORS = [
    "--confetti-red",
    "--confetti-yellow",
    "--confetti-blue",
    "--confetti-pink",
    "--confetti-green",
    "--confetti-orange",
]


def perp_at(pts, i):
    n = len(pts)
    if i == 0:
        dx, dy = pts[1][0] - pts[0][0], pts[1][1] - pts[0][1]
    elif i == n - 1:
        dx, dy = pts[-1][0] - pts[-2][0], pts[-1][1] - pts[-2][1]
    else:
        dx, dy = pts[i + 1][0] - pts[i - 1][0], pts[i + 1][1] - pts[i - 1][1]
    L = math.hypot(dx, dy) or 1.0
    return -dy / L, dx / L


def catmull_path(points, move=True, tension=0.5):
    pts = list(points)
    ext = [pts[0]] + pts + [pts[-1]]
    d = f"M {pts[0][0]:.1f} {pts[0][1]:.1f}" if move else ""
    for i in range(1, len(ext) - 2):
        p0, p1, p2, p3 = ext[i - 1], ext[i], ext[i + 1], ext[i + 2]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6.0 * tension * 2, p1[1] + (p2[1] - p0[1]) / 6.0 * tension * 2)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6.0 * tension * 2, p2[1] - (p3[1] - p1[1]) / 6.0 * tension * 2)
        d += f" C {c1[0]:.1f} {c1[1]:.1f} {c2[0]:.1f} {c2[1]:.1f} {p2[0]:.1f} {p2[1]:.1f}"
    return d


def ribbon(pts, widths, off=0.0, wscale=1.0, rough=0.0, rng=None):
    """沿中心线生成一条"笔画"：带宽度变化、两端平切的闭合填充路径。

    rough > 0 时，边缘按点抖动，做出马克笔手绘的毛边。
    """
    left, right = [], []
    for i, (x, y) in enumerate(pts):
        nx, ny = perp_at(pts, i)
        hw = widths[i] * wscale + off
        if rough and rng is not None:
            hw += rng.uniform(-rough, rough)
        left.append((x + nx * hw, y + ny * hw))
        right.append((x - nx * hw, y - ny * hw))
    d = catmull_path(left, move=True)
    d += f" L {right[-1][0]:.1f} {right[-1][1]:.1f}"
    d += catmull_path(right[::-1], move=False)
    d += " Z"
    return d


def streak(pts, widths, off, frac=0.12, t0=0.12, t1=0.9):
    """笔画里的飞白：一条更细、稍微偏心的纸条。"""
    i0 = max(0, int(t0 * (len(pts) - 1)))
    i1 = min(len(pts) - 1, int(t1 * (len(pts) - 1)))
    return ribbon(pts[i0 : i1 + 1], widths[i0 : i1 + 1], off=off, wscale=frac)


def rays_shapes(cx, cy, r_in, r_out, count, seed, w_in=30, w_out=52, two_tone=True):
    """从中心放射的马克笔光线。"""
    rnd = random.Random(seed)
    shapes = []
    base = rnd.uniform(0, math.tau)
    for i in range(count):
        a = base + i * math.tau / count + rnd.uniform(-0.07, 0.07)
        ri = r_in * rnd.uniform(0.82, 1.25)
        ro = r_out * rnd.uniform(0.84, 1.1)
        pts, widths = [], []
        steps = 8
        for k in range(steps + 1):
            t = k / steps
            r = ri + (ro - ri) * t
            aa = a + rnd.uniform(-0.03, 0.03) * t
            pts.append((cx + r * math.cos(aa), cy + r * math.sin(aa)))
            widths.append((w_in + (w_out - w_in) * t) * rnd.uniform(0.72, 1.18))
        widths[0] *= 0.3
        widths[-1] *= 0.72
        strokes = []
        for _ in range(rnd.randint(1, 3)):
            off = rnd.uniform(-0.55, 0.55) * w_out
            strokes.append(
                streak(pts, widths, off, frac=rnd.uniform(0.07, 0.16),
                       t0=rnd.uniform(0.05, 0.3), t1=rnd.uniform(0.65, 0.98))
            )
        fill_var = "--ray2" if (two_tone and i % 3 == 2) else "--ray"
        shapes.append((ribbon(pts, widths, rough=6, rng=rnd), strokes, fill_var))
    return shapes


def bands_shapes(seed, angle_deg=-22.0, count=7, spacing=235, width=165):
    """斜向色带：整页铺满，像参考书 p11 那种。"""
    rnd = random.Random(seed)
    a = math.radians(angle_deg)
    dx, dy = math.cos(a), math.sin(a)
    px, py = -dy, dx
    shapes = []
    for i in range(count):
        off = (i - (count - 1) / 2) * spacing + rnd.uniform(-14, 14)
        cx = 500 + px * off
        cy = 500 + py * off
        w = width * rnd.uniform(0.55, 1.3)
        pts, widths = [], []
        steps = 9
        for k in range(steps + 1):
            t = k / steps
            s = -1150 + 2300 * t
            # 笔触微微弯，不是死直的平行线
            bow = 34 * math.sin(t * math.pi)
            pts.append((cx + dx * s + px * bow, cy + dy * s + py * bow))
            widths.append(w * (0.86 + 0.2 * math.sin(t * math.pi)) * rnd.uniform(0.94, 1.06))
        strokes = []
        for _ in range(rnd.randint(2, 4)):
            off2 = rnd.uniform(-0.6, 0.6) * w
            strokes.append(
                streak(pts, widths, off2, frac=rnd.uniform(0.06, 0.15),
                       t0=rnd.uniform(0.04, 0.3), t1=rnd.uniform(0.6, 0.98))
            )
        fill_var = "--ray2" if i % 3 == 2 else "--ray"
        shapes.append((ribbon(pts, widths, rough=9, rng=rnd), strokes, fill_var))
    return shapes


def swirl_shapes(cx, cy, r0, r1, turns, seed, width=30, start_deg=135.0):
    """漩涡：一笔画成的粗螺旋色带，参考书 p03 那种。

    start_deg 决定螺旋起笔的方向——把笔尖藏到角色身后，别在画面里留个孤零零的尖。
    """
    rnd = random.Random(seed)
    a0 = math.radians(start_deg)
    steps = 170
    pts, widths = [], []
    for i in range(steps + 1):
        t = i / steps
        ang = a0 + turns * math.tau * t + rnd.uniform(-0.015, 0.015)
        r = r0 + (r1 - r0) * t
        pts.append((cx + r * math.cos(ang), cy + r * math.sin(ang)))
        widths.append(width * (0.8 + 0.28 * math.sin(t * math.pi)) * rnd.uniform(0.94, 1.06))
    widths[0] *= 0.45
    widths[-1] *= 0.72
    strokes = []
    for _ in range(6):
        off = rnd.uniform(-0.7, 0.7) * width
        strokes.append(
            streak(pts, widths, off, frac=rnd.uniform(0.06, 0.13),
                   t0=rnd.uniform(0.04, 0.22), t1=rnd.uniform(0.7, 0.99))
        )
    return [(ribbon(pts, widths, rough=5, rng=rnd), strokes, "--ray")]


def disc_shapes(cx, cy, r, seed, width=26):
    """色盘：一整块平涂的圆，边缘毛躁，里面有零散的干笔飞白。"""
    rnd = random.Random(seed)
    n = 40
    pts = []
    for i in range(n):
        ang = math.tau * i / n
        rr = r * (1 + rnd.uniform(-0.04, 0.04))
        pts.append((cx + rr * math.cos(ang), cy + rr * math.sin(ang)))
    main = catmull_path(pts, move=True) + " Z"

    strokes = []
    for _ in range(7):
        dy = rnd.uniform(-0.8, 0.8) * r
        half = math.sqrt(max(r * r - dy * dy, 1.0)) * 0.9
        y = cy + dy
        length = rnd.uniform(0.25, 0.6) * half * 2
        x0 = cx + rnd.uniform(-half, half - length)
        seg, w = [], []
        for k in range(6):
            t = k / 5
            xx = x0 + length * t
            yy = y + rnd.uniform(-4, 4) + 9 * math.sin(t * math.pi)
            seg.append((xx, yy))
            w.append(rnd.uniform(1.6, 4.2))
        w[0] *= 0.3
        w[-1] *= 0.3
        strokes.append(ribbon(seg, w))
    return [(main, strokes, "--disc")]


def rainbow_body_shapes(seed, cx=500, cy=515, rx=266, ry=260, count=6):
    """彩虹身体：六条波浪色带，贴着身体轮廓（轮廓线由 character.svg 盖在上面）。"""
    rnd = random.Random(seed)
    colors = [
        "--body-band-1", "--body-band-2", "--body-band-3",
        "--body-band-4", "--body-band-5", "--body-band-6",
    ]
    shapes = []
    top = cy - ry + 18
    step = (2 * ry - 36) / count
    for i in range(count):
        y0 = top + step * i
        h = step * 0.88
        dy = y0 - cy
        half = rx * math.sqrt(max(1 - (dy / ry) ** 2, 0.02))
        pts, widths = [], []
        n = 20
        for k in range(n + 1):
            t = k / n
            x = cx - half + 2 * half * t
            yy = y0 + 8 * math.sin(t * math.pi * 2.2 + i * 1.3)
            pts.append((x, yy))
            widths.append(h * 0.5)
        shapes.append((ribbon(pts, widths, rough=2.5, rng=rnd), [], colors[i]))
    return shapes


def rainbow_bands_shapes(seed, count=6, top=-40, bottom=1040, gap=26):
    """彩虹页：六条横向波浪色带铺满整页（规格 §6.6 t-rainbow）。"""
    rnd = random.Random(seed)
    colors = [
        "--band-1", "--band-2", "--band-3", "--band-4", "--band-5", "--band-6",
    ]
    shapes = []
    span = (bottom - top) / count
    for i in range(count):
        y0 = top + span * i + span * 0.18
        h = span - gap
        pts, widths = [], []
        n = 18
        for k in range(n + 1):
            t = k / n
            x = -80 + (1160) * t
            yy = y0 + 16 * math.sin(t * math.pi * 2 + i * 1.7) + rnd.uniform(-3, 3)
            pts.append((x, yy))
            widths.append(h * 0.5)
        shapes.append((ribbon(pts, widths, rough=4, rng=rnd), [], colors[i]))
    return shapes


def stars_shapes(seed, count=18):
    """夜空里的星：四角小闪。"""
    rnd = random.Random(seed)
    shapes = []
    for _ in range(count):
        x = rnd.uniform(30, 970)
        y = rnd.uniform(30, 700)
        r = rnd.uniform(7, 17)
        d = (f"M {x:.1f} {y - r:.1f} Q {x + r * 0.22:.1f} {y - r * 0.22:.1f} {x + r:.1f} {y:.1f}"
             f" Q {x + r * 0.22:.1f} {y + r * 0.22:.1f} {x:.1f} {y + r:.1f}"
             f" Q {x - r * 0.22:.1f} {y + r * 0.22:.1f} {x - r:.1f} {y:.1f}"
             f" Q {x - r * 0.22:.1f} {y - r * 0.22:.1f} {x:.1f} {y - r:.1f} Z")
        shapes.append((d, [], "--star"))
    return shapes


def confetti_shapes(seed, count=96):
    """彩纸：96 片小东西，位置固定（规格 §7.8）。"""
    rnd = random.Random(seed)
    shapes = []
    for i in range(count):
        x = rnd.uniform(40, 960)
        y = rnd.uniform(40, 960)
        # 中间留一块空给角色
        if math.hypot(x - 500, y - 520) < 230 and rnd.random() < 0.75:
            continue
        kind = rnd.choice(["circle", "square", "star", "wave", "flower"])
        color = CONFETTI_COLORS[i % len(CONFETTI_COLORS)]
        size = rnd.uniform(9, 24)
        rot = rnd.uniform(0, math.tau)
        if kind == "circle":
            d = (f"M {x - size:.1f} {y:.1f} a {size:.1f} {size:.1f} 0 1 0 {2 * size:.1f} 0"
                 f" a {size:.1f} {size:.1f} 0 1 0 {-2 * size:.1f} 0 Z")
        elif kind == "square":
            h = size * 0.9
            cs = [(-h, -h), (h, -h), (h, h), (-h, h)]
            pts = [(x + px * math.cos(rot) - py * math.sin(rot),
                    y + px * math.sin(rot) + py * math.cos(rot)) for px, py in cs]
            d = catmull_path(pts, move=True, tension=0.12) + " Z"
        elif kind == "star":
            sp = []
            for k in range(10):
                ang = rot + k * math.pi / 5
                rr = size if k % 2 == 0 else size * 0.45
                sp.append((x + rr * math.cos(ang), y + rr * math.sin(ang)))
            d = catmull_path(sp, move=True, tension=0.2) + " Z"
        elif kind == "wave":
            seg, w = [], []
            for k in range(7):
                t = k / 6
                seg.append((x - size * 1.6 + size * 3.2 * t,
                            y + math.sin(t * math.pi * 2 + rot) * size * 0.5))
                w.append(size * 0.22)
            d = ribbon(seg, w)
        else:  # flower
            d = ""
            for k in range(5):
                ang = rot + k * math.tau / 5
                px = x + math.cos(ang) * size * 0.7
                py = y + math.sin(ang) * size * 0.7
                r2 = size * 0.52
                d += (f"M {px - r2:.1f} {py:.1f} a {r2:.1f} {r2:.1f} 0 1 0 {2 * r2:.1f} 0"
                      f" a {r2:.1f} {r2:.1f} 0 1 0 {-2 * r2:.1f} 0 Z ")
            d += (f"M {x - size * 0.42:.1f} {y:.1f} a {size * 0.42:.1f} {size * 0.42:.1f}"
                  f" 0 1 0 {size * 0.84:.1f} 0 a {size * 0.42:.1f} {size * 0.42:.1f}"
                  f" 0 1 0 {-size * 0.84:.1f} 0 Z")
        shapes.append((d, [], color))
    return shapes


def emit(symbol_id, shapes, note, gap_opacity=0.4):
    # 用 <g> 而不是 <symbol>：<use> 引用 symbol 会建立视口并裁掉超出部分，
    # 笔触出血就会被切成一条直边（p06 竖切、p08 横切就是这个问题）。
    parts = [f'  <g id="{symbol_id}">',
             f'    <!-- {note} -->']
    for main, strokes, fill_var in shapes:
        parts.append(f'    <path style="fill:var({fill_var})" d="{main}" />')
        for s in strokes:
            parts.append(
                f'    <path style="fill:var(--ray-gap,var(--paper));opacity:{gap_opacity}" d="{s}" />'
            )
    parts.append('  </g>')
    return "\n".join(parts)


def main():
    blocks = [
        emit(
            "fx-rays",
            rays_shapes(500, 500, 130, 880, 11, seed=17, w_in=54, w_out=104),
            "放射线：角色身后的爆发",
        ),
        emit(
            "fx-rays-tight",
            rays_shapes(500, 500, 90, 600, 13, seed=29, w_in=34, w_out=66),
            "细放射线：贴着角色的一圈光",
        ),
        emit(
            "fx-rays-corner",
            rays_shapes(-40, 1040, 90, 1500, 9, seed=53, w_in=60, w_out=150),
            "角落爆闪：从页面左下角冲进来，冲出画外",
        ),
        emit(
            "fx-bands",
            bands_shapes(seed=71, angle_deg=-22.0, count=7, spacing=235, width=168),
            "斜向色带：整页铺满，不留白岛",
        ),
        emit(
            "fx-swirl",
            swirl_shapes(500, 500, 200, 600, 2.4, seed=37, width=52, start_deg=135.0),
            "漩涡：一笔画成的粗螺旋色带",
        ),
        emit(
            "fx-disc",
            disc_shapes(500, 500, 430, seed=43, width=30),
            "色盘：实心圆 + 零散飞白；放大放置即可出血压边",
        ),
        emit(
            "fx-rainbow",
            rainbow_bands_shapes(seed=67),
            "彩虹页：六条横向波浪色带",
            gap_opacity=0.0,
        ),
        emit(
            "fx-stars",
            stars_shapes(seed=83),
            "夜空：四角小闪",
            gap_opacity=0.0,
        ),
        emit(
            "fx-confetti",
            confetti_shapes(seed=97, count=96),
            "彩纸：96 片，位置固定（规格 §7.8）",
            gap_opacity=0.0,
        ),
        emit(
            "fx-sprinkle",
            confetti_shapes(seed=103, count=22),
            "零散彩纸：找一找页用",
            gap_opacity=0.0,
        ),
    ]

    header = """<!-- 笔触特效层：放射线 / 角落爆闪 / 斜向色带 / 漩涡 / 色盘 / 彩纸。
     由 tools/gen-effects.py 生成（确定性，可重跑覆盖）。
     颜色走 CSS 变量 --ray / --ray2 / --disc / --confetti-*（自定义属性能穿透 <use> 影子树）。
     飞白用 --ray-gap，不透明度 0.4，模拟马克笔的干笔。 -->

<svg xmlns="http://www.w3.org/2000/svg">
"""
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(header + "\n\n".join(blocks) + "\n\n</svg>\n")
    print(f"✓ {os.path.normpath(OUT)}")

    # 彩虹身体：另出一个文件（它依赖 character.svg 里的身体轮廓线）
    rainbow_blocks = [
        emit(
            "ch-body-rainbow",
            rainbow_body_shapes(seed=59),
            "彩虹身体：六条波浪色带",
            gap_opacity=0.0,
        )
    ]
    rainbow_header = """<!-- 彩虹身体：六条波浪色带 + 身体轮廓线（轮廓线来自 character.svg 的 ch-body-line）。
     由 tools/gen-effects.py 生成（确定性，可重跑覆盖）。 -->

<svg xmlns="http://www.w3.org/2000/svg">
"""
    out2 = os.path.join(HERE, "..", "src", "components", "rainbow.svg")
    with open(out2, "w", encoding="utf-8") as f:
        f.write(rainbow_header + "\n\n".join(rainbow_blocks) + "\n\n</svg>\n")
    print(f"✓ {os.path.normpath(out2)}")


if __name__ == "__main__":
    main()
