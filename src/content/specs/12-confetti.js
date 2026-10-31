/* S8 彩纸：把噜啵卷起来，送到天上 */
export default [
  {
    id: 'p19',
    template: 't-burst',
    sound: 'pop',
    aria: '好多颜色！红的、蓝的、黄的……点一片彩纸。',
    bg: { kind: 'confetti', focus: [500, 500], cover: 'all', wash: '--wash-cream' },
    char: { pose: 'happy', at: [300, 380], scale: 0.6, spiral: true },
    props: [
      { kind: 'flower', class: 'confetti-flower', at: [110, 210], scale: 0.22, rotate: -12, style: '--flower: var(--pink); --flower-center: var(--yellow)' },
      { kind: 'flower', class: 'confetti-flower', at: [700, 170], scale: 0.17, rotate: 18, style: '--flower: var(--orange); --flower-center: var(--pink)' },
      { kind: 'flower', class: 'confetti-flower', at: [740, 620], scale: 0.2, rotate: -8, style: '--flower: var(--green); --flower-center: var(--yellow)' },
      { kind: 'flower', class: 'confetti-flower', at: [180, 640], scale: 0.15, rotate: 24, style: '--flower: var(--blue); --flower-center: var(--pink)' },
    ],
    text: {
      narration: { at: [60, 70], size: 3.4, width: 400, text: '好多颜色！<br>红的、蓝的、黄的……' },
      sound: { text: '啵！', at: [520, 80], size: 20, rotate: 6 },
      prompt: { text: '点一片彩纸。', at: [60, 870], size: 4, width: 300 },
    },
    /* 热区罩住整片彩纸：提示写的是"点一片彩纸"，
       原来只压住其中一朵花——点别处的彩纸会直接翻页，彩纸不变花。 */
    hotspot: { action: 'confetti', target: 'confetti', at: [0, 0], size: 1000, label: '点一片彩纸' },
  },
  {
    id: 'p20',
    template: 't-dialog',
    sound: 'whoosh',
    aria: '彩纸把噜啵卷起来，送到天上啦！',
    bg: { kind: 'bands', colors: ['--orange', '--yellow'], focus: [500, 500], cover: 'all', wash: '--wash-cream' },
    char: { pose: 'happy', at: [360, 140], scale: 0.46, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 420, text: '彩纸把噜啵卷起来，<br>送到天上啦！' },
      sound: { text: '啊呜——', at: [540, 78], size: 16, rotate: 5 },
    },
  },
];
