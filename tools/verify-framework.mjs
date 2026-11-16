/* 在临时副本中验证开发预览、册清单和字体戳记，避免触碰正在编辑的书稿。 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import { createServer } from 'vite';

const root = fileURLToPath(new URL('../', import.meta.url));
const dir = fs.mkdtempSync(path.join(fs.realpathSync.native(os.tmpdir()), 'awulubo-framework-'));
const modules = path.join(dir, 'node_modules');
const manifest = path.join(dir, 'src/content/books/index.js');
const template = path.join(dir, 'src/templates/page.hbs');
let server;
let browser;
try {
  for (const file of ['src', 'tools', 'index.html', 'package.json', 'tsconfig.json']) {
    fs.cpSync(path.join(root, file), path.join(dir, file), { recursive: true });
  }
  fs.symlinkSync(path.join(root, 'node_modules'), modules, 'junction');

  const fontCheck = () => spawnSync(process.execPath, ['tools/build-fonts.mjs', '--check'], {
    cwd: dir, encoding: 'utf8',
  });
  const clean = fontCheck();
  assert.equal(clean.status, 0, clean.stderr);
  const font = path.join(dir, 'src/fonts/lxgw-wenkai-subset.woff2');
  const stamp = path.join(path.dirname(font), '.' + path.basename(font) + '.stamp');
  const original = fs.readFileSync(stamp, 'utf8');
  fs.writeFileSync(stamp, original.split(':')[0] + ':old-source');
  function expectStaleFont() {
    const result = fontCheck();
    assert.equal(result.status, 1);
    assert.match(result.stderr, /lxgw-wenkai-subset\.woff2 缺失或过期/);
  }
  expectStaleFont();
  fs.writeFileSync(stamp, original);
  fs.unlinkSync(font);
  expectStaleFont();
  fs.copyFileSync(path.join(root, 'src/fonts', path.basename(font)), font);

  const { loadBooks } = await import(pathToFileURL(path.join(dir, 'tools/load-specs.mjs')));
  const ids = (await loadBooks()).map((b) => b.id);
  const setManifest = (list) => fs.writeFileSync(manifest, 'export default ' + JSON.stringify(list));
  for (const [list, message] of [[[], /至少一个/], [[ids[0], ids[0]], /重复 id/], [['missing-book'], /缺少跨页文件/]]) {
    setManifest(list);
    await assert.rejects(loadBooks, message);
  }
  setManifest(ids);

  // 真实加载路径必须拦住不存在的绑定目标与未知动作。
  const bindingFile = path.join(dir, 'src/content/books/yiqiwan/specs/17-give.js');
  const bindingSource = fs.readFileSync(bindingFile, 'utf8');
  const bindingRecord = (await import(pathToFileURL(bindingFile))).default;
  const mutateBinding = mutation => {
    const record = structuredClone(bindingRecord);
    const hotspot = record.pages.map(page => page.hotspot).find(h => h?.action === 'pass');
    assert.ok(hotspot, '绑定回归必须找到真实 pass 热区');
    mutation(hotspot);
    const changed = '/** @satisfies {import(\'../../../../js/model.ts\').Spread} */\nexport default ' + JSON.stringify(record, null, 2) + ';\n';
    assert.notEqual(changed, bindingSource, '绑定破坏必须实际改变文件');
    fs.writeFileSync(bindingFile, changed);
  };
  try {
    mutateBinding(hotspot => { hotspot.targetId = 'missing-ball'; });
    await assert.rejects(loadBooks, /targetId 不存在/);
    mutateBinding(hotspot => { hotspot.action = 'unknown-action'; });
    await assert.rejects(loadBooks, /未知动作/);
    const typed = spawnSync(process.execPath, ['node_modules/typescript/bin/tsc', '-p', 'tsconfig.json'], { cwd: dir, encoding: 'utf8' });
    assert.equal(typed.status, 1, typed.stderr);
    assert.match(typed.stdout, /unknown-action/);
  } finally {
    fs.writeFileSync(bindingFile, bindingSource);
  }

  const validTypes = spawnSync(process.execPath, ['node_modules/typescript/bin/tsc', '-p', 'tsconfig.json'], { cwd: dir, encoding: 'utf8' });
  assert.equal(validTypes.status, 0, validTypes.stdout + validTypes.stderr);

  const { bookPages } = await import(pathToFileURL(path.join(dir, 'tools/vite-pages.mjs')));
  server = await createServer({
    root: dir, configFile: false, cacheDir: path.join(dir, '.vite'),
    plugins: [bookPages()],
    server: { host: '127.0.0.1', port: 0, fs: { allow: [dir, path.join(root, 'node_modules')] } },
    logLevel: 'error',
  });
  await server.listen();
  browser = await chromium.launch();
  const page = await browser.newPage();
  page.setDefaultTimeout(10000);
  const connected = () => page.waitForEvent('console', {
    predicate: (msg) => msg.text().includes('[vite] connected'),
  });
  await Promise.all([connected(), page.goto(server.resolvedUrls.local[0])]);
  await Promise.all([connected(), fs.promises.appendFile(template, '\n<i data-template-probe></i>')]);
  await page.waitForSelector('[data-template-probe]', { state: 'attached' });
  const reversed = [...ids].reverse();
  for (const list of [reversed, ids]) {
    const manifestReload = connected();
    setManifest(list);
    await manifestReload;
    await page.waitForFunction((expected) => {
      const books = document.querySelector('#books-manifest');
      return books && JSON.stringify(JSON.parse(books.textContent).map(book => book.id)) === JSON.stringify(expected);
    }, list);
  }
  // 真实书稿 A→B→A 也须自动刷新，只换同长度旁白，确认预览不是只重载了外壳。
  const spread = structuredClone((await import(pathToFileURL(bindingFile))).default);
  const probePage = spread.pages.find(p => p.text?.narration);
  assert.ok(probePage, '书稿自动刷新回归必须找到一条真实旁白');
  for (const text of ['cache-A', 'cache-B', 'cache-A']) {
    probePage.text.narration.text = text;
    await Promise.all([
      connected(),
      fs.promises.writeFile(bindingFile, 'export default ' + JSON.stringify(spread)),
    ]);
    await page.waitForFunction(({ id, text }) => {
      const narration = document.querySelector(`[data-book="yiqiwan"][data-id="${id}"] .narration`);
      return narration?.textContent === text;
    }, { id: probePage.id, text });
  }
  const svg = path.join(dir, 'src/components/effects.svg');
  fs.writeFileSync(svg, fs.readFileSync(svg, 'utf8').replace('</svg>', '<g id="svg-reload-probe"/></svg>'));
  await page.waitForSelector('#svg-reload-probe', { state: 'attached' });
  console.log('✓ 字体戳记、缺失子集、册清单校验、模板/清单/书稿/SVG 自动刷新均通过');
} finally {
  await browser?.close();
  await server?.close();
  if (fs.existsSync(modules)) fs.unlinkSync(modules);
  fs.rmSync(dir, { recursive: true, force: true });
}
