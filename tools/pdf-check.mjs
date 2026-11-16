/* 两种导出入口共用的实际 PDF 验收，解析依赖只用于制作环境。 */
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const checker = fileURLToPath(new URL('./check-pdf.py', import.meta.url));

export function verifyPdf(file, { pages, widthMm, heightMm, title }) {
  try {
    const output = execFileSync('python', [
      '-X', 'utf8', checker, file,
      '--pages', String(pages), '--width-mm', String(widthMm), '--height-mm', String(heightMm),
      '--title', title,
    ], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    return JSON.parse(output);
  } catch (error) {
    throw new Error(String(error.stderr || error.message).trim());
  }
}

/* 验收通过才替换同名成品，失败时保留上一次可用的 PDF。 */
export function saveVerifiedPdf(file, bytes, expected) {
  const work = fs.mkdtempSync(path.join(path.dirname(file), '.pdf-'));
  const candidate = path.join(work, path.basename(file));
  try {
    fs.writeFileSync(candidate, bytes);
    const result = verifyPdf(candidate, expected);
    fs.renameSync(candidate, file);
    return result;
  } finally {
    fs.rmSync(work, { recursive: true, force: true });
  }
}
