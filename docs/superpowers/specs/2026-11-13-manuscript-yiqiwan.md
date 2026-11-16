# 第三册《一起玩！》完整文字剧本

整理日期：2026-11-13。性质：当前工作区书稿的审阅快照，包含未提交修改；未改写原文。设计契约仍为[设计规格](2026-10-30-awulubo-picture-book-design.md)，逐字现稿仍以 src/content/books/yiqiwan/specs/ 为准。

[返回五册审稿总览](2026-11-13-manuscript-review.md)。本册 64 页，其中正文 28 跨、56 页，屏幕显示 60 页。跨页直接采用 loadBooks() 返回的 spreads（底层使用 model.ts 的 physicalSpreads），保留书稿顺序。

## 故事与节奏

噜啵抱住球，不愿让孩子一起玩。双方争抢，球滚走，两人闹别扭。孩子先转回来再次邀请，噜啵答应并把球推给孩子；两人轮流玩球，最后一起安静下来。

| 页段 | 故事任务 | 节奏与审阅重点 |
|---|---|---|
| p04–p09 | 球与占有 | 追球、抱住、宣布“我的球”。 |
| p10–p19 | 请求逐次受阻 | 摸一下、开口邀请、等到三、再伸手，升级到两人都抓住。 |
| p20–p21 | 争抢高点 | 两个都拉、不肯放。 |
| p22–p29 | 松手与冷场 | 球滚走、坐下、背过身、听见喘气。 |
| p30–p35 | 重新邀请与让出 | 孩子先转身，噜啵答应，球第一次交给孩子。 |
| p36–p45 | 轮流变成游戏 | 抛、接、传、再玩；需要逐页追踪球在谁手里。 |
| p46–p47 | 一起玩的高点 | 球在两人中间，欢乐得到兑现。 |
| p48–p59 | 共同安静 | 球慢下来、并排坐、天黑、入睡、明天再玩。 |

本册先审：保留真实的拒绝、拉锯和孩子再次开口；优先修清 p38–p45 的球权交接，核对 p36“点一下，一起扔”在屏幕上是否有相应动作。

## 阅读说明

- 下面保留全部现稿旁白、大字、提示及成人文字；纸书没有覆写的槽位沿用现稿。仅在有 print 声明时单列纸书版本，空串如实标注。原文换行以行内换行保留，数组空行单独标注。
- “画面记录”只根据书稿中的底色、笔触、角色姿态与道具整理，不是看图后的构图结论；道具数按声明计，具体遮挡与可见性待粗分镜或校样核对。
- “原朗读稿”逐字保留 aria，供检查它是否与可见文字同步；它可能含旧文案，不能代替当前旁白，也不能当作画面事实。
- “屏幕回应”根据 interactions.js 静态阅读整理，尚未操作验证。无专属热区的页仍可有共读动作。普通完成动作交给阅读状态机处理；宽屏需整组完成后才向前，不能把后页文字出现时机等同于单页翻页。
- 每个动作页另列紧邻后页旁白，便于人工审查承诺与兑现；这不是自动判定因果成立。同页动画与后页剧情各有作用。前后置按真实装订成组，p59 后的 p60 为版权页。

## 逐跨页剧本

本节由 `node tools/manuscript.mjs` 从当前工作区生成；人工故事与节奏审阅保留在前文。画面记录是书稿数据，不代替看图；动作记录是声明，不代替操作验收。

**本册屏幕共读提示**：「我的球」那几页孩子会着急，那是故意的——争过一场，才轮到一起玩。

### p01 · 前后置

来源：[01-front.js](../../../src/content/books/yiqiwan/specs/01-front.js)。

#### p01 · 单页

- **画面记录**：背景 `{"kind":"rays","colors":["--green","--wash-green"],"gap":"--green","focus":[500,560],"wash":"--wash-green"}`；角色 `{"pose":"ready","at":[170,220],"scale":0.64,"spiral":true,"wear":"headband"}`；道具 `[{"id":"ball-1","kind":"ball","at":[280,550],"scale":0.24,"style":"--ball:var(--blue)"}]`。
- **大字／拟声词**：一起玩！
- **旁白**：一个要你一起玩的小怪物
- **提示**：点我，开始。
- **纸书提示**：（空串）
- **原朗读稿（核对用）**：《一起玩！》一个要你一起玩的小怪物。点我，开始。
- **屏幕动作**：点封面开始阅读；动作 `"start"`；对象 `"page"`；热区 `[0,0]`，大小 1000。
- **紧邻后页核对**：p02 旁白：（无旁白）

### p02｜p03 · 前后置

来源：[01-front.js](../../../src/content/books/yiqiwan/specs/01-front.js)。

#### p02 · 左页

- **画面记录**：背景 `{}`；角色 `null`；道具 `[{"id":"ball-1","kind":"ball","at":[180,300],"scale":0.3,"style":"--ball:var(--blue)"},{"id":"headband-1","kind":"headband","at":[200,600],"scale":0.45,"style":"--wear-headband:inline"}]`。
- **原朗读稿（核对用）**：前环衬：一个蓝球与条纹发带。
- **屏幕动作**：未声明专属热区；共读与翻页，角色可有通用反馈。

#### p03 · 右页

- **画面记录**：背景 `{"kind":"rays-tight","colors":["--blue","--wash-blue"],"focus":[500,760],"wash":"--wash-blue"}`；角色 `{"pose":"ready","at":[250,470],"scale":0.6,"spiral":true,"wear":"headband"}`；道具 `[{"id":"ball-1","kind":"ball","at":[100,670],"scale":0.24,"style":"--ball:var(--blue)"}]`。
- **大字／拟声词**：一起玩！
- **旁白**：一个要你一起玩的小怪物
- **原朗读稿（核对用）**：扉页：《一起玩！》一个要你一起玩的小怪物。
- **屏幕动作**：未声明专属热区；共读与翻页，角色可有通用反馈。

### S01 · p04｜p05

来源：[02-ball.js](../../../src/content/books/yiqiwan/specs/02-ball.js)。

#### p04 · 左页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-blue","colors":["--wash-blue"],"gap":"--paper","cover":"all","focus":[1000,500]}`；角色 `{"pose":"look-down","at":[350,260],"scale":0.62,"spiral":true,"wear":"headband"}`；道具 `[{"id":"ball-1","kind":"ball","at":[150,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"window-nook","side":"left"}`；取景 `{"at":[-135.21,-87.94],"scale":1.1}`。
- **旁白**：窗边，一个球滚过来。
- **原朗读稿（核对用）**：窗边，一个球滚过来。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p05 · 右页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-blue","colors":["--wash-blue"],"gap":"--paper","cover":"all","focus":[0,500]}`；角色 `{"pose":"run","at":[350,260],"scale":0.62,"spiral":true,"wear":"headband"}`；道具 `[{"id":"ball-1","kind":"ball","at":[300,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"window-nook","side":"right"}`；取景 `{"at":[-135.21,-87.94],"scale":1.1}`。
- **旁白**：发带一晃，<br>它迈开小脚追上去！
- **原朗读稿（核对用）**：发带一晃，它迈开小脚追上去！
- **共读分类**：`"autonomous"`；紧邻承接 p04。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S02 · p06｜p07

