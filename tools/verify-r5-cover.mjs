/* 盖毯跨页：以已确认 R7 为文字预期，操作真实纸屏产物。 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium } from 'playwright';
import { loadBooks } from './load-specs.mjs';

const book = (await loadBooks()).find(book => book.id === 'labuluo');
const pages = ['p14', 'p15'].map(id => book.pages.find(page => page.id === id));
const r5 = fs.readFileSync(new URL('../docs/superpowers/specs/2026-11-15-script-r7-labuluo.md', import.meta.url), 'utf8');
const plain = text => text.replace(/<br\s*\/?\s*>/gi, '');
let failures = 0;
async function check(name, run) {
  try { await run(); console.log('✓ ' + name); }
  catch (error) { failures++; console.error('✗ ' + name + ': ' + error.message); }
}
await check('p14–p15 对齐 R7 纸屏读词、身份与紧邻盖毯回应', () => {
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
    assert.equal(page.props.filter(prop => prop.kind === 'blanket' && prop.id === 'blanket-1').length, 1);
    assert.ok(!page.props.some(prop => prop.kind==='pill'), '没有孩子药物任务');
    assert.ok(page.props.some(prop=>prop.id==='cup-1'),'同杯留窗边');
  }
  assert.equal(book.pages[book.pages.indexOf(pages[0]) + 1], pages[1]);
  assert.deepEqual([pages[0].hotspot.action, pages[0].hotspot.targetId, pages[0].hotspot.target], ['cover', 'blanket-1', 'blanket']);
  assert.equal(pages[1].hotspot, undefined);
  assert.equal(pages[1].char.pose, 'hidden-eyes');
  assert.ok(!pages[1].char.spiral, '盖好后不在毯下露出肚子');
  const component = fs.readFileSync(new URL('../src/components/character.svg', import.meta.url), 'utf8');
  const pose = component.match(/<g id="pose-hidden-eyes">([\s\S]*?)<\/g>/)?.[1];
  assert.ok(pose);
  assert.deepEqual([...pose.matchAll(/href="#([^"]+)"/g)].map(match => match[1]), ['ch-eyes-dots'], '复用双眼，不附带头身脚');
});

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  page.setDefaultTimeout(2500);
  const open = async (width = 900, mode = 'index') => {
    await page.setViewportSize({ width, height: 1100 });
    await page.goto(new URL('../dist/' + mode + '.html', import.meta.url).href + '?book=labuluo#p14');
    await page.evaluate(() => document.fonts.ready);
  };
  const current = () => page.evaluate(() => Book.page().dataset.id);
  const wait = id => page.waitForFunction(id => Book.page().dataset.id === id, id);
  for (const width of [900, 1440]) await check(width + 'px 只点毯子，重复输入只完成一次，重排不改变目标', async () => {
    await open(width);
    const ask = page.locator('[data-book="labuluo"][data-id="p14"]');
    assert.equal(await ask.locator('.hotspot').count(), 1, '旧 p14 没有盖毯动作');
    const blanket = ask.locator('[data-object="blanket-1"]');
    await blanket.evaluate(el => el.parentNode.appendChild(el));
    const button = ask.locator('[data-action="cover"][data-target-id="blanket-1"]');
    await button.click();
    await button.focus();
    await page.keyboard.press('Enter');
    await wait(width === 900 ? 'p15' : 'p16');
    await page.waitForTimeout(1000);
    assert.equal(await current(), width === 900 ? 'p15' : 'p16');
    assert.equal(await blanket.evaluate(el => el.classList.contains('is-flying')), false);
  });
  await check('盖毯离页取消旧回调、重进可重新操作、空格键可完成', async () => {
    await open();
    const button = page.locator('.is-active [data-action="cover"]');
    await button.click();
    await page.evaluate(() => { Book.goToId('p16'); Book.goToId('p14'); });
    await page.waitForTimeout(1000);
    assert.equal(await current(), 'p14');
    assert.equal(await page.locator('.is-active').getAttribute('data-done'), null);
    await button.focus();
    await page.keyboard.press('Space');
    await wait('p15');
  });
  await check('纸书／校样保持完整两页和共读提示，静态热区不执行动作', async () => {
    for (const mode of ['print', 'proof']) {
      await open(900, mode);
      for (const spec of pages) {
        const element = page.locator('[data-book="labuluo"][data-id="' + spec.id + '"]');
        assert.ok(await element.locator('[data-object="blanket-1"]').isVisible());
        const text = (await element.innerText()).replace(/\s/g, '');
        assert.ok(text.includes(plain(spec.text.narration.text)));
        assert.equal(await element.getAttribute('data-done'), null);
      }
      const button = page.locator('[data-book="labuluo"][data-id="p14"] .hotspot');
      assert.notEqual(await button.evaluate(el => el.tagName), 'BUTTON');
      assert.equal(await button.getAttribute('aria-hidden'), 'true');
      await button.dispatchEvent('click');
      await page.waitForTimeout(1000);
      assert.equal(await page.locator('[data-book="labuluo"][data-id="p14"]').getAttribute('data-done'), null);
    }
  });
} finally { await browser.close(); }
if (failures) process.exitCode = 1;
