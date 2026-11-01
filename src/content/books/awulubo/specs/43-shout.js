/* S20 你大声喊它：你喊它，它听见了
   —— 全书唯一一次「它主动回应你」。
      到这一页之前，噜啵一直是动物：被喂、被找、被数、被摸。
      这一页把它翻过来——孩子喊一声，它从草丛里跳出来，
      而且它说的是「我看见你啦！」：看的人是它，被看的人是你。 */
export default [
  {
    id: 'p43',
    template: 't-dialog',
    sound: 'chirp',
    aria: '你大声喊它。啊呜——点一下，再喊一声。',
    /* 白天，空荡荡的草地：它不在画面里，只有孩子的声音。
       底子用放射线不用 sprinkle——sprinkle 的彩纸方块会正好压在旁白上，
       这一页的旁白是整页唯一的话，不能被彩纸穿过。 */
    bg: { kind: 'rays-tight', colors: ['--green'], gap: '--paper', focus: [500, 620], cover: 'all', wash: '--wash-green' },
    props: [
      { kind: 'bubble', at: [170, 210], scale: 0.24 },
      { kind: 'bubble', at: [790, 170], scale: 0.16 },
      { kind: 'flower', at: [140, 700], scale: 0.14, style: '--flower: var(--yellow); --flower-center: var(--orange)' },
      { kind: 'flower', at: [840, 760], scale: 0.12, style: '--flower: var(--pink); --flower-center: var(--yellow)' },
    ],
    text: {
      narration: { at: [60, 70], size: 3.4, width: 420, text: '你大声喊它。' },
      sound: { text: '啊呜——', at: [540, 70], size: 16, rotate: 3 },
      prompt: { at: [60, 870], size: 4, width: 400, text: '点一下，喊一声。' },
    },
    /* 整页都是热区：这一页的互动就是"喊"。
       喊三声它才听见——喊声要是有回音，孩子就知道自己出声了。
       喊不够不翻页：翻过去就错过了"它听见了"这一拍。

       标 trap：这一页要点好几下才过，点空白不该把这一页跳过去。
       以前它没标——可这一页的整页热区只罩住**书页**，书页之外的留白
       （手机上竖屏时书只占中间，上下都是空的）点下去就成了翻页：
       孩子一次也没喊，"它听见了"那一拍整段错过。
       和 p15/p17/p21/p31/p39 一样：点空白只摇一下头。 */
    trap: true,
    hotspot: { action: 'shout', target: 'sound', at: [0, 0], size: 1000, label: '大声喊它' },
  },
  {
    id: 'p44',
    template: 't-dialog',
    aria: '你喊它……它听见了吗？啊呜——！啊呜——！',
    /* 底子跟上一页一样（同一片草地，同一个下午）：
       孩子能看出场景没变——变的只是"喊出去的声音还没回来"。 */
    bg: { kind: 'rays-tight', colors: ['--green'], gap: '--paper', focus: [500, 620], cover: 'all', wash: '--wash-green' },
    /* 回声：泡泡越走越小、越走越远 */
    props: [
      { kind: 'bubble', at: [190, 300], scale: 0.22 },
      { kind: 'bubble', at: [420, 430], scale: 0.17 },
      { kind: 'bubble', at: [640, 540], scale: 0.13 },
      { kind: 'bubble', at: [820, 640], scale: 0.1 },
    ],
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, text: '你喊它……它听见了吗？' },
      sound: { at: [110, 240], size: 11, rotate: 3, text: '啊呜——<br>啊呜——！' },
      prompt: { at: [60, 870], size: 4, width: 340, text: '再喊一声。' },
    },
    /* 这一页没有热区：喊够了就翻过去了（上一页喊满三声）。
       它要干的事只有一件——等。 */
  },
];