来源：[03-grab.js](../../../src/content/books/yiqiwan/specs/03-grab.js)。

#### p06 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-blue","focus":[1000,500]}`；角色 `{"pose":"pounce","at":[350,260],"scale":0.62,"spiral":true,"wear":"headband"}`；道具 `[{"id":"ball-1","kind":"ball","at":[440,620],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"play-mat","side":"left"}`；取景 `{"at":[-54.28,-179.9],"scale":0.96}`。
- **旁白**：它往前一扑。
- **原朗读稿（核对用）**：它往前一扑。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p07 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-blue","focus":[0,500]}`；角色 `{"pose":"guard-ball","at":[350,300],"scale":0.62,"spiral":true,"wear":"headband-tilted"}`；道具 `[{"id":"ball-1","kind":"ball","at":[445,665],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)","layer":"behind"}]`；共享场景 `{"kind":"play-mat","side":"right"}`；取景 `{"at":[-54.28,-179.9],"scale":0.96}`。
- **旁白**：扑！它压住球，发带歪了。
- **原朗读稿（核对用）**：扑！它压住球，发带歪了。
- **共读分类**：`"autonomous"`；紧邻承接 p06。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S03 · p08｜p09

来源：[04-mine.js](../../../src/content/books/yiqiwan/specs/04-mine.js)。

#### p08 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-blue","focus":[1000,500]}`；角色 `{"pose":"braced","at":[350,260],"scale":0.62,"spiral":true,"wear":"headband-tilted"}`；道具 `[{"id":"ball-1","kind":"ball","at":[445,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"play-mat","side":"left"}`；取景 `{"at":[-346.81,-133.09],"scale":1.19}`。
- **旁白**：我的球！
- **原朗读稿（核对用）**：我的球！
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p09 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-blue","focus":[0,500]}`；角色 `{"pose":"back","at":[350,260],"scale":0.62,"spiral":false,"wear":"headband-tilted"}`；道具 `[{"id":"ball-1","kind":"ball","at":[535,470],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)","layer":"behind"}]`；共享场景 `{"kind":"play-mat","side":"right"}`；取景 `{"at":[-346.81,-133.09],"scale":1.19}`。
- **旁白**：它转过身，球藏得严严的。
- **原朗读稿（核对用）**：它转过身，球藏得严严的。
- **共读分类**：`"autonomous"`；紧邻承接 p08。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S04 · p10｜p11

来源：[05-want.js](../../../src/content/books/yiqiwan/specs/05-want.js)。

#### p10 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-blue","focus":[1000,500]}`；角色 `{"pose":"hesitant","at":[350,260],"scale":0.62,"spiral":true,"wear":"headband-tilted"}`；道具 `[{"id":"ball-1","kind":"ball","at":[445,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"},{"id":"child-hand","kind":"child-reach","at":[20,620],"scale":1}]`；共享场景 `{"kind":"play-mat","side":"left"}`；取景 `{"at":[14,-66.75],"scale":1.05}`。
- **旁白**：你也想摸摸球。
- **提示**：问问它：能摸摸吗？
- **纸书提示**：问问它：能摸摸吗？
- **原朗读稿（核对用）**：你也想摸摸球。
问问它：能摸摸吗？
- **共读分类**：`"simulate"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p11 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-blue","focus":[0,500]}`；角色 `{"pose":"side","at":[350,260],"scale":0.62,"spiral":true,"wear":"headband-tilted"}`；道具 `[{"id":"ball-1","kind":"ball","at":[660,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"play-mat","side":"right"}`；取景 `{"at":[14,-66.75],"scale":1.05}`。
- **旁白**：它侧着身，把球挪到另一边。
- **原朗读稿（核对用）**：它侧着身，把球挪到另一边。
- **共读分类**：`"autonomous"`；紧邻承接 p10。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S05 · p12｜p13

来源：[06-together.js](../../../src/content/books/yiqiwan/specs/06-together.js)。

#### p12 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-blue","focus":[1000,500]}`；角色 `{"pose":"curious-tilt","at":[350,260],"scale":0.62,"spiral":true,"wear":"headband-tilted"}`；道具 `[{"id":"ball-1","kind":"ball","at":[445,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"play-mat","side":"left"}`；取景 `{"at":[-108.95,-217.45],"scale":1.07}`。
- **旁白**：一起玩，好不好？
- **原朗读稿（核对用）**：一起玩，好不好？
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p13 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-blue","focus":[0,500]}`；角色 `{"pose":"braced","at":[350,260],"scale":0.62,"spiral":true,"wear":"headband-tilted"}`；道具 `[{"id":"ball-1","kind":"ball","at":[445,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"play-mat","side":"right"}`；取景 `{"at":[-108.95,-217.45],"scale":1.07}`。
- **旁白**：它摇头：不要。
- **原朗读稿（核对用）**：它摇头：不要。
- **共读分类**：`"autonomous"`；紧邻承接 p12。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S06 · p14｜p15

来源：[07-wait.js](../../../src/content/books/yiqiwan/specs/07-wait.js)。

#### p14 · 左页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-blue","colors":["--wash-blue"],"gap":"--paper","cover":"all","focus":[1000,500]}`；角色 `{"pose":"hesitant","at":[350,260],"scale":0.62,"spiral":true,"wear":"headband-tilted"}`；道具 `[{"id":"ball-1","kind":"ball","at":[445,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"play-mat","side":"left"}`；取景 `{"at":[-320.36,-109.63],"scale":1.15}`。
- **旁白**：你等了一会儿。
- **提示**：慢慢数到三。
- **纸书提示**：慢慢数到三。
- **原朗读稿（核对用）**：你等了一会儿。
慢慢数到三。
- **共读分类**：`"observe"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p15 · 右页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-blue","colors":["--wash-blue"],"gap":"--paper","cover":"all","focus":[0,500]}`；角色 `{"pose":"braced","at":[350,260],"scale":0.62,"spiral":true,"wear":"headband-tilted"}`；道具 `[{"id":"ball-1","kind":"ball","at":[445,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"play-mat","side":"right"}`；取景 `{"at":[-320.36,-109.63],"scale":1.15}`。
- **旁白**：数到三，它还紧紧拢着球。
- **原朗读稿（核对用）**：数到三，它还紧紧拢着球。
- **共读分类**：`"autonomous"`；紧邻承接 p14。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S07 · p16｜p17

来源：[08-again.js](../../../src/content/books/yiqiwan/specs/08-again.js)。

