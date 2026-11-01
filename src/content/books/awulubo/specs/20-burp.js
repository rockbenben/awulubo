/* S7 揉肚子：打个嗝，喷出彩纸 */
export default [
  {
    id: 'p20',
    template: 't-dialog',
    sound: 'gulu',
    aria: '转个圈。在噜啵的肚子上画圈。咕噜——',
    bg: { kind: 'swirl', colors: ['--green'], focus: [640, 560], cover: 'all', wash: '--wash-green' },
    char: { pose: 'full', at: [250, 330], scale: 0.62, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '转个圈，<br>在噜啵的肚子上画圈。' },
      sound: { text: '咕噜——', at: [520, 70], size: 12, rotate: 2 },
      prompt: { text: '用手指画圈。', at: [60, 870], size: 4, width: 340 },
    },
    /* 点空白不翻页：这一页要揉肚子（画圈或连点三下），戳一下空地不该跳过 */
    trap: true,
    /* 热区罩住**画出来的那个螺旋**（它就画在肚子上，渲染后约 512–601 × 707–789）。
       热区中心落在螺旋中心（556,748）上——孩子照着螺旋描一圈，
       手指绕的正是螺旋的轴心，螺旋才会跟着手指转。
       原来热区在 [380,520]，罩住了螺旋可中心偏在它上方 88 个单位处：
       绕螺旋描一圈，量的却是另一个点，角度正负相消，螺旋一格也不转。 */
    hotspot: { action: 'rub', target: 'belly', at: [416, 608], size: 280, label: '在噜啵的肚子上画圈' },
  },
  {
    id: 'p21',
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
