/* S20 它跳起来了！ */
export default [
  {
    id: 'p42',
    template: 't-burst',
    sound: 'giggle',
    aria: '它跳起来了！一下，又一下！',
    bg: { kind: 'rays', colors: ['--orange', '--yellow-deep'], gap: '--orange', focus: [1000, 540], cover: 'all', wash: '--wash-orange' },
    char: { pose: 'cheer', at: [300, 330], scale: 0.66, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '它跳起来了！<br>一下，又一下！' },
      sound: { at: [520, 76], size: 18, rotate: 3, text: '跳！' },
    },
  },
  {
    id: 'p43',
    template: 't-burst',
    sound: 'giggle',
    aria: '它的颜色回来了！',
    bg: { kind: 'rays', colors: ['--orange', '--yellow-deep'], gap: '--orange', focus: [0, 540], cover: 'all', wash: '--wash-orange' },
    char: { pose: 'cheer', at: [300, 330], scale: 0.66, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '它的颜色<br>一点一点回来了！' },
      sound: { at: [520, 76], size: 16, rotate: -3, text: '回来啦！' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '它好了！' },
    },
  },
];
