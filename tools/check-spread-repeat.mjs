/* 跨页重复闸门：抓「同一件事被拆到相邻两页各说一遍」。
   用户口径（2026-11-04）：展开的 2 页应该有相关性，尽量不分割
   ——一句话不该被拆到两页上，也不该在相邻两页把同一句说两遍。

   判据（对相邻两页的 旁白/提示/拟声词 两两比）：
     1. 去标点后，一方是另一方的子串，且长度 ≥ 3 字  → 整句重复
     2. 两句去标点后字符集合 Jaccard ≥ 0.62，长度差 ≤ 3 → 换了措辞的重复
     例外：**对仗不算重复**。「它看见你啦！」×「我看见你啦！」是两个孩子
     各说一遍的呼应；「你抓住球。」×「它也抓住球。」是刻意的对照。
     判法：剥掉主语与说话引导词后，两句的核心内容相同 → 对仗，放行。

   用法：
     node tools/check-spread-repeat.mjs            # 报出所有重复
     node tools/check-spread-repeat.mjs --quiet    # 只报条数
   */
import { loadBooks } from './load-specs.mjs';

const QUIET = process.argv.includes('--quiet');

/* 去标点与空白，只留正文用字 */
const bare = (s) =>
  String(s || '')
    .replace(/<br>/g, '')
    .replace(/[\s，。！？、…—～「」《》（）:：;；·~"'?!,.]/g, '');

const setOf = (s) => new Set(s.split(''));

function jaccard(a, b) {
  const A = setOf(a);
  const B = setOf(b);
  let inter = 0;
  for (const c of A) if (B.has(c)) inter++;
  return inter / (A.size + B.size - inter);
}

/* 最长公共子串（够用就行，短字符串） */
function lcs(a, b) {
  let best = '';
  for (let i = 0; i < a.length; i++) {
    let cur = '';
    for (let j = i; j < a.length; j++) {
      if (b.includes(a.slice(i, j + 1))) {
        cur = a.slice(i, j + 1);
        if (cur.length > best.length) best = cur;
      } else break;
    }
  }
  return best;
}

const SLOTS = [
  ['旁白', 'narration'],
  ['提示', 'prompt'],
  ['拟声词', 'sound'],
];

/* 主语与说话引导词：剥掉之后剩下的才是「这句话说了什么」 */
const LEAD = /^(它也|你也|它说|你说|它|你|我|他|她|我们|你们|大家|球|塔|水|苹果|小鱼|星星|那|这|也|还)/;

/* 剥掉主语与引导词后的核心内容，以及被剥掉的主语 */
function core(s) {
  let t = s;
  let subj = '';
  for (let guard = 0; guard < 8; guard++) {
    const m = t.match(LEAD);
    if (!m || !m[0]) break;
    subj += m[0];
    t = t.slice(m[0].length);
  }
  return { core: t, subj };
}

/* 两句是不是对仗/呼应。
   ⚠️ **主语必须不同**才算对仗：「它看见你啦！」×「我看见你啦！」是两个孩子
   各说一句（对仗）；「它抬起头笑了。」×「它抬起头笑了。」是同一句说了两遍
   （重复）。主语一样却核心相同，那不是对仗，是真重复。 */
function isParallel(a, b) {
  const ca = core(a);
  const cb = core(b);
  if (!ca.core || !cb.core) return false;
  if (ca.core !== cb.core) return false;
  /* 主语不同才放行；主语都剥光了就看句子的说法本身 */
  return ca.subj !== cb.subj;
}

function texts(p, title = '') {
  const out = [];
  for (const [label, key] of SLOTS) {
    const t = p.text && p.text[key];
    if (!t || !t.text) continue;
    const raw = Array.isArray(t.text) ? t.text.join(' / ') : String(t.text);
    if (p.template === 't-title' && key === 'sound' && title && bare(raw) === bare(title)) continue;
    // 版权信息中的书名不是故事句；同页其余句子仍按原规则检查。
    if (key === 'narration' && p.text.adult && /^《[^》]+》$/.test(raw)) continue;
    out.push({ label, raw: raw.replace(/<br>/g, ' '), bare: bare(raw) });
  }
  return out;
}

const books = await loadBooks();
let n = 0;

/* 先确认自己真读到了东西：槽名一改（旁白/提示/拟声词），
   两页都读成空串，n 永远是 0——"0 处重复"就成了假绿。
   跟 check-contrast.mjs 同一个形状：没量到就是没量到，不能说达标。 */
const slots = books.reduce(
  (sum, b) => sum + b.pages.reduce((s, p) => s + texts(p, b.meta.title).length, 0),
  0
);
if (slots === 0) {
  console.error(
    '✗ 一处文字都没读到（页面数据的 text 槽名改了？SLOTS 里是 ' +
      SLOTS.map((s) => s[1]).join('/') +
      '）——读到空不等于没有重复'
  );
  process.exit(1);
}

for (const b of books) {
  const pages = b.pages;
  for (let i = 0; i < pages.length - 1; i++) {
    const A = pages[i];
    const B = pages[i + 1];
    const ta = texts(A, b.meta.title);
    const tb = texts(B, b.meta.title);
    for (const x of ta) {
      for (const y of tb) {
        if (!x.bare || !y.bare) continue;
        const short = x.bare.length <= y.bare.length ? x.bare : y.bare;
        const long = short === x.bare ? y.bare : x.bare;
        const hit = long.includes(short) && short.length >= 3;
        const sub = lcs(x.bare, y.bare);
        const ratio = Math.abs(x.bare.length - y.bare.length);
        const fuzzy =
          !hit &&
          ratio <= 3 &&
          x.bare.length >= 3 &&
          y.bare.length >= 3 &&
          jaccard(x.bare, y.bare) >= 0.62;
        /* 对仗不算重复：两个孩子各说一句，剥掉主语后核心相同 */
        const parallel = isParallel(x.bare, y.bare);
        if ((hit || fuzzy) && !parallel) {
          n++;
          if (!QUIET) {
            const why = hit
              ? `整句包含（公共串「${sub}」）`
              : `换词重复（公共串「${sub}」）`;
            console.log(
              `${b.id}/${A.id}→${B.id}  ${x.label}「${x.raw}」 × ${y.label}「${y.raw}」  ${why}`
            );
          }
        }
      }
    }
  }
}

console.log(`\n读了 ${slots} 条文字，相邻两页重复 ${n} 处`);
if (!QUIET && n === 0) console.log('（没有重复）');
process.exitCode = n === 0 ? 0 : 1;
