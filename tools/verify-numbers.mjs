/* 数字视觉闸门回归：只破坏临时成品，正常的初始隐藏与真实点数仍须通过。 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import { loadSpecs } from './load-specs.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const specs = await loadSpecs();
const numbered = specs.filter(spec => spec.numbers?.length);
assert.ok(numbered.length, '回归必须读到真实数字书稿');
const visible = numbered.find(spec => spec.numbers.some(number => number.on));
const hidden = numbered.find(spec => spec.numbers.some(number => !number.on));
const large = numbered.find(spec => spec.numbers.length === 1 && spec.numbers[0].on && spec.numbers[0].size >= 20);
const plain = specs.find(spec => !spec.numbers?.length);
assert.ok(visible && hidden && plain && large, '回归须包含初始显示、隐藏、大字和无数字页');
const dir = fs.mkdtempSync(path.join(fs.realpathSync.native(os.tmpdir()), 'awulubo-numbers-'));
const modules = path.join(dir, 'node_modules');
const failures = [];
let browser;
try {
  for (const entry of ['src', 'tools', 'package.json']) {
    fs.cpSync(path.join(root, entry), path.join(dir, entry), { recursive: true });
  }
  fs.symlinkSync(path.join(root, 'node_modules'), modules, 'junction');
  fs.mkdirSync(path.join(dir, 'dist'));
  const originals = Object.fromEntries(['index.html', 'proof.html'].map(file =>
    [file, fs.readFileSync(path.join(root, 'dist', file), 'utf8')]));
  fs.renameSync(path.join(dir, 'tools/load-specs.mjs'), path.join(dir, 'tools/load-specs-base.mjs'));
  const loader = path.join(dir, 'tools/load-specs.mjs');
  const selection = `import {loadSpecs as all} from './load-specs-base.mjs';
export async function loadSpecs(){return (await all()).filter(p=>p.numbers?.length ||
  (p.book===${JSON.stringify(plain.book)} && p.id===${JSON.stringify(plain.id)}));}
`;
  fs.writeFileSync(loader, selection);
  const scopes = [...numbered, plain].map(spec => spec.book + '/' + spec.id);
  const selector = spec => `[data-book="${spec.book}"][data-id="${spec.id}"]`;
  const section = spec => new RegExp(`<section\\b[^>]*data-id="${spec.id}"[^>]*data-book="${spec.book}"[^>]*>[\\s\\S]*?<\\/section>`);
  function numberChange(spec, transform) {
    return html => html.replace(section(spec), part => part.replace(
      /<p class="number num-1\b[^>]*>[\s\S]*?<\/p>/, transform));
  }
  function css(spec, rule) {
    return html => html.replace('</head>', `<style>${selector(spec)} ${rule}</style></head>`);
  }
  function restore(change, only) {
    for (const [file, original] of Object.entries(originals)) {
      const changed = change && (!only || file === only) ? change(original) : original;
      if (change && (!only || file === only)) assert.notEqual(changed, original, '数字破坏必须确实生效');
      fs.writeFileSync(path.join(dir, 'dist', file), changed);
      assert.equal(fs.readFileSync(path.join(dir, 'dist', file), 'utf8'), changed);
    }
  }
  function check(name, change, error, checks = ['layout', 'contrast'], only) {
    restore(change, only);
    for (const checker of checks) {
      const result = spawnSync(process.execPath, [`tools/check-${checker}.mjs`, ...(checker === 'contrast' ? scopes : [])], {
        cwd: dir, encoding: 'utf8', timeout: 60000,
      });
      if (result.error) throw result.error;
      const output = result.stdout + result.stderr;
      try {
        assert.equal(result.status, error ? 1 : 0, name + ' / ' + checker + '\n' + output);
        if (error) assert.match(output, error, output);
        console.log('✓ 数字视觉回归 ' + name + ' / ' + checker);
      } catch (failure) { failures.push(failure); console.error('✗ 数字视觉回归 ' + name + ' / ' + checker); }
    }
  }
  check('正常初始显示与隐藏');
  const horizontalCrop = css(large, '.num-1{width:50px!important;height:400px!important;overflow:hidden!important}');
  check('宽50高400的水平裁切', horizontalCrop, /number.*文字被裁.*横向/, ['layout']);
  check('仅纸书水平裁切', horizontalCrop, /number.*文字被裁.*横向/, ['layout'], 'proof.html');
  check('仅屏幕水平裁切', horizontalCrop, /number.*文字被裁.*横向/, ['layout'], 'index.html');
  check('clip同样裁切数字', css(large, '.num-1{width:50px!important;height:400px!important;overflow:clip!important}'), /number.*文字被裁.*横向/, ['layout']);
  check('内联重要样式的水平裁切', numberChange(large, part => part.replace('style="',
    'style="width:50px!important;height:400px!important;overflow:hidden!important;')), /number.*文字被裁.*横向/, ['layout']);
  check('互动显示后的水平裁切', css(hidden, '.num-2{width:25px!important;height:400px!important;overflow:hidden!important}'), /number.*文字被裁.*横向/, ['layout']);
  check('容器窄但允许完整墨迹溢出', css(large, '.num-1{width:50px!important;height:400px!important;overflow:visible!important}'), null, ['layout']);
  check('裁掉字体留白但墨迹完整', css(large, '.num-1{overflow:hidden!important}'), null, ['layout']);
  check('数字纵向部分裁切', css(large, '.num-1{width:400px!important;height:100px!important;overflow:hidden!important}'), /number.*文字被裁.*纵向/, ['layout']);
  check('显示数字节点缺失', numberChange(visible, ''), /数字.*数量|数字.*缺失/);
  check('隐藏数字节点缺失', numberChange(hidden, ''), /数字.*数量|数字.*缺失/);
  check('显示数字错误', numberChange(visible, part => part.replace(/>[^<]*<\/p>$/, '>9</p>')), /数字.*文字.*不一致/);
  check('隐藏数字错误', numberChange(hidden, part => part.replace(/>[^<]*<\/p>$/, '>9</p>')), /数字.*文字.*不一致/);
  check('槽位身份错误', numberChange(visible, part => part.replace('num-1', 'num-99')), /数字.*num-1.*不唯一|数字.*num-1.*缺失/);
  check('额外数字', html => html.replace(section(plain), part => part.replace('</section>',
    '<p class="number num-1 is-on">9</p></section>')), /数字.*数量/);
  for (const rule of ['display:none', 'visibility:hidden', 'opacity:0']) {
    check(rule, css(visible, `.num-1{${rule}!important}`), /数字.*不可见|数字.*无布局/);
  }
  check('只破坏屏幕数字', numberChange(visible, ''), /数字.*数量|数字.*缺失/, undefined, 'index.html');
  check('只破坏印刷数字', numberChange(visible, ''), /数字.*数量|数字.*缺失/, undefined, 'proof.html');
  check('提前显示', numberChange(hidden, part => part.replace('num-1', 'num-1 is-on')), /数字.*初始.*隐藏/);
  check('静态显示标记丢失', numberChange(visible, part => part.replace(' is-on', '')), /数字.*初始.*显示/);
  check('互动显示后仍透明', css(hidden, '.num-1{opacity:0!important}'), /数字.*显示后.*不可见/);
  const pale = spec => css(spec, '.num-1{color:#bbb!important}' +
    `${selector(spec)} .art{background:white!important}${selector(spec)} .art>svg{visibility:hidden!important}`);
  check('显示数字低对比度', pale(visible), /number.*笔画底色对比度不足/, ['contrast']);
  check('互动数字低对比度', pale(hidden), /number.*笔画底色对比度不足/, ['contrast']);
  const grey = size => css(visible, `.num-1{color:#888!important;${size ? 'font-size:18px!important;' : ''}}` +
    `${selector(visible)} .art{background:white!important}${selector(visible)} .art>svg{visibility:hidden!important}`);
  check('大字数字适用 3:1', grey(false), null, ['contrast']);
  check('小字数字仍须 4.5:1', grey(true), /number.*低于 4\.5:1/, ['contrast']);
  for (const rule of ['color:rgba(0,0,0,.2)', 'opacity:.2']) {
    const faded = css(visible, `.num-1{${rule}!important}` +
      `${selector(visible)} .art{background:white!important}${selector(visible)} .art>svg{visibility:hidden!important}`);
    check('半透明数字 ' + rule, faded, /number.*笔画底色对比度不足/, ['contrast']);
  }
  check('祖先透明度降低数字对比度', html => html.replace('</head>', `<style>
    ${selector(visible)}{opacity:.2!important}
    ${selector(visible)} .art{background:white!important}
    ${selector(visible)} .art>svg{visibility:hidden!important}</style></head>`), /number.*笔画底色对比度不足/, ['contrast']);
  check('显示数字越界', css(visible, '.num-1{left:-5%!important}'), /number.*越出安全区/, ['layout']);
  check('互动数字越界', css(hidden, '.num-1{left:-5%!important}'), /number.*越出安全区/, ['layout']);
  check('数字裁切', css(visible, '.num-1{height:10px!important;overflow:hidden!important}'), /number.*文字被裁|数字.*量不到墨迹/, ['layout']);
  // CSS破坏作用在最终页坐标；数字声明仍在故事坐标，取景后不能把两个坐标系混用。
  const numberX = visible.numbers[0].at[0] * (visible.framing?.scale ?? 1) + (visible.framing?.at[0] ?? 0);
  const numberY = visible.numbers[0].at[1] * (visible.framing?.scale ?? 1) + (visible.framing?.at[1] ?? 0);
  check('数字重叠', css(visible, `.num-2{left:${numberX / 10}%!important;top:${numberY / 10}%!important}`), /文字重叠.*number/, ['layout']);
  fs.writeFileSync(loader, 'export async function loadSpecs(){return [];}');
  check('读空书稿', null, /预期.*为空|没有.*预期|读到.*零/);
  fs.writeFileSync(loader, selection);
  check('恢复正常成品');

  const layoutFile = path.join(dir, 'tools/check-layout.mjs');
  const layoutSource = fs.readFileSync(layoutFile, 'utf8');
  const noProbe = layoutSource.replace("node.style.setProperty('-webkit-text-fill-color', 'white', 'important')",
    "node.style.setProperty('-webkit-text-fill-color', 'black', 'important')");
  assert.notEqual(noProbe, layoutSource, '禁用字形参照的破坏必须确实生效');
  fs.writeFileSync(layoutFile, noProbe);
  assert.equal(fs.readFileSync(layoutFile, 'utf8'), noProbe);
  check('裁切参照读空不得通过', css(large, '.num-1{overflow:hidden!important}'), /解除裁切后仍量不到数字墨迹/, ['layout']);
  fs.writeFileSync(layoutFile, layoutSource);

  restore();
  browser = await chromium.launch();
  const page = await browser.newPage();
  for (const width of [900, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const spec of numbered.filter(spec => spec.screen !== false)) {
      await page.goto(pathToFileURL(path.join(dir, 'dist/index.html')).href + '?book=' + encodeURIComponent(spec.book) + '#' + spec.id);
      await page.evaluate(() => document.fonts.ready);
      const host = page.locator(selector(spec));
      const initial = () => host.locator('.number').evaluateAll(nodes => nodes.map(node => ({
        text: node.textContent.trim(), on: node.classList.contains('is-on'),
        visible: node.checkVisibility({ opacityProperty: true, visibilityProperty: true }),
      })));
      const expected = spec.numbers.map(number => ({ text: number.text, on: Boolean(number.on), visible: Boolean(number.on) }));
      assert.deepEqual(await initial(), expected, width + 'px 初始数字必须与书稿一致');
      const counts = [spec.hotspot].flat().filter(spot => spot?.action === 'count');
      for (const spot of counts) {
        await host.locator(`[data-action="count"][data-index="${spot.index}"]`).click();
        await page.waitForFunction(({ book, id, index }) => {
          const node = document.querySelector(`[data-book="${book}"][data-id="${id}"] .num-${index}`);
          return node && Number(getComputedStyle(node).opacity) === 1 &&
            node.checkVisibility({ opacityProperty: true, visibilityProperty: true });
        }, { book: spec.book, id: spec.id, index: spot.index });
        const number = host.locator('.num-' + spot.index);
        assert.equal(await number.textContent(), spec.numbers[spot.index - 1].text);
      }
      if (counts.length) {
        const after = await initial();
        assert.ok(after.every(number => number.on && number.visible), '真实点击后数字必须全部可见');
        const bookPages = specs.filter(candidate => candidate.book === spec.book);
        const away = bookPages[bookPages.indexOf(spec) + 2];
        assert.ok(away, '重进测试须有不同跨页');
        await page.evaluate(id => { Book.goToId(id); }, away.id);
        await page.evaluate(id => { Book.goToId(id); }, spec.id);
        await page.waitForFunction(({ book, id }) =>
          [...document.querySelectorAll(`[data-book="${book}"][data-id="${id}"] .number`)].every(node =>
            Number(getComputedStyle(node).opacity) === 0), { book: spec.book, id: spec.id });
        assert.deepEqual(await initial(), expected, '重进须恢复初始隐藏，不能继承上次点数');
      }
    }
    console.log('✓ 数字真实互动、静态答案与重进复位 ' + width + 'px');
  }
} finally {
  await browser?.close();
  if (fs.existsSync(modules)) fs.unlinkSync(modules);
  fs.rmSync(dir, { recursive: true, force: true });
}
if (failures.length) throw new AggregateError(failures, '数字视觉闸门未拦截破坏');
