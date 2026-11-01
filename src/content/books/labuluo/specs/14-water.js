/* S6 喂它喝水——它不喝 */
export default [
  {
    id: 'p14',
    template: 't-dialog',
    sound: 'chirp',
    aria: '生病了要喝水。拿杯水来。',
    bg: { kind: 'rays-tight', colors: ['--pink'], gap: '--paper', focus: [1000, 620], cover: 'all', wash: '--wash-pink' },
    char: { pose: 'tired', state: 'state-pale', at: [280, 330], scale: 0.58, spiral: true },
    props: [{ kind: 'cup', at: [700, 430], scale: 0.34, rotate: 6, class: 'prop-cup' }],
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '生病了要喝水。<br>拿杯水来。' },
      sound: { at: [520, 76], size: 14, rotate: -2, text: '唔……' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '它不喝。' },
    },
  },
  {
    id: 'p15',
    template: 't-dialog',
    sound: 'snore',
    aria: '它把脸转开了。',
    bg: { kind: 'rays-tight', colors: ['--pink'], gap: '--paper', focus: [0, 620], cover: 'all', wash: '--wash-pink' },
    char: { pose: 'grumpy', state: 'state-pale', at: [300, 340], scale: 0.58, spiral: true },
    props: [{ kind: 'cup', at: [700, 440], scale: 0.32, rotate: 6, class: 'prop-cup' }],
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '它把脸转开了。' },
      sound: { at: [520, 76], size: 14, rotate: 3, text: '不要……' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '再叫叫它。' },
    },
  },
];
