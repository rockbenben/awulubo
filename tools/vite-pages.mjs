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
      /* 屏幕版只出 28 页；印刷版与拼版出全部 32 页 */
      const scope = /print|proof/.test(file) ? 'print' : 'screen';
      const pages = specs.filter((p) => scope === 'print' || p.screen !== false);
      const markup = pages.map((p) => renderPage(p, scope)).join('\n\n');
      return html
        .replace('<!--BOOK_DEFS-->', buildDefs())
        .replace('<!--BOOK_PAGES-->', markup);
    },
  };
}
