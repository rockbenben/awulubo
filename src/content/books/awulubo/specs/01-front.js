/* 封面 / 前环衬 / 扉页
   （版权页放在书末 p60：中文书的版权页本来就在最后，
   放在这里会让正文从奇数页起——骑马钉永远翻到「偶数|奇数」，
   正文的每一跨就会被拆成两半。见 AGENTS.md「故事与装订」。） */
/** @satisfies {import('../../../../js/model.ts').Spread} */
export default { pages: [
  {
    id: 'p01',
    template: 't-cover',
    sound: 'chirp',
    aria: '《啊呜噜啵！》一个要你喂的小怪物。点我，开始。',
    bg: { kind: 'rays', colors: ['--yellow-deep', '--yellow'], gap: '--yellow', focus: [500, 560], wash: '--yellow' },
    char: { pose: 'happy', at: [170, 220], scale: 0.64, spiral: true },
    text: {
      sound: { at: [75, 85], size: 17, align: 'center', width: 850, rotate: -2, text: '啊呜噜啵！' },
      narration: { at: [300, 290], size: 3.4, align: 'center', width: 400, text: '一个要你喂的小怪物' },
      /* 屏幕上要告诉孩子"点我"；纸书上点不动，封面上就不放这句（跟真的书封一样干净） */
      prompt: { at: [60, 870], size: 4, align: 'center', width: 1000, text: '点我，开始。', print: '' },
    },
    hotspot: { targetId: 'page', action: 'start', at: [0, 0], size: 1000, label: '点封面开始阅读' },
  },
  {
    id: 'p02',
    template: 't-endpaper',
    noSound: true,
    aria: '前环衬：苹果、小鱼、星星散落在纸上。',
    props: [
      { id: 'apple-1', kind: 'apple', at: [90, 120], scale: 0.19, rotate: -12 },
      { id: 'fish-1', kind: 'fish', at: [560, 60], scale: 0.22, rotate: 14 },
      { id: 'star-1', kind: 'star', at: [320, 330], scale: 0.17, rotate: -8 },
      { id: 'apple-2', kind: 'apple', at: [690, 430], scale: 0.15, rotate: 18 },
      { id: 'fish-2', kind: 'fish', at: [70, 600], scale: 0.18, rotate: -16 },
      { id: 'star-2', kind: 'star', at: [420, 700], scale: 0.2, rotate: 9 },
      { id: 'apple-3', kind: 'apple', at: [250, 830], scale: 0.14, rotate: 24 },
      { id: 'star-3', kind: 'star', at: [840, 790], scale: 0.12, rotate: -20 },
    ],
  },
  {
    id: 'p03',
    template: 't-title',
    sound: 'chirp',
    aria: '扉页：《啊呜噜啵！》一个要你喂的小怪物。',
    bg: { kind: 'rays-tight', colors: ['--pink', '--pink-deep'], focus: [500, 760], wash: '--wash-pink' },
    char: { pose: 'idle', at: [250, 470], scale: 0.6, spiral: true },
    text: {
      sound: { at: [250, 70], size: 15, align: 'center', width: 500, rotate: -1, text: '啊呜噜啵！' },
      narration: { at: [300, 300], size: 3.4, align: 'center', width: 400, text: '一个要你喂的小怪物' },
    },
  },
] };
