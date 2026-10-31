/* S5 三样一起喂：变成彩虹 */
export default [
  {
    id: 'p13',
    template: 't-rainbow',
    sound: 'chomp',
    aria: '红苹果、蓝小鱼、黄星星。一、二、三——啊呜！按顺序点三样。',
    bg: { kind: 'rays-corner', colors: ['--pink', '--pink-deep'], focus: [-40, 1040], cover: 'all', wash: '--wash-pink' },
    props: [
      { kind: 'apple', at: [120, 210], scale: 0.24, rotate: -10, class: 'prop-apple' },
      { kind: 'fish', at: [400, 200], scale: 0.24, rotate: 6, class: 'prop-fish' },
      { kind: 'star', at: [690, 200], scale: 0.22, rotate: 12, class: 'prop-star' },
    ],
    char: { pose: 'peek', at: [640, 600], scale: 0.42 },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '红苹果、蓝小鱼、黄星星。<br>一、二、三——' },
      sound: { text: '啊呜！', at: [560, 70], size: 14, rotate: -3 },
      prompt: { text: '按顺序点三样。', at: [60, 870], size: 4, width: 300 },
    },
    /* 点空白不翻页：这一页要按顺序点三样，戳一下空地不该把这一页跳过去 */
    trap: true,
    /* 热区罩住各自的墨迹（苹果 158–368 × 204–399、小鱼 445–600 × 287–370、
       星星 695–872 × 234–418），而且都不小于 250 个单位——
       规格 §6.6：点按目标 ≥ 25% 页宽（屏幕上是 ≥ 120 × 120 CSS px 的下限）。
       原来三个热区都偏下偏大，两头露了边：苹果的下缘、星星的上缘点不到。
       三个热区左右分开（苹果止于 393、小鱼自 398 起、星星自 660 起），
       不会互相吃点击。 */
    hotspot: [
      { action: 'feed3', target: 'apple', at: [143, 177], size: 250, label: '喂红苹果' },
      { action: 'feed3', target: 'fish', at: [398, 244], size: 250, label: '喂蓝小鱼' },
      { action: 'feed3', target: 'star', at: [660, 193], size: 250, label: '喂黄星星' },
    ],
  },
  {
    id: 'p14',
    template: 't-rainbow',
    sound: 'rainbow',
    aria: '噜啵变成彩虹啦！彩虹！',
    bg: { kind: 'rainbow', focus: [500, 500], cover: 'all', wash: '--wash-cream' },
    props: [{ kind: 'blob', at: [2.5, -138.5], scale: 0.5 }],
    char: { pose: 'rainbow', at: [180, 300], scale: 0.68, spiral: true },
    text: {
      narration: { text: '噜啵变成彩虹啦！', at: [60, 70], size: 3.4, width: 400 },
      sound: { text: '彩虹！', at: [500, 70], size: 14, rotate: 4 },
    },
  },
];