#### p16 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-blue","focus":[1000,500]}`；角色 `{"pose":"hesitant","at":[350,260],"scale":0.62,"spiral":true,"wear":"headband-tilted"}`；道具 `[{"id":"ball-1","kind":"ball","at":[445,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"},{"id":"child-hand","kind":"child-reach","at":[20,620],"scale":1}]`；共享场景 `{"kind":"play-mat","side":"left"}`；取景 `{"at":[16.4,5.45],"scale":0.93}`。
- **旁白**：你又伸出手。
- **原朗读稿（核对用）**：你又伸出手。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p17 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-blue","focus":[0,500]}`；角色 `{"pose":"guard-step","at":[500,260],"scale":0.62,"spiral":true,"wear":"headband-tilted"}`；道具 `[{"id":"ball-1","kind":"ball","at":[595,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"play-mat","side":"right"}`；取景 `{"at":[16.4,5.45],"scale":0.93}`。
- **旁白**：它连球带身子挪开一大截。
- **原朗读稿（核对用）**：它连球带身子挪开一大截。
- **共读分类**：`"autonomous"`；紧邻承接 p16。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S08 · p18｜p19

来源：[09-pull.js](../../../src/content/books/yiqiwan/specs/09-pull.js)。

#### p18 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-blue","focus":[1000,500]}`；角色 `{"pose":"braced","at":[350,260],"scale":0.62,"spiral":true,"wear":"headband-tilted"}`；道具 `[{"id":"ball-1","kind":"ball","at":[445,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"},{"id":"child-hand","kind":"child-reach","at":[80,630],"scale":1.2}]`；共享场景 `{"kind":"play-mat","side":"left"}`；取景 `{"at":[101.86,-179.57],"scale":0.96}`。
- **旁白**：你拉住球，不肯放。
- **原朗读稿（核对用）**：你拉住球，不肯放。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p19 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-blue","focus":[0,500]}`；角色 `{"pose":"guard-ball","at":[350,300],"scale":0.62,"spiral":true,"wear":"headband-tilted"}`；道具 `[{"id":"ball-1","kind":"ball","at":[445,665],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)","layer":"behind"},{"id":"child-hand","kind":"child-reach","at":[80,630],"scale":1.2}]`；共享场景 `{"kind":"play-mat","side":"right"}`；取景 `{"at":[101.86,-179.57],"scale":0.96}`。
- **旁白**：它肚子压下来，紧紧护住球。
- **原朗读稿（核对用）**：它肚子压下来，紧紧护住球。
- **共读分类**：`"autonomous"`；紧邻承接 p18。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S09 · p20｜p21

来源：[10-tug.js](../../../src/content/books/yiqiwan/specs/10-tug.js)。

#### p20 · 左页

- **画面记录**：背景 `{"kind":"rays","wash":"--wash-orange","colors":["--wash-orange"],"gap":"--paper","cover":"all","focus":[1000,500]}`；角色 `{"pose":"press-ball","at":[350,260],"scale":0.62,"spiral":true,"wear":"headband-tilted"}`；道具 `[{"id":"ball-1","kind":"ball","at":[445,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"},{"id":"child-hand","kind":"child-reach","at":[80,630],"scale":1.2}]`；共享场景 `{"kind":"play-mat","side":"left"}`；取景 `{"at":[-53.8,-158.22],"scale":1.11}`。
- **旁白**：你拉，它挤，四周挤满橙黄。
- **原朗读稿（核对用）**：你拉，它挤，四周挤满橙黄。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p21 · 右页

- **画面记录**：背景 `{"kind":"rays","wash":"--wash-orange","colors":["--wash-orange"],"gap":"--paper","cover":"all","focus":[0,500]}`；角色 `{"pose":"guard-ball","at":[350,300],"scale":0.62,"spiral":true,"wear":"headband-tilted"}`；道具 `[{"id":"ball-1","kind":"ball-squeezed","at":[445,665],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"},{"id":"child-hand","kind":"child-reach","at":[80,630],"scale":1.2}]`；共享场景 `{"kind":"play-mat","side":"right"}`；取景 `{"at":[-53.8,-158.22],"scale":1.11}`。
- **旁白**：球都扁了！两边还不肯放。
- **原朗读稿（核对用）**：球都扁了！两边还不肯放。
- **共读分类**：`"autonomous"`；紧邻承接 p20。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S10 · p22｜p23

来源：[11-roll.js](../../../src/content/books/yiqiwan/specs/11-roll.js)。

#### p22 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-orange","focus":[1000,500]}`；角色 `{"pose":"startled-seat","at":[350,260],"scale":0.62,"spiral":true,"wear":"headband-tilted"}`；道具 `[{"id":"ball-1","kind":"ball-squeezed","at":[445,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"},{"id":"child-hand","kind":"child-reach","at":[12,620],"scale":0.9}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[22.4,-104.23],"scale":1.05}`。
- **旁白**：忽然，都松了。
- **原朗读稿（核对用）**：忽然，都松了。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p23 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-orange","focus":[0,500]}`；角色 `{"pose":"startled-seat","at":[350,260],"scale":0.62,"spiral":true,"wear":"headband-low"}`；道具 `[{"id":"wall-anchor","kind":"wall-foot","at":[185,515],"scale":0.4,"layer":"behind","style":"--scene-ink:var(--ink);--scene-line-opacity:.22"},{"id":"ball-1","kind":"ball","at":[225,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[22.4,-104.23],"scale":1.05}`。
- **旁白**：骨碌碌！球弹圆，滚到墙脚。
- **原朗读稿（核对用）**：骨碌碌！球弹圆，滚到墙脚。
- **共读分类**：`"autonomous"`；紧邻承接 p22。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S11 · p24｜p25

来源：[12-sad.js](../../../src/content/books/yiqiwan/specs/12-sad.js)。

#### p24 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-orange","focus":[1000,500]}`；角色 `{"pose":"listen-low","at":[400,260],"scale":0.62,"spiral":true,"wear":"headband-low"}`；道具 `[{"id":"wall-anchor","kind":"wall-foot","at":[185,515],"scale":0.4,"layer":"behind","style":"--scene-ink:var(--ink);--scene-line-opacity:.22"},{"id":"ball-1","kind":"ball","at":[225,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[1.28,94.41],"scale":0.9}`。
- **旁白**：它低头坐下，发带歪在眉边。
- **原朗读稿（核对用）**：它低头坐下，发带歪在眉边。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p25 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-orange","focus":[0,500]}`；角色 `{"pose":"sad-seat","at":[400,260],"scale":0.62,"spiral":true,"wear":"headband-low"}`；道具 `[{"id":"wall-anchor","kind":"wall-foot","at":[185,515],"scale":0.4,"layer":"behind","style":"--scene-ink:var(--ink);--scene-line-opacity:.22"},{"id":"ball-1","kind":"ball","at":[225,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[1.28,94.41],"scale":0.9}`。
- **旁白**：你也坐下，球还停在墙脚。
- **原朗读稿（核对用）**：你也坐下，球还停在墙脚。
- **共读分类**：`"autonomous"`；紧邻承接 p24。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S12 · p26｜p27

来源：[13-turn.js](../../../src/content/books/yiqiwan/specs/13-turn.js)。

#### p26 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-orange","focus":[1000,500]}`；角色 `{"pose":"back","at":[400,260],"scale":0.62,"spiral":false,"wear":"headband-low"}`；道具 `[{"id":"wall-anchor","kind":"wall-foot","at":[185,515],"scale":0.4,"layer":"behind","style":"--scene-ink:var(--ink);--scene-line-opacity:.22"},{"id":"ball-1","kind":"ball","at":[225,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[-40.34,-256.39],"scale":1.12}`。
- **旁白**：它转身，背对着球。
- **原朗读稿（核对用）**：它转身，背对着球。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p27 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-orange","focus":[0,500]}`；角色 `{"pose":"huddle-away","at":[400,260],"scale":0.62,"spiral":false,"wear":"headband-low"}`；道具 `[{"id":"wall-anchor","kind":"wall-foot","at":[185,515],"scale":0.4,"layer":"behind","style":"--scene-ink:var(--ink);--scene-line-opacity:.22"},{"id":"ball-1","kind":"ball","at":[225,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[-40.34,-256.39],"scale":1.12}`。
- **旁白**：你也背过去，谁也看不见谁。
- **原朗读稿（核对用）**：你也背过去，谁也看不见谁。
- **共读分类**：`"autonomous"`；紧邻承接 p26。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S13 · p28｜p29

来源：[14-breath.js](../../../src/content/books/yiqiwan/specs/14-breath.js)。

#### p28 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-orange","focus":[1000,500]}`；角色 `{"pose":"listen-back","at":[400,260],"scale":0.62,"spiral":false,"wear":"headband-low"}`；道具 `[{"id":"wall-anchor","kind":"wall-foot","at":[185,515],"scale":0.4,"layer":"behind","style":"--scene-ink:var(--ink);--scene-line-opacity:.22"},{"id":"ball-1","kind":"ball","at":[225,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[49.74,170.2],"scale":0.84}`。
- **旁白**：背后传来呼气声。
- **提示**：安静听一听。
- **纸书提示**：安静听一听。
- **原朗读稿（核对用）**：背后传来呼气声。
安静听一听。
- **共读分类**：`"observe"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p29 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-orange","focus":[0,500]}`；角色 `{"pose":"huddle-away","at":[400,260],"scale":0.62,"spiral":false,"wear":"headband-low"}`；道具 `[{"id":"wall-anchor","kind":"wall-foot","at":[185,515],"scale":0.4,"layer":"behind","style":"--scene-ink:var(--ink);--scene-line-opacity:.22"},{"id":"ball-1","kind":"ball","at":[225,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[49.74,170.2],"scale":0.84}`。
- **旁白**：你停下来，听见它喘气。
- **原朗读稿（核对用）**：你停下来，听见它喘气。
- **共读分类**：`"autonomous"`；紧邻承接 p28。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S14 · p30｜p31

来源：[15-speak.js](../../../src/content/books/yiqiwan/specs/15-speak.js)。

#### p30 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-orange","focus":[1000,500]}`；角色 `{"pose":"listen-back","at":[400,260],"scale":0.62,"spiral":false,"wear":"headband-low"}`；道具 `[{"id":"wall-anchor","kind":"wall-foot","at":[185,515],"scale":0.4,"layer":"behind","style":"--scene-ink:var(--ink);--scene-line-opacity:.22"},{"id":"ball-1","kind":"ball","at":[225,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[-148.06,-89.5],"scale":1.1}`。
- **旁白**：你转过来：一起玩，好不好？
- **原朗读稿（核对用）**：你转过来：一起玩，好不好？
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p31 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-orange","focus":[0,500]}`；角色 `{"pose":"half-turn","at":[400,260],"scale":0.62,"spiral":false,"wear":"headband-low"}`；道具 `[{"id":"wall-anchor","kind":"wall-foot","at":[185,515],"scale":0.4,"layer":"behind","style":"--scene-ink:var(--ink);--scene-line-opacity:.22"},{"id":"ball-1","kind":"ball","at":[225,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[-148.06,-89.5],"scale":1.1}`。
- **旁白**：它慢慢转回半个身子。
- **原朗读稿（核对用）**：它慢慢转回半个身子。
- **共读分类**：`"autonomous"`；紧邻承接 p30。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S15 · p32｜p33

来源：[16-think.js](../../../src/content/books/yiqiwan/specs/16-think.js)。

#### p32 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-orange","focus":[1000,500]}`；角色 `{"pose":"curious-tilt","at":[400,260],"scale":0.62,"spiral":true,"wear":"headband-low"}`；道具 `[{"id":"wall-anchor","kind":"wall-foot","at":[185,515],"scale":0.4,"layer":"behind","style":"--scene-ink:var(--ink);--scene-line-opacity:.22"},{"id":"ball-1","kind":"ball","at":[225,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[-16.3,-192.8],"scale":1.04}`。
- **旁白**：它看你，又看球。
- **原朗读稿（核对用）**：它看你，又看球。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p33 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-orange","focus":[0,500]}`；角色 `{"pose":"listen-low","at":[400,260],"scale":0.62,"spiral":true,"wear":"headband-low"}`；道具 `[{"id":"wall-anchor","kind":"wall-foot","at":[185,515],"scale":0.4,"layer":"behind","style":"--scene-ink:var(--ink);--scene-line-opacity:.22"},{"id":"ball-1","kind":"ball","at":[225,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[-16.3,-192.8],"scale":1.04}`。
- **旁白**：……好。
- **原朗读稿（核对用）**：……好。
- **共读分类**：`"autonomous"`；紧邻承接 p32。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S16 · p34｜p35

来源：[17-give.js](../../../src/content/books/yiqiwan/specs/17-give.js)。

#### p34 · 左页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-orange","colors":["--wash-orange"],"gap":"--paper","cover":"all","focus":[1000,500]}`；角色 `{"pose":"push","at":[280,390],"scale":0.5,"spiral":true,"wear":"headband-low"}`；道具 `[{"id":"wall-anchor","kind":"wall-foot","at":[185,515],"scale":0.4,"layer":"behind","style":"--scene-ink:var(--ink);--scene-line-opacity:.22"},{"id":"ball-1","kind":"ball","at":[225,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue);--go-x:-100;--go-y:-110"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[-19.21,-24.92],"scale":0.86}`。
- **旁白**：它追到墙脚，<br>用肚子把球推回。
- **提示**：接住滚来的球。
- **纸书提示**：接住滚来的球。
- **原朗读稿（核对用）**：它追到墙脚，用肚子把球推回。
接住滚来的球。
- **共读分类**：`"simulate"`。
- **屏幕动作**：接住滚来的球；动作 `"pass"`；对象 `"ball-1"`；热区 `[250,635]`，大小 250。
- **紧邻后页核对**：p35 旁白：球滚了好远，你伸手接住了。

#### p35 · 右页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-orange","colors":["--wash-orange"],"gap":"--paper","cover":"all","focus":[0,500]}`；角色 `{"pose":"ready","at":[450,260],"scale":0.62,"spiral":true,"wear":"headband-low"}`；道具 `[{"id":"wall-anchor","kind":"wall-foot","at":[185,515],"scale":0.4,"layer":"behind","style":"--scene-ink:var(--ink);--scene-line-opacity:.22"},{"id":"child-hand","kind":"palm","at":[75,450],"scale":0.35},{"id":"ball-1","kind":"ball","at":[125,500],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[-19.21,-24.92],"scale":0.86}`。
- **旁白**：球滚了好远，你伸手接住了。
- **原朗读稿（核对用）**：球滚了好远，你伸手接住了。
- **共读分类**：`"autonomous"`；紧邻承接 p34。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S17 · p36｜p37

来源：[18-throw.js](../../../src/content/books/yiqiwan/specs/18-throw.js)。

#### p36 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-orange","focus":[1000,500]}`；角色 `{"pose":"waiting-up","at":[450,260],"scale":0.62,"spiral":true,"wear":"headband-low"}`；道具 `[{"id":"wall-anchor","kind":"wall-foot","at":[185,515],"scale":0.4,"layer":"behind","style":"--scene-ink:var(--ink);--scene-line-opacity:.22"},{"id":"child-hand","kind":"palm","at":[75,450],"scale":0.35},{"id":"ball-1","kind":"ball","at":[125,500],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue);--go-x:0;--go-y:0;--go-arc:90"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[-112.1,-262.7],"scale":1.1}`。
- **旁白**：轮到你玩一会儿。
- **提示**：轻轻抛一下。
- **纸书提示**：轻轻抛一下。
- **原朗读稿（核对用）**：轮到你玩一会儿。
轻轻抛一下。
- **共读分类**：`"simulate"`。
- **屏幕动作**：轻轻抛一下；动作 `"pass"`；对象 `"ball-1"`；热区 `[150,525]`，大小 250。
- **紧邻后页核对**：p37 旁白：呼——球落下来，你抱住了。

#### p37 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-orange","focus":[0,500]}`；角色 `{"pose":"waiting-up","at":[450,260],"scale":0.62,"spiral":true,"wear":"headband-low"}`；道具 `[{"id":"wall-anchor","kind":"wall-foot","at":[185,515],"scale":0.4,"layer":"behind","style":"--scene-ink:var(--ink);--scene-line-opacity:.22"},{"id":"child-hand","kind":"palm","at":[75,450],"scale":0.35},{"id":"ball-1","kind":"ball","at":[125,500],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[-112.1,-262.7],"scale":1.1}`。
- **旁白**：呼——球落下来，你抱住了。
- **原朗读稿（核对用）**：呼——球落下来，你抱住了。
- **共读分类**：`"autonomous"`；紧邻承接 p36。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S18 · p38｜p39

来源：[19-back.js](../../../src/content/books/yiqiwan/specs/19-back.js)。

#### p38 · 左页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-orange","colors":["--wash-orange"],"gap":"--paper","cover":"all","focus":[1000,500]}`；角色 `{"pose":"ready","at":[450,260],"scale":0.62,"spiral":true,"wear":"headband-low"}`；道具 `[{"id":"wall-anchor","kind":"wall-foot","at":[185,515],"scale":0.4,"layer":"behind","style":"--scene-ink:var(--ink);--scene-line-opacity:.22"},{"id":"child-hand","kind":"child-reach","at":[15,700],"scale":0.5},{"id":"ball-1","kind":"ball","at":[125,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue);--go-x:320;--go-y:0"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[68.17,-160.91],"scale":0.96}`。
- **旁白**：球在你面前。
- **提示**：把球推给它。
- **纸书提示**：把球推给它。
- **原朗读稿（核对用）**：球在你面前。
把球推给它。
- **共读分类**：`"simulate"`。
- **屏幕动作**：把球推给它；动作 `"pass"`；对象 `"ball-1"`；热区 `[150,635]`，大小 250。
- **紧邻后页核对**：p39 旁白：球一路滚到它脚边。

#### p39 · 右页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-orange","colors":["--wash-orange"],"gap":"--paper","cover":"all","focus":[0,500]}`；角色 `{"pose":"yield","at":[350,260],"scale":0.62,"spiral":true,"wear":"headband-low"}`；道具 `[{"id":"wall-anchor","kind":"wall-foot","at":[185,515],"scale":0.4,"layer":"behind","style":"--scene-ink:var(--ink);--scene-line-opacity:.22"},{"id":"ball-1","kind":"ball","at":[445,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[68.17,-160.91],"scale":0.96}`。
- **旁白**：球一路滚到它脚边。
- **原朗读稿（核对用）**：球一路滚到它脚边。
- **共读分类**：`"autonomous"`；紧邻承接 p38。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S19 · p40｜p41

来源：[20-catch.js](../../../src/content/books/yiqiwan/specs/20-catch.js)。

#### p40 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-orange","focus":[1000,500]}`；角色 `{"pose":"push","at":[350,260],"scale":0.62,"spiral":true,"wear":"headband-low"}`；道具 `[{"id":"wall-anchor","kind":"wall-foot","at":[185,515],"scale":0.4,"layer":"behind","style":"--scene-ink:var(--ink);--scene-line-opacity:.22"},{"id":"ball-1","kind":"ball","at":[445,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[-177.75,-101.56],"scale":1.15}`。
- **旁白**：它用肚子挡住球。
- **原朗读稿（核对用）**：它用肚子挡住球。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p41 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-orange","focus":[0,500]}`；角色 `{"pose":"curious-tilt","at":[450,260],"scale":0.62,"spiral":true,"wear":"headband-low"}`；道具 `[{"id":"wall-anchor","kind":"wall-foot","at":[185,515],"scale":0.4,"layer":"behind","style":"--scene-ink:var(--ink);--scene-line-opacity:.22"},{"id":"ball-1","kind":"ball","at":[445,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[-177.75,-101.56],"scale":1.15}`。
- **旁白**：这次，它让开一点，<br>正对着你。
- **原朗读稿（核对用）**：这次，它让开一点，正对着你。
- **共读分类**：`"autonomous"`；紧邻承接 p40。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S20 · p42｜p43

来源：[21-again.js](../../../src/content/books/yiqiwan/specs/21-again.js)。

#### p42 · 左页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-orange","colors":["--wash-orange"],"gap":"--paper","cover":"all","focus":[1000,500]}`；角色 `{"pose":"step","at":[350,260],"scale":0.62,"spiral":true,"wear":"headband-low"}`；道具 `[{"id":"wall-anchor","kind":"wall-foot","at":[185,515],"scale":0.4,"layer":"behind","style":"--scene-ink:var(--ink);--scene-line-opacity:.22"},{"id":"ball-1","kind":"ball","at":[445,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue);--go-x:-320;--go-y:-110"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[143.51,-125.04],"scale":0.78}`。
- **旁白**：它挺起身，把球推过来。
- **提示**：张开手接一接。
- **纸书提示**：张开手接一接。
- **原朗读稿（核对用）**：它挺起身，把球推过来。
张开手接一接。
- **共读分类**：`"simulate"`。
- **屏幕动作**：张开手接一接；动作 `"pass"`；对象 `"ball-1"`；热区 `[470,635]`，大小 250。
- **紧邻后页核对**：p43 旁白：球滚过来，你抱住了。

#### p43 · 右页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-orange","colors":["--wash-orange"],"gap":"--paper","cover":"all","focus":[0,500]}`；角色 `{"pose":"ready","at":[450,260],"scale":0.62,"spiral":true,"wear":"headband-low"}`；道具 `[{"id":"wall-anchor","kind":"wall-foot","at":[185,515],"scale":0.4,"layer":"behind","style":"--scene-ink:var(--ink);--scene-line-opacity:.22"},{"id":"child-hand","kind":"palm","at":[75,450],"scale":0.35},{"id":"ball-1","kind":"ball","at":[125,500],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[143.51,-125.04],"scale":0.78}`。
- **旁白**：球滚过来，你抱住了。
- **原朗读稿（核对用）**：球滚过来，你抱住了。
- **共读分类**：`"autonomous"`；紧邻承接 p42。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S21 · p44｜p45

来源：[22-turn2.js](../../../src/content/books/yiqiwan/specs/22-turn2.js)。

#### p44 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-orange","focus":[1000,500]}`；角色 `{"pose":"ready","at":[450,260],"scale":0.62,"spiral":true,"wear":"headband-low"}`；道具 `[{"id":"wall-anchor","kind":"wall-foot","at":[185,515],"scale":0.4,"layer":"behind","style":"--scene-ink:var(--ink);--scene-line-opacity:.22"},{"id":"child-hand","kind":"child-reach","at":[15,700],"scale":0.5},{"id":"ball-1","kind":"ball","at":[125,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue);--go-x:320;--go-y:0"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[20.6,5.85],"scale":0.96}`。
- **旁白**：球在你面前。
- **提示**：轻轻送回球。
- **纸书提示**：轻轻送回球。
- **原朗读稿（核对用）**：球在你面前。
轻轻送回球。
- **共读分类**：`"simulate"`。
- **屏幕动作**：轻轻送回球；动作 `"pass"`；对象 `"ball-1"`；热区 `[150,635]`，大小 250。
- **紧邻后页核对**：p45 旁白：你一推，它迈开小脚迎上来！

#### p45 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-orange","focus":[0,500]}`；角色 `{"pose":"beaming-lean","at":[350,260],"scale":0.62,"spiral":true,"wear":"headband-low"}`；道具 `[{"id":"wall-anchor","kind":"wall-foot","at":[185,515],"scale":0.4,"layer":"behind","style":"--scene-ink:var(--ink);--scene-line-opacity:.22"},{"id":"ball-1","kind":"ball","at":[445,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[20.6,5.85],"scale":0.96}`。
- **旁白**：你一推，它迈开小脚迎上来！
- **原朗读稿（核对用）**：你一推，它迈开小脚迎上来！
- **共读分类**：`"autonomous"`；紧邻承接 p44。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S22 · p46｜p47

来源：[23-play.js](../../../src/content/books/yiqiwan/specs/23-play.js)。

#### p46 · 左页

- **画面记录**：背景 `{"kind":"rays","wash":"--wash-yellow","colors":["--yellow"],"gap":"--paper","cover":"all","focus":[1000,500]}`；角色 `{"pose":"push","at":[350,260],"scale":0.62,"spiral":true,"wear":"headband-low"}`；道具 `[{"id":"fantasy-distance","kind":"castle","at":[-350,50],"scale":0.65,"layer":"behind","style":"--scene-sky:var(--wash-orange);--scene-castle-opacity:.18;--scene-ink:var(--ink);--scene-line-opacity:.08"},{"id":"wall-anchor","kind":"wall-foot","at":[185,515],"scale":0.4,"layer":"behind","style":"--scene-ink:var(--ink);--scene-line-opacity:.22"},{"id":"ball-1","kind":"ball","at":[445,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[-170.5,-134.3],"scale":1.19}`。
- **旁白**：它把球推回来，黄颜色铺开。
- **提示**：一起说声嘿！
- **纸书提示**：一起说声嘿！
- **原朗读稿（核对用）**：它把球推回来，黄颜色铺开。
一起说声嘿！
- **共读分类**：`"simulate"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p47 · 右页

- **画面记录**：背景 `{"kind":"rays","wash":"--wash-yellow","colors":["--yellow"],"gap":"--paper","cover":"all","focus":[0,500]}`；角色 `{"pose":"joy","at":[350,260],"scale":0.62,"spiral":true,"wear":"headband-low"}`；道具 `[{"id":"wall-anchor","kind":"wall-foot","at":[185,515],"scale":0.4,"layer":"behind","style":"--scene-ink:var(--ink);--scene-line-opacity:.22"},{"id":"ball-1","kind":"ball","at":[270,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[-170.5,-134.3],"scale":1.19}`。
- **旁白**：球来回滚，你们笑个不停！
- **原朗读稿（核对用）**：球来回滚，你们笑个不停！
- **共读分类**：`"autonomous"`；紧邻承接 p46。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S23 · p48｜p49

来源：[24-tired.js](../../../src/content/books/yiqiwan/specs/24-tired.js)。

#### p48 · 左页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-yellow","colors":["--yellow"],"gap":"--paper","cover":"all","focus":[1000,500]}`；角色 `{"pose":"side","at":[350,260],"scale":0.62,"spiral":true,"wear":"headband-low"}`；道具 `[{"id":"wall-anchor","kind":"wall-foot","at":[185,515],"scale":0.4,"layer":"behind","style":"--scene-ink:var(--ink);--scene-line-opacity:.22"},{"id":"ball-1","kind":"ball","at":[330,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[-5.65,-250.12],"scale":1.11}`。
- **旁白**：球越滚越慢。
- **原朗读稿（核对用）**：球越滚越慢。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p49 · 右页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-yellow","colors":["--yellow"],"gap":"--paper","cover":"all","focus":[0,500]}`；角色 `{"pose":"ready","at":[350,260],"scale":0.62,"spiral":true,"wear":"headband-low"}`；道具 `[{"id":"wall-anchor","kind":"wall-foot","at":[185,515],"scale":0.4,"layer":"behind","style":"--scene-ink:var(--ink);--scene-line-opacity:.22"},{"id":"ball-1","kind":"ball","at":[445,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[-5.65,-250.12],"scale":1.11}`。
- **旁白**：最后轻轻碰到它的脚，<br>停住了。
- **原朗读稿（核对用）**：最后轻轻碰到它的脚，停住了。
- **共读分类**：`"autonomous"`；紧邻承接 p48。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S24 · p50｜p51

来源：[25-sit.js](../../../src/content/books/yiqiwan/specs/25-sit.js)。

#### p50 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-yellow","focus":[1000,500]}`；角色 `{"pose":"bow","at":[350,310],"scale":0.62,"spiral":false}`；道具 `[{"id":"child-hand","kind":"child-reach","at":[400,330],"scale":0.7},{"id":"ball-1","kind":"ball","at":[445,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"},{"id":"headband-1","kind":"headband","at":[480,340],"scale":0.35,"style":"--wear-headband:inline;--wear-head-tilt:rotate(-16deg)"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[95.24,242.55],"scale":0.73}`。
- **旁白**：它低低头，让你摘下小发带。
- **原朗读稿（核对用）**：它低低头，让你摘下小发带。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p51 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-yellow","focus":[0,500]}`；角色 `{"pose":"curled","at":[530,300],"scale":0.55,"spiral":false}`；道具 `[{"id":"ball-1","kind":"ball","at":[445,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue)"},{"id":"headband-1","kind":"headband","at":[30,700],"scale":0.4,"style":"--wear-headband:inline;--wear-head-tilt:rotate(-16deg)"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[95.24,242.55],"scale":0.73}`。
- **旁白**：你们挨着坐，球留在中间。
- **原朗读稿（核对用）**：你们挨着坐，球留在中间。
- **共读分类**：`"autonomous"`；紧邻承接 p50。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S25 · p52｜p53

来源：[26-dark.js](../../../src/content/books/yiqiwan/specs/26-dark.js)。

#### p52 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--night","focus":[1000,500]}`；角色 `{"pose":"sleep-curled","at":[530,300],"scale":0.55,"spiral":false}`；道具 `[{"id":"ball-1","kind":"ball","at":[445,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue);opacity:.65"},{"id":"headband-1","kind":"headband","at":[30,700],"scale":0.4,"style":"--wear-headband:inline;--wear-head-tilt:rotate(-16deg);opacity:.65"}]`；共享场景 `{"kind":"window-nook","light":"night","side":"left"}`；取景 `{"at":[-116.1,-121.11],"scale":1}`。
- **旁白**：天黑，球上也落着月光。
- **原朗读稿（核对用）**：天黑，球上也落着月光。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p53 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--night","focus":[0,500]}`；角色 `{"pose":"curled-yawn","at":[530,300],"scale":0.55,"spiral":false}`；道具 `[{"id":"ball-1","kind":"ball","at":[445,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue);opacity:.65"},{"id":"headband-1","kind":"headband","at":[30,700],"scale":0.4,"style":"--wear-headband:inline;--wear-head-tilt:rotate(-16deg);opacity:.65"}]`；共享场景 `{"kind":"window-nook","light":"night","side":"right"}`；取景 `{"at":[-116.1,-121.11],"scale":1}`。
- **旁白**：它打了个哈欠。
- **原朗读稿（核对用）**：它打了个哈欠。
- **共读分类**：`"autonomous"`；紧邻承接 p52。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S26 · p54｜p55

来源：[27-sleepy.js](../../../src/content/books/yiqiwan/specs/27-sleepy.js)。

#### p54 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--night","focus":[1000,500]}`；角色 `{"pose":"curled","at":[530,300],"scale":0.55,"spiral":false}`；道具 `[{"id":"ball-1","kind":"ball","at":[445,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue);opacity:.65"},{"id":"headband-1","kind":"headband","at":[30,700],"scale":0.4,"style":"--wear-headband:inline;--wear-head-tilt:rotate(-16deg);opacity:.65"}]`；共享场景 `{"kind":"room","light":"night","side":"left"}`；取景 `{"at":[45.34,107.39],"scale":0.82}`。
- **旁白**：你也躺下来。
- **原朗读稿（核对用）**：你也躺下来。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p55 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--night","focus":[0,500]}`；角色 `{"pose":"curled","at":[530,300],"scale":0.55,"spiral":false}`；道具 `[{"id":"ball-1","kind":"ball","at":[445,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue);opacity:.65"},{"id":"headband-1","kind":"headband","at":[30,700],"scale":0.4,"style":"--wear-headband:inline;--wear-head-tilt:rotate(-16deg);opacity:.65"}]`；共享场景 `{"kind":"room","light":"night","side":"right"}`；取景 `{"at":[45.34,107.39],"scale":0.82}`。
- **旁白**：球就在伸手能碰到的地方。
- **原朗读稿（核对用）**：球就在伸手能碰到的地方。
- **共读分类**：`"autonomous"`；紧邻承接 p54。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S27 · p56｜p57

来源：[28-night.js](../../../src/content/books/yiqiwan/specs/28-night.js)。

#### p56 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--night-deep","focus":[1000,500]}`；角色 `{"pose":"covered-rest","at":[530,300],"scale":0.55,"spiral":false}`；道具 `[{"id":"ball-1","kind":"ball","at":[445,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue);opacity:.3"},{"id":"headband-1","kind":"headband","at":[30,700],"scale":0.4,"style":"--wear-headband:inline;--wear-head-tilt:rotate(-16deg);opacity:.3"}]`；共享场景 `{"kind":"room","light":"late-night","side":"left"}`；取景 `{"at":[84.15,155.42],"scale":0.75}`。
- **旁白**：晚安。
- **提示**：轻轻翻过去。
- **纸书提示**：轻轻翻过去。
- **原朗读稿（核对用）**：晚安。
轻轻翻过去。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p57 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--night-deep","focus":[0,500]}`；角色 `{"pose":"covered-rest","at":[530,300],"scale":0.55,"spiral":false}`；道具 `[{"id":"ball-1","kind":"ball","at":[445,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue);opacity:.3"},{"id":"headband-1","kind":"headband","at":[30,700],"scale":0.4,"style":"--wear-headband:inline;--wear-head-tilt:rotate(-16deg);opacity:.3"}]`；共享场景 `{"kind":"room","light":"late-night","side":"right"}`；取景 `{"at":[84.15,155.42],"scale":0.75}`。
- **旁白**：呼噜……
- **原朗读稿（核对用）**：呼噜……
- **共读分类**：`"autonomous"`；紧邻承接 p56。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S28 · p58｜p59

来源：[29-tomorrow.js](../../../src/content/books/yiqiwan/specs/29-tomorrow.js)。

#### p58 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--night-deep","focus":[1000,500]}`；角色 `{"pose":"covered-rest","at":[530,300],"scale":0.55,"spiral":false}`；道具 `[{"id":"ball-1","kind":"ball","at":[445,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue);opacity:.3"},{"id":"headband-1","kind":"headband","at":[30,700],"scale":0.4,"style":"--wear-headband:inline;--wear-head-tilt:rotate(-16deg);opacity:.3"}]`；共享场景 `{"kind":"room","light":"late-night","side":"left"}`；取景 `{"at":[84.15,155.42],"scale":0.75}`。
- **旁白**：球静静待着。
- **原朗读稿（核对用）**：球静静待着。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p59 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--night-deep","focus":[0,500]}`；角色 `{"pose":"covered-rest","at":[530,300],"scale":0.55,"spiral":false}`；道具 `[{"id":"ball-1","kind":"ball","at":[445,610],"scale":0.25,"class":"prop-ball","style":"--ball:var(--blue);opacity:.3"},{"id":"headband-1","kind":"headband","at":[30,700],"scale":0.4,"style":"--wear-headband:inline;--wear-head-tilt:rotate(-16deg);opacity:.3"}]`；共享场景 `{"kind":"room","light":"late-night","side":"right"}`；取景 `{"at":[84.15,155.42],"scale":0.75}`。
- **旁白**：明天，还一起玩。
- **原朗读稿（核对用）**：明天，还一起玩。
- **共读分类**：`"autonomous"`；紧邻承接 p58。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### p60｜p61 · 前后置

