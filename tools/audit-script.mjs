/* 剧本体检：查「同一句话出现两遍」。
   规格 §5.3.1：同一页里不要出现两遍同一句话；两页里也不要把同一句抄两遍
   ——读起来像卡带了。

   用法：node tools/audit-script.mjs            */
import { loadBooks } from './load-specs.mjs';

const books = await loadBooks();
let n = 0;
let read = 0; /* 真读到文字的页数：读到空不等于「没有重复」 */

for (const b of books) {
  const pages = b.pages;
  for (let i = 0; i < pages.length; i++) {
    const p = pages[i];
    const next = pages[i + 1];
    const t = (v) => (v && v.text ? String(v.text).replace(/<br>/g, '') : '');
    const nar = t(p.text && p.text.narration);
    const prm = t(p.text && p.text.prompt);
    const snd = t(p.text && p.text.sound);
    if (nar || prm || snd) read++;

    /* 同一页里：旁白 / 提示 / 拟声词 两两相同 */
    const same = [
      ['旁白', '提示', nar, prm],
      ['旁白', '拟声词', nar, snd],
      ['提示', '拟声词', prm, snd],
    ];
    for (const [a, bb, x, y] of same) {
      if (x && x === y) {
        n++;
        console.log(`${b.id}/${p.id}  同一页里 ${a}与${bb}是同一句：「${x}」`);
      }
    }

    /* 相邻两页：这一页的提示 = 下一页的旁白（或反过来） */
    if (next && next.id !== 'p01') {
      const nnar = t(next.text && next.text.narration);
      const nprm = t(next.text && next.text.prompt);
      if (prm && nnar && prm === nnar) {
        n++;
        console.log(
          `${b.id}/${p.id}→${next.id}  这一页的提示与下一页的旁白是同一句：「${prm}」`
        );
      }
      if (nar && nprm && nar === nprm) {
        n++;
        console.log(
          `${b.id}/${p.id}→${next.id}  这一页的旁白与下一页的提示是同一句：「${nar}」`
        );
      }
      if (nar && nnar && nar === nnar) {
        n++;
        console.log(
          `${b.id}/${p.id}→${next.id}  两页的旁白是同一句：「${nar}」`
        );
      }
    }
  }
}

console.log(`\n读了 ${read} 页的文字，共 ${n} 处重复`);
/* 一页文字都没读到就报「0 处重复」，等于没有闸门：
   槽名一改（narration → 别的），三句都读成空串，n 永远是 0。
   跟 check-contrast.mjs 同一个形状——没量到就是没量到，不能说达标。 */
if (read === 0) {
  console.error(
    '✗ 一处文字都没读到（旁白/提示/拟声词的槽名变了？load-specs 读不到页面数据？）' +
      '——读到空不等于没有重复'
  );
  process.exit(1);
}
/* ⚠️ **必须让退出码跟着结果走**。
   这道闸门 2026-11-04 才接进 CI，可它原来不管有没有重复都退出 0——
   门是关着的，但看起来像关着（跟对比度那道闸门同一个毛病）。
   CI 里 `node tools/audit-script.mjs` 红了才会有人看见。 */
process.exitCode = n === 0 ? 0 : 1;
