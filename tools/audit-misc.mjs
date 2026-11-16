/* 全面审计：查闸门管不到的地方。
   闸门量的是结构（页数、热区、对比度、重复），量不到「这一页读起来对不对」。
   这一支查三件事：
     1. **改了页面文案，朗读稿（aria）却一字没动**——读屏的人听到的还是旧句子；
        判据是拿 HEAD 那一版比：文案变了、aria 没变，就报出来人工确认。
     2. 没有热区的页，提示却叫孩子「点」一个画面上的东西
        （孩子照着找，却找不到能点的）；
     3. 提示行太长（一行放不下会折行，越过页面安全区）。

   用法：node tools/audit-misc.mjs            */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadSpecs } from './load-specs.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, '..');

const pages = await loadSpecs();

/* 名词 → 道具 kind（沿用 audit-content.mjs 的表，补了几个本项目用得多的） */
const NAME_TO_KIND = [
  ['红苹果', 'apple'], ['苹果', 'apple'],
  ['蓝小鱼', 'fish'], ['小鱼', 'fish'],
  ['黄星星', 'star'], ['星星', 'star'],
  ['月亮', 'moon'], ['圆圈', 'arrow'],
  ['毯子', 'blanket'], ['杯子', 'cup'], ['水杯', 'cup'],
  ['药丸', 'pill'], ['药', 'pill'],
  ['篮子', 'basket'], ['球', 'ball'],
  ['积木', 'block'], ['塔', 'block'],
  ['花', 'flower'],
];

/* 去标点，只留正文用字 */
const bare = (s) =>
  String(s || '')
    .replace(/<br>/g, '')
    .replace(/[\s，。！？、…—～「」《》（）:：;；·~"'?!,.]/g, '');

const flat = (v) => {
  if (!v || !v.text) return '';
  const t = Array.isArray(v.text) ? v.text.join(' ') : String(v.text);
  return t.replace(/<br>/g, ' ').trim();
};

/* ── 从源码文本里抽出「一页一页的 aria 与文案」 ──
   不用正则解析 JS（容易碎），只按 id 切片：
   每个页面对象以 `id: 'pNN'` 开头，取到下一个 id 之前的那一段。 */
function sliceById(src) {
  const out = new Map();
  const re = /\bid:\s*'(p\d+)'/g;
  const hits = [];
  let m;
  while ((m = re.exec(src))) hits.push({ id: m[1], at: m.index });
  for (let i = 0; i < hits.length; i++) {
    const seg = src.slice(hits[i].at, i + 1 < hits.length ? hits[i + 1].at : src.length);
    const aria = seg.match(/aria:\s*'([^']*)'/);
    const texts = [...seg.matchAll(/(?:narration|prompt|sound):\s*\{([^{}]*)\}/g)]
      .map((x) => {
        const t = x[1].match(/text:\s*'([^']*)'/);
        return t ? t[1] : '';
      })
      .filter(Boolean)
      /* ⚠️ 源码里三处的书写顺序不固定（sound 有时排第一），
         拼串必须**排序后**再比，否则「顺序不同」会被当成「文案改了」。 */
      .sort();
    out.set(hits[i].id, { aria: aria ? aria[1] : '', texts: texts.join('|') });
  }
  return out;
}

/* ── 取 HEAD 那一版的页面数据 ── */
const headCache = new Map();
function headOf(rel) {
  if (headCache.has(rel)) return headCache.get(rel);
  let src = '';
  try {
    src = execFileSync('git', ['show', `HEAD:${rel}`], {
      cwd: ROOT,
      encoding: 'utf8',
      maxBuffer: 8 * 1024 * 1024,
    });
  } catch {
    src = ''; // 新增文件，HEAD 里没有
  }
  const map = sliceById(src);
  headCache.set(rel, map);
  return map;
}

let n = 0;
const report = (msg) => {
  n++;
  console.log(`  ${msg}`);
};

console.log(`审计 ${pages.length} 个页面……`);

for (const p of pages) {
  const t = p.text || {};
  const nar = flat(t.narration);
  const prm = flat(t.prompt);
  const snd = flat(t.sound);
  const aria = p.aria || '';

  /* ── 1. 改了文案，朗读稿却一字没动 ──
     ⚠️ aria 在本项目里是「给读屏用户的一段描述」，不是逐字朗读稿——
        它可以跟页面文字**说法不同**（「它从苹果后面跳出来啦。」
        对应 aria「它藏在这个苹果后面！」）。
        所以这里查的不是「aria 是不是逐字包含文案」，而是：
        **改了页面文案，aria 却一字未动，而且新的内容它讲不到**。 */
  const rel = `src/content/books/${p.book}/specs/${p.file}`;
  const head = headOf(rel).get(p.id);
  if (head) {
    const nowList = [nar, prm, snd].filter(Boolean).map(bare);
    const nowTexts = nowList.sort().join('|');
    const oldList = head.texts.split('|').filter(Boolean);
    const changedText = bare(head.texts) !== bare(nowTexts);
    const changedAria = bare(head.aria) !== bare(aria);
    if (changedText && !changedAria) {
      const a = bare(aria);
      /* aria 里留着**陈句子**吗？
         （旧文案不是任何新文案的子集，却还出现在 aria 里——那就是没同步上的旧句子。
          旧文案等于某个新文案 = 那一处本来没改，它在 aria 里是正常的；
          旧文案包着新文案 = aria 恰好还能用，也不算。） */
      const stale = oldList.filter((o) => {
        const ob = bare(o);
        if (!ob) return false;
        if (nowList.includes(ob)) return false;
        if (nowList.some((nb) => nb && ob.includes(nb))) return false;
        return a.includes(ob);
      });
      if (stale.length) {
        report(
          `${p.book}/${p.id}  改了页面文案，朗读稿没跟着改（留着旧句子「${stale[0]}」）：aria「${aria}」`
        );
      }
    }
  }

  /* ── 2. 没有热区的页，提示却叫孩子「点」画面上的东西 ── */
  const hs = p.hotspot ? (Array.isArray(p.hotspot) ? p.hotspot : [p.hotspot]) : [];
  if (!hs.length && prm && /点/.test(prm)) {
    const kinds = new Set();
    for (const [name, kind] of NAME_TO_KIND) {
      if (prm.includes(name)) kinds.add(kind);
    }
    const onPage = new Set((p.props || []).map((x) => x.kind));
    for (const k of kinds) {
      if (onPage.has(k)) {
        report(
          `${p.book}/${p.id}  没有热区，提示却叫孩子点画面上的「${k}」：「${prm}」`
        );
      }
    }
  }

  /* ── 3. 提示行太长 ── */
  if (prm) {
    const width = t.prompt && t.prompt.width ? t.prompt.width : 340;
    const cap = Math.floor(width / 40);
    const len = bare(prm).length;
    if (len > cap) {
      report(
        `${p.book}/${p.id}  提示 ${len} 字，超出提示框一行的容量（约 ${cap} 字）：「${prm}」`
      );
    }
  }
}

console.log(`\n共 ${n} 处`);
process.exitCode = n === 0 ? 0 : 1;
