/* S26 它的呼噜声 */
export default [
  {
    id: 'p57',
    template: 't-night',
    sound: 'snore',
    aria: '它的呼噜声，一轻一重。',
    bg: { kind: 'stars', focus: [500, 500], cover: 'all', wash: '--night' },
    char: { pose: 'asleep', state: 'state-pale', at: [260, 450], scale: 0.6, spiral: true },
    props: [{ kind: 'zzz', at: [700, 260], scale: 0.5, class: 'prop-zzz' }],
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, color: '--paper', text: '它的呼噜声，<br>一轻一重。' },
      sound: { at: [300, 260], size: 14, rotate: 2, color: '--paper', text: '呼噜……' },
    },
  },
  {
    id: 'p58',
    template: 't-night',
    noSound: true,
    aria: '屋里只剩下这一个声音。',
    bg: { kind: 'stars', focus: [500, 300], cover: 'all', wash: '--night-deep' },
    char: { pose: 'asleep', state: 'state-pale', at: [300, 460], scale: 0.6, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, color: '--paper', text: '屋里只剩下<br>这一个声音。' },
      prompt: { at: [60, 870], size: 4, width: 380, color: '--paper', text: '睡吧。' },
    },
  },
];
