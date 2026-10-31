/* S12 找一找：噜啵躲起来了 */
export default [
  {
    id: 'p27',
    noSound: true,
    template: 't-search',
    aria: '找一找：红苹果、蓝小鱼、黄星星。它们都藏在哪儿？点你找到的东西。',
    bg: { kind: 'sprinkle', focus: [500, 500], cover: 'all', wash: '--wash-blue' },
    props: [
      { kind: 'apple', at: [150, 180], scale: 0.15, rotate: 20, class: 'prop-apple' },
      { kind: 'fish', at: [660, 640], scale: 0.17, rotate: -12, class: 'prop-fish' },
      { kind: 'star', at: [600, 150], scale: 0.13, rotate: 18, class: 'prop-star' },
    ],
    char: { pose: 'peek', at: [330, 520], scale: 0.42 },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 420, text: '找一找：红苹果、<br>蓝小鱼、黄星星。' },
      prompt: { text: '点你找到的东西。', at: [60, 870], size: 4, width: 320 },
    },
    /* 点空白不翻页：这一页是"找一找"，孩子本来就要满屏乱点，
       一戳空地就翻到"你都找到了吗？"——一个都没找到，书却问他找到没有。 */
    trap: true,
    /* 热区罩住各自的墨迹（苹果 128–255 × 223–336、小鱼 717–825 × 675–733、
       星星 577–732 × 161–293），而且都不小于 250 个单位——
       规格 §6.6：点按目标 ≥ 25% 页宽。
       原来三个热区都偏上偏大，苹果那一块的下缘点不到。
       三个热区上下分开（星止于 400、小鱼自 620 起），星星那一块
       也不会盖到小鱼（星星的墨迹到 732，小鱼从 717 起——横向差 15 个单位，
       靠上下分开避开：星星的热区只到 400，小鱼的热区从 620 起）。 */
    hotspot: [
      { action: 'find', target: 'apple', at: [104, 155], size: 250, label: '找红苹果' },
      { action: 'find', target: 'fish', at: [646, 596], size: 250, label: '找蓝小鱼' },
      { action: 'find', target: 'star', at: [540, 118], size: 250, label: '找黄星星' },
    ],
  },
  {
    id: 'p28',
    template: 't-search',
    sound: 'chirp',
    aria: '你都找到了吗？啊呜！',
    bg: { kind: 'confetti', focus: [500, 500], cover: 'all', wash: '--wash-yellow' },
    props: [
      { kind: 'apple', at: [140, 180], scale: 0.16, rotate: -10, class: 'prop-apple' },
      { kind: 'fish', at: [690, 200], scale: 0.18, rotate: 12, class: 'prop-fish' },
      { kind: 'star', at: [420, 150], scale: 0.15, rotate: -6, class: 'prop-star' },
    ],
    char: { pose: 'happy', at: [300, 360], scale: 0.58, spiral: true },
    text: {
      narration: { text: '你都找到了吗？', at: [60, 70], size: 3.4, width: 340 },
      sound: { text: '啊呜！', at: [518, 78], size: 20, rotate: 5 },
    },
  },
];
