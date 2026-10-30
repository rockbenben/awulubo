"""截图检查：每一页都得真的画出来，不能是白板。

为什么要这道闸门：有一次把「书页居中」的 CSS 写成了 body.screen，
拼版（proof.html 的 body 是 screen static）也吃到了这条规则，
32 页全叠到了一起——**结构检查、版式检查、交互冒烟、乱读压力测试全都通过**，
只有人眼看联系表才发现整本截图是白板。

所以：图不是靠闸门保证的，得让闸门自己看一眼。

用法：python tools/check-shots.py [--min 0.01]
失败即退出码 1。
"""
import argparse
import glob
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


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--min", type=float, default=0.01, help="每页最少要有多少墨迹")
    ap.add_argument("--expect", type=int, default=32, help="应该有多少页截图")
    ap.add_argument("--shots", default=SHOTS, help="截图目录")
    args = ap.parse_args()

    files = sorted(glob.glob(os.path.join(args.shots, "p*.png")))
    if not files:
        print("✗ 没有截图 —— 先跑 npm run shots")
        return 1
    if len(files) != args.expect:
        print(f"✗ 截图只有 {len(files)} 张，应为 {args.expect} 张")
        return 1

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
