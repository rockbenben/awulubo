/* Vite 插件：把页面数据与 SVG 组件注入 HTML 入口。
   —— 这一层是本书特有的（页面数据 + 组件库），打包/压缩/内联交给 Vite。

   多册：每一册都是一个独立的 64 页文件，页面带 `data-book="<册 id>"`。
   网页端默认展示「当前册」，切换册时由运行时改 `body[data-book]` 与页面的可见性。 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadBooks } from './load-specs.mjs';
import { createPageRenderer } from './render-page.mjs';
import { normalizePath } from 'vite';

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
  let buildBooks;

  return {
    name: 'awulubo-book-pages',

    /* 页面数据与组件是**在服务端渲染进 HTML 的**（不是浏览器端 import），
       所以改了它们，Vite 不会自己发现——HTML 那层没被标记为过期。
       这里明确告诉它：内容变了就整页重载。少了这段，
       「改一句台词 → 刷新浏览器 → 什么都没变」，只能重启 dev。 */
    configureServer(server) {
      server.watcher.on('all', (event, file) => {
        if (!['add', 'change', 'unlink'].includes(event)) return;
        const relative = normalizePath(path.relative(ROOT, file));
        if (/^src\/(content|components|templates)\//.test(relative)) {
          server.ws.send({ type: 'full-reload' });
        }
      });
    },

    async transformIndexHtml(html, ctx) {
      /* 开发模式每次都重读：页面数据是改得最多的东西，
         缓存住它等于改一版要重启一次服务器。 */
      const isDev = !!ctx.server;
      if (!isDev && !buildBooks) buildBooks = loadBooks();
      const books = await (isDev ? loadBooks() : buildBooks);
      const renderPage = createPageRenderer();
      const file = ctx.path || '';
      /* 屏幕版只出 60 页（跳过版权页、给大人的话、后环衬、封底）；印刷版与拼版出全部 64 页 */
      const scope = /print|proof|booklet/.test(file) ? 'print' : 'screen';
      let markup;
      if (/booklet/.test(file)) {
        /* 骑马钉拼版按册分块排：每册是一本独立的书，
           帖序在册内从头算（最外一张是那一册的封面与封底）。 */
        markup = books
          .map((b) => bookletSheets(b.pages, b.id, renderPage))
          .join('\n');
      } else {
        markup = books.flatMap((b) => b.pages)
          .filter((p) => scope === 'print' || p.screen !== false)
          .map((p) => renderPage(p, scope)).join('\n\n');
      }

      /* 册清单（浏览器端拿不到文件系统，册的列表必须显式带进去） */
      const manifest = books.map((b, i) => ({
        id: b.id,
        no: i + 1,
        title: b.meta.title || b.id,
        subtitle: b.meta.subtitle || '',
        adultTip: b.meta.adultTip || '',
      }));

      return html
        .replace('<!--BOOK_DEFS-->', buildDefs())
        .replace(
          '<!--BOOK_MANIFEST-->',
          `<script type="application/json" id="books-manifest">${JSON.stringify(manifest)}</script>`
        )
        .replace('<!--BOOK_PAGES-->', markup);
    },
  };
}

/* A4 双面骑马钉拼版：一张纸的两面，每面并排两个书页，对折就是书。
   页序按骑马钉来——最外一张是封面与封底，往里依次往中间收。
   （每帖 4 页，N 页的书要 N/4 张纸、双面印，一共 N/2 个 A4 面。） */
function bookletSheets(pages, bookId, renderPage) {
  const n = pages.length;
  const sides = [];
  for (let k = 1; k <= n / 4; k++) {
    sides.push([n - 2 * (k - 1), 2 * k - 1]); /* 这一帖的正面 */
    sides.push([2 * k, n - 2 * (k - 1) - 1]); /* 它的背面 */
  }
  return sides
    .map((side) => {
      const cells = side
        .map((i) => `      <div class="cell">${renderPage(pages[i - 1], 'print')}</div>`)
        .join('\n');
      return `    <div class="sheet" data-book="${bookId}">\n${cells}\n    </div>`;
    })
    .join('\n');
}
