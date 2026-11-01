/* S24 晚安…… */
export default [
  {
    id: 'p52',
    template: 't-night',
    sound: 'snore',
    aria: '晚安……',
    bg: { kind: 'stars', focus: [500, 500], cover: 'all', wash: '--night' },
    char: { pose: 'asleep', state: 'state-pale', at: [140, 440], scale: 0.58, spiral: true },
    props: [{ kind: 'moon', at: [620, 90], scale: 0.44, class: 'prop-moon' }],
    text: {
      narration: { at: [60, 70], size: 3.4, width: 400, color: '--paper', text: '晚安……' },
      sound: { at: [300, 100], size: 14, rotate: 2, color: '--paper', text: '呼噜……' },
      prompt: { at: [60, 870], size: 4, width: 380, color: '--paper', text: '点一下月亮。' },
    },
    hotspot: { action: 'moon', target: 'moon', at: [703, 173], size: 273, label: '点一下月亮' },
  },
  {
    id: 'p53',
    template: 't-night',
    noSound: true,
    aria: '窗外，月亮爬上来了。',
    bg: { kind: 'stars', focus: [500, 300], cover: 'all', wash: '--night-deep' },
    char: { pose: 'asleep', state: 'state-pale', at: [180, 460], scale: 0.56, spiral: true },
    props: [{ kind: 'moon', at: [700, 110], scale: 0.38 }],
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, color: '--paper', text: '窗外，<br>月亮爬上来了。' },
      prompt: { at: [60, 870], size: 4, width: 380, color: '--paper', text: '晚安。' },
    },
  },
];
