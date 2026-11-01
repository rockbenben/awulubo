/* S2 你叫什么名字呀：先认识它，再喂它
   —— 44 页版从"喂它"直接开始，孩子不知道自己在跟谁说话。
      这一跨页把"认识"补上：问名字，它答名字，然后才轮到第一个苹果。 */
export default [
  {
    id: 'p06',
    template: 't-dialog',
    sound: 'chirp',
    aria: '你叫什么名字呀？点一下噜啵。',
    bg: { kind: 'rays-tight', colors: ['--green', '--yellow'], gap: '--paper', focus: [500, 620], cover: 'all', wash: '--wash-green' },
    char: { pose: 'curious', at: [300, 300], scale: 0.58, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '你叫什么名字呀？' },
      /* 它在"听"：一个"嗯？"就够了，别把这一页塞满 */
      sound: { text: '嗯？', at: [520, 78], size: 14, rotate: 3 },
      prompt: { at: [60, 870], size: 4, width: 340, text: '点一下它。' },
    },
    /* 热区罩住噜啵（渲染后可见框约 440–843 × 482–903）
       点它＝它歪一下头、叫一声，然后翻页 */
    hotspot: { action: 'name', target: 'char', at: [376, 394], size: 428, label: '点一下噜啵' },
  },
  {
    id: 'p07',
    template: 't-dialog',
    sound: 'giggle',
    aria: '我叫噜啵。嘿嘿。',
    /* 漩涡：它笑得转起来——这是全书第一次"它自己动"（第一次飞在 p23） */
    bg: { kind: 'swirl', colors: ['--green', '--yellow'], gap: '--paper', focus: [420, 540], cover: 'all', wash: '--wash-green' },
    char: { pose: 'shy', at: [300, 300], scale: 0.66, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 420, text: '我叫噜啵。' },
      sound: { text: '嘿嘿！', at: [500, 76], size: 16, rotate: 4 },
    },
  },
];
