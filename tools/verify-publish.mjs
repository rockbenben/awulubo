/* 在临时仓库执行真实发布检查，核对远端判定及标准输出、错误输出中的凭据。 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'awulubo-publish-'));
/* 使用独立 Git 配置，避免测试读取作者的远端、URL 重写和工作树环境。 */
const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith('GIT_')));
env.GIT_CONFIG_NOSYSTEM = '1';
env.GIT_CONFIG_GLOBAL = path.join(dir, 'global.gitconfig');
env.GIT_TERMINAL_PROMPT = '0';

function git(...args) {
  const result = spawnSync('git', args, { cwd: dir, env, encoding: 'utf8' });
  if (result.error) throw result.error;
  assert.equal(result.status, 0, '临时仓库的 Git 操作失败');
}

function check(expectedStatus) {
  const result = spawnSync(process.execPath, ['tools/check-publish.mjs'], {
    cwd: dir, env, encoding: 'utf8',
  });
  if (result.error) throw result.error;
  const output = result.stdout + result.stderr;
  for (const secret of ['audit-user', 'audit-password', 'audit-token', 'example.invalid']) {
    assert.ok(!output.includes(secret), '发布检查在标准输出或错误输出中泄漏了测试凭据或地址');
  }
  assert.equal(result.status, expectedStatus, '发布检查退出码不符');
  return output;
}

try {
  for (const file of ['tools/check-publish.mjs', 'tools/site-files.mjs', 'LICENSE-CONTENT.md', 'docs/images/og.png']) {
    const target = path.join(dir, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(root, file), target);
  }
  fs.writeFileSync(path.join(dir, 'global.gitconfig'), '');
  fs.mkdirSync(path.join(dir, 'dist-site'));
  for (const file of ['index.html', 'print.html', 'proof.html', 'booklet.html', 'edgeone.json']) {
    fs.writeFileSync(path.join(dir, 'dist-site', file), file.endsWith('.html') ? '<!doctype html>' : '{}');
  }
  git('init', '--quiet');
  assert.match(check(1), /git remote add origin/);

  git('remote', 'add', 'backup', 'https://audit-user:audit-password@example.invalid/backup.git');
  assert.match(check(1), /git remote add origin/);
  git('config', 'remote.origin.fetch', '+refs/heads/*:refs/remotes/origin/*');
  assert.match(check(1), /git remote add origin/);

  git('config', 'remote.origin.url', 'https://audit-user:audit-password@example.invalid/book.git');
  assert.match(check(0), /✓ git remote：origin/);
  git('config', 'remote.origin.pushurl', 'https://audit-token@example.invalid/publish.git');
  assert.match(check(0), /✓ git remote：origin/);

  git('config', 'remote.origin.url', 'git@example.invalid:sample/book.git');
  assert.match(check(0), /✓ git remote：origin/);
  git('config', 'remote.origin.url', '../local-book.git');
  assert.match(check(0), /✓ git remote：origin/);

  /* 其他发布前置条件仍须失败，远端成功不能遮住缺失的公开入口。 */
  fs.unlinkSync(path.join(dir, 'dist-site', 'print.html'));
  assert.match(check(1), /缺少有效文件/);
  fs.writeFileSync(path.join(dir, 'dist-site', 'print.html'), '<!doctype html>');

  const config = path.join(dir, '.git', 'config');
  const original = fs.readFileSync(config, 'utf8');
  fs.appendFileSync(config, '\n[audit-user:audit-password\n');
  assert.notEqual(fs.readFileSync(config, 'utf8'), original, '损坏 Git 配置的操作未生效');
  assert.match(check(1), /git remote add origin/);
  console.log('✓ 发布检查回归通过：远端缺失或无地址、HTTPS／SSH／本地地址、推送地址、公开文件缺失及 Git 配置错误');
} finally {
  fs.rmSync(dir, { recursive: true, force: true });
}
