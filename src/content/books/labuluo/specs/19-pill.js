/* S8 还要吃药 —— 喂药最难 */
export default [
  {
    id: 'p19',
    template: 't-dialog',
    sound: 'chirp',
    aria: '水喝了，还要吃药。',
    bg: { kind: 'rays-tight', colors: ['--pink'], gap: '--paper', focus: [500, 620], cover: 'all', wash: '--wash-pink' },
    char: { pose: 'tired', state: 'state-pale', at: [280, 330], scale: 0.58, spiral: true },
    props: [{ kind: 'pill', at: [700, 430], scale: 0.4, rotate: -8, class: 'prop-pill' }],
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '水喝了，<br>还要吃药。' },
      sound: { at: [520, 76], size: 14, rotate: -2, text: '唔……' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '喂它吃药。' },
    },
  },
  {
    id: 'p20',
    template: 't-dialog',
    sound: 'sigh',
    aria: '它把脸转开了。药最难喂。',
    bg: { kind: 'rays-tight', colors: ['--pink-deep'], gap: '--paper', focus: [500, 640], cover: 'all', wash: '--wash-pink' },
    char: { pose: 'grumpy', state: 'state-pale', at: [290, 340], scale: 0.58, spiral: true },
    props: [{ kind: 'pill', at: [700, 430], scale: 0.4, rotate: -8, class: 'prop-pill' }],
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '它把脸转开了。<br>药最难喂。' },
      sound: { at: [520, 76], size: 14, rotate: 3, text: '不要……' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '把药送到嘴边。' },
    },
    hotspot: { action: 'medicine', target: 'pill', at: [700, 430], size: 300, label: '把药送到它嘴边' },
  },
];
