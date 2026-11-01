/* S16 咦？噜啵去哪儿了：它吃掉了三样东西，就不见了
   —— 参考书的"咦？不见了"。它不在这一页，它在后面那页：翻过去就找到了。
      原来「找」和「找到」挤在一跨页（2 页）里，中间没有停顿；
      现在拆成两跨页，找的那两页要有**变化**，否则孩子翻过去发现是同一张图。 */
export default [
  {
    id: 'p34',
    template: 't-search',
    sound: 'poof',
    aria: '咦？噜啵去哪儿了？找找它藏在哪里。',
    bg: { kind: 'sprinkle', focus: [500, 500], cover: 'all', wash: '--wash-purple' },
    props: [
      { kind: 'apple', at: [120, 430], scale: 0.42, rotate: 14, class: 'prop-apple' },
      { kind: 'fish', at: [690, 250], scale: 0.2, rotate: -12, class: 'prop-fish' },
      { kind: 'star', at: [400, 640], scale: 0.18, rotate: 18, class: 'prop-star' },
    ],
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '咦？噜啵去哪儿了？' },
      sound: { text: '咦——？', at: [540, 78], size: 14, rotate: 3 },
      /* 纸上点不动：印刷版叫孩子翻页 */
      prompt: { at: [60, 870], size: 4, width: 340, text: '点一下，往后翻。', print: '翻过来找找看。' },
    },
    /* 这一页点哪儿都翻过去：没有要等的东西，答案在下一页。
       不标 trap——trap 是给"要点好几下才过"的页用的，这里一下就该看到答案。 */
  },
  {
    id: 'p35',
    template: 't-search',
    noSound: true,
    aria: '咦？苹果后面有东西！看那个小泡泡。',
    bg: { kind: 'sprinkle', focus: [500, 500], cover: 'all', wash: '--wash-purple' },
    props: [
      /* 泡泡先画，苹果后画——苹果把它压住一半，只露出一个头。
         顺序反了就成了一颗浮在苹果上方的泡泡，"藏在后面"读不出来了。 */
      { kind: 'bubble', at: [340, 380], scale: 0.18 },
      { kind: 'apple', at: [120, 430], scale: 0.42, rotate: 14, class: 'prop-apple' },
    ],
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '咦？苹果后面有东西！' },
      prompt: { at: [60, 870], size: 4, width: 380, text: '看那个小泡泡。' },
    },
  },
];
