/* 同三物、侧躺入口和尊重停手；接入共用制作入口。 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { pngPixels } from './png-pixels.mjs';

const ids = ['apple-1', 'fish-1', 'star-1'];
const shape = o => [o.kind, o.at, o.scale, o.rotate || 0];
export function verifyTidy(book) {
  const p = n => book.pages.find(p => +p.id.slice(1) === n);
  const object = (n, id) => p(n).props.find(o => o.id === id);
  const contained = n => p(n).props.filter(o => o.class === 'in-basket').map(o => o.id).sort();
  for (let n = 4; n <= 59; n++) {
    const props = p(n).props;
    for (const id of ids) {
      assert.equal(props.filter(o => o.id === id).length, 1, '同三物各一件，不复制或消失');
      assert.equal(object(n, id).kind, id.split('-')[0], '身份与种类不换');
      assert.equal(object(n, id).scale, object(4, id).scale, '同物尺度不因入篮改变');
    }
    assert.equal(props.filter(o => ['apple', 'fish', 'star'].includes(o.kind)).length, 3, '不新增第二批或把背心算第四件');
    assert.equal(props.filter(o => /^basket/.test(o.kind)).length, 1, '唯一同篮');
    assert.deepEqual(contained(n), n < 31 ? [] : n < 37 ? ['apple-1'] : n < 45 ? ['apple-1', 'fish-1'] : ids.slice().sort(), '篮内必须按0→1→2→3推进');
    assert.equal(p(n).char.wear, n >= 24 && n <= 32 ? 'vest-damp' : n >= 16 && n <= 23 ? 'vest-creased' : 'vest', '同背心始终穿着，皱褶与泪点不作奖赏');
    assert.ok(!p(n).props.some(o => ['moon', 'paper', 'flower'].includes(o.kind)), '不追加彩纸、月亮或第二轮任务');
    if (n % 2) assert.equal(p(n).responseTo, 'p' + String(n - 1).padStart(2, '0'));
    if (![36, 44].includes(n)) assert.ok(!p(n).hotspot, '观察或自主叙事可只读，不加剧情外点击');
    if (n <= 20) assert.equal(object(n, 'basket-1').kind, 'basket');
    else if (n <= 26) assert.equal(object(n, 'basket-1').kind, 'basket-fallen');
    else assert.deepEqual(shape(object(n, 'basket-1')), shape(object(27, 'basket-1')), 'p27后篮口方向及位置锁定');
    if (n >= 31) assert.deepEqual(shape(object(n, 'apple-1')), shape(object(31, 'apple-1')), '苹果入篮后不再移出');
    if (n >= 37) assert.deepEqual(shape(object(n, 'fish-1')), shape(object(37, 'fish-1')), '小鱼入篮后不再移出');
    if (n >= 45) assert.deepEqual(shape(object(n, 'star-1')), shape(object(45, 'star-1')), '最后星星入篮后静置');
    assert.equal(p(n).bg.wash, n < 52 ? '--wash-cream' : n < 56 ? '--night' : '--night-deep', '仅正文天黑后换夜色，不另刷庆祝场');
    if (n >= 56) {
      assert.equal(p(n).scene.light, 'late-night');
      assert.ok(!p(n).char.spiral && !p(n).hotspot);
    }
  }
  assert.ok(object(11, 'apple-1').at[0] > object(10, 'apple-1').at[0]);
  assert.ok(object(12, 'apple-1').at[0] < object(11, 'apple-1').at[0], '苹果从墙脚顶回，不瞬移入篮');
  for (const n of [13, 14]) assert.deepEqual(shape(object(n, 'basket-1')), shape(object(4, 'basket-1')), 'p15才顶近篮');
  assert.ok(object(15, 'basket-1').at[0] > object(14, 'basket-1').at[0]);
  for (let n = 21; n <= 25; n++) {
    for (const id of ids) assert.deepEqual(shape(object(n, id)), shape(object(21, id)), '哭与陪伴不偷偷收物');
  }
  for (let n = 13; n <= 18; n++) for (const id of ids) assert.deepEqual(shape(object(n, id)), shape(object(13, id)), '顶篮和陪坐不挪动聚拢的三物');
  for (let n = 21; n <= 27; n++) assert.deepEqual(shape(object(n, 'apple-1')), shape(object(21, 'apple-1')), '顶转篮子时苹果不能跟着瞬移');
  for (let n = 21; n <= 35; n++) for (const id of ['fish-1','star-1']) assert.deepEqual(shape(object(n, id)), shape(object(21, id)), '转篮、对苹果与让位不挪动鱼星');
  for (let n = 39; n <= 43; n++) assert.deepEqual(shape(object(n, 'star-1')), shape(object(39, 'star-1')), '星星未碰，听到停后仍原位');
  for (const n of [40, 41, 42]) {
    assert.equal(p(n).char.pose, 'poised-left', '脚必须还抬着，未落脚推星');
    const star = object(n, 'star-1');
    assert.ok(p(n).char.at[0] + 210 * p(n).char.scale > star.at[0] + 930 * star.scale + 8, '肚子与星须留可见空隙');
  }
  assert.equal(p(43).char.pose, 'withdraw-step');
  assert.ok(p(43).char.at[0] + 55 * p(43).char.scale > p(42).char.at[0] - 40 * p(42).char.scale + 60, '听到停后收脚退开大步');
  for (const [n, id, next] of [[36, 'fish-1', 37], [44, 'star-1', 45]]) {
    const hs = p(n).hotspot;
    assert.ok(!Array.isArray(hs), '每次只收本页一件，不等旧三物');
    assert.equal(hs?.action, 'tidy');
    assert.equal(hs?.targetId, id, '鱼先、星最后，只绑定待收同物');
    const o = object(n, id), target = object(next, id);
    const offset = key => Number(o.style.match(new RegExp('--go-' + key + ':\\s*(-?[\\d.]+)'))?.[1]);
    assert.equal(o.at[0] + offset('x'), target.at[0], '收纳终点与紧邻右页一致');
    assert.equal(o.at[1] + offset('y'), target.at[1], '收纳终点与紧邻右页一致');
    assert.ok(p(n).props.some(o => o.id === 'child-hand'), '最后两次由孩子送入');
  }
  assert.equal(book.pages.filter(p => p.exit).length, 1);
  assert.equal(p(62).exit, 'p04');
  for (const n of [63, 64]) {
    for (const id of [...ids, 'basket-1']) assert.deepEqual(shape(object(n, id)), shape(object(59, id)), '后置不再开篮、移物或翻回直立');
  }
  assert.equal(p(64).char.wear, 'vest', '背心不脱下收进篮里');
}

export const tidyMutations = [
  [4, "record.pages[0].text.narration.text='旧正文';", /正文须逐字/],
  [6, "record.pages[0].props.push({...record.pages[0].props.find(o=>o.id==='star-1'),id:'star-2'});", /第二批/],
  [12, "record.pages[0].props.find(o=>o.id==='apple-1').at=[900,100];", /墙脚顶回/],
  [30, "record.pages[0].props.find(o=>o.id==='apple-1').class='in-basket';", /0→1→2→3/],
  [26, "record.pages[1].props.find(o=>o.id==='fish-1').at=[570,740];", /不挪动鱼星/],
  [36, "record.pages[0].props.find(o=>o.id==='fish-1').class='in-basket';", /0→1→2→3/],
  [42, "record.pages[0].props.find(o=>o.id==='star-1').class='in-basket';", /0→1→2→3/],
  [34, "record.pages[1].props.find(o=>o.id==='basket-1').rotate=180;", /方向及位置/],
  [38, "record.pages[1].props.find(o=>o.id==='basket-1').at=[200,200];", /方向及位置/],
  [40, "record.pages[1].props.find(o=>o.id==='star-1').at=[100,100];", /星星未碰/],
  [40, "record.pages[1].char.pose='step';", /脚必须还抬着/],
  [40, "record.pages[1].char.at=[480,350];", /可见空隙/],
  [42, "record.pages[1].char.at=[535,350];", /退开大步/],
  [44, "record.pages[0].hotspot.targetId='apple-1';", /只绑定待收/],
  [44, "record.pages[0].props.find(o=>o.id==='star-1').style='--go-x:20;--go-y:0';", /终点/],
  [54, "record.pages[1].props.find(o=>o.id==='fish-1').at=[900,0];", /小鱼入篮后/],
  [56, "delete record.pages[0].char.wear;", /同背心/],
  [58, "record.pages[1].char.spiral=true;", /assert|falsy/],
  [64, "record.pages.find(p=>p.id==='p64').props.find(o=>o.id==='basket-1').kind='basket';", /后置不再/],
];

export async function verifyTidyBrowser(browser) {
  const page = await browser.newPage();
  page.setDefaultTimeout(6000);
  const open = async (width, id, mode = 'index') => {
    await page.goto('about:blank');
    await page.setViewportSize({ width, height: 1100 });
    await page.goto(new URL('../dist/' + mode + '.html', import.meta.url).href + '?book=wuzilai#' + id);
    await page.evaluate(() => document.fonts.ready);
    if (mode === 'index') assert.equal(await page.evaluate(() => Book.page().dataset.id), width >= 1100 ? 'p' + String(+id.slice(1) - (+id.slice(1) % 2)).padStart(2, '0') : id, '夹具须从指定页面开始');
  };
  // 先截屏幕原始帧，再读对象框；不能用隐藏／恢复对象触发重绘来掩盖漏画。
  for (const width of [900, 1440]) {
    for (const id of ['p31', 'p37', 'p45']) {
      await open(width, width >= 1100 ? 'p' + String(+id.slice(1) - 1).padStart(2, '0') : id);
      const stage = page.locator('#stage');
      const pixels = pngPixels(await stage.screenshot());
      const frame = await stage.boundingBox();
      for (const target of ids) {
        const box = await page.locator('[data-book=wuzilai][data-id=' + id + '] [data-object="' + target + '"]').boundingBox();
        assert.ok(frame && box, '屏幕对象布局不能读空');
        let count = 0;
        for (let y = Math.max(0, Math.floor(box.y - frame.y)); y < Math.min(pixels.height, Math.ceil(box.y + box.height - frame.y)); y++) {
          for (let x = Math.max(0, Math.floor(box.x - frame.x)); x < Math.min(pixels.width, Math.ceil(box.x + box.width - frame.x)); x++) {
            const i = (y * pixels.width + x) * pixels.channels;
            const [r, g, b] = pixels.data.subarray(i, i + 3);
            if (target === 'apple-1' ? r > g * 1.6 && r > b * 1.6 : target === 'fish-1' ? b > r * 1.25 && g > r * 1.15 : r > b * 1.4 && g > b * 1.3) count++;
          }
        }
        assert.ok(count > 30, '屏幕首次绘制须有同物彩色墨迹：' + width + '/' + id + '/' + target + '/' + count);
      }
    }
  }
  for (const width of [900, 1440]) {
    for (const [id, target, next] of [['p36', 'fish-1', 'p37'], ['p44', 'star-1', 'p45']]) {
      await open(width, id);
      const host = page.locator('[data-book=wuzilai][data-id=' + id + ']');
      assert.equal(await host.locator('[data-action=tidy]').count(), 1);
      await page.evaluate(target => {
        const p = Book.page(), el = p.querySelector('[data-object="' + target + '"]');
        window.__tidyEnd = null;
        const finish = BookEffects.finish;
        BookEffects.finish = function (host) {
          if (host === p) window.__tidyEnd = { transform: el.getAttribute('transform'), opacity: getComputedStyle(el).opacity };
          return finish.apply(this, arguments);
        };
      }, target);
      await host.locator('[data-object="' + target + '"]').evaluate(el => el.parentNode.appendChild(el));
      await host.locator('.hotspot').focus();
      await page.keyboard.press(width === 900 ? 'Enter' : 'Space');
      await page.waitForFunction(id => Book.page().dataset.id === id, width === 900 ? next : 'p' + String(+id.slice(1) + 2).padStart(2, '0'));
      const end = await page.evaluate(() => window.__tidyEnd);
      const right = await page.locator('[data-book=wuzilai][data-id=' + next + '] [data-object="' + target + '"]').getAttribute('transform');
      const values = t => t.match(/-?\d+(?:\.\d+)?/g).map(Number);
      assert.deepEqual(values(end.transform), values(right), '实际收纳终点、尺度须与紧邻纸屏结果一致');
      assert.equal(Number(end.opacity), 1, '入篮不能半透明消失');
      await open(width, id);
      await page.locator('.is-active [data-action=tidy]').dblclick({ delay: 40 });
      await page.waitForTimeout(1400);
      assert.equal(await page.evaluate(() => Book.page().dataset.id), width === 900 ? next : 'p' + String(+id.slice(1) + 2).padStart(2, '0'));
      await open(width, id);
      const initial = await host.locator('[data-object="' + target + '"]').getAttribute('transform');
      await host.locator('.hotspot').click();
      await page.evaluate(id => { Book.goToId('p48'); Book.goToId(id); }, id);
      await page.waitForTimeout(1400);
      assert.equal(await page.evaluate(() => Book.page().dataset.id), id);
      assert.equal(await host.locator('[data-object="' + target + '"]').getAttribute('transform'), initial);
      assert.equal(await host.locator('[data-tidied]').count(), 0, '重进是新进入，可再收本页同一件');
    }
    for (const id of ['p40', 'p42', 'p56']) {
      await open(width, id);
      await page.waitForTimeout(500);
      assert.equal(await page.evaluate(() => Book.page().dataset.id), id);
      assert.equal(await page.locator('.is-active .hotspot').count(), 0);
    }
    assert.equal(await page.locator('.is-active').evaluateAll(ps => ps.reduce((n, p) => n + p.getAnimations({ subtree: true }).length, 0)), 0);
    console.log('✓ 单一收纳 ' + width + 'px 每页一件、实际终点／尺度、键盘／重排、重复及离页复位、停退与静止');
  }
  const bounds = (before, after, region) => {
    let left = before.width, right = -1, count = 0;
    for (let y = 0; y < before.height; y++) for (let x = 0; x < before.width; x++) {
      if (x < region.left || x > region.right || y < region.top || y > region.bottom) continue;
      const i = (y * before.width + x) * before.channels;
      if ([0, 1, 2].some(c => Math.abs(before.data[i + c] - after.data[i + c]) > 16)) {
        left = Math.min(left, x); right = Math.max(right, x); count++;
      }
    }
    return { left, right, count };
  };
  for (const id of ['p31', 'p37', 'p41', 'p45', 'p58']) {
    await open(1440, id, 'proof');
    const host = page.locator('[data-book=wuzilai][data-id=' + id + ']');
    const measure = async selector => {
      const o = host.locator(selector);
      const before = pngPixels(await host.screenshot({ animations: 'disabled' }));
      const h = await host.boundingBox(), box = await o.boundingBox();
      assert.ok(h && box, '实际布局不能读空');
      // SVG use重绘会让其他物件的抗锯齿发生变化，只在目标真实框（含描边余量）内取墨迹。
      const region = { left: box.x - h.x - 4, right: box.x + box.width - h.x + 4, top: box.y - h.y - 4, bottom: box.y + box.height - h.y + 4 };
      await o.evaluate(el => el.style.visibility = 'hidden');
      const diff = bounds(before, pngPixels(await host.screenshot({ animations: 'disabled' })), region);
      await o.evaluate(el => el.style.visibility = '');
      return diff;
    };
    let star;
    for (const target of ids) {
      const diff = await measure('[data-object="' + target + '"]');
      assert.ok(diff.count > 80, '每件须有真实可见墨迹：' + id + '/' + target + '/' + diff.count);
      if (target === 'star-1') star = diff;
    }
    if (id === 'p41') {
      const width = (await host.boundingBox()).width;
      const char = await measure('.char');
      assert.ok(char.count > 500, '角色实际墨迹不能读空');
      assert.ok(char.left - star.right > width * .005, '实际墨迹中腹、悬脚与星之间须有空隙：' + JSON.stringify({char,star,width}));
      await host.locator('.char').evaluate(el => el.setAttribute('transform', 'translate(480,350) scale(0.5)'));
      const badChar = await measure('.char'), badStar = await measure('[data-object="star-1"]');
      assert.ok(badChar.left - badStar.right <= width * .005, '角色贴到星星的实际墨迹反例必须被拒绝');
    }
  }
  const out = new URL('../dist/production-proof/wuzilai/', import.meta.url);
  fs.mkdirSync(out, { recursive: true });
  for (const id of ['p06', 'p12', 'p18', 'p20', 'p24', 'p26', 'p30', 'p34', 'p36', 'p40', 'p42', 'p44', 'p46', 'p56']) {
    await open(1440, id);
    await page.locator('#stage').screenshot({ path: fileURLToPath(new URL('screen-' + id + '.png', out)) });
  }
  for (const mode of ['print', 'proof', 'booklet']) {
    await open(900, 'p44', mode);
    assert.equal(await page.locator('[data-book=wuzilai][data-id=p44] button').count(), 0);
  }
  await page.close();
}
