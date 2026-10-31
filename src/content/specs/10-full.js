/* S6 吃太多：鼓成一个大球 */
export default [
  {
    id: 'p15',
    template: 't-dialog',
    sound: 'chomp',
    aria: '还要！还要！啊呜、啊呜、啊呜……再喂一口！',
    bg: { kind: 'rays-corner', colors: ['--orange'], focus: [-40, 1040], cover: 'all', wash: '--wash-orange' },
    props: [
      { kind: 'apple', at: [680, 560], scale: 0.2, rotate: 16, class: 'prop-apple' },
      { kind: 'star', at: [780, 300], scale: 0.15, rotate: -12, class: 'prop-star' },
    ],
    char: { pose: 'hungry', at: [230, 190], scale: 0.56, spiral: true, id: 'grow-char' },
    text: {
      narration: { text: '还要！还要！', at: [60, 70], size: 3.4, width: 300 },
      sound: { at: [330, 100], size: 13, rotate: -2, text: '啊呜、啊呜、<br>啊呜……' },
      prompt: { text: '再喂一口！', at: [60, 870], size: 4, width: 320 },
    },
    /* 点空白不翻页：这一页要连喂三口，戳一下空地不该把这一页跳过去 */
    trap: true,
    hotspot: { action: 'feed', target: 'apple', at: [660, 580], size: 260, label: '再喂噜啵一口' },
  },
  {
    id: 'p16',
    template: 't-dialog',
    sound: 'gulu',
    aria: '哎呀……噜啵吃太多，动不了了。帮帮我——点点它的肚子。',
    bg: { kind: 'rays-tight', colors: ['--pink', '--pink-deep'], focus: [500, 640], cover: 'all', wash: '--wash-pink' },
    char: { pose: 'full', at: [120, 250], scale: 0.82, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 400, text: '哎呀……噜啵吃太多，<br>动不了了。帮帮我——' },
      sound: { text: '咕噜……', at: [500, 70], size: 12, rotate: 3 },
      prompt: { text: '点点它的肚子。', at: [60, 870], size: 4, width: 320 },
    },
    hotspot: { action: 'belly', target: 'belly', at: [340, 540], size: 280, label: '点点噜啵的肚子' },
  },
];
