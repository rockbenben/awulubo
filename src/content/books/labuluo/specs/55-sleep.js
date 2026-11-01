/* S25 孩子也困了 */
export default [
  {
    id: 'p55',
    template: 't-night',
    sound: 'sigh',
    aria: '你也困了。',
    bg: { kind: 'stars', focus: [500, 500], cover: 'all', wash: '--night' },
    char: { pose: 'asleep', state: 'state-pale', at: [200, 460], scale: 0.56, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 400, color: '--paper', text: '你也困了。' },
      sound: { at: [300, 100], size: 14, rotate: 2, color: '--paper', text: '唔……' },
      prompt: { at: [60, 870], size: 4, width: 380, color: '--paper', text: '躺在它旁边。' },
    },
  },
  {
    id: 'p56',
    template: 't-night',
    noSound: true,
    aria: '你躺在它旁边，睡着了。',
    bg: { kind: 'stars', focus: [500, 300], cover: 'all', wash: '--night-deep' },
    char: { pose: 'asleep', state: 'state-pale', at: [240, 470], scale: 0.56, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, color: '--paper', text: '你躺在它旁边，<br>睡着了。' },
      prompt: { at: [60, 870], size: 4, width: 380, color: '--paper', text: '一起睡。' },
    },
  },
];
