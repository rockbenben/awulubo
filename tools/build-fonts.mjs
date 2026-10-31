/* 字体子集：按全书实际用字，从 @fontsource 的源文件切出 woff2 子集。
   用法：
     node tools/build-fonts.mjs           切子集（字符集没变且产物比源新时自动跳过）
     node tools/build-fonts.mjs --check   只检查子集是不是最新的（过期就报错退出）
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

  /* 字符集本身的哈希：改了正文文字就变。
     用哈希而不是长度——改一个字换一个字，长度不变也要重切。 */
  const hash = crypto.createHash('sha1').update(chars).digest('hex');

  /* 只检查：子集是不是按当前字符集切的。
     子集漏字 → 浏览器拿系统字体顶上（STKaiti/SimSun…），那些字体没有商用授权。
     真实发生过：改完文案没重切子集，PDF 里就混进了一套 STKaiti，
     而页面截图上完全看不出来。 */
  if (process.argv.includes('--check')) {
    const stale = [];
    for (const source of SOURCES) {
      const stampFile = path.join(fontsDir, `.${source.out}.stamp`);
      const stamp = fs.existsSync(stampFile) ? fs.readFileSync(stampFile, 'utf8') : '';
      if (!stamp.startsWith(hash)) stale.push(source.out);
    }
    fs.rmSync(textFile, { force: true });
    if (stale.length) {
      console.error(`✗ 字体子集过期：${stale.join('、')}`);
      console.error('  改了正文文字必须重切：npm run fonts（否则漏字会退回未授权的系统字体）');
      process.exit(1);
    }
    console.log('✓ 字体子集与当前用字一致');
    return;
  }

  for (const source of SOURCES) {
    if (!fs.existsSync(source.file)) {
      console.error(`✗ 找不到源字体：${source.file}`);
      process.exitCode = 1;
      continue;
    }
    const out = path.join(fontsDir, source.out);
    const stampFile = path.join(fontsDir, `.${source.out}.stamp`);
    const stamp = fs.existsSync(stampFile) ? fs.readFileSync(stampFile, 'utf8') : '';
    /* 戳记里记两样**跟机器无关**的东西：
         · 字符集的哈希——改了正文文字哈希就变，必须重切；
         · 源字体文件的哈希——@fontsource 升级了就得用新源重切。
       以前记的是源字体的 mtime：mtime 是"这台机器上装的时候"，
       换个机器装同一个包，mtime 也不同——戳记就没法进仓库，
       而戳记不进仓库，干净检出上 --check 必然判"子集过期"，
       CI 永远是红的。哈希跟机器无关，戳记才能进仓库。
       用字符集长度不够：改一个字换一个字，长度不变也要重切。 */
    const srcHash = crypto
      .createHash('sha1')
      .update(fs.readFileSync(source.file))
      .digest('hex');
    const current = `${hash}:${srcHash}`;

    if (stamp === current && fs.existsSync(out)) {
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
