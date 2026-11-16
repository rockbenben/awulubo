"""字体覆盖检查：书稿与界面渲染出来的每个字符，都必须在对应字体子集里。

用法：python tools/check-text.py
失败即退出码 1——漏字时浏览器会退回系统字体（SimSun / STKaiti），
印刷 PDF 里就会混入没授权的字体，所以这条必须卡住。
"""
import json
import os
import re
import sys

from fontTools.ttLib import TTFont

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
SRC = os.path.join(ROOT, "src")
FONTS = os.path.join(SRC, "fonts")

# 旁白、成人文字、数字与界面用文楷，拟声词和动作提示用站酷快乐体；按各自子集检查。
FALLBACKS = ("simsun", "stkaiti", "simhei", "microsoftyahei", "dengxian")


def page_texts():
    """收集所有会被渲染出来的文字，按字体分工分类。

    文字来自 tools/dump-text.mjs --json 的 pages 与 interface，旁白/大人提示/数字/界面用霞鹜文楷，
    拟声词/动作提示用站酷快乐体——两类文字要各自在自己的子集里查到，不能只看并集。

    读不出来就返回 None：返回空字典会被当成"一个字都不用查"，
    那样这道闸门会在什么都没量的情况下报"通过"——
    而它拦的正是"漏字退回未授权系统字体"。
    """
    import json
    import subprocess
    import sys

    out = subprocess.run(
        ["node", os.path.join(HERE, "dump-text.mjs"), "--json"],
        capture_output=True,
        text=True,
        encoding="utf-8",
    )
    if out.returncode != 0:
        print("✗ 读取页面文字失败：", out.stderr[-400:])
        return None
    try:
        data = json.loads(out.stdout)
    except json.JSONDecodeError as err:
        print("✗ 页面文字不是合法 JSON：", err)
        return None
    if not data.get("pages") or not any(
        "".join(item.get("lines", [])).strip()
        for page in data["pages"] for item in page.get("items", [])
    ):
        print("✗ 一页正文文字都没读到——界面文字不能代替书稿覆盖检查")
        return None
    seen = {}
    for page in data["pages"] + data.get("interface", []):
        for item in page["items"]:
            key = "kai" if item["key"] in ("narration", "adult", "number") else "kuaile"
            # 页码在册内独立（每册都有 p05），所以键里要带上册 id——
            # 只按页码归并会把不同册同一页的文字混成一条，报错时指不出是哪一册。
            pid = (page.get("book", ""), page["id"])
            seen.setdefault((key, pid), "")
            seen[(key, pid)] += "".join(item["lines"])
    if not seen:
        print("✗ 一页文字都没读到——这道闸门不能就这么算通过")
        return None
    return seen


def cmap_of(path):
    font = TTFont(path)
    chars = set()
    for table in font["cmap"].tables:
        chars.update(table.cmap.keys())
    return chars


def main():
    subsets = {
        "kai": cmap_of(os.path.join(FONTS, "lxgw-wenkai-subset.woff2")),
        "kuaile": cmap_of(os.path.join(FONTS, "zcool-kuaile-subset.woff2")),
    }

    texts = page_texts()
    if texts is None:
        return 1

    missing = {}
    total = 0
    for (kind, pid), text in texts.items():
        font = "霞鹜文楷" if kind == "kai" else "站酷快乐体"
        for ch in text:
            if ch in ("\n", "\r", "\t", " "):
                continue
            total += 1
            if ord(ch) not in subsets[kind]:
                missing.setdefault((ch, kind, font), []).append(pid)

    if total == 0:
        print("✗ 一个字符都没量到——不能就这么算通过")
        return 1

    if missing:
        print("✗ 以下字符不在对应字体的子集里（浏览器会退回系统字体，印刷 PDF 会混入未授权字体）：")
        for (ch, kind, font), pids in sorted(missing.items()):
            where = ", ".join(
                f"{book}/{pid}" if book else pid for book, pid in sorted(set(pids))
            )
            print(f"  {ch!r} (U+{ord(ch):04X}) 缺 {font}，出现在 {where}")
        return 1

    print(f"✓ 字体覆盖检查通过：书稿与界面 {total} 个字符，按字体分工全部命中子集")
    print(f"  提示：子集外不得出现 {', '.join(FALLBACKS)} 等系统字体")
    return 0


if __name__ == "__main__":
    sys.exit(main())
