/* S17 它张开嘴…… */
export default [
  {
    id: 'p37',
    template: 't-dialog',
    sound: 'chirp',
    aria: '它的眼睛睁开了一条缝。',
    bg: { kind: 'rays-tight', colors: ['--yellow'], gap: '--paper', focus: [500, 620], cover: 'all', wash: '--wash-yellow' },
    char: { pose: 'sleepy', state: 'state-pale', at: [280, 340], scale: 0.58, spiral: true },
    props: [{ kind: 'apple', at: [655, 430], scale: 0.3, rotate: -10, class: 'prop-apple' }],
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '它的眼睛<br>睁开了一条缝。' },
      sound: { at: [520, 76], size: 14, rotate: 3, text: '嗯……' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '它闻到苹果了。' },
    },
  },
  {
    id: 'p38',
    template: 't-burst',
    sound: 'chomp',
    aria: '它张开嘴了！',
    bg: { kind: 'rays', colors: ['--yellow-deep', '--yellow'], gap: '--yellow', focus: [500, 540], cover: 'all', wash: '--wash-yellow' },
    char: { pose: 'chomp', state: 'state-pale', at: [290, 330], scale: 0.62, spiral: true },
    props: [{ kind: 'apple', at: [610, 430], scale: 0.3, rotate: -10, class: 'prop-apple' }],
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '它张开嘴了！' },
      sound: { at: [520, 76], size: 18, rotate: -3, text: '啊——' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '把苹果给它。' },
    },
    hotspot: { action: 'feed', target: 'apple', at: [650, 405], size: 279, label: '把苹果给它' },
  },
];
