/* S4 「你生病了。」/ 要怎么办 */
export default [
  {
    id: 'p11',
    template: 't-dialog',
    sound: 'chirp',
    aria: '「你生病了。」',
    bg: { kind: 'rays-tight', colors: ['--blue'], gap: '--paper', focus: [500, 620], cover: 'all', wash: '--wash-blue' },
    char: { pose: 'tired', state: 'state-pale', at: [300, 320], scale: 0.6, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '「你生病了。」' },
      sound: { at: [520, 76], size: 14, rotate: 3, text: '……' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '生病要怎么办？' },
    },
  },
  {
    id: 'p12',
    template: 't-dialog',
    sound: 'sigh',
    aria: '生病了要怎么办？让我想想……',
    bg: { kind: 'rays-tight', colors: ['--pink'], gap: '--paper', focus: [500, 640], cover: 'all', wash: '--wash-cream' },
    char: { pose: 'tired', state: 'state-pale', at: [300, 330], scale: 0.58, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '生病了要怎么办？<br>让我想想……' },
      sound: { at: [520, 76], size: 14, rotate: -2, text: '唔……' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '我知道了！' },
    },
  },
];
