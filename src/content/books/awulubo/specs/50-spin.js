/* S17 转圈：一起转圈
   —— 亲子动作页之二。转圈是三岁孩子就会、也最愿意做的动作：
      转到晕为止。 */
export default [
  {
    id: 'p50',
    template: 't-dialog',
    aria: '我们一起转圈！呼——点它，一起转。',
    /* 漩涡当背景：转圈这件事，画面上就该有个漩涡 */
    bg: { kind: 'swirl', colors: ['--orange', '--yellow'], focus: [1000, 500], cover: 'all', wash: '--wash-orange' },
    char: { pose: 'happy', at: [360, 240], scale: 0.56, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 360, text: '我们一起转圈！' },
      sound: { text: '呼——', at: [560, 76], size: 18, rotate: 3 },
      prompt: { at: [60, 870], size: 4, width: 380, text: '点它，一起转。' },
    },
    hotspot: { action: 'spin', target: 'char', at: [433, 331], size: 413, label: '和它一起转圈' },
  },
  {
    id: 'p51',
    template: 't-dialog',
    sound: 'sigh',
    aria: '它转晕啦。晕……',
    bg: { kind: 'swirl', colors: ['--orange', '--yellow'], focus: [0, 500], cover: 'all', wash: '--wash-orange' },
    /* 转晕了：脸色发白，姿势软下来 */
    char: { pose: 'idle', state: 'state-pale', at: [360, 260], scale: 0.56, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 300, text: '它转晕啦。' },
      sound: { text: '晕……', at: [470, 76], size: 14, rotate: -3 },
    },
  },
];
