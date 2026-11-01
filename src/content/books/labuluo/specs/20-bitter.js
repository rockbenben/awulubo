/* S9 药太苦——它的脸皱成一团 */
export default [
  {
    id: 'p20',
    template: 't-dialog',
    sound: 'slurp',
    aria: '它把药吃了！',
    bg: { kind: 'rays-tight', colors: ['--yellow'], gap: '--paper', focus: [500, 620], cover: 'all', wash: '--wash-yellow' },
    char: { pose: 'ouch', state: 'state-pale', at: [290, 340], scale: 0.6, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '它把药吃了！' },
      sound: { at: [520, 76], size: 16, rotate: 3, text: '咕噜。' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '怎么这张脸？' },
    },
  },
  {
    id: 'p21',
    template: 't-burst',
    sound: 'poof',
    aria: '苦！它的脸皱成一团。',
    bg: { kind: 'rays', colors: ['--red', '--pink-deep'], gap: '--red', focus: [500, 540], cover: 'all', wash: '--wash-red' },
    char: { pose: 'ouch', state: 'state-pale', at: [300, 330], scale: 0.66, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '苦！<br>它的脸皱成一团。' },
      sound: { at: [520, 76], size: 16, rotate: -3, text: '苦——！' },
    },
  },
];
