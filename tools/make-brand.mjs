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
function critter(state, { spiral = true, bellyColors = false } = {}) {
  const vars = {
    '--body': state === 'paper' ? TOKENS['--paper'] : TOKENS[`--${state}`],
    '--spiral': TOKENS['--ink'],
    '--glint': TOKENS['--paper'],
    '--belly-colors': bellyColors ? 'inline' : 'none',
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
const EFFECT_SYMBOL = { rays: 'fx-rays', bands: 'fx-bands', 'rays-tight': 'fx-rays-tight', confetti: 'fx-confetti', stars: 'fx-stars' };
function effectLayer(kind, centerX, centerY, zoom, colors = {}) {
  const inner = flatten(EFFECT_SYMBOL[kind], {}, {
    ...TOKENS,
    '--ray': colors.ray ?? TOKENS['--yellow'],
    '--ray2': colors.ray2 ?? TOKENS['--yellow-deep'],
    '--ray-gap': colors.gap ?? TOKENS['--paper'],
    '--star': colors.star ?? TOKENS['--yellow'],
  });
  const tx = centerX - 500 * zoom;
  const ty = centerY - 500 * zoom;
  return `<g transform="translate(${tx},${ty}) scale(${zoom})">${inner}</g>`;
}

/* ============================================================
   logo：噜啵头顶金星星
   —— 金星星贴合头顶曲线，外框紧凑收拢，
      缩到 40 px（GitHub 仓库头像大小）与 favicon 均清晰可辨。
   ============================================================ */
function logoSvg() {
  const star = heldProp('prop-star', 0.35, 508, 145, -8);
  const body = critter('paper');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="185 -25 630 870" width="630" height="870">
<!-- 噜啵与金星星。《啊呜噜啵！》品牌标志。
     路径已摊平（不含 <use>、不含 var()）：改角色要重新跑 tools/make-brand.mjs。 -->
${star}
${body}
</svg>`;
}

/* ============================================================
   社交预览图 1280×640
   —— 绘本剧场风：全五册核心提炼，彩肚噜啵与漂浮互动道具（苹果/小鱼/金星/彩纸）。
      左侧层级分明：册系药丸徽章、快乐体大标题、五册故事副标与四色特性胶囊。
   ============================================================ */
function cardHtml() {
  const W = 1280;
  const H = 640;

  // Background ray effect
  const burst = `<svg class="bg-fx" viewBox="0 0 ${W} ${H}">
    ${effectLayer('bands', 960, 320, 0.72, {
      ray: '#FFE94D',
      ray2: '#FFD700',
      gap: '#FFF8E7',
    })}
  </svg>`;

  // Hero Lubu: cx = 960, scale = 0.50, feet bottom at 585
  const heroLubuY = H - 840 * 0.50 - 55;
  const heroLubuX = 960 - 500 * 0.50;
  const heroLubu = `<g transform="translate(${heroLubuX}, ${heroLubuY}) scale(0.50)">
    ${critter('paper', { spiral: false, bellyColors: true })}
  </g>`;

  // Floating props in arc around Lubu with breathing room
  const starProp = heldProp('prop-star', 0.23, 960, 115, 4);
  const appleProp = heldProp('prop-apple', 0.24, 805, 205, -14);
  const fishProp = heldProp('prop-fish', 0.38, 1115, 265, -14);

  // Confetti scattered in air
  const confettiLayer = `<g opacity="0.80">
    ${effectLayer('confetti', 960, 310, 0.65)}
  </g>`;

  const zcoolUrl = '/node_modules/@fontsource/zcool-kuaile/files/zcool-kuaile-chinese-simplified-400-normal.woff2';
  const wenkaiUrl = '/node_modules/@fontsource/lxgw-wenkai/files/lxgw-wenkai-latin-500-normal.woff2';

  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<style>
@font-face {
  font-family: 'ZCOOL';
  src: url('${zcoolUrl}') format('woff2');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'WenKai';
  src: url('${wenkaiUrl}') format('woff2');
  font-weight: normal;
  font-style: normal;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  width: ${W}px;
  height: ${H}px;
  overflow: hidden;
  background: #FFF8E7;
  font-family: 'ZCOOL', sans-serif;
  color: #1F1F1F;
  -webkit-font-smoothing: antialiased;
}
.stage {
  position: relative;
  width: ${W}px;
  height: ${H}px;
  overflow: hidden;
  background: radial-gradient(circle at 75% 50%, #FFFDF5 0%, #FFF8E7 65%, #FFF2D0 100%);
}
.bg-fx {
  position: absolute;
  left: 0;
  top: 0;
  width: ${W}px;
  height: ${H}px;
  opacity: 0.28;
}
.cast-svg {
  position: absolute;
  left: 0;
  top: 0;
  width: ${W}px;
  height: ${H}px;
}
.content {
  position: absolute;
  left: 76px;
  top: 72px;
  width: 630px;
  z-index: 10;
  display: flex;
  flex-direction: column;
}
.pill {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  padding: 6px 18px;
  background: #FFFDF8;
  border: 2.5px solid #1F1F1F;
  border-radius: 999px;
  font-family: 'ZCOOL', sans-serif;
  font-size: 22px;
  color: #1F1F1F;
  letter-spacing: 1px;
  box-shadow: 2px 2px 0px rgba(31,31,31,0.12);
}
.title {
  margin-top: 20px;
  font-size: 114px;
  line-height: 1.02;
  letter-spacing: 3px;
  font-weight: 400;
  color: #1F1F1F;
  text-shadow: 3px 3px 0px rgba(255,233,77,0.6);
}
.subtitle {
  margin-top: 22px;
  font-family: 'WenKai', system-ui, -apple-system, sans-serif;
  font-size: 32px;
  line-height: 1.45;
  color: #4A3528;
  font-weight: 500;
}
.features {
  margin-top: 36px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 14px;
}
.feature-chip {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  background: #FFFDF8;
  border: 2px solid #1F1F1F;
  border-radius: 12px;
  font-family: 'WenKai', system-ui, -apple-system, sans-serif;
  font-size: 20px;
  font-weight: bold;
  color: #1F1F1F;
  box-shadow: 2px 2px 0px rgba(31,31,31,0.08);
}
.feature-chip .dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
}
.dot-red { background: #F43934; }
.dot-blue { background: #3B82F6; }
.dot-yellow { background: #F59E0B; }
.dot-green { background: #10B981; }
.ground-line {
  position: absolute;
  right: 60px;
  bottom: 42px;
  width: 520px;
  height: 8px;
  background: #E8D9B8;
  border-radius: 999px;
  opacity: 0.6;
}
</style>
</head>
<body>
<div class="stage">
  ${burst}
  <div class="ground-line"></div>
  <svg class="cast-svg" viewBox="0 0 ${W} ${H}">
    ${confettiLayer}
    ${starProp}
    ${appleProp}
    ${fishProp}
    ${heroLubu}
  </svg>
  <div class="content">
    <div class="pill">3–5 岁中文互动绘本 · 全五册</div>
    <h1 class="title">啊呜噜啵！</h1>
    <div class="subtitle">喂它变色 · 陪它生病 · 一起呼气 · 我自己来</div>
    <div class="features">
      <div class="feature-chip"><span class="dot dot-red"></span>宽屏双页翻阅</div>
      <div class="feature-chip"><span class="dot dot-blue"></span>触控手势互动</div>
      <div class="feature-chip"><span class="dot dot-yellow"></span>骑马钉双面打印</div>
      <div class="feature-chip"><span class="dot dot-green"></span>单文件离线不上传</div>
    </div>
  </div>
</div>
</body>
</html>`;
}

/* 候选板：几张摆在一起挑。背景处理（有没有光芒、光芒多大）最难凭想象定，
   摆出来比空想靠谱。 */
async function variants() {
  const list = [
    ['最终版', {}],
  ];
  const cells = list.map(([label]) => `
    <figure>
      <div class="cell"><div class="scaler">${cardHtml()}</div></div>
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

const defaultBase = 'file:///' + root.replace(/\\/g, '/') + '/';

/* ---- 渲染 ---- */
async function shoot(html, width, height, out, base = defaultBase) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width, height } });
  /* base：先落到那个目录上，再写内容——
     file:// 下相对路径的资源（logo.svg、字体）从 about:blank 引用会被浏览器拦掉。 */
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
