/* 正文清单：把全书逐页文字打出来，统计字数与行长。
   用法：node tools/dump-text.mjs            （人读）
        node tools/dump-text.mjs --json     （机读） */
import { loadSpecs, textsOf } from './load-specs.mjs';

const pages = await loadSpecs();
const asJson = process.argv.includes('--json');

const rows = pages.map((p) => {
  const items = [];
  for (const key of ['narration', 'sound', 'prompt', 'adult']) {
    const t = p.text && p.text[key];
    if (!t || !t.text) continue;
    const lines = Array.isArray(t.text) ? t.text : String(t.text).split('<br>');
    items.push({ key, lines });
    /* 印刷版专用文案也要进覆盖检查（它同样会被印出来） */
    if (t.print !== undefined && t.print !== null && t.print !== '') {
      const plines = Array.isArray(t.print) ? t.print : String(t.print).split('<br>');
      items.push({ key, lines: plines });
    }
  }
  return { id: p.id, template: p.template, items };
});

const total = pages.reduce((n, p) => {
  let c = 0;
  for (const t of textsOf(p)) {
    /* aria 是朗读稿，不算进书面的字数 */
    if (t === p.aria) continue;
    c += [...t].filter((ch) => ch.trim()).length;
  }
  return n + c;
}, 0);

if (asJson) {
  console.log(
    JSON.stringify(
      {
        pages: rows.map((r) => ({
          id: r.id,
          items: r.items.map((it) => ({ key: it.key, lines: it.lines })),
        })),
        total,
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
    console.log(`${row.id}  (${row.template})`);
    parts.forEach((p) => console.log(p));
    console.log('');
  }
  console.log(`全书文字合计（不含朗读稿）：${total} 字`);
  /* 规格 §5.3 的目标是**实测值**，不是原来草稿里那句"200–250 字"——
     那个数字跟 §5.2 自己的剧本对不上。实测值随页数走，改了页数要改这里。 */
  console.log('规格 §5.3 的实测值见设计规格（当前 64 页版：1439 字）');
}
