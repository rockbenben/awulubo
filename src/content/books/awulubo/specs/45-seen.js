/* S21 它看见你啦：旁白说"它看见你啦"，它自己说"我看见你啦"
   —— 一个转述，一个原话。拆成两页：
      上一页是**旁白**在说（孩子先看见它跳出来），
      下一页是**它**在说（这句话才是这一段的落点）。
      挤在一页里，两句话互相抢，谁也没被听见。 */
export default [
  {
    id: 'p45',
    template: 't-dialog',
    sound: 'chirp',
    aria: '它看见你啦！',
    /* 放射线：惊喜。它从草丛里跳出来，光从它身上射出去 */
    bg: { kind: 'rays', colors: ['--yellow'], gap: '--paper', focus: [500, 500], cover: 'all', wash: '--wash-yellow' },
    char: { pose: 'surprise', at: [420, 320], scale: 0.58, spiral: true },
    props: [
      /* 道具要躲开字：橙花原来压在「我」字上、星星压在「点它」上。
         拟声词是这一页最大的一行字，不能被花挡住。 */
      { kind: 'flower', at: [110, 470], scale: 0.16, style: '--flower: var(--orange); --flower-center: var(--yellow)' },
      { kind: 'flower', at: [840, 240], scale: 0.14, rotate: 18, style: '--flower: var(--pink); --flower-center: var(--yellow)' },
      { kind: 'star', at: [150, 660], scale: 0.13, rotate: 12 },
    ],
    text: {
      narration: { at: [60, 70], size: 3.4, width: 320, text: '它看见你啦！' },
      /* 一声惊呼：它是突然蹦出来的，先"啊"一声，
         下一句"我看见你啦"才是它的话 */
      sound: { text: '啊！', at: [520, 86], size: 14, rotate: 3 },
      prompt: { at: [60, 870], size: 4, width: 400, text: '看，它看见你了！' },
    },
    /* 这一页没有热区：点它就是"拍一拍"（data-pat），
       孩子点角色身上它会晃一下、叫一声，然后照样翻页。 */
  },
  {
    id: 'p46',
    template: 't-dialog',
    sound: 'giggle',
    aria: '我看见你啦！点它。',
    bg: { kind: 'rays', colors: ['--yellow-deep', '--yellow'], gap: '--paper', focus: [500, 500], cover: 'all', wash: '--wash-yellow' },
    char: { pose: 'wave', at: [420, 320], scale: 0.62, spiral: true },
    props: [
      { kind: 'flower', at: [110, 470], scale: 0.16, style: '--flower: var(--orange); --flower-center: var(--yellow)' },
      { kind: 'flower', at: [840, 240], scale: 0.14, rotate: 18, style: '--flower: var(--pink); --flower-center: var(--yellow)' },
      { kind: 'star', at: [150, 660], scale: 0.13, rotate: 12 },
    ],
    text: {
      narration: { at: [60, 70], size: 3.4, width: 320, text: '啊，它蹦出来啦！' },
      /* 六个字放不进右上角那条窄带，所以另起一行放在旁白下面。
         这是全书最重的一句：被看见的是**孩子**。 */
      sound: { text: '我看见你啦！', at: [60, 250], size: 12, rotate: 2 },
      prompt: { at: [60, 870], size: 4, width: 340, text: '点它。' },
    },
    /* 热区罩住噜啵（渲染后可见框约 548–872 × 459–819） */
    hotspot: { action: 'seen', target: 'char', at: [502, 421], size: 455, label: '点它' },
  },
];
