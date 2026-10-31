/* 版式与页数的公共常量。
   这些数字在渲染器、检查器、冒烟测试里都要一致，分散写就会漂——
   所以只在这里定义一次。 */

import fs from 'node:fs';
import path from 'node:path';

/** 页面坐标系：整页宽高各 1000 单位 */
export const PAGE = 1000;

/** 文字边距：页面边的 6%（规格 §6.1） */
export const MARGIN = 60;

/** 静态拼版里每页的 CSS 像素尺寸（body.static .page 的宽度） */
export const STATIC_PAGE = 720;

/** 拼版单元 = STATIC_PAGE / PAGE */
export const UNIT = STATIC_PAGE / PAGE;

/** 全书页数：印刷版 / 屏幕版（屏幕版跳过版权页、给大人的话、后环衬、封底）
    印刷版是 64 页 = 4 的倍数：骑马钉对折后 32 张纸、16 帖，双面打印排得开；
    页数不是 4 的倍数就排不出完整的帖，书脊那一帖会缺一面。
    64 = 4 前置（封面/前环衬/扉页/版权）+ 56 故事（28 个跨页）+ 4 后置
    （给大人的话/再读一次/后环衬/封底）。
    故事页数是按参考书的量级定的：两本参考书都是 64 页，
    44 页版本书的故事只有 36 页，不到它们的一半（见设计规格 §5.1）。 */
export const PRINT_PAGES = 64;
export const SCREEN_PAGES = 60;

/** 目录里最新的文件修改时间（毫秒）。
    量产物之前用它比一比：源文件比产物新，说明量的是上一版。 */
export function newestMtime(dir) {
  let newest = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    const t = entry.isDirectory() ? newestMtime(p) : fs.statSync(p).mtimeMs;
    if (t > newest) newest = t;
  }
  return newest;
}
