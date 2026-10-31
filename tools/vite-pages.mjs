/* Vite 插件：把页面数据与 SVG 组件注入 HTML 入口。
   —— 这一层是本书特有的（页面数据 + 组件库），打包/压缩/内联交给 Vite。 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadSpecs } from './load-specs.mjs';
import { renderPage } from './render-page.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, '..');
const COMPONENTS = path.join(ROOT, 'src', 'components');

/* 组件库 → 一个隐藏的 <svg><defs>，页面用 <use href="#..."> 引用 */
function buildDefs() {
  const files = fs
    .readdirSync(COMPONENTS)
    .filter((f) => f.endsWith('.svg'))
    .sort();
  const blocks = files.map((file) => {
    const text = fs.readFileSync(path.join(COMPONENTS, file), 'utf8');
    const m = text.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
    return m ? `<!-- ${file} -->\n${m[1].trim()}` : '';
  });
  return (
    '<svg class="defs" aria-hidden="true" focusable="false" width="0" height="0" ' +
    'style="position:absolute;overflow:hidden"><defs>\n' +
    blocks.join('\n') +
    '\n</defs></svg>'
  );
}

export function bookPages() {
  let specs = null;

  return {
    name: 'awulubo-book-pages',

    async transformIndexHtml(html, ctx) {
      if (!specs) specs = await loadSpecs();
      const file = ctx.path || '';
      /* 屏幕版只出 28 页；印刷版与拼版出全部页面 */
      const scope = /print|proof|booklet/.test(file) ? 'print' : 'screen';
      const pages = specs.filter((p) => scope === 'print' || p.screen !== false);
      const markup = /booklet/.test(file)
        ? bookletSheets(pages, scope)
        : pages.map((p) => renderPage(p, scope)).join('\n\n');
      return html
        .replace('<!--BOOK_DEFS-->', buildDefs())
        .replace('<!--BOOK_PAGES-->', markup);
    },
  };
}

/* A4 双面骑马钉拼版：一张纸的两面，每面并排两个书页，对折就是书。
   页序按骑马钉来——最外一张是封面与封底，往里依次往中间收。
   （每帖 4 页，N 页的书要 N/4 张纸、双面印，一共 N/2 个 A4 面。） */
function bookletSheets(pages, scope) {
  const n = pages.length;
  const sides = [];
  for (let k = 1; k <= n / 4; k++) {
    sides.push([n - 2 * (k - 1), 2 * k - 1]); /* 这一帖的正面 */
    sides.push([2 * k, n - 2 * (k - 1) - 1]); /* 它的背面 */
  }
  return sides
    .map((side) => {
      const cells = side
        .map((i) => `      <div class="cell">${renderPage(pages[i - 1], scope)}</div>`)
        .join('\n');
      return `    <div class="sheet">\n${cells}\n    </div>`;
    })
    .join('\n');
}
