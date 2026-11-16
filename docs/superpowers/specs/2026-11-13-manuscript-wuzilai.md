# 第五册《我自己来！》完整文字剧本

整理日期：2026-11-13。性质：当前工作区书稿的审阅快照，包含未提交修改；未改写原文。设计契约仍为[设计规格](2026-10-30-awulubo-picture-book-design.md)，逐字现稿仍以 src/content/books/wuzilai/specs/ 为准。

[返回五册审稿总览](2026-11-13-manuscript-review.md)。本册 64 页，其中正文 28 跨、56 页，屏幕显示 60 页。跨页直接采用 loadBooks() 返回的 spreads（底层使用 model.ts 的 physicalSpreads），保留书稿顺序。

## 故事与节奏

噜啵什么都要自己做：拿星星、吃苹果、倒水，却越弄越乱。孩子没有责备，蹲下陪它，等它哭过、再尝试把东西放进篮子。随后轮到孩子自己收，噜啵也学着在旁边等，最后一起收好并入睡。

| 页段 | 故事任务 | 节奏与审阅重点 |
|---|---|---|
| p04–p13 | 坚持自己做 | 拿星星、吃苹果、倒水，几件事依次尝试。 |
| p14–p21 | 弄乱、停住、全洒了 | p14 已经摔落，p20 再次全洒，需要补足第二次事件的起因。 |
| p22–p25 | 不责备与陪伴 | 蹲下、哭、拥抱；是关系转折，给它停顿。 |
| p26–p33 | 捡起与重试成功 | 捡、放篮子、再放苹果、笑；需要明确是谁完成、在重试什么。 |
| p34–p43 | 位置互换 | 轮到孩子自己来；噜啵观看、等待、不伸手，准备三样东西。 |
| p44–p47 | 自己收好的高点 | 三样收进篮子→满了→地上空了→庆祝。 |
| p48–p59 | 带着篮子入睡 | 篮子留在旁边，梦见收好，明天再玩。 |

本册先审：保留孩子成为等待者、噜啵再学会等待的互换；优先确定一条清楚的“失败→重试成功”主动作，并追踪三样物品从地面到篮子的连续性。

## 阅读说明

- 下面保留全部现稿旁白、大字、提示及成人文字；纸书没有覆写的槽位沿用现稿。仅在有 print 声明时单列纸书版本，空串如实标注。原文换行以行内换行保留，数组空行单独标注。
- “画面记录”只根据书稿中的底色、笔触、角色姿态与道具整理，不是看图后的构图结论；道具数按声明计，具体遮挡与可见性待粗分镜或校样核对。
- “原朗读稿”逐字保留 aria，供检查它是否与可见文字同步；它可能含旧文案，不能代替当前旁白，也不能当作画面事实。
- “屏幕回应”根据 interactions.js 静态阅读整理，尚未操作验证。无专属热区的页仍可有共读动作。普通完成动作交给阅读状态机处理；宽屏需整组完成后才向前，不能把后页文字出现时机等同于单页翻页。
- 每个动作页另列紧邻后页旁白，便于人工审查承诺与兑现；这不是自动判定因果成立。同页动画与后页剧情各有作用。前后置按真实装订成组，p59 后的 p60 为版权页。

## 逐跨页剧本

本节由 `node tools/manuscript.mjs` 从当前工作区生成；人工故事与节奏审阅保留在前文。画面记录是书稿数据，不代替看图；动作记录是声明，不代替操作验收。

**本册屏幕共读提示**：它说自己来时，先停下手。苹果由它收，小鱼和最后的星星由孩子收；说等一等后，它会收脚退开。

### p01 · 前后置

来源：[01-front.js](../../../src/content/books/wuzilai/specs/01-front.js)。

#### p01 · 单页

- **画面记录**：背景 `{"kind":"rays","colors":["--pink","--wash-pink"],"gap":"--pink","focus":[500,560],"wash":"--wash-pink"}`；角色 `{"pose":"braced","at":[170,220],"scale":0.64,"spiral":true,"wear":"vest"}`；道具 `[]`。
- **大字／拟声词**：我自己来！
- **旁白**：一个非要自己来的小怪物
- **提示**：点我，开始。
- **纸书提示**：（空串）
- **原朗读稿（核对用）**：《我自己来！》一个非要自己来的小怪物。点我，开始。
- **屏幕动作**：点封面开始阅读；动作 `"start"`；对象 `"page"`；热区 `[0,0]`，大小 1000。
- **紧邻后页核对**：p02 旁白：（无旁白）

### p02｜p03 · 前后置

来源：[01-front.js](../../../src/content/books/wuzilai/specs/01-front.js)。

#### p02 · 左页

- **画面记录**：背景 `{}`；角色 `null`；道具 `[{"id":"basket-1","kind":"basket","at":[0,390],"scale":0.55,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[530,650],"scale":0.16},{"id":"fish-1","kind":"fish","at":[700,680],"scale":0.18},{"id":"star-1","kind":"star","at":[430,650],"scale":0.14}]`。
- **原朗读稿（核对用）**：前环衬：同一篮与同三物，尚未收纳。
- **屏幕动作**：未声明专属热区；共读与翻页，角色可有通用反馈。

#### p03 · 右页

- **画面记录**：背景 `{"kind":"rays-tight","colors":["--yellow","--wash-yellow"],"focus":[500,760],"wash":"--wash-yellow"}`；角色 `{"pose":"braced","at":[250,470],"scale":0.6,"spiral":true,"wear":"vest"}`；道具 `[]`。
- **大字／拟声词**：我自己来！
- **旁白**：一个非要自己来的小怪物
- **原朗读稿（核对用）**：扉页：《我自己来！》一个非要自己来的小怪物。
- **屏幕动作**：未声明专属热区；共读与翻页，角色可有通用反馈。

### S01 · p04｜p05

来源：[02-say.js](../../../src/content/books/wuzilai/specs/02-say.js)。

#### p04 · 左页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-cream","colors":["--wash-yellow","--wash-cream"],"gap":"--paper","cover":"all"}`；角色 `{"pose":"braced","at":[450,250],"scale":0.6,"spiral":true,"wear":"vest"}`；道具 `[{"id":"fantasy-distance","kind":"castle","at":[200,10],"scale":0.3,"layer":"behind","style":"--scene-castle-opacity:.07;--scene-ink:var(--ink)"},{"id":"basket-1","kind":"basket","at":[0,390],"scale":0.55,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[530,650],"scale":0.16},{"id":"fish-1","kind":"fish","at":[700,680],"scale":0.18},{"id":"star-1","kind":"star","at":[430,650],"scale":0.14}]`；共享场景 `{"kind":"window-nook","side":"left"}`；取景 `{"at":[-73.9,-24.95],"scale":1}`。
- **旁白**：我自己来！
- **提示**：先停下手。
- **纸书提示**：先停下手。
- **原朗读稿（核对用）**：我自己来！
先停下手。
- **共读分类**：`"simulate"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p05 · 右页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-cream","colors":["--wash-yellow","--wash-cream"],"gap":"--paper","cover":"all"}`；角色 `{"pose":"side","at":[165,190],"scale":0.6,"spiral":true,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket","at":[0,390],"scale":0.55,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[530,650],"scale":0.16},{"id":"fish-1","kind":"fish","at":[700,680],"scale":0.18},{"id":"star-1","kind":"star","at":[430,650],"scale":0.14}]`；共享场景 `{"kind":"window-nook","side":"right"}`；取景 `{"at":[-73.9,-24.95],"scale":1}`。
- **旁白**：它穿着小背心，<br>横身挡住篮口。
- **原朗读稿（核对用）**：它穿着小背心，横身挡住篮口。
- **共读分类**：`"autonomous"`；紧邻承接 p04。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S02 · p06｜p07

