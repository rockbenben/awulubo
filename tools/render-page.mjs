/* 页面渲染：页面数据 → HTML。
 *
 * 模板用 Handlebars（src/templates/page.hbs），这里只做两件模板不擅长的事：
 *   1. 背景的放大倍数——按「焦点到页面最远角的距离」算，保证笔触布满全局并溢出出血；
 *   2. 拟声词的逐字微转——每个字歪 ±3°、位移 ±1%，由字序确定性生成。
 * 这两件事算完就以现成的字符串交给模板，模板本身不含逻辑。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Handlebars from 'handlebars';
import { PAGE, MARGIN } from './layout-constants.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE = path.join(HERE, '..', 'src', 'templates', 'page.hbs');

/* 每种特效在 1000 × 1000 坐标系里能覆盖到的半径 */
export const EFFECT_RADIUS = {
  rays: 880,
  'rays-tight': 600,
  'rays-corner': 1500,
  bands: 1200,
  swirl: 600,
  disc: 430,
  confetti: 1000,
  sprinkle: 1000,
  rainbow: 1200,
  stars: 1000,
};

const EFFECT_ID = {
  rays: 'fx-rays',
  'rays-tight': 'fx-rays-tight',
  'rays-corner': 'fx-rays-corner',
  bands: 'fx-bands',
  swirl: 'fx-swirl',
  disc: 'fx-disc',
  confetti: 'fx-confetti',
  sprinkle: 'fx-sprinkle',
  rainbow: 'fx-rainbow',
  stars: 'fx-stars',
};
export { EFFECT_ID };

const PROP_ID = {
  apple: 'prop-apple',
  fish: 'prop-fish',
  star: 'prop-star',
  moon: 'prop-moon',
  arrow: 'prop-arrow',
  blob: 'prop-blob-white',
  spiral: 'ch-spiral',
  bubble: 'prop-bubble',
  flower: 'prop-flower',
};
export { PROP_ID };

let compiled = null;
function template() {
  if (!compiled) {
    compiled = Handlebars.compile(fs.readFileSync(TEMPLATE, 'utf8'), { noEscape: true });
  }
  return compiled;
}

function num(v) {
  return Math.round(v * 100) / 100;
}

function pct(v) {
  return num(v / 10) + '%';
}

/* 背景要盖到哪些边——决定放大倍数怎么算 */
function requiredSpan(focus, cover) {
  const cx = focus ? focus[0] : 500;
  const cy = focus ? focus[1] : 500;
  if (cover === 'x') return Math.max(cx, 1000 - cx);
  if (cover === 'y') return Math.max(cy, 1000 - cy);
  if (cover === 'none') return 0;
  const corners = [
    [0, 0],
    [1000, 0],
    [0, 1000],
    [1000, 1000],
  ];
  return Math.max(...corners.map(([x, y]) => Math.hypot(x - cx, y - cy)));
}

/* 拟声词逐字微转：±3°、±1% 位移，由字序确定性生成 */
function jitter(text) {
  let i = 0;
  return [...text]
    .map((ch) => {
      if (ch === '<' || ch === '>' || ch === ' ' || ch === '\n') return ch;
      const seed = ((i * 2654435761) % 10007) / 10007;
      i += 1;
      const r = ((seed - 0.5) * 6).toFixed(2);
      const dy = ((seed * 7.3) % 1 - 0.5) * 2;
      return `<span style="--r:${r}deg;--dy:${dy.toFixed(2)}%">${ch}</span>`;
    })
    .join('');
}

function viewBackground(bg) {
  if (!bg || !bg.kind || bg.kind === 'none') return null;
  const radius = EFFECT_RADIUS[bg.kind] || 1000;
  const focus = bg.focus || [500, 500];
  const zoom = Math.max(bg.zoom || 1, requiredSpan(focus, bg.cover || 'all') / radius);
  const tx = focus[0] - 500 * zoom;
  const ty = focus[1] - 500 * zoom;

  const vars = [];
  if (bg.colors && bg.colors[0]) vars.push(`--ray: var(${bg.colors[0]})`);
  if (bg.colors && bg.colors[1]) vars.push(`--ray2: var(${bg.colors[1]})`);
  else if (bg.colors && bg.colors[0]) vars.push(`--ray2: var(${bg.colors[0]})`);
  if (bg.gap) vars.push(`--ray-gap: var(${bg.gap})`);
  if (bg.kind === 'disc' && bg.colors && bg.colors[0]) vars.push(`--disc: var(${bg.colors[0]})`);

  return {
    symbol: EFFECT_ID[bg.kind],
    transform: `translate(${num(tx)},${num(ty)}) scale(${num(zoom)})`,
    vars: vars.join('; '),
  };
}

