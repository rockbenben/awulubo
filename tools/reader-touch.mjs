/* Chromium 用浏览器输入协议发送真实触摸；WebKit 的补充检查使用 DOM 事件。 */
import assert from 'node:assert/strict';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const entry = pathToFileURL(path.join(fileURLToPath(new URL('../', import.meta.url)), 'dist/index.html')).href;

export async function verifyPortraitLayout(browser) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  try {
    for (const viewport of [{ width: 320, height: 568 }, { width: 390, height: 844 }, { width: 768, height: 1024 }]) {
      await page.setViewportSize(viewport);
      for (const [id, color] of [['p03', 'rgb(252, 227, 231)'], ['p54', 'rgb(46, 42, 90)']]) {
        await page.goto(entry + '?book=awulubo#' + id);
        await page.waitForFunction(expected => Book.page().dataset.id === expected, id);
        const state = await page.evaluate(() => {
          const page = Book.page();
          const rect = page.getBoundingClientRect();
          const art = page.querySelector('.art > svg').getBoundingClientRect();
          const char = page.querySelector('.char').getScreenCTM();
          const controls = [...document.querySelectorAll('#fullscreen-btn, #shell-btn, #page-btn, #mute')].map(el => el.getBoundingClientRect());
          return { color: getComputedStyle(document.body).backgroundColor,
            width: rect.width, height: rect.height, artWidth: art.width, artHeight: art.height,
            sx: Math.hypot(char.a, char.b), sy: Math.hypot(char.c, char.d),
            controlsClear: controls.every(control => control.bottom <= rect.top),
            scrolls: document.documentElement.scrollHeight > innerHeight };
        });
        assert.equal(state.color, color, id + ' 竖屏衬底须跟随书页底色');
        assert.equal(state.width, state.height, '书页保持完整正方形');
        assert.equal(state.artWidth, state.width);
        assert.equal(state.artHeight, state.height);
        assert.ok(Math.abs(state.sx - state.sy) < .001, '角色保持等比缩放');
        assert.ok(state.controlsClear, '工具按钮不能遮挡竖屏画面');
        assert.equal(state.scrolls, false, '不产生纵向滚动');
      }
      await page.evaluate(() => Book.goToId('p58'));
      assert.equal(await page.evaluate(() => getComputedStyle(document.body).backgroundColor), 'rgb(36, 31, 76)', '夜尾衬底继续变暗');
      await page.evaluate(() => Book.setBook('labuluo'));
      assert.equal(await page.evaluate(() => getComputedStyle(document.body).backgroundColor), 'rgb(138, 191, 233)', '换册时同步衬底');
    }
    await page.setViewportSize({ width: 844, height: 390 });
    assert.equal(await page.evaluate(() => getComputedStyle(document.body).backgroundColor), 'rgb(255, 255, 255)', '横屏沿用纸白衬底');
    await page.setViewportSize({ width: 390, height: 844 });
    for (const name of ['proof', 'print', 'booklet']) {
      await page.goto(entry.replace(/index\.html$/, name + '.html') + '?book=awulubo');
      assert.equal(await page.evaluate(() => getComputedStyle(document.body).backgroundColor), 'rgb(255, 255, 255)', name + ' 保留纸白');
      assert.equal(await page.evaluate(() => document.body.style.getPropertyValue('--reader-surround')), '', name + ' 不执行衬底同步');
    }
    console.log('✓ 竖屏随页衬色、工具栏避让、方形完整画面与角色比例');
  } finally {
    await page.close();
  }
}

