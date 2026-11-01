/* 版权 / 给大人的话 / 再读一次 / 后环衬 / 封底 —— 第二册
   （版权页原在 p04，挪到这里：中文书的版权页本来就在书末，
   放在正文前面会让正文从奇数页起，骑马钉的每一跨都被拆成两半） */
export default [
  {
    id: 'p60',
    template: 't-plain',
    screen: false,
    noSound: true,
    aria: '版权页与编者说：记录这本书的来历、字体授权，以及怎么和孩子一起读。',
    props: [{ kind: 'spiral', at: [430, 640], scale: 0.14 }],
    text: {
      narration: { at: [140, 120], size: 3.4, width: 600, text: '《噜啵生病啦！》' },
      adult: {
        at: [140, 240],
        size: 2.2,
        width: 720,
        text: [
          '一个要你照顾的小怪物',
          '文字与插画：＿＿＿＿＿＿＿',
          '出版：＿＿＿＿＿＿＿　初版：＿＿＿＿年＿＿月',
          '版本 1.0。未经许可不得转载。',
          '字体：站酷快乐体 · 霞鹜文楷（SIL OFL 1.1），可商用、可嵌入出版物。',
          '',
          '编者说：',
          '这一册和前一册反着来：前一册是孩子喂它，这一册是孩子照顾它。',
          '所以这一册里没有一样是它自己要的——它要的只是有人陪着。',
          '另有一本可以点、可以听的屏幕版，手机或平板上打开就能读。',
        ],
      },
    },
  },
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