来源：[03-star.js](../../../src/content/books/wuzilai/specs/03-star.js)。

#### p06 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"head-nudge","at":[440,240],"scale":0.58,"spiral":true,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket","at":[0,390],"scale":0.55,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[530,650],"scale":0.16},{"id":"fish-1","kind":"fish","at":[700,680],"scale":0.18},{"id":"star-1","kind":"star","at":[400,530],"scale":0.14}]`；共享场景 `{"kind":"play-mat","side":"left"}`；取景 `{"at":[70.16,-124.11],"scale":0.94}`。
- **旁白**：它低下头，把星星往篮口顶。
- **原朗读稿（核对用）**：它低下头，把星星往篮口顶。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p07 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"recoil-step","at":[450,250],"scale":0.6,"spiral":true,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket","at":[0,390],"scale":0.55,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[530,650],"scale":0.16},{"id":"fish-1","kind":"fish","at":[700,680],"scale":0.18},{"id":"star-1","kind":"star","at":[550,690],"scale":0.14}]`；共享场景 `{"kind":"play-mat","side":"right"}`；取景 `{"at":[70.16,-124.11],"scale":0.94}`。
- **旁白**：咻！星星滑回，它急急收脚。
- **原朗读稿（核对用）**：咻！星星滑回，它急急收脚。
- **共读分类**：`"autonomous"`；紧邻承接 p06。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S03 · p08｜p09

来源：[04-jump.js](../../../src/content/books/wuzilai/specs/04-jump.js)。

#### p08 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"side","at":[450,250],"scale":0.6,"spiral":true,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket","at":[0,390],"scale":0.55,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[530,650],"scale":0.16},{"id":"fish-1","kind":"fish","at":[450,625],"scale":0.18},{"id":"star-1","kind":"star","at":[550,690],"scale":0.14}]`；共享场景 `{"kind":"play-mat","side":"left"}`；取景 `{"at":[-108,-46.54],"scale":1.04}`。
- **旁白**：它侧过圆身，又去挤小鱼。
- **原朗读稿（核对用）**：它侧过圆身，又去挤小鱼。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p09 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"tilt-foot","at":[450,250],"scale":0.6,"spiral":true,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket","at":[0,390],"scale":0.55,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[530,650],"scale":0.16},{"id":"fish-1","kind":"fish","at":[450,625],"scale":0.18,"rotate":20},{"id":"star-1","kind":"star","at":[550,690],"scale":0.14}]`；共享场景 `{"kind":"play-mat","side":"right"}`；取景 `{"at":[-108,-46.54],"scale":1.04}`。
- **旁白**：小鱼一歪，它也歪得脚离地。
- **原朗读稿（核对用）**：小鱼一歪，它也歪得脚离地。
- **共读分类**：`"autonomous"`；紧邻承接 p08。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S04 · p10｜p11

来源：[05-apple.js](../../../src/content/books/wuzilai/specs/05-apple.js)。

#### p10 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"hesitant","at":[450,250],"scale":0.6,"spiral":true,"wear":"vest"}`；道具 `[{"id":"wall-anchor","kind":"wall-foot","at":[890,530],"scale":0.2,"layer":"behind","style":"--scene-line-opacity:.22;--scene-ink:var(--ink)"},{"id":"basket-1","kind":"basket","at":[0,390],"scale":0.55,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[655,660],"scale":0.16},{"id":"fish-1","kind":"fish","at":[450,625],"scale":0.18},{"id":"star-1","kind":"star","at":[550,690],"scale":0.14}]`；共享场景 `{"kind":"play-mat","side":"left"}`；取景 `{"at":[-89.86,-5.91],"scale":0.95}`。
- **旁白**：圆苹果一碰，就滚走了。
- **原朗读稿（核对用）**：圆苹果一碰，就滚走了。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p11 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"run","at":[490,270],"scale":0.58,"spiral":true,"wear":"vest"}`；道具 `[{"id":"wall-anchor","kind":"wall-foot","at":[890,530],"scale":0.2,"layer":"behind","style":"--scene-line-opacity:.22;--scene-ink:var(--ink)"},{"id":"basket-1","kind":"basket","at":[0,390],"scale":0.55,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[770,660],"scale":0.16},{"id":"fish-1","kind":"fish","at":[450,625],"scale":0.18},{"id":"star-1","kind":"star","at":[550,690],"scale":0.14}]`；共享场景 `{"kind":"play-mat","side":"right"}`；取景 `{"at":[-89.86,-5.91],"scale":0.95}`。
- **旁白**：它迈开小脚，追到墙脚边。
- **原朗读稿（核对用）**：它迈开小脚，追到墙脚边。
- **共读分类**：`"autonomous"`；紧邻承接 p10。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S05 · p12｜p13

来源：[06-cup.js](../../../src/content/books/wuzilai/specs/06-cup.js)。

#### p12 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"head-nudge","at":[550,440],"scale":0.5,"spiral":true,"wear":"vest"}`；道具 `[{"id":"wall-anchor","kind":"wall-foot","at":[890,530],"scale":0.2,"layer":"behind","style":"--scene-line-opacity:.22;--scene-ink:var(--ink)"},{"id":"basket-1","kind":"basket","at":[0,390],"scale":0.55,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[660,660],"scale":0.16},{"id":"fish-1","kind":"fish","at":[450,625],"scale":0.18},{"id":"star-1","kind":"star","at":[550,690],"scale":0.14}]`；共享场景 `{"kind":"play-mat","side":"left"}`；取景 `{"at":[-32.56,-230.8],"scale":1.02}`。
- **旁白**：它贴着墙，把苹果顶回来。
- **提示**：指指三样东西。
- **纸书提示**：指指三样东西。
- **原朗读稿（核对用）**：它贴着墙，把苹果顶回来。
指指三样东西。
- **共读分类**：`"observe"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p13 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"step","at":[450,250],"scale":0.6,"spiral":true,"wear":"vest"}`；道具 `[{"id":"wall-anchor","kind":"wall-foot","at":[890,530],"scale":0.2,"layer":"behind","style":"--scene-line-opacity:.22;--scene-ink:var(--ink)"},{"id":"basket-1","kind":"basket","at":[0,390],"scale":0.55,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[650,650],"scale":0.16},{"id":"fish-1","kind":"fish","at":[780,650],"scale":0.18},{"id":"star-1","kind":"star","at":[605,670],"scale":0.14}]`；共享场景 `{"kind":"play-mat","side":"right"}`；取景 `{"at":[-32.56,-230.8],"scale":1.02}`。
- **旁白**：绕了半圈，三样聚在一起。
- **原朗读稿（核对用）**：绕了半圈，三样聚在一起。
- **共读分类**：`"autonomous"`；紧邻承接 p12。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S06 · p14｜p15

来源：[07-mess.js](../../../src/content/books/wuzilai/specs/07-mess.js)。

