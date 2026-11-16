"""在临时目录破坏截图集合，验证身份核对与原有像素检查。"""
import hashlib
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw

CHECKER = Path(__file__).with_name('check-shots.py')
MANIFEST = [
    {'book': 'first', 'id': 'p01', 'wash': True},
    {'book': 'second', 'id': 'p01', 'wash': False},
]


def snapshot(directory):
    return {str(p.relative_to(directory)): hashlib.sha256(p.read_bytes()).hexdigest()
            for p in directory.rglob('*') if p.is_file()}


def run(directory, *extra):
    result = subprocess.run([sys.executable, '-X', 'utf8', str(CHECKER),
                             '--shots', str(directory), *extra],
                            capture_output=True, text=True, encoding='utf-8')
    return result.returncode, result.stdout + result.stderr


def main():
    with tempfile.TemporaryDirectory(prefix='awulubo-shots-') as temporary:
        root = Path(temporary)
        baseline = root / 'baseline'
        for item in MANIFEST:
            file = baseline / item['book'] / (item['id'] + '.png')
            file.parent.mkdir(parents=True, exist_ok=True)
            image = Image.new('RGB', (80, 80), '#ffe94d')
            ImageDraw.Draw(image).rectangle((20, 20, 60, 60), fill='black')
            image.save(file)
        manifest = baseline / 'manifest.json'
        manifest.write_text(json.dumps(MANIFEST), encoding='utf-8')
        code, output = run(baseline)
        assert code == 0, output
        code, output = run(baseline, '--expect', '2')
        assert code == 0, output

        def case(name, change, expected, *extra):
            directory = root / name
            shutil.copytree(baseline, directory)
            before = snapshot(directory)
            change(directory)
            assert snapshot(directory) != before, name + ' 的破坏未生效'
            code, output = run(directory, *extra)
            assert code != 0, name + ' 被错误放行：\n' + output
            assert expected in output, output
            print('✓ 截图集合破坏回归 ' + name)

        case('missing-manifest', lambda d: (d/'manifest.json').unlink(), 'manifest.json')
        case('empty-manifest', lambda d: (d/'manifest.json').write_text('[]'), '非空数组')
        case('invalid-json', lambda d: (d/'manifest.json').write_text('{'), '清单')
        case('duplicate-entry', lambda d: (d/'manifest.json').write_text(
            json.dumps([MANIFEST[0], MANIFEST[0]])), '重复')
        case('invalid-entry', lambda d: (d/'manifest.json').write_text(
            json.dumps([MANIFEST[0], {'id': 'p01', 'wash': False}])), '有效册页')
        case('missing-page', lambda d: (d/'first/p01.png').unlink(), '缺少截图')
        case('extra-page', lambda d: shutil.copyfile(d/'first/p01.png', d/'first/p02.png'), '多余截图')
        case('same-count-wrong-page', lambda d: (d/'first/p01.png').rename(d/'first/p02.png'), 'first/p01.png')
        case('same-count-wrong-book', lambda d: (d/'first').rename(d/'other'), '缺少截图')
        case('empty-manifest-expect', lambda d: (d/'manifest.json').write_text('[]'), '非空数组', '--expect', '2')
        case('blank-page', lambda d: Image.new('RGB', (80, 80), 'white').save(d/'first/p01.png'), '白板')
        case('wash-not-full', lambda d: Image.new('RGB', (80, 80), 'white').save(d/'first/p01.png'), '背景没铺满')
        code, output = run(baseline, '--expect', '1')
        assert code != 0 and '--expect' in output, output
        code, output = run(baseline, '--image', str(baseline/'first/p01.png'))
        assert code == 0 and '单图诊断' in output, output
    print('✓ 截图集合、显式单图诊断与像素检查回归通过')


if __name__ == '__main__':
    main()
