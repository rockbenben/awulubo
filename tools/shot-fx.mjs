/* 隔离测试：把某个笔触特效单独放大渲染，看它到底有没有笔触质感。
   产物写到临时目录，不进 dist/——dist/ 是要发布出去的那一份，
   调试用的渲染件混在里面会被一起传上服务器。
   用法：node tools/shot-fx.mjs rays-corner */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const id = process.argv[2] || 'rays-corner';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\//, '')), '..');
const defs = fs
  .readFileSync(path.join(root, 'src', 'components', 'effects.svg'), 'utf8')
  .match(/<svg[^>]*>([\s\S]*)<\/svg>/)[1];

const tokens = fs.readFileSync(path.join(root, 'src', 'css', 'tokens.css'), 'utf8');

const html = `<!doctype html><meta charset="utf-8">
<style>
  ${tokens}
  html,body{margin:0;background:#fff}
  svg{display:block;width:900px;height:900px}
  .fx{--ray:#8EAF5A;--ray2:#8EAF5A;--wash:#E8F0DB}
</style>
<svg class="defs" width="0" height="0"><defs>${defs}</defs></svg>
<svg viewBox="0 0 1000 1000">
  <g class="fx"><use href="#fx-${id}"${process.argv[3] ? ` transform="${process.argv[3]}"` : ''}/></g>
</svg>`;

const out = path.join(os.tmpdir(), `fx-${id}.html`);
fs.writeFileSync(out, html, 'utf8');
console.log(out);
