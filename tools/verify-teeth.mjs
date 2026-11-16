/* 所有破坏测试只修改临时副本。进程被杀掉也不会损坏作者工作区。 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'awulubo-teeth-'));
const modules = path.join(dir, 'node_modules');
function run(command, args) {
  const result = spawnSync(command, args, { cwd: dir, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(command + ' 验证失败，退出码 ' + result.status);
}
try {
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (entry.name.startsWith('.') && entry.name !== '.github') continue;
    if (['node_modules', 'dist', 'dist-print', 'dist-site'].includes(entry.name)) continue;
    if (entry.name.endsWith('.log')) continue;
    fs.cpSync(path.join(root, entry.name), path.join(dir, entry.name), {
      recursive: true,
      filter: source => !source.includes(path.join('docs', 'reference')),
    });
  }
  fs.symlinkSync(path.join(root, 'node_modules'), modules, 'junction');
  run(process.execPath, ['node_modules/vite/bin/vite.js', 'build']);
  run(process.execPath, ['tools/site-files.mjs']);
  run(process.execPath, ['tools/verify-character.mjs']);
  run(process.execPath, ['tools/verify-scenes.mjs']);
  run(process.execPath, ['tools/verify-reading.mjs']);
  run(process.execPath, ['tools/verify-production.mjs']);
  run(process.execPath, ['tools/verify-publish.mjs']);
  run(process.execPath, ['tools/verify-pdf.mjs']);
  run(process.execPath, ['tools/verify-loader.mjs']);
  run(process.execPath, ['tools/verify-framework.mjs']);
  run('python', ['-X', 'utf8', 'tools/verify-shots.py']);
  run(process.execPath, ['tools/verify-hotspots.mjs']);
  run(process.execPath, ['tools/verify-density.mjs']);
  run(process.execPath, ['tools/verify-content.mjs']);
  run(process.execPath, ['tools/verify-r5-paratext.mjs']);
  run(process.execPath, ['tools/verify-r5-blanket.mjs']);
  run(process.execPath, ['tools/verify-r5-cover.mjs']);
  run(process.execPath, ['tools/verify-r5-care.mjs']);
  run(process.execPath, ['tools/verify-r5-refusal.mjs']);
  run(process.execPath, ['tools/verify-text-count.mjs']);
  run(process.execPath, ['tools/verify-numbers.mjs']);
  run(process.execPath, ['tools/verify-opacity.mjs']);
  for (const name of ['audit', 'spread-palette', 'contrast', 'spread-repeat', 'age-language', 'license']) {
    run('bash', ['tools/verify-' + name + '-teeth.sh']);
  }
} finally {
  if (fs.existsSync(modules)) fs.unlinkSync(modules);
  fs.rmSync(dir, { recursive: true, force: true });
}
