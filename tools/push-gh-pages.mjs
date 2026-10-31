/* 把构建产物发布成 gh-pages 分支（本地版；GitHub 上的发布由
   .github/workflows/deploy.yml 的 JamesIves/github-pages-deploy-action 做）。

   不用 git subtree / worktree：那些要么要求产物进版本库，要么要动工作区。
   这里直接用 plumbing——把 dist-site 里的文件按**根路径**写进一棵新树，
   提交成 gh-pages 的顶端提交，再推上去。main 不受影响。

   用法：node tools/push-gh-pages.mjs [产物目录]
*/
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const siteDir = path.resolve(root, process.argv[2] || 'dist-site');
const branch = 'gh-pages';

if (!fs.existsSync(siteDir)) {
  console.error(`✗ 没有 ${siteDir} —— 先构建（npm run build）`);
  process.exit(1);
}

const git = (...args) =>
  execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });

/* 收集产物文件（相对产物目录的路径） */
function walk(dir, base = '') {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...walk(path.join(dir, entry.name), rel));
    else out.push(rel);
  }
  return out;
}
const files = walk(siteDir);
if (!files.length) {
  console.error(`✗ ${siteDir} 是空的`);
  process.exit(1);
}

/* 借一个临时索引，把这些文件按根路径写进去 */
const indexFile = path.join(fs.realpathSync(process.env.TEMP || '/tmp'), `awulubo-ghpages-${Date.now()}.index`);
process.env.GIT_INDEX_FILE = indexFile;
try {
  git('read-tree', '--empty');
  for (const rel of files) {
    const sha = git('hash-object', '-w', path.join(siteDir, rel)).trim();
    git('update-index', '--add', '--cacheinfo', `100644,${sha},${rel}`);
  }
  const tree = git('write-tree').trim();
  const commit = git('commit-tree', tree, '-m', 'deploy: publish site to gh-pages').trim();
  git('update-ref', `refs/heads/${branch}`, commit);
} finally {
  delete process.env.GIT_INDEX_FILE;
  try {
    fs.unlinkSync(indexFile);
  } catch {
    /* 临时索引没生成就算了 */
  }
}

/* 推不推得看有没有远端。
   本仓库现在**没有配远端**（它自足：源码在 main，产物在 gh-pages）。
   没有 origin 时把分支在本地更新好就收工——提交已经写进 refs/heads/gh-pages，
   以后加了远端再 `git push -u origin gh-pages` 就行。
   原来这里是无条件 `git push --force origin`，没有远端就直接报错退出，
   白白把已经建好的那一棵树丢掉。 */
let pushed = false;
try {
  git('push', '--force', 'origin', `${branch}:${branch}`);
  pushed = true;
} catch (e) {
  const remotes = git('remote').trim();
  if (remotes) {
    console.error(`✗ 推送失败：${e.stderr || e.message}`);
    process.exit(1);
  }
  console.log('· 本仓库没有远端，gh-pages 只在本地更新（加远端后再推一次即可）');
}

console.log(`✓ gh-pages ${pushed ? '已推送' : '已更新'}：${files.length} 个文件`);
for (const f of files.sort()) console.log('   ' + f);
