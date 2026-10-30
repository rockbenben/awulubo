/* 字体子集：按全书实际用字，从 @fontsource 的源文件切出 woff2 子集。
   用法：node tools/build-fonts.mjs        （字符集没变且产物比源新时自动跳过）
   产物：src/fonts/*.woff2，构建时以 base64 内联进单文件 HTML。 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { loadSpecs, textsOfAll } from './load-specs.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'src');
const fontsDir = path.join(src, 'fonts');
const nodeModules = path.join(root, 'node_modules');

const SOURCES = [
  {
    name: 'zcool-kuaile',
    out: 'zcool-kuaile-subset.woff2',
    file: path.join(
      nodeModules,
      '@fontsource/zcool-kuaile/files/zcool-kuaile-chinese-simplified-400-normal.woff2'
    ),
  },
  {
    name: 'lxgw-wenkai',
    out: 'lxgw-wenkai-subset.woff2',
    file: path.join(
      nodeModules,
      '@fontsource/lxgw-wenkai/files/lxgw-wenkai-latin-500-normal.woff2'
    ),
  },
];

/* 收集全书真正会被渲染出来的字符 */
async function collectChars() {
  const pages = await loadSpecs();
  const chars = new Set();

  for (const page of pages) {
    for (const text of textsOfAll(page)) {
      for (const ch of text) chars.add(ch);
    }
  }

  /* 标点与 ASCII 也留着 */
  '，。！？、……—《》“”‘’：；·　 abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    .split('')
    .forEach((c) => chars.add(c));

  return [...chars].sort().join('');
}

async function main() {
  const chars = await collectChars();
  const textFile = path.join(fontsDir, '.charset.txt');
  fs.mkdirSync(fontsDir, { recursive: true });
  fs.writeFileSync(textFile, chars, 'utf8');

  console.log(`字符集：${[...chars].length} 个字符`);

  for (const source of SOURCES) {
    if (!fs.existsSync(source.file)) {
      console.error(`✗ 找不到源字体：${source.file}`);
      process.exitCode = 1;
      continue;
    }
    const out = path.join(fontsDir, source.out);
    const srcTime = fs.statSync(source.file).mtimeMs;
    const stampFile = path.join(fontsDir, `.${source.out}.stamp`);
    const stamp = fs.existsSync(stampFile) ? fs.readFileSync(stampFile, 'utf8') : '';
    /* 用字符集本身的哈希，不能只用长度：改一个字换一个字，长度不变也要重切 */
    const current = `${crypto.createHash('sha1').update(chars).digest('hex')}:${srcTime}`;

    if (stamp === current && fs.existsSync(out) && fs.statSync(out).mtimeMs >= srcTime) {
      console.log(`· ${source.out} 已是最新（${(fs.statSync(out).size / 1024).toFixed(1)} KB），跳过`);
      continue;
    }

    console.log(`· 切子集 ${source.name} …`);
    execFileSync(
      'python',
      [
        '-m',
        'fontTools.subset',
        source.file,
        `--text-file=${textFile}`,
        `--output-file=${out}`,
        '--flavor=woff2',
        '--layout-features=*',
        '--name-IDs=*',
        '--notdef-outline',
      ],
      { stdio: ['ignore', 'ignore', 'inherit'] }
    );
    fs.writeFileSync(stampFile, current, 'utf8');
    console.log(`  ✓ ${source.out}  ${(fs.statSync(out).size / 1024).toFixed(1)} KB`);
  }

  fs.rmSync(textFile, { force: true });
}

main();
