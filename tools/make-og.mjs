/* 临时工具：生成社交预览图（1280 × 640）。
   走 HTML/CSS 排版再截，不是把截图裁一块——卡片要在信息流里当缩略图看，
   读者只看得清大色块和大字。
   产物落在 dist/og.png（照兄弟仓 046 的做法：本地生成、手工上传到 GitHub Settings）。
   用完就删（不进仓库）。 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readSvg = (name) => {
  const s = fs.readFileSync(path.join(root, 'src/components', name), 'utf8');
  return s.match(/<svg[^>]*>([\s\S]*)<\/svg>/)[1];
};
const tokens = fs.readFileSync(path.join(root, 'src/css/tokens.css'), 'utf8');
const defs = readSvg('character.svg') + readSvg('rainbow.svg');
const fonts = path.join(root, 'node_modules/@fontsource');

const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">
<style>
${tokens}
@font-face{font-family:'ZCOOL';src:url('file:///${path.join(fonts, 'zcool-kuaile/files/zcool-kuaile-chinese-simplified-400-normal.woff2')}')}
@font-face{font-family:'LXGW';src:url('file:///${path.join(fonts, 'lxgw-wenkai/files/lxgw-wenkai-chinese-simplified-400-normal.woff2')}')}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1280px;height:640px;overflow:hidden;background:#FFF6C4;
  font-family:'LXGW',system-ui,sans-serif;color:#1F1F1F}
.card{position:relative;width:1280px;height:640px;display:flex;align-items:center}
/* 封面同款的放射线：只靠大色块，信息流里才认得出 */
.burst{position:absolute;inset:-260px;left:520px;
  background:repeating-conic-gradient(from 12deg,#FFE94D 0deg 22deg,#FFF6C4 22deg 44deg);
  border-radius:50%}
.hero{position:relative;width:560px;height:560px;margin-left:640px;margin-top:60px}
.hero svg{width:100%;height:100%}
.text{position:absolute;left:74px;top:0;width:600px}
h1{font-family:'ZCOOL',sans-serif;font-size:96px;line-height:1.05;letter-spacing:2px}
.tag{font-family:'ZCOOL',sans-serif;font-size:40px;margin-top:22px;color:#D8332D}
.sub{font-size:27px;line-height:1.55;margin-top:26px;width:560px}
.pill{margin-top:30px;display:inline-block;padding:9px 20px;border:3px solid #1F1F1F;border-radius:999px;
  font-size:22px;background:#fff}
</style></head><body>
<svg width="0" height="0" style="position:absolute"><defs>${defs}</defs></svg>
<div class="card">
  <div class="burst"></div>
  <div class="hero">
    <svg viewBox="0 0 1000 1000">
      <g transform="translate(120,40) scale(0.78)">
        <use href="#pose-happy"/><use href="#ch-spiral" class="spiral"/>
      </g>
    </svg>
  </div>
  <div class="text">
    <h1>啊呜噜啵！</h1>
    <div class="tag">3–5 岁自己翻自己点的绘本</div>
    <div class="sub">喂它苹果、小鱼、黄星星，<br>它就变成那个颜色，还会打嗝喷彩纸。</div>
    <div class="pill">全部离线 · 不联网不上传不注册</div>
  </div>
</div></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 640 } });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);
fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
const out = path.join(root, 'dist/og.png');
await page.screenshot({ path: out });
await browser.close();
const kb = Math.round(fs.statSync(out).size / 1024);
console.log(`→ ${out}  1280×640  ${kb} KB${kb >= 1024 ? '  ⚠ 超过 1 MB' : ' ✓'}`);
