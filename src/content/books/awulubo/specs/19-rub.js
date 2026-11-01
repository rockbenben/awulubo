/* S8 揉一揉，顺一顺：它鼓成一个球躺着
   —— 从原来的 S7「揉肚子 → 转个圈 → 打嗝」里拆出来的。
      揉肚子和转圈是**两个不同的手势**，挤在一跨页里孩子分不清：
      这一页只教"点它的肚子"，下一页才教"在肚子上画圈"。 */
export default [
  {
    id: 'p19',
    template: 't-dialog',
    sound: 'gulu',
    aria: '揉一揉，顺一顺。揉揉它的肚子。',
    bg: { kind: 'rays-tight', colors: ['--pink', '--pink-deep'], gap: '--paper', focus: [500, 640], cover: 'all', wash: '--wash-cream' },
    /* 鼓成球：pose full + 大缩放，肚子上的螺旋整个露出来 */
    char: { pose: 'full', at: [250, 250], scale: 0.76, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 400, text: '揉一揉，顺一顺。' },
      sound: { text: '咕噜……', at: [520, 74], size: 12, rotate: 2 },
      prompt: { at: [60, 870], size: 4, width: 340, text: '揉揉它的肚子。' },
    },
    /* 点它＝揉它一下：晃一下 + 咕噜声，然后翻页。
       target 用 char：揉的是它这个人，不是"身体的一个部位"——
       3 岁的孩子分不清"肚子"和"身体"，手指头按下去的是它整个。 */
    hotspot: { action: 'massage', target: 'char', at: [352, 376], size: 555, label: '揉一揉噜啵' },
  },
  {
    id: 'p20',
    template: 't-dialog',
    sound: 'sigh',
    aria: '唔……舒服。',
    /* 白底：这一页是全书最安静的两页之一——歇口气，为下一页的爆发攒劲。
       底子用漩涡：转晕了、软下来了，形状跟着软。 */
    bg: { kind: 'swirl', colors: ['--pink'], gap: '--paper', focus: [500, 660], cover: 'all', wash: '--wash-cream' },
    char: { pose: 'sleepy', state: 'state-pale', at: [300, 300], scale: 0.62, spiral: true },
    text: {
      narration: { at: [60, 70], size: 3.4, width: 400, text: '唔……舒服。' },
      sound: { text: '呼——', at: [520, 74], size: 14, rotate: -2 },
    },
  },
];
