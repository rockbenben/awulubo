/* S27 晚安……呼噜……：第二次夜
   —— 第一次夜在 S12（p27–28），那是"第一天睡觉"；
      这一次是"故事讲完了睡觉"，同一个仪式再来一遍。
      同一句"嘘——"再出现一次，是**回家**的信号，不是重复。 */
export default [
  {
    id: 'p57',
    template: 't-night',
    sound: 'snore',
    aria: '晚安……呼噜……点一下月亮。',
    bg: { kind: 'stars', focus: [500, 500], cover: 'all', wash: '--night' },
    /* 月亮比第一次夜大一点、位置也不同（第一次在 [544,80]）：
       同一片天，同一轮月亮，不该是同一个位置——孩子会记得。 */
    props: [{ kind: 'moon', at: [560, 70], scale: 0.46, class: 'prop-moon' }],
    char: { pose: 'asleep', state: 'state-pale', at: [60, 440], scale: 0.54, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 400, color: '--paper', text: '晚安……' },
      sound: { at: [300, 100], size: 14, rotate: 2, color: '--paper', text: '呼噜……' },
      prompt: { at: [620, 870], size: 4, width: 320, color: '--paper', text: '点一下月亮。' },
    },
    /* 热区罩住月亮整个（渲染后墨迹约 652–928 × 162–438） */
    hotspot: { action: 'moon', target: 'moon', at: [642, 152], size: 300, label: '点一下月亮' },
  },
  {
    id: 'p58',
    template: 't-night t-night-deep',
    noSound: true,
    aria: '嘘——',
    bg: { kind: 'stars', focus: [500, 300], cover: 'all', wash: '--night-deep' },
    props: [{ kind: 'moon', at: [660, 90], scale: 0.38 }],
    char: { pose: 'asleep', state: 'state-pale', at: [150, 440], scale: 0.54, spiral: true },
    text: {
      narration: { at: [60, 80], size: 3.4, width: 400, color: '--paper', text: '嘘——' },
      /* 这一页唯一的"动作"是**翻慢一点**：
         结尾的两页要像慢慢睡着，不能像快进 */
      prompt: { at: [60, 870], size: 4, width: 340, color: '--paper', text: '轻轻翻过去。', print: '轻轻翻过去。' },
    },
  },
];
