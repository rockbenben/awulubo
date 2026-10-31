/* 内容审查：把"人读数据"发现不了的错挡在构建期。
   用法：node tools/audit-content.mjs

   审查六件事（每条都要有牙齿：写完先故意弄坏一处，确认它报错，再改回去）：

   1. 页号要连续（p01…p44）。跳号说明有一页被删了，可别的地方还指着它。
   2. trap 页必须有热区。trap = 点空白不翻页；没有热区的话，
      孩子在这一页只能"摇一下头"，书走不下去。
   3. 热区的 target 要在运行时解析得出来。fly() 找的是 `.prop-<target>`：
      页面数据里道具改了名、忘了写 class，点下去"没有反应"，
      而闸门全绿（声音照响、页照翻，就是东西没飞进嘴里）。
   4. 多步互动页要凑得齐：
      find 要 3 个不同的目标（代码要求 found.length >= 3 才翻页）；
      feed3 要 apple/fish/star 三样（代码里顺序写死）；
      count 的 index 要 1…N 连续且不重复，页面也要有 N 个 .count-item
      和 N 个数字（点第三个苹果时数字冒不出来 = 数了个寂寞）。
   5. 互动页上，文字里点名的物件要有热区罩住（"点一下红苹果"却没有苹果热区）。
   6. 同一页的热区不能互相压住：上面那个会吃掉下面那个的点击。 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadSpecs } from './load-specs.mjs';
import { PROP_ID } from './render-page.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const problems = [];
const notes = [];
function fail(msg) {
  problems.push(msg);
}

/* 热区在 1000×1000 的版面里占的方框（at 是左上角，size 是边长） */
function boxOf(h) {
  return { x: h.at[0], y: h.at[1], w: h.size, h: h.size };
}

function overlapRatio(a, b) {
  const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
  const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
  if (ox <= 0 || oy <= 0) return 0;
  return (ox * oy) / Math.min(a.w * a.h, b.w * b.h);
}

function hotspotsOf(page) {
  if (!page.hotspot) return [];
  return Array.isArray(page.hotspot) ? page.hotspot : [page.hotspot];
}

/* 热区大小下限：25% 页宽（页宽 1000 单位 → 250 单位）。
   规格 §6.6：「点按目标 ≥ 25% 页宽，屏幕 ≥ 120 × 120 CSS px」。 */
const MIN_TAP_UNITS = 250;

/* 不是道具的目标：角色的身体部位、角色本身、整片背景、拟声词 */
const NON_PROP_TARGETS = new Set(['char', 'belly', 'confetti', 'sound']);

/* 文字里点名的物件 → 道具 kind */
const NAME_TO_KIND = [
  ['红苹果', 'apple'],
  ['苹果', 'apple'],
  ['蓝小鱼', 'fish'],
  ['小鱼', 'fish'],
  ['黄星星', 'star'],
  ['星星', 'star'],
  ['月亮', 'moon'],
  ['圆圈', 'arrow'],
];

