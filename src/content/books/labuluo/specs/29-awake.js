/* S13 去看它：它又睡着了，呼吸平了 */
export default [
  {
    id: 'p29',
    template: 't-night',
    sound: 'snore',
    aria: '它又睡着了。呼吸平了。',
    bg: { kind: 'stars', focus: [500, 500], cover: 'all', wash: '--night' },
    char: { pose: 'asleep', state: 'state-pale', at: [250, 440], scale: 0.58, spiral: true },
    props: [{ kind: 'moon', at: [660, 100], scale: 0.4, class: 'prop-moon' }],
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, color: '--paper', text: '它又睡着了。<br>呼吸平了。' },
      sound: { at: [300, 240], size: 14, rotate: 2, color: '--paper', text: '呼噜……' },
      prompt: { at: [60, 870], size: 4, width: 380, color: '--paper', text: '再等等。' },
    },
  },
  {
    id: 'p30',
    template: 't-night',
    noSound: true,
    aria: '你坐在它旁边，等天亮。',
    bg: { kind: 'stars', focus: [500, 300], cover: 'all', wash: '--night-deep' },
    char: { pose: 'asleep', state: 'state-pale', at: [300, 460], scale: 0.56, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, color: '--paper', text: '你坐在它旁边，<br>等天亮。' },
      prompt: { at: [60, 870], size: 4, width: 380, color: '--paper', text: '等天亮。' },
    },
  },
];
