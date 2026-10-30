/* S10 晚安：嘘——别吵醒它 */
export default [
  {
    id: 'p23',
    template: 't-night',
    sound: 'snore',
    aria: '晚安，噜啵。呼噜……呼噜……点一下月亮。',
    bg: { kind: 'stars', focus: [500, 500], cover: 'all' },
    props: [{ kind: 'moon', at: [620, 80], scale: 0.52, class: 'prop-moon' }],
    char: { pose: 'asleep', state: 'state-pale', at: [60, 420], scale: 0.56, spiral: true },
    text: {
      narration: { text: '晚安，噜啵。', at: [60, 70], size: 3.4, width: 400, color: '--paper' },
      sound: { at: [300, 100], size: 14, rotate: 2, color: '--paper', text: '呼噜……<br>呼噜……' },
      prompt: { text: '点一下月亮。', at: [620, 870], size: 4, width: 320, color: '--paper' },
    },
    /* 热区罩住月亮本身（渲染后可见框约 724–1036 × 184–496）。
       原来的 [600,60] 只压住月亮左上一小块，点月亮右侧会点空、直接翻页。 */
    hotspot: { action: 'moon', target: 'moon', at: [720, 180], size: 320, label: '点一下月亮' },
  },
  {
    id: 'p24',
    noSound: true,
    template: 't-night t-night-deep',
    aria: '嘘——别吵醒它。',
    bg: { kind: 'stars', focus: [500, 300], cover: 'all' },
    props: [{ kind: 'moon', at: [660, 120], scale: 0.42 }],
    char: { pose: 'asleep', state: 'state-pale', at: [150, 420], scale: 0.56, spiral: true },
    text: {
      narration: { text: '嘘——别吵醒它。', at: [60, 80], size: 3.4, width: 400, color: '--paper' },
    },
  },
];
