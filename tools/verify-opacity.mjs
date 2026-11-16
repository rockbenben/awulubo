/* 透明文字回归：独立读取最终截图作参照，只修改临时成品。 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import { loadSpecs } from './load-specs.mjs';
import { pngPixels } from './png-pixels.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const spec = (await loadSpecs()).find(page => page.numbers?.length === 1 && page.numbers[0].on && page.numbers[0].size >= 20);
assert.ok(spec, '回归须读到真实的大字数字');
const base = fs.realpathSync.native(os.tmpdir());
const dir = fs.mkdtempSync(path.join(base, 'awulubo-opacity-'));
const modules = path.join(dir, 'node_modules');
const failures = [];
const luminance = rgb => rgb.map(v => v / 255).map(v => v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4)
  .reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
const contrast = (a, b) => (Math.max(luminance(a), luminance(b)) + .05) / (Math.min(luminance(a), luminance(b)) + .05);
let browser;
try {
  for (const name of ['src', 'tools', 'package.json']) fs.cpSync(path.join(root, name), path.join(dir, name), { recursive: true });
  fs.symlinkSync(path.join(root, 'node_modules'), modules, 'junction');
  fs.mkdirSync(path.join(dir, 'dist'));
  fs.renameSync(path.join(dir, 'tools/load-specs.mjs'), path.join(dir, 'tools/load-specs-base.mjs'));
  fs.writeFileSync(path.join(dir, 'tools/load-specs.mjs'), `import {loadSpecs as all} from './load-specs-base.mjs';
export async function loadSpecs(){return (await all()).filter(p=>p.book===${JSON.stringify(spec.book)}&&p.id===${JSON.stringify(spec.id)}).map(p=>({...p,text:{}}));}`);
  const selector = `[data-book="${spec.book}"][data-id="${spec.id}"]`;
  const section = new RegExp(`<section\\b[^>]*data-id="${spec.id}"[^>]*data-book="${spec.book}"[^>]*>[\\s\\S]*?<\\/section>`);
  const originals = Object.fromEntries(['proof.html', 'index.html'].map(file => {
    const original = fs.readFileSync(path.join(root, 'dist', file), 'utf8');
    assert.ok(section.test(original), '先构建，成品中须有数字页');
    return [file, original.replace(section, part => part.replace(/<(p|h1)\b[^>]*class="(?:narration|sound|prompt|adult)"[^>]*>[\s\S]*?<\/\1>/g, ''))];
  }));
  browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 1600 }, deviceScaleFactor: 2 });
  const cases = [
    { name: '不透明正常基线', opacity: 1, inner: 'white', pass: true },
    { name: '灰内底白外底', opacity: .5, inner: '#666', pass: false },
    { name: '仅纸书破坏', opacity: .5, inner: '#666', pass: false, only: 'proof.html' },
    { name: '仅屏幕破坏', opacity: .5, inner: '#666', pass: false, only: 'index.html' },
    { name: '多层透明度漏检', opacity: .75, layerOpacity: 2 / 3, inner: '#666', pass: false },
    { name: '三级透明度叠加', opacity: .8, layerOpacity: .8, inkOpacity: .8, inner: '#666', pass: false },
    { name: '不同分组底色的正常对比度', opacity: .8, layerOpacity: .625, pageBackground: '#555', inner: '#ddd', pass: true },
    { name: '透明大字保留抗锯齿容差', opacity: .5, inner: 'white', size: 24, pass: true, antialias: true },
    { name: '透明小字仍须4.5比1', opacity: .5, inner: 'white', size: 18, pass: false },
    { name: '灰内底正常大字保留抗锯齿容差', opacity: .75, inner: '#666', size: 24, pass: true, antialias: true },
    { name: '仅字色半透明仍正常', opacity: 1, color: 'rgba(0,0,0,.5)', inner: 'white', size: 24, pass: true, antialias: true },
    { name: '数字自身透明度仍正常', opacity: 1, inkOpacity: .5, inner: 'white', size: 24, pass: true, antialias: true },
  ];
  for (const test of cases) {
    for (const [file, original] of Object.entries(originals)) {
      const active = !test.only || test.only === file;
      let changed = original;
      if (active && test.layerOpacity) changed = changed.replace(section, part => part.replace(/^(<section\b[^>]*>)([\s\S]*)(<\/section>)$/,
        '$1<div class="opacity-layer">$2</div>$3'));
      const css = `html,body,.stage{background:white!important}
${selector}{background:${active ? test.pageBackground || 'white' : 'white'}!important;opacity:${active ? test.opacity : 1}!important}
${selector} .art{background:${active && !test.layerOpacity ? test.inner : 'transparent'}!important}
${selector} .art>svg{visibility:hidden!important}
${selector} .number{color:${active ? test.color || 'black' : 'black'}!important;opacity:${active ? test.inkOpacity ?? 1 : 1}!important;${active && test.size ? `font-size:${test.size}px!important;` : ''}}
${selector} .opacity-layer{position:absolute;inset:0;opacity:${test.layerOpacity || 1};background:${test.inner}}`;
      changed = changed.replace('</head>', `<style>${css}</style></head>`);
      assert.notEqual(changed, original, '样式必须确实写入');
      fs.writeFileSync(path.join(dir, 'dist', file), changed);
      assert.equal(fs.readFileSync(path.join(dir, 'dist', file), 'utf8'), changed);
    }
    const file = test.only || 'proof.html';
    await page.goto(pathToFileURL(path.join(dir, 'dist', file)).href);
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => document.body.classList.add('static'));
    const host = page.locator(selector);
    const rect = await host.locator('.number').evaluate(el => {
      const r = document.createRange(); r.selectNodeContents(el);
      const a = r.getBoundingClientRect(), b = el.closest('.page').getBoundingClientRect();
      return { x: a.x - b.x, y: a.y - b.y, right: a.right - b.x, bottom: a.bottom - b.y, pageW: b.width };
    });
    const image = pngPixels(await host.screenshot({ animations: 'disabled' }));
    await page.addStyleTag({ content: selector + ' .number{visibility:hidden!important}' });
    const bare = pngPixels(await host.screenshot({ animations: 'disabled' }));
    const scale = image.width / rect.pageW;
    let strongest = -1, reference = 0, ink = 0, rawBad = 0;
    const need = test.size && test.size < 24 ? 4.5 : 3;
    for (let y = Math.max(0, Math.floor(rect.y * scale)); y < Math.min(image.height, Math.ceil(rect.bottom * scale)); y++) {
      for (let x = Math.max(0, Math.floor(rect.x * scale)); x < Math.min(image.width, Math.ceil(rect.right * scale)); x++) {
        const a = (y * image.width + x) * image.channels, b = (y * bare.width + x) * bare.channels;
        const fg = [0, 1, 2].map(c => image.data[a + c]), bg = [0, 1, 2].map(c => bare.data[b + c]);
        const differences = fg.map((v, i) => Math.abs(v - bg[i]));
        if (differences.every(v => v < 16)) continue;
        ink++;
        const ratio = contrast(fg, bg);
        if (ratio < need) rawBad++;
        const strength = differences.reduce((sum, v) => sum + v, 0);
        if (strength > strongest) { strongest = strength; reference = ratio; }
      }
    }
    assert.ok(ink > 0, '参照截图须有真实墨迹');
    assert.equal(reference >= need, test.pass, test.name + ' 的实际笔画参照必须符合用例预期：' + reference);
    if (test.antialias) assert.ok(rawBad / ink > .02, '正常用例须包含足够多的抗锯齿边缘，才能防止直接按边缘像素误报');
    const result = spawnSync(process.execPath, ['tools/check-contrast.mjs', spec.book + '/' + spec.id], { cwd: dir, encoding: 'utf8', timeout: 60000 });
    if (result.error) throw result.error;
    const output = result.stdout + result.stderr;
    try {
      assert.equal(result.status, test.pass ? 0 : 1, test.name + '\n' + output);
      if (!test.pass) assert.match(output, /number.*笔画底色对比度不足/);
      const ratioMatch = output.match(test.pass ? /number num-1[^\n]*?([\d.]+):1，低对比/ : /number num-1[^\n]*?最差处 ([\d.]+):1/);
      assert.ok(ratioMatch, '须报告数字实测值，不能因其他文字失败而误判通过');
      assert.ok(Math.abs(Number(ratioMatch[1]) - reference) < .65, '数字对比度应接近独立截图参照：' + reference + '\n' + output);
      console.log('✓ 透明度回归 ' + test.name + '，实测 ' + ratioMatch[1] + ':1，参照 ' + reference.toFixed(2) + ':1');
    } catch (error) { failures.push(error); console.error('✗ 透明度回归 ' + test.name + '，参照 ' + reference.toFixed(2) + ':1'); }
  }
  // 校准没有取得实笔画时必须失败，不能因排除了抗锯齿边缘而空跑放行。
  const checker = path.join(dir, 'tools/check-contrast.mjs');
  const source = fs.readFileSync(checker, 'utf8');
  const disabled = source.replace('-webkit-text-fill-color:', '--disabled-text-fill:');
  assert.notEqual(disabled, source, '禁用探针的破坏必须确实生效');
  fs.writeFileSync(checker, disabled);
  assert.equal(fs.readFileSync(checker, 'utf8'), disabled);
  const empty = spawnSync(process.execPath, ['tools/check-contrast.mjs', spec.book + '/' + spec.id], { cwd: dir, encoding: 'utf8', timeout: 60000 });
  if (empty.error) throw empty.error;
  assert.equal(empty.status, 1, empty.stdout + empty.stderr);
  assert.match(empty.stderr, /number.*量不到文字墨迹/);
  console.log('✓ 透明度回归 校准信号为零必须失败');
} finally {
  await browser?.close();
  if (fs.existsSync(modules)) fs.unlinkSync(modules);
  assert.equal(path.dirname(dir), base);
  assert.ok(path.basename(dir).startsWith('awulubo-opacity-'));
  fs.rmSync(dir, { recursive: true, force: true });
}
if (failures.length) throw new AggregateError(failures, '透明度对比度回归失败');
