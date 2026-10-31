/* S1 咕噜：它先看见你 */
export default [
  {
    id: 'p05',
    template: 't-dialog',
    sound: 'gulu',
    aria: '咕噜，咕噜。谁的肚子在叫？点一下噜啵的肚子。',
    bg: { kind: 'bands', colors: ['--yellow', '--yellow-deep'], focus: [500, 500], wash: '--wash-yellow' },
    char: { pose: 'hungry', at: [190, 200], scale: 0.62, spiral: true },
    text: {
      sound: { text: '咕噜——<br>咕噜——', at: [70, 82], size: 11, rotate: -2 },
      narration: { text: '谁的肚子在叫？', at: [60, 350], size: 3.4, width: 340 },
      prompt: { text: '点一下噜啵的肚子。', at: [60, 870], size: 4, align: 'center', width: 1000 },
    },
    hotspot: { action: 'belly', target: 'belly', at: [366, 488], size: 260, label: '点一下噜啵的肚子' },
  },
  {
    id: 'p06',
    template: 't-dialog',
    sound: 'chirp',
    aria: '是我，噜啵。我饿了！咦？我看见你啦！你喂我，好不好？',
    bg: { kind: 'swirl', colors: ['--pink', '--pink-deep'], focus: [720, 540], wash: '--wash-pink' },
    char: { pose: 'idle', at: [350, 310], scale: 0.72, spiral: true },
    text: {
      narration: {
        text: '是我，噜啵。我饿了！<br>咦？我看见你啦！',
        at: [60, 70],
        size: 3.4,
        width: 420,
      },
      sound: { text: '啊呜！', at: [520, 80], size: 16, rotate: 4 },
      prompt: { text: '你喂我，好不好？', at: [60, 870], size: 4, width: 340 },
    },
  },
];
