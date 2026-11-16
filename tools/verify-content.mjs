/* 书稿、界面文字与制作工具的联合回归；破坏只发生在临时副本。 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import { loadBooks } from './load-specs.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const books = await loadBooks();
const failures = [];
async function check(name, run) {
  try { await run(); console.log('✓ ' + name); }
  catch (error) { failures.push(error); console.error('✗ ' + name + ': ' + error.message); }
}
function command(cwd, executable, args) {
  const result = spawnSync(executable, args, { cwd, encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 });
  if (result.error) throw result.error;
  return result;
}
await check('成人提示随册元数据维护', () => {
  assert.ok(books.length > 0);
  for (const id of ['awulubo', 'labuluo', 'yiqiwan', 'shengqi', 'wuzilai']) {
    const book = books.find(book => book.id === id);
    assert.ok(typeof book?.meta.adultTip === 'string' && book.meta.adultTip.trim(), id);
  }
});
await check('文字导出保留七条数字与初始显隐', () => {
  const result = command(root, process.execPath, ['tools/dump-text.mjs', '--json']);
  assert.equal(result.status, 0, result.stderr);
  const pages = JSON.parse(result.stdout).pages;
  let count = 0;
  for (const book of books) for (const page of book.pages) {
    const expected = (page.numbers || []).map(number => ({ text: number.text, on: Boolean(number.on) }));
    const actual = pages.find(row => row.book === book.id && row.id === page.id);
    assert.deepEqual(actual.numbers, expected, book.id + '/' + page.id);
    if (book.id === 'awulubo') count += expected.length;
  }
  assert.equal(count, 7);
});

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 900, height: 900 } });
  const open = async (book, id) => {
    await page.goto(pathToFileURL(path.join(root, 'dist/index.html')).href + '?book=' + book + '#' + id);
    await page.evaluate(() => document.fonts.ready);
  };
  await check('浮层全部文字使用内嵌字体，提示由清单驱动', async () => {
    await open('yiqiwan', 'p01');
    await page.locator('#shell-btn').click();
    const client = await page.context().newCDPSession(page);
    await client.send('DOM.enable'); await client.send('CSS.enable');
    for (const book of books) {
      await page.locator('#shell [data-book="' + book.id + '"]').click();
      if (book.meta.adultTip) assert.equal(await page.locator('[data-tip]').textContent(), book.meta.adultTip);
      const { root: document } = await client.send('DOM.getDocument');
      const { nodeIds } = await client.send('DOM.querySelectorAll', {
        nodeId: document.nodeId, selector: '#shell .shell-h, #shell .shell-tip, #shell .shell-btn',
      });
      assert.ok(nodeIds.length > 0);
      for (const nodeId of nodeIds) {
        const { fonts } = await client.send('CSS.getPlatformFontsForNode', { nodeId });
        assert.ok(fonts.length > 0);
        assert.ok(fonts.every(font => font.isCustomFont), book.id + ' 回退字体：' + JSON.stringify(fonts));
      }
    }
    await page.keyboard.press('Escape');
    await page.evaluate(() => {
      const manifest = document.querySelector('#books-manifest');
      const list = JSON.parse(manifest.textContent);
      list.find(book => book.id === Book.book()).adultTip = '这句话来自册清单。';
      manifest.textContent = JSON.stringify(list);
    });
    await page.locator('#shell-btn').click();
    assert.equal(await page.locator('[data-tip]').textContent(), '这句话来自册清单。');
    await page.keyboard.press('Escape');
    await page.evaluate(() => {
      const manifest = document.querySelector('#books-manifest');
      const list = JSON.parse(manifest.textContent);
      delete list.find(book => book.id === Book.book()).adultTip;
      manifest.textContent = JSON.stringify(list);
    });
    await page.locator('#shell-btn').click();
    const { readerLabels } = await import('../src/content/reader-ui.js');
    assert.equal(await page.locator('[data-tip]').textContent(), readerLabels.adultDefault);
    await client.detach();
  });
  await check('p36 点球上抛、键盘替代与离页复位', async () => {
    for (const width of [900, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await open('yiqiwan', 'p36');
      const host = page.locator('[data-book=yiqiwan][data-id=p36]');
      const button = host.locator('[data-target-id=ball-1]');
      assert.equal(await button.count(), 1, '扔球提示必须有绑定球的专属热区');
      const ball = host.locator('[data-object=ball-1]');
      const before = await ball.getAttribute('transform');
      if (width === 900) await button.click();
      else { await button.focus(); await page.keyboard.press('Enter'); }
      await page.waitForFunction(initial => {
        const ball = document.querySelector('[data-book=yiqiwan][data-id=p36] [data-object=ball-1]');
        return Number(ball.getAttribute('transform').match(/translate\([^,]+,\s*([^ )]+)/)[1]) < initial - 30;
      }, Number(before.match(/translate\(\s*[^, ]+[ ,]+(-?[\d.]+)/)[1]));
      await page.waitForFunction(expected => Book.page().dataset.id === expected, width === 900 ? 'p37' : 'p38');
      await page.evaluate(() => Book.goToId('p36'));
      assert.equal(await ball.getAttribute('transform'), before);
      await button.click();
      await page.evaluate(() => { Book.goToId('p38'); Book.goToId('p36'); });
      await page.waitForTimeout(900);
      assert.equal(await page.evaluate(() => Book.page().dataset.id), 'p36');
      assert.equal(await ball.getAttribute('transform'), before);
    }
  });
  await check('p06 只让孩子寻找画面上的对象', async () => {
    const spec = books.find(book => book.id === 'labuluo').pages.find(page => page.id === 'p06');
    assert.doesNotMatch(spec.text.narration.text + spec.aria, /桌|床/);
    assert.ok(spec.text.prompt.print?.trim());
    for (const hotspot of spec.hotspot) {
      assert.doesNotMatch(hotspot.label, /掀开/);
      assert.ok(spec.props.some(prop => prop.id === hotspot.targetId));
    }
    await page.setViewportSize({ width: 900, height: 900 });
    await open('labuluo', 'p06');
    for (const hotspot of spec.hotspot) await page.locator('.is-active [data-target-id="' + hotspot.targetId + '"]').click();
    await page.waitForFunction(() => Book.page().dataset.id === 'p07');
  });
} finally { await browser.close(); }

await check('成人提示的新字同时触发子集新鲜度与字体覆盖失败', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'awulubo-text-'));
  const modules = path.join(dir, 'node_modules');
  try {
    for (const name of ['src', 'tools', 'package.json']) fs.cpSync(path.join(root, name), path.join(dir, name), { recursive: true });
    fs.symlinkSync(path.join(root, 'node_modules'), modules, 'junction');
    const file = path.join(dir, 'src/content/books/yiqiwan/book.json');
    const original = fs.readFileSync(file, 'utf8');
    const meta = JSON.parse(original);
    meta.adultTip = (meta.adultTip || '') + '龘';
    fs.writeFileSync(file, JSON.stringify(meta));
    assert.notEqual(fs.readFileSync(file, 'utf8'), original);
    const stale = command(dir, process.execPath, ['tools/build-fonts.mjs', '--check']);
    assert.equal(stale.status, 1, '提示改字不能仍被判为字体新鲜');
    const coverage = command(dir, 'python', ['-X', 'utf8', 'tools/check-text.py']);
    assert.equal(coverage.status, 1, '提示缺字必须失败');
    assert.match(coverage.stdout + coverage.stderr, /龘.*霞鹜文楷/);
    fs.writeFileSync(file, original);
    const baseline = command(dir, process.execPath, ['tools/build-fonts.mjs', '--check']);
    assert.equal(baseline.status, 0, baseline.stdout + baseline.stderr);
    delete meta.adultTip;
    fs.writeFileSync(file, JSON.stringify(meta));
    const legacy = command(dir, process.execPath, ['--input-type=module', '-e',
      "import {loadBooks} from './tools/load-specs.mjs'; if (!(await loadBooks()).length) process.exit(1);"]);
    assert.equal(legacy.status, 0, '旧元数据省略 adultTip 仍须可加载：' + legacy.stderr);
    const dump = path.join(dir, 'tools/dump-text.mjs');
    const dumpSource = fs.readFileSync(dump, 'utf8');
    const empty = dumpSource.replace('const books = await loadBooks();', 'const books = [];');
    assert.notEqual(empty, dumpSource, '读空书稿的破坏必须确实生效');
    fs.writeFileSync(dump, empty);
    const noPages = command(dir, 'python', ['-X', 'utf8', 'tools/check-text.py']);
    assert.equal(noPages.status, 1);
    assert.match(noPages.stdout + noPages.stderr, /一页正文文字都没读到/);
  } finally {
    if (fs.existsSync(modules)) fs.unlinkSync(modules);
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
await check('审稿快照覆盖全部页与数字，能拦截删数字，兼容 LF/CRLF', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'awulubo-manuscript-'));
  try {
    for (const name of ['src', 'tools', 'package.json']) fs.cpSync(path.join(root, name), path.join(dir, name), { recursive: true });
    const docs = path.join(dir, 'docs/superpowers/specs');
    fs.mkdirSync(docs, { recursive: true });
    let numbers = 0;
    for (const book of books) {
      const name = '2026-11-13-manuscript-' + book.id + '.md';
      const source = fs.readFileSync(path.join(root, 'docs/superpowers/specs', name), 'utf8');
      assert.equal((source.match(/^#### p\d+/gm) || []).length, book.pages.length);
      numbers += (source.match(/^- \*\*数字 \d+\*\*/gm) || []).length;
      fs.writeFileSync(path.join(docs, name), source);
    }
    assert.equal(numbers, books.reduce((sum, book) => sum + book.pages.reduce(
      (total, page) => total + (page.numbers || []).length, 0), 0));
    const checkSnapshot = () => command(dir, process.execPath, ['tools/manuscript.mjs', '--check']);
    const baseline = checkSnapshot();
    assert.equal(baseline.status, 0, baseline.stdout + baseline.stderr);
    const file = path.join(docs, '2026-11-13-manuscript-awulubo.md');
    const original = fs.readFileSync(file, 'utf8');
    const broken = original.replace(/^- \*\*数字 1\*\*[^\n]*\n/m, '');
    assert.notEqual(broken, original, '删数字的破坏必须确实生效');
    fs.writeFileSync(file, broken);
    const failed = checkSnapshot();
    assert.equal(failed.status, 1);
    assert.match(failed.stderr, /awulubo.*node tools\/manuscript.mjs/);
    fs.writeFileSync(file, original.replace(/\r?\n/g, '\r\n'));
    for (const source of ['src/content/reader-ui.js', 'src/content/books/awulubo/book.json',
      'src/content/books/awulubo/specs/38-count.js']) {
      const absolute = path.join(dir, source);
      fs.writeFileSync(absolute, fs.readFileSync(absolute, 'utf8').replace(/\r?\n/g, '\r\n'));
    }
    const crlf = checkSnapshot();
    assert.equal(crlf.status, 0, crlf.stdout + crlf.stderr);
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});
if (failures.length) throw new AggregateError(failures, '书稿与文字工具回归失败');
