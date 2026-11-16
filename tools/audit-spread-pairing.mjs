/* 跨页成对性体检：把每跨的两页并排摊开，看「动作」与「结果」是不是挨在一起。
   用户的口径（2026-11-04）：展开的 2 页应该有相关性，尽量不分割
   ——孩子做一个动作，翻页看见结果；动作和结果被拆到不相邻的页上，就是被分割了。

   用法：
     node tools/audit-spread-pairing.mjs            # 打印全部册的故事板
     node tools/audit-spread-pairing.mjs awulubo    # 只看一册
     node tools/audit-spread-pairing.mjs --flag     # 只打印可疑的跨
   */
import { loadBooks } from './load-specs.mjs';

const argv = process.argv.slice(2);
const flagOnly = argv.includes('--flag');
const only = argv.filter((a) => !a.startsWith('--'));

const books = await loadBooks();

/* 一段文字里的标点会读起来像散文，这里压成一行 */
const flat = (v) => {
  if (!v) return '';
  const t = Array.isArray(v.text) ? v.text.join(' / ') : String(v.text || '');
  return t.replace(/<br>/g, ' ').replace(/\s+/g, ' ').trim();
};

/* 页面上的三处文字：旁白 / 提示 / 拟声词 */
function words(p) {
  const t = p.text || {};
  return {
    nar: flat(t.narration),
    prm: flat(t.prompt),
    snd: flat(t.sound),
  };
}

/* 互动：热区写在 page.hotspot 上 */
function acts(p) {
  const hs = p.hotspot ? [p.hotspot] : [];
  return hs
    .filter((h) => h && h.action)
    .map((h) => `${h.action}${h.target ? ':' + h.target : ''}`);
}

/* 「结果词」：右页的旁白里出现了这些，说明这一页在交代上一动作的结果 */
const RESULT_WORDS = [
  '变', '啦', '起', '出', '满', '喝', '吃', '拿', '走', '掉', '上', '下', '住',
  '光', '甜', '苦', '疼', '好', '没', '又', '在', '到', '着', '了',
];

/* 「动作词」：这一页在叫孩子做事 */
const ACTION_WORDS = ['点', '摸', '喂', '拍', '数', '找', '喊', '揉', '推', '拉', '一起', '再'];

function hasResult(p) {
  const w = words(p);
  const all = w.nar + w.snd;
  return RESULT_WORDS.some((k) => all.includes(k));
}

function isAction(p) {
  const w = words(p);
  const all = w.nar + w.prm;
  return ACTION_WORDS.some((k) => all.includes(k)) || acts(p).length > 0;
}

let flagged = 0;

for (const b of books) {
  if (only.length && !only.includes(b.id)) continue;
  const spreads = [];
  const cur = [];
  for (const p of b.pages) {
    cur.push(p);
    if (cur.length === 2) {
      spreads.push(cur.slice());
      cur.length = 0;
    }
  }
  if (cur.length) spreads.push(cur);

  console.log(`\n${'='.repeat(72)}\n册：${b.id} — ${b.meta.title || ''}\n${'='.repeat(72)}`);

  for (const sp of spreads) {
    const [L, R] = sp;
    const lw = words(L);
    const rw = words(R);
    const la = acts(L);
    const ra = acts(R);

    const line = (side, p, w, a) => {
      const bits = [];
      if (w.nar) bits.push(`旁:${w.nar}`);
      if (w.prm) bits.push(`提:${w.prm}`);
      if (w.snd) bits.push(`声:${w.snd}`);
      if (a.length) bits.push(`动:${a.join(',')}`);
      if (p.turn) bits.push(`转:${p.turn}`);
      return `    ${side} ${p.id} [${p.template}] ${bits.join(' | ')}`;
    };

    /* 可疑判定：
       1. 左页在叫孩子做事（提示或热区），右页却没有结果词 —— 动作与结果被拆开了
       2. 左页有热区但没有提示，右页也没有任何文字承接 —— 互动成了孤儿
       3. 右页有热区，左页的旁白在交代结果但没提示 —— 可以接受，只记一次
    */
    const reasons = [];
    if (la.length && !ra.length && !hasResult(R)) reasons.push('左页有互动，右页看不出结果');
    if (la.length && !lw.prm && !rw.nar) reasons.push('左页有互动，两页都没有文字');
    if (!la.length && ra.length && !lw.nar) reasons.push('右页有互动，左页没有旁白');

    const interesting =
      la.length || ra.length || lw.nar || rw.nar || reasons.length;

    if (flagOnly && !reasons.length) continue;

    console.log(`\n  [${L.file}] ${L.id} | ${R.id}`);
    console.log(line('L', L, lw, la));
    console.log(line('R', R, rw, ra));
    if (reasons.length) {
      flagged += reasons.length;
      for (const r of reasons) console.log(`      ⚠ ${r}`);
    }
  }
}

console.log(`\n\n可疑 ${flagged} 处`);
