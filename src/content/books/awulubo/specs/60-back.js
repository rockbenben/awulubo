/* 版权 / 给大人的话 / 再读一次 / 后环衬 / 封底
   （版权页原在 p04，挪到这里：中文书的版权页本来就在书末，
   放在正文前面会让正文从奇数页起，骑马钉的每一跨都被拆成两半） */
/** @satisfies {import('../../../../js/model.ts').Spread} */
export default { pages: [
  {
    id: 'p60',
    template: 't-plain',
    screen: false,
    noSound: true,
    aria: "《啊呜噜啵！》\n一个要你喂的小怪物\n文字与插画：rockbenben\n出版：＿＿＿＿＿＿＿　初版：＿＿＿＿年＿＿月\n作品内容：CC BY-NC-ND 4.0，非商业分享请署名。\n字体：站酷快乐体 · 霞鹜文楷（SIL OFL 1.1），可商用、可嵌入出版物。\n\n编者说：从接受喂食到主动找孩子、赠送颜色。读到犹豫的地方，可以停一停，听孩子怎么说。",
    props: [{ id: 'spiral-1', kind: 'spiral', at: [430, 640], scale: 0.14 }],
    text: {
      narration: { at: [140, 120], size: 3.4, width: 600, text: "《啊呜噜啵！》" },
      adult: {
        at: [140, 240],
        size: 2.2,
        width: 720,
        text: [
          "一个要你喂的小怪物",
          "文字与插画：rockbenben",
          "出版：＿＿＿＿＿＿＿　初版：＿＿＿＿年＿＿月",
          "作品内容：CC BY-NC-ND 4.0，非商业分享请署名。",
          "字体：站酷快乐体 · 霞鹜文楷（SIL OFL 1.1），可商用、可嵌入出版物。",
          "",
          "编者说：从接受喂食到主动找孩子、赠送颜色。读到犹豫的地方，可以停一停，听孩子怎么说。"
        ],
      },
    },
  },
  {
    id: 'p61',
    template: 't-plain',
    screen: false,
    noSound: true,
    aria: "怎么读这本册子\n旁白慢慢念，拟声让孩子接着说。指认、拍手、呼气都可以在共读时一起做，不要求每页都做动作。孩子没有回应时，可以等一等，也可以翻过去。\n这册可以特别停在：p42–p43 叫到回应与 p46–p47 送颜色。让孩子说说看，不急着给答案。\n睡前最后几跨，声音逐渐放轻。孩子想停在某一页，就在那里停一会儿。",
    props: [{ id: 'spiral-1', kind: 'spiral', at: [430, 130], scale: 0.14 }],
    text: {
      narration: { at: [140, 120], size: 3.4, width: 600, text: "怎么读这本册子" },
      adult: {
        at: [140, 240],
        size: 2.2,
        width: 720,
        text: [
          "旁白慢慢念，拟声让孩子接着说。指认、拍手、呼气都可以在共读时一起做，不要求每页都做动作。孩子没有回应时，可以等一等，也可以翻过去。",
          "这册可以特别停在：p42–p43 叫到回应与 p46–p47 送颜色。让孩子说说看，不急着给答案。",
          "睡前最后几跨，声音逐渐放轻。孩子想停在某一页，就在那里停一会儿。"
        ],
      },
    },
  },
  {
    id: 'p62',
    exit: 'p04',
    template: 't-again',
    noSound: true,
    aria: "还想再读吗？\n点圆圈，再读一次。",
    bg: { kind: 'rays-tight', colors: ['--yellow-deep', '--yellow'], gap: '--paper', focus: [500, 700], cover: 'all', wash: '--yellow' },
    props: [{ id: 'arrow-1', kind: 'arrow', at: [120, 420], scale: 0.72, class: 'prop-arrow' }],
    char: { pose: 'happy', at: [540, 450], scale: 0.52, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 300, text: "还想再读吗？" },
      /* 屏幕上有圆圈可以点；纸书上点不动，叫大人翻回去。
         提示保持一行；框宽按 R5 整句适配，保留原字号与位置。 */
      prompt: { at: [60, 870], size: 4, width: 400, text: "点圆圈，再读一次。", print: "翻回封面吧。" },
    },
    /* 点空白也有反应：这是最后一页，翻不动了。
       以前点空白毫无动静（没声音、没动作），孩子会以为程序卡住了。
       现在摇一下头，提示"点那个圆圈"。 */
    trap: true,
    /* 热区罩住那个手绘圆圈（渲染后墨迹约 192–684 × 245–642）。
       原来的 [280,540] 只压住箭头的一角——点圆圈毫无反应，
       而这是全书最后一页唯一能点的按钮。
       原来的 [250,250] 420 见方也偏右上：圆圈左边那一大截（192–250）
       在热区外，孩子瞄准圆圈左边按下去，书只是摇一下头。 */
    hotspot: { targetId: 'arrow-1', action: 'again', target: 'arrow', at: [184, 190], size: 508, label: '点圆圈，再读一次' },
  },
  {
    id: 'p63',
    template: 't-endpaper',
    screen: false,
    noSound: true,
    aria: '后环衬：苹果、小鱼、星星散落在纸上。',
    props: [
      { id: 'star-1', kind: 'star', at: [120, 140], scale: 0.18, rotate: 14 },
      { id: 'apple-1', kind: 'apple', at: [620, 90], scale: 0.2, rotate: -10 },
      { id: 'fish-1', kind: 'fish', at: [300, 380], scale: 0.2, rotate: -18 },
      { id: 'star-2', kind: 'star', at: [760, 520], scale: 0.15, rotate: 8 },
      { id: 'apple-2', kind: 'apple', at: [120, 660], scale: 0.16, rotate: 16 },
      { id: 'fish-2', kind: 'fish', at: [480, 760], scale: 0.17, rotate: 12 },
      { id: 'star-3', kind: 'star', at: [840, 820], scale: 0.13, rotate: -14 },
    ],
  },
  {
    id: 'p64',
    template: 't-color',
    screen: false,
    sound: 'chirp',
    aria: '《啊呜噜啵！》啊呜！',
    bg: { kind: 'rays', colors: ['--red-deep', '--red'], gap: '--red', focus: [500, 680], cover: 'all', wash: '--red' },
    /* 封底标题压在一块手绘白底块上：黑字直接放红底只有 4.3:1，达不到正文的 4.5:1 */
    props: [{ id: 'blob-1', kind: 'blob', at: [240, -132], scale: 0.5 }],
    char: { pose: 'happy', state: 'on-color state-red', at: [260, 420], scale: 0.58, spiral: true },
    text: {
      narration: { at: [60, 90], size: 3.4, align: 'center', width: 1000, text: '《啊呜噜啵！》' },
      sound: { at: [60, 205], size: 16, align: 'center', width: 1000, color: '--paper', text: '啊呜！' },
    },
  },
] };
