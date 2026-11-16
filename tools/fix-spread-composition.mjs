/* 一次性工具：重排「一跨两页」的形象位置。

   问题：第三、四、五册每页都是同一张版式（噜啵永远站在同一个位置），
   摊开两页就成了同一页盖了两次——不像一幅画。

   规则：
     1. 同一跨的两页，形象不能在同一处；
     2. 空位逐跨轮换，让整册读起来不是盖出来的；
     3. 新位置要避开那一页的文字（压字是硬伤），
        与道具轻微相接没关系——那正是「它抱着球」的样子。

   用法：node tools/fix-spread-composition.mjs            （只写 stdout 的预览）
        node tools/fix-spread-composition.mjs --write     （真写回 specs/）
*/
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadBooks } from './load-specs.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const write = process.argv.includes('--write');

/* 角色的墨迹范围（角色坐标系 1000×1000 里的实际墨迹框） */
const INK = { x0: 130, x1: 870, y0: 165, y1: 900 };

/* 空位：at = 角色包围盒的左上角（页坐标，千分比）。
   15 格网格：横三竖五——横着挪一格是换一边站着，竖着挪一格是换高低。 */
const SLOTS = [];
for (const y of [130, 190, 250, 310, 370]) {
  for (const x of [60, 265, 470]) SLOTS.push({ x, y });
}

/* 一页上的文字占掉的地方（页坐标，千分比）
   字号单位是「页宽的百分之几」，1u = 10 千分比；行高按 1.5 / 1.1 / 1.3 */
function textBoxes(page) {
  const out = [];
  const t = page.text || {};
  const push = (v, w, lh, fs) => {
    if (!v || !v.text) return;
    const width = v.width || 320;
    const lines = Array.isArray(v.text) ? v.text.length : String(v.text).split('<br>').length;
    const size = v.size || fs;
    out.push({
      x0: v.at[0],
      y0: v.at[1],
      x1: v.at[0] + width,
      y1: v.at[1] + size * lh * 10 * lines,
    });
  };
  push(t.narration, t.narration && t.narration.width, 1.5, 3.4);
  push(t.sound, 380, 1.1, t.sound && t.sound.size);
  push(t.prompt, t.prompt && t.prompt.width, 1.3, 4);
  return out;
}

/* 道具的墨迹框（道具坐标系 1000 见方，墨迹大约在 187–813） */
function propBoxes(page) {
  return (page.props || []).map((p) => ({
    x0: p.at[0] + 187 * p.scale,
    y0: p.at[1] + 100 * p.scale,
    x1: p.at[0] + 813 * p.scale,
    y1: p.at[1] + 900 * p.scale,
  }));
}

const hit = (a, b) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
const area = (a) => Math.max(0, a.x1 - a.x0) * Math.max(0, a.y1 - a.y0);

function charBox(at, scale) {
  return {
    x0: at[0] + INK.x0 * scale,
    y0: at[1] + INK.y0 * scale,
    x1: at[0] + INK.x1 * scale,
    y1: at[1] + INK.y1 * scale,
  };
}

/** 这个空位放得下吗：不出页、不压字；道具也不能被压在角色身上 */
function fits(slot, scale, page) {
  const box = charBox([slot.x, slot.y], scale);
  if (box.x0 < 4 || box.y0 < 4 || box.x1 > 996 || box.y1 > 996) return false;
  for (const t of textBoxes(page)) if (hit(box, t)) return false;
  /* 道具画在角色之上：道具落在角色身上会像贴在肚子上 */
  for (const p of propBoxes(page)) {
    const cx = (p.x0 + p.x1) / 2;
    const cy = (p.y0 + p.y1) / 2;
    if (cx > box.x0 && cx < box.x1 && cy > box.y0 && cy < box.y1) return false;
  }
  return true;
}

/** 稳定的散列：同一个文件每次跑出同一个结果 */
function hash(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0);
}

const books = await loadBooks();
let changed = 0;
let skipped = 0;

for (const book of books) {
  const byFile = new Map();
  for (const p of book.pages) {
    if (!byFile.has(p.file)) byFile.set(p.file, []);
    byFile.get(p.file).push(p);
  }
  const spreads = [...byFile.entries()].filter(([, ps]) => ps.length === 2);

  spreads.forEach(([file, [L, R]], i) => {
    if (!L.char || !R.char) return;
    const same = L.char.at[0] === R.char.at[0] && L.char.at[1] === R.char.at[1];
    if (!same) return;

    /* 两页一起挪，各取一个空位、互不相同，而且要隔得开——
       两页的形象挨得太近，摊开还是像盖了两次。 */
    const sep = (a, b) => Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
    const pairs = [];
    for (const ls of SLOTS) {
      if (!fits(ls, L.char.scale, L)) continue;
      for (const rs of SLOTS) {
        if (ls === rs) continue;
        if (sep(ls, rs) < 180) continue;
        if (!fits(rs, R.char.scale, R)) continue;
        pairs.push([ls, rs]);
      }
    }
    let placed = null;
    if (pairs.length) {
      const [ls, rs] = pairs[hash(`${book.id}/${file}#${i}`) % pairs.length];
      placed = { L: [ls.x, ls.y], R: [rs.x, rs.y] };
    }
    if (!placed) {
      /* 只挪右页：挑离左页最远、且摆得下的那个空位 */
      let best = null;
      let bestD = -1;
      for (const rs of SLOTS) {
        if (!fits(rs, R.char.scale, R)) continue;
        const d = sep(rs, { x: L.char.at[0], y: L.char.at[1] });
        if (d > bestD) {
          bestD = d;
          best = rs;
        }
      }
      if (best) placed = { L: L.char.at, R: [best.x, best.y] };
    }
    if (!placed) {
      for (let k = 0; k < SLOTS.length && !placed; k++) {
        const ls = SLOTS[(i + k) % SLOTS.length];
        if (fits(ls, L.char.scale, L)) placed = { L: [ls.x, ls.y], R: R.char.at };
      }
    }
    if (!placed) {
      skipped++;
      console.log(`跳过 ${path.relative(root, file)}  ${L.id}|${R.id}（没有放得下的空位）`);
      return;
    }

    changed++;
    const full = path.join(root, 'src', 'content', 'books', book.id, 'specs', file);
    console.log(`${book.id}/${file}  ${L.id}|${R.id}  ${L.char.at}→${placed.L}  ${R.char.at}→${placed.R}`);
    if (!write) return;

    let src = fs.readFileSync(full, 'utf8');
    const lines = src.split('\n');
    let seen = 0;
    for (let li = 0; li < lines.length; li++) {
      const m = lines[li].match(/^(\s*char:\s*\{.*?at:\s*)\[\d+,\s*\d+\](.*)$/);
      if (!m) continue;
      if (seen === 0) lines[li] = m[1] + `[${placed.L[0]}, ${placed.L[1]}]` + m[2];
      else if (seen === 1) lines[li] = m[1] + `[${placed.R[0]}, ${placed.R[1]}]` + m[2];
      seen++;
      if (seen > 1) break;
    }
    fs.writeFileSync(full, lines.join('\n'), 'utf8');
  });
}

console.log(`\n共重排 ${changed} 跨${write ? '（已写回）' : '（预览，未写）'}，跳过 ${skipped} 跨`);
