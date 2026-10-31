/* S18 跺脚：一起跺脚
   —— 亲子动作页之三，也是最响的一个：
      跺下去整页都跟着颤一下——纸上的抖动是屏幕给不了的。 */
export default [
  {
    id: 'p53',
    template: 't-dialog',
    aria: '我们一起跺脚！咚！点它，一起跺。',
    /* 放射线从右下角冲上来：震动从脚下起 */
    bg: { kind: 'rays-corner', colors: ['--orange', '--yellow-deep'], focus: [500, 900], cover: 'all', wash: '--wash-orange' },
    char: { pose: 'cheer', at: [360, 300], scale: 0.56, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 360, text: '我们一起跺脚！' },
      sound: { text: '咚！', at: [560, 76], size: 20, rotate: -4 },
      prompt: { at: [60, 870], size: 4, width: 380, text: '点它，一起跺。' },
    },
    hotspot: { action: 'stomp', target: 'char', at: [434, 392], size: 411, label: '和它一起跺脚' },
  },
  {
    id: 'p54',
    template: 't-burst',
    sound: 'giggle',
    aria: '大家都跳起来啦！耶！',
    bg: { kind: 'confetti', focus: [500, 500], cover: 'all', wash: '--wash-yellow' },
    char: { pose: 'happy', at: [470, 290], scale: 0.6, spiral: true },
    /* 被跺得跳起来的东西：书里那三样。
       泡泡原来放在 [760,760]，正好黏在角色的脚上，像它抱着一个泡泡——
       彩纸底子本来就够热闹了，泡泡撤掉。 */
    props: [
      { kind: 'apple', at: [150, 300], scale: 0.2, rotate: -16 },
      { kind: 'fish', at: [250, 700], scale: 0.2, rotate: 14 },
      { kind: 'star', at: [850, 210], scale: 0.18, rotate: 12 },
    ],
    text: {
      narration: { at: [60, 70], size: 3.4, width: 400, text: '大家都跳起来啦！' },
      sound: { text: '耶！', at: [560, 76], size: 20, rotate: 5 },
    },
  },
];
