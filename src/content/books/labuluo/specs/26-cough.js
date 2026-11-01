/* S12 半夜，它咳了一声 */
export default [
  {
    id: 'p26',
    template: 't-night',
    sound: 'snore',
    aria: '半夜。它咳了一声。',
    bg: { kind: 'stars', focus: [500, 500], cover: 'all', wash: '--night' },
    char: { pose: 'asleep', state: 'state-pale', at: [120, 440], scale: 0.56, spiral: true },
    props: [{ kind: 'moon', at: [620, 90], scale: 0.42, class: 'prop-moon' }],
    text: {
      narration: { at: [60, 70], size: 3.4, width: 400, color: '--paper', text: '半夜。' },
      sound: { at: [300, 100], size: 14, rotate: 2, color: '--paper', text: '咳……' },
      prompt: { at: [60, 870], size: 4, width: 380, color: '--paper', text: '点一点，听听它。' },
    },
    hotspot: { action: 'cough', target: 'char', at: [193, 521], size: 413, label: '听听它怎么了' },
  },
  {
    id: 'p27',
    template: 't-night',
    sound: 'sigh',
    aria: '你醒过来，轻轻下床。',
    bg: { kind: 'stars', focus: [500, 300], cover: 'all', wash: '--night-deep' },
    char: { pose: 'asleep', state: 'state-pale', at: [200, 450], scale: 0.54, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, color: '--paper', text: '你醒过来，<br>轻轻下床。' },
      sound: { at: [520, 76], size: 14, rotate: -2, color: '--paper', text: '唔……' },
      prompt: { at: [60, 870], size: 4, width: 380, color: '--paper', text: '去看看它。' },
    },
  },
];