#### p14 · 左页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-cream","colors":["--wash-yellow","--wash-cream"],"gap":"--paper","cover":"all"}`；角色 `{"pose":"look-down","at":[450,250],"scale":0.6,"spiral":true,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket","at":[0,390],"scale":0.55,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[650,650],"scale":0.16},{"id":"fish-1","kind":"fish","at":[780,650],"scale":0.18},{"id":"star-1","kind":"star","at":[605,670],"scale":0.14}]`；共享场景 `{"kind":"play-mat","side":"left"}`；取景 `{"at":[48.12,159.56],"scale":0.84}`。
- **旁白**：篮子离得远了一点。
- **原朗读稿（核对用）**：篮子离得远了一点。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p15 · 右页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-cream","colors":["--wash-yellow","--wash-cream"],"gap":"--paper","cover":"all"}`；角色 `{"pose":"head-nudge","at":[300,350],"scale":0.55,"spiral":true,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket","at":[120,390],"scale":0.55,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[650,650],"scale":0.16},{"id":"fish-1","kind":"fish","at":[780,650],"scale":0.18},{"id":"star-1","kind":"star","at":[605,670],"scale":0.14}]`；共享场景 `{"kind":"play-mat","side":"right"}`；取景 `{"at":[48.12,159.56],"scale":0.84}`。
- **旁白**：它低下圆脑袋，<br>一点点顶过来。
- **原朗读稿（核对用）**：它低下圆脑袋，一点点顶过来。
- **共读分类**：`"autonomous"`；紧邻承接 p14。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S07 · p16｜p17

来源：[08-sit.js](../../../src/content/books/wuzilai/specs/08-sit.js)。

#### p16 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"listen-low","at":[480,300],"scale":0.55,"spiral":true,"wear":"vest-creased"}`；道具 `[{"id":"basket-1","kind":"basket","at":[120,390],"scale":0.55,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[650,650],"scale":0.16},{"id":"fish-1","kind":"fish","at":[780,650],"scale":0.18},{"id":"star-1","kind":"star","at":[605,670],"scale":0.14}]`；共享场景 `{"kind":"play-mat","side":"left"}`；取景 `{"at":[-188.95,-131.29],"scale":1.05}`。
- **旁白**：它坐下喘气，小背心皱了。
- **提示**：陪它坐一会儿。
- **纸书提示**：陪它坐一会儿。
- **原朗读稿（核对用）**：它坐下喘气，小背心皱了。
陪它坐一会儿。
- **共读分类**：`"simulate"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p17 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"listen-low","at":[480,300],"scale":0.55,"spiral":true,"wear":"vest-creased"}`；道具 `[{"id":"basket-1","kind":"basket","at":[120,390],"scale":0.55,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[650,650],"scale":0.16},{"id":"fish-1","kind":"fish","at":[780,650],"scale":0.18},{"id":"star-1","kind":"star","at":[605,670],"scale":0.14}]`；共享场景 `{"kind":"play-mat","side":"right"}`；取景 `{"at":[-188.95,-131.29],"scale":1.05}`。
- **旁白**：你等着，没有替它收。
- **原朗读稿（核对用）**：你等着，没有替它收。
- **共读分类**：`"autonomous"`；紧邻承接 p16。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S08 · p18｜p19

来源：[09-wait.js](../../../src/content/books/wuzilai/specs/09-wait.js)。

#### p18 · 左页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-cream","colors":["--wash-yellow","--wash-cream"],"gap":"--paper","cover":"all"}`；角色 `{"pose":"braced","at":[450,250],"scale":0.6,"spiral":true,"wear":"vest-creased"}`；道具 `[{"id":"basket-1","kind":"basket","at":[120,390],"scale":0.55,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[650,650],"scale":0.16},{"id":"fish-1","kind":"fish","at":[780,650],"scale":0.18},{"id":"star-1","kind":"star","at":[605,670],"scale":0.14}]`；共享场景 `{"kind":"play-mat","side":"left"}`；取景 `{"at":[-169.91,-74.31],"scale":1.02}`。
- **旁白**：它用身子挡住三样。
- **原朗读稿（核对用）**：它用身子挡住三样。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p19 · 右页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-cream","colors":["--wash-yellow","--wash-cream"],"gap":"--paper","cover":"all"}`；角色 `{"pose":"press-ball","at":[400,350],"scale":0.65,"spiral":true,"wear":"vest-creased"}`；道具 `[{"id":"basket-1","kind":"basket","at":[120,390],"scale":0.55,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[570,650],"scale":0.16},{"id":"fish-1","kind":"fish","at":[700,650],"scale":0.18},{"id":"star-1","kind":"star","at":[525,670],"scale":0.14}]`；共享场景 `{"kind":"play-mat","side":"right"}`；取景 `{"at":[-169.91,-74.31],"scale":1.02}`。
- **旁白**：肚子挤扁一点，<br>三样一起往前滑。
- **原朗读稿（核对用）**：肚子挤扁一点，三样一起往前滑。
- **共读分类**：`"autonomous"`；紧邻承接 p18。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S09 · p20｜p21

来源：[10-mess2.js](../../../src/content/books/wuzilai/specs/10-mess2.js)。

#### p20 · 左页

- **画面记录**：背景 `{"kind":"bands","wash":"--wash-cream","colors":["--wash-yellow","--wash-cream"],"gap":"--paper","cover":"all"}`；角色 `{"pose":"head-nudge","at":[360,300],"scale":0.65,"spiral":true,"wear":"vest-creased"}`；道具 `[{"id":"basket-1","kind":"basket","at":[120,390],"scale":0.55,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[570,650],"scale":0.16},{"id":"fish-1","kind":"fish","at":[700,650],"scale":0.18},{"id":"star-1","kind":"star","at":[525,670],"scale":0.14}]`；共享场景 `{"kind":"play-mat","side":"left"}`；取景 `{"at":[57.87,-193.67],"scale":0.95}`。
- **旁白**：它急着往前推，撞上篮边。
- **原朗读稿（核对用）**：它急着往前推，撞上篮边。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p21 · 右页

- **画面记录**：背景 `{"kind":"bands","wash":"--wash-cream","colors":["--wash-yellow","--wash-cream"],"gap":"--paper","cover":"all"}`；角色 `{"pose":"startled-seat","at":[480,300],"scale":0.55,"spiral":true,"wear":"vest-creased"}`；道具 `[{"id":"basket-1","kind":"basket-fallen","at":[40,360],"scale":0.55,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[800,650],"scale":0.16},{"id":"fish-1","kind":"fish","at":[730,770],"scale":0.18},{"id":"star-1","kind":"star","at":[540,750],"scale":0.14}]`；共享场景 `{"kind":"play-mat","side":"right"}`；取景 `{"at":[57.87,-193.67],"scale":0.95}`。
- **旁白**：哗啦！篮子翻了，三样散开！
- **原朗读稿（核对用）**：哗啦！篮子翻了，三样散开！
- **共读分类**：`"autonomous"`；紧邻承接 p20。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S10 · p22｜p23

来源：[11-noscold.js](../../../src/content/books/wuzilai/specs/11-noscold.js)。

