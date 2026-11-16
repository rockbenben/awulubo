/* 从已经构建的 dist/ 取出公开文件。所有发布入口共用这张清单。 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const siteFiles = ['index.html', 'print.html', 'proof.html', 'booklet.html', 'edgeone.json'];

function checkFile(file) {
  const stat = fs.lstatSync(file, { throwIfNoEntry: false });
  if (!stat?.isFile() || !stat.size) throw new Error(`缺少有效文件 ${file}，请重新构建并执行 npm run site`);
}

function checkEntries(dir) {
  if (!fs.lstatSync(dir, { throwIfNoEntry: false })?.isDirectory()) {
    throw new Error(`缺少发布目录 ${dir}，请执行 npm run build 和 npm run site`);
  }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isFile() || !siteFiles.includes(entry.name)) {
      throw new Error(`发布目录含清单外文件或目录 ${entry.name}，请将它移出 ${dir}`);
    }
  }
}

export function checkSite(dir) {
  checkEntries(dir);
  for (const name of siteFiles) checkFile(path.join(dir, name));
}

if (path.resolve(process.argv[1] || '') === fileURLToPath(import.meta.url)) {
  const dir = path.join(root, 'dist-site');
  if (!process.argv.includes('--check')) {
    const dist = path.join(root, 'dist');
    for (const name of siteFiles) checkFile(path.join(dist, name));
    fs.mkdirSync(dir, { recursive: true });
    checkEntries(dir);
    for (const name of siteFiles) fs.copyFileSync(path.join(dist, name), path.join(dir, name));
  }
  checkSite(dir);
  console.log(`✓ dist-site/ 公开文件齐全：${siteFiles.join('、')}`);
}
