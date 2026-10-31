/* S19 三个红苹果：数对了 */
export default [
  {
    id: 'p41',
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
  {
    id: 'p42',
    template: 't-burst',
    sound: 'giggle',
    aria: '数对啦！',
    bg: { kind: 'confetti', focus: [500, 500], cover: 'all', wash: '--wash-yellow' },
    char: { pose: 'happy', at: [330, 380], scale: 0.58, spiral: true },
    props: [
      { kind: 'flower', at: [140, 200], scale: 0.16, style: '--flower: var(--yellow); --flower-center: var(--orange)' },
      { kind: 'flower', at: [820, 170], scale: 0.13, rotate: 20, style: '--flower: var(--orange); --flower-center: var(--yellow)' },
      { kind: 'flower', at: [870, 760], scale: 0.15, rotate: -14, style: '--flower: var(--pink); --flower-center: var(--yellow)' },
      { kind: 'flower', at: [110, 800], scale: 0.12, rotate: 8, style: '--flower: var(--green); --flower-center: var(--yellow)' },
    ],
    text: {
      narration: { at: [60, 70], size: 3.4, width: 340, text: '数对啦！' },
      sound: { text: '嘿嘿！', at: [490, 76], size: 16, rotate: 4 },
    },
  },
];
