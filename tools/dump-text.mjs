/* 正文清单：把全书逐页文字打出来，统计字数与行长。
   一册一页码（两册都有 p05），所以按册分组统计——合在一起数出来的字数没法分给某一册。
   用法：node tools/dump-text.mjs            （人读）
        node tools/dump-text.mjs --json     （机读） */
import { loadBooks, textsOf } from './load-specs.mjs';

const books = await loadBooks();
const asJson = process.argv.includes('--json');

/** 一页的正文（不含朗读稿 aria）与印刷版专用文案 */
function itemsOf(page) {
  const items = [];
  for (const key of ['narration', 'sound', 'prompt', 'adult']) {
    const t = page.text && page.text[key];
    if (!t || !t.text) continue;
    const lines = Array.isArray(t.text) ? t.text : String(t.text).split('<br>');
    items.push({ key, lines });
    /* 印刷版专用文案也要进覆盖检查（它同样会被印出来） */
    if (t.print !== undefined && t.print !== null && t.print !== '') {
      const plines = Array.isArray(t.print) ? t.print : String(t.print).split('<br>');
      items.push({ key, lines: plines });
    }
  }
  return items;
}

/** 一册的字数：aria 是朗读稿，不算进书面的字数 */
function countOf(pages) {
  return pages.reduce((n, p) => {
    let c = 0;
    for (const t of textsOf(p)) {
      if (t === p.aria) continue;
      c += [...t].filter((ch) => ch.trim()).length;
    }
    return n + c;
  }, 0);
}

const rows = books.flatMap((b) =>
  b.pages.map((p) => ({
    book: b.id,
    title: b.meta.title,
    id: p.id,
    template: p.template,
    items: itemsOf(p),
  }))
);

if (asJson) {
  console.log(
    JSON.stringify(
      {
        books: books.map((b) => ({ id: b.id, title: b.meta.title, chars: countOf(b.pages) })),
        pages: rows.map((r) => ({
          book: r.book,
          id: r.id,
          items: r.items.map((it) => ({ key: it.key, lines: it.lines })),
        })),
        total: books.reduce((n, b) => n + countOf(b.pages), 0),
      },
      null,
      2
    )
  );
} else {
  for (const row of rows) {
    const parts = row.items.map(
      (it) => `      ${it.key}: ${it.lines.map((l) => `「${l}」`).join(' / ')}`
    );
    console.log(`${row.book}  ${row.id}  (${row.template})`);
    parts.forEach((p) => console.log(p));
    console.log('');
  }
  for (const b of books) {
    console.log(`${b.meta.title}（${b.id}）文字合计（不含朗读稿）：${countOf(b.pages)} 字`);
  }
  /* 规格 §5.3 的目标是**实测值**，不是原来草稿里那句"200–250 字"——
     那个数字跟 §5.2 自己的剧本对不上。实测值随页数走，改了页数要改规格里那一行。 */
  console.log('规格 §5.3 的实测值见设计规格');
}
