/* 发布前的闸门：把「发布」这个动作拆成几件能自动查的事。
   用法：node tools/check-publish.mjs

   为什么单独一道：`npm run check` 管的是「仓库里的东西对不对」，
   这道管的是「**发出去的那一刻**会不会出事」——
   印刷 PDF 一旦推上公开站就撤不回来，商业授权的联系方式不能是占位符，
   社交预览图也不能没有。这些都是发之前查、发之后就晚了的事。 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { checkSite } from './site-files.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const problems = [];
const notes = [];

function git(args) {
  try {
    return execFileSync('git', args, {
      cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'],
    }).trim();
  } catch {
    return '';
  }
}

/* ---- 1. 发布目标 origin 必须有地址，诊断只输出固定名称 ---- */
const remote = git(['config', '--get', 'remote.origin.url']);
if (!remote) {
  problems.push(
    'git remote origin 缺少有效地址——发布前请配置：' +
      'git remote add origin <仓库地址>'
  );
} else {
  notes.push('✓ git remote：origin');
}

/* ---- 2. 商业授权的联系方式不能是占位符 ---- */
const contentPath = path.join(root, 'LICENSE-CONTENT.md');
if (!fs.existsSync(contentPath)) {
  problems.push('缺 LICENSE-CONTENT.md');
} else {
  const text = fs.readFileSync(contentPath, 'utf8');
  if (text.includes('<!-- CONTACT -->')) {
    problems.push(
      'LICENSE-CONTENT.md 里的商业授权联系方式还是占位符（<!-- CONTACT -->）——' +
        '把那一行换成作者的真实邮箱，商业授权才有着落'
    );
  } else {
    notes.push('✓ 商业授权联系方式已填');
  }
}

/* ---- 3. 检查即将发布的目录 ---- */
try {
  checkSite(path.resolve(root, process.argv[2] || 'dist-site'));
  notes.push('✓ 发布目录只有清单内的五个文件');
} catch (error) {
  problems.push(error.message);
}

/* ---- 4. 社交预览图 ---- */
/* GitHub 只存一张，上传即覆盖、旧图不可找回——所以发之前先确认这张就是想要的。
   认的是仓库里那份（docs/images/og.png）：它进版本库，不会被 clean 掉，
   上传到 Settings → Social preview 的也是它。
   品牌工具另存的 dist/og.png 供本地使用。 */
const og = path.join(root, 'docs/images/og.png');
if (!fs.existsSync(og)) {
  problems.push(
    '缺社交预览图——先跑 npm run og（产物在 docs/images/og.png 与 dist/og.png），' +
      '再手工上传到 Settings → Social preview'
  );
} else {
  const buf = fs.readFileSync(og);
  const w = buf.readUInt32BE(16);
  const h = buf.readUInt32BE(20);
  const kb = Math.round(buf.length / 1024);
  if (w !== 1280 || h !== 640) {
    problems.push(`社交预览图是 ${w}×${h}，GitHub 要 1280×640`);
  }
  if (buf.length >= 1024 * 1024) {
    problems.push(`社交预览图 ${kb} KB，超过 GitHub 的 1 MB 上限`);
  }
  notes.push(`✓ 社交预览图：${w}×${h}，${kb} KB`);
}

notes.forEach((n) => console.log(`  ${n}`));
if (problems.length) {
  console.error('\n✗ 发布前检查未通过：');
  problems.forEach((p) => console.error(`  - ${p}`));
  process.exit(1);
}
console.log('✓ 发布前检查通过');
