/* P1-1：组件与真实 SVG 渲染回归，不迁移正文。 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { createPageRenderer } from './render-page.mjs';
import { pngPixels } from './png-pixels.mjs';

const root = new URL('../', import.meta.url);
const read = file => fs.readFileSync(new URL(file, root), 'utf8');
const source = read('src/components/character.svg');
assert.ok(!/<symbol\b/.test(source), '角色零件须使用g，不能引入裁切视口');
const poses = ['ready', 'willing', 'hesitant', 'braced', 'step', 'poised', 'yield', 'push', 'prone', 'back', 'side', 'curled', 'inflated'];
const legacy = ['idle', 'hungry', 'chomp', 'happy', 'peek', 'full', 'burp', 'asleep', 'rainbow', 'curious', 'shy', 'surprise', 'cheeky', 'cheer', 'wave', 'sleepy', 'hidden-feet', 'hidden-eyes', 'lean-close', 'turn-away', 'tired', 'yawn', 'grumpy', 'ouch', 'proud'];
assert.ok(!/<use\b[^>]*href="#ch-arm-/.test(source), '无手角色的姿态仍引用了手臂；应以身体／双脚回应并保留旧姿态ID');
for (const name of [...legacy, ...poses]) assert.ok(source.includes(`id="pose-${name}"`), `缺少姿态 ${name}`);
const { rigPoses, rigTransforms, wearStyles } = await import('./character-rig.mjs');
poses.unshift('guard-step','press-ball','pounce','guard-ball','startled-seat','sad-seat','listen-back','half-turn','push-right','bow','waiting-up','joy','curled-yawn','sip','sick-curled','sick-raised','bitter-curled','kick-corner','rise-one','push-corner','run','covered-rest','look-back','lean-rest','look-down','chew','tiptoe','round-ground','cross-eyed','flying','squash','sleep-curled');
poses.unshift('stretch-up','stretch-look','recoil-step','tense-back','puffed-side','breath-side','soften-side','neutral-front','ask-soft');
poses.unshift('watch-seat','head-nudge','tilt-foot','cry-seat','held-rest','proud-belly','poised-left','withdraw-step');
poses.unshift('curious-tilt','lean-near','beaming-lean','huddle-away','listen-low','belly-offer');
assert.deepEqual(Object.keys(rigPoses), poses);
const render = createPageRenderer();
const spec = (pose, wear, spiral = true) => ({ id: 'p04', pat: false, char: { pose, at: [0, 0], scale: 1, state: 'state-paper', spiral, ...(wear ? { wear } : {}) } });
for (const scope of ['screen', 'print']) {
  const old = render(spec('idle'), scope);
  assert.match(old, /href="#pose-idle"/);
  assert.match(old, /class="spiral"/);
  assert.match(old, /transform="translate\(0,0\) scale\(1\)"/);
  for (const pose of poses) {
    const html = render(spec(pose), scope);
    assert.equal((html.match(/class="spiral"/g) || []).length, ['back','listen-back','half-turn','tense-back','huddle-away'].includes(pose) ? 0 : 1, '腹纹必须只有一份且背面隐藏');
    if (!['back','listen-back','half-turn','tense-back','huddle-away'].includes(pose)) assert.ok(html.includes(`data-spiral-frame transform="${rigTransforms[pose]}"`));
  }
  assert.throws(() => render(spec('ready', 'not-a-costume'), scope), /未知穿戴/);
  assert.throws(() => render(spec('idle', 'vest'), scope), /组合姿态/);
}
const defs = ['character', 'rainbow', 'props'].map(name => read(`src/components/${name}.svg`).replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')).join('\n');
const tokens = read('src/css/tokens.css');
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1100, height: 1200 }, deviceScaleFactor: 1 });
  await page.route('**/*', route => route.abort());
  const inkBounds = buffer => {
    const png = pngPixels(buffer);
    let left = png.width, top = png.height, right = -1, bottom = -1;
    for (let y = 0; y < png.height; y++) for (let x = 0; x < png.width; x++) {
      const i = (y * png.width + x) * png.channels;
      if ([0, 1, 2].some(c => png.data[i + c] < 240)) {
        left = Math.min(left, x); top = Math.min(top, y);
        right = Math.max(right, x); bottom = Math.max(bottom, y);
      }
    }
    assert.ok(right > left && bottom > top, '不能读到空白校样');
    assert.ok(left > 3 && top > 3 && right < png.width - 4 && bottom < png.height - 4, '描边／穿戴触及裁切边');
    return { left, top, right, bottom };
  };
  const gallery = items => `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><style>${tokens}
    body{margin:0;background:#eee;color:#1f1f1f;font:16px sans-serif;--body:var(--paper);--spiral:var(--ink);--line:26;--glint:var(--paper)}
    main{display:grid;grid-template-columns:repeat(4,260px);gap:10px;padding:10px}article{background:white;text-align:center}
    .art{width:260px;height:260px}.art>svg{width:260px;height:260px;overflow:hidden}h2{font-size:15px;margin:8px}
    </style><svg width="0" height="0" style="position:absolute"><defs>${defs}</defs></svg><main>${items.map(([pose, wear, label]) => `<article data-pose="${pose}" data-wear="${wear || ''}"><h2>${label}</h2>${render(spec(pose, wear), 'print')}</article>`).join('')}</main></html>`;
  const items = poses.map(pose => [pose, undefined, rigPoses[pose]]);
  await page.setContent(gallery(items));
  const geometry = await page.evaluate(transforms => {
    const xml = new DOMParser().parseFromString(document.querySelector('defs').outerHTML, 'image/svg+xml');
    for (const use of xml.querySelectorAll('use')) {
      const href = use.getAttribute('href');
      if (!href?.startsWith('#') || !document.getElementById(href.slice(1))) throw new Error('悬空零件：' + href);
    }
    for (const [pose, transform] of Object.entries(transforms)) {
      const frame = document.getElementById('pose-' + pose).querySelector('[data-rig-body]');
      if (frame.getAttribute('transform') !== transform) throw new Error('腹纹与身体原构图不同步：' + pose);
    }
    const refs = id => {
      const found = new Set();
      const walk = current => {
        if (found.has(current)) return;
        found.add(current);
        for (const use of document.getElementById(current).querySelectorAll('use')) walk(use.getAttribute('href').slice(1));
      };
      walk(id); return [...found];
    };
    if (refs('pose-back').some(id => /eyes|brows|mouth|spiral/.test(id))) throw new Error('背转仍露出正面五官或腹纹');
    const blanketColor = getComputedStyle(document.querySelector('#prop-blanket path')).fill;
    for (const orientation of ['front', 'back']) {
      const cloth = document.getElementById('ch-wear-torso-' + orientation).querySelector('[style*="--wear-blanket"]');
      if (getComputedStyle(cloth).fill !== blanketColor) throw new Error('同毯披背与原毯颜色不一致：' + orientation);
    }
    return [...document.querySelectorAll('article')].map(el => {
      const svg = el.querySelector('.art>svg');
      const box = svg.querySelector('.char').getBBox();
      return { pose: el.dataset.pose, x: box.x, y: box.y, width: box.width, height: box.height };
    });
  }, rigTransforms);
  for (const b of geometry) {
    assert.ok(b.width > 100 && b.height > 100, `${b.pose} 不能是空零件`);
    assert.ok(b.x > 25 && b.y > 25 && b.x + b.width < 975 && b.y + b.height < 975, `${b.pose} 描边或动态端点缺少可见框余量：${JSON.stringify(b)}`);
  }
  const box = name => geometry.find(b => b.pose === name);
  assert.ok(box('prone').height < box('ready').height * 0.8, '趴伏须真正降低重心和轮廓，不能只旋转站姿');
  assert.ok(box('inflated').width > box('ready').width * 1.1, '鼓球须改变身体尺度');
  for (const pose of poses) inkBounds(await page.locator(`article[data-pose="${pose}"] .art`).screenshot());
  // 实际DOM的腹纹仍供现有揉肚子逻辑查询；旋转反馈不能改写身体构图。
  for (const pose of ['ready', 'prone', 'inflated', 'poised']) {
    const char = page.locator(`article[data-pose="${pose}"] .char`);
    const base = await char.getAttribute('transform');
    const frame = await char.locator('[data-spiral-frame]').getAttribute('transform');
    for (const degrees of [0, 90, 360]) {
      await char.locator('.spiral').evaluate((node, deg) => { node.style.transformOrigin = '500px 667px'; node.style.transform = `rotate(${deg}deg)`; }, degrees);
      assert.equal(await char.getAttribute('transform'), base);
      assert.equal(await char.locator('[data-spiral-frame]').getAttribute('transform'), frame);
      inkBounds(await char.locator('..').screenshot());
    }
  }
  const out = new URL('dist/character-proof/', root);
  fs.mkdirSync(out, { recursive: true });
  await page.screenshot({ path: fileURLToPath(new URL('poses.png', out)), fullPage: true });
  const outfits = Object.keys(wearStyles).map(wear => ['ready', wear, wearStyles[wear].label]);
  outfits.push(['back', 'headband', '背面带结'], ['back', 'scarf', '背面领巾结'], ['side', 'vest', '侧身背心'], ['prone', 'headband', '趴下发带'], ['poised', 'vest', '悬脚背心'], ['yield', 'vest', '停退背心']);
  await page.setContent(gallery(outfits));
  await page.screenshot({ path: fileURLToPath(new URL('wear.png', out)), fullPage: true });
  // 与无穿戴截图比较实际像素，防止影子树样式或锚点失效却结构仍存在。
  for (const [pose, wear] of outfits) {
    const el = page.locator(`article[data-pose="${pose}"][data-wear="${wear}"]`).first().locator('.art');
    const before = pngPixels(await el.screenshot());
    inkBounds(await el.screenshot());
    const original = await el.locator('.char').getAttribute('style');
    await el.locator('.char').evaluate(node => { for (const key of [...node.style]) if (key.startsWith('--wear-')) node.style.removeProperty(key); });
    const after = pngPixels(await el.screenshot());
    await el.locator('.char').evaluate((node, value) => node.setAttribute('style', value), original);
    let changed = 0;
    for (let i = 0; i < before.data.length; i += before.channels) {
      if ([0, 1, 2].some(c => Math.abs(before.data[i + c] - after.data[i + c]) > 16)) changed++;
    }
    assert.ok(changed > 40, `${pose}/${wear} 穿戴未真正显示`);
  }
  fs.writeFileSync(new URL('geometry.json', out), JSON.stringify(geometry, null, 2));
  // 取景必须一起移动墨迹、热区和数数标记；文字与动画的故事坐标不能被改写。
  const framingSample = {
    id: 'p04', char: { pose: 'curious-tilt', at: [200, 200], scale: .6, spiral: true },
    props: [{ id: 'A', kind: 'apple', at: [100, 500], scale: .3 }],
    hotspot: { action: 'find', targetId: 'A', target: 'apple', at: [100, 500], size: 300, label: '指指苹果' },
    numbers: [{ text: '1', at: [100, 500], size: 5, width: 100, on: true }],
    text: { narration: { text: '看看苹果。', at: [80, 80], size: 4, width: 500 } },
  };
  for (const bad of [{ at: [0, 0], scale: 0 }, { at: [NaN, 0], scale: 1 }, { at: [0], scale: 1 }, { at: [0, 0], scale: 1, rotate: 10 }]) {
    assert.throws(() => render({ ...framingSample, framing: bad }), /取景须使用/);
  }
  for (const scope of ['screen', 'print']) {
    const frame = { at: [-80, -150], scale: 1.3 };
    await page.setContent(`<style>${tokens}body{margin:0;--body:var(--paper);--spiral:var(--ink);--line:26}.page{position:relative;width:600px;height:600px;--u:6px}.art>svg{width:600px;height:600px}.hotspot,.number,.narration{position:absolute;margin:0}.number{line-height:1}</style><svg width="0" height="0"><defs>${defs}</defs></svg>${render(framingSample, scope)}${render({ ...framingSample, framing: frame }, scope)}`);
    const measure = () => page.locator('.page').evaluateAll(pages => pages.map(host => {
      const origin = host.getBoundingClientRect();
      return Object.fromEntries(['.char', '[data-object="A"]', '.hotspot', '.number', '.narration'].map(selector => {
        const el = host.querySelector(selector), b = el.getBoundingClientRect();
        return [selector, [(b.x-origin.x)/.6, (b.y-origin.y)/.6, b.width/.6, b.height/.6]];
      }));
    }));
    const verify = ([base, framed]) => {
      for (const selector of ['.char', '[data-object="A"]', '.hotspot', '.number']) {
        const expected = base[selector].map((value, i) => value * frame.scale + (i < 2 ? frame.at[i] : 0));
        expected.forEach((value, i) => assert.ok(Math.abs(value-framed[selector][i]) < .3, '取景后墨迹、热区与数字必须保持同一几何：' + selector));
      }
      assert.deepEqual(base['.narration'], framed['.narration'], '字不随镜头漂移');
    };
    verify(await measure());
    const object = page.locator('.page').nth(1).locator('[data-object="A"]');
    assert.equal(await object.getAttribute('transform'), 'translate(100,500) scale(0.3)', '动画起点继续使用原故事坐标');
    // 真实破坏一处热区并确认它确实改变，再证明几何检查会拒绝脱离墨迹的热区。
    const hotspot = page.locator('.page').nth(1).locator('.hotspot');
    const before = await hotspot.getAttribute('style');
    await hotspot.evaluate(el => el.style.left = '70%');
    assert.notEqual(await hotspot.getAttribute('style'), before);
    const broken = await measure();
    assert.throws(() => verify(broken), /墨迹、热区与数字/);
  }
  console.log('✓ 纸屏取景的墨迹／热区／数字同变换、文字独立、动画原坐标与错位反例');
  console.log('✓ 无手、旧ID、纸屏渲染、腹纹随体、可见框、形变与穿戴像素回归通过；组件校样在 dist/character-proof/');
} finally { await browser.close(); }