来源：[60-back.js](../../../src/content/books/yiqiwan/specs/60-back.js)。

#### p60 · 左页（仅纸书）

- **画面记录**：背景 `{}`；角色 `null`；道具 `[{"id":"spiral-1","kind":"spiral","at":[430,640],"scale":0.14}]`。
- **旁白**：《一起玩！》
- **成人文字**：一个要你一起玩的小怪物<br>文字与插画：rockbenben<br>出版：＿＿＿＿＿＿＿　初版：＿＿＿＿年＿＿月<br>作品内容：CC BY-NC-ND 4.0，非商业分享请署名。<br>字体：站酷快乐体 · 霞鹜文楷（SIL OFL 1.1），可商用、可嵌入出版物。<br>（空行）<br>编者说：从占住球、争抢，到自愿让出并主动传回来。读到犹豫的地方，可以停一停，听孩子怎么说。
- **原朗读稿（核对用）**：《一起玩！》
一个要你一起玩的小怪物
文字与插画：rockbenben
出版：＿＿＿＿＿＿＿　初版：＿＿＿＿年＿＿月
作品内容：CC BY-NC-ND 4.0，非商业分享请署名。
字体：站酷快乐体 · 霞鹜文楷（SIL OFL 1.1），可商用、可嵌入出版物。

