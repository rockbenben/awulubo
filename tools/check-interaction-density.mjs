/* 互动密度闸门：叙事段不能连续好几页只能「点空白翻页」。
   依据设计规格 §5.3.1「愿意互动」与 §7.6 的互动约定。

   只量正文叙事段 p04–p47，且只对**后三册**判定违规：
   - 睡前 p48–p59 是规格里刻意留白的沉降段（「最后两跨最暗最静」）；
   - 第一册的喂食链、第二册「守着它睡」的四跨慢节奏也是既有设计，
     不是这次补的叙事段，为了刷绿往守夜页里塞点击反而破坏意境。
   五册的统计都会打印出来，但只有后三册参与判定。

   用法：node tools/check-interaction-density.mjs
   失败即退出码 1，报错要指出从哪一页开始断档、怎么补。 */
import { loadBooks } from './load-specs.mjs';

const START = 4;
const END = 47;
const MAX_GAP = 6;
const CHECKED_BOOKS = new Set(['yiqiwan', 'shengqi', 'wuzilai']);

const books = await loadBooks();
let bodies = 0;
let hits = 0;

for (const b of books) {
  const list = b.pages.filter((p) => {
    const n = Number(p.id.slice(1));
    return n >= START && n <= END;
  });
  if (!list.length) continue;

  let withAction = 0;
  let classified = 0;
  let gap = 0;
  let gapStart = null;
  let worst = 0;
  let worstStart = null;

  for (const p of list) {
    bodies++;
    const hs = p.hotspot ? (Array.isArray(p.hotspot) ? p.hotspot : [p.hotspot]) : [];
    const has = hs.filter(Boolean).length > 0;
    if (p.reading !== undefined) classified++;
    if (has) withAction++;
    // 显式分类经加载器验证，可只看或共读，不为旧密度要求增加剧情外poke。
    if (has || p.reading !== undefined) {
      gap = 0;
      gapStart = null;
    } else {
      if (gap === 0) gapStart = p.id;
      gap++;
      if (gap > worst) {
        worst = gap;
        worstStart = gapStart;
      }
    }
  }

  console.log(`  · ${b.id}: p${String(START).padStart(2, '0')}–p${END} 共 ${list.length} 页，` +
    `${withAction} 页有专属互动，${classified} 页有明确共读分类，未分类段最长连续 ${worst} 页没有互动` +
    (CHECKED_BOOKS.has(b.id) ? '' : '（既有节奏，不判定）'));

  if (CHECKED_BOOKS.has(b.id) && worst > MAX_GAP) {
    hits++;
    console.log(
      `✗ ${b.id} 从 ${worstStart} 起连续 ${worst} 页只能点空白翻页（上限 ${MAX_GAP} 页）\n` +
      `    → 在这段中间挑 1–2 页补一个通用互动：` +
      `hotspot: { targetId: 'character', action: 'poke', target: 'char', at: [...], size: ..., label: '点一下噜啵' }，` +
      `热区要用 check-hotspots 量过的坐标罩住角色；` +
      `或把邻近的专属互动挪近来。睡前 p48–p59 不用补。`
    );
  }
}

/* 读到零页不能算过：正文范围一改、槽名一改，闸门就会悄悄变成假绿。 */
if (bodies === 0) {
  console.error('✗ 一页叙事正文都没读到（页号范围变了？load-specs 读不到页面？）——读到空不等于达标');
  process.exit(1);
}

console.log(`\n读了 ${bodies} 页叙事正文，互动断档 ${hits} 处`);
process.exitCode = hits === 0 ? 0 : 1;
