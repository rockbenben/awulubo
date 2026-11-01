/* S10 晚安：嘘——别吵醒它 */
export default [
  {
    id: 'p27',
    template: 't-night',
    sound: 'snore',
    aria: '晚安，噜啵。呼噜……呼噜……点一下月亮。',
    bg: { kind: 'stars', focus: [500, 500], cover: 'all', wash: '--night' },
    /* 月亮整个在页内：它是个圆，被页边切掉一刀就是一条笔直的竖边，
       像印刷出错（角色那边有同样的规矩，见 check-layout.mjs）。
       原来在 [620,80]，右缘伸到 1036，超出 36 个单位。
       下一页 p28 用的是同一个月亮，放 [660,120] 就在页内——两页对不上。 */
    props: [{ kind: 'moon', at: [544, 80], scale: 0.52, class: 'prop-moon' }],
    char: { pose: 'asleep', state: 'state-pale', at: [60, 420], scale: 0.56, spiral: true },
    text: {
      narration: { text: '晚安，噜啵。', at: [60, 70], size: 3.4, width: 400, color: '--paper' },
      sound: { at: [300, 100], size: 14, rotate: 2, color: '--paper', text: '呼噜……<br>呼噜……' },
      prompt: { text: '点一下月亮。', at: [620, 870], size: 4, width: 320, color: '--paper' },
    },
    /* 热区罩住月亮本身（渲染后墨迹约 668–957 × 188–492）。
       原来的 [600,60] 只压住月亮左上一小块，点月亮右侧会点空、直接翻页。 */
    hotspot: { action: 'moon', target: 'moon', at: [653, 180], size: 320, label: '点一下月亮' },
  },
  {
    id: 'p28',
    noSound: true,
    template: 't-night t-night-deep',
    aria: '嘘——别吵醒它。',
    bg: { kind: 'stars', focus: [500, 300], cover: 'all', wash: '--night-deep' },
    props: [{ kind: 'moon', at: [660, 120], scale: 0.42 }],
    char: { pose: 'asleep', state: 'state-pale', at: [150, 420], scale: 0.56, spiral: true },
    text: {
      narration: { text: '嘘——别吵醒它。', at: [60, 80], size: 3.4, width: 400, color: '--paper' },
    },
  },
];
