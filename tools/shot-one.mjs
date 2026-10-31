/* 重截指定页（调试用）：node tools/shot-one.mjs p11 */
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const id = process.argv[2];
if (!id) {
  console.error('用法：node tools/shot-one.mjs p11');
  process.exit(1);
}
const SKILL =
  process.env.HTML_SHOT_DIR ||
  'D:/Backup/Libraries/Documents/GitHub/Projects/seldom/aishort-skills/skills/html-shot';

execFileSync(
  'node',
  [
    path.join(SKILL, 'render.mjs'),
    path.join('dist', 'proof.html'),
    path.join('dist', 'shots', `${id}.png`),
    '--selector',
    `[data-id='${id}']`,
    '--dpr',
    '2',
    '--offline',
    '--wait',
    '300',
  ],
  { stdio: ['ignore', 'ignore', 'inherit'] }
);
console.log(`✓ ${id}.png`);
