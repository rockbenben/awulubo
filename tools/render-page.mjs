import { validateReading, validateFraming } from '../src/js/model.ts';
/* 页面渲染：页面数据 → HTML。
 *
 * 模板用 Handlebars（src/templates/page.hbs），这里只做两件模板不擅长的事：
 *   1. 背景——分两层：**满版底色场**（保证铺满整页含出血）+ **笔触**；
 *      笔触的放大倍数按「焦点到页面最远角的距离」算，保证笔触冲出画外；
 *   2. 拟声词的逐字微转——每个字歪 ±3°、位移 ±1%，由字序确定性生成。
 * 这两件事算完就以现成的字符串交给模板，模板本身不含逻辑。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Handlebars from 'handlebars';
import { PAGE, MARGIN } from './layout-constants.mjs';
import { rigView } from './character-rig.mjs';
import { sceneView } from './scenes.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE = path.join(HERE, '..', 'src', 'templates', 'page.hbs');
const GEOMETRY = path.join(HERE, '..', 'src', 'components', 'effects.json');

/* 每种特效的几何（圆心与外半径）。
   由 tools/gen-effects.py 和图形一起生成——以前这里另抄了一份半径表，
   改了图形忘了改表，"自动放大"就按错的半径算，背景盖不满整页。 */
export function loadGeometry() {
  if (!fs.existsSync(GEOMETRY)) {
    throw new Error(`缺少 ${GEOMETRY}：先跑 python tools/gen-effects.py 生成特效与几何表`);
  }
  return JSON.parse(fs.readFileSync(GEOMETRY, 'utf8'));
}

const PROP_ID = {
  'basket-side': 'prop-basket-side',
  'basket-fallen': 'prop-basket-fallen',
  'child-cradle': 'prop-child-cradle',
  'child-reach-left': 'prop-child-reach-left',
  scarf: 'prop-scarf',
  'child-foot': 'prop-child-foot',
  'color-edge': 'prop-color-edge',
  'ball-squeezed': 'prop-ball-squeezed',
  'child-reach': 'prop-child-reach',
  headband: 'ch-wear-head-front',
  'wall-foot': 'prop-wall-foot',
  castle: 'scene-fantasy-castle',
  'blanket-lap-open': 'prop-blanket-lap-open',
  'blanket-lap-shared': 'prop-blanket-lap-shared',
  'foot-pushing': 'prop-foot-pushing',

  'blanket-lap': 'prop-blanket-lap',
  'blanket-fold': 'prop-blanket-fold',
  'blanket-hood': 'prop-blanket-hood',
  'blanket-drape': 'prop-blanket-drape',
  'blanket-shared': 'prop-blanket-shared',
  'apple-bitten': 'prop-apple-bitten',
  'medicine-adult': 'prop-medicine-adult',

  foot: 'ch-foot-planted',
  paper: 'prop-paper',
  'paper-red': 'prop-paper-red',
  'paper-blue': 'prop-paper-blue',
  'paper-yellow': 'prop-paper-yellow',
  palm: 'prop-palm',
  apple: 'prop-apple',
  fish: 'prop-fish',
  star: 'prop-star',
  moon: 'prop-moon',
  arrow: 'prop-arrow',
  blob: 'prop-blob-white',
  spiral: 'ch-spiral',
  bubble: 'prop-bubble',
  flower: 'prop-flower',
  /* 第二册《噜啵生病啦！》新增的三件道具 */
  blanket: 'prop-blanket',
  'blanket-corner': 'prop-blanket-corner',
  cup: 'prop-cup',
  pill: 'prop-pill',
  zzz: 'prop-zzz',
  /* 第三到第五册新增的三件道具 */
  ball: 'prop-ball',
  block: 'prop-block',
  basket: 'prop-basket',
};
export { PROP_ID };

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

function viewBackground(bg, geometry) {
  if (!bg || !bg.kind || bg.kind === 'none') return null;
  const geom = geometry[bg.kind];
  if (!geom) throw new Error(`未知的背景种类：${bg.kind}`);
  const radius = geom.r;
  const focus = bg.focus || [500, 500];
  const zoom = Math.max(bg.zoom || 1, requiredSpan(focus, bg.cover || 'all') / radius);
  /* 把特效**自己的圆心**挪到 focus 上。
     以前写死"这个符号的圆心在 (500,500)"——可每种特效的圆心并不都在那儿：
     effects.json 里 rays-corner 的圆心是 (-40,1040)（页外左下角，
     "从角落冲上来"就是这么生成的）。写死 (500,500) 的话，
     focus 挪的是符号的局部原点，不是它的圆心——
     p39 的放射线因此被整体推下去 400 单位，burst 从"脚底冲上来"变成了
     "从左下角斜着抹过"。用各特效自己的圆心，摆位才对得准。 */
  const tx = focus[0] - geom.cx * zoom;
  const ty = focus[1] - geom.cy * zoom;

  const vars = [];
  if (bg.colors && bg.colors[0]) vars.push(`--ray: var(${bg.colors[0]})`);
  if (bg.colors && bg.colors[1]) vars.push(`--ray2: var(${bg.colors[1]})`);
  else if (bg.colors && bg.colors[0]) vars.push(`--ray2: var(${bg.colors[0]})`);
  if (bg.gap) vars.push(`--ray-gap: var(${bg.gap})`);
  /* 色盘组件用的是 --disc（不是 --ray） */
  if (bg.kind === 'disc' && bg.colors && bg.colors[0]) vars.push(`--disc: var(${bg.colors[0]})`);

  const out = {
    symbol: geom.symbol,
    transform: `translate(${num(tx)},${num(ty)}) scale(${num(zoom)})`,
    vars: vars.join('; '),
    wash: null,
  };

  /* 满版底色场：色块不再是"浮在白纸上的孤岛"，而是**页面本身**。
     它的半径大于页面对角线的一半，所以"铺满整页（含出血）"是几何保证，
     不靠逐页手调放大倍数——这正是之前没做到的那件事。 */
  if (bg.wash) {
    const w = geometry.wash;
    const wzoom = Math.max(1, requiredSpan([500, 500], 'all') / w.r);
    const wtx = 500 - w.cx * wzoom;
    const wty = 500 - w.cy * wzoom;
    vars.push(`--wash: var(${bg.wash})`);
    out.vars = vars.join('; ');
    out.wash = {
      symbol: w.symbol,
      transform: `translate(${num(wtx)},${num(wty)}) scale(${num(wzoom)})`,
    };
  }
  return out;
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
    ...rigView(char),
    /* 角色的原始位置：飞、转圈、跺脚都会改 transform 属性，
       回头再进这一页要能原样放回去（见 interactions.js 的 reset）。 */
    baseTransform: `translate(${num(char.at[0])},${num(char.at[1])}) scale(${num(char.scale)})`,
  };
}

