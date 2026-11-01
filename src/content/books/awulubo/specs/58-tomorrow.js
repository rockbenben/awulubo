/* S28 明天见：故事的最后一跨页
   —— 最后一页是"明天见"，不是"再见"：
      这本册子明天还能再读一遍（p62 有「再读一次」）。 */
export default [
  {
    id: 'p58',
    template: 't-night',
    /* 这一页不出声：故事已经讲完，它睡着了，就让它安静地睡着。
       声音留给下一页的「呼噜……」——那一声才是"它真的睡着了"。 */
    noSound: true,
    aria: '明天见。',
    bg: { kind: 'stars', focus: [500, 500], cover: 'all', wash: '--night' },
    /* 噜啵缩在左下角，星星占满整页：
       角色越小、天空越大，越像"睡着了" */
    char: { pose: 'asleep', state: 'state-pale', at: [120, 500], scale: 0.48, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 400, color: '--paper', text: '明天见。' },
      prompt: { at: [60, 870], size: 4, width: 400, color: '--paper', text: '轻轻把书合上。' },
    },
  },
  {
    id: 'p59',
    template: 't-night t-night-deep',
    sound: 'snore',
    aria: '它睡得可香了。呼噜……',
    bg: { kind: 'stars', focus: [500, 400], cover: 'all', wash: '--night-deep' },
    char: { pose: 'asleep', state: 'state-pale', at: [240, 460], scale: 0.62, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 460, color: '--paper', text: '它睡得可香了。' },
      sound: { at: [300, 230], size: 14, rotate: 3, color: '--paper', text: '呼噜……' },
      /* 指到最后一页：屏幕版翻过去就是 p62「再读一次」 */
      prompt: { at: [60, 870], size: 4, width: 560, color: '--paper', text: '读完啦，翻到最后一页。' },
    },
  },
];
