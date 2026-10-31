/* S14 数一数：几个红苹果
   —— 书里第一个"要数东西"的页。数数是 3–5 岁最该练的本事之一，
   而且它纸上也成立：家长可以一起数。 */
export default [
  {
    id: 'p31',
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
    hotspot: [
      { action: 'count', target: 'apple', index: 1, at: [90, 170], size: 230, label: '数第一个苹果' },
      { action: 'count', target: 'apple', index: 2, at: [620, 250], size: 230, label: '数第二个苹果' },
      { action: 'count', target: 'apple', index: 3, at: [350, 500], size: 230, label: '数第三个苹果' },
    ],
  },
  {
    id: 'p32',
    template: 't-burst',
    sound: 'ding',
    aria: '三个红苹果！叮！',
    bg: { kind: 'confetti', focus: [500, 500], cover: 'all', wash: '--wash-yellow' },
    props: [
      { kind: 'apple', at: [110, 190], scale: 0.26, class: 'prop-apple count-item' },
      { kind: 'apple', at: [640, 270], scale: 0.26, class: 'prop-apple count-item' },
      { kind: 'apple', at: [370, 520], scale: 0.26, class: 'prop-apple count-item' },
    ],
    /* 答案：数字一开始就亮着 */
    numbers: [{ text: '3', at: [120, 450], size: 28, on: true }],
    char: { pose: 'happy', at: [600, 480], scale: 0.45, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '三个红苹果！' },
      /* 「一二三！」在站酷快乐体里是六根横杠，看着像一地散落的彩纸；
         这一页要的是"数对了"的铃铛声，不是数数本身。 */
      sound: { text: '叮！', at: [70, 740], size: 14, rotate: -2 },
    },
  },
];