export async function verifyReaderTouch(browser, native = true) {
  for (const viewport of [
    { width: 390, height: 844 }, { width: 844, height: 390 },
    { width: 768, height: 1024 }, { width: 1194, height: 834 },
  ]) {
    const page = await browser.newPage({ viewport, isMobile: true, hasTouch: true });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const cdp = native ? await page.context().newCDPSession(page) : null;
    let navigation = 0;
    async function touch(type, points) {
      if (cdp) {
        await cdp.send('Input.dispatchTouchEvent', { type, touchPoints: points.map((point, i) => ({ id: i + 1, ...point })) });
      } else {
        await page.evaluate(({ type, points }) => {
          const previous = window.testTouches || [];
          const touches = points.map((point, i) => ({
            identifier: i + 1, target: previous[i]?.target || document.elementFromPoint(point.x, point.y),
            clientX: point.x, clientY: point.y,
          }));
          const changed = type === 'touchEnd' || type === 'touchCancel' ? previous : touches;
          const target = changed[0]?.target || document.body;
          const eventType = { touchStart: 'touchstart', touchMove: 'touchmove', touchEnd: 'touchend', touchCancel: 'touchcancel' }[type];
          const event = new Event(eventType, { bubbles: true, cancelable: true });
          Object.defineProperties(event, { touches: { value: touches }, changedTouches: { value: changed } });
          target.dispatchEvent(event);
          for (const point of changed) {
            const pointerType = { touchStart: 'pointerdown', touchMove: 'pointermove', touchEnd: 'pointerup', touchCancel: 'pointercancel' }[type];
            point.target.dispatchEvent(new PointerEvent(pointerType, { bubbles: true, pointerId: point.identifier,
              pointerType: 'touch', isPrimary: point.identifier === 1, clientX: point.clientX, clientY: point.clientY }));
          }
          window.testTouches = touches;
        }, { type, points });
      }
    }
    async function open(id) {
      // 每个独立用例重新建文档；只换 hash 会沿用上个用例的原生手势状态。
      await page.goto(entry + '?book=awulubo&touchTest=' + (++navigation) + '#' + id);
      await page.evaluate(() => document.fonts.ready);
    }
    const id = () => page.evaluate(() => Book.page().dataset.id);
    async function drag(from, to, cancel = false) {
      await touch('touchStart', [from]);
      for (let i = 1; i <= 12; i++) {
        await touch('touchMove', [{ x: from.x + (to.x - from.x) * i / 12, y: from.y + (to.y - from.y) * i / 12 }]);
        await page.waitForTimeout(16);
      }
      await touch(cancel ? 'touchCancel' : 'touchEnd', []);
      await page.waitForTimeout(400);
    }
    try {
      const from = { x: viewport.width * .7, y: viewport.height - 20 };
      const to = { x: viewport.width * .3, y: from.y };
      await open('p54');
      await drag(from, to);
      assert.equal(await id(), viewport.width >= 1100 ? 'p56' : 'p55', '左滑翻下一页/跨');
      await open('p54');
      await drag(to, from);
      assert.equal(await id(), viewport.width >= 1100 ? 'p52' : 'p53', '右滑回上一页/跨');

      for (const selector of ['#fullscreen-btn', '#mute', '#page-btn', '#shell-btn']) {
        await open('p54');
        const box = await page.locator(selector).boundingBox();
        const start = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
        const end = { x: start.x + (start.x < viewport.width / 2 ? 80 : -80), y: start.y };
        await drag(start, end);
        assert.equal(await id(), 'p54', selector + ' 上滑动不能翻书');
        assert.equal(await page.evaluate(() => !!document.fullscreenElement), false, selector + ' 上滑动不能误进全屏');
      }
      await open('p54');
      await drag(from, to, true);
      assert.equal(await id(), 'p54', '取消滑动不能翻页');
      await touch('touchStart', [from]);
      await page.evaluate(() => { Book.goToId('p56'); Book.goToId('p54'); });
      await touch('touchMove', [to]);
      await touch('touchEnd', []);
      await page.waitForTimeout(400);
      assert.equal(await id(), 'p54', '离页重返后旧滑动不能翻页');

      for (const fullscreen of [false, true]) {
        await open('p20');
        if (fullscreen) {
          if (!(await page.evaluate(() => document.fullscreenEnabled))) continue;
          await page.evaluate(() => {
            window.testFullscreenEvents = [];
            for (const type of ['pointerdown', 'touchstart', 'touchend', 'click']) {
              document.addEventListener(type, e => window.testFullscreenEvents.push([type, e.target.id, e.clientX, e.clientY]), true);
            }
          });
          // 给原生浏览器上一段手势/窗口切换留出稳定时间，避免合成点击被系统抑制。
          await page.waitForTimeout(400);
          await page.locator('#fullscreen-btn').tap();
          await page.waitForFunction(() => !!document.fullscreenElement);
          await page.waitForTimeout(250);
        }
        const spiral = page.locator('.is-active[data-id=p20] .spiral');
        const center = await spiral.evaluate(el => {
          const r = el.getBBox();
          const p = new DOMPoint(r.x + r.width / 2, r.y + r.height / 2).matrixTransform(el.parentNode.getScreenCTM());
          return { x: p.x, y: p.y };
        });
        const radius = Math.min(18, viewport.width * .04);
        const start = { x: center.x - radius, y: center.y };
        // 真触摸画圈中途取消，不能留下角度或误完成。
        await touch('touchStart', [start]);
        await touch('touchMove', [{ x: center.x, y: center.y - radius }]);
        await touch('touchCancel', []);
        assert.equal(await spiral.getAttribute('data-deg'), '0');
        assert.equal(await id(), 'p20');
        await touch('touchStart', [start]);
        for (let step = 1; step <= 48; step++) {
          const angle = Math.PI + Math.PI * 2 * step / 48;
          await touch('touchMove', [{ x: center.x + Math.cos(angle) * radius, y: center.y + Math.sin(angle) * radius }]);
          await page.waitForTimeout(16);
        }
        assert.equal(await id(), 'p20', '画圈未抬手不能变成滑动翻页');
        assert.ok(Number(await spiral.getAttribute('data-deg')) >= 300, '画圈应累计完整角度');
        await touch('touchEnd', []);
        await page.waitForFunction(expected => Book.page().dataset.id === expected, viewport.width >= 1100 ? 'p22' : 'p21');
        if (fullscreen) await page.evaluate(() => document.exitFullscreen());
      }
      await open('p54');
      const second = { x: from.x - 80, y: from.y };
      await touch('touchStart', [from]);
      await touch('touchStart', [from, second]);
      await touch('touchMove', [to, { x: to.x - 40, y: to.y }]);
      await touch('touchEnd', []);
      await page.waitForTimeout(400);
      assert.equal(await id(), 'p54', '双指操作不能当成翻页');
      if (cdp) {
        // 无头浏览器在最小对照网页上也不执行原生 pinch 缩放。
        // 设置真实页面倍率后再发原生单指输入，单独验证放大后的平移边界。
        await cdp.send('Emulation.setPageScaleFactor', { pageScaleFactor: 1.5 });
        assert.ok(await page.evaluate(() => visualViewport.scale > 1.1));
        await drag({ x: 100, y: viewport.height / 3 }, { x: 220, y: viewport.height / 3 });
        assert.equal(await id(), 'p54', '放大后单指拖动画面不能翻页');
        await cdp.send('Emulation.resetPageScaleFactor');
        await cdp.send('Emulation.setSafeAreaInsetsOverride', { insets: { top: 44, left: 44, right: 44, bottom: 21 } });
        await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        const controls = await page.locator('#fullscreen-btn, #mute, #page-btn, #shell-btn').evaluateAll(els => els.map(el => {
          const r = el.getBoundingClientRect();
          return { x: r.x, y: r.y, right: r.right, bottom: r.bottom, width: r.width, height: r.height };
        }));
        for (const a of controls) {
          assert.ok(a.x >= 44 && a.right <= viewport.width - 44 && a.y >= 44, '按钮应避开安全区');
          assert.ok(a.width >= 44 && a.height >= 44, '触摸按钮至少 44px');
          for (const b of controls) if (a !== b) assert.ok(a.right <= b.x || b.right <= a.x || a.bottom <= b.y || b.bottom <= a.y, '安全区内按钮不能重叠');
        }
        await page.screenshot({ path: path.join(fileURLToPath(new URL('../dist/', import.meta.url)), `touch-safe-${viewport.width}.png`) });
      }
      assert.deepEqual(errors, []);
      console.log(`✓ ${native ? 'Chromium 原生触摸' : 'WebKit DOM 触摸'} ${viewport.width}×${viewport.height}：翻页、工具栏、取消、离页、画圈及双指边界`);
    } catch (error) {
      console.error('触摸失败', viewport, await page.evaluate(() => ({
        page: Book.page().dataset.id, fullscreen: !!document.fullscreenElement,
        status: document.querySelector('#fullscreen-status').textContent,
        pending: document.querySelector('#fullscreen-btn').getAttribute('aria-disabled'),
        events: window.testFullscreenEvents,
      })));
      throw error;
    } finally {
      await page.close();
    }
  }
}

