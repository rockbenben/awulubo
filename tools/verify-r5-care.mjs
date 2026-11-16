/* R7 陪伴承诺：真实书稿与纸屏入口，不把共读邀请变成强制拍打。 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium } from 'playwright';
import { loadBooks } from './load-specs.mjs';

const book = (await loadBooks()).find(book => book.id === 'labuluo');
const pages = ['p12', 'p13'].map(id => book.pages.find(page => page.id === id));
const r5 = fs.readFileSync(new URL('../docs/superpowers/specs/2026-11-15-script-r7-labuluo.md', import.meta.url), 'utf8');
const plain = text => text.replace(/<br\s*\/?\s*>/gi, '');
let failures = 0;
async function check(name, run) {
  try { await run(); console.log('✓ ' + name); }
  catch (error) { failures++; console.error('✗ ' + name + ': ' + error.message); }
}
await check('p12–p15 不重复盖毯，陪伴承诺与 R7 纸屏读词一致', () => {
  const covers = book.pages.filter(page => ['p12', 'p13', 'p14', 'p15'].includes(page.id))
    .filter(page => (Array.isArray(page.hotspot) ? page.hotspot : [page.hotspot]).some(h => h?.action === 'cover'));
  assert.deepEqual(covers.map(page => page.id), ['p14'], '盖毯只留在 p14，不能先在 p13 再做一次');
  for (const page of pages) {
    const narration = r5.match(new RegExp('^- ' + page.id + ' 朗读正文：(.+)$', 'm'))?.[1].trim();
    const prompt = r5.match(new RegExp('^- ' + page.id + ' 共读提示：(.+)$', 'm'))?.[1].trim();
    assert.ok(narration && prompt, '定稿预期不得读空');
    assert.equal(plain(page.text.narration.text), narration);
    assert.deepEqual(Object.keys(page.text).sort(), prompt === '—' ? ['narration'] : ['narration', 'prompt']);
    if (prompt !== '—') {
      assert.equal(page.text.prompt.text, prompt);
      assert.equal(page.text.prompt.print, prompt);
    }
    assert.equal(page.aria, narration + (prompt === '—' ? '' : '\n' + prompt));
    assert.equal(page.noSound, true);
    assert.equal(page.sound, undefined);
    assert.equal(page.hotspot, undefined, '模拟坐近不另造点击任务');
    assert.equal(page.pat, false, '角色不能自动变成拍打任务');
    assert.ok(page.props.some(prop=>prop.id==='blanket-1')&&page.props.some(prop=>prop.id==='cup-1'),'陪伴不盖毯，但原毯杯仍在');
  }
  assert.equal(book.pages[book.pages.indexOf(pages[0]) + 1], pages[1]);
  assert.equal(pages[1].char.pose, 'lean-close');
  assert.ok(pages[1].char.scale > pages[0].char.scale, '靠近有前后距离变化');
  const source = fs.readFileSync(new URL('../src/components/character.svg', import.meta.url), 'utf8');
  assert.match(source, /<g id="pose-lean-close">\s*<g transform="rotate\(-12 500 650\)">\s*<use href="#pose-tired"\s*\/>/, '歪靠复用原姿态，避免只换文字');
});

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  page.setDefaultTimeout(2500);
  const open = async (width = 900, mode = 'index') => {
    await page.setViewportSize({ width, height: 1100 });
    await page.goto(new URL('../dist/' + mode + '.html', import.meta.url).href + '?book=labuluo#p12');
    await page.evaluate(() => document.fonts.ready);
  };
  const current = () => page.evaluate(() => Book.page().dataset.id);
  for (const width of [900, 1440]) await check(width + 'px 共读后普通翻页，不等旧盖毯、不触发拍打或延迟跳页', async () => {
    await open(width);
    const spread = page.locator('[data-book="labuluo"][data-id="p14"]').filter({ has: page.locator('[data-action="cover"]') });
    assert.equal(await page.locator('[data-book="labuluo"][data-id="p13"] .hotspot').count(), 0);
    assert.equal(await spread.count(), 1);
    assert.equal(await spread.getAttribute('data-pat'), null, '共读盖毯不默认拍打');
    for (const id of ['p12', 'p13']) assert.equal(await page.locator('[data-book="labuluo"][data-id="' + id + '"]').getAttribute('data-pat'), null);
    await page.waitForTimeout(1000);
    assert.equal(await current(), 'p12', '未输入时不自动翻页');
    await page.keyboard.press('ArrowRight');
    assert.equal(await current(), width === 900 ? 'p13' : 'p14');
    if (width === 900) {
      await page.waitForTimeout(650); // 等普通翻页的输入锁释放，再验证角色点击。
      const char = page.locator('.is-active .char');
      const box = await char.boundingBox();
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      assert.equal(await current(), 'p14', '拍到角色只按普通阅读翻页，不等待动画');
    }
    await page.waitForTimeout(1000);
    assert.equal(await current(), 'p14', '无旧盖毯回调带走下一跨');
    await page.evaluate(() => { Book.goToId('p12'); Book.goToId('p14'); Book.goToId('p12'); });
    await page.waitForTimeout(1000);
    assert.equal(await current(), 'p12');
    assert.equal(await page.locator('.is-active').first().getAttribute('data-done'), null);
  });
  await check('纸书与校样显示陪伴和歪靠，无屏幕盖毯按钮或旧文案', async () => {
    for (const mode of ['print', 'proof']) {
      await open(900, mode);
      for (const spec of pages) {
        const element = page.locator('[data-book="labuluo"][data-id="' + spec.id + '"]');
        assert.equal(await element.locator('.hotspot').count(), 0);
        const text = (await element.innerText()).replace(/\s/g, '');
        assert.ok(text.includes(plain(spec.text.narration.text)));
        if (spec.text.prompt) assert.ok(text.includes(spec.text.prompt.print));
        assert.doesNotMatch(text, /盖上|暖和|拿过来|沙——/);
      }
    }
  });
} finally { await browser.close(); }
if (failures) process.exitCode = 1;
