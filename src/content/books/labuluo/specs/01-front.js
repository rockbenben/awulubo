/* 封面 / 前环衬 / 扉页 —— 第二册
   （版权页放在书末 p60：中文书的版权页本来就在最后，
   放在这里会让正文从奇数页起——骑马钉永远翻到「偶数|奇数」，
   正文的每一跨就会被拆成两半。见 AGENTS.md 第 13 条。） */
export default [
  {
    id: 'p01',
    template: 't-cover',
    sound: 'chirp',
    aria: '《噜啵生病啦！》一个要你照顾的小怪物。点我，开始。',
    bg: { kind: 'rays', colors: ['--blue', '--deep-blue'], gap: '--blue', focus: [500, 560], wash: '--blue' },
    char: { pose: 'tired', state: 'state-pale', at: [170, 220], scale: 0.64, spiral: true },
    text: {
      sound: { at: [75, 85], size: 15, align: 'center', width: 850, rotate: -2, text: '噜啵生病啦！' },
      narration: { at: [300, 290], size: 3.4, align: 'center', width: 400, text: '一个要你照顾的小怪物' },
      prompt: { at: [60, 870], size: 4, align: 'center', width: 1000, text: '点我，开始。', print: '' },
    },
    hotspot: { action: 'start', at: [0, 0], size: 1000, label: '点封面开始阅读' },
  },
  {
    id: 'p02',
    template: 't-endpaper',
    noSound: true,
    aria: '前环衬：毯子、杯子、药丸散落在纸上。',
    props: [
      { kind: 'cup', at: [120, 120], scale: 0.2, rotate: -8 },
      { kind: 'pill', at: [600, 80], scale: 0.22, rotate: 12 },
      { kind: 'blanket', at: [300, 330], scale: 0.22, rotate: -4 },
      { kind: 'apple', at: [700, 460], scale: 0.15, rotate: 18 },
      { kind: 'cup', at: [80, 600], scale: 0.17, rotate: 14 },
      { kind: 'pill', at: [420, 720], scale: 0.18, rotate: -10 },
      { kind: 'star', at: [840, 800], scale: 0.13, rotate: 20 },
    ],
  },
  {
    id: 'p03',
    template: 't-title',
    sound: 'chirp',
    aria: '扉页：《噜啵生病啦！》一个要你照顾的小怪物。',
    bg: { kind: 'rays-tight', colors: ['--purple', '--blue'], focus: [500, 760], wash: '--wash-purple' },
    char: { pose: 'tired', state: 'state-pale', at: [250, 470], scale: 0.6, spiral: true },
    text: {
      sound: { at: [250, 70], size: 13, align: 'center', width: 500, rotate: -1, text: '噜啵生病啦！' },
      narration: { at: [300, 300], size: 3.4, align: 'center', width: 400, text: '一个要你照顾的小怪物' },
    },
  },
];
