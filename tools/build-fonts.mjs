/* 字体子集：按全书实际用字，从 @fontsource 的源文件切出 woff2 子集。
   用法：
     node tools/build-fonts.mjs           切子集（字符集、源字体哈希及产物一致时跳过）
     node tools/build-fonts.mjs --check   只检查子集是不是最新的（过期就报错退出）
   产物：src/fonts/*.woff2，构建时以 base64 内联进单文件 HTML。 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { loadBooks, textsOfAll, interfaceTexts } from './load-specs.mjs';

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
  const books = await loadBooks();
  const pages = books.flatMap(book => book.pages);
  const chars = new Set();

  for (const page of pages) {
    for (const text of textsOfAll(page)) {
      for (const ch of text) chars.add(ch);
    }
  }
  for (const row of interfaceTexts(books)) {
    for (const item of row.items) for (const line of item.lines) {
      for (const ch of line) chars.add(ch);
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
  const checkOnly = process.argv.includes('--check');
  const hash = crypto.createHash('sha1').update(chars).digest('hex');
  console.log(`字符集：${[...chars].length} 个字符`);

  for (const source of SOURCES) {
    if (!fs.existsSync(source.file)) {
      console.error(`✗ 找不到源字体：${source.file}`);
      process.exitCode = 1;
      continue;
    }
    const out = path.join(fontsDir, source.out);
    const stampFile = path.join(fontsDir, `.${source.out}.stamp`);
    const stamp = fs.existsSync(stampFile) ? fs.readFileSync(stampFile, 'utf8') : '';
    /* 同一个戳记用于生成和检查；升级源字体也须重切。 */
    const srcHash = crypto
      .createHash('sha1')
      .update(fs.readFileSync(source.file))
      .digest('hex');
    const current = `${hash}:${srcHash}`;

    const subset = fs.statSync(out, { throwIfNoEntry: false });
    if (stamp === current && subset?.isFile() && subset.size > 0) {
      console.log(`· ${source.out} 已是最新（${(subset.size / 1024).toFixed(1)} KB），跳过`);
      continue;
    }

    if (checkOnly) {
      console.error(`✗ ${source.out} 缺失或过期，请运行 npm run fonts`);
      process.exitCode = 1;
      continue;
    }

    console.log(`· 切子集 ${source.name} …`);
    const work = fs.mkdtempSync(path.join(fontsDir, '.subset-'));
    try {
      const textFile = path.join(work, 'charset.txt');
      const subsetFile = path.join(work, source.out);
      fs.writeFileSync(textFile, chars, 'utf8');
      execFileSync(
        'python',
        [
          '-m',
          'fontTools.subset',
          source.file,
          `--text-file=${textFile}`,
          `--output-file=${subsetFile}`,
          '--flavor=woff2',
          '--layout-features=*',
          '--name-IDs=*',
          '--notdef-outline',
        ],
        { stdio: ['ignore', 'ignore', 'inherit'] }
      );
      fs.renameSync(subsetFile, out);
      fs.writeFileSync(stampFile, current, 'utf8');
    } finally {
      fs.rmSync(work, { recursive: true, force: true });
    }
    console.log(`  ✓ ${source.out}  ${(fs.statSync(out).size / 1024).toFixed(1)} KB`);
  }
}

main();
