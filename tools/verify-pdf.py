"""从真实 Chromium PDF 制作破坏副本，核对成品验收的各条规则。"""
import subprocess
import sys
import tempfile
from pathlib import Path

from pypdf import PdfWriter
from pypdf.generic import (
    ArrayObject, DecodedStreamObject, DictionaryObject, NameObject, NumberObject,
    RectangleObject,
)


def fonts(resources, seen=None):
    seen = set() if seen is None else seen
    resources = resources.get_object()
    if id(resources) in seen:
        return
    seen.add(id(resources))
    table = resources.get('/Font')
    if table is not None:
        for font in table.get_object().values():
            yield font.get_object()
    objects = resources.get('/XObject')
    if objects is not None:
        for obj in objects.get_object().values():
            obj = obj.get_object()
            if '/Resources' in obj:
                yield from fonts(obj['/Resources'], seen)


def mutate(writer, case):
    if case == 'last-page':
        writer.pages[-1].mediabox = RectangleObject([0, 0, 612, 612])
    elif case == 'crop':
        writer.pages[-1].cropbox = RectangleObject([0, 0, 100, 100])
    elif case == 'unit':
        writer.pages[-1][NameObject('/UserUnit')] = NumberObject(2)
    elif case == 'rotation':
        writer.pages[-1].rotate(90)
    elif case == 'count':
        writer.remove_page(len(writer.pages) - 1)
    elif case == 'title':
        writer.add_metadata({'/Title': '错误书名与纸型'})
    elif case == 'no-title':
        writer.metadata = None
    elif case == 'no-fonts':
        for page in writer.pages:
            page[NameObject('/Resources')] = DictionaryObject()
    else:
        # 拼版字体在嵌套 Form XObject 中，直接改其中的真实字体资源。
        font = next(fonts(writer.pages[0]['/Resources']))
        if case == 'type3':
            font[NameObject('/Subtype')] = NameObject('/Type3')
        elif case == 'foreign':
            font[NameObject('/BaseFont')] = NameObject('/AAAAAA+LXGWWenKai-Regular-Foreign')
        elif case == 'no-descendants':
            font[NameObject('/DescendantFonts')] = ArrayObject()
        else:
            leaf = font['/DescendantFonts'][0].get_object()
            descriptor = leaf['/FontDescriptor']
            if case == 'no-descriptor':
                del leaf['/FontDescriptor']
            elif case == 'no-embedding':
                for key in ['/FontFile', '/FontFile2', '/FontFile3']:
                    descriptor.pop(key, None)
            elif case == 'empty-embedding':
                empty = DecodedStreamObject()
                empty.set_data(b'')
                descriptor[NameObject('/FontFile2')] = writer._add_object(empty)
            else:
                raise ValueError(case)


def main():
    single, a4, a3, title = sys.argv[1:]
    checker = Path(__file__).with_name('check-pdf.py')

    def check(file, paper, expected=None):
        pages, width, height, mode = {
            'single': (64, 216, 216, '印刷版'),
            'a4': (32, 297, 210, 'A4 双面骑马钉拼版'),
            'a3': (32, 420, 297, 'A3 双面骑马钉拼版'),
        }[paper]
        result = subprocess.run([
            sys.executable, '-X', 'utf8', str(checker), str(file),
            '--pages', str(pages), '--width-mm', str(width), '--height-mm', str(height),
            '--title', title + '｜' + mode,
        ], capture_output=True, text=True, encoding='utf-8')
        output = result.stdout + result.stderr
        if expected is None:
            assert result.returncode == 0, output
        else:
            assert result.returncode != 0, f'{expected} 没有触发失败'
            assert expected in output, output

    check(single, 'single')
    check(a4, 'a4')
    check(a3, 'a3')
    check(a4, 'a3', '纸型')
    check(a3, 'a4', '纸型')
    with tempfile.TemporaryDirectory(prefix='awulubo-pdf-cases-') as work:
        for case, error in [
            ('last-page', '第 32 页纸型'), ('crop', '裁切框'),
            ('unit', '纸型'), ('rotation', '旋转'), ('count', '页数'),
            ('title', '标题'), ('no-title', '标题'), ('no-fonts', '字体资源'),
            ('type3', 'Type3'), ('foreign', '字体不在许可清单'),
            ('no-descendants', '后代字体'), ('no-descriptor', '字体描述'),
            ('no-embedding', '未嵌入'), ('empty-embedding', '字体程序为空'),
        ]:
            writer = PdfWriter(clone_from=a4)
            file = Path(work) / (case + '.pdf')
            original = Path(a4).read_bytes()
            mutate(writer, case)
            writer.write(file)
            assert file.read_bytes() != original, f'{case} 的破坏未生效'
            check(file, 'a4', error)
            print(f'✓ PDF 破坏回归 {case}')
        # 丢掉页树本身的有效纸型，也不能被解析器的默认纸张补成合格。
        writer = PdfWriter(clone_from=single)
        for page in writer.pages:
            page.pop('/MediaBox', None)
        writer.root_object['/Pages'].pop('/MediaBox', None)
        file = Path(work) / 'no-media-box.pdf'
        writer.write(file)
        assert file.read_bytes() != Path(single).read_bytes()
        check(file, 'single', '纸型')
        file.write_bytes(b'%PDF-1.7\ninvalid')
        check(file, 'single', '无法解析')
    print('✓ PDF 验收回归通过，含三种真实成品、纸型互换及 16 项破坏用例')


if __name__ == '__main__':
    main()