编者说：从占住球、争抢，到自愿让出并主动传回来。读到犹豫的地方，可以停一停，听孩子怎么说。
- **屏幕动作**：未声明专属热区；共读与翻页，角色可有通用反馈。

#### p61 · 右页（仅纸书）

- **画面记录**：背景 `{}`；角色 `null`；道具 `[{"id":"spiral-1","kind":"spiral","at":[430,130],"scale":0.14}]`。
- **旁白**：怎么读这本册子
- **成人文字**：旁白慢慢念，拟声让孩子接着说。指认、拍手、呼气都可以在共读时一起做，不要求每页都做动作。孩子没有回应时，可以等一等，也可以翻过去。<br>争抢是故事中的冲突，不是共读时让孩子真的拉扯玩具。可以听听孩子觉得谁在着急，不强迫给出分享答案。<br>这册可以特别停在：p20–p21 争抢与 p42–p45 自愿回传。让孩子说说看，不急着给答案。<br>睡前最后几跨，声音逐渐放轻。孩子想停在某一页，就在那里停一会儿。
- **原朗读稿（核对用）**：怎么读这本册子
旁白慢慢念，拟声让孩子接着说。指认、拍手、呼气都可以在共读时一起做，不要求每页都做动作。孩子没有回应时，可以等一等，也可以翻过去。
争抢是故事中的冲突，不是共读时让孩子真的拉扯玩具。可以听听孩子觉得谁在着急，不强迫给出分享答案。
这册可以特别停在：p20–p21 争抢与 p42–p45 自愿回传。让孩子说说看，不急着给答案。
睡前最后几跨，声音逐渐放轻。孩子想停在某一页，就在那里停一会儿。
- **屏幕动作**：未声明专属热区；共读与翻页，角色可有通用反馈。

