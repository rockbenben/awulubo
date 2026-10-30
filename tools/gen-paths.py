#!/usr/bin/env python3
"""生成《啊呜噜啵！》角色的手绘感路径。

输出的 d 字符串被手工誊进 src/components/*.svg。这里只负责"有机曲线"的
几何计算：抖动圆（身体）、阿基米德螺旋（肚子）、苹果、星星。

确定性：固定随机种子 → 同一份路径永远可复现。
用法：python tools/gen-paths.py          # 打印 SVG path d
"""

import math
import random


def catmull_rom(points, closed=False, tension=0.5):
    """Catmull-Rom -> cubic bezier，返回 SVG path 的 d。"""
    pts = list(points)
    if closed:
        # 首尾各补两个虚拟点，形成闭环
        ext = [pts[-1]] + pts + [pts[0], pts[1]]
    else:
        ext = [pts[0]] + pts + [pts[-1]]

    d = f"M {pts[0][0]:.1f} {pts[0][1]:.1f}"
    for i in range(1, len(ext) - 2):
        p0, p1, p2, p3 = ext[i - 1], ext[i], ext[i + 1], ext[i + 2]
        c1 = (
            p1[0] + (p2[0] - p0[0]) / 6.0 * tension * 2,
            p1[1] + (p2[1] - p0[1]) / 6.0 * tension * 2,
        )
        c2 = (
            p2[0] - (p3[0] - p1[0]) / 6.0 * tension * 2,
            p2[1] - (p3[1] - p1[1]) / 6.0 * tension * 2,
        )
        d += (
            f" C {c1[0]:.1f} {c1[1]:.1f} {c2[0]:.1f} {c2[1]:.1f}"
            f" {p2[0]:.1f} {p2[1]:.1f}"
        )
    if closed:
        d += " Z"
    return d


def blob(cx, cy, r, n=9, seed=7, wobble=0.045, angle_jit=0.10, overshoot=16.0):
    """抖动圆：马克笔画出来的不圆的手绘团子。末尾多探出一小截（线头外露）。"""
    rnd = random.Random(seed)
    anchors = []
    for i in range(n):
        a = -math.pi / 2 + i * 2 * math.pi / n + rnd.uniform(-angle_jit, angle_jit)
        rr = r * (1 + rnd.uniform(-wobble, wobble))
        anchors.append((cx + rr * math.cos(a), cy + rr * math.sin(a)))

    handles = []
    for i in range(n):
        p = anchors[i]
        q = anchors[(i + 1) % n]
        seg = math.hypot(q[0] - p[0], q[1] - p[1])
        h = seg * 0.44 * rnd.uniform(0.85, 1.15)
        rad = math.atan2(p[1] - cy, p[0] - cx)
        tx, ty = -math.sin(rad), math.cos(rad)  # 角度增大方向的切线
        if tx * (q[0] - p[0]) + ty * (q[1] - p[1]) < 0:
            tx, ty = -tx, -ty
        handles.append((tx * h, ty * h))

    p0 = anchors[0]
    d = f"M {p0[0]:.1f} {p0[1]:.1f}"
    for i in range(n):
        p = anchors[i]
        q = anchors[(i + 1) % n]
        h1 = handles[i]
        h2 = handles[(i + 1) % n]
        c1 = (p[0] + h1[0], p[1] + h1[1])
        c2 = (q[0] - h2[0], q[1] - h2[1])
        end = q
        if i == n - 1:
            # 收笔多探出一小截，闭合不严
            rad = math.atan2(q[1] - cy, q[0] - cx)
            tx, ty = -math.sin(rad), math.cos(rad)
            end = (q[0] + tx * overshoot, q[1] + ty * overshoot)
        d += (
            f" C {c1[0]:.1f} {c1[1]:.1f} {c2[0]:.1f} {c2[1]:.1f}"
            f" {end[0]:.1f} {end[1]:.1f}"
        )
    return d


def spiral(cx, cy, r0, r1, turns, seed=3, steps=26):
    """阿基米德螺旋，收尾向外甩一点，像手写的一圈。"""
    rnd = random.Random(seed)
    pts = []
    for i in range(steps + 1):
        t = i / steps
        a = turns * 2 * math.pi * t + rnd.uniform(-0.05, 0.05)
        r = r0 + (r1 - r0) * t
        pts.append((cx + r * math.cos(a), cy + r * math.sin(a)))
    return catmull_rom(pts)


def apple(cx, cy, r, seed=11):
    """苹果：上下两瓣鼓出，顶上有个凹口。"""
    rnd = random.Random(seed)
    pts = []
    n = 26
    for i in range(n):
        a = 2 * math.pi * i / n
        rr = r * (1 + 0.15 * math.cos(2 * a))
        # 顶部（a = -π/2）压一个凹口
        top = abs(((a + math.pi / 2) + math.pi) % (2 * math.pi) - math.pi)
        if top < 0.7:
            rr -= r * 0.16 * (1 - top / 0.7)
        rr += rnd.uniform(-0.016, 0.016) * r
        pts.append((cx + rr * math.cos(a), cy + rr * math.sin(a) * 0.95))
    return catmull_rom(pts, closed=True)


