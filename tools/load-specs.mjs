/* 读取页面数据（src/content/specs/*.js），按文件名顺序拼成整本书的页面清单。
   页面清单是唯一的事实来源：构建、检查、字体子集、截图都从这里取。 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SPECS = path.join(HERE, '..', 'src', 'content', 'specs');

export async function loadSpecs() {
  const files = fs.readdirSync(SPECS).filter((f) => f.endsWith('.js')).sort();
  const pages = [];
  for (const file of files) {
    const mod = await import(pathToFileURL(path.join(SPECS, file)).href);
    const list = Array.isArray(mod.default) ? mod.default : [mod.default];
    for (const spec of list) {
      if (!spec || !spec.id) {
        throw new Error(`${file} 里有页面缺少 id`);
      }
      pages.push({ ...spec, file });
    }
  }
  const ids = new Set();
  for (const p of pages) {
    if (ids.has(p.id)) throw new Error(`页面 ID 重复：${p.id}`);
    ids.add(p.id);
  }
  return pages;
}

/* 页面里所有会被渲染出来的文字（供字体子集与覆盖检查使用） */
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
