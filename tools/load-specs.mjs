/* 读取页面数据（src/content/books/<册>/specs/*.js），按文件名顺序拼成册的页面清单。
   页面清单是唯一的事实来源：构建、检查、字体子集、截图都从这里取。

   一册 = 一本书 = 64 页。多册并列时，每一页都带 `book` 字段（册 id），
   网页端据此切换「现在读的是哪一册」。 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const BOOKS = path.join(HERE, '..', 'src', 'content', 'books');

/** 册清单（顺序即读者看到的顺序） */
async function manifest() {
  const mod = await import(pathToFileURL(path.join(BOOKS, 'index.js')).href);
  return mod.default || [];
}

/** 全部册：[{ id, meta, pages }] */
export async function loadBooks() {
  const ids = await manifest();
  const books = [];
  for (const id of ids) {
    const dir = path.join(BOOKS, id);
    const metaFile = path.join(dir, 'book.json');
    const meta = fs.existsSync(metaFile)
      ? JSON.parse(fs.readFileSync(metaFile, 'utf8'))
      : { title: id };
    const specDir = path.join(dir, 'specs');
    const files = fs.existsSync(specDir)
      ? fs.readdirSync(specDir).filter((f) => f.endsWith('.js')).sort()
      : [];
    const pages = [];
    for (const file of files) {
      const mod = await import(pathToFileURL(path.join(specDir, file)).href);
      const list = Array.isArray(mod.default) ? mod.default : [mod.default];
      for (const spec of list) {
        if (!spec || !spec.id) {
          throw new Error(`${id}/${file} 里有页面缺少 id`);
        }
        pages.push({ ...spec, book: id, file });
      }
    }
    books.push({ id, meta, pages });
  }
  return books;
}

/** 全部册的全部页面（带 `book` 字段）。
    检查类脚本用它；页面 id 在各册内独立（每册都从 p01 开始），所以按册分组查。 */
export async function loadSpecs() {
  const books = await loadBooks();
  const out = [];
  for (const b of books) {
    for (const p of b.pages) out.push(p);
  }
  return out;
}

/** 页面里所有会被渲染出来的文字（供字体子集与覆盖检查使用） */
export function textsOf(page) {
  const out = [];
  for (const t of Object.values(page.text || {})) {
    if (!t || !t.text) continue;
    const lines = Array.isArray(t.text) ? t.text : [t.text];
    for (const line of lines) out.push(line);
  }
  if (page.aria) out.push(page.aria);
  return out;
}

/* 印刷版会有自己的文案（纸上点不动，"点我，开始"这类提示要改写），
   这些字同样要进字体子集，否则印刷 PDF 会退回系统字体。 */
export function textsOfAll(page) {
  const out = textsOf(page);
  for (const t of Object.values(page.text || {})) {
    if (!t || t.print === undefined || t.print === null) continue;
    const lines = Array.isArray(t.print) ? t.print : [t.print];
    for (const line of lines) out.push(line);
  }
  return out;
}
