/* S15 你都找到了吗：它一口一个全吃掉了
   —— 找一找的结果页。**接上因果**：它吃了 → 所以它不见了（下一跨页躲猫猫）。
      三岁孩子接得住这条链子，因为每一步都只做一件事。 */
export default [
  {
    id: 'p33',
    template: 't-search',
    noSound: true,
    aria: '你都找到了吗？快告诉它。',
    bg: { kind: 'sprinkle', focus: [500, 500], cover: 'all', wash: '--wash-cream' },
    props: [
      { kind: 'apple', at: [170, 320], scale: 0.24, rotate: -10, class: 'prop-apple' },
      { kind: 'fish', at: [620, 340], scale: 0.26, rotate: 12, class: 'prop-fish' },
      { kind: 'star', at: [760, 180], scale: 0.22, rotate: -6, class: 'prop-star' },
    ],
    /* 噜啵从底下探上来，等孩子把答案给它 */
    char: { pose: 'peek', at: [320, 620], scale: 0.46 },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '你都找到了吗？' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '快告诉它。' },
    },
  },
  {
    id: 'p34',
    template: 't-burst',
    sound: 'pop',
    aria: '啊呜！它一口一个，全吃掉了！',
    bg: { kind: 'confetti', focus: [500, 500], cover: 'all', wash: '--wash-yellow' },
    props: [
      { kind: 'apple', at: [150, 250], scale: 0.2, rotate: -14 },
      { kind: 'fish', at: [700, 230], scale: 0.22, rotate: 12 },
      { kind: 'star', at: [430, 150], scale: 0.18, rotate: -6 },
    ],
    char: { pose: 'cheeky', at: [300, 400], scale: 0.58, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '它一口一个，全吃掉了！' },
      sound: { at: [490, 76], size: 20, rotate: 5, text: '啊呜！' },
    },
  },
];
