# 第四册《生气啦！》完整文字剧本

整理日期：2026-11-13。性质：当前工作区书稿的审阅快照，包含未提交修改；未改写原文。设计契约仍为[设计规格](2026-10-30-awulubo-picture-book-design.md)，逐字现稿仍以 src/content/books/shengqi/specs/ 为准。

[返回五册审稿总览](2026-11-13-manuscript-review.md)。本册 64 页，其中正文 28 跨、56 页，屏幕显示 60 页。跨页直接采用 loadBooks() 返回的 spreads（底层使用 model.ts 的 physicalSpreads），保留书稿顺序。

## 故事与节奏

积木塔倒了，孩子生气，噜啵也跟着皱眉生气，两人背过身不理对方。听见呼吸后，他们一起慢慢呼吸，重新捡积木、搭塔；再倒一次也能重来，最后噜啵开口相邀，夜里留下未完的塔。

| 页段 | 故事任务 | 节奏与审阅重点 |
|---|---|---|
| p04–p11 | 倒塔与生气 | 塔倒→不动→皱脸→跺脚，情绪有具体起因。 |
| p12–p21 | 情绪互相映照 | 噜啵也生气、背过身、沉默，抵达第一高点。 |
| p22–p27 | 呼吸与松开 | 听见呼吸→一起呼吸→脸和眉毛松开。 |
| p28–p37 | 重新搭与再次倒下 | 捡积木、再搭、又倒、再搭高；表现面对同一挫折的变化。 |
| p38–p43 | 拍手与再呼吸 | 又一轮释放与慢下来，审它是否仍推动故事。 |
| p44–p47 | 开口与亮起来 | 它邀请再搭，以“生气会过去的”收束。 |
| p48–p59 | 带着未完的塔入睡 | 塔留在墙角，梦里继续，明天还搭。 |

本册先审：保留一起生气与再倒也能重来的情节；优先调整“重新搭”与“它先开口”的先后意义，并审“跺也没用”“气都拍出来了”的情绪口吻。

## 阅读说明

- 下面保留全部现稿旁白、大字、提示及成人文字；纸书没有覆写的槽位沿用现稿。仅在有 print 声明时单列纸书版本，空串如实标注。原文换行以行内换行保留，数组空行单独标注。
- “画面记录”只根据书稿中的底色、笔触、角色姿态与道具整理，不是看图后的构图结论；道具数按声明计，具体遮挡与可见性待粗分镜或校样核对。
- “原朗读稿”逐字保留 aria，供检查它是否与可见文字同步；它可能含旧文案，不能代替当前旁白，也不能当作画面事实。
- “屏幕回应”根据 interactions.js 静态阅读整理，尚未操作验证。无专属热区的页仍可有共读动作。普通完成动作交给阅读状态机处理；宽屏需整组完成后才向前，不能把后页文字出现时机等同于单页翻页。
- 每个动作页另列紧邻后页旁白，便于人工审查承诺与兑现；这不是自动判定因果成立。同页动画与后页剧情各有作用。前后置按真实装订成组，p59 后的 p60 为版权页。

## 逐跨页剧本

本节由 `node tools/manuscript.mjs` 从当前工作区生成；人工故事与节奏审阅保留在前文。画面记录是书稿数据，不代替看图；动作记录是声明，不代替操作验收。

**本册屏幕共读提示**：别急着替孩子说「没关系」。呼气可以只听或模拟，不要求一次就不生气。

### p01 · 前后置

来源：[01-front.js](../../../src/content/books/shengqi/specs/01-front.js)。

#### p01 · 单页

- **画面记录**：背景 `{"kind":"rays","colors":["--purple","--wash-purple"],"gap":"--purple","focus":[500,560],"wash":"--wash-purple"}`；角色 `{"pose":"braced","at":[170,220],"scale":0.64,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"paper-narration","kind":"blob","at":[226.5,52.1],"scale":0.53},{"id":"paper-sound","kind":"blob","at":[-86,-392.2],"scale":1.13},{"id":"blob-1","kind":"blob","at":[200,546],"scale":0.7}]`。
- **大字／拟声词**：生气啦！
- **旁白**：一个也会生气的小怪物
- **提示**：点我，开始。
- **纸书提示**：（空串）
- **原朗读稿（核对用）**：《生气啦！》一个也会生气的小怪物。点我，开始。
- **屏幕动作**：点封面开始阅读；动作 `"start"`；对象 `"page"`；热区 `[0,0]`，大小 1000。
- **紧邻后页核对**：p02 旁白：（无旁白）

### p02｜p03 · 前后置

来源：[01-front.js](../../../src/content/books/shengqi/specs/01-front.js)。

#### p02 · 左页

- **画面记录**：背景 `{}`；角色 `null`；道具 `[{"id":"block-1","kind":"block","at":[90,570],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[240,670],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[390,570],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[540,670],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[690,570],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`。
- **原朗读稿（核对用）**：前环衬：同五块积木。
- **屏幕动作**：未声明专属热区；共读与翻页，角色可有通用反馈。

#### p03 · 右页

- **画面记录**：背景 `{"kind":"rays-tight","colors":["--orange","--wash-orange"],"focus":[500,760],"wash":"--wash-orange"}`；角色 `{"pose":"braced","at":[250,470],"scale":0.6,"spiral":true,"wear":"scarf"}`；道具 `[]`。
- **大字／拟声词**：生气啦！
- **旁白**：一个也会生气的小怪物
- **原朗读稿（核对用）**：扉页：《生气啦！》一个也会生气的小怪物。
- **屏幕动作**：未声明专属热区；共读与翻页，角色可有通用反馈。

### S01 · p04｜p05

来源：[02-build.js](../../../src/content/books/shengqi/specs/02-build.js)。

#### p04 · 左页

