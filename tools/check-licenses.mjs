/* 授权闸门。查三件事：
     1. 打进书里的每一套字体都是明确可商用的许可；
     2. 仓库的授权分层写对了——代码 MIT、字体 OFL 1.1、作品内容 CC BY-NC-ND 4.0；
     3. 随仓库出去的东西里没有本机绝对路径。
   用法：node tools/check-licenses.mjs
   换字体、动授权分层之后，这条要重新跑一遍再进构建。 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));

/* 允许进到出版物里的许可 */
const ALLOWED = [
  { name: 'SIL Open Font License 1.1', re: /SIL Open Font License,?\s*Version 1\.1/i },
  { name: 'SIL Open Font License 1.0', re: /SIL Open Font License,?\s*Version 1\.0/i },
  { name: 'Apache License 2.0', re: /Apache License,? Version 2\.0/i },
  { name: 'MIT', re: /\bMIT License\b/i },
];

/* 明确不允许的表述（踩线即失败） */
const FORBIDDEN = [
  /personal use only/i,
  /非商用/,
  /不得用于商业/i,
  /not.*commercial use/i,
];

const problems = [];
const notes = [];

/* ---- 授权分层（2026-11-01 加）----
   仓库分三层：代码 MIT、字体 OFL 1.1、作品内容 CC BY-NC-ND 4.0。
   以前整仓一份 MIT——那等于把噜啵永久送进公有领域，
   而著作权许可是**不可撤回**的：按 MIT 发出去，收到的每一份都还带着商用权，
   之后再改协议也追不回来。所以这道闸门守住三件事：
     1. 两份许可文件都在、都写对了；
     2. 作品内容没有悄悄回到 MIT；
     3. 随仓库出去的东西里没有本机绝对路径。 */

/* 作品内容的适用范围——这张表是「仓库里哪些东西不是 MIT」的单一事实源。
   往内容目录里加新目录时，这里要一起加，否则闸门不会知道该罩住它。 */
const CONTENT_PATHS = [
  'src/components/',
  'src/content/',
  'docs/superpowers/specs/',
  'docs/images/',
  'docs/archive/M0-样张记录.md',
];

/* src/ 下每个顶层目录归哪一层。加了新目录而忘了归类 → 闸门报错。 */
const SRC_LAYERS = {
  js: '代码（MIT）',
  css: '代码（MIT）',
  templates: '代码（MIT）',
  fonts: '字体（OFL 1.1）',
  components: '作品内容（CC BY-NC-ND 4.0）',
  content: '作品内容（CC BY-NC-ND 4.0）',
};

/* 本机绝对路径里，这几个是正当的（讲怎么装软件），放行。 */
const PATH_ALLOW = ['C:/Program Files', 'C:/Program Files (x86)'];

/* 盘符绝对路径：字母 + 冒号 + 斜杠。
   前面加负向后顾：网址里的冒号前是字母，不算盘符。
   ⚠️ 这段源码本身也在扫描范围内——所以**别在这份文件里写出真实的盘符路径当例子**，
   否则这道闸门会把自己扫红。 */
const DRIVE_PATH = /(?<![A-Za-z0-9])[A-Za-z]:[\\/]/;

/* 扫哪些文件：跟 git 跟踪的一致（那就是会进仓库、会公开的东西）。 */
const TEXT_EXT = new Set([
  '.md', '.mjs', '.ts', '.js', '.json', '.yml', '.yaml', '.html', '.css', '.txt',
  '.py', '.svg', '.sh', '.conf', '.stamp',
]);

const SKIP_DIRS = new Set(['node_modules', 'dist', 'dist-print', 'dist-site', '.git', 'reference', 'shots']);

function read(file) {
  const p = path.join(root, file);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null;
}

/* 取某个二级标题下的正文。
   ⚠️ 别用 `/^##\s*标题[\s\S]*?(?=\n##\s|$)/m` 那种写法——
   `m` 旗标下的 `$` 匹配的是**行尾**，非贪婪的段落会在标题行就停住，
   拿到的只有标题本身，于是「这一节里有没有提到 X」永远判成没有。 */
function section(text, heading) {
  const m = text.match(new RegExp('^##\\s+' + heading + '\\s*$', 'm'));
  if (!m) return null;
  const rest = text.slice(m.index + m[0].length);
  const next = rest.search(/^##\s+/m);
  return next === -1 ? rest : rest.slice(0, next);
}

function trackedFiles() {
  try {
    const out = execFileSync('git', ['ls-files', '-z'], {
      cwd: root,
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
    });
    return out.split('\0').filter(Boolean);
  } catch {
    return null; // 不是 git 仓库就退回去自己走目录
  }
}

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') && entry.name !== '.github') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(full, acc);
    } else {
      acc.push(path.relative(root, full).split(path.sep).join('/'));
    }
  }
  return acc;
}

