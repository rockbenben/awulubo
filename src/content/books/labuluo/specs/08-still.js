/* S3 它趴着，一动不动 */
export default [
  {
    id: 'p08',
    template: 't-dialog',
    sound: 'snore',
    aria: '它趴着，一动不动。',
    bg: { kind: 'rays-tight', colors: ['--purple'], gap: '--paper', focus: [1000, 630], cover: 'all', wash: '--wash-purple' },
    /* 书脊边的放射线是深紫的，「呼……」压在笔触上只有 2.2:1——
       垫一块手绘白底块（同 awulubo p12/p40 的手法） */
    props: [{ kind: 'blob', at: [418, -214], scale: 0.7 }],
    char: { pose: 'tired', state: 'state-pale', at: [280, 340], scale: 0.62, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '它趴着，<br>一动不动。' },
      sound: { at: [520, 76], size: 14, rotate: 3, text: '呼……' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '摸一摸它。' },
    },
  },
  {
    id: 'p09',
    template: 't-dialog',
    sound: 'sigh',
    aria: '摸一摸它的肚子——好烫！',
    bg: { kind: 'rays-tight', colors: ['--red', '--pink-deep'], gap: '--paper', focus: [0, 630], cover: 'all', wash: '--wash-red' },
    char: { pose: 'ouch', state: 'state-pale', at: [280, 330], scale: 0.62, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '摸一摸它的肚子——<br>好烫！' },
      sound: { at: [520, 76], size: 14, rotate: -2, text: '嗯……' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '它生病了。' },
    },
    hotspot: { action: 'belly', target: 'belly', at: [400, 500], size: 320, label: '摸一摸它的肚子' },
  },
];
