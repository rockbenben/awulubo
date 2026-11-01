/* S27 明天见 —— 尾巴的最后一页 */
export default [
  {
    id: 'p58',
    template: 't-night',
    sound: 'snore',
    aria: '明天见。',
    bg: { kind: 'stars', focus: [500, 500], cover: 'all', wash: '--night' },
    char: { pose: 'asleep', state: 'state-pale', at: [280, 460], scale: 0.58, spiral: true },
    props: [{ kind: 'moon', at: [660, 100], scale: 0.4, class: 'prop-moon' }],
    text: {
      narration: { at: [60, 70], size: 3.4, width: 400, color: '--paper', text: '明天见。' },
      sound: { at: [300, 100], size: 14, rotate: 2, color: '--paper', text: '呼噜……' },
      prompt: { at: [60, 870], size: 4, width: 380, color: '--paper', text: '明天，它又会饿了。' },
    },
    hotspot: { action: 'moon', target: 'moon', at: [735, 175], size: 250, label: '点一下月亮' },
  },
  {
    id: 'p59',
    template: 't-dialog',
    sound: 'gulu',
    aria: '咕噜——咕噜——明天，它又会饿了。',
    bg: { kind: 'rays-tight', colors: ['--yellow'], gap: '--paper', focus: [500, 640], cover: 'all', wash: '--wash-yellow' },
    char: { pose: 'sleepy', at: [290, 340], scale: 0.6, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '咕噜——咕噜——<br>明天，它又会饿了。' },
      sound: { at: [520, 76], size: 16, rotate: 3, text: '咕噜……' },
    },
  },
];
