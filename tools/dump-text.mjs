/* 正文清单：把全书逐页文字打出来，统计字数与行长。
   一册一页码（每册都有 p05），所以按册分组统计——合在一起数出来的字数没法分给某一册。
   用法：node tools/dump-text.mjs            （人读）
        node tools/dump-text.mjs --json     （机读） */
import { loadBooks, interfaceTexts } from './load-specs.mjs';

const books = await loadBooks();
const asJson = process.argv.includes('--json');
const TEXT_KEYS = ['narration', 'sound', 'prompt', 'adult'];

/** 一页的正文（不含朗读稿 aria）与印刷版专用文案 */
function itemsOf(page) {
  const items = [];
  for (const key of TEXT_KEYS) {
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
  for (const number of page.numbers || []) items.push({ key: 'number', lines: [number.text] });
  return items;
}

/** 沿用基础书面文案与数字的合计口径，print 覆写单列导出，不重复计数。
    aria 按字段排除，不能按内容排除同文旁白；换行标记与空白不算字。 */
function countOf(pages) {
  return pages.reduce((total, page) => {
    const written = TEXT_KEYS.flatMap(key => page.text?.[key]?.text || []);
    written.push(...(page.numbers || []).map(number => number.text));
    return total + written.reduce((count, line) => count +
      [...line.replace(/<br\s*\/?\s*>/gi, '')].filter(ch => ch.trim()).length, 0);
  }, 0);
}

const rows = books.flatMap((b) =>
  b.pages.map((p) => ({
    book: b.id,
    title: b.meta.title,
    id: p.id,
    template: p.template,
    items: itemsOf(p),
    numbers: (p.numbers || []).map(number => ({ text: number.text, on: Boolean(number.on) })),
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
          numbers: r.numbers,
        })),
        interface: interfaceTexts(books),
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
    row.numbers.forEach((number, index) => console.log(
      `      数字 ${index + 1}: 「${number.text}」，初始${number.on ? '显示' : '隐藏'}`
    ));
    console.log('');
  }
  for (const b of books) {
    console.log(`${b.meta.title}（${b.id}）文字合计（不含朗读稿）：${countOf(b.pages)} 字`);
  }
  /* 规格 §5.3 的目标是**实测值**，不是原来草稿里那句"200–250 字"——
     那个数字跟 §5.2 自己的剧本对不上。实测值随页数走，改了页数要改规格里那一行。 */
  console.log('规格 §5.3 的实测值见设计规格');
}
