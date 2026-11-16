/* 从当前书稿刷新本批审稿快照的数据区，保留前面的人工故事与节奏审阅。 */
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { loadBooks } from './load-specs.mjs';
import { readerLabels } from '../src/content/reader-ui.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const directory = path.join(root, 'docs/superpowers/specs');
const check = process.argv.includes('--check');
const books = await loadBooks();
const text = value => Array.isArray(value)
  ? value.map(line => line === '' ? '（空行）' : line).join('<br>')
  : value === '' ? '（空串）' : String(value);
const code = value => '`' + JSON.stringify(value).replace(/`/g, '&#96;') + '`';
const labels = { narration: '旁白', sound: '大字／拟声词', prompt: '提示', adult: '成人文字' };
let failed = false;
for (const book of books) {
  const file = path.join(directory, '2026-11-13-manuscript-' + book.id + '.md');
  const original = fs.existsSync(file) ? fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n') :
    '# 《' + book.meta.title + '》完整文字剧本\n\n';
  const heading = '## 逐跨页剧本';
  const prefix = original.includes(heading) ? original.slice(0, original.indexOf(heading)) : original;
  const lines = [heading, '',
    '本节由 `node tools/manuscript.mjs` 从当前工作区生成；人工故事与节奏审阅保留在前文。画面记录是书稿数据，不代替看图；动作记录是声明，不代替操作验收。', '',
    '**本册屏幕共读提示**：' + (book.meta.adultTip || readerLabels.adultDefault), ''];
  for (const group of book.spreads) {
    const first = Number(group[0].id.slice(1));
    const body = first >= 4 && first <= 58;
    const label = group.map(page => page.id).join('｜');
    lines.push('### ' + (body ? 'S' + String((first - 4) / 2 + 1).padStart(2, '0') + ' · ' : '') +
      label + (body ? '' : ' · 前后置'), '',
      '来源：' + [...new Set(group.map(page => page.file))].map(name =>
        `[${name}](../../../src/content/books/${book.id}/specs/${name})`).join('、') + '。', '');
    for (const [side, page] of group.entries()) {
      lines.push(`#### ${page.id} · ${group.length === 1 ? '单页' : side === 0 ? '左页' : '右页'}` +
        (page.screen === false ? '（仅纸书）' : ''), '');
      lines.push('- **画面记录**：背景 ' + code(page.bg || {}) + '；角色 ' + code(page.char || null) +
        '；道具 ' + code(page.props || []) + (page.scene ? '；共享场景 ' + code(page.scene) : '') + (page.framing ? '；取景 ' + code(page.framing) : '') + '。');
      for (const [key, item] of Object.entries(page.text || {})) {
        if (!item) continue;
        lines.push(`- **${labels[key] || key}**：${text(item.text)}`);
        if (item.print !== undefined && item.print !== null) {
          lines.push(`- **纸书${labels[key] || key}**：${text(item.print)}`);
        }
      }
      for (const [index, number] of (page.numbers || []).entries()) {
        lines.push(`- **数字 ${index + 1}**：${code(number.text)}；初始${number.on ? '显示' : '隐藏'}；位置 ${code(number.at)}。`);
      }
      if (page.aria) lines.push('- **原朗读稿（核对用）**：' + page.aria);
      const hotspots = (Array.isArray(page.hotspot) ? page.hotspot : [page.hotspot]).filter(Boolean);
      if (page.reading) lines.push('- **共读分类**：' + code(page.reading) + (page.responseTo ? '；紧邻承接 ' + page.responseTo : '') + '。');
      if (!hotspots.length) lines.push(page.reading ? '- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。' : '- **屏幕动作**：未声明专属热区；共读与翻页，角色可有通用反馈。');
      for (const hotspot of hotspots) lines.push(
        `- **屏幕动作**：${hotspot.label}；动作 ${code(hotspot.action)}；对象 ${code(hotspot.targetId)}；` +
        `热区 ${code(hotspot.at)}，大小 ${hotspot.size}。`
      );
      if (page.trap) lines.push('- **完成条件**：组内任务等待时，点空白不能向前跳过。');
      if (page.exit) lines.push('- **故事出口**：' + page.exit + '。');
      if (hotspots.length) {
        const next = book.pages[book.pages.indexOf(page) + 1];
        if (next) lines.push(`- **紧邻后页核对**：${next.id} 旁白：${text(next.text?.narration?.text || '（无旁白）')}`);
      }
      lines.push('');
    }
  }
  const sources = ['src/content/reader-ui.js', `src/content/books/${book.id}/book.json`,
    ...[...new Set(book.pages.map(page => page.file))].map(name => `src/content/books/${book.id}/specs/${name}`)];
  const hash = createHash('sha256');
  for (const source of sources) hash.update(source + '\n')
    .update(fs.readFileSync(path.join(root, source), 'utf8').replace(/\r\n/g, '\n')).update('\n');
  lines.push('## 快照溯源', '', `本册来源 SHA-256：\`${hash.digest('hex')}\`。` +
    '摘要依次连接 reader-ui.js、book.json 与读取顺序下去重的书稿文件的“仓库相对路径 + 换行 + 统一 LF 的 UTF-8 文本 + 换行”。' +
    '数据区含全部数字与初始显隐；内容变更后重新运行生成命令。设计契约仍以设计规格为准。', '');
  const updated = prefix + lines.join('\n');
  if (check && original !== updated) {
    console.error(`✗ ${book.id} 审稿快照与当前书稿不一致，请运行 node tools/manuscript.mjs`);
    failed = true;
  } else if (!check && original !== updated) fs.writeFileSync(file, updated);
}
if (failed) process.exitCode = 1;
else console.log(`✓ ${books.length} 册审稿快照${check ? '与当前书稿一致' : '已同步'}，含数字及初始显隐`);
