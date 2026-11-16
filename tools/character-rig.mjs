/* 只描述共用组件的能力，不按册页绑定动作或换装。 */
export const rigPoses = {
  'curious-tilt': '偏头倾听', 'lean-near': '探身凑近', 'beaming-lean': '歪身回应',
  'huddle-away': '收身背转', 'listen-low': '低身听候', 'belly-offer': '挺腹靠近',
  'watch-seat': '坐着看同伴',
  'head-nudge': '低头顶物',
  'tilt-foot': '侧挤失衡',
  'cry-seat': '后坐落泪',
  'held-rest': '靠怀垂脚',
  'proud-belly': '挺腹确认',
  'poised-left': '悬脚未碰',
  'withdraw-step': '收脚退开',
  'stretch-up': '伸身仰望',
  'stretch-look': '伸身看地面',
  'recoil-step': '缩脚侧让',
  'tense-back': '绷身背转',
  'puffed-side': '侧背鼓腮',
  'breath-side': '侧背呼吸',
  'soften-side': '嘴略松开',
  'neutral-front': '放松但未笑',
  'ask-soft': '轻声邀约',
  'guard-step': '护球侧移',
  'press-ball': '用力挤球',
  'pounce': 'pounce',
  'guard-ball': 'guard-ball',
  'startled-seat': 'startled-seat',
  'sad-seat': 'sad-seat',
  'listen-back': 'listen-back',
  'half-turn': 'half-turn',
  'push-right': 'push-right',
  'bow': 'bow',
  'waiting-up': 'waiting-up',
  'joy': 'joy',
  'curled-yawn': 'curled-yawn',

  sip: '抿口饮水',
  'sick-curled': 'sick-curled',
  'sick-raised': 'sick-raised',
  'bitter-curled': 'bitter-curled',
  'kick-corner': 'kick-corner',
  'rise-one': 'rise-one',
  'push-corner': 'push-corner',
  'run': 'run',
  'covered-rest': 'covered-rest',

  'look-back': '回看原处',
  'lean-rest': '半转停靠',
  'look-down': 'look-down',
  'chew': 'chew',
  'tiptoe': 'tiptoe',
  'round-ground': 'round-ground',
  'cross-eyed': 'cross-eyed',
  'flying': 'flying',
  'squash': 'squash',
  'sleep-curled': 'sleep-curled',
  ready: '站稳等候', willing: '自主张嘴', hesitant: '犹豫看向一侧',
  braced: '绷身撑地', step: '迈步', poised: '悬脚停住', yield: '收脚退让',
  push: '低身推物', prone: '趴下歇息', back: '背转', side: '侧身',
  curled: '蜷卧', inflated: '鼓球离地',
};

// 与SVG中data-rig-body的原构图一致；腹纹在可访问DOM内独立旋转。
export const rigTransforms = {
  'curious-tilt': 'rotate(-13 500 760)',
  'lean-near': 'rotate(12 500 760)',
  'beaming-lean': 'rotate(10 500 760)',
  'huddle-away': 'translate(30 180) scale(.94 .78) rotate(-12 500 650)',
  'listen-low': 'translate(-40 220) scale(1.05 .74) rotate(8 500 650)',
  'belly-offer': 'translate(-40 -25) scale(1.08 1.02) rotate(-7 500 760)',
  'watch-seat': 'translate(-40 280) scale(1.05 .66)',
  'head-nudge': 'translate(50 -40) scale(.9) rotate(-55 500 650)',
  'tilt-foot': 'rotate(18 500 650)',
  'cry-seat': 'translate(-40 280) scale(1.05 .66)',
  'held-rest': 'translate(-40 210) scale(1.05 .76)',
  'proud-belly': 'translate(75 -70) scale(.85 1.1)',
  'poised-left': 'translate(-40 0)',
  'withdraw-step': 'translate(55 35) scale(.9 .95)',
  'stretch-up': 'translate(65 -125) scale(.87 1.15)',
  'stretch-look': 'translate(65 -125) scale(.87 1.15)',
  'recoil-step': 'translate(55 35) scale(.9 .95)',
  'tense-back': 'translate(75 -70) scale(.85 1.1)',
  'puffed-side': 'translate(150 60) scale(.75 .92)',
  'breath-side': 'translate(150 60) scale(.75 .92)',
  'soften-side': 'translate(150 60) scale(.75 .92)',
  'neutral-front': 'translate(0 0)',
  'ask-soft': 'translate(-40 280) scale(1.05 .66)',
  'guard-step': 'translate(55 35) scale(.9 .95)',
  'press-ball': 'translate(25 180) scale(.95 .78)',
  'pounce': 'rotate(-20 500 650)',
  'guard-ball': 'translate(-100 365) scale(1.2 .55)',
  'startled-seat': 'translate(25 180) scale(.95 .78)',
  'sad-seat': 'translate(-40 280) scale(1.05 .66)',
  'listen-back': 'translate(0 0)',
  'half-turn': 'translate(0 0)',
  'push-right': 'translate(1000 0) scale(-1 1) translate(25 180) scale(.95 .78)',
  'bow': 'translate(0 70) scale(1 .92)',
  'waiting-up': 'translate(-40 280) scale(1.05 .66)',
  'joy': 'rotate(-5 500 650)',
  'curled-yawn': 'translate(-40 280) scale(1.05 .66)',

  sip: 'translate(0 0)',
  'sick-curled': 'translate(-40 280) scale(1.05 .66)',
  'sick-raised': 'translate(40 100) scale(.92 .86)',
  'bitter-curled': 'translate(-40 180) scale(1.05 .78)',
  'kick-corner': 'translate(-40 280) scale(1.05 .66)',
  'rise-one': 'translate(15 130) scale(.97 .84)',
  'push-corner': 'translate(-40 280) scale(1.05 .66)',
  'run': 'rotate(-12 500 650)',
  'covered-rest': 'translate(-40 280) scale(1.05 .66)',

  'look-back': 'translate(0 0)',
  'lean-rest': 'rotate(-15 500 650)',
  'look-down': 'translate(0 0)',
  'chew': 'translate(-20 -20) scale(1.04 1)',
  'tiptoe': 'translate(65 -125) scale(.87 1.15)',
  'round-ground': 'translate(-110 -135) scale(1.22 1.22)',
  'cross-eyed': 'translate(0 0)',
  'flying': 'rotate(78 500 500)',
  'squash': 'translate(-100 365) scale(1.2 .55)',
  'sleep-curled': 'translate(-40 280) scale(1.05 .66)',
  ready: 'translate(0 0)', willing: 'translate(0 0)', hesitant: 'translate(0 0)',
  braced: 'translate(75 -70) scale(.85 1.1)', step: 'translate(25 0) scale(.95 1)',
  poised: 'translate(0 0)', yield: 'translate(55 35) scale(.9 .95)',
  push: 'translate(25 180) scale(.95 .78)', prone: 'translate(-100 365) scale(1.2 .55)',
  back: 'translate(0 0)', side: 'translate(150 60) scale(.75 .92)',
  curled: 'translate(-40 280) scale(1.05 .66)', inflated: 'translate(-110 -135) scale(1.22 1.22)',
};