/* ---- 授权分层 ---- */
function checkLayering() {
  const mit = read('LICENSE');
  if (!mit) {
    problems.push('缺 LICENSE 文件（代码层是 MIT）');
  } else {
    if (!/MIT License/i.test(mit)) {
      problems.push('LICENSE 里没有 MIT License 标题——代码层的授权不明');
    }
    if (!/Copyright \(c\) \d{4}/i.test(mit)) {
      problems.push('LICENSE 里没有版权行');
    }
  }

  const content = read('LICENSE-CONTENT.md');
  if (!content) {
    problems.push('缺 LICENSE-CONTENT.md（作品内容层是 CC BY-NC-ND 4.0）');
    return;
  }
  if (!/CC BY-NC-ND 4\.0/.test(content)) {
    problems.push('LICENSE-CONTENT.md 里没有写明 CC BY-NC-ND 4.0');
  }
  if (!/creativecommons\.org\/licenses\/by-nc-nd\/4\.0/.test(content)) {
    problems.push('LICENSE-CONTENT.md 里没有指向 CC BY-NC-ND 4.0 全文的链接');
  }
  for (const p of CONTENT_PATHS) {
    if (!content.includes(p)) {
      problems.push(
        `LICENSE-CONTENT.md 的适用范围里没写 ${p}` +
          '——这个目录里的作品会被当成 MIT 放出去'
      );
    }
  }
  if (!/\]\(LICENSE\)/.test(content)) {
    problems.push('LICENSE-CONTENT.md 没有链回 LICENSE（MIT），读者看不出这是分层许可');
  }

  /* src/ 下每个顶层目录都要归了类 */
  const srcDir = path.join(root, 'src');
  if (fs.existsSync(srcDir)) {
    for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      if (!SRC_LAYERS[entry.name]) {
        problems.push(
          `src/${entry.name}/ 没有归到授权分层里` +
            `（已归类：${Object.entries(SRC_LAYERS).map(([k, v]) => `src/${k}/=${v}`).join('、')}）` +
            '——新目录要在这里和 LICENSE-CONTENT.md 里各写一次'
        );
      }
    }
  }

  /* README 与 LICENSES.md 得把分层讲出来，否则读者会以为整仓 MIT */
  const readme = read('README.md') || '';
  if (!readme.includes('LICENSE-CONTENT.md')) {
    problems.push('README 里没有指向 LICENSE-CONTENT.md 的入口——读者会以为整仓都是 MIT');
  }
  const authSec = section(readme, '授权');
  if (authSec && !authSec.includes('LICENSE-CONTENT.md')) {
    problems.push('README 的「授权」一节没提作品内容那层——只写 MIT 会被读成整仓 MIT');
  }

  const licenses = read('LICENSES.md') || '';
  if (!section(licenses, '授权分层')) {
    problems.push('LICENSES.md 里没有「授权分层」一节');
  }
  const graphSec = section(licenses, '图形');
  if (graphSec && !/CC BY-NC-ND/.test(graphSec)) {
    problems.push('LICENSES.md 的「图形」一节没写 CC BY-NC-ND 4.0');
  }
}

/* ---- 本机绝对路径 ---- */
function checkLeaks() {
  const files = trackedFiles() ?? walk(root);
  let checked = 0;
  for (const rel of files) {
    if (!TEXT_EXT.has(path.extname(rel).toLowerCase())) continue;
    const full = path.join(root, rel);
    if (!fs.existsSync(full)) continue;
    let text;
    try {
      text = fs.readFileSync(full, 'utf8');
    } catch {
      continue;
    }
    checked++;
    const lines = text.split(/\r?\n/);
    lines.forEach((line, i) => {
      /* 先把放行的路径抠掉再测：否则一行里既有正当路径又有真泄漏，会被一起放过 */
      const scrubbed = PATH_ALLOW.reduce((s, a) => s.split(a).join(''), line);
      if (!DRIVE_PATH.test(scrubbed)) return;
      problems.push(
        `${rel}:${i + 1} 有本机绝对路径——公开仓库会把本机目录结构发出去：` +
          `「${line.trim().slice(0, 60)}」`
      );
    });
  }
  notes.push(`✓ 泄漏检查：${checked} 个文本文件，没有本机绝对路径`);
}

function fontPackages() {
  const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
  return Object.keys(deps).filter((n) => n.startsWith('@fontsource/'));
}

function licenseText(dir) {
  const lic = fs
    .readdirSync(dir)
    .filter((f) => /^licen[cs]e/i.test(f))
    .map((f) => path.join(dir, f));
  if (!lic.length) return null;
  return fs.readFileSync(lic[0], 'utf8');
}

/* 打进书里的字体家族 → 它应该来自哪个字体包。
   靠"第一个词包含"配对是靠运气过的：'ZCOOL KuaiLe' 的第一个词 'zcool'
   恰好是 'zcool-kuaile' 的前缀——换个家族名就配不上了，
   而"CSS 里引用了一套没人核验过的字体"正是这道闸门要拦的事。
   这里写死对照表，配不上就报错。 */
const FAMILY_PACKAGE = {
  'ZCOOL KuaiLe': '@fontsource/zcool-kuaile',
  'LXGW WenKai': '@fontsource/lxgw-wenkai',
};

