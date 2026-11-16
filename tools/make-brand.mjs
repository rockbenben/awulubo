/* 品牌资产生成器：logo 与社交预览图。
   用法：
     node tools/make-brand.mjs --explore   # 候选对比图（挑样式用）
     node tools/make-brand.mjs --logo      # → docs/images/logo.svg
     node tools/make-brand.mjs --card      # → dist/og.png 与 docs/images/og.png（1280×640）
     node tools/make-brand.mjs --all       # 三个都做

   为什么自己写：logo 是**品牌资产**，不能是"角色改了它也跟着变"的活物。
   所以这里把角色零件摊平（<use> 展开、var() 落成实色、fill="inherit" 落成实色），
   产出自足的 SVG——跟角色源文件解耦，改角色要人再跑一次这里。

   摊平出来的颜色一律来自 src/css/tokens.css，图形一律来自 src/components/*.svg：
   logo 与书页是同一套画法（白纸 + 粗黑线 + 饱和平涂），不是另画一套。 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

/* ---- 色板：tokens.css 的 :root 块，var() 一路解析到底 ---- */
const TOKENS = (() => {
  const css = read('src/css/tokens.css');
  const block = css.slice(css.indexOf(':root'), css.indexOf('}') + 1);
  const raw = {};
  for (const m of block.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) raw[m[1]] = m[2].trim();
  const resolve = (name, seen = new Set()) => {
    if (!(name in raw) || seen.has(name)) return null;
    seen.add(name);
    const ref = raw[name].match(/^var\((--[\w-]+)\)$/);
    return ref ? resolve(ref[1], seen) : raw[name];
  };
  const out = {};
  for (const k of Object.keys(raw)) out[k] = resolve(k) ?? raw[k];
  return out;
})();

/* ---- 零件库：把 <g id="..."> 的内容按 id 存起来 ----
   ⚠️ 连 <g> 自己的那一层也留下来：ch-body-line 的黑描边（stroke / stroke-width）
   就写在 <g> 的 style 上，只取内层的话身体就没有轮廓了，
   噜啵会变成一坨没有线的白饼（真发生过）。 */
function componentIds(file) {
  const svg = read(file);
  const out = new Map();
  const re = /<g id="([^"]+)"[^>]*>/g;
  let m;
  while ((m = re.exec(svg))) {
    const id = m[1];
    const open = m[0];
    let depth = 1;
    let i = re.lastIndex;
    while (depth > 0 && i < svg.length) {
      const nextOpen = svg.indexOf('<g', i);
      const close = svg.indexOf('</g>', i);
      if (close === -1) break;
      if (nextOpen !== -1 && nextOpen < close) {
        depth++;
        i = nextOpen + 2;
      } else {
        depth--;
        i = close + 4;
      }
    }
    out.set(id, open + svg.slice(re.lastIndex, i - 4) + '</g>');
    re.lastIndex = i;
  }
  return out;
}

const PARTS = new Map([
  ...componentIds('src/components/character.svg'),
  ...componentIds('src/components/props.svg'),
  ...componentIds('src/components/rainbow.svg'),
  ...componentIds('src/components/effects.svg'),
]);

/* 把 style 里的 var() 全部落成实值。
   顺序有讲究：先把**不带 fallback** 的 var() 解掉（嵌套在 fallback 里的那个
   先解），再解带 fallback 的——否则 var(--ray-gap,var(--paper)) 这种写法
   会因为括号套括号而解不出来，样式整条作废，元素退回默认的黑。 */
function resolveVars(style, extra = {}) {
  if (!style) return '';
  const vars = { ...TOKENS, ...extra };
  let out = style;
  for (let pass = 0; pass < 8; pass++) {
    const next = out.replace(/var\(\s*(--[\w-]+)\s*\)/g, (all, name) =>
      vars[name] !== undefined ? vars[name] : all
    );
    if (next === out) break;
    out = next;
  }
  for (let pass = 0; pass < 8; pass++) {
    const next = out.replace(/var\(\s*(--[\w-]+)\s*,\s*([^()]*?)\s*\)/g, (all, name, fallback) => {
      if (vars[name] !== undefined) return vars[name];
      const fb = fallback.trim();
      return fb || all;
    });
    if (next === out) break;
    out = next;
  }
  return out;
}

