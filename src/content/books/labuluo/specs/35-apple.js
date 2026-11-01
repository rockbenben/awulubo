/* S16 拿来一个苹果 */
export default [
  {
    id: 'p35',
    template: 't-dialog',
    sound: 'chirp',
    aria: '拿一个苹果来。让它闻闻。',
    bg: { kind: 'rays-tight', colors: ['--pink'], gap: '--paper', focus: [500, 620], cover: 'all', wash: '--wash-orange' },
    char: { pose: 'asleep', state: 'state-pale', at: [280, 340], scale: 0.58, spiral: true },
    props: [{ kind: 'apple', at: [660, 420], scale: 0.3, rotate: -10, class: 'prop-apple' }],
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '拿一个苹果来。<br>让它闻闻。' },
      sound: { at: [520, 76], size: 14, rotate: 3, text: '唔……' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '放在它嘴边。' },
    },
  },
  {
    id: 'p36',
    template: 't-dialog',
    sound: 'snore',
    aria: '苹果放在它嘴边。它还没醒。',
    bg: { kind: 'rays-tight', colors: ['--yellow'], gap: '--paper', focus: [500, 640], cover: 'all', wash: '--wash-yellow' },
    char: { pose: 'asleep', state: 'state-pale', at: [280, 350], scale: 0.58, spiral: true },
    props: [{ kind: 'apple', at: [660, 430], scale: 0.3, rotate: -10, class: 'prop-apple' }],
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '苹果放在它嘴边。<br>它还没醒。' },
      sound: { at: [520, 76], size: 14, rotate: -2, text: '呼噜……' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '再等等。' },
    },
  },
];
