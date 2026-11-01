/* S5 我来照顾你 / 先盖上毯子 */
export default [
  {
    id: 'p13',
    template: 't-dialog',
    sound: 'chirp',
    aria: '「我来照顾你。」',
    bg: { kind: 'rays-tight', colors: ['--yellow'], gap: '--paper', focus: [500, 620], cover: 'all', wash: '--wash-yellow' },
    char: { pose: 'tired', state: 'state-pale', at: [300, 320], scale: 0.6, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '「我来照顾你。」' },
      sound: { at: [520, 76], size: 14, rotate: 3, text: '嗯……' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '先盖上毯子。' },
    },
  },
  {
    id: 'p14',
    template: 't-dialog',
    sound: 'paper',
    aria: '先给它盖上毯子。',
    bg: { kind: 'rays-tight', colors: ['--yellow-deep', '--yellow'], gap: '--paper', focus: [500, 640], cover: 'all', wash: '--wash-yellow' },
    props: [{ kind: 'blanket', at: [320, 400], scale: 0.42, rotate: -3, class: 'prop-blanket' }],
    char: { pose: 'tired', state: 'state-pale', at: [290, 390], scale: 0.56, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '先给它盖上毯子。' },
      sound: { at: [520, 76], size: 14, rotate: 3, text: '沙——' },
      prompt: { at: [60, 870], size: 4, width: 560, text: '点毯子，给它盖上。' },
    },
    hotspot: { action: 'cover', target: 'blanket', at: [363, 374], size: 351, label: '给它盖上毯子' },
  },
];
