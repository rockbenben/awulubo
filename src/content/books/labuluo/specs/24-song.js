/* S11 唱首歌给它听 */
export default [
  {
    id: 'p24',
    template: 't-dialog',
    sound: 'chirp',
    aria: '再唱首歌给它听。',
    bg: { kind: 'rays-tight', colors: ['--pink'], gap: '--paper', focus: [1000, 620], cover: 'all', wash: '--wash-pink' },
    char: { pose: 'asleep', state: 'state-pale', at: [290, 340], scale: 0.58, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '再唱首歌给它听。' },
      sound: { at: [520, 76], size: 14, rotate: -2, text: '啦啦……' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '小声唱。' },
    },
  },
  {
    id: 'p25',
    template: 't-dialog',
    sound: 'snore',
    aria: '它睡着了。',
    bg: { kind: 'rays-tight', colors: ['--pink'], gap: '--paper', focus: [0, 620], cover: 'all', wash: '--wash-pink' },
    char: { pose: 'asleep', state: 'state-pale', at: [300, 350], scale: 0.6, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '它睡着了。' },
      sound: { at: [520, 76], size: 14, rotate: 3, text: '呼噜……' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '你也该睡了。' },
    },
  },
];
