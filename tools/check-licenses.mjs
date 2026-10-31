/* 字体授权闸门：确认打进书里的每一套字体都是明确可商用的许可。
   用法：node tools/check-licenses.mjs
   任何字体包换掉之后，这条要重新跑一遍再进构建。 */
import fs from 'node:fs';
import path from 'node:path';
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

  notes.forEach((n) => console.log(`  ${n}`));
  if (problems.length) {
    console.error('\n✗ 授权检查未通过：');
    problems.forEach((p) => console.error(`  - ${p}`));
    process.exit(1);
  }
  console.log('✓ 字体授权检查通过：全部为明确可商用的许可');
}

main();
