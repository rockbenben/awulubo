/* 给大人的话 / 再读一次 / 后环衬 / 封底
   （前面多了「躲猫猫」「数一找」两个跨页，这四页的编号整体往后挪） */
export default [
  {
    id: 'p33',
    template: 't-plain',
    screen: false,
    noSound: true,
    aria: '给大人的话：怎么读这本册子。念旁白让孩子跟拟声词，点错了再来一次，跳页倒着翻都没关系。',
    props: [{ kind: 'spiral', at: [430, 130], scale: 0.14 }],
    text: {
      narration: { at: [140, 120], size: 3.4, width: 600, text: '怎么读这本册子' },
      adult: {
        at: [140, 240],
        size: 2.2,
        width: 720,
        text: [
          '· 旁白念给孩子听，拟声词让孩子跟着说。',
          '· 每页只有一件事：念完，等孩子点。',
          '· 点错了别说「不对」，再来一次就好。',
          '· 咕噜——咕噜——，可以一起念。',
          '· 孩子跳过哪页、倒着翻，都没关系。',
          '· 摸噜啵那页会从头再来一遍；想往下读，点空白处就好。',
          '· 同一本书读十遍，是正常的，不是读腻了。',
          '· 纸书版没有声音；屏幕版可以点、可以听。',
        ],
      },
    },
  },
  {
    id: 'p34',
    template: 't-again',
    sound: 'chirp',
    aria: '读完啦？再读一次。点圆圈，转回去。',
    bg: { kind: 'rays-tight', colors: ['--yellow-deep', '--yellow'], gap: '--paper', focus: [500, 700], cover: 'all', wash: '--yellow' },
    props: [{ kind: 'arrow', at: [120, 420], scale: 0.72, class: 'prop-arrow' }],
    char: { pose: 'happy', at: [590, 450], scale: 0.54, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 300, text: '读完啦？' },
      sound: { at: [360, 70], size: 14, rotate: -2, text: '再读一次' },
      /* 屏幕上有圆圈可以点；纸书上点不动，叫大人翻回去。
         提示只能一行，所以印刷版这句要短（提示框 340 宽，4 号字约 8 个字）。 */
      prompt: { at: [60, 870], size: 4, width: 340, text: '点圆圈，转回去。', print: '翻回第一页吧。' },
    },
    /* 点空白也有反应：这是最后一页，翻不动了。
       以前点空白毫无动静（没声音、没动作），孩子会以为程序卡住了。
       现在摇一下头，提示"点那个圆圈"。 */
    trap: true,
    /* 热区罩住那个手绘圆圈（渲染后可见框约 186–690 × 240–647）。
       原来的 [280,540] 只压住箭头的一角——点圆圈毫无反应，
       而这是全书最后一页唯一能点的按钮。 */
    hotspot: { action: 'again', target: 'arrow', at: [250, 250], size: 420, label: '点圆圈，再读一次' },
  },
  {
    id: 'p35',
    template: 't-endpaper',
    screen: false,
    noSound: true,
    aria: '后环衬：苹果、小鱼、星星散落在纸上。',
    props: [
      { kind: 'star', at: [120, 140], scale: 0.18, rotate: 14 },
      { kind: 'apple', at: [620, 90], scale: 0.2, rotate: -10 },
      { kind: 'fish', at: [300, 380], scale: 0.2, rotate: -18 },
      { kind: 'star', at: [760, 520], scale: 0.15, rotate: 8 },
      { kind: 'apple', at: [120, 660], scale: 0.16, rotate: 16 },
      { kind: 'fish', at: [480, 760], scale: 0.17, rotate: 12 },
      { kind: 'star', at: [840, 820], scale: 0.13, rotate: -14 },
    ],
  },
  {
    id: 'p36',
    template: 't-color',
    screen: false,
    sound: 'chirp',
    aria: '《啊呜噜啵！》啊呜！',
    bg: { kind: 'rays', colors: ['--red-deep', '--red'], gap: '--red', focus: [500, 680], cover: 'all', wash: '--red' },
    /* 封底标题压在一块手绘白底块上：黑字直接放红底只有 4.3:1，达不到正文的 4.5:1 */
    props: [{ kind: 'blob', at: [240, -132], scale: 0.5 }],
    char: { pose: 'happy', state: 'on-color state-red', at: [260, 420], scale: 0.58, spiral: true },
    text: {
      narration: { at: [60, 90], size: 3.4, align: 'center', width: 1000, text: '《啊呜噜啵！》' },
      sound: { at: [60, 205], size: 16, align: 'center', width: 1000, color: '--paper', text: '啊呜！' },
    },
  },
];
