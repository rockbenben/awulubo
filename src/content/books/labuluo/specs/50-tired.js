/* S23 玩累了 */
export default [
  {
    id: 'p50',
    template: 't-dialog',
    sound: 'sigh',
    aria: '玩累了。它趴下来。',
    bg: { kind: 'rays-tight', colors: ['--orange'], gap: '--paper', focus: [1000, 620], cover: 'all', wash: '--wash-orange' },
    char: { pose: 'tired', state: 'state-pale', at: [290, 340], scale: 0.6, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '玩累了。<br>它趴下来。' },
      sound: { at: [520, 76], size: 14, rotate: 3, text: '呼……' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '该睡了。' },
    },
  },
  {
    id: 'p51',
    template: 't-dialog',
    sound: 'snore',
    aria: '你也是。',
    bg: { kind: 'rays-tight', colors: ['--orange'], gap: '--paper', focus: [0, 620], cover: 'all', wash: '--wash-orange' },
    char: { pose: 'asleep', state: 'state-pale', at: [300, 350], scale: 0.6, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '你也是。' },
      sound: { at: [520, 76], size: 14, rotate: -2, text: '呼噜……' },
    },
  },
];
