/* S12 找一找：噜啵躲起来了 */
export default [
  {
    id: 'p27',
    noSound: true,
    template: 't-search',
    aria: '找一找：红苹果、蓝小鱼、黄星星。它们都藏在哪儿？点你找到的东西。',
    bg: { kind: 'sprinkle', focus: [500, 500], cover: 'all' },
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
    hotspot: [
      { action: 'find', target: 'apple', at: [130, 160], size: 180, label: '找红苹果' },
      { action: 'find', target: 'fish', at: [640, 620], size: 200, label: '找蓝小鱼' },
      { action: 'find', target: 'star', at: [580, 130], size: 160, label: '找黄星星' },
    ],
  },
  {
    id: 'p28',
    template: 't-search',
    sound: 'chirp',
    aria: '你都找到了吗？啊呜！',
    bg: { kind: 'confetti', focus: [500, 500], cover: 'all' },
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
