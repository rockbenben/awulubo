/* 给大人的话 / 再读一次 / 后环衬 / 封底 —— 第二册 */
export default [
  {
    id: 'p61',
    template: 't-plain',
    screen: false,
    noSound: true,
    aria: '给大人的话：怎么读这本册子。念旁白让孩子跟拟声词，点错了再来一次，跳页倒着翻都没关系。',
    props: [{ kind: 'spiral', at: [430, 130], scale: 0.14 }],
    text: {
      narration: { at: [140, 120], size: 3.4, width: 600, text: '怎么读这本册子' },
      adult: {
        at: [140, 240],
        size: 2.2,
        width: 720,
        text: [
          '· 旁白念给孩子听，拟声词让孩子跟着说。',
          '· 这一册里孩子是照顾人的那个：摸摸它、盖毯子、喂水喂药。',
          '  念到「苦」那一页，可以问一句「苦不苦？」——孩子会答。',
          '· 每页只有一件事：念完，等孩子点。',
          '· 点错了别说「不对」，再来一次就好。',
          '· 咕噜——咕噜——，可以一起念。',
          '· 孩子跳过哪页、倒着翻，都没关系。',
          '· 这一册可以读完接第一册：它好了，该喂它了。',
          '· 纸书版没有声音；屏幕版可以点、可以听。',
        ],
      },
    },
  },
  {
    id: 'p62',
    template: 't-again',
    sound: 'chirp',
    aria: '读完啦？再读一次。点圆圈，转回去。',
    bg: { kind: 'rays-tight', colors: ['--yellow-deep', '--yellow'], gap: '--paper', focus: [500, 700], cover: 'all', wash: '--yellow' },
    props: [{ kind: 'arrow', at: [120, 420], scale: 0.72, class: 'prop-arrow' }],
    char: { pose: 'happy', at: [540, 450], scale: 0.52, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 300, text: '读完啦？' },
      sound: { at: [360, 70], size: 14, rotate: -2, text: '再读一次' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '点圆圈，转回去。', print: '翻回第一页吧。' },
    },
    trap: true,
    hotspot: { action: 'again', target: 'arrow', at: [184, 190], size: 508, label: '点圆圈，再读一次' },
  },
  {
    id: 'p63',
    template: 't-endpaper',
    screen: false,
    noSound: true,
    aria: '后环衬：毯子、杯子、药丸、苹果散落在纸上。',
    props: [
      { kind: 'blanket', at: [280, 300], scale: 0.24, rotate: -4 },
      { kind: 'cup', at: [700, 180], scale: 0.18, rotate: 10 },
      { kind: 'pill', at: [120, 620], scale: 0.2, rotate: -12 },
      { kind: 'apple', at: [620, 700], scale: 0.16, rotate: 14 },
      { kind: 'star', at: [860, 460], scale: 0.13, rotate: -18 },
    ],
  },
  {
    id: 'p64',
    template: 't-color',
    screen: false,
    sound: 'chirp',
    aria: '《噜啵生病啦！》一个要你照顾的小怪物。',
    bg: { kind: 'rays', colors: ['--deep-blue', '--blue'], gap: '--blue', focus: [500, 680], cover: 'all', wash: '--blue' },
    props: [{ kind: 'blob', at: [240, -132], scale: 0.5 }],
    char: { pose: 'happy', state: 'on-color state-blue', at: [260, 420], scale: 0.58, spiral: true },
    text: {
      narration: { at: [60, 90], size: 3.4, align: 'center', width: 1000, text: '《噜啵生病啦！》' },
      /* 白字压在蓝底上只有 1.96:1——第一册的封底是红底，白字够；
         蓝色太浅，这一句得用墨色。 */
      sound: { at: [60, 205], size: 16, align: 'center', width: 1000, color: '--ink', text: '啊呜！' },
    },
  },
];
