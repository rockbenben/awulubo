/* S13 躲猫猫：咦？噜啵去哪儿了
   —— 参考书的"咦？不见了"。它不在这一页，它在下一页：翻过去就找到了。 */
export default [
  {
    id: 'p29',
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
    id: 'p30',
    template: 't-search',
    sound: 'giggle',
    aria: '找到我啦！嘿！',
    bg: { kind: 'sprinkle', focus: [500, 500], cover: 'all', wash: '--wash-purple' },
    props: [
      /* 苹果跟上一页同一个位置：它一直躲在苹果后面 */
      { kind: 'apple', at: [120, 430], scale: 0.42, rotate: 14, class: 'prop-apple' },
      { kind: 'fish', at: [690, 250], scale: 0.2, rotate: -12, class: 'prop-fish' },
      { kind: 'star', at: [400, 640], scale: 0.18, rotate: 18, class: 'prop-star' },
    ],
    /* 噜啵从苹果右边探出来：放在苹果正上方的话，
       苹果的叶子会落在它肚子上，看着像它长了一片叶子 */
    char: { pose: 'peek', at: [300, 240], scale: 0.52 },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '找到我啦！' },
      sound: { text: '嘿！', at: [300, 78], size: 16, rotate: 3 },
      /* 这一页的动作就是"拍一拍"：点噜啵自己也有反应 */
      prompt: { at: [60, 870], size: 4, width: 340, text: '你也拍拍它。' },
    },
  },
];
