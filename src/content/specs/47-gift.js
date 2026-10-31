/* S22 这些颜色，都送给你：全书视觉高潮
   —— 第二个高点（p47–48，全书 74%）。位置照参考书实测的 3/4 来（§3.2 规则 7）。
      前面铺了三页（S20 喊它 → S21 它看见你 → 这里兑现），
      一次兑现之后不再给更大的爆发——这一页之后只剩拍手、转圈、跺脚和安静的尾巴。

      它为什么突然要送颜色？因为前面 S15 它一口一个把三样东西全吃了，
      颜色都在它肚子里。送到你手上，是"你喂的，我还给你"。 */
export default [
  {
    id: 'p47',
    template: 't-rainbow',
    sound: 'rainbow',
    aria: '你喊我，我就来！都送给你！点它。',
    /* 满彩虹：全书只有两页用这个底（S6 的彩虹页、这里） */
    bg: { kind: 'rainbow', focus: [500, 500], cover: 'all', wash: '--wash-cream' },
    /* 白底块垫在字后面：彩虹底上黑字虽然够读，但字压着色带会花。
       两块：上面一块垫旁白，下面一块垫提示——
       提示本来压在最下面的紫条上，只有 2.19:1，黑字看不见。 */
    props: [
      { kind: 'blob', at: [2.5, -138.5], scale: 0.5 },
      { kind: 'blob', at: [-35, 619], scale: 0.55 },
    ],
    char: { pose: 'rainbow', at: [180, 300], scale: 0.68, spiral: true },
    text: {
      narration: { at: [120, 66], size: 3.4, width: 420, text: '你喊我，我就来！' },
      sound: { at: [60, 250], size: 12, rotate: 2, text: '都送给你！' },
      prompt: { at: [60, 870], size: 4, width: 380, text: '点它，收下颜色。' },
    },
    /* 点它＝彩纸再炸一次（全书的爆点）：声音是彩虹，
       彩纸从它身上喷出来，然后翻到下一段 */
    hotspot: { action: 'gift', target: 'char', at: [316, 452], size: 410, label: '收下这些颜色' },
  },
  {
    id: 'p48',
    template: 't-burst',
    sound: 'pop',
    aria: '收下吧！红的、蓝的、黄的……都是你的！',
    bg: { kind: 'confetti', focus: [500, 500], cover: 'all', wash: '--wash-yellow' },
    char: { pose: 'happy', at: [300, 400], scale: 0.58, spiral: true },
    props: [
      /* 送回来的正是前面那三样：你喂的，现在全是你的 */
      { kind: 'apple', at: [150, 250], scale: 0.2, rotate: -14 },
      { kind: 'fish', at: [700, 230], scale: 0.22, rotate: 12 },
      { kind: 'star', at: [430, 150], scale: 0.18, rotate: -6 },
      { kind: 'flower', at: [840, 620], scale: 0.15, rotate: 18, style: '--flower: var(--pink); --flower-center: var(--yellow)' },
      { kind: 'flower', at: [120, 680], scale: 0.13, rotate: -12, style: '--flower: var(--green); --flower-center: var(--yellow)' },
    ],
    text: {
      /* 大字放最上面：这一页是"东西全倒出来"，
       拟声词就该压在最上头，别跟旁白挤在一起 */
      sound: { at: [70, 90], size: 16, rotate: 3, text: '都是你的！' },
      narration: { at: [60, 520], size: 3.4, width: 320, text: '收下吧！' },
      prompt: { at: [60, 870], size: 4, width: 400, text: '红的、蓝的、黄的……' },
    },
  },
];
