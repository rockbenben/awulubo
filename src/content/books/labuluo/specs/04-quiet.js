/* S1 今天，它没有说"咕噜——" */
export default [
  {
    id: 'p04',
    template: 't-dialog',
    sound: 'gulu',
    aria: '今天，噜啵没有说「咕噜——」。',
    bg: { kind: 'rays-tight', colors: ['--blue', '--deep-blue'], gap: '--paper', focus: [1000, 620], cover: 'all', wash: '--wash-blue' },
    char: { pose: 'tired', state: 'state-pale', at: [300, 300], scale: 0.6, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '今天，噜啵没有说<br>「咕噜——」。' },
      sound: { at: [520, 76], size: 14, rotate: 3, text: '……' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '你在哪儿呀？' },
    },
  },
  {
    id: 'p05',
    template: 't-dialog',
    sound: 'chirp',
    aria: '「噜啵？你在哪儿呀？」',
    bg: { kind: 'rays-tight', colors: ['--blue', '--deep-blue'], gap: '--paper', focus: [0, 620], cover: 'all', wash: '--wash-blue' },
    char: { pose: 'peek', at: [300, 620], scale: 0.5 },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '「噜啵？」<br>「你在哪儿呀？」' },
      sound: { at: [520, 76], size: 14, rotate: -2, text: '噜……' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '找找它。' },
    },
  },
];
