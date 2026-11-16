"""量临时校准色块在真实 PDF 中的毫米尺寸与位置，不以 DOM 尺寸代替印刷结果。"""
import math
import sys

from pypdf import PdfReader
from pypdf.generic import ContentStream

IDENTITY = (1, 0, 0, 1, 0, 0)
MARKER = (1 / 255, 254 / 255, 2 / 255)
TOLERANCE_MM = 0.35  # Chromium 打印量化到像素，允许不到两个 CSS 像素的舍入。


def compose(parent, local):
    a, b, c, d, e, f = parent
    g, h, i, j, k, l = local
    return (a*g + c*h, b*g + d*h, a*i + c*j, b*i + d*j,
            a*k + c*l + e, b*k + d*l + f)


def marker_rectangles(stream, resources, reader, matrix=IDENTITY, color=None):
    stack = []
    rectangles = []
    for operands, operator in ContentStream(stream, reader).operations:
        if operator == b'q':
            stack.append((matrix, color))
        elif operator == b'Q':
            matrix, color = stack.pop()
        elif operator == b'cm':
            matrix = compose(matrix, tuple(float(value) for value in operands))
        elif operator == b'rg':
            color = tuple(float(value) for value in operands)
        elif operator == b're':
            x, y, width, height = map(float, operands)
            a, b, c, d, e, f = matrix
            points = [(a*u + c*v + e, b*u + d*v + f)
                      for u, v in ((x, y), (x+width, y), (x, y+height), (x+width, y+height))]
            rectangles.append((min(p[0] for p in points), min(p[1] for p in points),
                               max(p[0] for p in points), max(p[1] for p in points)))
        elif operator in (b'f', b'f*'):
            if color is not None and all(abs(a-b) < 0.0001 for a, b in zip(color, MARKER)):
                yield from rectangles
            rectangles = []
        elif operator in (b'n', b'm'):
            rectangles = []
        elif operator == b'Do':
            obj = resources['/XObject'][operands[0]].get_object()
            if obj.get('/Subtype') == '/Form':
                yield from marker_rectangles(
                    obj, obj.get('/Resources', resources), reader,
                    compose(matrix, obj.get('/Matrix', IDENTITY)), color,
                )


def check_layout(file, paper):
    cell, sheet_height, per_sheet = {
        'single': (216, 216, 1), 'a4': (148.5, 210, 2), 'a3': (210, 297, 2),
    }[paper]
    scale = cell / 216
    reader = PdfReader(file)
    assert len(reader.pages) == 64 / per_sheet, '校准 PDF 页数错误'
    for number, page in enumerate(reader.pages, 1):
        markers = sorted(marker_rectangles(page.get_contents(), page['/Resources'], reader))
        assert len(markers) == per_sheet, f'{paper} 第 {number} 面校准色块缺失或重复：{len(markers)}'
        for column, (left, bottom, right, top) in enumerate(markers):
            unit = float(page.get('/UserUnit', 1)) * 25.4 / 72
            measured = (left*unit, float(page.mediabox.top)*unit - top*unit,
                        (right-left)*unit, (top-bottom)*unit)
            expected = (column*cell + 10*scale, (sheet_height-cell)/2 + 10*scale,
                        100*scale, 10*scale)
            assert all(math.isfinite(value) for value in measured)
            assert all(abs(a-b) <= TOLERANCE_MM for a, b in zip(measured, expected)), (
                f'{paper} 第 {number} 面第 {column+1} 页实际校准框 x/y/宽/高 '
                f'{tuple(round(value, 3) for value in measured)} mm，应为 '
                f'{tuple(round(value, 3) for value in expected)} mm；'
                '请检查拼版的未缩放布局溢出与打印自动缩放，不能用 DOM 尺寸代替 PDF 验收'
            )
    print(f'✓ {paper} 全部 {len(reader.pages)} 面实际 PDF 的比例、双页位置与垂直居中正确')


if __name__ == '__main__':
    for file, paper in zip(sys.argv[1:], ('single', 'a4', 'a3'), strict=True):
        check_layout(file, paper)