function parseStyle(s) {
  const out = {};
  for (const part of (s || '').split(';')) {
    const i = part.indexOf(':');
    if (i > 0) out[part.slice(0, i).trim()] = part.slice(i + 1).trim();
  }
  return out;
}

/* 摊平：展开 <use href="#id">，var() 落成实色，fill="inherit" 继承自引用方。
   路径数据（d/cx/cy/r/transform…）原样保留——丢了就不是图了。 */
function flatten(id, inherited = {}, extraVars = {}, depth = 0) {
  if (depth > 12) throw new Error(`<use> 套得太深：${id}`);
  const body = PARTS.get(id);
  if (body === undefined) throw new Error(`没有这个零件：${id}`);

  return body.replace(/<(\w+)([^>]*?)(\/?)>/g, (all, tag, attrs, selfClose) => {
    const attrMap = {};
    for (const am of attrs.matchAll(/([\w:-]+)="([^"]*)"/g)) attrMap[am[1]] = am[2];
    const href = attrMap.href;
    const own = parseStyle(attrMap.style ? resolveVars(attrMap.style, extraVars) : '');

    if (tag === 'use') {
      if (!href || !href.startsWith('#')) return '';
      return flatten(href.slice(1), { ...inherited, ...own }, extraVars, depth + 1);
    }

    const finalStyle = { ...inherited, ...own };
    if (attrMap.fill === 'inherit') finalStyle.fill = inherited.fill ?? TOKENS['--paper'];
    else if (attrMap.fill !== undefined) finalStyle.fill = attrMap.fill;

    const keep = Object.entries(attrMap)
      .filter(([k]) => !['style', 'href', 'id', 'fill'].includes(k))
      .map(([k, v]) => ` ${k}="${v}"`)
      .join('');
    const styleOut = Object.entries(finalStyle)
      .filter(([, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => `${k}:${v}`)
      .join(';');
    const styleAttr = styleOut ? ` style="${styleOut}"` : '';
    return `<${tag}${keep}${styleAttr}${selfClose ? '/' : ''}>`;
  });
}

/* 角色：按顺序摊平无手零件。state决定身体颜色，沿用原构图。 */
function critter(state, { spiral = true } = {}) {
  const vars = {
    '--body': state === 'paper' ? TOKENS['--paper'] : TOKENS[`--${state}`],
    '--spiral': TOKENS['--ink'],
    '--glint': TOKENS['--paper'],
  };
  const order = [
    'ch-feet',
    'ch-body',
    'ch-brows-excited',
    'ch-eyes-happy',
    'ch-cheeks',
    'ch-mouth-grin',
  ];
  if (spiral) order.push('ch-spiral');
  return order.map((id) => flatten(id, {}, vars)).join('\n');
}

/* 道具的外接框（角色坐标系 1000×1000 内量出来的）。
   用来把道具摆到指定位置：给的是**外接框的中心**，不是路径原点。 */
const PROP_BOX = {
  'prop-star': { x: 90, y: 54, w: 835, h: 812 },
  'prop-apple': { x: 59, y: 68, w: 878, h: 798 },
  'prop-fish': { x: 250, y: 302, w: 630, h: 368 },
};

/* 把道具摆到 (cx, cy)：外接框中心落在那里 */
function heldProp(kind, scale, cx, cy, rotate = 0) {
  const inner = flatten(kind, {}, { ...TOKENS });
  const b = PROP_BOX[kind];
  if (!b) throw new Error(`没有这个道具：${kind}`);
  const ox = b.x + b.w / 2;
  const oy = b.y + b.h / 2;
  return `<g transform="translate(${cx},${cy}) rotate(${rotate}) scale(${scale}) translate(${-ox},${-oy})">${inner}</g>`;
}

/* 书上封面的笔触层：真的用 effects.svg 里那一份，不另画条纹。
   符号自己的圆心在 (500,500)（effects.json 里 rays.cx/cy），所以平移量要把圆心放到指定位置。 */
const EFFECT_SYMBOL = { rays: 'fx-rays', bands: 'fx-bands', 'rays-tight': 'fx-rays-tight' };
function effectLayer(kind, centerX, centerY, zoom, colors) {
  const inner = flatten(EFFECT_SYMBOL[kind], {}, {
    ...TOKENS,
    '--ray': colors.ray,
    '--ray2': colors.ray2,
    '--ray-gap': colors.gap,
  });
  const tx = centerX - 500 * zoom;
  const ty = centerY - 500 * zoom;
  return `<g transform="translate(${tx},${ty}) scale(${zoom})">${inner}</g>`;
}

/* ============================================================
   logo：噜啵望着头顶黄星星
   —— 为什么星星留在头顶而不是塞进嘴里：脸被眼睛、眉毛、嘴占满了，
      量过脸部空隙只有 x 440–560 / y 300–425，塞不下一颗看得见的星星。
      星星留在头顶上方最清楚：那颗黄星就是整个 mark 的视觉焦点，
      缩到 40 px（GitHub 仓库头像的实际大小）也还认得出。
   ============================================================ */
function logoSvg() {
  /* 角色的实际外框：脚底 y=840（含描边），圆身与双脚沿用原坐标 */
  const star = heldProp('prop-star', 0.3, 516, 62, -12);
  const body = critter('paper');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="88 -46 820 906" width="820" height="906">
<!-- 噜啵举着黄星星。《啊呜噜啵！》的品牌标记。
     路径已摊平（不含 <use>、不含 var()）：改角色要重新跑 tools/make-brand.mjs。 -->
${star}
${body}
</svg>`;
}

/* ============================================================
   社交预览图 1280×640
   —— 三只噜啵并排站在下沿，各自举着自己那份吃的：苹果(红)、小鱼(蓝)、黄星(黄)。
      一张图就说完了这本书的玩法，不用解释。
      版面是**上下叠**（标题在上、角色在下沿），不是"左文字右插图"两栏。
   ============================================================ */
const CARD = {
  width: 1280,
  height: 640,
  wash: '--wash-yellow',
  copy: {
    left: 76, top: 34, h1: 120, sub: 44, facts: 31,
    gapSub: 20, gapFacts: 24,
    factsRight: 1204,   /* 承诺那一行右对齐到这条线上 */
    factsTop: 62,
  },
  cast: {
    scale: 0.36,
    centres: [350, 640, 930],
    feetGap: 8,          /* 脚底离画面下沿留几像素：贴着边会被裁掉半只脚 */
    propY: -20,          /* 道具外接框中心在角色坐标系里的 y（负数 = 举得更高，与头拉开距离） */
    items: [
      { state: 'red', prop: 'prop-apple', pscale: 0.38, prot: -14 },
      { state: 'blue', prop: 'prop-fish', pscale: 0.62, prot: 12 },
      { state: 'yellow', prop: 'prop-star', pscale: 0.4, prot: -9 },
    ],
  },
  /* 背景笔触：种类 / 圆心 / 放大倍数 / 三种颜色（纸白缺口可以让光芒断开）
     —— 用**斜向色带**（书上第二册封面的那种），不用放射线：
        放射线放大之后是一块块大黄板子，看不出是光芒；
        斜向色带是一道一道的笔触，像马克笔刷出来的，跟书页一个画法。 */
  burst: { kind: 'bands', cx: 640, cy: 320, zoom: 0.7, ray: '--yellow', ray2: '--yellow-deep', gap: '--paper' },
};

function cardHtml(opts = {}) {
  const O = { ...CARD, ...opts, copy: { ...CARD.copy, ...(opts.copy || {}) }, cast: { ...CARD.cast, ...(opts.cast || {}) } };
  const T = TOKENS;
  const W = O.width;
  const H = O.height;
  const C = O.cast;

  const oy = H - 840 * C.scale - C.feetGap;
  const cast = C.items.map((it, i) => {
    const ox = C.centres[i] - 500 * C.scale;
    const prop = heldProp(it.prop, it.pscale, 500, C.propY, it.prot);
    return `<g transform="translate(${ox},${oy}) scale(${C.scale})">${prop}${critter(it.state)}</g>`;
  }).join('\n');

  const burst = O.burst
    ? `<svg class="bg" viewBox="0 0 ${W} ${H}">${effectLayer(O.burst.kind, O.burst.cx, O.burst.cy, O.burst.zoom, {
        ray: T[O.burst.ray],
        ray2: T[O.burst.ray2],
        gap: T[O.burst.gap],
      })}</svg>`
    : '';

  const cp = O.copy;
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">
<style>
@font-face{font-family:'ZCOOL';src:url('file:///${path.join(root, 'node_modules/@fontsource/zcool-kuaile/files/zcool-kuaile-chinese-simplified-400-normal.woff2')}')}
*{margin:0;padding:0;box-sizing:border-box}
body{width:${W}px;height:${H}px;overflow:hidden;background:${T[O.wash]};
  font-family:'ZCOOL',sans-serif;color:${T['--ink']};-webkit-font-smoothing:antialiased}
.stage{position:relative;width:${W}px;height:${H}px;overflow:hidden}
.cast{position:absolute;left:0;top:0;width:${W}px;height:${H}px}
.copy{position:absolute;left:${cp.left}px;top:${cp.top}px}
h1{font-size:${cp.h1}px;line-height:1;letter-spacing:2px;font-weight:400}
.sub{font-size:${cp.sub}px;line-height:1.2;margin-top:${cp.gapSub}px}
.facts{position:absolute;right:${W - cp.factsRight}px;top:${cp.factsTop}px;width:600px;text-align:right;
  font-size:${cp.facts}px;line-height:1.65}
</style></head><body>
<div class="stage">
  ${burst}
  <div class="copy">
    <h1>啊呜噜啵！</h1>
    <div class="sub">一个要你喂的小怪物</div>
  </div>
  <div class="facts">3–5 岁自己翻自己点的绘本<br>全部离线 · 不联网、不上传、不注册</div>
  <svg class="cast" viewBox="0 0 ${W} ${H}">${cast}</svg>
</div></body></html>`;
}

/* 候选板：几张摆在一起挑。背景处理（有没有光芒、光芒多大）最难凭想象定，
   摆出来比空想靠谱。 */
async function variants() {
  const list = [
    ['最终版', {}],
  ];
  const cells = list.map(([label, opts]) => `
    <figure>
      <div class="cell"><div class="scaler">${cardHtml(opts)}</div></div>
      <figcaption>${label}</figcaption>
    </figure>`).join('');
  const html = `<!doctype html><meta charset="utf-8"><style>
    body{margin:0;padding:16px;background:#d5d5d5;font-family:'ZCOOL',sans-serif}
    .sheet{display:grid;grid-template-columns:repeat(2,616px);gap:14px}
    figure{margin:0}
    .cell{width:616px;height:308px;overflow:hidden;position:relative;background:#fff}
    .scaler{width:1280px;height:640px;transform:scale(0.4813);transform-origin:top left}
    figcaption{font-size:16px;padding-top:4px}
  </style><div class="sheet">${cells}</div>`;
  const out = path.join(root, 'dist/brand-variants.png');
  await shoot(html, 1290, 1060, out);
  console.log(`→ ${out}`);
}

/* ---- 渲染 ---- */
async function shoot(html, width, height, out, base = null) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width, height } });
  /* base：先落到那个目录上，再写内容——
     file:// 下相对路径的资源（logo.svg）从 about:blank 引用会被浏览器拦掉。 */
  if (base) await page.goto(base);
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await page.screenshot({ path: out });
  await browser.close();
  return out;
}

