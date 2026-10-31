/* 逐页截图：调用 html-shot 技能渲染，产出 1440 × 1440 的 PNG。
   技能目录用 HTML_SHOT_DIR 指定，默认取本机已知路径。
   用法：
     node tools/shots.mjs            # 屏幕版（dist/proof.html）
     node tools/shots.mjs --print    # 印刷版（dist/print.html，216mm 版式）
*/
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadSpecs } from './load-specs.mjs';
import { newestMtime } from './layout-constants.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const pages = await loadSpecs();

const SKILL =
  process.env.HTML_SHOT_DIR ||
  'D:/Backup/Libraries/Documents/GitHub/Projects/seldom/aishort-skills/skills/html-shot';

const isPrint = process.argv.includes('--print');
const input = path.join(dist, isPrint ? 'print.html' : 'proof.html');
const outDir = path.join(dist, isPrint ? 'print-shots' : 'shots');

if (!fs.existsSync(path.join(SKILL, 'render.mjs'))) {
  console.error(`✗ 找不到 html-shot 技能：${SKILL}`);
  console.error('  用 HTML_SHOT_DIR 指定，或先安装该技能。');
  process.exit(1);
}
if (!fs.existsSync(input)) {
  console.error('✗ 先跑 npm run build');
  process.exit(1);
}

/* 产物必须比源文件新：否则截的是上一版的图，
   而 check:shots 只看"每页有没有内容"，旧图照样是绿的 —— 等于拿旧图当新图交付。 */
const srcNewest = newestMtime(path.join(root, 'src'));
if (srcNewest > fs.statSync(input).mtimeMs) {
  console.error('✗ src/ 比 ' + path.basename(input) + ' 新 —— 先跑 npm run build（否则截的是旧图）');
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

/* 清掉上一版的残留截图：删过页之后旧图还躺在目录里，
   联系表和闸门都会把它算进去——"多出来的一张"看着像证据，其实是陈旧产物。 */
const keep = new Set(pages.map((p) => `${p.id}.png`));
for (const file of fs.readdirSync(outDir)) {
  if (!file.endsWith('.png')) continue;
  if (keep.has(file)) continue;
  fs.unlinkSync(path.join(outDir, file));
  console.log(`- 清理过期截图 ${file}`);
}

for (const page of pages) {
  const out = path.join(outDir, `${page.id}.png`);
  execFileSync(
    'node',
    [
      path.join(SKILL, 'render.mjs'),
      input,
      out,
      '--selector',
      `[data-id='${page.id}']`,
      '--dpr',
      isPrint ? '1.5' : '2',
      '--offline',
      '--wait',
      '300',
    ],
    { stdio: ['ignore', 'ignore', 'inherit'] }
  );
  console.log(`✓ ${path.relative(root, out)}`);
}

console.log(`\n共 ${pages.length} 张，输出在 ${path.relative(root, outDir)}/`);

/* 页面清单：检查脚本靠它知道"该有多少张、哪几页的背景必须满版"。
   不写死页数——页数变了，这里跟着变。 */
const manifest = pages.map((p) => ({
  id: p.id,
  wash: Boolean(p.bg && p.bg.wash),
  kind: (p.bg && p.bg.kind) || 'none',
}));
fs.writeFileSync(
  path.join(outDir, 'manifest.json'),
  JSON.stringify(manifest, null, 2) + '\n',
  'utf8'
);
