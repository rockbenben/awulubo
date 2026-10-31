/* 文字对比度检查：按**真实像素**量文字底下是什么颜色，再算 WCAG 对比度。

   为什么不用计算样式：p08/p44 的旁白落在白色的对话气泡里，
   按页面底色（红）去算会得出 4.3:1 的假警报，而实际是 18:1。
   文字底下的颜色只能从渲染结果里读——这正是这道检查存在的意义。

   做法：
     1. 浏览器里量每一处文字的框（相对页面元素）与文字颜色；
     2. 把这一页**自己截一张图**，按同样的框取像素，
        挑出"不是文字颜色"的主色 = 真实底色；
     3. 算对比度。正文 ≥ 4.5:1，大字（拟声词）≥ 3:1。

   **两个产物都要量**：
     · dist/proof.html —— 印刷/拼版口径（44 页，印刷版文案）
     · dist/index.html —— 屏幕互动口径（40 页，屏幕版文案）——**这是读者真正拿到的那份**
   以前只量印刷口径，而且量的是 html-shot 技能截出来的 PNG：
   屏幕版的文案不一样（"点我，开始。"这类纸上点不动的提示要改写），
   于是屏幕版压在一块深色笔触上的字，全套闸门照样全绿。

   截图由这道闸门自己拍（不依赖 html-shot 技能），所以它在 CI 上也跑得动。

   用法：node tools/check-contrast.mjs
   失败即退出码 1。
*/
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const TARGETS = [
  { file: 'proof.html', scope: 'print', label: '印刷/拼版' },
  { file: 'index.html', scope: 'screen', label: '屏幕版' },
];

/* 页面在拼版里是 720 × 720 CSS px；截图按 2 倍拍，量出来的坐标才和旧的一套对得上 */
const SHOT_SCALE = 2;

const problems = [];
const notes = [];
let measured = 0;

/* --- 极简 PNG 解码（只处理 8bit RGB/RGBA，非隔行） --- */
import zlib from 'node:zlib';

function pngPixels(buf) {
  let pos = 8; /* PNG 签名 */
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  const idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
      if (data[12] !== 0) throw new Error('不支持隔行 PNG');
    } else if (type === 'IDAT') {
      idat.push(data);
    } else if (type === 'IEND') {
      break;
    }
    pos += 12 + len;
  }
  if (bitDepth !== 8) throw new Error(`只支持 8bit PNG（实际 ${bitDepth}）`);
  const channels = { 0: 1, 2: 3, 4: 2, 6: 4 }[colorType];
  if (!channels) throw new Error(`不支持的 PNG 颜色类型 ${colorType}`);
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = width * channels;
  const out = Buffer.alloc(height * stride);
  let prev = Buffer.alloc(stride);
  let rp = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[rp++];
    const line = Buffer.from(raw.subarray(rp, rp + stride));
    rp += stride;
    for (let i = 0; i < stride; i++) {
      const a = i >= channels ? line[i - channels] : 0;
      const b = prev[i];
      const c = i >= channels ? prev[i - channels] : 0;
      let v = line[i];
      if (filter === 1) v += a;
      else if (filter === 2) v += b;
      else if (filter === 3) v += (a + b) >> 1;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      line[i] = v & 0xff;
    }
    line.copy(out, y * stride);
    prev = line;
  }
  return { width, height, channels, data: out };
}

function parseColor(str) {
  const m = String(str).match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
  return [parts[0], parts[1], parts[2]];
}

function luminance(rgb) {
  const c = rgb.map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}

