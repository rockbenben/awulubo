/* 验证密度破坏脚本也会拒绝“报错但退出 0”的闸门；只动临时副本。 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'awulubo-density-'));
const modules = path.join(dir, 'node_modules');
try {
  for (const name of ['src', 'tools', 'package.json']) {
    fs.cpSync(path.join(root, name), path.join(dir, name), { recursive: true });
  }
  fs.symlinkSync(path.join(root, 'node_modules'), modules, 'junction');
  const run = () => {
    const result = spawnSync('bash', ['tools/verify-density-teeth.sh'], { cwd: dir, encoding: 'utf8' });
    if (result.error) throw result.error;
    return result;
  };
  const baseline = run();
  assert.equal(baseline.status, 0, baseline.stdout + baseline.stderr);
  const gate = path.join(dir, 'tools/check-interaction-density.mjs');
  const original = fs.readFileSync(gate, 'utf8');
  const alwaysGreen = original.replace('process.exit(1);', 'process.exit(0);')
    .replace('process.exitCode = hits === 0 ? 0 : 1;', 'process.exitCode = 0;');
  assert.notEqual(alwaysGreen, original, '密度闸门退出码的破坏没有生效');
  fs.writeFileSync(gate, alwaysGreen);
  const wrong = run();
  assert.notEqual(wrong.status, 0, '闸门报错却退出 0 时，密度破坏回归仍被错误放行：\n' + wrong.stdout);
  assert.match(wrong.stdout + wrong.stderr, /退出码|退出 0/);
  fs.writeFileSync(gate, original.replace('process.exitCode = hits === 0 ? 0 : 1;', 'process.exitCode = 1;'));
  assert.notEqual(fs.readFileSync(gate, 'utf8'), original, '正常基线退出码的破坏没有生效');
  const alwaysRed = run();
  assert.notEqual(alwaysRed.status, 0, '正常基线输出正确但退出 1 时也必须拒绝');
  assert.match(alwaysRed.stdout + alwaysRed.stderr, /基线/);
  console.log('✓ 密度破坏回归同时核对错误消息、失败退出码与正常基线退出码');
} finally {
  if (fs.existsSync(modules)) fs.unlinkSync(modules);
  fs.rmSync(dir, { recursive: true, force: true });
}