def star(cx, cy, r_out, r_in, seed=19, points=5):
    """五角星：外角外扩、内角内缩，带抖动。"""
    rnd = random.Random(seed)
    pts = []
    for i in range(points * 2):
        a = -math.pi / 2 + i * math.pi / points
        r = (r_out if i % 2 == 0 else r_in) * (1 + rnd.uniform(-0.07, 0.07))
        pts.append((cx + r * math.cos(a), cy + r * math.sin(a)))
    return catmull_rom(pts, closed=True, tension=0.20)


def ellipse_blob(cx, cy, rx, ry, n=11, seed=41, wobble_px=14.0, overshoot=12.0):
    """横向拉长的手绘白底块：抖动按绝对像素给，扁下去也还看得出手画感。"""
    rnd = random.Random(seed)
    anchors = []
    for i in range(n):
        a = 2 * math.pi * i / n + rnd.uniform(-0.06, 0.06)
        dx = rnd.uniform(-wobble_px, wobble_px)
        dy = rnd.uniform(-wobble_px, wobble_px)
        anchors.append((cx + rx * math.cos(a) + dx, cy + ry * math.sin(a) + dy))

    handles = []
    for i in range(n):
        p = anchors[i]
        q = anchors[(i + 1) % n]
        seg = math.hypot(q[0] - p[0], q[1] - p[1])
        h = seg * 0.38 * rnd.uniform(0.9, 1.1)
        rad = math.atan2(p[1] - cy, p[0] - cx)
        tx, ty = -math.sin(rad), math.cos(rad)
        if tx * (q[0] - p[0]) + ty * (q[1] - p[1]) < 0:
            tx, ty = -tx, -ty
        handles.append((tx * h, ty * h))

    p0 = anchors[0]
    d = f"M {p0[0]:.1f} {p0[1]:.1f}"
    for i in range(n):
        p = anchors[i]
        q = anchors[(i + 1) % n]
        h1 = handles[i]
        h2 = handles[(i + 1) % n]
        c1 = (p[0] + h1[0], p[1] + h1[1])
        c2 = (q[0] - h2[0], q[1] - h2[1])
        end = q
        if i == n - 1:
            rad = math.atan2(q[1] - cy, q[0] - cx)
            tx, ty = -math.sin(rad), math.cos(rad)
            end = (q[0] + tx * overshoot, q[1] + ty * overshoot)
        d += (
            f" C {c1[0]:.1f} {c1[1]:.1f} {c2[0]:.1f} {c2[1]:.1f}"
            f" {end[0]:.1f} {end[1]:.1f}"
        )
    return d


def soft_blob(cx, cy, rx, ry, seed=41, amp=0.035, lobes=3, n=28):
    """柔和的手绘白底块：椭圆 + 低频波动，像马克笔随手抹出来的一块。"""
    pts = []
    for i in range(n):
        a = 2 * math.pi * i / n
        k = 1 + amp * math.sin(lobes * a + 0.7) + amp * 0.6 * math.sin(5 * a + 2.1)
        pts.append((cx + rx * k * math.cos(a), cy + ry * k * math.sin(a)))
    return catmull_rom(pts, closed=True, tension=0.36)


def fish(cx, cy):
    """小鱼：纺锤形身体 + 尾巴，尾巴另成一条路径更好看，这里给身体。"""
    rnd = random.Random(31)
    pts = []
    # 上半身：从头到尾尖，再回到下腹
    profile = [
        (-300, 0), (-250, -95), (-150, -140), (-20, -130), (120, -95),
        (250, -40), (330, 0), (250, 40), (120, 95), (-20, 130),
        (-150, 140), (-250, 95),
    ]
    for dx, dy in profile:
        pts.append((cx + dx, cy + dy + rnd.uniform(-7, 7)))
    return catmull_rom(pts, closed=True)


if __name__ == "__main__":
    print("# body (噜啵 身体，直径约 560)")
    print(blob(500, 510, 280, n=9, seed=7))
    print()
    print("# spiral (肚子上的螺旋)")
    print(spiral(500, 668, 14, 80, turns=2.55, seed=3, steps=30))
    print()
    print("# apple body (道具坐标系：占满 1000x1000 画框)")
    print(apple(500, 560, 380, seed=11))
    print()
    print("# star (道具坐标系)")
    print(star(500, 505, 440, 205, seed=19))
    print()
    print("# white blob (满版色页上的手绘白底块)")
    print(soft_blob(500, 500, 400, 118, seed=41, amp=0.035, lobes=3))
    print()
    print("# fish body (道具坐标系)")
    print(fish(500, 500))

