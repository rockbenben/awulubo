/* S18 啊呜！它一口吃掉了苹果 */
export default [
  {
    id: 'p38',
    template: 't-burst',
    sound: 'chomp',
    aria: '啊呜！它一口吃掉了苹果。',
    bg: { kind: 'rays', colors: ['--red', '--orange'], gap: '--red', focus: [500, 540], cover: 'all', wash: '--wash-orange' },
    char: { pose: 'chomp', state: 'state-pale', at: [290, 330], scale: 0.62, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '啊呜！<br>它一口吃掉了苹果。' },
      sound: { at: [520, 76], size: 18, rotate: -3, text: '啊呜！' },
    },
  },
  {
    id: 'p39',
    template: 't-dialog',
    sound: 'chirp',
    aria: '它的眼睛亮了一下。',
    bg: { kind: 'rays-tight', colors: ['--red', '--orange'], gap: '--red', focus: [500, 640], cover: 'all', wash: '--wash-orange' },
    char: { pose: 'happy', state: 'state-pale', at: [290, 340], scale: 0.6, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '它的眼睛亮了一下。' },
      sound: { at: [520, 76], size: 14, rotate: 3, text: '唔！' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '好像有点精神了。' },
    },
  },
];