### p62｜p63 · 前后置

来源：[60-back.js](../../../src/content/books/yiqiwan/specs/60-back.js)。

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

- **画面记录**：背景 `{}`；角色 `null`；道具 `[{"id":"ball-1","kind":"ball","at":[180,300],"scale":0.3,"style":"--ball:var(--blue)"},{"id":"headband-1","kind":"headband","at":[200,600],"scale":0.45,"style":"--wear-headband:inline"}]`。
- **原朗读稿（核对用）**：后环衬：同一个球与静放的发带。
- **屏幕动作**：未声明专属热区；共读与翻页，角色可有通用反馈。

### p64 · 前后置

来源：[60-back.js](../../../src/content/books/yiqiwan/specs/60-back.js)。

#### p64 · 单页（仅纸书）

- **画面记录**：背景 `{"kind":"rays","colors":["--yellow-deep","--yellow"],"gap":"--yellow","focus":[500,680],"cover":"all","wash":"--yellow"}`；角色 `{"pose":"covered-rest","at":[250,350],"scale":0.6,"spiral":false}`；道具 `[{"id":"blob-1","kind":"blob","at":[240,-132],"scale":0.5},{"id":"ball-1","kind":"ball","at":[100,660],"scale":0.2,"style":"--ball:var(--blue)"},{"id":"headband-1","kind":"headband","at":[100,780],"scale":0.3,"style":"--wear-headband:inline"}]`。
- **旁白**：《一起玩！》
- **大字／拟声词**：耶！
- **原朗读稿（核对用）**：《一起玩！》耶！
- **屏幕动作**：未声明专属热区；共读与翻页，角色可有通用反馈。

## 快照溯源

本册来源 SHA-256：`194e6950a09315ce35f6d3b8319de771218940975375407e2bbcb952d4b8bf69`。摘要依次连接 reader-ui.js、book.json 与读取顺序下去重的书稿文件的“仓库相对路径 + 换行 + 统一 LF 的 UTF-8 文本 + 换行”。数据区含全部数字与初始显隐；内容变更后重新运行生成命令。设计契约仍以设计规格为准。
