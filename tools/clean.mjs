/* 清理产物目录（dist/）。平时构建不清空，截图与 PDF 留在里面。
   用法：node tools/clean.mjs */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
if (fs.existsSync(dist)) {
  fs.rmSync(dist, { recursive: true, force: true });
  console.log('✓ 已清空 dist/');
} else {
  console.log('· dist/ 本来就不存在');
}