/* 候选对比图：每个尺寸都摆一遍。
   40px 是 GitHub 仓库头像的实际大小——在那个尺寸下认不出的，
   换成什么尺寸都救不回来。
   卡片也摆一遍缩略图：社交预览图在信息流里是当缩略图看的，
   标题在那个尺寸下还认不认得出，得用眼睛看，不能靠想。 */
async function explore() {
  const svg = logoSvg();
  const cell = (label, bg) => `
    <figure style="background:${bg}">
      <div class="row">
        <span class="s200">${svg}</span>
        <span class="s96">${svg}</span>
        <span class="s64">${svg}</span>
        <span class="s40">${svg}</span>
      </div>
      <figcaption>${label}</figcaption>
    </figure>`;
  const html = `<!doctype html><meta charset="utf-8"><style>
    body{margin:0;padding:24px;background:#e9e9e9;font-family:'ZCOOL',sans-serif}
    figure{margin:0 0 20px;padding:16px;border-radius:8px}
    .row{display:flex;gap:28px;align-items:flex-end}
    .row span{display:block}
    .s200 svg{height:200px;width:auto}.s96 svg{height:96px;width:auto}
    .s64 svg{height:64px;width:auto}.s40 svg{height:40px;width:auto}
    figcaption{font-size:19px;margin-top:10px}
    .thumb{width:420px;height:210px;overflow:hidden;position:relative}
    .thumb>*{transform:scale(0.3281);transform-origin:top left}
  </style>
  ${cell('浅底', '#ffffff')}
  ${cell('黄底（书封的底色）', '#FFF6C4')}
  <figure style="background:#fff"><div class="thumb">${cardHtml()}</div>
  <figcaption>社交预览图在信息流里的缩略图大小（420×210）</figcaption></figure>`;
  const out = path.join(root, 'dist/brand-explore.png');
  await shoot(html, 900, 900, out);
  console.log(`→ ${out}`);

  const card = path.join(root, 'dist/og.png');
  await shoot(cardHtml(), 1280, 640, card);
  console.log(`→ ${card}`);
}

