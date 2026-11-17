/* 六类代表跨页，以及离页、连点和静态输出的回归。 */
import assert from 'node:assert/strict';
import { chromium, webkit } from 'playwright';
import { pathToFileURL, fileURLToPath } from 'node:url';
import path from 'node:path';
import { verifyReaderTouch, verifyLegacyFullscreen, verifyPortraitLayout } from './reader-touch.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const browser = await chromium.launch();
try {
  await verifyPortraitLayout(browser);
  await verifyReaderTouch(browser);
  await verifyLegacyFullscreen(browser);
  const page = await browser.newPage({ viewport: { width: 900, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  async function open(book, id, entry = 'index') {
    await page.goto(pathToFileURL(path.join(root, 'dist', entry + '.html')).href + '?book=' + book + '#' + id);
    await page.evaluate(() => document.fonts.ready);
  }
  const id = () => page.evaluate(() => window.Book.page().dataset.id);
  async function waitId(expected) {
    await page.waitForFunction(value => window.Book.page().dataset.id === value, expected);
  }
  // 全屏操作不翻页；浏览器自行退出时按钮也必须同步。
  await open('awulubo', 'p04');
  assert.equal(await page.locator('#fullscreen-btn').count(), 1, '网页应有全屏入口');
  await page.locator('#fullscreen-btn').click();
  await page.waitForFunction(() => document.fullscreenElement === document.documentElement);
  assert.equal(await id(), 'p04');
  assert.equal(await page.locator('#fullscreen-btn').innerText(), '退出');
  await page.evaluate(() => document.exitFullscreen());
  await page.waitForFunction(() => document.querySelector('#fullscreen-btn').textContent === '全屏');
  await page.keyboard.press('f');
  await page.waitForFunction(() => !!document.fullscreenElement);
  await page.keyboard.press('f');
  await page.waitForFunction(() => !document.fullscreenElement);
  await page.locator('#fullscreen-btn').focus();
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => !!document.fullscreenElement);
  await page.locator('#page-btn').click();
  await page.keyboard.press('f');
  assert.equal(await page.evaluate(() => !!document.fullscreenElement), true, '浮层内快捷键不能穿透');
  await page.keyboard.press('Escape');
  await page.evaluate(() => document.fullscreenElement && document.exitFullscreen());
  await page.waitForFunction(() => !document.fullscreenElement);
  assert.equal(await id(), 'p04');
  assert.equal(await page.locator('body').evaluate(el => getComputedStyle(el).touchAction), 'manipulation');
  assert.equal(await page.locator('#stage').evaluate(el => getComputedStyle(el).userSelect), 'none');
  assert.equal(await page.locator('#stage').evaluate(el => el.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true }))), false);
  // 不支持与请求失败都是可恢复状态，不能冒充已经全屏或改变书页。
  for (const unavailable of [true, false]) {
    const fallback = await browser.newPage();
    await fallback.addInitScript(unavailable => {
      Object.defineProperty(document, 'fullscreenEnabled', { value: !unavailable });
      Object.defineProperty(document, 'webkitFullscreenEnabled', { value: false });
      Element.prototype.requestFullscreen = () => Promise.reject(new Error('测试拒绝全屏'));
    }, unavailable);
    await fallback.goto(pathToFileURL(path.join(root, 'dist/index.html')).href + '?book=awulubo#p04');
    await fallback.locator('#fullscreen-btn').click();
    await fallback.waitForFunction(() => document.querySelector('#fullscreen-status').textContent.length > 0);
    assert.match(await fallback.locator('#fullscreen-status').innerText(), unavailable ? /不支持全屏/ : /再试一次/);
    assert.equal(await fallback.evaluate(() => Book.page().dataset.id), 'p04');
    assert.equal(await fallback.locator('#fullscreen-btn').innerText(), '全屏');
    assert.equal(await fallback.locator('#fullscreen-btn').getAttribute('aria-disabled'), null);
    await fallback.close();
  }
  // 真触摸连续轻点书外留白，也不能触发浏览器放大。
  const touchPage = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await touchPage.goto(pathToFileURL(path.join(root, 'dist/index.html')).href + '?book=awulubo#p20');
  await touchPage.touchscreen.tap(195, 760);
  await touchPage.touchscreen.tap(195, 760);
  await touchPage.waitForTimeout(400);
  assert.equal(await touchPage.evaluate(() => visualViewport.scale), 1);
  await touchPage.close();

  // 传球的结果只能出现一次。
  await open('yiqiwan', 'p34');
  await page.locator('.is-active [data-action=pass]').dblclick({ delay: 50 });
  await waitId('p35');
  await page.waitForTimeout(900);
  assert.equal(await id(), 'p35');
  await open('yiqiwan', 'p34');
  await page.locator('.is-active [data-action=pass]').click();
  await page.mouse.click(5, 890);
  await page.waitForTimeout(1000);
  assert.equal(await id(), 'p35');
  // 立刻离开再返回同一页，旧动画不能完成新的一次互动。
  await open('yiqiwan', 'p34');
  await page.locator('.is-active [data-action=pass]').click();
  await page.evaluate(() => { window.Book.goToId('p36'); window.Book.goToId('p34'); });
  await page.waitForTimeout(900);
  assert.equal(await id(), 'p34');

  // 反馈的首帧延续书稿尺寸，不能覆盖 SVG 原始缩放。
  await open('awulubo', 'p08');
  const apple = page.locator('.is-active .prop-apple');
  const originalApple = await apple.boundingBox();
  await page.locator('.is-active [data-action=feed]').click();
  await page.waitForTimeout(70);
  const animatedApple = await apple.boundingBox();
  assert.ok(animatedApple.width <= originalApple.width * 1.1);

  // 揉肚子具备键盘替代输入。
  await open('awulubo', 'p20');
  await page.locator('.is-active [data-action=rub]').focus();
  for (let n = 0; n < 3; n++) await page.keyboard.press('Enter');
  await waitId('p21');

  // 同类道具重排后，点击与反馈仍然绑定同一个对象。
  await open('awulubo', 'p38');
  await page.evaluate(() => {
    const apple = document.querySelector('.is-active [data-object="apple-F"]');
    apple.parentNode.appendChild(apple);
  });
  await page.locator('.is-active [data-index="1"]').click();
  assert.equal(await page.locator('.is-active [data-object="apple-F"]').evaluate(el => el.classList.contains('is-counted')), true);
  assert.equal(await page.locator('.is-active [data-object="apple-G"]').evaluate(el => el.classList.contains('is-counted')), false);

  // 被浏览器取消的手势没有轻点进度，旧指针不能修改重进页面。
  await open('awulubo', 'p20');
  const rub = page.locator('.is-active [data-action=rub]');
  for (let n = 0; n < 3; n++) {
    await rub.dispatchEvent('pointerdown', { pointerId: 7, clientX: 500, clientY: 600 });
    await rub.dispatchEvent('pointercancel', { pointerId: 7 });
  }
  assert.equal(await page.locator('.is-active .spiral').getAttribute('data-deg'), '0');
  await open('awulubo', 'p20');
  await rub.dispatchEvent('pointerdown', { pointerId: 7, clientX: 500, clientY: 600 });
  await page.evaluate(() => { window.Book.goToId('p22'); window.Book.goToId('p20'); });
  await rub.dispatchEvent('pointermove', { pointerId: 7, clientX: 570, clientY: 650 });
  await rub.dispatchEvent('pointerup', { pointerId: 7 });
  assert.equal(await page.locator('.is-active .spiral').getAttribute('data-deg'), '0');

  // 真鼠标先产生角度，再模拟浏览器取消。只回滚本次手势，保留前一次有效轻点。
  for (const committed of [0, 120]) {
    await open('awulubo', 'p20');
    if (committed) await rub.click();
    const spiral = page.locator('.is-active .spiral');
    const wasRubbing = await spiral.evaluate(el => el.classList.contains('is-rubbing'));
    const center = await spiral.evaluate(el => {
      const box = el.getBBox();
      const point = new DOMPoint(box.x + box.width / 2, box.y + box.height / 2)
        .matrixTransform(el.parentNode.getScreenCTM());
      return { x: point.x, y: point.y };
    });
    await rub.evaluate(el => el.addEventListener('pointerdown', event => {
      el.dataset.testPointer = String(event.pointerId);
    }, { once: true }));
    await page.mouse.move(center.x + 32, center.y);
    await page.mouse.down();
    await page.mouse.move(center.x, center.y + 32, { steps: 8 });
    assert.ok(Number(await spiral.getAttribute('data-deg')) > committed + 60);
    const pointerId = Number(await rub.getAttribute('data-test-pointer'));
    await rub.dispatchEvent('pointercancel', { pointerId });
    await page.mouse.up();
    assert.equal(Number(await spiral.getAttribute('data-deg')), committed, '取消后应恢复按下前角度');
    assert.equal(await spiral.evaluate(el => el.classList.contains('is-rubbing')), wasRubbing);
    await page.waitForTimeout(800);
    assert.equal(await id(), 'p20');
    await rub.focus();
    for (let n = committed / 120; n < 3; n++) await page.keyboard.press('Enter');
    await waitId('p21');
  }

  // 长按开始即呼吸，基础位置不会被中心补偿推走。
  await open('shengqi', 'p24');
  const char = page.locator('.is-active .char');
  const before = await char.boundingBox();
  const button = await page.locator('.is-active [data-action=breathe]').boundingBox();
  await page.mouse.move(button.x + button.width / 2, button.y + button.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(200);
  assert.equal(await page.locator('.is-active').getAttribute('data-breathing'), '1');
  const during = await char.boundingBox();
  assert.ok(Math.abs(before.x + before.width / 2 - during.x - during.width / 2) < 3);
  assert.ok(Math.abs(before.y + before.height / 2 - during.y - during.height / 2) < 3);
  await page.mouse.up();
  await waitId('p25');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await open('shengqi', 'p24');
  await page.locator('.is-active [data-action=breathe]').focus();
  await page.keyboard.press('Enter');
  await waitId('p25');
  await page.emulateMedia({ reducedMotion: 'no-preference' });

  // R7最后只剩同星星，回看后仍可重新收；旧三物兼容另由共读夹具覆盖。
  for (let round = 0; round < 2; round++) {
    await open('wuzilai', 'p44');
    const items = page.locator('.is-active [data-action=tidy]');
    assert.equal(await items.count(), 1);
    assert.equal(await items.getAttribute('data-target-id'), 'star-1');
    for (let n = 0; n < await items.count(); n++) await items.nth(n).click();
    await waitId('p45');
  }
  // 再读一次是书稿声明的出口。
  await open('labuluo', 'p62');
  await page.locator('.is-active [data-action=again]').click();
  await waitId('p04');

  // R7只再喂一口，右页自主兑现；旧双热区并行回归在verify-reading临时书稿保留。
  for(const width of [900,1280]) {
    await page.setViewportSize({width,height:900});
    await open('awulubo','p16');
    await page.locator('.is-active [data-action=feed]').click();
    await waitId(width===900?'p17':'p18');
    await open('awulubo','p16');
    await page.locator('.is-active [data-action=feed]').click();
    await page.evaluate(()=>{Book.goToId('p18');Book.goToId('p16');});
    await page.waitForTimeout(900);
    assert.equal(await id(),'p16');
    assert.equal(await page.evaluate(()=>BookEffects.progress(Book.page()).count),0);
  }
  // 其他多步动作也只补未完成的对象或次数，异步收纳等反馈完成后才放行。
  // 留出书页外空白，避免“喊三声”的整页热区把点空当成有效输入。
  await page.setViewportSize({ width: 900, height: 1100 });
  for (const [book, pageId, action, result] of [
    ['awulubo', 'p14', 'feed3', 'p15'],
    ['awulubo', 'p20', 'rub', 'p21'],
    ['awulubo', 'p30', 'find', 'p31'],
    ['awulubo', 'p38', 'count', 'p39'],
    ['awulubo', 'p42', 'shout', 'p43'],
    ['wuzilai', 'p44', 'tidy', 'p45'],
  ]) {
    await page.goto('about:blank');
    await open(book, pageId);
    // 旧trap接口的框架夹具只改本测试DOM；R7正式书稿仍可直接阅读。
    await page.evaluate(action=>{
      const p=Book.page();p.dataset.trap='1';
      if(!p.querySelector('.hotspot')){const b=document.createElement('button');b.className='hotspot';b.dataset.action=action;b.dataset.targetId='page';p.append(b);}
    },action);
    const first = page.locator('.is-active [data-action=' + action + ']').first();
    await first.focus();
    await page.keyboard.press('Enter');
    if (action === 'tidy') {
      await page.waitForFunction(() => BookEffects.progress(Book.page()).count === 1);
    }
    for (let n = 0; n < 5; n++) await page.mouse.click(2, 1090);
    const snapshot = await page.evaluate(() => {
      const p = Book.page();
      return { done: p.dataset.done, count: BookEffects.progress(p).count,
        fed: p.dataset.fed, found: p.dataset.found,
        degrees: p.querySelector('.spiral')?.dataset.deg,
        numbers: p.querySelectorAll('.number.is-on').length };
    });
    assert.notEqual(snapshot.done, '1', action + ' 的反馈结束前不能完成');
    if (action === 'feed3') assert.equal(snapshot.fed.split(',').length, 3);
    if (action === 'find') assert.equal(snapshot.found.split(',').length, 3);
    if (action === 'count') assert.equal(snapshot.numbers, 3);
    if (action === 'rub') assert.equal(Number(snapshot.degrees), 360);
    if (action === 'shout') assert.equal(snapshot.count, 3);
    if (action === 'tidy') assert.equal(snapshot.count, 1);
    for (let n = 0; n < 5; n++) await page.mouse.click(2, 1090);
    await waitId(result);
  }
  await page.setViewportSize({ width: 900, height: 900 });
  await page.evaluate(() => Book.setBook('awulubo'));
  await page.evaluate(() => Book.goToId('p18'));

  // 浮层与静态入口拥有各自的输入边界。
  await page.locator('#page-btn').click();
  for (let n = 0; n < 65; n++) {
    await page.keyboard.press(n % 2 ? 'Tab' : 'Shift+Tab');
    assert.equal(await page.evaluate(() => !!document.activeElement.closest('#picker')), true);
  }
  await page.keyboard.press('End');
  assert.equal(await id(), 'p18');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#page-btn').evaluate(el => el === document.activeElement), true);
  await open('awulubo', 'p26', 'print');
  assert.equal(await page.locator('#fullscreen-btn').count(), 0);
  assert.equal(await page.locator('button.hotspot').count(), 0);
  assert.equal(await page.evaluate(() => document.getAnimations().filter(animation => animation.playState === 'running').length), 0);
  await page.locator('[data-id=p26][data-book=awulubo] .hotspot').click();
  assert.equal(await page.locator('[data-id=p26][data-book=awulubo]').getAttribute('data-done'), null);
  assert.equal(await page.locator('.is-dim').count(), 0);
  assert.deepEqual(errors, []);
  console.log('✓ 六类代表跨页、重复输入、离页重返、浮层和印刷入口通过');
  if (process.argv.includes('--webkit')) {
    const safariEngine = await webkit.launch();
    try {
      await verifyPortraitLayout(safariEngine);
      await verifyReaderTouch(safariEngine, false);
      await verifyLegacyFullscreen(safariEngine);
    } finally {
      await safariEngine.close();
    }
  }
} finally {
  await browser.close();
}