export async function verifyLegacyFullscreen(browser, standardPresent = false) {
  const page = await browser.newPage();
  try {
    await page.addInitScript(standardPresent => {
      if (standardPresent) Object.defineProperty(document, 'fullscreenEnabled', { value: false });
      else Object.defineProperty(Element.prototype, 'requestFullscreen', { value: undefined });
      Object.defineProperty(document, 'webkitFullscreenEnabled', { value: true });
      Object.defineProperty(document, 'webkitFullscreenElement', { value: null, writable: true });
      window.testFullscreenRequests = 0;
      Element.prototype.webkitRequestFullscreen = function () {
        window.testFullscreenRequests++;
        setTimeout(() => {
          document.webkitFullscreenElement = this;
          document.dispatchEvent(new Event('webkitfullscreenchange'));
        }, 150);
      };
      document.webkitExitFullscreen = () => {
        setTimeout(() => {
          document.webkitFullscreenElement = null;
          document.dispatchEvent(new Event('webkitfullscreenchange'));
        }, 150);
      };
    }, standardPresent);
    await page.goto(entry + '?book=awulubo#p54');
    await page.evaluate(() => {
      document.getElementById('fullscreen-btn').click();
      setTimeout(() => document.getElementById('fullscreen-btn').click(), 20);
    });
    await page.waitForTimeout(60);
    assert.equal(await page.evaluate(() => window.testFullscreenRequests), 1, '旧 WebKit 异步全屏请求期间不能重复提交');
    await page.waitForFunction(() => document.querySelector('#fullscreen-btn').textContent === '退出');
    await page.locator('#fullscreen-btn').click();
    await page.waitForFunction(() => document.querySelector('#fullscreen-btn').textContent === '全屏');
    await page.evaluate(() => {
      document.documentElement.webkitRequestFullscreen = () => {
        setTimeout(() => document.dispatchEvent(new Event('webkitfullscreenerror')), 30);
      };
      document.getElementById('fullscreen-btn').click();
    });
    await page.waitForFunction(() => document.querySelector('#fullscreen-status').textContent.includes('再试一次'));
    assert.equal(await page.locator('#fullscreen-btn').getAttribute('aria-disabled'), null);
    assert.equal(await page.evaluate(() => Book.page().dataset.id), 'p54');
    console.log(`✓ ${standardPresent ? '标准接口禁用后的 WebKit 回退' : '旧 WebKit 全屏'}：异步成功、重复输入、退出与错误恢复`);
  } finally {
    await page.close();
  }
  if (!standardPresent) await verifyLegacyFullscreen(browser, true);
}