export const wearStyles = {
  'vest-damp': { label: '同背心留泪点', vars: '--wear-vest:inline;--wear-crease:inline;--wear-damp:inline' },
  'headband-low': { label: '同发带低垂', vars: '--wear-headband:inline;--wear-head-tilt:rotate(-16deg)' },
  paper: { label: '彩纸额贴', vars: '--wear-paper:inline' },
  headband: { label: '条纹发带', vars: '--wear-headband:inline' },
  'headband-tilted': { label: '歪发带', vars: '--wear-headband:inline;--wear-head-tilt:rotate(-9deg)' },
  scarf: { label: '短领巾', vars: '--wear-scarf:inline' },
  'scarf-creased': { label: '绷皱领巾', vars: '--wear-scarf:inline;--wear-crease:inline' },
  vest: { label: '开襟背心', vars: '--wear-vest:inline' },
  'vest-creased': { label: '背心皱褶', vars: '--wear-vest:inline;--wear-crease:inline' },
  'blanket-shoulders': { label: '同毯披背', vars: '--wear-blanket:inline' },
};

/** @param {{pose: string, spiral?: boolean, wear?: string}} char */
export function rigView(char) {
  const rigged = Object.hasOwn(rigPoses, char.pose);
  if (char.wear && !Object.hasOwn(wearStyles, char.wear)) throw new Error('未知穿戴：' + char.wear);
  if (char.wear && !rigged) throw new Error('穿戴锚点需使用组合姿态：' + char.pose);
  // 背面不展示五官、腹纹或正面额贴；带结、领巾结和背心仍有背面组件。
  if (char.pose === 'back' && char.wear === 'paper') throw new Error('背面组合姿态不展示正面额贴');
  return {
    mouthX: ['side', 'push', 'push-right'].includes(char.pose) ? 326 : char.pose === 'look-back' ? 345 : 500,
    mouthY: char.pose === 'look-back' ? 474 : 455,
    spiral: Boolean(char.spiral) && !['back','listen-back','half-turn','tense-back','huddle-away'].includes(char.pose),
    spiralFrame: rigged ? rigTransforms[char.pose] : '',
    vars: [char.wear ? wearStyles[char.wear].vars : '', contourStyle(char.pose)].filter(Boolean).join(';'),
  };
}

/** 身体受力的方向：推、跑时向前积重，蜷坐时收拢，吞咽及鼓腹时下坠。 */
function contourStyle(pose) {
  const contour = ['push', 'push-right', 'head-nudge', 'run', 'pounce', 'guard-step', 'step', 'withdraw-step'].includes(pose) ? 'driving'
    : ['curled', 'sleep-curled', 'sick-curled', 'covered-rest', 'cry-seat', 'held-rest', 'sad-seat', 'watch-seat', 'ask-soft', 'listen-back', 'tense-back'].includes(pose) ? 'gathered'
    : ['chew', 'round-ground', 'inflated', 'proud-belly', 'press-ball', 'braced', 'puffed-side'].includes(pose) ? 'laden' : null;
  return contour ? `--contour-round:none;--contour-${contour}:inline` : '';
}
