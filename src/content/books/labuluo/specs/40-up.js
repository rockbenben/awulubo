/* S19 它站起来了！ */
export default [
  {
    id: 'p40',
    template: 't-dialog',
    sound: 'chirp',
    aria: '它站起来了！',
    bg: { kind: 'rays-tight', colors: ['--yellow'], gap: '--paper', focus: [500, 620], cover: 'all', wash: '--wash-yellow' },
    char: { pose: 'happy', state: 'state-pale', at: [290, 330], scale: 0.62, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '它站起来了！' },
      sound: { at: [520, 76], size: 16, rotate: 3, text: '嗨！' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '它好了吗？' },
    },
  },
  {
    id: 'p41',
    template: 't-burst',
    sound: 'giggle',
    aria: '它转了个圈！',
    bg: { kind: 'rays', colors: ['--yellow'], gap: '--paper', focus: [500, 540], cover: 'all', wash: '--wash-yellow' },
    char: { pose: 'cheer', state: 'state-pale', at: [300, 340], scale: 0.64, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '它转了个圈！' },
      sound: { at: [520, 76], size: 16, rotate: -3, text: '嘿嘿！' },
      prompt: { at: [60, 870], size: 4, width: 560, text: '点它，跟它一起跳。' },
    },
    hotspot: { action: 'seen', target: 'char', at: [386, 445], size: 468, label: '跟它一起跳' },
  },
];