- **画面记录**：背景 `{"wash":"--wash-yellow","kind":"wash","colors":["--wash-yellow"],"gap":"--wash-yellow","cover":"all"}`；角色 `{"pose":"stretch-up","at":[490,325],"scale":0.56,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"fantasy-distance","kind":"castle","at":[650,50],"scale":0.35,"layer":"behind","style":"--scene-castle-opacity:.08;--scene-ink:var(--ink)"},{"id":"block-1","kind":"block","at":[120,620],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[120,514],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[120,408],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[120,302],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[120,196],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"window-nook","side":"left"}`；取景 `{"at":[-111.84,33.4],"scale":1}`。
- **旁白**：窗边，一块再一块，<br>越搭越高。
- **提示**：用手比比高度。
- **纸书提示**：用手比比高度。
- **原朗读稿（核对用）**：窗边，一块再一块，越搭越高。
用手比比高度。
- **共读分类**：`"simulate"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p05 · 右页

- **画面记录**：背景 `{"wash":"--wash-yellow","kind":"wash","colors":["--wash-yellow"],"gap":"--wash-yellow","cover":"all"}`；角色 `{"pose":"stretch-up","at":[490,325],"scale":0.56,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"block-1","kind":"block","at":[120,620],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[120,514],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[120,408],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[120,302],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[120,196],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"window-nook","side":"right"}`；取景 `{"at":[-111.84,33.4],"scale":1}`。
- **旁白**：塔尖都高过它的脑袋啦！
- **原朗读稿（核对用）**：塔尖都高过它的脑袋啦！
- **共读分类**：`"autonomous"`；紧邻承接 p04。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S02 · p06｜p07

来源：[03-tilt.js](../../../src/content/books/shengqi/specs/03-tilt.js)。

#### p06 · 左页

- **画面记录**：背景 `{"wash":"--wash-yellow","kind":"none"}`；角色 `{"pose":"waiting-up","at":[490,325],"scale":0.56,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"block-1","kind":"block","at":[120,620],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[120,514],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[120,408],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[120,302],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[120,196],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)","rotate":12}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[231.01,-23.87],"scale":0.69}`。
- **旁白**：塔尖歪了一点。
- **原朗读稿（核对用）**：塔尖歪了一点。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p07 · 右页

- **画面记录**：背景 `{"wash":"--wash-yellow","kind":"none"}`；角色 `{"pose":"recoil-step","at":[470,280],"scale":0.6,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[280,630],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[400,655],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[231.01,-23.87],"scale":0.69}`。
- **旁白**：哗啦！积木从高处落了一地。
- **原朗读稿（核对用）**：哗啦！积木从高处落了一地。
- **共读分类**：`"autonomous"`；紧邻承接 p06。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S03 · p08｜p09

来源：[04-still.js](../../../src/content/books/shengqi/specs/04-still.js)。

#### p08 · 左页

- **画面记录**：背景 `{"wash":"--wash-yellow","kind":"none"}`；角色 `{"pose":"hesitant","at":[470,280],"scale":0.6,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[280,630],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[400,655],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[9.27,-106.15],"scale":0.96}`。
- **旁白**：你缩起肩膀，站得直直的。
- **原朗读稿（核对用）**：你缩起肩膀，站得直直的。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p09 · 右页

- **画面记录**：背景 `{"wash":"--wash-yellow","kind":"none"}`；角色 `{"pose":"hesitant","at":[470,280],"scale":0.6,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[280,630],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[400,655],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"},{"id":"child-foot","kind":"child-foot","at":[15,650],"scale":0.55}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[9.27,-106.15],"scale":0.96}`。
- **旁白**：嘴抿紧了，脚趾也绷着。
- **原朗读稿（核对用）**：嘴抿紧了，脚趾也绷着。
- **共读分类**：`"autonomous"`；紧邻承接 p08。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S04 · p10｜p11

来源：[05-stomp.js](../../../src/content/books/shengqi/specs/05-stomp.js)。

#### p10 · 左页

