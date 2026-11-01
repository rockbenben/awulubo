/* S22 它变红了——它好了！ */
export default [
  {
    id: 'p49',
    template: 't-color',
    sound: 'chirp',
    aria: '它变红了——它好了！',
    bg: { kind: 'rays', colors: ['--red-deep', '--red'], gap: '--red', focus: [500, 680], cover: 'all', wash: '--red' },
    props: [{ kind: 'blob', at: [2.5, -138.5], scale: 0.5 }],
    char: { pose: 'happy', state: 'on-color state-red', at: [120, 300], scale: 0.74, spiral: true },
    text: {
      narration: { at: [90, 75], size: 3.4, width: 360, text: '它变红了——<br>它好了！' },
      sound: { at: [490, 70], size: 16, rotate: 3, color: '--paper', text: '啊呜！' },
    },
  },
  {
    id: 'p50',
    template: 't-dialog',
    sound: 'giggle',
    aria: '「你瞧我！」',
    bg: { kind: 'rays-tight', colors: ['--red'], gap: '--paper', focus: [500, 620], cover: 'all', wash: '--wash-red' },
    char: { pose: 'proud', state: 'on-color state-red', at: [290, 340], scale: 0.6, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '「你瞧我！」' },
      sound: { at: [520, 76], size: 16, rotate: -3, text: '嘿嘿！' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '你好了真好。' },
    },
  },
];