#### p22 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"sad-seat","at":[480,300],"scale":0.55,"spiral":true,"wear":"vest-creased"}`；道具 `[{"id":"basket-1","kind":"basket-fallen","at":[40,360],"scale":0.55,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[800,650],"scale":0.16},{"id":"fish-1","kind":"fish","at":[730,770],"scale":0.18},{"id":"star-1","kind":"star","at":[540,750],"scale":0.14}]`；共享场景 `{"kind":"play-mat","side":"left"}`；取景 `{"at":[-76.57,-121.39],"scale":1.04}`。
- **旁白**：你没有怪它。
- **提示**：一起蹲低些。
- **纸书提示**：一起蹲低些。
- **原朗读稿（核对用）**：你没有怪它。
一起蹲低些。
- **共读分类**：`"simulate"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p23 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"listen-low","at":[480,300],"scale":0.55,"spiral":true,"wear":"vest-creased"}`；道具 `[{"id":"basket-1","kind":"basket-fallen","at":[40,360],"scale":0.55,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[800,650],"scale":0.16},{"id":"fish-1","kind":"fish","at":[730,770],"scale":0.18},{"id":"star-1","kind":"star","at":[540,750],"scale":0.14}]`；共享场景 `{"kind":"play-mat","side":"right"}`；取景 `{"at":[-76.57,-121.39],"scale":1.04}`。
- **旁白**：你蹲下来，和它一样低。
- **原朗读稿（核对用）**：你蹲下来，和它一样低。
- **共读分类**：`"autonomous"`；紧邻承接 p22。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S11 · p24｜p25

来源：[12-cry.js](../../../src/content/books/wuzilai/specs/12-cry.js)。

#### p24 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"cry-seat","at":[480,300],"scale":0.55,"spiral":true,"wear":"vest-damp"}`；道具 `[{"id":"basket-1","kind":"basket-fallen","at":[40,360],"scale":0.55,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[800,650],"scale":0.16},{"id":"fish-1","kind":"fish","at":[730,770],"scale":0.18},{"id":"star-1","kind":"star","at":[540,750],"scale":0.14}]`；共享场景 `{"kind":"play-mat","side":"left"}`；取景 `{"at":[82.44,148.61],"scale":0.79}`。
- **旁白**：呜呜。眼泪滴在小背心上。
- **提示**：轻轻抱一抱。
- **纸书提示**：轻轻抱一抱。
- **原朗读稿（核对用）**：呜呜。眼泪滴在小背心上。
轻轻抱一抱。
- **共读分类**：`"simulate"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p25 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"held-rest","at":[480,220],"scale":0.55,"spiral":true,"wear":"vest-damp"}`；道具 `[{"id":"child-arm","kind":"child-cradle","at":[380,580],"scale":0.75,"layer":"behind"},{"id":"basket-1","kind":"basket-fallen","at":[40,360],"scale":0.55,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[800,650],"scale":0.16},{"id":"fish-1","kind":"fish","at":[730,770],"scale":0.18},{"id":"star-1","kind":"star","at":[540,750],"scale":0.14}]`；共享场景 `{"kind":"play-mat","side":"right"}`；取景 `{"at":[82.44,148.61],"scale":0.79}`。
- **旁白**：它靠进你怀里，<br>小脚慢慢垂下。
- **原朗读稿（核对用）**：它靠进你怀里，小脚慢慢垂下。
- **共读分类**：`"autonomous"`；紧邻承接 p24。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S12 · p26｜p27

来源：[13-pick.js](../../../src/content/books/wuzilai/specs/13-pick.js)。

#### p26 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"head-nudge","at":[450,350],"scale":0.55,"spiral":true,"wear":"vest-damp"}`；道具 `[{"id":"basket-1","kind":"basket-fallen","at":[40,360],"scale":0.55,"layer":"behind","rotate":-25},{"id":"apple-1","kind":"apple","at":[800,650],"scale":0.16},{"id":"fish-1","kind":"fish","at":[730,770],"scale":0.18},{"id":"star-1","kind":"star","at":[540,750],"scale":0.14}]`；共享场景 `{"kind":"play-mat","side":"left"}`；取景 `{"at":[195.96,9.93],"scale":0.72}`。
- **旁白**：它用头顶了顶翻倒的篮子。
- **原朗读稿（核对用）**：它用头顶了顶翻倒的篮子。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p27 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"neutral-front","at":[450,250],"scale":0.6,"spiral":true,"wear":"vest-damp"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[800,650],"scale":0.16},{"id":"fish-1","kind":"fish","at":[730,770],"scale":0.18},{"id":"star-1","kind":"star","at":[540,750],"scale":0.14}]`；共享场景 `{"kind":"play-mat","side":"right"}`；取景 `{"at":[195.96,9.93],"scale":0.72}`。
- **旁白**：篮子侧躺着，篮口朝着它。
- **原朗读稿（核对用）**：篮子侧躺着，篮口朝着它。
- **共读分类**：`"autonomous"`；紧邻承接 p26。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S13 · p28｜p29

来源：[14-basket.js](../../../src/content/books/wuzilai/specs/14-basket.js)。

#### p28 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"head-nudge","at":[465,350],"scale":0.55,"spiral":true,"wear":"vest-damp"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[425,590],"scale":0.16},{"id":"fish-1","kind":"fish","at":[730,770],"scale":0.18},{"id":"star-1","kind":"star","at":[540,750],"scale":0.14}]`；共享场景 `{"kind":"play-mat","side":"left"}`；取景 `{"at":[-30.08,-128.29],"scale":1.06}`。
- **旁白**：它只把苹果推到篮边。
- **提示**：指一指篮口。
- **纸书提示**：指一指篮口。
- **原朗读稿（核对用）**：它只把苹果推到篮边。
指一指篮口。
- **共读分类**：`"observe"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p29 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"head-nudge","at":[465,350],"scale":0.55,"spiral":true,"wear":"vest-damp"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[425,590],"scale":0.16},{"id":"fish-1","kind":"fish","at":[730,770],"scale":0.18},{"id":"star-1","kind":"star","at":[540,750],"scale":0.14}]`；共享场景 `{"kind":"play-mat","side":"right"}`；取景 `{"at":[-30.08,-128.29],"scale":1.06}`。
- **旁白**：它歪着头，让苹果对准篮口。
- **原朗读稿（核对用）**：它歪着头，让苹果对准篮口。
- **共读分类**：`"autonomous"`；紧邻承接 p28。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S14 · p30｜p31

来源：[15-again.js](../../../src/content/books/wuzilai/specs/15-again.js)。

#### p30 · 左页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-cream","colors":["--wash-yellow","--wash-cream"],"gap":"--paper","cover":"all"}`；角色 `{"pose":"push","at":[455,330],"scale":0.55,"spiral":true,"wear":"vest-damp"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[390,590],"scale":0.16},{"id":"fish-1","kind":"fish","at":[730,770],"scale":0.18},{"id":"star-1","kind":"star","at":[540,750],"scale":0.14}]`；共享场景 `{"kind":"play-mat","side":"left"}`；取景 `{"at":[-30.08,-150.03],"scale":1.06}`。
- **旁白**：它又往前推了一点。
- **原朗读稿（核对用）**：它又往前推了一点。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p31 · 右页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-cream","colors":["--wash-yellow","--wash-cream"],"gap":"--paper","cover":"all"}`；角色 `{"pose":"startled-seat","at":[420,260],"scale":0.55,"spiral":true,"wear":"vest-damp"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[75,600],"scale":0.16,"class":"in-basket"},{"id":"fish-1","kind":"fish","at":[730,770],"scale":0.18},{"id":"star-1","kind":"star","at":[540,750],"scale":0.14}]`；共享场景 `{"kind":"play-mat","side":"right"}`；取景 `{"at":[-30.08,-150.03],"scale":1.06}`。
- **旁白**：咚！苹果滚进去，它愣住了。
- **原朗读稿（核对用）**：咚！苹果滚进去，它愣住了。
- **共读分类**：`"autonomous"`；紧邻承接 p30。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S15 · p32｜p33

