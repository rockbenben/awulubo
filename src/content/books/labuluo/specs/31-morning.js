/* S14 早上——它的颜色回来了一点点 */
export default [
  {
    id: 'p31',
    template: 't-dialog',
    sound: 'chirp',
    aria: '早上。它的颜色回来了一点点。',
    bg: { kind: 'rays-tight', colors: ['--yellow-deep', '--yellow'], gap: '--paper', focus: [500, 620], cover: 'all', wash: '--wash-cream' },
    char: { pose: 'sleepy', state: 'state-pale', at: [290, 340], scale: 0.58, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '早上。<br>它的颜色回来了一点点。' },
      sound: { at: [520, 76], size: 14, rotate: 3, text: '嗯……' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '它还在睡。' },
    },
  },
  {
    id: 'p32',
    template: 't-dialog',
    sound: 'snore',
    aria: '它还在睡。睡得比昨天沉。',
    bg: { kind: 'rays-tight', colors: ['--yellow'], gap: '--paper', focus: [500, 640], cover: 'all', wash: '--wash-cream' },
    char: { pose: 'asleep', state: 'state-pale', at: [300, 350], scale: 0.6, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '它还在睡。<br>睡得比昨天沉。' },
      sound: { at: [520, 76], size: 14, rotate: -2, text: '呼噜……' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '该叫醒它吗？' },
    },
  },
];
