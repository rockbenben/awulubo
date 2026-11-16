/* 在临时成品中交换同款道具的绑定，验证测量的是运行时实际操作的对象。 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'awulubo-hotspots-'));
const modules = path.join(dir, 'node_modules');
try {
  for (const name of ['src', 'tools', 'package.json']) {
    fs.cpSync(path.join(root, name), path.join(dir, name), { recursive: true });
  }
  fs.mkdirSync(path.join(dir, 'dist'));
  const file = path.join(dir, 'dist/index.html');
  const original = fs.readFileSync(path.join(root, 'dist/index.html'), 'utf8');
  fs.symlinkSync(path.join(root, 'node_modules'), modules, 'junction');
  fs.renameSync(path.join(dir, 'tools/load-specs.mjs'), path.join(dir, 'tools/load-specs-base.mjs'));
  // 保留真实加载器与真实三苹果页面，其他页已由完整 check 覆盖。
  const loader = path.join(dir, 'tools/load-specs.mjs');
  const selection = "import {loadSpecs as all} from './load-specs-base.mjs';\n" +
    "export async function loadSpecs(){return (await all()).filter(p=>p.book==='awulubo'&&p.id==='p38');}\n";
  fs.writeFileSync(loader, selection);
  const section = /<section\b[^>]*data-id="p38"[^>]*data-book="awulubo"[^>]*>[\s\S]*?<\/section>/;
  assert.ok(section.test(original), '临时成品缺少三苹果页面，先运行 npm run build');
  function check(name, change, error) {
    const changed = change ? original.replace(section, change) : original;
    if (change) assert.notEqual(changed, original, name + ' 的破坏没有生效');
    fs.writeFileSync(file, changed);
    const result = spawnSync(process.execPath, ['tools/check-hotspots.mjs'], {
      cwd: dir, encoding: 'utf8', timeout: 60000,
    });
    if (result.error) throw result.error;
    const output = result.stdout + result.stderr;
    if (error) {
      assert.equal(result.status, 1, name + ' 必须被拦截：\n' + output);
      assert.match(output, error, output);
    } else assert.equal(result.status, 0, output);
    console.log('✓ 热区身份回归 ' + name);
  }
  check('基线');
  check('交换两只苹果的绑定', html => html.replace(/data-target-id="apple-([FG])"/g,
    (_, id) => `data-target-id="apple-${id === 'F' ? 'G' : 'F'}"`), /apple-[FG].*墨迹/);
  check('保留外观但丢失对象身份', html => html.replace('data-object="apple-F"',
    'data-object="missing-apple"'), /apple-F.*不存在/);
  check('重复对象身份', html => html.replace('data-object="apple-G"',
    'data-object="apple-F"'), /apple-F.*不唯一/);
  check('目标无布局', html => html.replace('data-object="apple-F"',
    'data-object="apple-F" display="none"'), /apple-F.*无布局/);
  check('目标完全透明', html => html.replace('data-object="apple-F"',
    'data-object="apple-F" opacity="0"'), /apple-F.*不可见/);
  check('丢掉一枚热区', html => html.replace(/<button\b[^>]*data-target-id="apple-F"[^>]*>[\s\S]*?<\/button>/, ''), /热区.*不一致/);
  check('类别标签不决定对象', html => html.replace(/data-target="apple"/g, 'data-target="belly"'));
  check('重排同类道具仍保留身份', html => {
    const uses = [...html.matchAll(/<use\b[^>]*data-object="apple-[FGH]"[^>]*\/>/g)].map(m => m[0]);
    assert.equal(uses.length, 3);
    let i = uses.length;
    return html.replace(/<use\b[^>]*data-object="apple-[FGH]"[^>]*\/>/g, () => uses[--i]);
  });
  fs.writeFileSync(loader, 'export async function loadSpecs(){return [];}');
  check('读空也不能通过', null, /没有.*预期|读到.*零|清单.*为空/);
} finally {
  if (fs.existsSync(modules)) fs.unlinkSync(modules);
  fs.rmSync(dir, { recursive: true, force: true });
}
