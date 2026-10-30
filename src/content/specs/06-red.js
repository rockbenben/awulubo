/* S2 红苹果：吃完变红 */
export default [
  {
    id: 'p07',
    template: 't-food',
    sound: 'chomp',
    aria: '先吃一个红苹果。噜啵，张嘴。啊呜！点一下红苹果。',
    bg: { kind: 'disc', colors: ['--blue'], focus: [500, 940], cover: 'x' },
    props: [{ kind: 'apple', at: [320, 180], scale: 0.36, class: 'prop-apple' }],
    char: { pose: 'peek', at: [280, 620], scale: 0.5 },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 420, text: '先吃一个红苹果。<br>噜啵，张嘴——' },
      sound: { text: '啊呜！', at: [380, 560], size: 14, rotate: -3 },
      prompt: { text: '点一下红苹果。', at: [60, 870], size: 4, width: 300 },
    },
    hotspot: { action: 'feed', target: 'apple', at: [350, 232], size: 300, label: '喂噜啵吃红苹果' },
  },
  {
    id: 'p08',
    template: 't-color',
    sound: 'burp',
    aria: '啊呜！噜啵变红啦！嗝——',
    bg: { kind: 'rays', colors: ['--red-deep', '--red'], gap: '--red', focus: [500, 680] },
    props: [{ kind: 'blob', at: [2.5, -138.5], scale: 0.5 }],
    char: { pose: 'happy', state: 'on-color state-red', at: [120, 300], scale: 0.76, spiral: true },
    text: {
      narration: { text: '啊呜！噜啵变红啦！', at: [90, 75], size: 3.4, width: 360 },
      sound: { text: '嗝——', at: [490, 70], size: 16, rotate: 3, color: '--paper' },
    },
  },
];
