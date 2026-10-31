/* S13 它看见你：你喊它，它听见了
   —— 全书唯一一次「它主动回应你」。
      到这一页之前，噜啵一直是��物：被喂、被找、被数、被摸。
      这一页把它翻过来——孩子喊一声，它从草丛里跳出来，
      而且它说的是「我看见你啦！」：看的人是它，被看的人是你。 */
export default [
  {
    id: 'p33',
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
       喊不够不翻页：翻过去就错过了"它听见了"这一拍。 */
    hotspot: { action: 'shout', target: 'sound', at: [0, 0], size: 1000, label: '大声喊它' },
  },
  {
    id: 'p34',
    template: 't-dialog',
    sound: 'giggle',
    aria: '它看见你啦！我看见你啦！点它。',
    /* 放射线：惊喜。它从草丛里跳出来，光从它身上射出去 */
    bg: { kind: 'rays', colors: ['--yellow'], gap: '--paper', focus: [500, 500], cover: 'all', wash: '--wash-yellow' },
    char: { pose: 'happy', at: [420, 320], scale: 0.58, spiral: true },
    props: [
      /* 道具要躲开字：橙花原来压在「我」字上、星星压在「点它」上。
         拟声词是这一页最大的一行字，不能被花挡住。 */
      { kind: 'flower', at: [110, 470], scale: 0.16, style: '--flower: var(--orange); --flower-center: var(--yellow)' },
      { kind: 'flower', at: [840, 240], scale: 0.14, rotate: 18, style: '--flower: var(--pink); --flower-center: var(--yellow)' },
      { kind: 'star', at: [150, 660], scale: 0.13, rotate: 12 },
    ],
    text: {
      narration: { at: [60, 70], size: 3.4, width: 320, text: '它看见你啦！' },
      /* 旁白说"它看见你啦"，它自己说"我看见你啦"——一个转述，一个原话。
         六个字放不进右上角那条窄带，所以另起一行放在旁白下面。 */
      sound: { text: '我看见你啦！', at: [60, 250], size: 12, rotate: 2 },
      prompt: { at: [60, 870], size: 4, width: 340, text: '点它。' },
    },
    /* 热区罩住噜啵（渲染后可见框约 548–872 × 459–819） */
    hotspot: { action: 'seen', target: 'char', at: [525, 430], size: 400, label: '点它' },
  },
];
