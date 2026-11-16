/* 固定文件时间及保存交错以稳定复现模块缓存问题，只修改临时副本，不靠延时或重试。 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dir = fs.mkdtempSync(path.join(fs.realpathSync.native(os.tmpdir()), 'awulubo-loader-'));
try {
  fs.cpSync(path.join(root, 'src'), path.join(dir, 'src'), { recursive: true });
  fs.mkdirSync(path.join(dir, 'tools'));
  fs.copyFileSync(path.join(root, 'tools/load-specs.mjs'), path.join(dir, 'tools/load-specs.mjs'));
  fs.copyFileSync(path.join(root, 'package.json'), path.join(dir, 'package.json'));
  const { loadBooks, loadSpecs } = await import(pathToFileURL(path.join(dir, 'tools/load-specs.mjs')));
  const books = await loadBooks();
  const ids = books.map(book => book.id);
  assert.ok(ids.length > 1, '需至少两册来验证清单重排');
  const pageCount = books.reduce((sum, book) => sum + book.pages.length, 0);
  assert.ok(pageCount > 0, '必须读到真实页面');
  const manifest = path.join(dir, 'src/content/books/index.js');
  const valid = 'export default ' + JSON.stringify(ids) + ';\n';
  const epoch = Date.UTC(2024, 0, 1) / 1000;
  function writeVersion(file, source, second) {
    fs.writeFileSync(file, source);
    fs.utimesSync(file, second, second);
    assert.equal(fs.readFileSync(file, 'utf8'), source, '写入必须确实生效');
    assert.equal(fs.statSync(file, { bigint: true }).mtimeNs, BigInt(second) * 1_000_000_000n,
      '复现必须保持完全相同的文件时间');
  }

  // 重现此前的 missing-book：错误清单已被导入，修好后仍读到旧错误。
  writeVersion(manifest, "export default ['missing-book'];\n", epoch);
  await assert.rejects(loadBooks, /missing-book.*缺少跨页文件/);
  const invalid = fs.readFileSync(manifest, 'utf8');
  writeVersion(manifest, valid, epoch);
  assert.notEqual(fs.readFileSync(manifest, 'utf8'), invalid, '恢复清单的变更没有生效');
  assert.deepEqual((await loadBooks()).map(book => book.id), ids,
    '同时间戳修复清单后，不得继续读取 missing-book');
  console.log('✓ 相同文件时间下，错误清单恢复后立即读到正确册序');

  // 时间与长度都相同也可能是新版本，不能用 mtime + size 替代内容身份。
  writeVersion(manifest, valid, epoch + 1);
  await loadBooks();
  const reversed = [...ids].reverse();
  const reordered = 'export default ' + JSON.stringify(reversed) + ';\n';
  assert.notEqual(reordered, valid);
  assert.equal(Buffer.byteLength(reordered), Buffer.byteLength(valid));
  writeVersion(manifest, reordered, epoch + 1);
  assert.deepEqual((await loadBooks()).map(book => book.id), reversed, '同长度清单重排必须生效');
  assert.deepEqual([...new Set((await loadSpecs()).map(page => page.book))], reversed,
    'loadSpecs 必须沿用最新清单顺序');
  writeVersion(manifest, valid, epoch + 1);
  assert.deepEqual((await loadBooks()).map(book => book.id), ids);
  console.log('✓ 清单同时间、同长度重排与恢复同时覆盖 loadBooks/loadSpecs');

  writeVersion(manifest, 'export default [;\n', epoch + 2);
  await assert.rejects(loadBooks, SyntaxError);
  writeVersion(manifest, valid, epoch + 2);
  assert.deepEqual((await loadBooks()).map(book => book.id), ids, '语法修复后不得复用失败的模块');
  console.log('✓ 相同文件时间下，语法错误修复后可重新加载');

  const first = books[0].pages[0];
  const spreadFile = path.join(dir, 'src/content/books', first.book, 'specs', first.file);
  const spreadSource = fs.readFileSync(spreadFile, 'utf8');
  const spread = (await import(pathToFileURL(spreadFile))).default;
  const version = value => {
    const changed = structuredClone(spread);
    changed.pages[0].aria = value;
    return 'export default ' + JSON.stringify(changed) + ';\n';
  };
  const one = version('版本甲');
  const two = version('版本乙');
  assert.notEqual(one, two);
  assert.equal(Buffer.byteLength(one), Buffer.byteLength(two));
  for (let i = 0; i < 10; i++) {
    const aria = i % 2 ? '版本乙' : '版本甲';
    writeVersion(spreadFile, i % 2 ? two : one, epoch + 3);
    const pages = await loadSpecs();
    assert.equal(pages.length, pageCount, '缓存更新不能改变页面总数');
    assert.equal(pages.find(page => page.book === first.book && page.id === first.id).aria, aria,
      '同时间、同长度的跨页修改必须每次立即可见');
  }
  console.log('✓ 跨页同时间、同长度连续修改 10 次，逐次读到新内容');

  writeVersion(spreadFile, spreadSource, epoch + 3);
  // 在读取 A 后、动态导入执行前保存 B；恢复 A 后不得命中错误缓存的 B。
  async function saveDuringRead(file, sourceA, sourceB, load, select, expectedA, expectedB) {
    writeVersion(file, sourceA, epoch + 4);
    const read = fs.readFileSync;
    let saved = false;
    fs.readFileSync = function (name, ...args) {
      const source = read.call(this, name, ...args);
      if (!saved && name === file) {
        saved = true;
        fs.writeFileSync(file, sourceB);
        fs.utimesSync(file, epoch + 4, epoch + 4);
        assert.equal(read(file, 'utf8'), sourceB, '交错保存 B 必须确实生效');
      }
      return source;
    };
    let during;
    try {
      during = await load();
    } finally {
      fs.readFileSync = read;
    }
    assert.ok(saved, '必须命中真实加载器的源码读取，不能空跑交错回归');
    assert.deepEqual(select(await load()), expectedB, '后续加载必须立即读到保存的 B');
    writeVersion(file, sourceA, epoch + 4);
    assert.deepEqual(select(await load()), expectedA, 'A→B→A 恢复后不得复用错配的 B');
    assert.deepEqual(select(during), expectedA, '读到 A 的版本必须执行 A，不能执行后来保存的 B');
    const concurrent = await Promise.all([load(), load()]);
    for (const value of concurrent) assert.deepEqual(select(value), expectedA, '交错恢复后的并发加载须一致');
  }
  for (const [name, load, selectIds, selectAria] of [
    ['loadBooks', loadBooks, value => value.map(book => book.id),
      value => value[0].pages.find(page => page.id === first.id).aria],
    ['loadSpecs', loadSpecs, value => [...new Set(value.map(page => page.book))],
      value => value.find(page => page.book === first.book && page.id === first.id).aria],
  ]) {
    const marker = '\n// 保存交错 ' + name + '\n';
    await saveDuringRead(manifest, valid + marker, reordered + marker, load, selectIds, ids, reversed);
    writeVersion(manifest, valid, epoch + 4);
    await saveDuringRead(spreadFile, one + marker, two + marker, load, selectAria, '版本甲', '版本乙');
    writeVersion(spreadFile, spreadSource, epoch + 4);
  }
  console.log('✓ 清单与跨页 A→B→A 保存交错覆盖 loadBooks/loadSpecs，恢复后并发加载一致');

  const helper = path.join(path.dirname(manifest), 'loader-relative.mjs');
  fs.writeFileSync(helper, valid);
  writeVersion(manifest, `import ids from './loader-relative.mjs';
if (new URL('./loader-relative.mjs', import.meta.url).href !== ${JSON.stringify(pathToFileURL(helper).href)}) {
  throw new Error('import.meta.url 必须保留原文件位置');
}
export default ids;
`, epoch + 5);
  assert.deepEqual((await loadBooks()).map(book => book.id), ids, '相对导入必须沿用书稿原文件位置');
  writeVersion(manifest, valid, epoch + 5);
  console.log('✓ 相对导入与 import.meta.url 保持原文件位置');

  const concurrent = await Promise.all([loadBooks(), loadBooks(), loadBooks()]);
  assert.deepEqual(concurrent[0], books, '恢复后返回的册元数据、页面与跨页结构必须与基线完全一致');
  assert.deepEqual(concurrent[0], concurrent[1]);
  assert.deepEqual(concurrent[0], concurrent[2]);
  console.log('✓ 未变内容的并发加载结果一致，原有元数据、页数与跨页结构保留');
} finally {
  fs.rmSync(dir, { recursive: true, force: true });
}