来源：[16-works.js](../../../src/content/books/wuzilai/specs/16-works.js)。

#### p32 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"curious-tilt","at":[370,310],"scale":0.55,"spiral":true,"wear":"vest-damp"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[75,600],"scale":0.16,"class":"in-basket"},{"id":"fish-1","kind":"fish","at":[730,770],"scale":0.18},{"id":"star-1","kind":"star","at":[540,750],"scale":0.14}]`；共享场景 `{"kind":"play-mat","side":"left"}`；取景 `{"at":[122.22,-166.87],"scale":0.92}`。
- **旁白**：它凑到篮口，瞧了又瞧。
- **原朗读稿（核对用）**：它凑到篮口，瞧了又瞧。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p33 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"proud-belly","at":[450,250],"scale":0.6,"spiral":true,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[75,600],"scale":0.16,"class":"in-basket"},{"id":"fish-1","kind":"fish","at":[730,770],"scale":0.18},{"id":"star-1","kind":"star","at":[540,750],"scale":0.14}]`；共享场景 `{"kind":"play-mat","side":"right"}`；取景 `{"at":[122.22,-166.87],"scale":0.92}`。
- **旁白**：真的在里面！它挺起圆肚子。
- **原朗读稿（核对用）**：真的在里面！它挺起圆肚子。
- **共读分类**：`"autonomous"`；紧邻承接 p32。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S16 · p34｜p35

来源：[17-turn.js](../../../src/content/books/wuzilai/specs/17-turn.js)。

#### p34 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"curious-tilt","at":[450,250],"scale":0.6,"spiral":true,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[75,600],"scale":0.16,"class":"in-basket"},{"id":"fish-1","kind":"fish","at":[730,770],"scale":0.18},{"id":"star-1","kind":"star","at":[540,750],"scale":0.14}]`；共享场景 `{"kind":"play-mat","side":"left"}`；取景 `{"at":[-25.79,-54.24],"scale":0.99}`。
- **旁白**：你说：剩下的，我来。
- **提示**：指指地上的两样。
- **纸书提示**：指指地上的两样。
- **原朗读稿（核对用）**：你说：剩下的，我来。
指指地上的两样。
- **共读分类**：`"observe"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p35 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"withdraw-step","at":[570,260],"scale":0.5,"spiral":true,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[75,600],"scale":0.16,"class":"in-basket"},{"id":"fish-1","kind":"fish","at":[730,770],"scale":0.18},{"id":"star-1","kind":"star","at":[540,750],"scale":0.14}]`；共享场景 `{"kind":"play-mat","side":"right"}`；取景 `{"at":[-25.79,-54.24],"scale":0.99}`。
- **旁白**：它倒退一大步，<br>把篮口让给你。
- **原朗读稿（核对用）**：它倒退一大步，把篮口让给你。
- **共读分类**：`"autonomous"`；紧邻承接 p34。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S17 · p36｜p37

来源：[18-kneel.js](../../../src/content/books/wuzilai/specs/18-kneel.js)。

#### p36 · 左页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-cream","colors":["--wash-yellow","--wash-cream"],"gap":"--paper","cover":"all"}`；角色 `{"pose":"watch-seat","at":[570,260],"scale":0.5,"spiral":true,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[75,600],"scale":0.16,"class":"in-basket"},{"id":"fish-1","kind":"fish","at":[440,560],"scale":0.18,"style":"--go-x:-255;--go-y:90","class":"prop-fish"},{"id":"star-1","kind":"star","at":[540,750],"scale":0.14},{"id":"child-hand","kind":"palm","at":[440,590],"scale":0.25,"layer":"behind"}]`；共享场景 `{"kind":"play-mat","side":"left"}`；取景 `{"at":[-25.17,-148.38],"scale":0.98}`。
- **旁白**：你拿起小鱼。
- **提示**：把小鱼送进篮子。
- **纸书提示**：把小鱼送进篮子。
- **原朗读稿（核对用）**：你拿起小鱼。
把小鱼送进篮子。
- **共读分类**：`"simulate"`。
- **屏幕动作**：把小鱼送进篮子。；动作 `"tidy"`；对象 `"fish-1"`；热区 `[440,560]`，大小 250。
- **紧邻后页核对**：p37 旁白：放好了，篮里有两样。

#### p37 · 右页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-cream","colors":["--wash-yellow","--wash-cream"],"gap":"--paper","cover":"all"}`；角色 `{"pose":"watch-seat","at":[570,260],"scale":0.5,"spiral":true,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[75,600],"scale":0.16,"class":"in-basket"},{"id":"fish-1","kind":"fish","at":[185,650],"scale":0.18,"class":"in-basket"},{"id":"star-1","kind":"star","at":[540,750],"scale":0.14}]`；共享场景 `{"kind":"play-mat","side":"right"}`；取景 `{"at":[-25.17,-148.38],"scale":0.98}`。
- **旁白**：放好了，篮里有两样。
- **原朗读稿（核对用）**：放好了，篮里有两样。
- **共读分类**：`"autonomous"`；紧邻承接 p36。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S18 · p38｜p39

来源：[19-watch.js](../../../src/content/books/wuzilai/specs/19-watch.js)。

