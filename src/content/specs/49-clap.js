/* S16 拍手：一起拍手
   —— 亲子动作页之一。孩子手会痒，纸上的字留不住他，
      把他从纸上"请"到身体上：拍一下，跟着它拍一下。 */
export default [
  {
    id: 'p49',
    template: 't-dialog',
    aria: '我们一起拍手！啪！点它，一起拍。',
    bg: { kind: 'rays-tight', colors: ['--yellow'], gap: '--paper', focus: [500, 620], cover: 'all', wash: '--wash-yellow' },
    char: { pose: 'happy', at: [360, 220], scale: 0.58, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 340, text: '我们一起拍手！' },
      sound: { text: '啪！', at: [520, 76], size: 18, rotate: -3 },
      prompt: { at: [60, 870], size: 4, width: 380, text: '点它，一起拍。' },
    },
    /* 这一页没有进场音：啪的一声要等孩子动手才有。
       进来就响，等于替孩子拍了，他就不用拍了。 */
    hotspot: { action: 'clap', target: 'char', at: [460, 335], size: 390, label: '和它一起拍手' },
  },
  {
    id: 'p50',
    template: 't-burst',
    sound: 'giggle',
    aria: '拍得真开心！嘿嘿！',
    bg: { kind: 'confetti', focus: [500, 500], cover: 'all', wash: '--wash-yellow' },
    char: { pose: 'happy', at: [400, 300], scale: 0.6, spiral: true },
    props: [
      { kind: 'flower', at: [140, 200], scale: 0.16, style: '--flower: var(--yellow); --flower-center: var(--orange)' },
      { kind: 'flower', at: [820, 170], scale: 0.13, rotate: 20, style: '--flower: var(--orange); --flower-center: var(--yellow)' },
      { kind: 'flower', at: [870, 760], scale: 0.15, rotate: -14, style: '--flower: var(--pink); --flower-center: var(--yellow)' },
      { kind: 'flower', at: [110, 800], scale: 0.12, rotate: 8, style: '--flower: var(--green); --flower-center: var(--yellow)' },
    ],
    text: {
      narration: { at: [60, 70], size: 3.4, width: 340, text: '拍得真开心！' },
      sound: { text: '嘿嘿！', at: [470, 76], size: 14, rotate: 4 },
    },
  },
];