- **画面记录**：背景 `{"wash":"--wash-yellow","kind":"none"}`；角色 `{"pose":"hesitant","at":[470,280],"scale":0.6,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[280,630],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[400,655],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"},{"id":"child-foot","kind":"child-foot","at":[15,610],"scale":0.55}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[9.27,-106.15],"scale":0.96}`。
- **旁白**：胸口热热的。
- **提示**：原地跺一下。
- **纸书提示**：原地跺一下。
- **原朗读稿（核对用）**：胸口热热的。
原地跺一下。
- **共读分类**：`"simulate"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p11 · 右页

- **画面记录**：背景 `{"wash":"--wash-yellow","kind":"none"}`；角色 `{"pose":"poised","at":[470,280],"scale":0.6,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)","rotate":5},{"id":"block-2","kind":"block","at":[280,630],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[400,655],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"},{"id":"child-foot","kind":"child-foot","at":[15,650],"scale":0.55}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[9.27,-106.15],"scale":0.96}`。
- **旁白**：咚！地上那块积木震了一下。
- **原朗读稿（核对用）**：咚！地上那块积木震了一下。
- **共读分类**：`"autonomous"`；紧邻承接 p10。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S05 · p12｜p13

来源：[06-sees.js](../../../src/content/books/shengqi/specs/06-sees.js)。

#### p12 · 左页

- **画面记录**：背景 `{"wash":"--wash-yellow","kind":"none"}`；角色 `{"pose":"stretch-look","at":[470,280],"scale":0.6,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[280,630],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[400,655],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[178.82,-121.15],"scale":0.79}`。
- **旁白**：噜啵伸长身子，看倒下的塔。
- **原朗读稿（核对用）**：噜啵伸长身子，看倒下的塔。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p13 · 右页

- **画面记录**：背景 `{"wash":"--wash-yellow","kind":"none"}`；角色 `{"pose":"curious-tilt","at":[470,280],"scale":0.6,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[280,630],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[400,655],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[178.82,-121.15],"scale":0.79}`。
- **旁白**：它转过脸，看见你。
- **原朗读稿（核对用）**：它转过脸，看见你。
- **共读分类**：`"autonomous"`；紧邻承接 p12。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S06 · p14｜p15

来源：[07-also.js](../../../src/content/books/shengqi/specs/07-also.js)。

#### p14 · 左页

- **画面记录**：背景 `{"wash":"--wash-yellow","kind":"wash","colors":["--wash-yellow"],"gap":"--wash-yellow","cover":"all"}`；角色 `{"pose":"braced","at":[470,280],"scale":0.6,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[280,630],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[400,655],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[10.34,-65.85],"scale":0.92}`。
- **旁白**：它把圆身撑得直直的。
- **原朗读稿（核对用）**：它把圆身撑得直直的。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p15 · 右页

- **画面记录**：背景 `{"wash":"--wash-yellow","kind":"wash","colors":["--wash-yellow"],"gap":"--wash-yellow","cover":"all"}`；角色 `{"pose":"braced","at":[470,280],"scale":0.6,"spiral":true,"wear":"scarf-creased"}`；道具 `[{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[280,630],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[400,655],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[10.34,-65.85],"scale":0.92}`。
- **旁白**：哼！眉毛挤紧，领巾也皱了。
- **原朗读稿（核对用）**：哼！眉毛挤紧，领巾也皱了。
- **共读分类**：`"autonomous"`；紧邻承接 p14。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S07 · p16｜p17

来源：[08-away.js](../../../src/content/books/shengqi/specs/08-away.js)。

#### p16 · 左页

- **画面记录**：背景 `{"wash":"--wash-yellow","kind":"none"}`；角色 `{"pose":"tense-back","at":[470,280],"scale":0.6,"spiral":true,"wear":"scarf-creased"}`；道具 `[{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[280,630],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[400,655],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[10.61,-58.33],"scale":0.91}`。
- **旁白**：它用力转身，只露出领巾结。
- **原朗读稿（核对用）**：它用力转身，只露出领巾结。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p17 · 右页

- **画面记录**：背景 `{"wash":"--wash-yellow","kind":"none"}`；角色 `{"pose":"huddle-away","at":[470,280],"scale":0.6,"spiral":true,"wear":"scarf-creased"}`；道具 `[{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[280,630],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[400,655],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[10.61,-58.33],"scale":0.91}`。
- **旁白**：你也背过去，谁也不看谁。
- **原朗读稿（核对用）**：你也背过去，谁也不看谁。
- **共读分类**：`"autonomous"`；紧邻承接 p16。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S08 · p18｜p19

来源：[09-quiet.js](../../../src/content/books/shengqi/specs/09-quiet.js)。

#### p18 · 左页

- **画面记录**：背景 `{"wash":"--wash-yellow","kind":"none"}`；角色 `{"pose":"huddle-away","at":[470,280],"scale":0.6,"spiral":true,"wear":"scarf-creased"}`；道具 `[{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[280,630],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[400,655],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[108.39,-237.71],"scale":0.91}`。
- **旁白**：你鼓起嘴，想说话。
- **原朗读稿（核对用）**：你鼓起嘴，想说话。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p19 · 右页

- **画面记录**：背景 `{"wash":"--wash-yellow","kind":"none"}`；角色 `{"pose":"puffed-side","at":[470,280],"scale":0.6,"spiral":true,"wear":"scarf-creased"}`；道具 `[{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[280,630],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[400,655],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[108.39,-237.71],"scale":0.91}`。
- **旁白**：它鼓起腮，又把嘴闭住了。
- **原朗读稿（核对用）**：它鼓起腮，又把嘴闭住了。
- **共读分类**：`"autonomous"`；紧邻承接 p18。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S09 · p20｜p21

来源：[10-angry.js](../../../src/content/books/shengqi/specs/10-angry.js)。

#### p20 · 左页

- **画面记录**：背景 `{"wash":"--wash-red","kind":"rays","colors":["--red","--wash-red"],"gap":"--wash-red","cover":"all","focus":[1000,520]}`；角色 `{"pose":"puffed-side","at":[470,280],"scale":0.6,"spiral":true,"wear":"scarf-creased"}`；道具 `[{"id":"paper-narration","kind":"blob","at":[-173.73,-441.12],"scale":1.32,"layer":"behind"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[280,630],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[400,655],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[13.58,-58.33],"scale":0.91}`。
- **旁白**：四周红红的，两个都气鼓鼓。
- **原朗读稿（核对用）**：四周红红的，两个都气鼓鼓。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p21 · 右页

- **画面记录**：背景 `{"wash":"--wash-red","kind":"rays","colors":["--red","--wash-red"],"gap":"--wash-red","cover":"all","focus":[0,520]}`；角色 `{"pose":"tense-back","at":[470,280],"scale":0.6,"spiral":true,"wear":"scarf-creased"}`；道具 `[{"id":"paper-narration","kind":"blob","at":[-45.43,-391.67],"scale":1.32,"layer":"behind"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[280,630],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[400,655],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[13.58,-58.33],"scale":0.91}`。
- **旁白**：一个朝这边，一个朝那边。
- **原朗读稿（核对用）**：一个朝这边，一个朝那边。
- **共读分类**：`"autonomous"`；紧邻承接 p20。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S10 · p22｜p23

来源：[11-hear.js](../../../src/content/books/shengqi/specs/11-hear.js)。

#### p22 · 左页

- **画面记录**：背景 `{"wash":"--wash-red","kind":"none"}`；角色 `{"pose":"puffed-side","at":[470,280],"scale":0.6,"spiral":true,"wear":"scarf-creased"}`；道具 `[{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[280,630],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[400,655],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[8.47,-139.28],"scale":0.99}`。
- **旁白**：背后有轻轻的声音。
- **提示**：安静听一听。
- **纸书提示**：安静听一听。
- **原朗读稿（核对用）**：背后有轻轻的声音。
安静听一听。
- **共读分类**：`"observe"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p23 · 右页

- **画面记录**：背景 `{"wash":"--wash-red","kind":"none"}`；角色 `{"pose":"breath-side","at":[470,280],"scale":0.6,"spiral":true,"wear":"scarf-creased"}`；道具 `[{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[280,630],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[400,655],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[8.47,-139.28],"scale":0.99}`。
- **旁白**：噜啵的圆肚子，吸——呼——
- **原朗读稿（核对用）**：噜啵的圆肚子，吸——呼——
- **共读分类**：`"autonomous"`；紧邻承接 p22。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S11 · p24｜p25

来源：[12-breathe.js](../../../src/content/books/shengqi/specs/12-breathe.js)。

#### p24 · 左页

- **画面记录**：背景 `{"wash":"--wash-red","kind":"none"}`；角色 `{"pose":"puffed-side","at":[470,280],"scale":0.6,"spiral":true,"wear":"scarf-creased"}`；道具 `[{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[280,630],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[400,655],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[133.1,-237.37],"scale":0.91}`。
- **旁白**：胸口还热着，脚也绷着。
- **提示**：慢慢呼一口气。
- **纸书提示**：慢慢呼一口气。
- **原朗读稿（核对用）**：胸口还热着，脚也绷着。
慢慢呼一口气。
- **共读分类**：`"simulate"`。
- **屏幕动作**：慢慢呼一口气。；动作 `"breathe"`；对象 `"character"`；热区 `[636.81,426.34]`，大小 368.96。
- **紧邻后页核对**：p25 旁白：呼——它的嘴也松了一点。

#### p25 · 右页

- **画面记录**：背景 `{"wash":"--wash-red","kind":"none"}`；角色 `{"pose":"soften-side","at":[470,280],"scale":0.6,"spiral":true,"wear":"scarf-creased"}`；道具 `[{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[280,630],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[400,655],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[133.1,-237.37],"scale":0.91}`。
- **旁白**：呼——它的嘴也松了一点。
- **原朗读稿（核对用）**：呼——它的嘴也松了一点。
- **共读分类**：`"autonomous"`；紧邻承接 p24。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S12 · p26｜p27

来源：[13-relax.js](../../../src/content/books/shengqi/specs/13-relax.js)。

#### p26 · 左页

- **画面记录**：背景 `{"wash":"--wash-red","kind":"none"}`；角色 `{"pose":"soften-side","at":[470,280],"scale":0.6,"spiral":true,"wear":"scarf-creased"}`；道具 `[{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[280,630],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[400,655],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[9.27,-106.15],"scale":0.96}`。
- **旁白**：你慢慢放下肩膀。
- **原朗读稿（核对用）**：你慢慢放下肩膀。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p27 · 右页

- **画面记录**：背景 `{"wash":"--wash-red","kind":"none"}`；角色 `{"pose":"neutral-front","at":[470,280],"scale":0.6,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[280,630],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[400,655],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[9.27,-106.15],"scale":0.96}`。
- **旁白**：它松开眉毛，领巾也摊平了。
- **原朗读稿（核对用）**：它松开眉毛，领巾也摊平了。
- **共读分类**：`"autonomous"`；紧邻承接 p26。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S13 · p28｜p29

来源：[14-pick.js](../../../src/content/books/shengqi/specs/14-pick.js)。

#### p28 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"look-down","at":[470,280],"scale":0.6,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.6"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[280,630],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[400,655],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[200.73,245.81],"scale":0.62}`。
- **旁白**：红色缩到一边，<br>积木还散在地上。
- **原朗读稿（核对用）**：红色缩到一边，积木还散在地上。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p29 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"curious-tilt","at":[470,280],"scale":0.6,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.6"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[280,630],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[400,655],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[200.73,245.81],"scale":0.62}`。
- **旁白**：你瞧着散开的积木，<br>没有走开。
- **原朗读稿（核对用）**：你瞧着散开的积木，没有走开。
- **共读分类**：`"autonomous"`；紧邻承接 p28。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S14 · p30｜p31

来源：[15-up.js](../../../src/content/books/shengqi/specs/15-up.js)。

#### p30 · 左页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-cream","colors":["--wash-cream"]}`；角色 `{"pose":"neutral-front","at":[470,280],"scale":0.6,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.6"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[280,630],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[400,655],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"},{"id":"child-hand","kind":"child-reach","at":[10,600],"scale":0.45}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[25.5,-99.16],"scale":0.95}`。
- **旁白**：你把一块积木放正。
- **原朗读稿（核对用）**：你把一块积木放正。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p31 · 右页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-cream","colors":["--wash-cream"]}`；角色 `{"pose":"push","at":[395,330],"scale":0.5,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.6"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[330,560],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[400,655],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[25.5,-99.16],"scale":0.95}`。
- **旁白**：它挪近，用肚子推来另一块。
- **原朗读稿（核对用）**：它挪近，用肚子推来另一块。
- **共读分类**：`"autonomous"`；紧邻承接 p30。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S15 · p32｜p33

来源：[16-again.js](../../../src/content/books/shengqi/specs/16-again.js)。

#### p32 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"neutral-front","at":[470,280],"scale":0.6,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.6"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[202,600],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[400,655],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[140.06,-198.23],"scale":0.87}`。
- **旁白**：两块挨在一起。
- **原朗读稿（核对用）**：两块挨在一起。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p33 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"hesitant","at":[470,280],"scale":0.6,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.6"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[202,600],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[290,494],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[140.06,-198.23],"scale":0.87}`。
- **旁白**：你又放上一块，偏了一点。
- **原朗读稿（核对用）**：你又放上一块，偏了一点。
- **共读分类**：`"autonomous"`；紧邻承接 p32。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S16 · p34｜p35

来源：[17-tilt2.js](../../../src/content/books/shengqi/specs/17-tilt2.js)。

#### p34 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"waiting-up","at":[470,280],"scale":0.6,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.6"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[202,600],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[290,494],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)","rotate":12},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[9.27,-106.15],"scale":0.96}`。
- **旁白**：顶上那块，摇了一下。
- **原朗读稿（核对用）**：顶上那块，摇了一下。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p35 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"poised","at":[470,280],"scale":0.6,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.6"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[202,600],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[505,615],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[9.27,-106.15],"scale":0.96}`。
- **旁白**：啪！顶上那块滚到小脚边。
- **原朗读稿（核对用）**：啪！顶上那块滚到小脚边。
- **共读分类**：`"autonomous"`；紧邻承接 p34。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S17 · p36｜p37

来源：[18-tall.js](../../../src/content/books/shengqi/specs/18-tall.js)。

#### p36 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"curious-tilt","at":[470,280],"scale":0.6,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.6"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[202,600],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[505,615],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[10.61,-57.59],"scale":0.91}`。
- **旁白**：你的嘴又抿起来。
- **原朗读稿（核对用）**：你的嘴又抿起来。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p37 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"hesitant","at":[470,280],"scale":0.6,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.6"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[202,600],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[340,390],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"},{"id":"child-hand","kind":"child-reach","at":[160,465],"scale":0.9}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[10.61,-57.59],"scale":0.91}`。
- **旁白**：你停了一下，把那块捡回来。
- **原朗读稿（核对用）**：你停了一下，把那块捡回来。
- **共读分类**：`"autonomous"`；紧邻承接 p36。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S18 · p38｜p39

来源：[19-clap.js](../../../src/content/books/shengqi/specs/19-clap.js)。

#### p38 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"listen-low","at":[450,280],"scale":0.6,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.6"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[202,600],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[340,390],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"},{"id":"child-hand","kind":"child-reach","at":[160,465],"scale":0.9}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[134.06,-198.23],"scale":0.87}`。
- **旁白**：噜啵靠近，又停在旁边。
- **原朗读稿（核对用）**：噜啵靠近，又停在旁边。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p39 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"ready","at":[450,280],"scale":0.6,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.6"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[202,600],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[145,494],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[134.06,-198.23],"scale":0.87}`。
- **旁白**：你把那块放正，它笑了。
- **原朗读稿（核对用）**：你把那块放正，它笑了。
- **共读分类**：`"autonomous"`；紧邻承接 p38。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S19 · p40｜p41

来源：[20-slow.js](../../../src/content/books/shengqi/specs/20-slow.js)。

#### p40 · 左页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-cream","colors":["--wash-cream"]}`；角色 `{"pose":"ready","at":[450,280],"scale":0.6,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.6"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[202,600],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[145,494],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[9.27,-105.92],"scale":0.96}`。
- **旁白**：你转过脸，朝它笑。
- **提示**：轻轻拍一下手。
- **纸书提示**：轻轻拍一下手。
- **原朗读稿（核对用）**：你转过脸，朝它笑。
轻轻拍一下手。
- **共读分类**：`"simulate"`。
- **屏幕动作**：轻轻拍一下手。；动作 `"clap"`；对象 `"character"`；热区 `[561.72,401.04]`，大小 394.25。
- **紧邻后页核对**：p41 旁白：啪！它踏踏脚，<br>身子晃了一下。

#### p41 · 右页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-cream","colors":["--wash-cream"]}`；角色 `{"pose":"step","at":[450,280],"scale":0.6,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.6"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[202,600],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[145,494],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[9.27,-105.92],"scale":0.96}`。
- **旁白**：啪！它踏踏脚，<br>身子晃了一下。
- **原朗读稿（核对用）**：啪！它踏踏脚，身子晃了一下。
- **共读分类**：`"autonomous"`；紧邻承接 p40。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S20 · p42｜p43

来源：[21-breathe2.js](../../../src/content/books/shengqi/specs/21-breathe2.js)。

#### p42 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-orange"}`；角色 `{"pose":"waiting-up","at":[470,280],"scale":0.6,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.6"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[202,600],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[145,494],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"window-nook","light":"dusk","side":"left"}`；取景 `{"at":[111.04,68.95],"scale":0.8}`。
- **旁白**：天快黑了。
- **原朗读稿（核对用）**：天快黑了。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p43 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-orange"}`；角色 `{"pose":"waiting-up","at":[540,300],"scale":0.52,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.6"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[202,600],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[145,494],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"window-nook","light":"dusk","side":"right"}`；取景 `{"at":[111.04,68.95],"scale":0.8}`。
- **旁白**：你们挪到一边，<br>抬头望着半座塔。
- **原朗读稿（核对用）**：你们挪到一边，抬头望着半座塔。
- **共读分类**：`"autonomous"`；紧邻承接 p42。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S21 · p44｜p45

来源：[22-speak.js](../../../src/content/books/shengqi/specs/22-speak.js)。

#### p44 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-orange"}`；角色 `{"pose":"listen-low","at":[540,300],"scale":0.52,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.6"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[202,600],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[145,494],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","light":"dusk","side":"left"}`；取景 `{"at":[57.89,-272.63],"scale":0.93}`。
- **旁白**：噜啵望望塔，先开口了。
- **原朗读稿（核对用）**：噜啵望望塔，先开口了。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p45 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-orange"}`；角色 `{"pose":"ask-soft","at":[540,300],"scale":0.52,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.6"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[202,600],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[145,494],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","light":"dusk","side":"right"}`；取景 `{"at":[57.89,-272.63],"scale":0.93}`。
- **旁白**：明天，我们还搭，好吗？
- **原朗读稿（核对用）**：明天，我们还搭，好吗？
- **共读分类**：`"autonomous"`；紧邻承接 p44。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S22 · p46｜p47

来源：[23-pass.js](../../../src/content/books/shengqi/specs/23-pass.js)。

#### p46 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-orange"}`；角色 `{"pose":"neutral-front","at":[540,300],"scale":0.52,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.6"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[202,600],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[145,494],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","light":"dusk","side":"left"}`；取景 `{"at":[9.27,-106.6],"scale":0.96}`。
- **旁白**：你点点头：好。
- **原朗读稿（核对用）**：你点点头：好。
- **共读分类**：`"autonomous"`；紧邻承接 p45。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p47 · 右页

- **画面记录**：背景 `{"kind":"bands","wash":"--wash-yellow","colors":["--yellow","--wash-yellow"],"cover":"all"}`；角色 `{"pose":"curled","at":[510,300],"scale":0.52,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.6"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[202,600],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[145,494],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"room","light":"dusk","side":"right"}`；取景 `{"at":[9.27,-106.6],"scale":0.96}`。
- **旁白**：黄色慢慢铺开，<br>它挪到你身边。
- **原朗读稿（核对用）**：黄色慢慢铺开，它挪到你身边。
- **共读分类**：`"autonomous"`；紧邻承接 p46。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S23 · p48｜p49

来源：[24-dark.js](../../../src/content/books/shengqi/specs/24-dark.js)。

#### p48 · 左页

- **画面记录**：背景 `{"wash":"--night","kind":"none"}`；角色 `{"pose":"waiting-up","at":[540,300],"scale":0.52,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.14"},{"id":"moon-1","kind":"moon","at":[20,185],"scale":0.2,"layer":"behind","style":"opacity:.5"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[202,600],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[145,494],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"window-nook","light":"night","side":"left"}`；取景 `{"at":[86.73,-43.48],"scale":0.85}`。
- **旁白**：月亮出来了。
- **原朗读稿（核对用）**：月亮出来了。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p49 · 右页

- **画面记录**：背景 `{"wash":"--night","kind":"none"}`；角色 `{"pose":"curled","at":[540,300],"scale":0.52,"spiral":true,"wear":"scarf"}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.14"},{"id":"moon-1","kind":"moon","at":[20,185],"scale":0.2,"layer":"behind","style":"opacity:.5"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[202,600],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[145,494],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"}]`；共享场景 `{"kind":"window-nook","light":"night","side":"right"}`；取景 `{"at":[86.73,-43.48],"scale":0.85}`。
- **旁白**：塔还没搭完，就留在那里。
- **原朗读稿（核对用）**：塔还没搭完，就留在那里。
- **共读分类**：`"autonomous"`；紧邻承接 p48。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S24 · p50｜p51

来源：[25-lie.js](../../../src/content/books/shengqi/specs/25-lie.js)。

#### p50 · 左页

- **画面记录**：背景 `{"wash":"--night","kind":"none"}`；角色 `{"pose":"bow","at":[470,300],"scale":0.55,"spiral":true}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.14"},{"id":"moon-1","kind":"moon","at":[20,185],"scale":0.2,"layer":"behind","style":"opacity:.5"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[202,600],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[145,494],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"},{"id":"child-hand","kind":"child-reach","at":[470,560],"scale":0.65},{"id":"scarf-1","kind":"scarf","at":[600,580],"scale":0.28}]`；共享场景 `{"kind":"room","light":"night","side":"left"}`；取景 `{"at":[88.05,-14.59],"scale":0.85}`。
- **旁白**：它低下头，让你摘下领巾。
- **原朗读稿（核对用）**：它低下头，让你摘下领巾。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p51 · 右页

- **画面记录**：背景 `{"wash":"--night","kind":"none"}`；角色 `{"pose":"sleep-curled","at":[540,300],"scale":0.52,"spiral":true}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.14"},{"id":"moon-1","kind":"moon","at":[20,185],"scale":0.2,"layer":"behind","style":"opacity:.5"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[202,600],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[145,494],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"},{"id":"scarf-1","kind":"scarf","at":[660,710],"scale":0.35}]`；共享场景 `{"kind":"room","light":"night","side":"right"}`；取景 `{"at":[88.05,-14.59],"scale":0.85}`。
- **旁白**：今天，就搭到这里吧。
- **原朗读稿（核对用）**：今天，就搭到这里吧。
- **共读分类**：`"autonomous"`；紧邻承接 p50。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S25 · p52｜p53

来源：[26-night.js](../../../src/content/books/shengqi/specs/26-night.js)。

#### p52 · 左页

- **画面记录**：背景 `{"wash":"--night","kind":"none"}`；角色 `{"pose":"sleep-curled","at":[540,300],"scale":0.52,"spiral":true}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.14"},{"id":"moon-1","kind":"moon","at":[20,185],"scale":0.2,"layer":"behind","style":"opacity:.5"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue);opacity:.55"},{"id":"block-2","kind":"block","at":[202,600],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow);opacity:.55"},{"id":"block-3","kind":"block","at":[145,494],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red);opacity:.55"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green);opacity:.55"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink);opacity:.55"},{"id":"scarf-1","kind":"scarf","at":[660,710],"scale":0.35,"style":";opacity:.55"}]`；共享场景 `{"kind":"room","light":"night","side":"left"}`；取景 `{"at":[28.05,-43.48],"scale":0.85}`。
- **旁白**：半座塔，留在原来的地方。
- **原朗读稿（核对用）**：半座塔，留在原来的地方。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p53 · 右页

- **画面记录**：背景 `{"wash":"--night","kind":"none"}`；角色 `{"pose":"covered-rest","at":[540,300],"scale":0.52,"spiral":true}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.14"},{"id":"moon-1","kind":"moon","at":[20,185],"scale":0.2,"layer":"behind","style":"opacity:.5"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue);opacity:.55"},{"id":"block-2","kind":"block","at":[202,600],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow);opacity:.55"},{"id":"block-3","kind":"block","at":[145,494],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red);opacity:.55"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green);opacity:.55"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink);opacity:.55"},{"id":"scarf-1","kind":"scarf","at":[660,710],"scale":0.35,"style":";opacity:.55"}]`；共享场景 `{"kind":"room","light":"night","side":"right"}`；取景 `{"at":[28.05,-43.48],"scale":0.85}`。
- **旁白**：它慢慢蜷下来，闭上了眼。
- **原朗读稿（核对用）**：它慢慢蜷下来，闭上了眼。
- **共读分类**：`"autonomous"`；紧邻承接 p52。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S26 · p54｜p55

来源：[27-sleep.js](../../../src/content/books/shengqi/specs/27-sleep.js)。

#### p54 · 左页

- **画面记录**：背景 `{"wash":"--night","kind":"none"}`；角色 `{"pose":"covered-rest","at":[540,300],"scale":0.52,"spiral":true}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.14"},{"id":"moon-1","kind":"moon","at":[20,185],"scale":0.2,"layer":"behind","style":"opacity:.5"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue);opacity:.55"},{"id":"block-2","kind":"block","at":[202,600],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow);opacity:.55"},{"id":"block-3","kind":"block","at":[145,494],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red);opacity:.55"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green);opacity:.55"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink);opacity:.55"},{"id":"scarf-1","kind":"scarf","at":[660,710],"scale":0.35,"style":";opacity:.55"}]`；共享场景 `{"kind":"room","light":"night","side":"left"}`；取景 `{"at":[88.05,-43.48],"scale":0.85}`。
- **旁白**：它的肚子一起一伏。
- **原朗读稿（核对用）**：它的肚子一起一伏。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p55 · 右页

- **画面记录**：背景 `{"wash":"--night","kind":"none"}`；角色 `{"pose":"covered-rest","at":[540,300],"scale":0.52,"spiral":true}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.14"},{"id":"moon-1","kind":"moon","at":[20,185],"scale":0.2,"layer":"behind","style":"opacity:.5"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue);opacity:.55"},{"id":"block-2","kind":"block","at":[202,600],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow);opacity:.55"},{"id":"block-3","kind":"block","at":[145,494],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red);opacity:.55"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green);opacity:.55"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink);opacity:.55"},{"id":"scarf-1","kind":"scarf","at":[660,710],"scale":0.35,"style":";opacity:.55"}]`；共享场景 `{"kind":"room","light":"night","side":"right"}`；取景 `{"at":[88.05,-43.48],"scale":0.85}`。
- **旁白**：你也躺得松松的。
- **原朗读稿（核对用）**：你也躺得松松的。
- **共读分类**：`"autonomous"`；紧邻承接 p54。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S27 · p56｜p57

来源：[28-tomorrow.js](../../../src/content/books/shengqi/specs/28-tomorrow.js)。

#### p56 · 左页

- **画面记录**：背景 `{"wash":"--night-deep","kind":"none"}`；角色 `{"pose":"covered-rest","at":[540,300],"scale":0.52,"spiral":false}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.09"},{"id":"moon-1","kind":"moon","at":[20,185],"scale":0.2,"layer":"behind","style":"opacity:.3"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue);opacity:.28"},{"id":"block-2","kind":"block","at":[202,600],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow);opacity:.28"},{"id":"block-3","kind":"block","at":[145,494],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red);opacity:.28"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green);opacity:.28"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink);opacity:.28"},{"id":"scarf-1","kind":"scarf","at":[660,710],"scale":0.35,"style":";opacity:.28"}]`；共享场景 `{"kind":"room","light":"late-night","side":"left"}`；取景 `{"at":[88.05,-43.48],"scale":0.85}`。
- **旁白**：晚安。
- **提示**：轻轻翻过去。
- **纸书提示**：轻轻翻过去。
- **原朗读稿（核对用）**：晚安。
轻轻翻过去。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p57 · 右页

- **画面记录**：背景 `{"wash":"--night-deep","kind":"none"}`；角色 `{"pose":"covered-rest","at":[540,300],"scale":0.52,"spiral":false}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.09"},{"id":"moon-1","kind":"moon","at":[20,185],"scale":0.2,"layer":"behind","style":"opacity:.3"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue);opacity:.28"},{"id":"block-2","kind":"block","at":[202,600],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow);opacity:.28"},{"id":"block-3","kind":"block","at":[145,494],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red);opacity:.28"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green);opacity:.28"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink);opacity:.28"},{"id":"scarf-1","kind":"scarf","at":[660,710],"scale":0.35,"style":";opacity:.28"}]`；共享场景 `{"kind":"room","light":"late-night","side":"right"}`；取景 `{"at":[88.05,-43.48],"scale":0.85}`。
- **旁白**：呼噜……
- **原朗读稿（核对用）**：呼噜……
- **共读分类**：`"autonomous"`；紧邻承接 p56。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S28 · p58｜p59

来源：[29-tomorrow.js](../../../src/content/books/shengqi/specs/29-tomorrow.js)。

#### p58 · 左页

- **画面记录**：背景 `{"wash":"--night-deep","kind":"none"}`；角色 `{"pose":"covered-rest","at":[540,300],"scale":0.52,"spiral":false}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.09"},{"id":"moon-1","kind":"moon","at":[20,185],"scale":0.2,"layer":"behind","style":"opacity:.3"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue);opacity:.28"},{"id":"block-2","kind":"block","at":[202,600],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow);opacity:.28"},{"id":"block-3","kind":"block","at":[145,494],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red);opacity:.28"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green);opacity:.28"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink);opacity:.28"},{"id":"scarf-1","kind":"scarf","at":[660,710],"scale":0.35,"style":";opacity:.28"}]`；共享场景 `{"kind":"room","light":"late-night","side":"left"}`；取景 `{"at":[88.05,-43.48],"scale":0.85}`。
- **旁白**：塔还在那儿。
- **原朗读稿（核对用）**：塔还在那儿。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p59 · 右页

- **画面记录**：背景 `{"wash":"--night-deep","kind":"none"}`；角色 `{"pose":"covered-rest","at":[540,300],"scale":0.52,"spiral":false}`；道具 `[{"id":"red-residue","kind":"color-edge","at":[0,160],"scale":0.7,"layer":"behind","style":"--edge:var(--wash-red);opacity:.09"},{"id":"moon-1","kind":"moon","at":[20,185],"scale":0.2,"layer":"behind","style":"opacity:.3"},{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue);opacity:.28"},{"id":"block-2","kind":"block","at":[202,600],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow);opacity:.28"},{"id":"block-3","kind":"block","at":[145,494],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red);opacity:.28"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green);opacity:.28"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink);opacity:.28"},{"id":"scarf-1","kind":"scarf","at":[660,710],"scale":0.35,"style":";opacity:.28"}]`；共享场景 `{"kind":"room","light":"late-night","side":"right"}`；取景 `{"at":[88.05,-43.48],"scale":0.85}`。
- **旁白**：明天见。
- **原朗读稿（核对用）**：明天见。
- **共读分类**：`"autonomous"`；紧邻承接 p58。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### p60｜p61 · 前后置

来源：[60-back.js](../../../src/content/books/shengqi/specs/60-back.js)。

#### p60 · 左页（仅纸书）

- **画面记录**：背景 `{}`；角色 `null`；道具 `[{"id":"spiral-1","kind":"spiral","at":[430,640],"scale":0.14}]`。
- **旁白**：《生气啦！》
- **成人文字**：一个也会生气的小怪物<br>文字与插画：rockbenben<br>出版：＿＿＿＿＿＿＿　初版：＿＿＿＿年＿＿月<br>作品内容：CC BY-NC-ND 4.0，非商业分享请署名。<br>字体：站酷快乐体 · 霞鹜文楷（SIL OFL 1.1），可商用、可嵌入出版物。<br>（空行）<br>编者说：情绪被同伴看见；第二次挫折时仍能继续，主动约定明天。读到犹豫的地方，可以停一停，听孩子怎么说。
- **原朗读稿（核对用）**：《生气啦！》
一个也会生气的小怪物
文字与插画：rockbenben
出版：＿＿＿＿＿＿＿　初版：＿＿＿＿年＿＿月
作品内容：CC BY-NC-ND 4.0，非商业分享请署名。
字体：站酷快乐体 · 霞鹜文楷（SIL OFL 1.1），可商用、可嵌入出版物。

编者说：情绪被同伴看见；第二次挫折时仍能继续，主动约定明天。读到犹豫的地方，可以停一停，听孩子怎么说。
- **屏幕动作**：未声明专属热区；共读与翻页，角色可有通用反馈。

#### p61 · 右页（仅纸书）

- **画面记录**：背景 `{}`；角色 `null`；道具 `[{"id":"spiral-1","kind":"spiral","at":[430,130],"scale":0.14}]`。
- **旁白**：怎么读这本册子
- **成人文字**：旁白慢慢念，拟声让孩子接着说。指认、拍手、呼气都可以在共读时一起做，不要求每页都做动作。孩子没有回应时，可以等一等，也可以翻过去。<br>这册可以特别停在：p34–p35 顶块掉下与 p44–p45 主动开口。让孩子说说看，不急着给答案。<br>睡前最后几跨，声音逐渐放轻。孩子想停在某一页，就在那里停一会儿。
- **原朗读稿（核对用）**：怎么读这本册子
旁白慢慢念，拟声让孩子接着说。指认、拍手、呼气都可以在共读时一起做，不要求每页都做动作。孩子没有回应时，可以等一等，也可以翻过去。
这册可以特别停在：p34–p35 顶块掉下与 p44–p45 主动开口。让孩子说说看，不急着给答案。
睡前最后几跨，声音逐渐放轻。孩子想停在某一页，就在那里停一会儿。
- **屏幕动作**：未声明专属热区；共读与翻页，角色可有通用反馈。

### p62｜p63 · 前后置

来源：[60-back.js](../../../src/content/books/shengqi/specs/60-back.js)。

#### p62 · 左页

- **画面记录**：背景 `{"kind":"rays-tight","colors":["--green"],"gap":"--paper","focus":[500,700],"cover":"all","wash":"--wash-green"}`；角色 `{"pose":"happy","at":[540,450],"scale":0.52,"spiral":true}`；道具 `[{"id":"arrow-1","kind":"arrow","at":[120,420],"scale":0.72,"class":"prop-arrow"}]`。
- **旁白**：还想再读吗？
- **提示**：点圆圈，再读一次。
- **纸书提示**：翻回封面吧。
- **原朗读稿（核对用）**：还想再读吗？
点圆圈，再读一次。
- **屏幕动作**：点圆圈，再读一次；动作 `"again"`；对象 `"arrow-1"`；热区 `[184,190]`，大小 508。
- **完成条件**：组内任务等待时，点空白不能向前跳过。
- **故事出口**：p04。
- **紧邻后页核对**：p63 旁白：（无旁白）

#### p63 · 右页（仅纸书）

- **画面记录**：背景 `{}`；角色 `null`；道具 `[{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[202,600],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[145,494],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"},{"id":"scarf-1","kind":"scarf","at":[660,710],"scale":0.35}]`。
- **原朗读稿（核对用）**：后环衬：三块半塔、两块地面与静放的橘色领巾。
- **屏幕动作**：未声明专属热区；共读与翻页，角色可有通用反馈。

### p64 · 前后置

来源：[60-back.js](../../../src/content/books/shengqi/specs/60-back.js)。

#### p64 · 单页（仅纸书）

- **画面记录**：背景 `{"kind":"rays","colors":["--yellow-deep","--yellow"],"gap":"--yellow","focus":[500,680],"cover":"all","wash":"--yellow"}`；角色 `{"pose":"covered-rest","at":[540,300],"scale":0.52,"spiral":false}`；道具 `[{"id":"block-1","kind":"block","at":[90,600],"scale":0.24,"style":"--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"},{"id":"block-2","kind":"block","at":[202,600],"scale":0.24,"style":"--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"},{"id":"block-3","kind":"block","at":[145,494],"scale":0.24,"style":"--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"},{"id":"block-4","kind":"block","at":[-50,710],"scale":0.24,"style":"--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"},{"id":"block-5","kind":"block","at":[350,800],"scale":0.24,"style":"--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"},{"id":"scarf-1","kind":"scarf","at":[660,710],"scale":0.35}]`。
- **旁白**：《生气啦！》
- **大字／拟声词**：耶！
- **原朗读稿（核对用）**：《生气啦！》耶！
- **屏幕动作**：未声明专属热区；共读与翻页，角色可有通用反馈。

## 快照溯源

本册来源 SHA-256：`cc9150bbc9ff6c9298cd116aefad38de7c44e90f8e16874f9600b2ab589d4cf0`。摘要依次连接 reader-ui.js、book.json 与读取顺序下去重的书稿文件的“仓库相对路径 + 换行 + 统一 LF 的 UTF-8 文本 + 换行”。数据区含全部数字与初始显隐；内容变更后重新运行生成命令。设计契约仍以设计规格为准。