#### p38 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"curious-tilt","at":[570,260],"scale":0.5,"spiral":true,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[75,600],"scale":0.16,"class":"in-basket"},{"id":"fish-1","kind":"fish","at":[185,650],"scale":0.18,"class":"in-basket"},{"id":"star-1","kind":"star","at":[450,620],"scale":0.14},{"id":"child-hand","kind":"child-reach-left","at":[520,680],"scale":0.55}]`；共享场景 `{"kind":"play-mat","side":"left"}`；取景 `{"at":[33.33,-174.56],"scale":0.97}`。
- **旁白**：你推了推星星。
- **原朗读稿（核对用）**：你推了推星星。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p39 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"hesitant","at":[570,260],"scale":0.5,"spiral":true,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[75,600],"scale":0.16,"class":"in-basket"},{"id":"fish-1","kind":"fish","at":[185,650],"scale":0.18,"class":"in-basket"},{"id":"star-1","kind":"star","at":[500,680],"scale":0.14},{"id":"child-hand","kind":"child-reach-left","at":[650,730],"scale":0.4},{"id":"child-foot","kind":"child-foot","at":[630,800],"scale":0.3}]`；共享场景 `{"kind":"play-mat","side":"right"}`；取景 `{"at":[33.33,-174.56],"scale":0.97}`。
- **旁白**：星星滑过你的手，<br>停在你脚边。
- **原朗读稿（核对用）**：星星滑过你的手，停在你脚边。
- **共读分类**：`"autonomous"`；紧邻承接 p38。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S19 · p40｜p41

来源：[20-wait.js](../../../src/content/books/wuzilai/specs/20-wait.js)。

#### p40 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"poised-left","at":[570,350],"scale":0.5,"spiral":true,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[75,600],"scale":0.16,"class":"in-basket"},{"id":"fish-1","kind":"fish","at":[185,650],"scale":0.18,"class":"in-basket"},{"id":"star-1","kind":"star","at":[500,680],"scale":0.14},{"id":"child-foot","kind":"child-foot","at":[630,800],"scale":0.3}]`；共享场景 `{"kind":"play-mat","side":"left"}`；取景 `{"at":[-26.4,-95.1],"scale":1}`。
- **旁白**：它急急挪近，<br>肚子快碰到星星。
- **原朗读稿（核对用）**：它急急挪近，肚子快碰到星星。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p41 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"poised-left","at":[570,350],"scale":0.5,"spiral":true,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[75,600],"scale":0.16,"class":"in-basket"},{"id":"fish-1","kind":"fish","at":[185,650],"scale":0.18,"class":"in-basket"},{"id":"star-1","kind":"star","at":[500,680],"scale":0.14},{"id":"child-foot","kind":"child-foot","at":[630,800],"scale":0.3}]`；共享场景 `{"kind":"play-mat","side":"right"}`；取景 `{"at":[-26.4,-95.1],"scale":1}`。
- **旁白**：它看看你，一只脚还抬着。
- **原朗读稿（核对用）**：它看看你，一只脚还抬着。
- **共读分类**：`"autonomous"`；紧邻承接 p40。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S20 · p42｜p43

来源：[21-setup.js](../../../src/content/books/wuzilai/specs/21-setup.js)。

#### p42 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"poised-left","at":[570,350],"scale":0.5,"spiral":true,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[75,600],"scale":0.16,"class":"in-basket"},{"id":"fish-1","kind":"fish","at":[185,650],"scale":0.18,"class":"in-basket"},{"id":"star-1","kind":"star","at":[500,680],"scale":0.14},{"id":"child-foot","kind":"child-foot","at":[630,800],"scale":0.3}]`；共享场景 `{"kind":"play-mat","side":"left"}`；取景 `{"at":[-23.94,-64.45],"scale":0.96}`。
- **旁白**：你说：等一等，我自己来。
- **原朗读稿（核对用）**：你说：等一等，我自己来。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p43 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"withdraw-step","at":[600,330],"scale":0.5,"spiral":true,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[75,600],"scale":0.16,"class":"in-basket"},{"id":"fish-1","kind":"fish","at":[185,650],"scale":0.18,"class":"in-basket"},{"id":"star-1","kind":"star","at":[500,680],"scale":0.14},{"id":"child-foot","kind":"child-foot","at":[630,800],"scale":0.3}]`；共享场景 `{"kind":"play-mat","side":"right"}`；取景 `{"at":[-23.94,-64.45],"scale":0.96}`。
- **旁白**：它收住小脚，退开一大步。
- **原朗读稿（核对用）**：它收住小脚，退开一大步。
- **共读分类**：`"autonomous"`；紧邻承接 p42。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S21 · p44｜p45

来源：[22-tidy.js](../../../src/content/books/wuzilai/specs/22-tidy.js)。

#### p44 · 左页

- **画面记录**：背景 `{"kind":"bands","wash":"--wash-cream","colors":["--wash-yellow","--wash-cream"],"gap":"--paper","cover":"all"}`；角色 `{"pose":"watch-seat","at":[570,260],"scale":0.5,"spiral":true,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[75,600],"scale":0.16,"class":"in-basket"},{"id":"fish-1","kind":"fish","at":[185,650],"scale":0.18,"class":"in-basket"},{"id":"star-1","kind":"star","at":[450,590],"scale":0.14,"style":"--go-x:-150;--go-y:0","class":"prop-star"},{"id":"child-hand","kind":"palm","at":[440,600],"scale":0.25,"layer":"behind"}]`；共享场景 `{"kind":"play-mat","side":"left"}`；取景 `{"at":[156.36,-129.85],"scale":0.79}`。
- **旁白**：你把星星托到篮口。
- **提示**：轻轻送进去。
- **纸书提示**：轻轻送进去。
- **原朗读稿（核对用）**：你把星星托到篮口。
轻轻送进去。
- **共读分类**：`"simulate"`。
- **屏幕动作**：轻轻送进去。；动作 `"tidy"`；对象 `"star-1"`；热区 `[450,590]`，大小 250。
- **紧邻后页核对**：p45 旁白：星星进去了！<br>第三样也收好啦。

#### p45 · 右页

- **画面记录**：背景 `{"kind":"bands","wash":"--wash-cream","colors":["--wash-yellow","--wash-cream"],"gap":"--paper","cover":"all"}`；角色 `{"pose":"ready","at":[570,260],"scale":0.5,"spiral":true,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[75,600],"scale":0.16,"class":"in-basket"},{"id":"fish-1","kind":"fish","at":[185,650],"scale":0.18,"class":"in-basket"},{"id":"star-1","kind":"star","at":[300,590],"scale":0.14,"class":"in-basket"}]`；共享场景 `{"kind":"play-mat","side":"right"}`；取景 `{"at":[156.36,-129.85],"scale":0.79}`。
- **旁白**：星星进去了！<br>第三样也收好啦。
- **原朗读稿（核对用）**：星星进去了！第三样也收好啦。
- **共读分类**：`"autonomous"`；紧邻承接 p44。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S22 · p46｜p47

来源：[23-done.js](../../../src/content/books/wuzilai/specs/23-done.js)。

#### p46 · 左页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-cream","colors":["--wash-yellow","--wash-cream"],"gap":"--paper","cover":"all"}`；角色 `{"pose":"proud-belly","at":[570,260],"scale":0.5,"spiral":true,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[75,600],"scale":0.16,"class":"in-basket"},{"id":"fish-1","kind":"fish","at":[185,650],"scale":0.18,"class":"in-basket"},{"id":"star-1","kind":"star","at":[300,590],"scale":0.14,"class":"in-basket"}]`；共享场景 `{"kind":"play-mat","side":"left"}`；取景 `{"at":[-22.1,14.51],"scale":0.93}`。
- **旁白**：你说：小鱼、星星，我收的！
- **原朗读稿（核对用）**：你说：小鱼、星星，我收的！
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p47 · 右页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-cream","colors":["--wash-yellow","--wash-cream"],"gap":"--paper","cover":"all"}`；角色 `{"pose":"beaming-lean","at":[570,260],"scale":0.5,"spiral":true,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[75,600],"scale":0.16,"class":"in-basket"},{"id":"fish-1","kind":"fish","at":[185,650],"scale":0.18,"class":"in-basket"},{"id":"star-1","kind":"star","at":[300,590],"scale":0.14,"class":"in-basket"}]`；共享场景 `{"kind":"play-mat","side":"right"}`；取景 `{"at":[-22.1,14.51],"scale":0.93}`。
- **旁白**：它笑了：苹果是我收的！
- **原朗读稿（核对用）**：它笑了：苹果是我收的！
- **共读分类**：`"autonomous"`；紧邻承接 p46。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S23 · p48｜p49

来源：[24-dark.js](../../../src/content/books/wuzilai/specs/24-dark.js)。

#### p48 · 左页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-cream","colors":["--wash-yellow","--wash-cream"],"gap":"--paper","cover":"all"}`；角色 `{"pose":"ready","at":[570,260],"scale":0.5,"spiral":true,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[75,600],"scale":0.16,"class":"in-basket"},{"id":"fish-1","kind":"fish","at":[185,650],"scale":0.18,"class":"in-basket"},{"id":"star-1","kind":"star","at":[300,590],"scale":0.14,"class":"in-basket"}]`；共享场景 `{"kind":"play-mat","side":"left"}`；取景 `{"at":[-25.17,-26.03],"scale":0.98}`。
- **旁白**：你拍拍地垫空出来的地方。
- **原朗读稿（核对用）**：你拍拍地垫空出来的地方。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p49 · 右页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-cream","colors":["--wash-yellow","--wash-cream"],"gap":"--paper","cover":"all"}`；角色 `{"pose":"curled","at":[530,300],"scale":0.52,"spiral":true,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[75,600],"scale":0.16,"class":"in-basket"},{"id":"fish-1","kind":"fish","at":[185,650],"scale":0.18,"class":"in-basket"},{"id":"star-1","kind":"star","at":[300,590],"scale":0.14,"class":"in-basket"}]`；共享场景 `{"kind":"play-mat","side":"right"}`；取景 `{"at":[-25.17,-26.03],"scale":0.98}`。
- **旁白**：它挪来，和你挨在一块儿。
- **原朗读稿（核对用）**：它挪来，和你挨在一块儿。
- **共读分类**：`"autonomous"`；紧邻承接 p48。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S24 · p50｜p51

