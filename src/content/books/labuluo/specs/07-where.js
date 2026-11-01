/* S2 找找看：它在毯子底下 */
export default [
  {
    id: 'p07',
    template: 't-search',
    sound: 'chirp',
    aria: '桌子底下没有。床底下呢？',
    bg: { kind: 'sprinkle', focus: [500, 500], cover: 'all', wash: '--wash-purple' },
    props: [
      { kind: 'cup', at: [160, 190], scale: 0.16, rotate: -12, class: 'prop-cup' },
      { kind: 'pill', at: [620, 640], scale: 0.17, rotate: 10, class: 'prop-pill' },
      { kind: 'star', at: [600, 160], scale: 0.14, rotate: 16, class: 'prop-star' },
    ],
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '桌子底下没有。<br>床底下呢？' },
      sound: { at: [520, 76], size: 14, rotate: -2, text: '嗯……' },
      prompt: { at: [60, 870], size: 4, width: 560, text: '点一点，掀开看看。' },
    },
    trap: true,
    hotspot: [
      { action: 'find', target: 'cup', at: [104, 155], size: 250, label: '掀开杯子看看' },
      { action: 'find', target: 'pill', at: [646, 596], size: 250, label: '掀开药丸看看' },
      { action: 'find', target: 'star', at: [540, 118], size: 250, label: '掀开星星看看' },
    ],
  },
  {
    id: 'p08',
    template: 't-search',
    sound: 'giggle',
    aria: '找到了！它躲在毯子底下。',
    bg: { kind: 'sprinkle', focus: [500, 500], cover: 'all', wash: '--wash-purple' },
    props: [{ kind: 'blanket', at: [250, 380], scale: 0.34, rotate: -3, class: 'prop-blanket' }],
    char: { pose: 'tired', state: 'state-pale', at: [420, 430], scale: 0.48, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '找到了！<br>它躲在毯子底下。' },
      sound: { at: [520, 76], size: 14, rotate: 3, text: '找到啦……' },
    },
  },
];
