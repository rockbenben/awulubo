/* S20 它跟上了 —— 高潮前的那一拍 */
export default [
  {
    id: 'p44',
    template: 't-dialog',
    sound: 'chirp',
    aria: '「我们跑吧！」',
    bg: { kind: 'rays-tight', colors: ['--yellow-deep'], gap: '--paper', focus: [500, 620], cover: 'all', wash: '--wash-orange' },
    char: { pose: 'happy', at: [290, 340], scale: 0.62, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '「我们跑吧！」' },
      sound: { at: [520, 76], size: 16, rotate: 3, text: '跑！' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '它跟得上吗？' },
    },
  },
  {
    id: 'p45',
    template: 't-burst',
    sound: 'giggle',
    aria: '它跟上了！它的脚还有点软，可是它跟上了。',
    bg: { kind: 'rays', colors: ['--yellow-deep'], gap: '--paper', focus: [500, 540], cover: 'all', wash: '--wash-orange' },
    char: { pose: 'cheer', at: [300, 330], scale: 0.64, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '它跟上了！<br>脚有点软，可是跟上了。' },
      sound: { at: [520, 76], size: 16, rotate: -3, text: '跟上！' },
    },
  },
];