来源：[25-lie.js](../../../src/content/books/wuzilai/specs/25-lie.js)。

#### p50 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"curled","at":[530,300],"scale":0.52,"spiral":true,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[75,600],"scale":0.16,"class":"in-basket"},{"id":"fish-1","kind":"fish","at":[185,650],"scale":0.18,"class":"in-basket"},{"id":"star-1","kind":"star","at":[300,590],"scale":0.14,"class":"in-basket"}]`；共享场景 `{"kind":"play-mat","side":"left"}`；取景 `{"at":[52.74,60.65],"scale":0.9}`。
- **旁白**：篮子还侧躺在原处。
- **原朗读稿（核对用）**：篮子还侧躺在原处。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p51 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream"}`；角色 `{"pose":"curled","at":[530,300],"scale":0.52,"spiral":true,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[75,600],"scale":0.16,"class":"in-basket"},{"id":"fish-1","kind":"fish","at":[185,650],"scale":0.18,"class":"in-basket"},{"id":"star-1","kind":"star","at":[300,590],"scale":0.14,"class":"in-basket"}]`；共享场景 `{"kind":"play-mat","side":"right"}`；取景 `{"at":[52.74,60.65],"scale":0.9}`。
- **旁白**：三样都在里面，歇会儿吧。
- **原朗读稿（核对用）**：三样都在里面，歇会儿吧。
- **共读分类**：`"autonomous"`；紧邻承接 p50。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S25 · p52｜p53

来源：[26-night.js](../../../src/content/books/wuzilai/specs/26-night.js)。