function cssFiles() {
  const dir = path.join(root, 'src/css');
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.css'))
    .map((f) => path.join(dir, f));
}

function main() {
  const packages = fontPackages();
  if (!packages.length) {
    console.error('✗ package.json 里没有字体包');
    process.exit(1);
  }

  const verified = new Set();

  for (const name of packages) {
    const dir = path.join(root, 'node_modules', name);
    if (!fs.existsSync(dir)) {
      problems.push(`${name} 未安装`);
      continue;
    }
    const text = licenseText(dir);
    if (!text) {
      problems.push(`${name} 找不到 LICENSE 文件，无法确认授权`);
      continue;
    }
    const flat = text.replace(/\s+/g, ' ');

    const hit = ALLOWED.find((l) => l.re.test(flat));
    if (!hit) {
      problems.push(`${name} 的许可不在白名单里（白名单：${ALLOWED.map((l) => l.name).join('、')}）`);
      continue;
    }
    const bad = FORBIDDEN.find((f) => f.test(flat));
    if (bad) {
      problems.push(`${name} 的许可里出现限制性表述：${bad}`);
      continue;
    }

    /* OFL 的保留字体名：声明了就必须给子集改名，否则不能出版 */
    const rfn = flat.match(/with Reserved Font Name '([^']+)'/i);
    if (rfn) {
      problems.push(
        `${name} 声明了保留字体名「${rfn[1]}」，子集必须改名后才能出版` +
          `（当前子集仍用原名，需改 name 表与 CSS 的 font-family）`
      );
      continue;
    }

    verified.add(name);
    notes.push(`✓ ${name}：${hit.name}，无保留字体名，可商用、可嵌入出版物`);
  }

  /* 子集产物必须在位 */
  const fontsDir = path.join(root, 'src/fonts');
  if (!fs.existsSync(fontsDir) || !fs.readdirSync(fontsDir).some((f) => f.endsWith('.woff2'))) {
    problems.push('src/fonts/ 里没有字体子集，先跑 npm run fonts');
  }

  /* **每一段 @font-face 都要核过**——
     这才是真正决定"书里印的是哪套字体"的地方。
     以前这里只扫 tokens.css / book.css / templates.css，
     而带 `src: url('../fonts/*.woff2')` 的 @font-face 写在 fonts.css 里，
     压根没被扫到：换一套没核验过的字体进去，闸门照样全绿。 */
  const faces = [];
  for (const file of cssFiles()) {
    const css = fs.readFileSync(file, 'utf8');
    const re = /@font-face\s*\{([^}]*)\}/g;
    let m;
    while ((m = re.exec(css))) {
      const block = m[1];
      const family = (block.match(/font-family:\s*'([^']+)'/) || [])[1];
      const src = (block.match(/url\('?([^')]+)'?\)/) || [])[1];
      faces.push({ file: path.basename(file), family, src });
    }
  }
  if (!faces.length) {
    problems.push('CSS 里一段 @font-face 都没有——书会用系统字体');
  }
  for (const face of faces) {
    if (!face.family) {
      problems.push(`${face.file} 里有 @font-face 写不出 font-family`);
      continue;
    }
    const want = FAMILY_PACKAGE[face.family];
    if (!want) {
      problems.push(
        `${face.file} 里的字体家族「${face.family}」没有登记来源包` +
          `（已登记：${Object.keys(FAMILY_PACKAGE).join('、')}）`
      );
      continue;
    }
    if (!verified.has(want)) {
      problems.push(`${face.file} 用了「${face.family}」，但 ${want} 没通过授权核验`);
    }
    if (face.src) {
      const target = path.resolve(path.dirname(path.join(root, 'src/css', face.file)), face.src);
      if (!fs.existsSync(target)) {
        problems.push(`${face.file} 里的「${face.family}」指向不存在的文件：${face.src}`);
      }
    } else {
      problems.push(`${face.file} 里的「${face.family}」没有 src url`);
    }
  }

  /* 页面里用到的字体家族，必须有对应的 @font-face 段 */
  const declared = new Set(faces.map((f) => f.family));
  for (const file of cssFiles()) {
    const css = fs.readFileSync(file, 'utf8');
    for (const used of css.match(/font-family:\s*'([^']+)'/g) || []) {
      const family = used.match(/'([^']+)'/)[1];
      if (!declared.has(family) && FAMILY_PACKAGE[family]) {
        problems.push(`CSS 用了 ${family}，但没有对应的 @font-face 段`);
      }
    }
  }

  /* 授权分层与泄漏：跟字体是三件独立的事，分开报 */
  checkLayering();
  checkLeaks();

  notes.forEach((n) => console.log(`  ${n}`));
  if (problems.length) {
    console.error('\n✗ 授权检查未通过：');
    problems.forEach((p) => console.error(`  - ${p}`));
    process.exit(1);
  }
  console.log('✓ 授权检查通过：字体可商用；代码 MIT、作品内容 CC BY-NC-ND 4.0 分层写对了；没有本机路径泄漏');
}

main();
