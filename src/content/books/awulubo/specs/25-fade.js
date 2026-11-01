/* S9 玩累了：颜色要回家了 */
export default [
  {
    id: 'p25',
    sound: 'sigh',
    template: 't-dialog',
    aria: '玩累了……唉——颜色要回家了。',
    bg: { kind: 'rays-tight', colors: ['--yellow'], gap: '--paper', focus: [500, 620], cover: 'all', wash: '--wash-yellow' },
    char: { pose: 'tired', state: 'state-pale', at: [320, 330], scale: 0.6, spiral: true },
    text: {
      narration: { text: '玩累了……颜色要回家了。', at: [60, 70], size: 3.4, width: 460 },
      /* 这一页是全书最安静的一页：一声叹气就够了 */
      sound: { text: '唉——', at: [560, 70], size: 14, rotate: -2 },
    },
  },
  {
    id: 'p26',
    template: 't-dialog',
    sound: 'snore',
    aria: '明天，再变新的颜色。呼噜……',
    bg: { kind: 'rays-tight', colors: ['--pink', '--pink-deep'], gap: '--paper', focus: [640, 620], cover: 'all', wash: '--wash-pink' },
    char: { pose: 'asleep', state: 'state-pale', at: [320, 340], scale: 0.58, spiral: true },
    text: {
      narration: { text: '明天，再变新的颜色。', at: [60, 70], size: 3.4, width: 460 },
      sound: { text: '呼噜……', at: [540, 70], size: 14, rotate: 3 },
    },
  },
];
