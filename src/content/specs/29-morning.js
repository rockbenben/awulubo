/* S11 第二天：肚子又叫了 */
export default [
  {
    id: 'p29',
    template: 't-dialog',
    noSound: true,
    /* 朗读稿要说清这一页有两个出口：
       摸噜啵 = 从头再来一遍（规格 §5.2/§7.6 定的循环），
       想往下读 = 点空白处翻页——原来只有循环那个出口有提示，
       照着提示读会一遍遍循环，读不到后面的"找一找"和结局页。 */
    aria: '咕噜——咕噜——第二天，噜啵的肚子又叫了。摸摸噜啵。（摸它会从头再读一遍；想往下读，点空白处翻页。）',
    bg: { kind: 'rays-corner', colors: ['--yellow', '--yellow-deep'], focus: [-40, 1040], cover: 'all', wash: '--wash-yellow' },
    char: { pose: 'hungry', at: [270, 300], scale: 0.74, spiral: true },
    text: {
      narration: {
        at: [60, 70],
        size: 3.4,
        /* 框宽要放得下最长的一行：12 个字 × 1.18em × 3.4u ≈ 481 千分比。
           原来 460，"了。"会折到第三行，孤零零一个字。 */
        width: 520,
        text: '咕噜——咕噜——<br>第二天，噜啵的肚子又叫了。',
      },
      /* 小字是给大人看的：说清"摸它会从头再来"，孩子那边的大字旁白与拟声词不动 */
      prompt: { at: [60, 870], size: 4, width: 380, text: '摸摸噜啵，从头来。' },
    },
    /* 热区罩住噜啵（渲染后可见框约 440–843 × 482–903）。
       原来的 [300,300] 压在角色上方空处——点噜啵的脸会直接翻页，
       "摸摸噜啵"这条指令根本执行不到。
       现在连角色的右缘和两只脚都罩住了：原来 340 见方只罩到 770，
       右边那条（770–843）点下去是"翻页"而不是"从头再来"。 */
    hotspot: { action: 'yawn', target: 'char', at: [369, 422], size: 541, label: '摸摸噜啵' },
  },
  {
    id: 'p30',
    template: 't-dialog',
    noSound: true,
    aria: '今天，你喂噜啵吃什么？',
    bg: { kind: 'rays-tight', colors: ['--green'], gap: '--paper', focus: [500, 620], cover: 'all', wash: '--wash-green' },
    props: [
      { kind: 'apple', at: [150, 230], scale: 0.22, rotate: -14, class: 'prop-apple' },
      { kind: 'fish', at: [420, 200], scale: 0.24, rotate: 10, class: 'prop-fish' },
      { kind: 'star', at: [690, 220], scale: 0.2, rotate: -8, class: 'prop-star' },
    ],
    char: { pose: 'peek', at: [290, 540], scale: 0.44 },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 500, text: '今天，你喂噜啵吃什么？' },
    },
  },
];
