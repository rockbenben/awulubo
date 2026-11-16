import './effects.ts';
/* 屏幕版 / 印刷版入口：顺序固定，音频 → 互动 → 翻页状态机 → 选页器 → 外壳。 */
import '../js/audio.js';
import '../js/interactions.js';
import '../js/book.js';
import '../js/picker.js';
import '../js/shell.js';