#### p52 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--night"}`；角色 `{"pose":"curled-yawn","at":[530,300],"scale":0.52,"spiral":true,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind","style":"opacity:.65"},{"id":"apple-1","kind":"apple","at":[75,600],"scale":0.16,"class":"in-basket","style":";opacity:.65"},{"id":"fish-1","kind":"fish","at":[185,650],"scale":0.18,"class":"in-basket","style":";opacity:.65"},{"id":"star-1","kind":"star","at":[300,590],"scale":0.14,"class":"in-basket","style":";opacity:.65"}]`；共享场景 `{"kind":"window-nook","light":"night","side":"left"}`；取景 `{"at":[111.35,-199.36],"scale":0.9}`。
- **旁白**：天黑了，它打个大哈欠。
- **原朗读稿（核对用）**：天黑了，它打个大哈欠。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p53 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--night"}`；角色 `{"pose":"curled","at":[530,300],"scale":0.52,"spiral":true,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind","style":"opacity:.65"},{"id":"apple-1","kind":"apple","at":[75,600],"scale":0.16,"class":"in-basket","style":";opacity:.65"},{"id":"fish-1","kind":"fish","at":[185,650],"scale":0.18,"class":"in-basket","style":";opacity:.65"},{"id":"star-1","kind":"star","at":[300,590],"scale":0.14,"class":"in-basket","style":";opacity:.65"}]`；共享场景 `{"kind":"window-nook","light":"night","side":"right"}`；取景 `{"at":[111.35,-199.36],"scale":0.9}`。
- **旁白**：你也靠下来，伸直两条腿。
- **原朗读稿（核对用）**：你也靠下来，伸直两条腿。
- **共读分类**：`"autonomous"`；紧邻承接 p52。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S26 · p54｜p55

来源：[27-sleep.js](../../../src/content/books/wuzilai/specs/27-sleep.js)。

#### p54 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--night"}`；角色 `{"pose":"curled","at":[530,300],"scale":0.52,"spiral":true,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind","style":"opacity:.65"},{"id":"apple-1","kind":"apple","at":[75,600],"scale":0.16,"class":"in-basket","style":";opacity:.65"},{"id":"fish-1","kind":"fish","at":[185,650],"scale":0.18,"class":"in-basket","style":";opacity:.65"},{"id":"star-1","kind":"star","at":[300,590],"scale":0.14,"class":"in-basket","style":";opacity:.65"}]`；共享场景 `{"kind":"room","light":"night","side":"left"}`；取景 `{"at":[77.59,94.5],"scale":0.85}`。
- **旁白**：你看看篮子。
- **原朗读稿（核对用）**：你看看篮子。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p55 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--night"}`；角色 `{"pose":"curled","at":[530,300],"scale":0.52,"spiral":true,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind","style":"opacity:.65"},{"id":"apple-1","kind":"apple","at":[75,600],"scale":0.16,"class":"in-basket","style":";opacity:.65"},{"id":"fish-1","kind":"fish","at":[185,650],"scale":0.18,"class":"in-basket","style":";opacity:.65"},{"id":"star-1","kind":"star","at":[300,590],"scale":0.14,"class":"in-basket","style":";opacity:.65"}]`；共享场景 `{"kind":"room","light":"night","side":"right"}`；取景 `{"at":[77.59,94.5],"scale":0.85}`。
- **旁白**：苹果、小鱼、星星，都在呢。
- **原朗读稿（核对用）**：苹果、小鱼、星星，都在呢。
- **共读分类**：`"autonomous"`；紧邻承接 p54。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S27 · p56｜p57

来源：[28-dream.js](../../../src/content/books/wuzilai/specs/28-dream.js)。

#### p56 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--night-deep"}`；角色 `{"pose":"covered-rest","at":[530,300],"scale":0.52,"spiral":false,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind","style":"opacity:.4"},{"id":"apple-1","kind":"apple","at":[75,600],"scale":0.16,"class":"in-basket","style":";opacity:.4"},{"id":"fish-1","kind":"fish","at":[185,650],"scale":0.18,"class":"in-basket","style":";opacity:.4"},{"id":"star-1","kind":"star","at":[300,590],"scale":0.14,"class":"in-basket","style":";opacity:.4"}]`；共享场景 `{"kind":"room","light":"late-night","side":"left"}`；取景 `{"at":[127.29,162.2],"scale":0.75}`。
- **旁白**：晚安，噜啵。
- **提示**：轻轻翻过去。
- **纸书提示**：轻轻翻过去。
- **原朗读稿（核对用）**：晚安，噜啵。
轻轻翻过去。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p57 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--night-deep"}`；角色 `{"pose":"covered-rest","at":[530,300],"scale":0.52,"spiral":false,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind","style":"opacity:.4"},{"id":"apple-1","kind":"apple","at":[75,600],"scale":0.16,"class":"in-basket","style":";opacity:.4"},{"id":"fish-1","kind":"fish","at":[185,650],"scale":0.18,"class":"in-basket","style":";opacity:.4"},{"id":"star-1","kind":"star","at":[300,590],"scale":0.14,"class":"in-basket","style":";opacity:.4"}]`；共享场景 `{"kind":"room","light":"late-night","side":"right"}`；取景 `{"at":[127.29,162.2],"scale":0.75}`。
- **旁白**：呼噜……
- **原朗读稿（核对用）**：呼噜……
- **共读分类**：`"autonomous"`；紧邻承接 p56。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S28 · p58｜p59

来源：[29-tomorrow.js](../../../src/content/books/wuzilai/specs/29-tomorrow.js)。

#### p58 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--night-deep"}`；角色 `{"pose":"covered-rest","at":[530,300],"scale":0.52,"spiral":false,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind","style":"opacity:.4"},{"id":"apple-1","kind":"apple","at":[75,600],"scale":0.16,"class":"in-basket","style":";opacity:.4"},{"id":"fish-1","kind":"fish","at":[185,650],"scale":0.18,"class":"in-basket","style":";opacity:.4"},{"id":"star-1","kind":"star","at":[300,590],"scale":0.14,"class":"in-basket","style":";opacity:.4"}]`；共享场景 `{"kind":"room","light":"late-night","side":"left"}`；取景 `{"at":[127.29,162.2],"scale":0.75}`。
- **旁白**：篮子静静放着。
- **原朗读稿（核对用）**：篮子静静放着。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p59 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--night-deep"}`；角色 `{"pose":"covered-rest","at":[530,300],"scale":0.52,"spiral":false,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind","style":"opacity:.4"},{"id":"apple-1","kind":"apple","at":[75,600],"scale":0.16,"class":"in-basket","style":";opacity:.4"},{"id":"fish-1","kind":"fish","at":[185,650],"scale":0.18,"class":"in-basket","style":";opacity:.4"},{"id":"star-1","kind":"star","at":[300,590],"scale":0.14,"class":"in-basket","style":";opacity:.4"}]`；共享场景 `{"kind":"room","light":"late-night","side":"right"}`；取景 `{"at":[127.29,162.2],"scale":0.75}`。
- **旁白**：明天，再一起玩。
- **原朗读稿（核对用）**：明天，再一起玩。
- **共读分类**：`"autonomous"`；紧邻承接 p58。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### p60｜p61 · 前后置

来源：[60-back.js](../../../src/content/books/wuzilai/specs/60-back.js)。

#### p60 · 左页（仅纸书）

- **画面记录**：背景 `{}`；角色 `null`；道具 `[{"id":"spiral-1","kind":"spiral","at":[430,640],"scale":0.14}]`。
- **旁白**：《我自己来！》
- **成人文字**：一个非要自己来的小怪物<br>文字与插画：rockbenben<br>出版：＿＿＿＿＿＿＿　初版：＿＿＿＿年＿＿月<br>作品内容：CC BY-NC-ND 4.0，非商业分享请署名。<br>字体：站酷快乐体 · 霞鹜文楷（SIL OFL 1.1），可商用、可嵌入出版物。<br>（空行）<br>编者说：孩子成为愿意停手的照顾者；噜啵学会等待孩子自己完成。读到犹豫的地方，可以停一停，听孩子怎么说。
- **原朗读稿（核对用）**：《我自己来！》
一个非要自己来的小怪物
文字与插画：rockbenben
出版：＿＿＿＿＿＿＿　初版：＿＿＿＿年＿＿月
作品内容：CC BY-NC-ND 4.0，非商业分享请署名。
字体：站酷快乐体 · 霞鹜文楷（SIL OFL 1.1），可商用、可嵌入出版物。

编者说：孩子成为愿意停手的照顾者；噜啵学会等待孩子自己完成。读到犹豫的地方，可以停一停，听孩子怎么说。
- **屏幕动作**：未声明专属热区；共读与翻页，角色可有通用反馈。

#### p61 · 右页（仅纸书）

- **画面记录**：背景 `{}`；角色 `null`；道具 `[{"id":"spiral-1","kind":"spiral","at":[430,130],"scale":0.14}]`。
- **旁白**：怎么读这本册子
- **成人文字**：旁白慢慢念，拟声让孩子接着说。指认、拍手、呼气都可以在共读时一起做，不要求每页都做动作。孩子没有回应时，可以等一等，也可以翻过去。<br>这册可以特别停在：p22 不责备与 p42–p43 停下来等孩子。让孩子说说看，不急着给答案。<br>睡前最后几跨，声音逐渐放轻。孩子想停在某一页，就在那里停一会儿。
- **原朗读稿（核对用）**：怎么读这本册子
旁白慢慢念，拟声让孩子接着说。指认、拍手、呼气都可以在共读时一起做，不要求每页都做动作。孩子没有回应时，可以等一等，也可以翻过去。
这册可以特别停在：p22 不责备与 p42–p43 停下来等孩子。让孩子说说看，不急着给答案。
睡前最后几跨，声音逐渐放轻。孩子想停在某一页，就在那里停一会儿。
- **屏幕动作**：未声明专属热区；共读与翻页，角色可有通用反馈。

### p62｜p63 · 前后置

来源：[60-back.js](../../../src/content/books/wuzilai/specs/60-back.js)。

#### p62 · 左页

- **画面记录**：背景 `{"kind":"rays-tight","colors":["--pink"],"gap":"--paper","focus":[500,700],"cover":"all","wash":"--wash-pink"}`；角色 `{"pose":"ready","at":[720,660],"scale":0.33,"spiral":true,"wear":"vest"}`；道具 `[{"id":"arrow-1","kind":"arrow","at":[120,420],"scale":0.72,"class":"prop-arrow"}]`。
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

- **画面记录**：背景 `{}`；角色 `null`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[75,600],"scale":0.16,"class":"in-basket"},{"id":"fish-1","kind":"fish","at":[185,650],"scale":0.18,"class":"in-basket"},{"id":"star-1","kind":"star","at":[300,590],"scale":0.14,"class":"in-basket"}]`。
- **原朗读稿（核对用）**：后环衬：同三物留在侧躺的原篮内。
- **屏幕动作**：未声明专属热区；共读与翻页，角色可有通用反馈。

### p64 · 前后置

来源：[60-back.js](../../../src/content/books/wuzilai/specs/60-back.js)。

#### p64 · 单页（仅纸书）

- **画面记录**：背景 `{"kind":"rays","colors":["--yellow-deep","--yellow"],"gap":"--yellow","focus":[500,680],"cover":"all","wash":"--yellow"}`；角色 `{"pose":"covered-rest","at":[530,300],"scale":0.52,"spiral":false,"wear":"vest"}`；道具 `[{"id":"basket-1","kind":"basket-side","at":[20,380],"scale":0.6,"layer":"behind"},{"id":"apple-1","kind":"apple","at":[75,600],"scale":0.16,"class":"in-basket"},{"id":"fish-1","kind":"fish","at":[185,650],"scale":0.18,"class":"in-basket"},{"id":"star-1","kind":"star","at":[300,590],"scale":0.14,"class":"in-basket"}]`。
- **旁白**：《我自己来！》
- **大字／拟声词**：耶！
- **原朗读稿（核对用）**：《我自己来！》耶！
- **屏幕动作**：未声明专属热区；共读与翻页，角色可有通用反馈。

## 快照溯源

本册来源 SHA-256：`c2ec0d5e5cf7554a67693d5adc4632af52adb8cbd9dfd5d0581b6ace58dd2640`。摘要依次连接 reader-ui.js、book.json 与读取顺序下去重的书稿文件的“仓库相对路径 + 换行 + 统一 LF 的 UTF-8 文本 + 换行”。数据区含全部数字与初始显隐；内容变更后重新运行生成命令。设计契约仍以设计规格为准。
