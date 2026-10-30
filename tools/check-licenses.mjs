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

function main() {
  const packages = fontPackages();
  if (!packages.length) {
    console.error('✗ package.json 里没有字体包');
    process.exit(1);
  }

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

    notes.push(`✓ ${name}：${hit.name}，无保留字体名，可商用、可嵌入出版物`);
  }

  /* 子集产物必须在位，且 CSS 引用的字体名与之一致 */
  const fontsDir = path.join(root, 'src/fonts');
  const css = ['tokens.css', 'book.css', 'templates.css']
    .map((f) => fs.readFileSync(path.join(root, 'src/css', f), 'utf8'))
    .join('\n');
  for (const used of css.match(/font-family:\s*'([^']+)'/g) || []) {
    const family = used.match(/'([^']+)'/)[1];
    if (family.includes('WenKai') || family.includes('KuaiLe') || family.includes('YouZai')) {
      const hit = notes.some((n) => n.includes(family.replace(/\s+/g, ''))) ||
        notes.some((n) => n.toLowerCase().includes(family.split(' ')[0].toLowerCase()));
      if (!hit) {
        problems.push(`CSS 用了 ${family}，但没有对应的已核验字体包`);
      }
    }
  }
  if (!fs.existsSync(fontsDir) || !fs.readdirSync(fontsDir).some((f) => f.endsWith('.woff2'))) {
    problems.push('src/fonts/ 里没有字体子集，先跑 npm run fonts');
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
