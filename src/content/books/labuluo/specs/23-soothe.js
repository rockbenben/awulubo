/* S10 拍拍它，哄它睡觉 */
export default [
  {
    id: 'p23',
    template: 't-dialog',
    sound: 'chirp',
    aria: '拍拍它，像哄小孩子那样。',
    bg: { kind: 'rays-tight', colors: ['--purple'], gap: '--paper', focus: [500, 620], cover: 'all', wash: '--wash-purple' },
    char: { pose: 'tired', state: 'state-pale', at: [290, 340], scale: 0.58, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '拍拍它，<br>像哄小孩子那样。' },
      sound: { at: [520, 76], size: 14, rotate: -2, text: '唔……' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '点一点，拍拍它。' },
    },
    hotspot: { action: 'massage', target: 'char', at: [366, 434], size: 428, label: '拍拍它' },
  },
  {
    id: 'p24',
    template: 't-dialog',
    sound: 'sigh',
    aria: '它的眼睛慢慢闭上了。',
    bg: { kind: 'rays-tight', colors: ['--blue'], gap: '--paper', focus: [500, 640], cover: 'all', wash: '--wash-blue' },
    char: { pose: 'sleepy', state: 'state-pale', at: [300, 340], scale: 0.58, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '它的眼睛<br>慢慢闭上了。' },
      sound: { at: [520, 76], size: 14, rotate: 3, text: '呼……' },
    },
  },
];