function viewCharacter(char) {
  if (!char) return null;
  return {
    pose: char.pose,
    state: char.state || '',
    id: char.id || '',
    at0: char.at[0],
    at1: char.at[1],
    scale: char.scale,
    spiral: Boolean(char.spiral),
  };
}

function viewProps(props) {
  if (!props || !props.length) return [];
  return props.map((p) => ({
    symbol: PROP_ID[p.kind],
    class: p.class || '',
    style: p.style || '',
    at0: p.at[0],
    at1: p.at[1],
    rotate: p.rotate || 0,
    scale: p.scale,
  }));
}

/* 一个字大约占多少 em：站酷快乐体实测 1.1–1.2em（中文标点也占满） */
const EM_PER_GLYPH = 1.18;

/* 文字太宽就自动缩字号——版式不该靠手调坐标撑住。
   注意单位：size 是「u」（页宽的百分之几），at/width 是千分比，1u = 10 千分比。
   下限是 2u：缩排只会变小，绝不能因为下限把字"缩"大。 */
function fitSize(t, glyphs) {
  const size = t.size || 16;
  if (!glyphs) return size;
  const width = glyphs * EM_PER_GLYPH * size * 10; /* 千分比 */
  const avail =
    t.align === 'center'
      ? Math.min(t.width || PAGE - 2 * MARGIN, PAGE - 2 * MARGIN)
      : PAGE - MARGIN - t.at[0];
  if (width <= avail) return size;
  return Math.max(2, Math.round((avail / (glyphs * EM_PER_GLYPH * 10)) * 10) / 10);
}

/* 缩排按"最长的一行"算，不是整段——多行文本（数组或 <br>）要逐行看 */
function countGlyphs(text) {
  const lines = Array.isArray(text) ? text : String(text).split('<br>');
  return lines.reduce(
    (max, line) => Math.max(max, [...line].filter((c) => c.trim()).length),
    0
  );
}

function viewTexts(text, scope) {
  if (!text) return [];
  const tags = { narration: 'p', sound: 'h1', prompt: 'p', adult: 'p' };
  const out = [];
  for (const [key, tag] of Object.entries(tags)) {
    const t = text[key];
    if (!t || !t.text) continue;
    /* 印刷版可以用自己的文案：纸上点不动，"点我，开始"这类提示要改写。
       print 写成空字符串 = 这一句在印刷版里不出现。 */
    const raw = scope === 'print' && t.print !== undefined ? t.print : t.text;
    if (!raw) continue;
    const size = fitSize(t, countGlyphs(raw));
    const style = [`left:${pct(t.at[0])}`, `top:${pct(t.at[1])}`];
    if (t.width) style.push(`width:${pct(t.width)}`);
    if (t.align) style.push(`text-align:${t.align}`);
    if (size) style.push(`font-size:calc(var(--u) * ${num(size)})`);
    if (t.rotate) style.push(`transform:rotate(${num(t.rotate)}deg)`);
    if (t.bottom !== undefined) style.push(`bottom:${pct(t.bottom)}`);
    if (t.color) style.push(`color:var(${t.color})`);
    const body = Array.isArray(raw) ? raw.join('<br>') : raw;
    out.push({
      key,
      tag,
      style: style.join('; '),
      body: key === 'sound' ? body.split('<br>').map(jitter).join('<br>') : body,
    });
  }
  return out;
}

function viewHotspots(hotspot) {
  if (!hotspot) return [];
  const list = Array.isArray(hotspot) ? hotspot : [hotspot];
  return list.map((h) => ({
    action: h.action,
    target: h.target || '',
    left: pct(h.at[0]),
    top: pct(h.at[1]),
    width: pct(h.size),
    height: pct(h.size),
    label: h.label,
  }));
}

/* 整页。scope = 'screen' | 'print'：印刷版可以用自己的文案 */
export function renderPage(spec, scope = 'screen') {
  return template()({
    id: spec.id,
    template: spec.template || 't-dialog',
    sound: spec.sound || '',
    trap: Boolean(spec.trap),
    aria: spec.aria || '',
    bg: viewBackground(spec.bg),
    char: viewCharacter(spec.char),
    props: viewProps(spec.props),
    texts: viewTexts(spec.text, scope),
    hotspots: viewHotspots(spec.hotspot),
  });
}
