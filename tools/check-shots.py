"""截图检查：每一页都得真的画出来，背景还必须铺满整页。

为什么要这道闸门：有一次把「书页居中」的 CSS 写成了 body.screen，
拼版（proof.html 的 body 是 screen static）也吃到了这条规则，
全书页面全叠到了一起——**结构检查、版式检查、交互冒烟、乱读压力测试全都通过**，
只有人眼看联系表才发现整本截图是白板。

后来又发现另一半：背景的"自动放大"算法只对少数几种笔触成立，
其余的页色块是**浮在白纸上的孤岛**，没铺满全局。

所以这张闸门管两件事：
  1. 每页有内容（不是白板）；
  2. 声明了满版底色场的页，背景必须**触到四条边**——色块要长在页面上。

页数不写死：tools/shots.mjs 渲染时写出 manifest.json，这里照着它核对。

用法：python tools/check-shots.py [--min 0.01]
失败即退出码 1。
"""
import argparse
import glob
import json
import os
import sys

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
SHOTS = os.path.join(ROOT, "dist", "shots")


def ink_ratio(path):
    """这一页"不是底色"的像素占比。

    底色取**出现最多的那个颜色**（白纸页是纸白，满版色页是那个色），
    不要用左上角：满版色页的左上角就是底色，拿它当基准会把整页当成"墨"。
    """
    im = Image.open(path).convert("RGB")
    im.thumbnail((240, 240), Image.LANCZOS)  # 够判断有没有东西了
    colors = im.getcolors(maxcolors=1 << 20) or []
    bg = max(colors)[1] if colors else (255, 255, 255)
    bg_lum = 0.299 * bg[0] + 0.587 * bg[1] + 0.114 * bg[2]
    g = im.convert("L")
    hist = g.histogram()
    ink = sum(c for v, c in enumerate(hist) if abs(v - bg_lum) > 10)
    return ink / float(g.width * g.height)


def edge_cover(path):
    """每条边的**主色**是不是底色场（而不是纸白）。

    为什么量主色而不是"有没有非白像素"：角色的身体是纸白的，
    它常常压在页边（p07/p09/p11/p34 都是这样），按像素算会把
    "角色挡住了边"误判成"背景没铺满"。背景铺满时，边上的主色
    必然是底色场本身——这才是要检查的量。
    """
    im = Image.open(path).convert("RGB")
    w, h = im.size
    band = max(2, int(round(min(w, h) * 0.02)))

    def dominant(box):
        crop = im.crop(box)
        colors = crop.getcolors(maxcolors=1 << 20) or []
        if not colors:
            return (255, 255, 255)
        return max(colors)[1]

    def off_white(c):
        return max(255 - c[0], 255 - c[1], 255 - c[2]) > 4

    edges = {
        "top": (0, 0, w, band),
        "bottom": (0, h - band, w, h),
        "left": (0, 0, band, h),
        "right": (w - band, 0, w, h),
    }
    return {name: off_white(dominant(box)) for name, box in edges.items()}


def read_manifest(shots_dir):
    path = os.path.join(shots_dir, "manifest.json")
    if not os.path.exists(path):
        return None
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--min", type=float, default=0.01, help="每页最少要有多少墨迹")
    ap.add_argument("--expect", type=int, default=0, help="应该有多少页截图（0 = 以 manifest 为准）")
    ap.add_argument("--shots", default=SHOTS, help="截图目录")
    args = ap.parse_args()

    files = sorted(glob.glob(os.path.join(args.shots, "**", "*.png"), recursive=True))
    if not files:
        print("✗ 没有截图 —— 先跑 npm run shots")
        return 1

    manifest = read_manifest(args.shots)
    expected = args.expect or (len(manifest) if manifest else 0)
    if expected and len(files) != expected:
        print(f"✗ 截图只有 {len(files)} 张，应为 {expected} 张")
        return 1
    if not manifest:
        print("· 没有 manifest.json，跳过背景铺满检查（先跑 npm run shots）")

    problems = []
    ratios = []
    for f in files:
        name = os.path.basename(f)
        try:
            r = ink_ratio(f)
        except Exception as exc:  # 读不出来也算问题
            problems.append(f"{name} 读不出来：{exc}")
            continue
        ratios.append((r, name))
        if r < args.min:
            problems.append(f"{name} 几乎是白板（墨迹占比 {r:.3%}，低于 {args.min:.1%}）")

    # 背景铺满：声明了满版底色场的页，四条边都得有颜色
    if manifest:
        by_id = {(m.get("book", ""), m["id"]): m for m in manifest}
        for f in files:
            name = os.path.basename(f)
            page_id = os.path.splitext(name)[0]
            # 册 id 是截图所在目录名（每一册一个子目录）
            book = os.path.basename(os.path.dirname(f))
            meta = by_id.get((book, page_id))
            if not meta or not meta.get("wash"):
                continue
            try:
                cov = edge_cover(f)
            except Exception as exc:
                problems.append(f"{name} 量不了边缘：{exc}")
                continue
            bad = [edge for edge, ok in cov.items() if not ok]
            if bad:
                problems.append(
                    f"{name} 背景没铺满全局（{'、'.join(bad)} 边的主色还是纸白）"
                )

    if problems:
        print(f"✗ {len(problems)} 张截图有问题：")
        for p in problems:
            print(f"  - {p}")
        return 1

    lo = min(ratios)
    hi = max(ratios)
    print(
        f"✓ 截图检查通过：{len(files)} 张都有内容"
        f"（墨迹占比 {lo[0]:.1%} ~ {hi[0]:.1%}）"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
