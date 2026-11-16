/* 用正常导出命令生成临时成品，验证 PDF 检查和失败时的成品保留。 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { loadBooks } from './load-specs.mjs';
import { saveVerifiedPdf, verifyPdf } from './pdf-check.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'awulubo-pdf-'));
const modules = path.join(dir, 'node_modules');
function run(command, args) {
  const result = spawnSync(command, args, { cwd: dir, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
  if (result.error) throw result.error;
  assert.equal(result.status, 0, result.stdout + result.stderr);
  process.stdout.write(result.stdout);
}

try {
  for (const name of ['src', 'tools', 'package.json']) {
    fs.cpSync(path.join(root, name), path.join(dir, name), { recursive: true });
  }
  fs.mkdirSync(path.join(dir, 'dist'));
  for (const name of ['print.html', 'booklet.html']) {
    const html = fs.readFileSync(path.join(root, 'dist', name), 'utf8');
    // 只在临时成品内加入已知毫米尺寸的色块，量实际 PDF 的缩放与位置。
    // 它不参与排版、不改变页面大小，也不会进入作者的构建产物。
    const marker = '<style>.page::after{content:"";position:absolute;left:10mm;top:10mm;' +
      'width:100mm;height:10mm;background:rgb(1,254,2);z-index:9999;}</style>';
    fs.writeFileSync(path.join(dir, 'dist', name), html.replace('</head>', marker + '</head>'));
  }
  fs.symlinkSync(path.join(root, 'node_modules'), modules, 'junction');
  const book = (await loadBooks())[0];
  const filter = '--book=' + book.id;
  run(process.execPath, ['tools/pdf.mjs', filter]);
  run(process.execPath, ['tools/pdf-booklet.mjs', filter]);
  run(process.execPath, ['tools/pdf-booklet.mjs', filter, '--a3']);
  const single = path.join(dir, 'dist-print', book.id + '.pdf');
  const a4 = path.join(dir, 'dist-print', book.id + '-a4-duplex.pdf');
  const a3 = path.join(dir, 'dist-print', book.id + '-a3-duplex.pdf');
  run('python', ['-X', 'utf8', 'tools/verify-pdf-layout.py', single, a4, a3]);
  run('python', ['-X', 'utf8', 'tools/verify-pdf.py', single, a4, a3, book.meta.title]);

  const original = fs.readFileSync(a3);
  assert.throws(() => saveVerifiedPdf(a3, fs.readFileSync(a4), {
    pages: book.pages.length / 2, widthMm: 420, heightMm: 297,
    title: book.meta.title + '｜A3 双面骑马钉拼版',
  }), /纸型/);
  assert.deepEqual(fs.readFileSync(a3), original, '验收失败不能覆盖已有成品');
  assert.equal(fs.readdirSync(path.dirname(a3)).some(name => name.startsWith('.pdf-')), false);
  // 同名再次导出仍须成功，覆盖 Windows 与 Linux 的文件替换路径。
  saveVerifiedPdf(a3, original, {
    pages: book.pages.length / 2, widthMm: 420, heightMm: 297,
    title: book.meta.title + '｜A3 双面骑马钉拼版',
  });
  verifyPdf(a3, {
    pages: book.pages.length / 2, widthMm: 420, heightMm: 297,
    title: book.meta.title + '｜A3 双面骑马钉拼版',
  });
  console.log('✓ PDF 正常导出命令、失败保留成品、同名替换和临时文件清理通过');

  // 只破坏临时 HTML：恢复未隔离的格子，必须重现 A4 整张额外缩小。
  const booklet = path.join(dir, 'dist', 'booklet.html');
  const html = fs.readFileSync(booklet, 'utf8');
  const broken = html.replace('</head>', '<style>body.booklet .cell{contain:none}</style></head>');
  assert.notEqual(broken, html, '拼版尺寸隔离的破坏没有生效');
  const a4Original = fs.readFileSync(a4);
  fs.writeFileSync(booklet, broken);
  run(process.execPath, ['tools/pdf-booklet.mjs', filter]);
  assert.notDeepEqual(fs.readFileSync(a4), a4Original, '破坏后实际 PDF 没有变化');
  const failure = spawnSync('python', [
    '-X', 'utf8', 'tools/verify-pdf-layout.py', single, a4, a3,
  ], { cwd: dir, encoding: 'utf8' });
  if (failure.error) throw failure.error;
  assert.notEqual(failure.status, 0, '移除尺寸隔离后，实际 PDF 版式回归必须失败');
  assert.match(failure.stdout + failure.stderr, /a4 .*实际校准框/, '失败必须指出 A4 比例或位置错误');
  console.log('✓ 移除拼版尺寸隔离会重现 A4 缩小，实际 PDF 版式回归能拦截');
} finally {
  if (fs.existsSync(modules)) fs.unlinkSync(modules);
  fs.rmSync(dir, { recursive: true, force: true });
}
