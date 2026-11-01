/* S17 找到我啦：它从苹果右边探出来 */
export default [
  {
    id: 'p36',
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
  {
    id: 'p37',
    template: 't-search',
    sound: 'giggle',
    aria: '它藏在这个苹果后面！',
    bg: { kind: 'sprinkle', focus: [500, 500], cover: 'all', wash: '--wash-purple' },
    props: [
      { kind: 'apple', at: [120, 430], scale: 0.42, rotate: 14, class: 'prop-apple' },
      { kind: 'fish', at: [690, 250], scale: 0.2, rotate: -12, class: 'prop-fish' },
      { kind: 'star', at: [400, 640], scale: 0.18, rotate: 18, class: 'prop-star' },
    ],
    /* 这回它整个站出来：躲猫猫找到之后，要让它**完全露面**，
       不然孩子看到的还是"苹果旁边有一小块"，等于没找到。
       位置往左挪、手臂缩短一档：它伸出的手要留在页内，
       被页边切掉一截的手臂看着像印刷出错。 */
    char: { pose: 'proud', at: [495, 380], scale: 0.56, spiral: true },
    text: {
      /* 上一页它还藏在苹果后面，这一页它整个站出来了——
         字要说"跳出来"，不能说"藏在这个苹果后面"：图上是并排的，不是躲在后面 */
      narration: { at: [60, 70], size: 3.4, width: 460, text: '它从苹果后面跳出来啦！' },
      sound: { text: '嘿嘿！', at: [560, 76], size: 14, rotate: 3 },
    },
  },
];
