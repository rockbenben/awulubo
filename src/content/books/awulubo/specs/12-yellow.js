/* S4 黄星星：吃完变黄，亮得不得了 */
export default [
  {
    id: 'p12',
    template: 't-food',
    sound: 'chomp',
    aria: '再吃一颗黄星星。噜啵，张嘴。啊呜！点一下黄星星。',
    bg: { kind: 'rays-corner', colors: ['--purple'], focus: [-40, 1040], cover: 'all', wash: '--wash-purple' },
    props: [
      { kind: 'star', at: [300, 150], scale: 0.4, rotate: 10, class: 'prop-star' },
      /* 提示字压在深紫笔触上只有 2.2:1，垫一块手绘白底块（同 p12/p40 的手法） */
      { kind: 'blob', at: [6, 688], scale: 0.4 },
    ],
    char: { pose: 'peek', at: [280, 620], scale: 0.5 },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 420, text: '再吃一颗黄星星。<br>噜啵，张嘴——' },
      sound: { text: '啊呜！', at: [380, 560], size: 14, rotate: -3 },
      prompt: { text: '点一下黄星星。', at: [60, 870], size: 4, width: 300 },
    },
    /* 热区罩住黄星星的墨迹（311–634 × 201–537），
       原来偏上，星星的下尖点不到 */
    hotspot: { action: 'feed', target: 'star', at: [297, 193], size: 352, label: '喂噜啵吃黄星星' },
  },
  {
    id: 'p13',
    template: 't-color t-yellow',
    sound: 'sparkle',
    aria: '啊呜！噜啵变黄啦！闪闪闪！',
    bg: { kind: 'rays', colors: ['--yellow-deep', '--yellow'], gap: '--yellow', focus: [500, 680], wash: '--yellow' },
    props: [{ kind: 'blob', at: [2.5, -138.5], scale: 0.5 }],
    char: { pose: 'happy', state: 'on-color state-yellow', at: [120, 300], scale: 0.76, spiral: true },
    text: {
      narration: { text: '啊呜！噜啵变黄啦！', at: [90, 75], size: 3.4, width: 360 },
      /* 黄底白字只有 1.3:1，读不了；文字色交给模板的规则定（黄底黑字） */
      sound: { text: '闪闪闪！', at: [490, 70], size: 12, rotate: 3 },
    },
  },
];
