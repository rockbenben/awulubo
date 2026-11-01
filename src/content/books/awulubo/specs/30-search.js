/* S14 找一找：三样东西藏在哪儿
   —— 原来「找一找」和「你都找到了吗」挤在一跨页（2 页）里，
      孩子点完还没反应过来。现在拆成两跨页：
      这一跨页只管找，下一跨页才管"找到了，然后呢"。 */
export default [
  {
    id: 'p30',
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
    id: 'p31',
    template: 't-burst',
    sound: 'chirp',
    aria: '全找到啦！它们都在这儿。',
    /* 找齐了：三样东西不再藏在角落，大大方方摆出来。
       淡黄底 = 从"找一找"的淡蓝底升上来，孩子看得出场景换了。 */
    bg: { kind: 'sprinkle', focus: [500, 500], cover: 'all', wash: '--wash-yellow' },
    props: [
      { kind: 'apple', at: [180, 400], scale: 0.3, rotate: -10, class: 'prop-apple' },
      { kind: 'fish', at: [520, 420], scale: 0.32, rotate: 12, class: 'prop-fish' },
      { kind: 'star', at: [690, 380], scale: 0.28, rotate: -6, class: 'prop-star' },
    ],
    char: { pose: 'happy', at: [300, 620], scale: 0.44, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '全找到啦！' },
      sound: { at: [60, 230], size: 12, rotate: 2, text: '它们都在这儿！' },
    },
  },
];