function contrast(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

function near(c1, c2, tol) {
  return (
    Math.abs(c1[0] - c2[0]) <= tol &&
    Math.abs(c1[1] - c2[1]) <= tol &&
    Math.abs(c1[2] - c2[2]) <= tol
  );
}

const browser = await chromium.launch();

for (const target of TARGETS) {
  const file = path.join(root, 'dist', target.file);
  if (!fs.existsSync(file)) {
    console.error(`✗ 找不到 dist/${target.file} —— 先跑 npm run build`);
    process.exit(1);
  }
  const url = 'file:///' + file.replace(/\\/g, '/');
  const page = await browser.newPage({
    viewport: { width: 1600, height: 1600 },
    deviceScaleFactor: SHOT_SCALE,
  });
  await page.goto(url, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);

  if (target.scope === 'screen') {
    /* 屏幕版一次只显示一页；摊平成拼版（加 static 类），
       排版与 proof.html 一致，截图与坐标才可比。 */
    await page.evaluate(() => document.body.classList.add('static'));
  }

  const layout = await page.evaluate(() => {
    const out = [];
    for (const sec of document.querySelectorAll('.page')) {
      const pr = sec.getBoundingClientRect();
      const texts = [];
      for (const el of sec.querySelectorAll('.narration, .sound, .prompt, .adult')) {
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) continue;
        texts.push({
          kind: el.className,
          text: (el.textContent || '').trim().slice(0, 10),
          color: getComputedStyle(el).color,
          x: r.left - pr.left,
          y: r.top - pr.top,
          w: r.width,
          h: r.height,
          pageW: pr.width,
        });
      }
      out.push({ id: sec.dataset.id, texts });
    }
    return out;
  });

  for (const pg of layout) {
    if (!pg.texts.length) continue;
    const shot = await page.locator(`[data-id="${pg.id}"]`).screenshot();
    const img = pngPixels(shot);
    const scale = img.width / (pg.texts[0]?.pageW || img.width);

    for (const t of pg.texts) {
      const fg = parseColor(t.color);
      if (!fg) continue;
      const x0 = Math.max(0, Math.round(t.x * scale));
      const y0 = Math.max(0, Math.round(t.y * scale));
      const x1 = Math.min(img.width, Math.round((t.x + t.w) * scale));
      const y1 = Math.min(img.height, Math.round((t.y + t.h) * scale));
      if (x1 <= x0 || y1 <= y0) continue;

      /* 量法：先在文字框里找出"墨迹像素"，取它们的**紧包围盒**，
         再在紧包围盒里找底色——并排除紧贴墨迹的那些像素（抗锯齿光晕，
         否则量到的是墨与底的混合色）。 */
      const step = 2;
      const px = (x, y) => {
        const i = (y * img.width + x) * img.channels;
        return [img.data[i], img.data[i + 1], img.data[i + 2]];
      };
      const isInk = (c) => near(c, fg, 60);
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -1;
      let maxY = -1;
      for (let y = y0; y < y1; y += step) {
        for (let x = x0; x < x1; x += step) {
          if (!isInk(px(x, y))) continue;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
      if (maxX < 0) continue; /* 框里没有文字像素（可能被别的层盖住了） */

      const counts = new Map();
      for (let y = minY; y <= maxY; y += step) {
        for (let x = minX; x <= maxX; x += step) {
          const c = px(x, y);
          if (isInk(c)) continue;
          /* 跳过紧邻墨迹的像素：那是抗锯齿的混合色，不是底色 */
          let halo = false;
          for (let dy = -step; dy <= step && !halo; dy += step) {
            for (let dx = -step; dx <= step; dx += step) {
              const nx = x + dx;
              const ny = y + dy;
              if (nx < minX || nx > maxX || ny < minY || ny > maxY) continue;
              if (isInk(px(nx, ny))) {
                halo = true;
                break;
              }
            }
          }
          if (halo) continue;
          const key = (c[0] >> 3) * 1024 + (c[1] >> 3) * 32 + (c[2] >> 3);
          const e = counts.get(key) || { n: 0, c: [0, 0, 0] };
          e.n++;
          e.c[0] += c[0];
          e.c[1] += c[1];
          e.c[2] += c[2];
          counts.set(key, e);
        }
      }
      if (!counts.size) continue;
      const top = [...counts.values()].sort((a, b) => b.n - a.n)[0];
      const bg = top.c.map((v) => Math.round(v / top.n));
      const ratio = contrast(fg, bg);
      const need = t.kind === 'sound' ? 3 : 4.5;
      measured++;
      const label = `[${pg.id}]（${target.label}）${t.kind} "${t.text}"`;
      if (ratio < need) {
        problems.push(
          `${label} 对比度 ${ratio.toFixed(2)}:1（需 ≥ ${need}）字色 ${t.color} 底色 rgb(${bg})`
        );
      } else {
        notes.push(`✓ ${label} ${ratio.toFixed(2)}:1`);
      }
    }
  }

  await page.close();
}

await browser.close();

notes.forEach((n) => console.log(`  ${n}`));
console.log(`\n共量了 ${measured} 处文字（${TARGETS.map((t) => t.label).join(' + ')}）`);
if (problems.length) {
  console.error(`✗ ${problems.length} 处文字对比度不达标：`);
  problems.forEach((p) => console.error(`  - ${p}`));
  process.exit(1);
}
/* 一处都没量到，不能报"全部达标"——
   截图没生成、路径写错、页面 id 对不上，都会落到这里。
   这道闸门要是在什么都没量的情况下说通过，就等于没有闸门。 */
if (measured === 0) {
  console.error('✗ 一处文字都没量到（截图缺失或量不到底色）——不能就这么算通过');
  process.exit(1);
}
console.log('✓ 文字对比度全部达标');
