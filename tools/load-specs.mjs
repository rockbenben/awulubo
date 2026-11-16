/* 读取页面数据（src/content/books/<册>/specs/*.js），按文件名顺序拼成册的页面清单。
   页面清单是唯一的事实来源：构建、检查、字体子集、截图都从这里取。

   一册 = 一本书 = 64 页。多册并列时，每一页都带 `book` 字段（册 id），
   网页端据此切换「现在读的是哪一册」。 */
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { registerHooks } from 'node:module';
import { physicalSpreads, actionNames, withSpreadScene, validateResponses } from '../src/js/model.ts';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { readerModes, readerLabels } from '../src/content/reader-ui.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const BOOKS = path.join(HERE, '..', 'src', 'content', 'books');

/* 哈希与执行必须使用同一次读取的源码，避免保存发生在计算摘要与动态导入之间。
   只接管正在导入的精确 URL，仍用文件 URL 解析相对导入与 import.meta.url；
   其余模块走 Node 原有加载链，导入结束即释放源码。 */
const pendingSources = new Map();
registerHooks({
  load(url, context, nextLoad) {
    const source = pendingSources.get(url);
    if (source !== undefined) return { format: 'module', source, shortCircuit: true };
    return nextLoad(url, context);
  },
});

/* Node 按 URL 缓存模块。内容未变时继续复用，不依赖时间戳或文件长度。 */
async function importFile(file) {
  const url = pathToFileURL(file);
  const source = fs.readFileSync(file);
  const version = createHash('sha256').update(source).digest('hex');
  url.searchParams.set('version', version);
  pendingSources.set(url.href, source);
  try {
    return await import(url.href);
  } finally {
    pendingSources.delete(url.href);
  }
}

/** 册清单（顺序即读者看到的顺序） */
async function manifest() {
  const { default: ids } = await importFile(path.join(BOOKS, 'index.js'));
  if (!Array.isArray(ids) || !ids.length || ids.some((id) => typeof id !== 'string' || !id.trim())) {
    throw new Error('册清单须列出至少一个有效册 id，请检查 src/content/books/index.js');
  }
  if (new Set(ids).size !== ids.length) throw new Error('册清单里有重复 id，请检查 src/content/books/index.js');
  return ids;
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
    if (meta.adultTip !== undefined && typeof meta.adultTip !== 'string') {
      throw new Error(id + '/book.json 的 adultTip 必须是文字，可省略以使用通用共读提示');
    }
    const specDir = path.join(dir, 'specs');
    const files = fs.existsSync(specDir)
      ? fs.readdirSync(specDir).filter((f) => f.endsWith('.js')).sort()
      : [];
    if (!files.length) throw new Error(`册 ${id} 的 specs/ 缺少跨页文件，请检查清单和册目录`);
    const pages = [];
    for (const file of files) {
      const mod = await importFile(path.join(specDir, file));
      const list = mod.default?.pages;
      if (!Array.isArray(list) || !list.length) throw new Error(id + "/" + file + " 缺少跨页 pages");
      for (const spec of withSpreadScene(list, mod.default.scene)) {
        if (!spec || !spec.id) {
          throw new Error(`${id}/${file} 里有页面缺少 id`);
        }
        pages.push({ ...spec, bg: mod.default.background ? { ...mod.default.background, ...spec.bg } : spec.bg, book: id, file, spread: file.replace(/\.js$/, "") });
      }
    }
    validateResponses(pages);
    for (const page of pages) {
      const hotspots = Array.isArray(page.hotspot) ? page.hotspot : [page.hotspot].filter(Boolean);
      if (hotspots.some(h => ['again', 'yawn'].includes(h.action)) && !page.exit) {
        throw new Error(id + '/' + page.id + ' 缺少故事出口 exit');
      }
      const targets = new Set(['page']);
      if (page.char) targets.add('character');
      if (page.bg) targets.add('effects');
      if (page.text?.sound) targets.add('sound');
      for (const prop of page.props || []) {
        if (!prop.id || targets.has(prop.id)) throw new Error(id + '/' + page.id + ' 道具缺少唯一 id');
        targets.add(prop.id);
      }
      for (const hotspot of hotspots) {
        if (!actionNames.includes(hotspot.action)) throw new Error(id + '/' + page.id + ' 未知动作 ' + hotspot.action);
        if (!targets.has(hotspot.targetId)) throw new Error(id + '/' + page.id + ' 热区 targetId 不存在：' + hotspot.targetId);
      }
      if (page.exit && !pages.some(target => target.id === page.exit)) {
        throw new Error(id + '/' + page.id + ' 的故事出口不存在：' + page.exit);
      }
    }
    books.push({ id, meta, pages, spreads: physicalSpreads(pages) });
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
  for (const number of page.numbers || []) out.push(number.text);
  if (page.aria) out.push(page.aria);
  return out;
}

/** 与浮层同源的界面文字，按文楷分类供制作工具核对；旧元数据可省略 adultTip。 */
export function interfaceTexts(books) {
  return [
    { book: '', id: '界面', items: [{ key: 'adult', lines: [
      ...Object.values(readerLabels), ...readerModes.flatMap(mode => [mode.label, mode.hint]),
    ] }] },
    ...books.map(book => ({ book: book.id, id: '界面', items: [{ key: 'adult', lines:
      [book.meta.title, book.meta.subtitle, book.meta.adultTip].filter(text => typeof text === 'string' && text),
    }] })),
  ];
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
