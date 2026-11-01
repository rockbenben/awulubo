/* S21 一起跑、一起跳 —— 第二个高点（p47–48，全书 74%） */
export default [
  {
    id: 'p47',
    template: 't-burst',
    sound: 'giggle',
    aria: '一起跑！一起跳！',
    bg: { kind: 'confetti', focus: [500, 500], cover: 'all', wash: '--wash-yellow' },
    char: { pose: 'cheer', at: [300, 330], scale: 0.68, spiral: true },
    props: [
      { kind: 'flower', at: [140, 200], scale: 0.16, style: '--flower: var(--yellow); --flower-center: var(--orange)' },
      { kind: 'flower', at: [820, 170], scale: 0.13, rotate: 20, style: '--flower: var(--orange); --flower-center: var(--yellow)' },
      { kind: 'flower', at: [870, 760], scale: 0.15, rotate: -14, style: '--flower: var(--pink); --flower-center: var(--yellow)' },
      { kind: 'flower', at: [110, 800], scale: 0.12, rotate: 8, style: '--flower: var(--green); --flower-center: var(--yellow)' },
    ],
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '一起跑！<br>一起跳！' },
      sound: { at: [520, 76], size: 18, rotate: 3, text: '耶！' },
    },
  },
  {
    id: 'p48',
    template: 't-burst',
    sound: 'giggle',
    aria: '它一点事都没有了——比生病前还精神。',
    bg: { kind: 'confetti', focus: [500, 500], cover: 'all', wash: '--wash-yellow' },
    char: { pose: 'cheer', at: [300, 330], scale: 0.68, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '它一点事都没有了——<br>比生病前还精神。' },
      sound: { at: [520, 76], size: 16, rotate: -3, text: '嘿嘿！' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '病好了。' },
    },
  },
];