/* logo 自检：拿**文件本身**（不是内联的字符串）当图片加载，
   在白底与书封黄底上各摆一遍，还要看 40px 头像尺寸下认不认得出。
   ——logo.svg 是要单独发出去的（仓库头像、README），不能只在生成器里长得对。 */
async function checkLogo() {
  const file = path.join(root, 'docs/images/logo.svg');
  if (!fs.existsSync(file)) throw new Error('还没有 docs/images/logo.svg，先跑 --logo');
  const dir = path.join(root, 'docs/images').replace(/\\/g, '/');
  const html = `<!doctype html><meta charset="utf-8"><style>
    body{margin:0;padding:24px;background:#e9e9e9;font-family:'ZCOOL',sans-serif}
    figure{margin:0 0 18px;padding:16px;border-radius:8px;background:#fff}
    figure.y{background:#FFF6C4}
    .row{display:flex;gap:28px;align-items:flex-end}
    img{display:block}
    img.a{height:200px;width:auto}img.b{height:96px;width:auto}
    img.c{height:64px;width:auto}img.d{height:40px;width:auto}
    figcaption{font-size:19px;margin-top:10px}
  </style>
  <figure><div class="row">
    <img class="a" src="logo.svg"><img class="b" src="logo.svg">
    <img class="c" src="logo.svg"><img class="d" src="logo.svg">
  </div><figcaption>docs/images/logo.svg（白底）</figcaption></figure>
  <figure class="y"><div class="row">
    <img class="a" src="logo.svg"><img class="b" src="logo.svg">
    <img class="c" src="logo.svg"><img class="d" src="logo.svg">
  </div><figcaption>docs/images/logo.svg（书封黄底）</figcaption></figure>`;
  const out = path.join(root, 'dist/logo-check.png');
  await shoot(html, 900, 620, out, 'file:///' + dir + '/');
  console.log(`→ ${out}`);
}

const args = process.argv.slice(2);
if (args.includes('--explore')) await explore();
if (args.includes('--variants')) await variants();
if (args.includes('--check-logo')) await checkLogo();
if (args.includes('--logo') || args.includes('--all')) {
  const out = path.join(root, 'docs/images/logo.svg');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, logoSvg());
  console.log(`→ ${out}`);
}
if (args.includes('--card') || args.includes('--all')) {
  const out = path.join(root, 'dist/og.png');
  await shoot(cardHtml(), 1280, 640, out);
  /* 同一张图也存一份进仓库：dist/ 不进版本库，
     而这张图是要手工上传到 GitHub Settings → Social preview 的，
     仓库里不留一份就等于随时可能丢。 */
  const keep = path.join(root, 'docs/images/og.png');
  fs.mkdirSync(path.dirname(keep), { recursive: true });
  fs.copyFileSync(out, keep);
  const kb = Math.round(fs.statSync(out).size / 1024);
  console.log(`→ ${out}  1280×640  ${kb} KB${kb >= 1024 ? '  ⚠ 超过 1 MB' : ' ✓'}`);
  console.log(`→ ${keep}（同一张，留一份在仓库里）`);
}
