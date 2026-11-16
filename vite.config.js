import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { bookPages } from './tools/vite-pages.mjs';

/* 构建：四个入口（屏幕版 / 印刷版 / 拼版 / A4 双面拼版），每个都产出**单文件** HTML——
   CSS、JS、字体子集全部内联，双击就能看，离线可用。 */
export default defineConfig({
  plugins: [bookPages(), viteSingleFile({ removeViteModuleLoader: true })],
  build: {
    outDir: 'dist',
    /* 不清空 dist：截图与历史导出文件 也是产物，不该被一次构建抹掉。
       需要全新目录时用 npm run clean。 */
    emptyOutDir: false,
    assetsInlineLimit: 100 * 1024 * 1024, // 字体子集也内联
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        index: 'index.html',
        print: 'print.html',
        proof: 'proof.html',
        booklet: 'booklet.html',
      },
    },
  },
});
