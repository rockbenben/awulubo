/* S6 喂它喝水——它不喝 */
export default [
  {
    id: 'p15',
    template: 't-dialog',
    sound: 'chirp',
    aria: '生病了要喝水。端一杯来。',
    bg: { kind: 'rays-tight', colors: ['--pink'], gap: '--paper', focus: [500, 620], cover: 'all', wash: '--wash-pink' },
    char: { pose: 'tired', state: 'state-pale', at: [280, 330], scale: 0.58, spiral: true },
    props: [{ kind: 'cup', at: [700, 430], scale: 0.34, rotate: 6, class: 'prop-cup' }],
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '生病了要喝水。<br>端一杯来。' },
      sound: { at: [520, 76], size: 14, rotate: -2, text: '唔……' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '它不喝。' },
    },
  },
  {
    id: 'p16',
    template: 't-dialog',
    sound: 'snore',
    aria: '它把脸转开了。',
    bg: { kind: 'rays-tight', colors: ['--pink-deep'], gap: '--paper', focus: [500, 640], cover: 'all', wash: '--wash-pink' },
    char: { pose: 'grumpy', state: 'state-pale', at: [300, 340], scale: 0.58, spiral: true },
    props: [{ kind: 'cup', at: [700, 440], scale: 0.32, rotate: 6, class: 'prop-cup' }],
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '它把脸转开了。' },
      sound: { at: [520, 76], size: 14, rotate: 3, text: '不要……' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '再劝劝它。' },
    },
  },
];
