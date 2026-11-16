/* 保留原命令名；前后置预期来自唯一规格引用的冻结R7，不维护第二份文案。 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { loadBooks } from './load-specs.mjs';

const docs = new URL('../docs/superpowers/specs/', import.meta.url);
const contract = fs.readFileSync(new URL('2026-10-30-awulubo-picture-book-design.md', docs), 'utf8');
const annexes = [...contract.matchAll(/\[R7定稿\]\(([^)]+)\)/g)].map(match => match[1]);
const freeze = fs.readFileSync(new URL('2026-11-15-r7-freeze.md', docs), 'utf8');
const books = await loadBooks();
assert.ok(books.length && annexes.length === books.length, '册清单与冻结 R7 附件须一一对应，不得读空');
let checked = 0;
const normalize = value => (Array.isArray(value) ? value.join('\n') : value || '').replace(/<br\s*\/?\s*>/gi, '\n');
for (const book of books) {
  const files = annexes.filter(file => file.endsWith('-' + book.id + '.md'));
  assert.equal(files.length, 1, book.id + ' 缺少唯一 R7 附件');
  const annex = new URL(files[0], docs);
  assert.ok(fs.existsSync(annex), book.id + ' R7附件不存在；请恢复规格链接指向的冻结文件，不得回退R5');
  const raw = fs.readFileSync(annex);
  assert.ok(freeze.includes(createHash('sha256').update(raw).digest('hex')), book.id + ' R7附件与冻结指纹不一致；请恢复冻结稿，不要修改预期来放行旧文案');
  const text = raw.toString('utf8').replace(/\r\n/g, '\n');
  for (const id of ['p01', 'p02', 'p03', 'p60', 'p61', 'p62', 'p63', 'p64']) {
    const section = text.match(new RegExp('^### ' + id + '\\b[^\\n]*\\n([\\s\\S]*?)(?=^### |^## |$(?![\\s\\S]))', 'm'))?.[1];
    assert.ok(section, book.id + '/' + id + ' R7 页面不可读');
    const page = book.pages.find(page => page.id === id);
    assert.ok(page, book.id + '/' + id);
    assert.equal(page.screen !== false, !['p60', 'p61', 'p63', 'p64'].includes(id), book.id + '/' + id + ' 纸屏显示范围不变');
    const expected = {}, expectedPrint = {};
    if (id === 'p60') {
      expected.narration = section.match(/^《.*》$/m)?.[0];
      expected.adult = [...section.matchAll(/^- (.*)$/gm)].map(match => match[1]);
    } else if (id === 'p61') {
      const paragraphs = section.trim().split(/\n\n+/);
      expected.narration = paragraphs.shift();
      expected.adult = paragraphs;
    } else if (id === 'p62') {
      expected.narration = section.match(/^正文：(.*)$/m)?.[1];
      expected.prompt = section.match(/^提示（屏幕提案）：(.*)$/m)?.[1];
    } else {
      for (const match of section.matchAll(/^- (narration|sound|prompt|adult)：(.+?)(?:；纸书：(.+))?$/gm)) {
        expected[match[1]] = JSON.parse(match[2]);
        if (match[3] !== undefined) expectedPrint[match[1]] = JSON.parse(match[3]);
      }
    }
    assert.deepEqual(Object.keys(page.text || {}).sort(), Object.keys(expected).sort(), book.id + '/' + id + ' 文字槽位须匹配 R7');
    for (const [key, value] of Object.entries(expected)) {
      assert.equal(normalize(page.text[key].text), normalize(value), book.id + '/' + id + '/' + key + ' 须与冻结 R7 一致；请同步制作数据，勿回改冻结稿');
      const printed = id === 'p62' && key === 'prompt' ? section.match(/^提示（纸书）：(.*)$/m)?.[1] : expectedPrint[key] ?? value;
      assert.equal(normalize(page.text[key].print ?? page.text[key].text), normalize(printed), book.id + '/' + id + '/' + key + ' 纸书须与冻结 R7 一致；请同步print覆写');
    }
    if (['p60', 'p61', 'p62'].includes(id)) {
      const spoken = Object.values(expected).map(normalize).filter(Boolean).join('\n');
      assert.equal(page.aria, spoken, book.id + '/' + id + ' 朗读稿不能保留旧情节');
    }
    if (id === 'p61') assert.doesNotMatch(normalize(page.text.adult.text), /屏幕版|点错|挪进篮子|都收完才翻页/);
    if (id === 'p62') {
      assert.equal(page.noSound, true, 'R7 重读页无拟声文案，明确保持静音');
      assert.equal(page.sound, undefined, '不能残留旧拟声槽对应的进场音效');
      assert.equal(page.text.prompt.print, section.match(/^提示（纸书）：(.*)$/m)?.[1]);
      assert.equal(page.exit, 'p04');
      assert.equal(page.hotspot?.action, 'again');
      assert.equal(page.hotspot?.targetId, 'arrow-1');
    }
    checked++;
  }
}
console.log(`✓ R7 前后置 ${checked} 页：冻结文字、纸书覆写、朗读稿与重读接口一致`);

if (!process.argv.includes('--gate')) {
  const root = fileURLToPath(new URL('../', import.meta.url));
  const temp = fs.mkdtempSync(path.join(fs.realpathSync.native(os.tmpdir()), 'awulubo-paratext-'));
  try {
    fs.cpSync(path.join(root, 'src'), path.join(temp, 'src'), { recursive: true });
    fs.mkdirSync(path.join(temp, 'tools'));
    for (const name of ['verify-r5-paratext.mjs', 'load-specs.mjs']) {
      fs.copyFileSync(path.join(root, 'tools', name), path.join(temp, 'tools', name));
    }
    fs.copyFileSync(path.join(root, 'package.json'), path.join(temp, 'package.json'));
    const relativeDocs = 'docs/superpowers/specs';
    fs.mkdirSync(path.join(temp, relativeDocs), { recursive: true });
    for (const name of ['2026-10-30-awulubo-picture-book-design.md', '2026-11-15-r7-freeze.md', ...annexes]) {
      fs.copyFileSync(path.join(root, relativeDocs, name), path.join(temp, relativeDocs, name));
    }
    const reject = (name, file, change, error) => {
      const target = path.join(temp, file), original = fs.readFileSync(target, 'utf8');
      const changed = change(original);
      assert.notEqual(changed, original, name + ' 必须实际改变文件');
      fs.writeFileSync(target, changed);
      assert.equal(fs.readFileSync(target, 'utf8'), changed);
      try {
        const result = spawnSync(process.execPath, ['tools/verify-r5-paratext.mjs', '--gate'], { cwd: temp, encoding: 'utf8' });
        if (result.error) throw result.error;
        assert.notEqual(result.status, 0, name + ' 破坏必须失败');
        assert.match(result.stderr, error, name + ' 须给出对应修复信息');
        console.log('✓ 前后置破坏：' + name);
      } finally { fs.writeFileSync(target, original); }
    };
    const mutate = (book, id, code) => original => original.replace('export default', 'const record =') +
      '\nconst page = record.pages.find(p => p.id === ' + JSON.stringify(id) + ');\n' + code + '\nexport default record;\n';
    const source = (book, id) => path.join('src/content/books', book.id, 'specs', book.pages.find(p => p.id === id).file);
    const angry = books.find(b => b.id === 'shengqi');
    for (const [name, code, error] of [
      ['仅纸书正文回退R5', "page.text.adult.text = page.text.adult.text.map(t => t.replace('顶块掉下', '第二次倒下'));", /shengqi\/p61\/adult.*冻结 R7/],
      ['仅aria回退R5', "page.aria = page.aria.replace('顶块掉下', '第二次倒下');", /shengqi\/p61.*朗读稿/],
      ['正文及aria同时回退R5', "page.text.adult.text = page.text.adult.text.map(t => t.replace('顶块掉下', '第二次倒下')); page.aria = page.aria.replace('顶块掉下', '第二次倒下');", /shengqi\/p61\/adult.*冻结 R7/],
      ['仅print覆写回退R5', "page.text.adult.print = page.text.adult.text.map(t => t.replace('顶块掉下', '第二次倒下'));", /shengqi\/p61\/adult.*纸书.*冻结 R7/],
    ]) reject(name, source(angry, 'p61'), mutate(angry, 'p61', code), error);
    for (const book of books) reject(book.id + '前置错误', source(book, 'p03'), mutate(book, 'p03', "page.text.sound.text += '旧';"), /p03\/sound.*冻结 R7/);
    reject('纸书重读提示被抹除', source(angry, 'p62'), mutate(angry, 'p62', "page.text.prompt.print = '';"), /p62\/prompt.*纸书.*冻结 R7/);
    reject('R7链接读空', path.join(relativeDocs, '2026-10-30-awulubo-picture-book-design.md'), s => s.replaceAll('[R7定稿]', '[失效引用]'), /冻结 R7.*不得读空/);
    reject('附件缺失不能回退R5', path.join(relativeDocs, '2026-10-30-awulubo-picture-book-design.md'), s => s.replace('[R7定稿](2026-11-15-script-r7-shengqi.md)', '[R7定稿](missing-shengqi.md)'), /R7附件不存在/);
    reject('冻结稿被改写', path.join(relativeDocs, annexes.find(f => f.endsWith('-shengqi.md'))), s => s.replace('顶块掉下', '第二次倒下'), /冻结指纹不一致/);
    const baseline = spawnSync(process.execPath, ['tools/verify-r5-paratext.mjs', '--gate'], { cwd: temp, encoding: 'utf8' });
    if (baseline.error) throw baseline.error;
    assert.equal(baseline.status, 0, baseline.stderr);
    console.log('✓ 前后置13项破坏均被拒绝，恢复后五册40页通过');
  } finally { fs.rmSync(temp, { recursive: true, force: true }); }
}
