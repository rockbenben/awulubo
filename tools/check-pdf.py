"""解析实际 PDF，核对每页纸型、嵌入字体及文档标题。"""
import argparse
import json
import math
import re
import sys
from pathlib import Path

try:
    from pypdf import PdfReader
except ImportError:
    sys.exit('✗ 缺少 pypdf，请运行 python -m pip install -r requirements.txt')

ALLOWED_FONTS = {'LXGWWenKai-Regular', 'ZCOOLKuaiLe-Regular'}
POINT_TOLERANCE = 1.0  # Chromium 将毫米尺寸量化到像素，容许约 0.35 mm 的舍入。


def check_pdf(file, pages, width_mm, height_mm, title):
    try:
        reader = PdfReader(file, strict=True)
        actual_pages = reader.pages
        page_count = len(actual_pages)
    except Exception as error:
        raise ValueError(f'无法解析 PDF，请重新构建并导出。{error}') from error
    if page_count != pages:
        raise ValueError(f'页数为 {page_count}，应为 {pages}，请检查所选册与分页样式后重新导出')

    expected_width = width_mm * 72 / 25.4
    expected_height = height_mm * 72 / 25.4
    fonts = set()
    seen_fonts = set()
    seen_resources = set()

    def check_font(reference):
        font = reference.get_object()
        if id(font) in seen_fonts:
            return
        seen_fonts.add(id(font))
        if font.get('/Subtype') == '/Type3':
            raise ValueError('发现 Type3 字体，请检查字体子集和文字渲染方式后重新导出')
        name = re.sub(r'^[A-Z]{6}\+', '', str(font.get('/BaseFont', '')).lstrip('/'))
        if name not in ALLOWED_FONTS:
            raise ValueError(f'字体不在许可清单内：{name}，请运行 npm run fonts 后重新构建与导出')
        if font.get('/Subtype') == '/Type0':
            descendants = font.get('/DescendantFonts')
            if descendants is None or not descendants.get_object():
                raise ValueError(f'{name} 缺少后代字体，请重新导出')
            for descendant in descendants.get_object():
                check_font(descendant)
            return
        descriptor = font.get('/FontDescriptor')
        if descriptor is None:
            raise ValueError(f'{name} 缺少字体描述，无法确认嵌入，请重新导出')
        descriptor = descriptor.get_object()
        programs = [descriptor[key].get_object() for key in ('/FontFile', '/FontFile2', '/FontFile3')
                    if key in descriptor]
        if not programs:
            raise ValueError(f'{name} 未嵌入字体程序，请运行 npm run fonts 后重新构建与导出')
        if any(not program.get_data() for program in programs):
            raise ValueError(f'{name} 字体程序为空，请重新构建与导出')
        fonts.add(name)

    def check_resources(reference):
        if reference is None:
            return
        resources = reference.get_object()
        if id(resources) in seen_resources:
            return
        seen_resources.add(id(resources))
        font_table = resources.get('/Font')
        if font_table is not None:
            for font in font_table.get_object().values():
                check_font(font)
        # 拼版文字常在嵌套 Form XObject 内，图案也可能有独立资源。
        for key in ('/XObject', '/Pattern'):
            children = resources.get(key)
            if children is None:
                continue
            for child in children.get_object().values():
                check_resources(child.get_object().get('/Resources'))

    for number, page in enumerate(actual_pages, 1):
        box = page.get('/MediaBox')
        if box is None or len(box.get_object()) != 4:
            raise ValueError(f'第 {number} 页缺少有效纸型，请检查具名 @page 后重新导出')
        box = [float(value) for value in box.get_object()]
        unit = float(page.get('/UserUnit', 1))
        if not all(math.isfinite(value) for value in box + [unit]) or unit <= 0:
            raise ValueError(f'第 {number} 页纸型或单位无效，请重新导出')
        width = (box[2] - box[0]) * unit
        height = (box[3] - box[1]) * unit
        if abs(width - expected_width) > POINT_TOLERANCE or abs(height - expected_height) > POINT_TOLERANCE:
            raise ValueError(
                f'第 {number} 页纸型为 {width:.2f}×{height:.2f} pt，应为 {width_mm}×{height_mm} mm，'
                '请检查具名 @page 和导出参数后重新构建与导出'
            )
        if float(page.get('/Rotate', 0)) % 360 != 0:
            raise ValueError(f'第 {number} 页存在旋转，纸张方向不符，请检查导出样式')
        crop = page.get('/CropBox')
        if crop is not None:
            crop = [float(value) for value in crop.get_object()]
            if len(crop) != 4 or any(not math.isfinite(value) for value in crop):
                raise ValueError(f'第 {number} 页裁切框无效，请重新导出')
            if any(abs(a - b) * unit > POINT_TOLERANCE for a, b in zip(crop, box)):
                raise ValueError(f'第 {number} 页裁切框改变了纸张可见范围，请检查打印样式')
        check_resources(page.get('/Resources'))

    if fonts != ALLOWED_FONTS:
        missing = '、'.join(sorted(ALLOWED_FONTS - fonts))
        raise ValueError(f'字体资源缺失：{missing}，请检查文字渲染并重新导出')
    actual_title = reader.metadata.title if reader.metadata else None
    if actual_title != title:
        raise ValueError(f'标题为 {actual_title!r}，应为 {title!r}，请检查所选册与纸型对应的 document.title')
    return {'pages': page_count, 'fonts': sorted(fonts), 'title': actual_title}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('file', type=Path)
    parser.add_argument('--pages', type=int, required=True)
    parser.add_argument('--width-mm', type=float, required=True)
    parser.add_argument('--height-mm', type=float, required=True)
    parser.add_argument('--title', required=True)
    args = parser.parse_args()
    if args.pages <= 0 or not args.title.strip() or not all(
        math.isfinite(value) and value > 0 for value in (args.width_mm, args.height_mm)
    ):
        parser.error('页数、纸型和标题必须有效，禁止以空数据验收')
    try:
        result = check_pdf(args.file, args.pages, args.width_mm, args.height_mm, args.title)
    except Exception as error:
        sys.exit(f'✗ {args.file.name} PDF 验收失败：{error}')
    print(json.dumps(result, ensure_ascii=False))


if __name__ == '__main__':
    main()