function viewProps(props, movingIds = []) {
  if (!props || !props.length) return [];
  return props.map((p) => ({
    symbol: PROP_ID[p.kind],
    objectId: p.id,
    behind: p.layer === 'behind',
    motion: movingIds.includes(p.id),
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

function viewHotspots(hotspot, scope, framing) {
  if (!hotspot) return [];
  const list = Array.isArray(hotspot) ? hotspot : [hotspot];
  return list.map((h) => ({
    tag: scope === 'screen' ? 'button' : 'div',
    static: scope !== 'screen',
    action: h.action,
    target: h.target || '',
    targetId: h.targetId,
    index: h.index || 0,
    left: pct(h.at[0] * (framing?.scale ?? 1) + (framing?.at[0] ?? 0)),
    top: pct(h.at[1] * (framing?.scale ?? 1) + (framing?.at[1] ?? 0)),
    width: pct(h.size * (framing?.scale ?? 1)),
    height: pct(h.size * (framing?.scale ?? 1)),
    label: h.label,
  }));
}

/* 数字：数一数那页用。一开始藏起来，数到一个才在那个苹果旁边冒出来。 */
function viewNumbers(numbers, framing) {
  if (!numbers || !numbers.length) return [];
  return numbers.map((n, i) => {
    const scale = framing?.scale ?? 1;
    const style = [`left:${pct(n.at[0] * scale + (framing?.at[0] ?? 0))}`, `top:${pct(n.at[1] * scale + (framing?.at[1] ?? 0))}`];
    if (n.width) style.push(`width:${pct(n.width * scale)}`);
    if (n.align) style.push(`text-align:${n.align}`);
    if (n.size) style.push(`font-size:calc(var(--u) * ${num(n.size * scale)})`);
    if (n.rotate) style.push(`transform:rotate(${num(n.rotate)}deg)`);
    return {
      cls: `num-${i + 1}${n.on ? ' is-on' : ''}`,
      style: style.join('; '),
      text: n.text,
    };
  });
}

/* 每次 HTML 渲染共用一份模板和几何表。下次开发预览会读取最新版本。 */
export function createPageRenderer() {
  const geometry = loadGeometry();
  const template = Handlebars.compile(fs.readFileSync(TEMPLATE, 'utf8'), { noEscape: true });
  return (spec, scope = 'screen') => template(pageView(spec, scope, geometry));
}

function pageView(spec, scope, geometry) {
  validateReading(spec);
  validateFraming(spec);
  const hotspots = viewHotspots(spec.hotspot, scope, spec.framing);
  const movingIds = spec.reading ? hotspots.filter(h => ['feed', 'feed3'].includes(h.action)).map(h => h.targetId) : [];
  /* 「拍一拍」：这一页能不能点角色就有反应。
     角色自己就是互动目标时（摸噜啵那张脸）不算——那一下该干别的事。 */
  const pat = Boolean(
    spec.char && spec.reading === undefined && spec.pat !== false && !hotspots.some((h) => h.target === 'char')
  );
  const scene = sceneView(spec.scene, spec.bg);
  // 场景是一幅跨书脊的画；左半幅须补偿页宽，不能把两张局部镜头分别缩成两个舞台。
  if (scene && spec.framing) {
    const [x, y] = spec.framing.at, scale = spec.framing.scale;
    scene.framing = `translate(${num(x + (spec.scene.side === 'left' ? 1000 * (1 - scale) : 0))},${num(y)}) scale(${num(scale)})`;
  }
  return {
    id: spec.id,
    framing: spec.framing ? `translate(${num(spec.framing.at[0])},${num(spec.framing.at[1])}) scale(${num(spec.framing.scale)})` : null,
    reading: spec.reading || '',
    responseTo: spec.responseTo || '',
    book: spec.book || '',
    exit: spec.exit || '',
    template: spec.template || 't-dialog',
    sound: spec.sound || '',
    trap: Boolean(spec.trap),
    pat,
    aria: spec.aria || '',
    bg: viewBackground(spec.bg, geometry),
    scene,
    char: viewCharacter(spec.char),
    backProps: viewProps(spec.props, movingIds).filter(p => p.behind),
    props: viewProps(spec.props, movingIds).filter(p => !p.behind),
    texts: viewTexts(spec.text, scope),
    numbers: viewNumbers(spec.numbers, spec.framing),
    hotspots,
  };
}
