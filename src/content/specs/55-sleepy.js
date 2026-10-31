/* S26 玩够啦……我困了：把节奏降下来
   —— 尾巴的第一段。44 页版到这里就是最后一个"耶！"，
      戛然而止；这一页开始收。 */
export default [
  {
    id: 'p55',
    template: 't-dialog',
    sound: 'sigh',
    aria: '玩够啦……我困了。点它。',
    /* 淡紫：夜里和白天之间的颜色，比夜浅、比白深 */
    bg: { kind: 'rays-tight', colors: ['--purple'], gap: '--paper', focus: [500, 620], cover: 'all', wash: '--wash-purple' },
    char: { pose: 'sleepy', state: 'state-pale', at: [360, 320], scale: 0.6, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '玩够啦……我困了。' },
      sound: { text: '哈——', at: [520, 74], size: 14, rotate: -2 },
      prompt: { at: [60, 870], size: 4, width: 340, text: '点它。' },
    },
    /* 点它＝它打个哈欠，哈欠声 + 身子一软，然后翻页 */
    hotspot: { action: 'sleepy', target: 'char', at: [439, 417], size: 442, label: '点它' },
  },
  {
    id: 'p56',
    template: 't-dialog',
    sound: 'snore',
    aria: '打个哈欠……啊——',
    bg: { kind: 'rays-tight', colors: ['--blue'], gap: '--paper', focus: [500, 640], cover: 'all', wash: '--wash-blue' },
    char: { pose: 'yawn', state: 'state-pale', at: [360, 340], scale: 0.58, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '打个哈欠……' },
      sound: { text: '啊——', at: [520, 74], size: 14, rotate: 3 },
    },
  },
];
