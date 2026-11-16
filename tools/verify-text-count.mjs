/* 字数回归走真实导出命令与加载器，只在临时册里替换测试文字。 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const base = fs.realpathSync.native(os.tmpdir());
const dir = fs.mkdtempSync(path.join(base, 'awulubo-text-count-'));
const failures = [];
function command(args = []) {
  const result = spawnSync(process.execPath, ['tools/dump-text.mjs', ...args], {
    cwd: dir, encoding: 'utf8', timeout: 10000,
  });
  if (result.error) throw result.error;
  assert.equal(result.status, 0, result.stdout + result.stderr);
  return result.stdout;
}
try {
  fs.cpSync(path.join(root, 'src'), path.join(dir, 'src'), { recursive: true });
  fs.mkdirSync(path.join(dir, 'tools'));
  for (const file of ['dump-text.mjs', 'load-specs.mjs']) {
    fs.copyFileSync(path.join(root, 'tools', file), path.join(dir, 'tools', file));
  }
  fs.copyFileSync(path.join(root, 'package.json'), path.join(dir, 'package.json'));
  const bookDir = path.join(dir, 'src/content/books/count-fixture');
  fs.mkdirSync(path.join(bookDir, 'specs'), { recursive: true });
  fs.writeFileSync(path.join(bookDir, 'book.json'), JSON.stringify({ title: '字数回归' }));
  fs.writeFileSync(path.join(dir, 'src/content/books/index.js'), "export default ['count-fixture'];\n");
  const fixture = path.join(bookDir, 'specs/01-fixture.js');
  function check(name, pages, expected) {
    const source = 'export default ' + JSON.stringify({ pages }) + ';\n';
    fs.writeFileSync(fixture, source);
    assert.equal(fs.readFileSync(fixture, 'utf8'), source, '测试书稿必须确实写入');
    const output = JSON.parse(command(['--json']));
    const human = command();
    try {
      assert.equal(output.books[0].chars, expected, name + ' 的册字数');
      assert.equal(output.total, expected, name + ' 的总字数');
      assert.ok(human.includes(`字数回归（count-fixture）文字合计（不含朗读稿）：${expected} 字`),
        '人读输出必须与 JSON 统计一致');
      console.log('✓ 字数回归 ' + name);
    } catch (error) { failures.push(error); console.error('✗ 字数回归 ' + name + '：实际 ' + output.total + '，预期 ' + expected); }
    return output;
  }
  const page = (text = {}, extra = {}) => ({ id: 'p01', template: 't-search', text, ...extra });
  check('普通文字、标点与空白', [page({ narration: { text: '甲 乙，。\t\n' } })], 4);
  check('字符串换行标记', [page({ narration: { text: '甲<br>乙<br>丙' } })], 3);
  check('数组不计分隔符', [page({ narration: { text: ['甲', '', '乙', ' 丙 '] } })], 3);
  check('数组内仍可换行', [page({ narration: { text: ['甲<br>乙', '丙<br>丁'] } })], 4);
  check('LF 与 CRLF', [page({ narration: { text: '甲\n乙\r\n丙' } })], 3);
  check('HTML 换行写法', [page({ narration: { text: '甲<br/>乙<BR>丙<br />丁' } })], 4);
  check('显示与初始隐藏数字', [page({}, { numbers: [
    { text: '1', at: [100, 100], on: true }, { text: '10', at: [200, 100] },
  ] })], 3);
  check('朗读稿不计入', [page({ narration: { text: '甲' } }, { aria: '额外朗读稿' })], 1);
  check('仅有朗读稿时为零', [page({}, { aria: '这一句只朗读' })], 0);
  check('同文旁白不能被朗读稿排除', [page({ narration: { text: '同一句。' } }, { aria: '同一句。' })], 4);
  check('数组中的同文仍计入', [page({ narration: { text: ['同', '同'] }, sound: { text: '同' } }, { aria: '同' })], 3);
  check('数字不能被同文朗读稿排除', [page({}, { aria: '1', numbers: [{ text: '1', at: [100, 100] }] })], 1);
  check('Unicode 码点规则保留', [page({ narration: { text: '𠮷🙂' } })], 2);
  const exported = check('导出字段及纸书覆写兼容', [page({
    narration: { text: ['甲', '乙'], print: ['纸', '书'] },
    sound: { text: '丙<br>丁' }, prompt: { text: '戊', print: '' }, adult: { text: '己' },
  }, { aria: '只朗读，不重复统计', numbers: [{ text: '1', at: [100, 100], on: true }] })], 7);
  assert.deepEqual(Object.keys(exported), ['books', 'pages', 'interface', 'total']);
  assert.deepEqual(exported.books[0], { id: 'count-fixture', title: '字数回归', chars: 7 });
  assert.deepEqual(exported.pages, [{ book: 'count-fixture', id: 'p01', items: [
    { key: 'narration', lines: ['甲', '乙'] }, { key: 'narration', lines: ['纸', '书'] },
    { key: 'sound', lines: ['丙', '丁'] }, { key: 'prompt', lines: ['戊'] },
    { key: 'adult', lines: ['己'] }, { key: 'number', lines: ['1'] },
  ], numbers: [{ text: '1', on: true }] }]);
  assert.ok(exported.interface.length, '界面文字仍须单独导出');
  check('多页累计', [page({ narration: { text: '甲<br>乙' } }),
    { ...page({ sound: { text: ['丙', '丁'] } }), id: 'p02' }], 4);
  const second = path.join(dir, 'src/content/books/count-second');
  fs.mkdirSync(path.join(second, 'specs'), { recursive: true });
  fs.writeFileSync(path.join(second, 'book.json'), JSON.stringify({ title: '第二册回归' }));
  fs.writeFileSync(path.join(second, 'specs/01-fixture.js'), 'export default ' + JSON.stringify({
    pages: [page({ narration: { text: ['己', '庚'] } }, { aria: '别计入' })],
  }));
  fs.writeFileSync(path.join(dir, 'src/content/books/index.js'), "export default ['count-fixture','count-second'];\n");
  const both = JSON.parse(command(['--json']));
  assert.deepEqual(both.books.map(book => ({ id: book.id, chars: book.chars })), [
    { id: 'count-fixture', chars: 4 }, { id: 'count-second', chars: 2 },
  ]);
  assert.equal(both.total, 6, '册内独立页码不能影响跨册合计');
  console.log('✓ 字数回归 多册分别统计与总计');
} finally {
  assert.equal(path.dirname(dir), base);
  assert.ok(path.basename(dir).startsWith('awulubo-text-count-'));
  fs.rmSync(dir, { recursive: true, force: true });
}
if (failures.length) throw new AggregateError(failures, '字数统计回归失败');
