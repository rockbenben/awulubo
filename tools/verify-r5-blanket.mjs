/* R7 毯角迁移：文字读定稿附件，交互使用真实阅读器；不修改作者书稿。 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium } from 'playwright';
import { loadBooks } from './load-specs.mjs';

const books = await loadBooks();
const book = books.find(book => book.id === 'labuluo');
const pages = ['p06', 'p07'].map(id => book.pages.find(page => page.id === id));
const r5 = fs.readFileSync(new URL('../docs/superpowers/specs/2026-11-15-script-r7-labuluo.md', import.meta.url), 'utf8');
const plain = text => text.replace(/<br\s*\/?\s*>/gi, '');
let failures = 0;
async function check(name, run) {
  try { await run(); console.log('✓ ' + name); }
  catch (error) { failures++; console.error('✗ ' + name + ': ' + error.message); }
}
await check('p06–p07 的纸屏正文、朗读及单一毯角对象与 R7 一致', () => {
  for (const page of pages) {
    const narration = r5.match(new RegExp('^- ' + page.id + ' 朗读正文：(.+)$', 'm'))?.[1].trim();
    const prompt = r5.match(new RegExp('^- ' + page.id + ' 共读提示：(.+)$', 'm'))?.[1].trim();
    assert.ok(narration && prompt, 'R7 不能读空');
    assert.equal(plain(page.text.narration.text), narration);
    assert.deepEqual(Object.keys(page.text).sort(), prompt === '—' ? ['narration'] : ['narration', 'prompt']);
    if (prompt !== '—') {
      assert.equal(page.text.prompt.text, prompt);
      assert.equal(page.text.prompt.print, prompt);
    }
    assert.equal(page.aria, narration + (prompt === '—' ? '' : '\n' + prompt));
    assert.equal(page.noSound, true);
    assert.equal(page.sound, undefined);
  }
  const [ask, answer] = pages;
  assert.equal(ask.trap, undefined, '观察可自由跳过');
  assert.equal(ask.hotspot.length, 1);
  assert.equal(ask.hotspot[0].targetId, 'blanket-1');
  assert.equal(ask.hotspot[0].target, 'blanket');
  assert.equal(ask.hotspot[0].action, 'find');
  assert.ok(ask.props.some(prop => prop.id === 'cup-1' && prop.kind === 'cup'));
  assert.ok(ask.props.some(prop => prop.id === 'blanket-1' && prop.kind === 'blanket-corner'));
  assert.ok(!ask.props.some(prop => ['pill', 'star'].includes(prop.kind)));
  assert.ok(answer.props.some(prop => prop.id === 'blanket-1' && prop.kind === 'blanket'));
  assert.equal(answer.char.pose, 'hidden-feet', '回应只露双脚，不露脸或肚子');
  assert.ok(!answer.char.spiral);
  assert.equal(answer.hotspot, undefined, '紧邻回应不再追加寻找条件');
  assert.equal(book.pages[book.pages.indexOf(ask) + 1], answer);
});

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 900, height: 1100 } });
  page.setDefaultTimeout(2500);
  const open = async (book, id, mode = 'index') => {
    await page.goto(new URL('../dist/' + mode + '.html', import.meta.url).href + '?book=' + book + '#' + id);
    await page.evaluate(() => document.fonts.ready);
  };
  const id = () => page.evaluate(() => Book.page().dataset.id);
  const wait = id => page.waitForFunction(id => Book.page().dataset.id === id, id, { timeout: 2500 });
  await check('单目标寻找不依赖三次计数（最小 DOM 复现）', async () => {
    await open('labuluo', 'p06');
    await page.evaluate(() => {
      const buttons = [...Book.page().querySelectorAll('[data-action="find"]')];
      buttons.slice(1).forEach(button => button.remove());
    });
    await page.locator('.is-active [data-action="find"]').click();
    await wait('p07');
  });
  for (const width of [900, 1440]) await check(width + 'px 毯角保持原位、点空不跳过、重复输入只兑现一次', async () => {
    await page.setViewportSize({ width, height: 1100 });
    await open('labuluo', 'p06');
    await page.evaluate(()=>Book.page().dataset.trap='1'); // 旧trap框架夹具，不写入R7
    await page.mouse.click(2, 1090);
    assert.equal(await id(), 'p06');
    const prop = page.locator('[data-book="labuluo"][data-id="p06"] [data-object="blanket-1"]');
    const before = await prop.getAttribute('transform');
    // 重排绘制对象后，按钮仍按 targetId 指向毯角。
    await prop.evaluate(el => el.parentNode.appendChild(el));
    const button = page.locator('.is-active [data-target-id="blanket-1"]');
    await button.click();
    await button.focus();
    await page.keyboard.press('Enter');
    assert.equal(await prop.getAttribute('transform'), before);
    assert.equal(await prop.evaluate(el => el.classList.contains('is-flying')), false);
    assert.equal(await prop.evaluate(el => getComputedStyle(el).opacity), '1');
    await wait(width === 900 ? 'p07' : 'p08');
    await page.waitForTimeout(850);
    assert.equal(await id(), width === 900 ? 'p07' : 'p08');
  });
  await check('离页取消回调，重进重置，键盘与五次点空均可完成', async () => {
    await page.setViewportSize({ width: 900, height: 1100 });
    await open('labuluo', 'p06');
    await page.locator('.is-active [data-target-id="blanket-1"]').click();
    await page.evaluate(() => { Book.goToId('p08'); Book.goToId('p06'); });
    await page.waitForTimeout(950);
    assert.equal(await id(), 'p06');
    assert.equal(await page.locator('.is-active').getAttribute('data-found'), null);
    await page.locator('.is-active [data-target-id="blanket-1"]').focus();
    await page.keyboard.press('Space');
    await wait('p07');
    await page.evaluate(() => Book.goToId('p06'));
    await page.evaluate(()=>Book.page().dataset.trap='1');
    for (let i = 0; i < 5; i++) await page.mouse.click(2, 1090);
    await wait('p07');
  });
  await check('三个目标按身份计数；同类道具与重复点同物不混淆', async () => {
    await open('awulubo', 'p30');
    const buttons = page.locator('.is-active [data-action="find"]');
    assert.equal(await buttons.count(), 3);
    // 同类不同身份仍须各找一次，不改变源码或作者文件。
    await buttons.evaluateAll(buttons => buttons.forEach(button => { button.dataset.target = 'apple'; }));
    await buttons.nth(0).click();
    await buttons.nth(0).click();
    await page.waitForTimeout(850);
    assert.equal(await id(), 'p30');
    await buttons.nth(1).click();
    await page.waitForTimeout(850);
    assert.equal(await id(), 'p30');
    await buttons.nth(2).click();
    await wait('p31');
  });
  await check('纸书和静态校样均显示毯角与紧邻回应，不执行动作', async () => {
    for (const mode of ['print', 'proof']) {
      await open('labuluo', 'p06', mode);
      for (const spec of pages) {
        const element = page.locator('[data-book="labuluo"][data-id="' + spec.id + '"]');
        assert.ok(await element.locator('[data-object="blanket-1"]').isVisible());
        assert.ok((await element.innerText()).replace(/\s/g, '').includes(plain(spec.text.narration.text)));
        assert.equal(await element.getAttribute('data-found'), null);
      }
      const button = page.locator('[data-book="labuluo"][data-id="p06"] .hotspot');
      assert.notEqual(await button.evaluate(el => el.tagName), 'BUTTON', '静态入口不生成互动按钮');
      assert.equal(await button.getAttribute('aria-hidden'), 'true');
      await button.dispatchEvent('click');
      await page.waitForTimeout(850);
      assert.equal(await page.locator('[data-book="labuluo"][data-id="p06"]').getAttribute('data-found'), null);
    }
  });
} finally { await browser.close(); }
if (failures) process.exitCode = 1;
