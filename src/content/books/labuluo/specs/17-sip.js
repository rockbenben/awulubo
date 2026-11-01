/* S7 它终于喝了一小口 —— 第一个高点（p21–22，全书 33%） */
export default [
  {
    id: 'p17',
    template: 't-dialog',
    sound: 'chirp',
    aria: '「你得喝。」',
    bg: { kind: 'rays-tight', colors: ['--yellow'], gap: '--paper', focus: [500, 620], cover: 'all', wash: '--wash-yellow' },
    char: { pose: 'tired', state: 'state-pale', at: [280, 330], scale: 0.58, spiral: true },
    props: [{ kind: 'cup', at: [700, 430], scale: 0.34, rotate: 6, class: 'prop-cup' }],
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '「你得喝。」<br>「不然好不了。」' },
      sound: { at: [520, 76], size: 14, rotate: -2, text: '唔……' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '把杯子递过去。' },
    },
  },
  {
    id: 'p18',
    template: 't-burst',
    sound: 'bubble',
    aria: '咕嘟。它终于喝了一小口！',
    bg: { kind: 'rays', colors: ['--blue', '--deep-blue'], gap: '--blue', focus: [500, 560], cover: 'all', wash: '--wash-blue' },
    char: { pose: 'happy', state: 'state-pale', at: [300, 340], scale: 0.6, spiral: true },
    props: [{ kind: 'cup', at: [700, 430], scale: 0.32, rotate: 6, class: 'prop-cup' }],
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '咕嘟。<br>它终于喝了一小口！' },
      sound: { at: [520, 76], size: 16, rotate: 3, text: '咕嘟！' },
    },
    hotspot: { action: 'water', target: 'cup', at: [700, 430], size: 300, label: '把杯子递给它' },
  },
];
