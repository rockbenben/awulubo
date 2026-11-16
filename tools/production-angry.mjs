/* 第四册的物理状态链；由共用制作入口调用，不增加册专属流水线。 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { pngPixels } from './png-pixels.mjs';

export function verifyAngry(book) {
  const page = n => book.pages.find(p => +p.id.slice(1) === n);
  const block = (n, i) => page(n).props.find(o => o.id === 'block-' + i);
  const geometry = o => [o.at, o.scale, o.rotate || 0];
  for (let n = 4; n <= 59; n++) {
    const blocks = page(n).props.filter(o => o.kind === 'block');
    assert.equal(blocks.length, 5, '只能保留同五块，不增不减');
    for (let i = 1; i <= 5; i++) {
      assert.ok(block(n, i), '同块身份不得替换');
      assert.equal(block(n, i).style.split(';opacity')[0], block(4, i).style, '捡回同块不能换色');
    }
    assert.ok(!page(n).props.some(o => ['apple', 'fish', 'star', 'flower'].includes(o.kind)), '不加新玩具打断生气');
    if (n < 50) assert.equal(page(n).char.wear, n >= 15 && n <= 26 ? 'scarf-creased' : 'scarf', '领巾随张力起皱／摊平');
    else {
      assert.ok(!page(n).char.wear, '摘巾后不重新戴回');
      assert.equal(page(n).props.find(o => o.id === 'scarf-1')?.kind, 'scarf', '摘下同一领巾');
    }
    if (n % 2) assert.equal(page(n).responseTo, 'p' + String(n - 1).padStart(2, '0'));
    if (![24, 40].includes(n)) assert.ok(!page(n).hotspot, '无提示或自主动作不增强制输入');
    if (n >= 56) {
      assert.equal(page(n).scene.light, 'late-night');
      assert.ok(!page(n).char.spiral && !page(n).hotspot);
    }
  }
  for (let n = 4; n <= 6; n++) {
    for (let i = 1; i < 5; i++) assert.equal(block(n, i).at[1] - block(n, i + 1).at[1], 106, '初塔仍是完整五块高塔');
  }
  assert.ok(block(6, 5).rotate, '倒塔前只有塔尖先歪');
  assert.equal(page(16).char.pose, 'tense-back', '用力背转不留正脸');
  assert.equal(page(19).char.pose, 'puffed-side', '闭嘴鼓腮不是笑脸');
  assert.equal(page(23).char.pose, 'breath-side');
  assert.equal(page(25).char.pose, 'soften-side', '呼气后只松一点，不能直接大笑');
  for (let n = 20; n <= 27; n++) assert.equal(page(n).bg.wash, '--wash-red', '呼气不清空红场');
  for (let n = 28; n <= 59; n++) assert.ok(page(n).props.find(o => o.id === 'red-residue'), '红只收小，保留原场残余');
  for (let n = 7; n <= 30; n++) {
    for (let i = 2; i <= 5; i++) assert.deepEqual(geometry(block(n, i)), geometry(block(7, i)), '重搭之前散块不自动复原');
  }
  for (let n = 32; n <= 59; n++) {
    for (const i of [1, 2]) assert.deepEqual(geometry(block(n, i)), geometry(block(32, i)), '只掉B3，底座及余块不得再塌或消失');
  }
  // prop-block为x320..760、24单位描边；旁置块须在底座两侧留出20单位纸白。
  // 这是制作留白裕量，不是儿童理解的心理学阈值。像素检查另验证实际墨迹。
  const ink = o => ({ left: o.at[0] + 308 * o.scale, right: o.at[0] + 772 * o.scale });
  for (let n = 32; n <= 59; n++) {
    const base = { left: Math.min(ink(block(n, 1)).left, ink(block(n, 2)).left), right: Math.max(ink(block(n, 1)).right, ink(block(n, 2)).right) };
    for (const i of [4, 5]) {
      const spare = ink(block(n, i));
      assert.ok(base.left - spare.right >= 20 || spare.left - base.right >= 20, 'B4/B5须旁置并与底座留出可辨间隔：' + page(n).id + '/B' + i);
    }
  }
  for (let n = 7; n <= 59; n++) {
    for (const i of [4, 5]) assert.deepEqual(geometry(block(n, i)), geometry(block(7, i)), '散块自p07原位保留，不因重搭或入夜自行移动');
  }
  const side = o => ({ left: o.at[0] + 320 * o.scale, right: o.at[0] + 760 * o.scale, center: o.at[0] + 540 * o.scale });
  const bad = side(block(33, 3)), support = side(block(33, 2)), good = side(block(39, 3));
  assert.ok(bad.left < support.right && bad.center > support.right, '偏放必须有少量支承且重心越过B2外缘');
  assert.ok(good.center < support.right && good.center > side(block(39, 1)).left, '放正后重心回到稳定底座');
  assert.deepEqual(block(33, 3).at, block(34, 3).at);
  assert.ok(block(34, 3).rotate, 'p34只有顶块开始晃');
  assert.deepEqual(block(35, 3).at, block(36, 3).at, '脚边同块等待孩子捡回');
  for (const n of [37, 38]) assert.ok(page(n).props.find(o => o.id === 'child-hand'), '孩子捡同块，角色不代捡');
  assert.deepEqual(block(37, 3).at, block(38, 3).at, '陪伴等待不提前放正');
  for (let n = 39; n <= 59; n++) assert.deepEqual(geometry(block(n, 3)), geometry(block(39, 3)), '未完半塔原位保留到底');
  assert.notEqual(page(46).bg.wash, '--wash-yellow', '先答好，下一页才铺黄靠近');
  assert.equal(page(46).responseTo, 'p45', '明天的邀约在紧邻页答好');
  assert.equal(page(47).bg.wash, '--wash-yellow');
  assert.equal(page(47).turn, '黄色慢慢铺开');
  assert.notDeepEqual(page(46).char.at, page(47).char.at, '答应后真实挪近');
  for (let n = 51; n <= 59; n++) assert.deepEqual(page(n).props.find(o => o.id === 'scarf-1').at, page(51).props.find(o => o.id === 'scarf-1').at, '退场领巾静放');
  assert.equal(page(40).hotspot?.action, 'clap');
  assert.equal(page(24).hotspot?.action, 'breathe');
  assert.equal(page(40).hotspot?.targetId, 'character');
  assert.equal(book.pages.filter(p => p.exit).length, 1);
  assert.equal(page(62).exit, 'p04');
  for (const n of [63, 64]) {
    for (let i = 1; i <= 5; i++) assert.deepEqual(geometry(block(n, i)), geometry(block(59, i)), '后置不补搭或收走积木');
    assert.ok(!page(n).char?.wear, '后置不重新戴领巾');
  }
  assert.deepEqual(page(64).char.at, page(59).char.at, '封底角色与静放领巾分开，不能叠成再次穿戴');
}

export const angryMutations = [
  [4, "record.pages[0].text.narration.text='旧正文';", /正文须逐字/],
  [6, "record.pages[1].props=record.pages[1].props.filter(o=>o.id!=='block-5');", /同五块/],
  [24, "record.pages[1].char.pose='joy';", /只松一点/],
  [24, "record.pages[0].background={};record.pages[0].bg={wash:'--wash-yellow'};", /呼气不清空/],
  [24, "record.pages[1].char.wear='scarf';", /张力/],
  [32, "record.pages[1].props.find(o=>o.id==='block-3').at=[145,494];", /偏放必须/],
  [34, "record.pages[1].props.find(o=>o.id==='block-2').at=[600,700];", /只掉B3/],
  [36, "record.pages[1].props=record.pages[1].props.filter(o=>o.id!=='child-hand');", /不代捡/],
  [38, "record.pages[1].props.find(o=>o.id==='block-3').style='--block-face:var(--blue)';", /不能换色/],
  [38, "record.pages[1].props.find(o=>o.id==='block-3').at=[290,494];", /放正后/],
  [46, "record.pages[0].bg={wash:'--wash-yellow'};", /先答好/],
  [50, "record.pages[1].char.wear='scarf';", /不重新戴回/],
  [54, "record.pages[1].props.find(o=>o.id==='block-3').at=[0,0];", /半塔原位/],
  [58, "record.pages[1].char.spiral=true;", /assert|falsy/],
  [64, "record.pages.find(p=>p.id==='p64').char.at=[470,450];", /封底角色/],
  [32, "record.pages[0].props.find(o=>o.id==='block-4').at=[5,710];", /旁置.*可辨间隔/],
  [38, "record.pages[1].props.find(o=>o.id==='block-5').at=[170,710];", /旁置.*可辨间隔/],
  [30, "record.pages[1].props.find(o=>o.id==='block-4').at=[-55,710];", /散块自p07/],
  [58, "record.pages[1].props.find(o=>o.id==='block-5').at=[350,790];", /散块自p07/],
  [64, "record.pages.find(p=>p.id==='p64').props.find(o=>o.id==='block-4').at=[5,710];", /后置不补搭/],
];

export async function verifyAngryBrowser(browser) {
  const page = await browser.newPage();
  page.setDefaultTimeout(6000);
  const open = async (width, id, mode = 'index') => {
    await page.setViewportSize({ width, height: 1100 });
    await page.goto(new URL('../dist/' + mode + '.html', import.meta.url).href + '?book=shengqi#' + id);
    // 相同文件只改hash时浏览器会复用文档；隔离旧稿反例和采样观察器。
    await page.reload();
    await page.evaluate(() => document.fonts.ready);
  };
  const scatterInk = async host => {
    await host.scrollIntoViewIfNeeded();
    const bounds = {};
    for (const i of [1, 2, 4, 5]) {
      const object = host.locator('[data-object="block-' + i + '"]');
      const before = pngPixels(await host.screenshot({ animations: 'disabled' }));
      const frame = await host.boundingBox(), box = await object.boundingBox();
      assert.ok(frame && box, '旁置物件实际布局不能读空');
      const scale = before.width / frame.width;
      const region = { left: (box.x - frame.x) * scale - 4, right: (box.x + box.width - frame.x) * scale + 4, top: (box.y - frame.y) * scale - 4, bottom: (box.y + box.height - frame.y) * scale + 4 };
      const visibility = await object.evaluate(el => { const old = el.style.visibility; el.style.visibility = 'hidden'; return old; });
      let after;
      try { after = pngPixels(await host.screenshot({ animations: 'disabled' })); }
      finally { await object.evaluate((el, old) => el.style.visibility = old, visibility); }
      let left = before.width, right = -1, count = 0;
      for (let y = Math.max(0, Math.floor(region.top)); y <= Math.min(before.height - 1, Math.ceil(region.bottom)); y++) {
        for (let x = Math.max(0, Math.floor(region.left)); x <= Math.min(before.width - 1, Math.ceil(region.right)); x++) {
          const p = (y * before.width + x) * before.channels;
          if ([0, 1, 2].some(c => Math.abs(before.data[p + c] - after.data[p + c]) > 16)) { left = Math.min(left, x); right = Math.max(right, x); count++; }
        }
      }
      assert.ok(count > 100, '底座与两散块须有真实可见墨迹：B' + i + '/' + count);
      bounds[i] = { left, right };
    }
    const width = (await host.boundingBox()).width;
    // screenshot以CSS像素输出（deviceScaleFactor=1）；阈值同数据契约的2%页宽。
    const base = { left: Math.min(bounds[1].left, bounds[2].left), right: Math.max(bounds[1].right, bounds[2].right) };
    for (const i of [4, 5]) assert.ok(Math.max(base.left - bounds[i].right, bounds[i].left - base.right) >= width * .02, '实际墨迹的旁置间隔不足：B' + i + '/' + JSON.stringify({ base, spare: bounds[i], width }));
  };
  for (const width of [900, 1440]) for (const mode of ['index', 'proof']) {
    for (const id of ['p32', 'p39', 'p58']) {
      await open(width, id, mode);
      const host = page.locator('[data-book=shengqi][data-id=' + id + ']');
      await scatterInk(host);
      if (width === 900 && mode === 'index' && id === 'p39') {
        await host.locator('[data-object="block-4"]').evaluate(el => el.setAttribute('transform', 'translate(5,710) scale(0.24)'));
        await assert.rejects(() => scatterInk(host), /实际墨迹的旁置间隔不足/, '旧贴近底座的反例须失败');
      }
    }
    console.log('✓ ' + width + 'px ' + mode + ' 重搭／放正／夜尾两散块实际墨迹旁置');
  }
  const watchBreath = () => page.evaluate(() => {
      const host = Book.page(), char = host.querySelector('.char');
      const base = Number(char.getAttribute('transform').match(/scale\(([^)]+)\)/)[1]);
      window.__breathPeaks = 0; let above = false;
      new MutationObserver(() => {
        const scale = Number(char.getAttribute('transform').match(/scale\(([^)]+)\)/)[1]);
        const current = scale > base * 1.045;
        if (current && !above) window.__breathPeaks++;
        above = current;
      }).observe(char, { attributes: true, attributeFilter: ['transform'] });
  });
  for (const width of [900, 1440]) {
    if (width === 900) {
      await open(width, 'p24');
      await page.locator('.is-active').evaluate(el => delete el.dataset.reading);
      await watchBreath();
      await page.locator('.is-active [data-action=breathe]').click();
      await page.waitForFunction(() => Book.page().dataset.id === 'p25');
      assert.equal(await page.evaluate(() => window.__breathPeaks), 2, '未分类旧呼吸仍起伏两次；不应误当成一口共读');
    }
    await open(width, 'p24');
    const body = page.locator('[data-book=shengqi][data-id=p24] .char');
    const initial = await body.getAttribute('transform');
    await watchBreath();
    await page.locator('.is-active [data-action=breathe]').focus();
    await page.keyboard.press(width === 900 ? 'Enter' : 'Space');
    await page.waitForFunction(id => Book.page().dataset.id === id, width === 900 ? 'p25' : 'p26');
    assert.equal(await page.evaluate(() => window.__breathPeaks), 1, '一口共读只起伏一次');
    await open(width, 'p24');
    await page.locator('.is-active [data-action=breathe]').click();
    await page.evaluate(() => { Book.goToId('p28'); Book.goToId('p24'); });
    await page.waitForTimeout(2800);
    assert.equal(await page.evaluate(() => Book.page().dataset.id), 'p24');
    assert.equal(await body.getAttribute('transform'), initial, '呼气旧帧及完成回调都须离页作废');
    await open(width, 'p40');
    await page.locator('.is-active .hotspot').focus();
    await page.keyboard.press(width === 900 ? 'Enter' : 'Space');
    await page.waitForTimeout(150);
    assert.equal(await page.locator('[data-book=shengqi][data-id=p40] .is-wobble').count(), 0, '不提前演紧邻摇身结果');
    await page.waitForFunction(id => Book.page().dataset.id === id, width === 900 ? 'p41' : 'p42');
    await open(width, 'p40');
    await page.locator('.is-active .hotspot').dblclick({ delay: 40 });
    await page.waitForTimeout(1000);
    assert.equal(await page.evaluate(() => Book.page().dataset.id), width === 900 ? 'p41' : 'p42', '重复输入只完成一次');
    await open(width, 'p40');
    await page.locator('.is-active .hotspot').click();
    await page.evaluate(() => { Book.goToId('p44'); Book.goToId('p40'); });
    await page.waitForTimeout(1000);
    assert.equal(await page.evaluate(() => Book.page().dataset.id), 'p40', '旧回调不带走新进入');
    for (const id of ['p22', 'p46', 'p56']) {
      await open(width, id);
      await page.waitForTimeout(500);
      assert.equal(await page.evaluate(() => Book.page().dataset.id), id, '呼气、约定及晚安不强制等待或自动翻页');
      assert.equal(await page.locator('.is-active .hotspot').count(), 0);
    }
    await open(width, 'p56');
    assert.equal(await page.locator('.is-active').evaluateAll(ps => ps.reduce((n, p) => n + p.getAnimations({ subtree: true }).length, 0)), 0, '最后两跨静止');
    console.log('✓ 共同生气 ' + width + 'px 拍手紧邻、键盘／重复、离页复位、非强制呼气和约定、静止结尾');
  }
  // 实际像素确认五块并未被角色或夜色吞掉，不能仅检查对象节点存在。
  for (const id of ['p33', 'p35', 'p39', 'p58']) {
    await open(1440, id, 'proof');
    const host = page.locator('[data-book=shengqi][data-id=' + id + ']');
    const before = pngPixels(await host.screenshot());
    for (let i = 1; i <= 5; i++) {
      const object = host.locator('[data-object="block-' + i + '"]');
      await object.evaluate(el => el.style.visibility = 'hidden');
      const after = pngPixels(await host.screenshot());
      let changed = 0;
      for (let p = 0; p < before.data.length; p += before.channels) {
        if ([0, 1, 2].some(c => Math.abs(before.data[p + c] - after.data[p + c]) > 16)) changed++;
      }
      assert.ok(changed > 100, '同五块须实际可见：' + id + '/B' + i + '/' + changed);
      await object.evaluate(el => el.style.visibility = '');
    }
  }
  const out = new URL('../dist/production-proof/shengqi/', import.meta.url);
  fs.mkdirSync(out, { recursive: true });
  for (const id of ['p04', 'p06', 'p14', 'p20', 'p24', 'p32', 'p34', 'p36', 'p38', 'p44', 'p46', 'p50', 'p56']) {
    await open(1440, id);
    await page.locator('#stage').screenshot({ path: fileURLToPath(new URL('screen-' + id + '.png', out)) });
  }
  for (const mode of ['print', 'proof', 'booklet']) {
    await open(900, 'p40', mode);
    assert.equal(await page.locator('[data-book=shengqi][data-id=p40] button').count(), 0);
  }
  await page.close();
}
