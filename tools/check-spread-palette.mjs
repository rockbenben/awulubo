/* 一跨一个色系：摊开的两页必须共用一套底色场（AGENTS.md「画面与版式」）。
   用法：node tools/check-spread-palette.mjs
   失败即退出码 1。

   为什么要有这道闸门：
     骑马钉摊开的是**两页并排**的一幅画。两页色系不一样，
     孩子看到的就是两张不相干的图拼在一起——「翻开来是一幅画」这句话就不成立了。
     规则里只留了一个例外：**正文自己说了转折**，这一跨才允许换色
     （「变红啦」「苦——」「颜色要回家了」）。
     换句话说：换色必须是**因果**，不是两幅画。

   怎么量：
     一跨 = 一个 specs/*.js 文件里的两页。
     把每一页的用色收成一个「色系集合」：
       · 模板自己的底色（t-color 是红、t-night 是夜……）
       · bg.colors（笔触颜色）、bg.gap（笔触间隙）、bg.wash（满版底色场）
     颜色令牌按**色族**归并（--red / --red-deep / --wash-red 都是红这一族），
     两个色系集合有交集就算同一幅画——放射线与漩涡共用一套颜色，
     圆心对着书脊（focus [1000,y] / [0,y]），左右各露一半，还是一幅画。

   例外怎么写：
     右页加一个 `turn` 字段，写下正文里那**原样出现**的转折词：
         { id: 'p09', turn: '变红啦', ... }
     闸门会检查这几个字真的在这一跨的文字里——所以 `turn` 不是橡皮图章，
     写一个正文里没有的词会被挡下来。

   「夜」的两级（--night / --night-deep）是**同族深浅**，不是换色：
   尾巴就是要一路暗下去（AGENTS.md「故事与装订」），所以这一对放行。

   失败信息要能指出怎么改（AGENTS.md「验收与发布」）。
*/
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadBooks } from './load-specs.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/* 颜色令牌 → 色族。纸白不算色系（它是默认底），"--paper" 的笔触间隙也不参与比较。 */
const FAMILY = {
  '--red': 'red', '--red-deep': 'red', '--wash-red': 'red',
  '--blue': 'blue', '--deep-blue': 'blue', '--wash-blue': 'blue',
  '--yellow': 'yellow', '--yellow-deep': 'yellow', '--wash-yellow': 'yellow',
  '--green': 'green', '--wash-green': 'green',
  '--purple': 'purple', '--wash-purple': 'purple',
  '--pink': 'pink', '--pink-deep': 'pink', '--wash-pink': 'pink',
  '--orange': 'orange', '--wash-orange': 'orange',
  '--cream': 'cream', '--wash-cream': 'cream',
  '--night': 'night', '--night-deep': 'night',
  '--paper': 'paper',
};

/* 模板自己的底色 */
const TEMPLATE_BG = {
  't-color': 'red',
  't-color t-blue': 'blue',
  't-color t-yellow': 'yellow',
  't-night': 'night',
  't-night t-night-deep': 'night',
};

/* 「夜」的两级（--night / --night-deep）本来就归同一族：
   尾巴就是要一路暗下去（AGENTS.md「故事与装订」），所以它自动算同一幅画，
   下面不需要额外的例外表。 */

function familyOf(token) {
  return FAMILY[token] || null;
}

/** 一页的色系集合 */
function paletteOf(page) {
  const bg = page.bg || {};
  const set = new Set();
  const tpl = TEMPLATE_BG[page.template];
  if (tpl) set.add(tpl);
  for (const tok of [...(bg.colors || []), bg.gap, bg.wash]) {
    if (!tok) continue;
    const f = familyOf(tok);
    if (f && f !== 'paper') set.add(f);
  }
  return set;
}

function describe(page) {
  const bg = page.bg || {};
  const bits = [];
  const tpl = TEMPLATE_BG[page.template];
  if (tpl) bits.push(`模板底色 ${tpl}`);
  if (bg.colors && bg.colors.length) bits.push(`colors: [${bg.colors.join(', ')}]`);
  if (bg.gap) bits.push(`gap: ${bg.gap}`);
  if (bg.wash) bits.push(`wash: ${bg.wash}`);
  return bits.length ? bits.join('，') : '（纯纸白底）';
}

/** 这一跨会被印出来的文字（turn 的那几个字必须真的在页面上） */
function textOf(page) {
  const out = [];
  for (const key of ['narration', 'sound', 'prompt', 'adult']) {
    const t = page.text && page.text[key];
    if (!t) continue;
    const push = (v) => {
      if (Array.isArray(v)) v.forEach(push);
      else if (v) out.push(String(v));
    };
    push(t.text);
    if (t.print) push(t.print);
  }
  return out.join(' ').replace(/<br>/g, '');
}

const problems = [];
const notes = [];
let spreads = 0;
let turns = 0;

const books = await loadBooks();

for (const book of books) {
  /* 一跨 = 一个文件里的两页（loadBooks 已按文件名顺序拼好） */
  const byFile = new Map();
  for (const p of book.pages) {
    if (!byFile.has(p.file)) byFile.set(p.file, []);
    byFile.get(p.file).push(p);
  }

  for (const [file, pages] of byFile) {
    if (pages.length !== 2) continue; /* 前置页/后置页不是跨页 */
    spreads++;
    const [left, right] = pages;
    const sl = paletteOf(left);
    const sr = paletteOf(right);

    /* 有交集 = 同一幅画 */
    const shared = [...sl].filter((f) => sr.has(f));
    if (shared.length) {
      if (sl.size !== sr.size || [...sl].some((f) => !sr.has(f))) {
        notes.push(
          `✓ ${book.id}/${file} 同一色系（共用 ${shared.join('/')}，另加 ${[...new Set([...sl, ...sr])].filter((f) => !shared.includes(f)).join('/') || '—'}）`
        );
      }
      continue;
    }

    /* 正文说了转折：turn 的那几个字必须真的在这一跨 */
    const turn = right.turn || left.turn;
    if (turn) {
      const onPage = textOf(right) + ' ' + textOf(left);
      if (onPage.includes(turn)) {
        turns++;
        notes.push(`✓ ${book.id}/${file} 换色有正文交代（${turn}）`);
        continue;
      }
      problems.push(
        `${book.id}/${right.id}（${file}）turn 写的是「${turn}」，` +
          `但这几个字不在这一跨的文字里——turn 必须是正文原话，` +
          `闸门会拿它跟页面上印出来的字对`
      );
      continue;
    }

    problems.push(
      `${book.id}/${file}（${left.id} | ${right.id}）这一跨换色系了，正文却没说为什么：\n` +
        `      左页 ${left.id}：${describe(left)}\n` +
        `      右页 ${right.id}：${describe(right)}\n` +
        `      两种改法（AGENTS.md「画面与版式」）：\n` +
        `        1) 两页共用一套底色场——把右页的 bg 改成跟左页同一族；\n` +
        `        2) 正文自己说了转折——在右页加 turn: '（正文里原样的那几个字）'。`
    );
  }
}

console.log(`检查 ${books.length} 册共 ${spreads} 个跨页的色系……`);
if (problems.length) {
  console.error(`\n✗ ${problems.length} 处色系问题：`);
  problems.forEach((p) => console.error(`  - ${p}`));
  process.exit(1);
}
notes.forEach((n) => console.log(`  ${n}`));
console.log(`✓ 每一跨都是一套色系（${turns} 处是正文交代过的换色）`);
