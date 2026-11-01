/* S18 数一数，有几个：点一个苹果，数字就冒出来
   —— 书里第一个"要数东西"的页。数数是 3–5 岁最该练的本事之一，
      而且它纸上也成立：家长可以一起数。 */
export default [
  {
    id: 'p39',
    template: 't-search',
    sound: 'chirp',
    aria: '数一数，有几个红苹果？点一点，数出来。',
    bg: { kind: 'sprinkle', focus: [500, 500], cover: 'all', wash: '--wash-yellow' },
    props: [
      /* 不转：数到的苹果会弹一下，斜着弹看着像摔倒 */
      { kind: 'apple', at: [110, 190], scale: 0.26, class: 'prop-apple count-item' },
      { kind: 'apple', at: [640, 270], scale: 0.26, class: 'prop-apple count-item' },
      { kind: 'apple', at: [370, 520], scale: 0.26, class: 'prop-apple count-item' },
    ],
    /* 数字一开始藏着：数到一个，才在那个苹果旁边冒出来 */
    numbers: [
      { text: '1', at: [215, 250], size: 12 },
      { text: '2', at: [745, 330], size: 12 },
      { text: '3', at: [475, 580], size: 12 },
    ],
    char: { pose: 'peek', at: [640, 620], scale: 0.34 },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '数一数，有几个？' },
      /* 拟声词是噜啵自己问的：它问你几个。
         位置在右上角那条空带上——四个字摆中间会压到苹果。 */
      sound: { text: '几个？', at: [500, 80], size: 12, rotate: 3 },
      prompt: { at: [60, 870], size: 4, width: 340, text: '点一点，数出来。' },
    },
    /* 点空白不翻页：这一页要数三个才过，一戳空地就翻过去等于没数 */
    trap: true,
    /* 热区罩住各自的苹果（第一个 128–350 × 213–413、第二个 658–880 × 293–493、
       第三个 388–610 × 543–743），而且都不小于 250 个单位——
       规格 §6.6：点按目标 ≥ 25% 页宽。
       原来三个热区都偏左上，每个苹果的右下角都点不到——
       "点一点，数出来"，可孩子点苹果的右下角什么也没发生。 */
    hotspot: [
      { action: 'count', target: 'apple', index: 1, at: [104, 188], size: 250, label: '数第一个苹果' },
      { action: 'count', target: 'apple', index: 2, at: [634, 268], size: 250, label: '数第二个苹果' },
      { action: 'count', target: 'apple', index: 3, at: [364, 518], size: 250, label: '数第三个苹果' },
    ],
  },
  {
    id: 'p40',
    template: 't-search',
    sound: 'chirp',
    aria: '数出来啦！三个！',
    bg: { kind: 'sprinkle', focus: [500, 500], cover: 'all', wash: '--wash-yellow' },
    props: [
      /* 苹果还在原位：孩子刚数过的那三个，位置不能动 */
      { kind: 'apple', at: [110, 190], scale: 0.26, class: 'prop-apple count-item' },
      { kind: 'apple', at: [640, 270], scale: 0.26, class: 'prop-apple count-item' },
      { kind: 'apple', at: [370, 520], scale: 0.26, class: 'prop-apple count-item' },
    ],
    /* 三个数字都亮着：上一页是孩子一个一个点出来的，
       这一页把它们摆在一起——"1、2、3"是连着的 */
    numbers: [
      { text: '1', at: [215, 250], size: 12, on: true },
      { text: '2', at: [745, 330], size: 12, on: true },
      { text: '3', at: [475, 580], size: 12, on: true },
    ],
    char: { pose: 'happy', at: [640, 620], scale: 0.36 },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 400, text: '数出来啦！' },
      sound: { text: '三个！', at: [460, 80], size: 14, rotate: 3 },
    },
  },
];
