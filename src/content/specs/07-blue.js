/* S3 蓝小鱼：吃完变蓝，还会吐泡泡 */
export default [
  {
    id: 'p09',
    template: 't-food',
    sound: 'chomp',
    aria: '再来一条蓝小鱼。噜啵，张嘴。啊呜！点一下蓝小鱼。',
    /* 焦点用页心（不挪动爆闪）：挪动后页面上只剩射线的笔头——
       平切、没有飞白，看着是一块生硬的多边形。停在原位，中段才在画里。 */
    bg: { kind: 'rays-corner', colors: ['--green'], focus: [500, 500], cover: 'all', wash: '--wash-green' },
    props: [{ kind: 'fish', at: [250, 110], scale: 0.56, rotate: -8, class: 'prop-fish' }],
    char: { pose: 'peek', at: [280, 620], scale: 0.5 },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 420, text: '再来一条蓝小鱼。<br>噜啵，张嘴——' },
      sound: { text: '啊呜！', at: [380, 560], size: 14, rotate: -3 },
      prompt: { text: '点一下蓝小鱼。', at: [60, 870], size: 4, width: 300 },
    },
    /* 热区要罩住鱼本身：道具是按组件自己的几何渲染的，
       锚点 [250,110] 不是鱼在页面上的位置（鱼实际落在 414–789 之间），
       按锚点摆热区的话，点鱼会点空——书直接翻页过去，鱼根本没被喂到。 */
    hotspot: { action: 'feed', target: 'fish', at: [400, 205], size: 400, label: '喂噜啵吃蓝小鱼' },
  },
  {
    id: 'p10',
    template: 't-color t-blue',
    sound: 'bubble',
    aria: '啊呜！噜啵变蓝啦！噗噜，噗噜。',
    bg: { kind: 'rays', colors: ['--deep-blue'], gap: '--blue', focus: [500, 680], wash: '--blue' },
    props: [
      { kind: 'blob', at: [2.5, -138.5], scale: 0.5 },
      { kind: 'bubble', at: [90, 690], scale: 0.2 },
      { kind: 'bubble', at: [175, 800], scale: 0.11 },
    ],
    char: { pose: 'happy', state: 'on-color state-blue', at: [120, 300], scale: 0.76, spiral: true },
    text: {
      narration: { text: '啊呜！噜啵变蓝啦！', at: [90, 75], size: 3.4, width: 360 },
      /* 蓝底白字只有 1.95:1，读不了；文字色交给模板的规则定（蓝底黑字） */
      sound: { at: [500, 70], size: 12, rotate: 3, text: '噗噜，<br>噗噜。' },
    },
  },
];
