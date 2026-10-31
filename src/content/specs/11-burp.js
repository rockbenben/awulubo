/* S7 揉肚子：打个嗝，喷出彩纸 */
export default [
  {
    id: 'p17',
    template: 't-dialog',
    sound: 'gulu',
    aria: '揉一揉，顺一顺。在噜啵的肚子上，转个圈。咕噜——',
    bg: { kind: 'swirl', colors: ['--green'], focus: [640, 560], cover: 'all', wash: '--wash-green' },
    char: { pose: 'full', at: [250, 330], scale: 0.62, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '揉一揉，顺一顺。<br>在噜啵的肚子上，转个圈。' },
      sound: { text: '咕噜——', at: [520, 70], size: 12, rotate: 2 },
      prompt: { text: '在肚子上画个圈。', at: [60, 870], size: 4, width: 340 },
    },
    /* 点空白不翻页：这一页要揉肚子（画圈或连点三下），戳一下空地不该跳过 */
    trap: true,
    hotspot: { action: 'rub', target: 'belly', at: [380, 520], size: 280, label: '在噜啵的肚子上画圈' },
  },
  {
    id: 'p18',
    template: 't-burst',
    sound: 'burp',
    aria: '嗝——啵！！！彩纸喷出来啦！',
    bg: { kind: 'confetti', focus: [500, 500], cover: 'all', wash: '--wash-yellow' },
    char: { pose: 'burp', at: [140, 330], scale: 0.72, spiral: true },
    text: {
      sound: { text: '嗝——啵！！！', at: [300, 78], size: 11, rotate: -3 },
      narration: { text: '彩纸喷出来啦！', at: [60, 870], size: 3.4, width: 400 },
    },
  },
];