async function main() {
  const pages = await loadSpecs();

  /* ── 1. 页号序列 ── */
  const numbers = pages.map((p) => {
    const m = /^p(\d+)$/.exec(p.id);
    return m ? Number(m[1]) : null;
  });
  numbers.forEach((n, i) => {
    if (n === null) fail(`[${pages[i].id}] 页号不是 pNN 形式`);
  });
  const sorted = numbers.filter((n) => n !== null).sort((a, b) => a - b);
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] !== sorted[i - 1] + 1) {
      fail(`页号不连续：${sorted[i - 1]} 之后是 ${sorted[i]}（中间少了一页）`);
    }
  }
  notes.push(`页号 ${sorted[0]}–${sorted[sorted.length - 1]}，共 ${sorted.length} 页`);

  for (const page of pages) {
    const hs = hotspotsOf(page);
    const label = `[${page.id}]`;

    /* ── 2. trap 页必须有热区 ── */
    if (page.trap && hs.length === 0) {
      fail(`${label} 标了 trap（点空白不翻页），但本页没有任何热区——孩子卡在这一页`);
    }

    /* ── 3. target 要解析得出来 ── */
    for (const h of hs) {
      if (!h.target) continue;
      if (NON_PROP_TARGETS.has(h.target)) continue;
      const kind = Object.keys(PROP_ID).find((k) => PROP_ID[k] === `prop-${h.target}`);
      if (!kind) {
        fail(`${label} 热区 target "${h.target}" 既不是道具也不是已知目标（${[...NON_PROP_TARGETS].join('/')}）`);
        continue;
      }
      const hasProp = (page.props || []).some(
        (p) => p.kind === kind && String(p.class || '').split(/\s+/).includes(`prop-${h.target}`)
      );
      if (!hasProp) {
        const kindExists = (page.props || []).some((p) => p.kind === kind);
        fail(
          `${label} 热区 target "${h.target}" 在本页找不到 class 为 prop-${h.target} 的道具` +
            (kindExists
              ? '（道具在，但 class 没写——fly() 会静默不反应）'
              : '（本页根本没有这个道具）')
        );
      }
    }

    /* ── 4. 多步互动页要凑得齐 ── */
    const targets = hs.map((h) => h.target);

    const findHs = hs.filter((h) => h.action === 'find');
    if (findHs.length) {
      const distinct = new Set(findHs.map((h) => h.target));
      if (distinct.size !== findHs.length) {
        fail(`${label} find 热区里有重复的 target（${[...targets].join(', ')}）——同一个只能数一次，这一页永远凑不齐`);
      }
      if (distinct.size < 3) {
        fail(`${label} find 只有 ${distinct.size} 个目标，但代码要找到 3 个才翻页——这一页过不去`);
      }
    }

    const feed3Hs = hs.filter((h) => h.action === 'feed3');
    if (feed3Hs.length) {
      for (const want of ['apple', 'fish', 'star']) {
        if (!feed3Hs.some((h) => h.target === want)) {
          fail(`${label} feed3 少了「${want}」——代码里的顺序写死是 apple → fish → star，缺一样就永远过不去`);
        }
      }
    }

    const countHs = hs.filter((h) => h.action === 'count');
    if (countHs.length) {
      const idx = countHs.map((h) => h.index).sort((a, b) => a - b);
      idx.forEach((v, i) => {
        if (v !== i + 1) {
          fail(`${label} count 的 index 必须是 1 开始的连续数，实际是 ${JSON.stringify(idx)}`);
        }
      });
      const max = Math.max(...idx);
      const items = (page.props || []).filter((p) => String(p.class || '').split(/\s+/).includes('count-item'));
      if (items.length < max) {
        fail(`${label} count 要数到 ${max}，但本页只有 ${items.length} 个 .count-item 道具`);
      }
      const numbers = page.numbers || [];
      if (numbers.length < max) {
        fail(`${label} count 要数到 ${max}，但本页只有 ${numbers.length} 个数字（点第三个时数字冒不出来）`);
      }
    }

    /* ── 5. 点按目标不能小于 25% 页宽 ──
       规格 §6.6：点按目标 ≥ 25% 页宽（页宽 1000 单位，即 ≥ 250 单位）。
       小了孩子就按不准——3–5 岁的手指头不精细，点不中就等于没有这个热区。
       check-hotspots.mjs 量的是**实际** CSS 像素（320px 小屏上 44 CSS px 的下限），
       这一条量的是页面单位：同一件事的两个尺度，各管一头。 */
    for (const h of hs) {
      if (typeof h.size === 'number' && h.size < MIN_TAP_UNITS) {
        fail(
          `${label} 热区「${h.label}」只有 ${h.size} 个单位宽` +
            `（小于 25% 页宽 = ${MIN_TAP_UNITS}）——孩子按不准`
        );
      }
    }

    /* ── 6. 互动页上，文字点名的物件要有热区 ── */
    if (hs.length) {
      const said = new Set();
      const texts = [page.aria || ''];
      for (const t of Object.values(page.text || {})) {
        if (t && t.text) texts.push(Array.isArray(t.text) ? t.text.join('') : String(t.text));
      }
      for (const s of texts) {
        for (const [name, kind] of NAME_TO_KIND) {
          if (s.includes(name)) said.add(kind);
        }
      }
      for (const kind of said) {
        if (!targets.includes(kind)) {
          fail(`${label} 文字里提到了「${kind}」，本页却没有指向它的热区（现有目标：${targets.join(', ') || '无'}）`);
        }
      }
    }

    /* ── 6. 热区不能互相压住 ── */
    for (let i = 0; i < hs.length; i++) {
      for (let j = i + 1; j < hs.length; j++) {
        /* 2% 就报。两个热区压在一起时，重叠的那一块归上面那个：
           孩子点"蓝小鱼"却触发了"红苹果"，画面上完全看不出为什么。
           阈值不能太松——4% 的重叠已经足够让两个道具互相吃点击了。 */
        const ratio = overlapRatio(boxOf(hs[i]), boxOf(hs[j]));
        if (ratio > 0.02) {
          fail(
            `${label} 热区「${hs[i].label}」与「${hs[j].label}」重叠 ${(ratio * 100).toFixed(0)}%` +
              '——上面那个会吃掉下面那个的点击'
          );
        }
      }
    }
  }

  console.log(`审查 ${pages.length} 个页面……`);
  notes.forEach((n) => console.log(`  · ${n}`));
  if (problems.length) {
    console.error(`\n✗ ${problems.length} 项不合格：`);
    problems.forEach((p) => console.error(`  - ${p}`));
    process.exit(1);
  }
  console.log('✓ 内容审查通过');
}

main();
