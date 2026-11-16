/* 拒水不是饮水成功：按定稿核对读词、收杯、静候与普通阅读。 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium } from 'playwright';
import { loadBooks } from './load-specs.mjs';

const book = (await loadBooks()).find(book => book.id === 'labuluo');
const pages = ['p16', 'p17'].map(id => book.pages.find(page => page.id === id));
const r5 = fs.readFileSync(new URL('../docs/superpowers/specs/2026-11-15-script-r7-labuluo.md', import.meta.url), 'utf8');
const plain = text => text.replace(/<br\s*\/?\s*>/gi, '');
let failures = 0;
async function check(name, run) {
  try { await run(); console.log('✓ ' + name); }
  catch (error) { failures++; console.error('✗ ' + name + ': ' + error.message); }
}
await check('p16–p17 的拒水及收杯读词符合 R7，不提前兑现喝水', () => {
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
    assert.equal(page.pat, false);
    assert.equal(page.hotspot, undefined, '不要求点击递杯或用旧 water 提前完成喝水');
    assert.equal(page.props.filter(prop => prop.kind === 'cup' && prop.id === 'cup-1').length, 1);
    assert.doesNotMatch(JSON.stringify(page.text) + page.aria, /咕嘟|终于|喝一口吧|一小口就好|递过去/);
  }
  assert.equal(book.pages[book.pages.indexOf(pages[0]) + 1], pages[1]);
  const blankets = pages.map(page => page.props.find(prop => prop.id === 'blanket-1'));
  assert.ok(blankets.every(prop => prop?.kind === 'blanket-fold'), '保留上一跨的毯子，脸部留出以抿嘴转脸');
  assert.deepEqual(blankets[0], blankets[1], '拒水与收杯过程中毯子保持原位');
  assert.equal(pages[1].char.pose, 'turn-away');
  const source = fs.readFileSync(new URL('../src/components/character.svg', import.meta.url), 'utf8');
  const pose = source.match(/<g id="pose-turn-away">([\s\S]*?)\n  <\/g>/)?.[1];
  assert.ok(pose, '转脸须有可见姿态');
  assert.match(pose, /href="#ch-mouth-flat"/);
  assert.doesNotMatch(pose, /ch-mouth-open|ch-mouth-smile|ch-eyes-happy/);
});

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  page.setDefaultTimeout(2500);
  const open = async (width = 900, mode = 'index') => {
    await page.setViewportSize({ width, height: 1100 });
    await page.goto(new URL('../dist/' + mode + '.html', import.meta.url).href + '?book=labuluo#p16');
    await page.evaluate(() => document.fonts.ready);
  };
  const current = () => page.evaluate(() => Book.page().dataset.id);
  const inspectCup = id => page.locator('[data-book="labuluo"][data-id="' + id + '"]').evaluate(el => {
    const p = el.getBoundingClientRect();
    const cup = el.querySelector('[data-object="cup-1"]').getBoundingClientRect();
    const char = el.querySelector('.char').getBoundingClientRect();
    return { y: (cup.y + cup.height / 2 - p.y) / p.width,
      distance: Math.hypot(cup.x + cup.width / 2 - char.x - char.width / 2,
        cup.y + cup.height / 2 - char.y - char.height / 2) / p.width };
  });
  for (const width of [900, 1440]) await check(width + 'px 拒水后普通阅读，杯子退开而非送到嘴边', async () => {
    await open(width);
    for (const id of ['p16', 'p17']) {
      const element = page.locator('[data-book="labuluo"][data-id="' + id + '"]');
      assert.equal(await element.locator('.hotspot').count(), 0);
      assert.equal(await element.getAttribute('data-pat'), null);
    }
    const before = await inspectCup('p16');
    await page.waitForTimeout(1000);
    assert.equal(await current(), 'p16', '不自行喝水或自动翻页');
    if (width === 900) {
      await page.keyboard.press('ArrowRight');
      assert.equal(await current(), 'p17');
    }
    const after = await inspectCup('p17');
    assert.ok(after.y > before.y, '同一杯子须放低');
    assert.ok(after.distance > before.distance, '同一杯子须远离角色');
    if (width === 900) await page.waitForTimeout(650);
    const cup = page.locator('[data-book="labuluo"][data-id="p17"] [data-object="cup-1"]');
    const box = await cup.boundingBox();
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    assert.equal(await current(), 'p18', '点杯子只按普通阅读翻页，不启动 water');
    await page.waitForTimeout(1000);
    assert.equal(await current(), 'p18', '不能由旧喝水回调跳过下一跨');
    await page.evaluate(() => { Book.goToId('p16'); Book.goToId('p18'); Book.goToId('p16'); });
    await page.waitForTimeout(1000);
    assert.equal(await current(), 'p16');
    assert.equal(await page.locator('.is-active').first().getAttribute('data-done'), null);
  });
  await check('纸书与校样保留拒水和共读邀请，无旧喝水标题或按钮', async () => {
    for (const mode of ['print', 'proof']) {
      await open(900, mode);
      for (const spec of pages) {
        const element = page.locator('[data-book="labuluo"][data-id="' + spec.id + '"]');
        assert.equal(await element.locator('.hotspot').count(), 0);
        assert.ok(await element.locator('[data-object="cup-1"]').isVisible());
        const text = (await element.innerText()).replace(/\s/g, '');
        assert.ok(text.includes(plain(spec.text.narration.text)));
        if (spec.text.prompt) assert.ok(text.includes(spec.text.prompt.print));
        assert.doesNotMatch(text, /咕嘟|终于|喝一口吧|递过去/);
      }
    }
  });
} finally { await browser.close(); }
if (failures) process.exitCode = 1;
