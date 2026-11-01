/* S15 「你饿了吗？」 */
export default [
  {
    id: 'p33',
    template: 't-dialog',
    sound: 'chirp',
    aria: '「你饿了吗？」',
    bg: { kind: 'rays-tight', colors: ['--pink'], gap: '--paper', focus: [500, 620], cover: 'all', wash: '--wash-pink' },
    char: { pose: 'sleepy', state: 'state-pale', at: [290, 340], scale: 0.58, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '「你饿了吗？」' },
      sound: { at: [520, 76], size: 14, rotate: 3, text: '……' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '它没反应。' },
    },
  },
  {
    id: 'p34',
    template: 't-dialog',
    sound: 'snore',
    aria: '它没反应。再等等。',
    bg: { kind: 'rays-tight', colors: ['--pink-deep'], gap: '--paper', focus: [500, 640], cover: 'all', wash: '--wash-pink' },
    char: { pose: 'asleep', state: 'state-pale', at: [300, 350], scale: 0.6, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '它没反应。<br>再等等。' },
      sound: { at: [520, 76], size: 14, rotate: -2, text: '呼噜……' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '它饿了会说的。' },
    },
  },
];
