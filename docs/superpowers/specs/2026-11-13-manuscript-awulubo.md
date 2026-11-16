# 第一册《啊呜噜啵！》完整文字剧本

整理日期：2026-11-13。性质：当前工作区书稿的审阅快照，包含未提交修改；未改写原文。设计契约仍为[设计规格](2026-10-30-awulubo-picture-book-design.md)，逐字现稿仍以 src/content/books/awulubo/specs/ 为准。

[返回五册审稿总览](2026-11-13-manuscript-review.md)。本册 64 页，其中正文 28 跨、56 页，屏幕显示 60 页。跨页直接采用 loadBooks() 返回的 spreads（底层使用 model.ts 的 physicalSpreads），保留书稿顺序。

## 故事与节奏

肚子饿的噜啵请孩子喂食，食物让它变色；吃得太多后，孩子帮它揉肚子，彩纸喷出来。睡醒后再找食物、玩躲猫猫和数苹果，最后噜啵把颜色送给孩子，一起玩过后入睡。

| 页段 | 故事任务 | 节奏与审阅重点 |
|---|---|---|
| p04–p07 | 相遇与邀请 | 从肚子叫到建立对话，落到“你喂我”。 |
| p08–p19 | 喂食升级与撑饱 | 三次单色、一次彩虹、吃撑与揉肚子。 |
| p20–p23 | 第一次爆发 | 画圈→彩纸喷发→飞起来。 |
| p24–p29 | 中途收束与重新开始 | 褪色、晚安、次日醒来；p28 另有返回开头的出口。 |
| p30–p45 | 找、藏、数、喊 | 连续小游戏重新抬升；逐段检查因果与回应距离。 |
| p46–p53 | 赠礼高点与一起玩 | 颜色送给你，再拍手、转圈、跺脚。 |
| p54–p59 | 最终沉降 | 困了→晚安→睡着→明天见。 |

本册先审：保留喂食变色的重复升级与赠礼回报；优先审 p24–p29 的中场结束感、p28 的重读出口，以及 p42–p45 的回应距离。

## 阅读说明

- 下面保留全部现稿旁白、大字、提示及成人文字；纸书没有覆写的槽位沿用现稿。仅在有 print 声明时单列纸书版本，空串如实标注。原文换行以行内换行保留，数组空行单独标注。
- “画面记录”只根据书稿中的底色、笔触、角色姿态与道具整理，不是看图后的构图结论；道具数按声明计，具体遮挡与可见性待粗分镜或校样核对。
- “原朗读稿”逐字保留 aria，供检查它是否与可见文字同步；它可能含旧文案，不能代替当前旁白，也不能当作画面事实。
- “屏幕回应”根据 interactions.js 静态阅读整理，尚未操作验证。无专属热区的页仍可有共读动作。普通完成动作交给阅读状态机处理；宽屏需整组完成后才向前，不能把后页文字出现时机等同于单页翻页。
- 每个动作页另列紧邻后页旁白，便于人工审查承诺与兑现；这不是自动判定因果成立。同页动画与后页剧情各有作用。前后置按真实装订成组，p59 后的 p60 为版权页。

## 逐跨页剧本

本节由 `node tools/manuscript.mjs` 从当前工作区生成；人工故事与节奏审阅保留在前文。画面记录是书稿数据，不代替看图；动作记录是声明，不代替操作验收。

**本册屏幕共读提示**：旁白念给孩子，拟声词让孩子跟着说。点错了不说「不对」，再来一次就好。

### p01 · 前后置

来源：[01-front.js](../../../src/content/books/awulubo/specs/01-front.js)。

#### p01 · 单页

- **画面记录**：背景 `{"kind":"rays","colors":["--yellow-deep","--yellow"],"gap":"--yellow","focus":[500,560],"wash":"--yellow"}`；角色 `{"pose":"happy","at":[170,220],"scale":0.64,"spiral":true}`；道具 `[]`。
- **大字／拟声词**：啊呜噜啵！
- **旁白**：一个要你喂的小怪物
- **提示**：点我，开始。
- **纸书提示**：（空串）
- **原朗读稿（核对用）**：《啊呜噜啵！》一个要你喂的小怪物。点我，开始。
- **屏幕动作**：点封面开始阅读；动作 `"start"`；对象 `"page"`；热区 `[0,0]`，大小 1000。
- **紧邻后页核对**：p02 旁白：（无旁白）

### p02｜p03 · 前后置

来源：[01-front.js](../../../src/content/books/awulubo/specs/01-front.js)。

#### p02 · 左页

- **画面记录**：背景 `{}`；角色 `null`；道具 `[{"id":"apple-1","kind":"apple","at":[90,120],"scale":0.19,"rotate":-12},{"id":"fish-1","kind":"fish","at":[560,60],"scale":0.22,"rotate":14},{"id":"star-1","kind":"star","at":[320,330],"scale":0.17,"rotate":-8},{"id":"apple-2","kind":"apple","at":[690,430],"scale":0.15,"rotate":18},{"id":"fish-2","kind":"fish","at":[70,600],"scale":0.18,"rotate":-16},{"id":"star-2","kind":"star","at":[420,700],"scale":0.2,"rotate":9},{"id":"apple-3","kind":"apple","at":[250,830],"scale":0.14,"rotate":24},{"id":"star-3","kind":"star","at":[840,790],"scale":0.12,"rotate":-20}]`。
- **原朗读稿（核对用）**：前环衬：苹果、小鱼、星星散落在纸上。
- **屏幕动作**：未声明专属热区；共读与翻页，角色可有通用反馈。

#### p03 · 右页

- **画面记录**：背景 `{"kind":"rays-tight","colors":["--pink","--pink-deep"],"focus":[500,760],"wash":"--wash-pink"}`；角色 `{"pose":"idle","at":[250,470],"scale":0.6,"spiral":true}`；道具 `[]`。
- **大字／拟声词**：啊呜噜啵！
- **旁白**：一个要你喂的小怪物
- **原朗读稿（核对用）**：扉页：《啊呜噜啵！》一个要你喂的小怪物。
- **屏幕动作**：未声明专属热区；共读与翻页，角色可有通用反馈。

### S01 · p04｜p05

来源：[04-hungry.js](../../../src/content/books/awulubo/specs/04-hungry.js)。

#### p04 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream","focus":[1000,500]}`；角色 `{"pose":"look-down","at":[130,255],"scale":0.65,"spiral":true}`；道具 `[]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[-131.72,-57.37],"scale":1.05}`。
- **旁白**：咕噜——肚子鼓起一个小包。
- **提示**：点点它的肚子。
- **纸书提示**：点点它的肚子。
- **原朗读稿（核对用）**：咕噜——肚子鼓起一个小包。点点它的肚子。
- **共读分类**：`"simulate"`。
- **屏幕动作**：一起试试；动作 `"belly"`；对象 `"character"`；热区 `[245,405]`，大小 350。
- **紧邻后页核对**：p05 旁白：是我！我饿了。它凑过来。

#### p05 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream","focus":[0,500]}`；角色 `{"pose":"lean-near","at":[240,255],"scale":0.65,"spiral":true}`；道具 `[]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[-131.72,-57.37],"scale":1.05}`。
- **旁白**：是我！我饿了。它凑过来。
- **原朗读稿（核对用）**：是我！我饿了。它凑过来。
- **共读分类**：`"autonomous"`；紧邻承接 p04。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S02 · p06｜p07

来源：[06-name.js](../../../src/content/books/awulubo/specs/06-name.js)。

#### p06 · 左页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-cream","colors":["--wash-yellow"],"gap":"--paper","cover":"all","focus":[1000,500]}`；角色 `{"pose":"curious-tilt","at":[130,255],"scale":0.65,"spiral":true}`；道具 `[]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[-3.88,-253.93],"scale":1.12}`。
- **旁白**：你叫什么名字呀？
- **提示**：把名字告诉它。
- **纸书提示**：把名字告诉它。
- **原朗读稿（核对用）**：你叫什么名字呀？把名字告诉它。
- **共读分类**：`"simulate"`。
- **屏幕动作**：一起试试；动作 `"name"`；对象 `"character"`；热区 `[181.21,355.57]`，大小 478.01。
- **紧邻后页核对**：p07 旁白：我叫噜啵。嘿嘿！

#### p07 · 右页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-cream","colors":["--wash-yellow"],"gap":"--paper","cover":"all","focus":[0,500]}`；角色 `{"pose":"beaming-lean","at":[240,255],"scale":0.65,"spiral":true}`；道具 `[]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[-3.88,-253.93],"scale":1.12}`。
- **旁白**：我叫噜啵。嘿嘿！
- **原朗读稿（核对用）**：我叫噜啵。嘿嘿！
- **共读分类**：`"autonomous"`；紧邻承接 p06。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S03 · p08｜p09

来源：[08-red.js](../../../src/content/books/awulubo/specs/08-red.js)。

#### p08 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream","focus":[1000,500]}`；角色 `{"pose":"willing","at":[130,255],"scale":0.65,"spiral":true}`；道具 `[{"id":"apple-A","kind":"apple","at":[560,480],"scale":0.27,"class":"prop-apple"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[-239.81,-177.02],"scale":1.25}`。
- **旁白**：噜啵张着嘴，等苹果。
- **提示**：喂它红苹果。
- **纸书提示**：喂它红苹果。
- **原朗读稿（核对用）**：噜啵张着嘴，等苹果。喂它红苹果。
- **共读分类**：`"simulate"`。
- **屏幕动作**：喂一口；动作 `"feed"`；对象 `"apple-A"`；热区 `[560,480]`，大小 280。
- **紧邻后页核对**：p09 旁白：啊呜！它变红，四周也红啦！

#### p09 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-red","focus":[0,500]}`；角色 `{"pose":"chew","at":[240,255],"scale":0.65,"spiral":true,"state":"state-red"}`；道具 `[]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[-239.81,-177.02],"scale":1.25}`。
- **旁白**：啊呜！它变红，四周也红啦！
- **原朗读稿（核对用）**：啊呜！它变红，四周也红啦！
- **共读分类**：`"autonomous"`；紧邻承接 p08。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S04 · p10｜p11

来源：[10-blue.js](../../../src/content/books/awulubo/specs/10-blue.js)。

#### p10 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-red","focus":[1000,500]}`；角色 `{"pose":"side","at":[130,255],"scale":0.65,"spiral":true,"state":"state-red"}`；道具 `[{"id":"fish-A","kind":"fish","at":[380,480],"scale":0.27,"class":"prop-fish"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[-126.43,-320.15],"scale":1.23}`。
- **旁白**：它还想尝尝小鱼。
- **提示**：喂它蓝小鱼。
- **纸书提示**：喂它蓝小鱼。
- **原朗读稿（核对用）**：它还想尝尝小鱼。喂它蓝小鱼。
- **共读分类**：`"simulate"`。
- **屏幕动作**：喂一口；动作 `"feed"`；对象 `"fish-A"`；热区 `[380,480]`，大小 280。
- **紧邻后页核对**：p11 旁白：噗噜！它和四周都变蓝啦！

#### p11 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-blue","focus":[0,500]}`；角色 `{"pose":"chew","at":[240,255],"scale":0.65,"spiral":true,"state":"state-blue"}`；道具 `[{"id":"breath-1","kind":"bubble","at":[700,510],"scale":0.1}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[-126.43,-320.15],"scale":1.23}`。
- **旁白**：噗噜！它和四周都变蓝啦！
- **原朗读稿（核对用）**：噗噜！它和四周都变蓝啦！
- **共读分类**：`"autonomous"`；紧邻承接 p10。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S05 · p12｜p13

来源：[12-yellow.js](../../../src/content/books/awulubo/specs/12-yellow.js)。

#### p12 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-blue","focus":[1000,500]}`；角色 `{"pose":"willing","at":[130,255],"scale":0.65,"spiral":true,"state":"state-blue"}`；道具 `[{"id":"star-A","kind":"star","at":[600,410],"scale":0.25,"class":"prop-star"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[-222.88,-119.81],"scale":1.2}`。
- **旁白**：还有一颗黄星星。
- **提示**：喂它黄星星。
- **纸书提示**：喂它黄星星。
- **原朗读稿（核对用）**：还有一颗黄星星。喂它黄星星。
- **共读分类**：`"simulate"`。
- **屏幕动作**：喂一口；动作 `"feed"`；对象 `"star-A"`；热区 `[600,410]`，大小 280。
- **紧邻后页核对**：p13 旁白：闪闪闪！黄颜色一下铺开！

#### p13 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-yellow","focus":[0,500]}`；角色 `{"pose":"tiptoe","at":[240,255],"scale":0.65,"spiral":true,"state":"state-yellow"}`；道具 `[]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[-222.88,-119.81],"scale":1.2}`。
- **旁白**：闪闪闪！黄颜色一下铺开！
- **原朗读稿（核对用）**：闪闪闪！黄颜色一下铺开！
- **共读分类**：`"autonomous"`；紧邻承接 p12。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S06 · p14｜p15

来源：[14-rainbow.js](../../../src/content/books/awulubo/specs/14-rainbow.js)。

#### p14 · 左页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-yellow","colors":["--yellow"],"gap":"--paper","cover":"all","focus":[1000,500]}`；角色 `{"pose":"willing","at":[210,160],"scale":0.55,"spiral":true}`；道具 `[{"id":"apple-B","kind":"apple","at":[60,540],"scale":0.22,"class":"prop-apple"},{"id":"fish-B","kind":"fish","at":[360,540],"scale":0.22,"class":"prop-fish"},{"id":"star-B","kind":"star","at":[660,540],"scale":0.22,"class":"prop-star"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[-27.67,24.74],"scale":1}`。
- **旁白**：又来了苹果、小鱼、星星。
- **提示**：三样各喂一口。
- **纸书提示**：三样各喂一口。
- **原朗读稿（核对用）**：又来了苹果、小鱼、星星。三样各喂一口。
- **共读分类**：`"simulate"`。
- **屏幕动作**：各喂一口；动作 `"feed3"`；对象 `"apple-B"`；热区 `[60,540]`，大小 270。
- **屏幕动作**：各喂一口；动作 `"feed3"`；对象 `"fish-B"`；热区 `[360,540]`，大小 270。
- **屏幕动作**：各喂一口；动作 `"feed3"`；对象 `"star-B"`；热区 `[660,540]`，大小 270。
- **紧邻后页核对**：p15 旁白：哇！颜色连成彩虹啦！

#### p15 · 右页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-yellow","colors":["--yellow"],"gap":"--paper","cover":"all","focus":[0,500]}`；角色 `{"pose":"look-down","at":[240,255],"scale":0.65,"spiral":true,"state":"state-rainbow"}`；道具 `[]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[-27.67,24.74],"scale":1}`。
- **旁白**：哇！颜色连成彩虹啦！
- **原朗读稿（核对用）**：哇！颜色连成彩虹啦！
- **共读分类**：`"autonomous"`；紧邻承接 p14。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S07 · p16｜p17

来源：[16-full.js](../../../src/content/books/awulubo/specs/16-full.js)。

#### p16 · 左页

- **画面记录**：背景 `{"kind":"disc","wash":"--wash-yellow","colors":["--yellow"],"gap":"--paper","cover":"all","focus":[1000,500]}`；角色 `{"pose":"willing","at":[100,215],"scale":0.7,"spiral":true,"state":"state-rainbow"}`；道具 `[{"id":"apple-C","kind":"apple","at":[560,480],"scale":0.27,"class":"prop-apple"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[-73.04,70.5],"scale":0.96}`。
- **旁白**：它还张着大嘴。
- **提示**：再喂一口苹果。
- **纸书提示**：再喂一口苹果。
- **原朗读稿（核对用）**：它还张着大嘴。再喂一口苹果。
- **共读分类**：`"simulate"`。
- **屏幕动作**：喂一口；动作 `"feed"`；对象 `"apple-C"`；热区 `[560,480]`，大小 280。
- **紧邻后页核对**：p17 旁白：肚子鼓成球，小脚碰不到地！

#### p17 · 右页

- **画面记录**：背景 `{"kind":"disc","wash":"--wash-yellow","colors":["--yellow"],"gap":"--paper","cover":"all","focus":[0,500]}`；角色 `{"pose":"inflated","at":[150,120],"scale":0.76,"spiral":true,"state":"state-rainbow"}`；道具 `[]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[-73.04,70.5],"scale":0.96}`。
- **旁白**：肚子鼓成球，小脚碰不到地！
- **原朗读稿（核对用）**：肚子鼓成球，小脚碰不到地！
- **共读分类**：`"autonomous"`；紧邻承接 p16。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S08 · p18｜p19

来源：[18-rub.js](../../../src/content/books/awulubo/specs/18-rub.js)。

#### p18 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-yellow","focus":[1000,500]}`；角色 `{"pose":"inflated","at":[150,120],"scale":0.76,"spiral":true,"state":"state-rainbow"}`；道具 `[]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[108.36,-37.04],"scale":0.86}`。
- **旁白**：圆肚子一晃一晃。
- **提示**：轻轻揉揉肚子。
- **纸书提示**：轻轻揉揉肚子。
- **原朗读稿（核对用）**：圆肚子一晃一晃。轻轻揉揉肚子。
- **共读分类**：`"simulate"`。
- **屏幕动作**：一起试试；动作 `"massage"`；对象 `"character"`；热区 `[247.99,217.69]`，大小 559.07。
- **紧邻后页核对**：p19 旁白：唔……脚尖碰到地了。

#### p19 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-yellow","focus":[0,500]}`；角色 `{"pose":"round-ground","at":[150,195],"scale":0.73,"spiral":true,"state":"state-rainbow"}`；道具 `[]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[108.36,-37.04],"scale":0.86}`。
- **旁白**：唔……脚尖碰到地了。
- **原朗读稿（核对用）**：唔……脚尖碰到地了。
- **共读分类**：`"autonomous"`；紧邻承接 p18。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S09 · p20｜p21

来源：[20-burp.js](../../../src/content/books/awulubo/specs/20-burp.js)。

#### p20 · 左页

- **画面记录**：背景 `{"kind":"rays","wash":"--wash-yellow","colors":["--yellow"],"gap":"--paper","cover":"all","focus":[1000,500]}`；角色 `{"pose":"round-ground","at":[150,195],"scale":0.73,"spiral":true,"state":"state-rainbow"}`；道具 `[]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[7.58,102.48],"scale":0.91}`。
- **旁白**：肚子里咕噜咕噜。
- **提示**：用手指画个圈。
- **纸书提示**：用手指画个圈。
- **原朗读稿（核对用）**：肚子里咕噜咕噜。用手指画个圈。
- **共读分类**：`"simulate"`。
- **屏幕动作**：一起试试；动作 `"rub"`；对象 `"character"`；热区 `[245,405]`，大小 350。
- **紧邻后页核对**：p21 旁白：嗝——啵！肚子小了，<br>彩纸冲上天！

#### p21 · 右页

- **画面记录**：背景 `{"kind":"rays","wash":"--wash-yellow","colors":["--yellow"],"gap":"--paper","cover":"all","focus":[0,500]}`；角色 `{"pose":"burp","at":[270,290],"scale":0.6,"spiral":true}`；道具 `[{"id":"K1-0","kind":"paper-red","at":[30,280],"scale":0.08,"rotate":-14},{"id":"K1-1","kind":"paper-blue","at":[230,260],"scale":0.08,"rotate":0},{"id":"K1-2","kind":"paper-yellow","at":[400,250],"scale":0.08,"rotate":14},{"id":"K1-3","kind":"paper-red","at":[850,260],"scale":0.08,"rotate":-14},{"id":"K1-4","kind":"paper-blue","at":[870,350],"scale":0.08,"rotate":0},{"id":"K1-5","kind":"paper-yellow","at":[30,620],"scale":0.08,"rotate":14},{"id":"K1-6","kind":"paper-red","at":[860,680],"scale":0.08,"rotate":-14},{"id":"K1-7","kind":"paper-blue","at":[850,500],"scale":0.08,"rotate":0},{"id":"K1-8","kind":"paper-yellow","at":[30,480],"scale":0.08,"rotate":14},{"id":"K1-tag","kind":"paper-red","at":[540,200],"scale":0.065}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[7.58,102.48],"scale":0.91}`。
- **旁白**：嗝——啵！肚子小了，<br>彩纸冲上天！
- **原朗读稿（核对用）**：嗝——啵！肚子小了，彩纸冲上天！
- **共读分类**：`"autonomous"`；紧邻承接 p20。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S10 · p22｜p23

来源：[22-confetti.js](../../../src/content/books/awulubo/specs/22-confetti.js)。

#### p22 · 左页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-yellow","colors":["--yellow"],"gap":"--paper","cover":"all","focus":[1000,500]}`；角色 `{"pose":"cross-eyed","at":[100,225],"scale":0.7,"spiral":true,"wear":"paper"}`；道具 `[{"id":"K1-0","kind":"paper-red","at":[30,280],"scale":0.08,"rotate":-14},{"id":"K1-1","kind":"paper-blue","at":[230,260],"scale":0.08,"rotate":0},{"id":"K1-2","kind":"paper-yellow","at":[400,250],"scale":0.08,"rotate":14},{"id":"K1-3","kind":"paper-red","at":[850,260],"scale":0.08,"rotate":-14},{"id":"K1-4","kind":"paper-blue","at":[870,350],"scale":0.08,"rotate":0},{"id":"K1-5","kind":"paper-yellow","at":[30,620],"scale":0.08,"rotate":14},{"id":"K1-6","kind":"paper-red","at":[860,680],"scale":0.08,"rotate":-14},{"id":"K1-7","kind":"paper-blue","at":[850,500],"scale":0.08,"rotate":0},{"id":"K1-8","kind":"paper-yellow","at":[30,480],"scale":0.08,"rotate":14}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[58.71,196.31],"scale":0.79}`。
- **旁白**：一片彩纸贴上它的脑门。
- **提示**：指指那片彩纸。
- **纸书提示**：指指那片彩纸。
- **原朗读稿（核对用）**：一片彩纸贴上它的脑门。指指那片彩纸。
- **共读分类**：`"observe"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p23 · 右页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-yellow","colors":["--yellow"],"gap":"--paper","cover":"all","focus":[0,500]}`；角色 `{"pose":"flying","at":[100,-10],"scale":0.82,"spiral":true,"wear":"paper"}`；道具 `[{"id":"K1-0","kind":"paper-red","at":[30,280],"scale":0.08,"rotate":-14},{"id":"K1-1","kind":"paper-blue","at":[230,260],"scale":0.08,"rotate":0},{"id":"K1-2","kind":"paper-yellow","at":[400,250],"scale":0.08,"rotate":14},{"id":"K1-3","kind":"paper-red","at":[850,260],"scale":0.08,"rotate":-14},{"id":"K1-4","kind":"paper-blue","at":[870,350],"scale":0.08,"rotate":0},{"id":"K1-5","kind":"paper-yellow","at":[30,620],"scale":0.08,"rotate":14},{"id":"K1-6","kind":"paper-red","at":[860,680],"scale":0.08,"rotate":-14},{"id":"K1-7","kind":"paper-blue","at":[850,500],"scale":0.08,"rotate":0},{"id":"K1-8","kind":"paper-yellow","at":[30,480],"scale":0.08,"rotate":14}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[58.71,196.31],"scale":0.79}`。
- **旁白**：彩纸一卷，带着它飞过去！
- **原朗读稿（核对用）**：彩纸一卷，带着它飞过去！
- **共读分类**：`"autonomous"`；紧邻承接 p22。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S11 · p24｜p25

来源：[24-fade.js](../../../src/content/books/awulubo/specs/24-fade.js)。

#### p24 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream","focus":[1000,500]}`；角色 `{"pose":"squash","at":[120,250],"scale":0.66,"spiral":true}`；道具 `[{"id":"K1-0","kind":"paper-red","at":[30,280],"scale":0.08,"rotate":-14},{"id":"K1-1","kind":"paper-blue","at":[230,260],"scale":0.08,"rotate":0},{"id":"K1-2","kind":"paper-yellow","at":[400,250],"scale":0.08,"rotate":14},{"id":"K1-3","kind":"paper-red","at":[850,260],"scale":0.08,"rotate":-14},{"id":"K1-4","kind":"paper-blue","at":[870,350],"scale":0.08,"rotate":0},{"id":"K1-5","kind":"paper-yellow","at":[30,620],"scale":0.08,"rotate":14},{"id":"K1-6","kind":"paper-red","at":[860,680],"scale":0.08,"rotate":-14},{"id":"K1-7","kind":"paper-blue","at":[850,500],"scale":0.08,"rotate":0},{"id":"K1-8","kind":"paper-yellow","at":[30,480],"scale":0.08,"rotate":14},{"id":"K1-tag","kind":"paper-red","at":[480,410],"scale":0.065,"rotate":25}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[135.27,-62.37],"scale":0.88}`。
- **旁白**：它落地一弹，颜色慢慢淡了。
- **原朗读稿（核对用）**：它落地一弹，颜色慢慢淡了。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p25 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream","focus":[0,500]}`；角色 `{"pose":"ready","at":[240,255],"scale":0.65,"spiral":true}`；道具 `[{"id":"K1-tag","kind":"paper-red","at":[170,755],"scale":0.065},{"id":"K1-1","kind":"paper-blue","at":[600,765],"scale":0.07}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[135.27,-62.37],"scale":0.88}`。
- **旁白**：彩纸落下。<br>明天，还想和你玩。
- **原朗读稿（核对用）**：彩纸落下。明天，还想和你玩。
- **共读分类**：`"autonomous"`；紧邻承接 p24。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S12 · p26｜p27

来源：[26-night.js](../../../src/content/books/awulubo/specs/26-night.js)。

#### p26 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-night","focus":[1000,500]}`；角色 `{"pose":"curled","at":[160,310],"scale":0.6,"spiral":false}`；道具 `[{"id":"K1-tag","kind":"paper-red","at":[170,755],"scale":0.065},{"id":"K1-1","kind":"paper-blue","at":[600,765],"scale":0.07},{"id":"moon-1","kind":"moon","at":[700,260],"scale":0.22,"class":"prop-moon"}]`；共享场景 `{"kind":"room","light":"night","side":"left"}`；取景 `{"at":[124.98,274.73],"scale":0.71}`。
- **旁白**：夜蓝色里，月亮升起来。
- **提示**：指一下月亮。
- **纸书提示**：指一下月亮。
- **原朗读稿（核对用）**：夜蓝色里，月亮升起来。指一下月亮。
- **共读分类**：`"observe"`。
- **屏幕动作**：指一指；动作 `"find"`；对象 `"moon-1"`；热区 `[690,250]`，大小 260。
- **紧邻后页核对**：p27 旁白：它闭上眼，呼噜……

#### p27 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-night","focus":[0,500]}`；角色 `{"pose":"sleep-curled","at":[270,310],"scale":0.6,"spiral":false}`；道具 `[{"id":"K1-tag","kind":"paper-red","at":[170,755],"scale":0.065},{"id":"K1-1","kind":"paper-blue","at":[600,765],"scale":0.07},{"id":"moon-1","kind":"moon","at":[700,260],"scale":0.22}]`；共享场景 `{"kind":"room","light":"night","side":"right"}`；取景 `{"at":[124.98,274.73],"scale":0.71}`。
- **旁白**：它闭上眼，呼噜……
- **原朗读稿（核对用）**：它闭上眼，呼噜……
- **共读分类**：`"autonomous"`；紧邻承接 p26。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S13 · p28｜p29

来源：[28-morning.js](../../../src/content/books/awulubo/specs/28-morning.js)。

#### p28 · 左页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-cream","colors":["--wash-yellow"],"gap":"--paper","cover":"all","focus":[1000,500]}`；角色 `{"pose":"prone","at":[130,270],"scale":0.65,"spiral":false}`；道具 `[{"id":"K1-tag","kind":"paper-red","at":[170,755],"scale":0.065},{"id":"K1-1","kind":"paper-blue","at":[600,765],"scale":0.07}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[-171.63,-166.46],"scale":1.23}`。
- **旁白**：天亮啦，肚子又咕噜叫。
- **提示**：轻轻摸摸噜啵。
- **纸书提示**：轻轻摸摸噜啵。
- **原朗读稿（核对用）**：天亮啦，肚子又咕噜叫。轻轻摸摸噜啵。
- **共读分类**：`"simulate"`。
- **屏幕动作**：一起试试；动作 `"poke"`；对象 `"character"`；热区 `[216.83,570.48]`，大小 485。
- **紧邻后页核对**：p29 旁白：它一翻身，朝你探过来。

#### p29 · 右页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-cream","colors":["--wash-yellow"],"gap":"--paper","cover":"all","focus":[0,500]}`；角色 `{"pose":"lean-near","at":[240,255],"scale":0.65,"spiral":true}`；道具 `[{"id":"K1-tag","kind":"paper-red","at":[170,755],"scale":0.065},{"id":"K1-1","kind":"paper-blue","at":[600,765],"scale":0.07}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[-171.63,-166.46],"scale":1.23}`。
- **旁白**：它一翻身，朝你探过来。
- **原朗读稿（核对用）**：它一翻身，朝你探过来。
- **共读分类**：`"autonomous"`；紧邻承接 p28。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S14 · p30｜p31

来源：[30-search.js](../../../src/content/books/awulubo/specs/30-search.js)。

#### p30 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream","focus":[1000,500]}`；角色 `{"pose":"hesitant","at":[210,160],"scale":0.55,"spiral":true}`；道具 `[{"id":"apple-D","kind":"apple","at":[60,540],"scale":0.22,"class":"prop-apple"},{"id":"fish-D","kind":"fish","at":[360,540],"scale":0.22,"class":"prop-fish"},{"id":"star-D","kind":"star","at":[660,540],"scale":0.22,"class":"prop-star"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[92.33,-87.15],"scale":1}`。
- **旁白**：苹果、小鱼、星星在哪儿？
- **提示**：三样都指一指。
- **纸书提示**：三样都指一指。
- **原朗读稿（核对用）**：苹果、小鱼、星星在哪儿？三样都指一指。
- **共读分类**：`"observe"`。
- **屏幕动作**：指一指；动作 `"find"`；对象 `"apple-D"`；热区 `[60,540]`，大小 270。
- **屏幕动作**：指一指；动作 `"find"`；对象 `"fish-D"`；热区 `[360,540]`，大小 270。
- **屏幕动作**：指一指；动作 `"find"`；对象 `"star-D"`；热区 `[660,540]`，大小 270。
- **紧邻后页核对**：p31 旁白：全找到了，就在门边！

#### p31 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream","focus":[0,500]}`；角色 `{"pose":"curious-tilt","at":[210,160],"scale":0.55,"spiral":true}`；道具 `[{"id":"apple-D","kind":"apple","at":[60,540],"scale":0.22,"class":"prop-apple"},{"id":"fish-D","kind":"fish","at":[360,540],"scale":0.22,"class":"prop-fish"},{"id":"star-D","kind":"star","at":[660,540],"scale":0.22,"class":"prop-star"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[92.33,-87.15],"scale":1}`。
- **旁白**：全找到了，就在门边！
- **原朗读稿（核对用）**：全找到了，就在门边！
- **共读分类**：`"autonomous"`；紧邻承接 p30。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S15 · p32｜p33

来源：[32-found.js](../../../src/content/books/awulubo/specs/32-found.js)。

#### p32 · 左页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-cream","colors":["--wash-yellow"],"gap":"--paper","cover":"all","focus":[1000,500]}`；角色 `{"pose":"willing","at":[210,160],"scale":0.55,"spiral":true}`；道具 `[{"id":"apple-D","kind":"apple","at":[60,540],"scale":0.22,"class":"prop-apple"},{"id":"fish-D","kind":"fish","at":[360,540],"scale":0.22,"class":"prop-fish"},{"id":"star-D","kind":"star","at":[660,540],"scale":0.22,"class":"prop-star"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[-43.84,-13.45],"scale":1.08}`。
- **旁白**：噜啵的嘴又张开了。
- **提示**：一样一样喂给它。
- **纸书提示**：一样一样喂给它。
- **原朗读稿（核对用）**：噜啵的嘴又张开了。一样一样喂给它。
- **共读分类**：`"simulate"`。
- **屏幕动作**：各喂一口；动作 `"feed3"`；对象 `"apple-D"`；热区 `[60,540]`，大小 270。
- **屏幕动作**：各喂一口；动作 `"feed3"`；对象 `"fish-D"`；热区 `[360,540]`，大小 270。
- **屏幕动作**：各喂一口；动作 `"feed3"`；对象 `"star-D"`；热区 `[660,540]`，大小 270。
- **紧邻后页核对**：p33 旁白：啊呜！三样滚进圆肚子。

#### p33 · 右页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-cream","colors":["--wash-yellow"],"gap":"--paper","cover":"all","focus":[0,500]}`；角色 `{"pose":"round-ground","at":[150,200],"scale":0.7,"spiral":true,"state":"state-rainbow"}`；道具 `[]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[-43.84,-13.45],"scale":1.08}`。
- **旁白**：啊呜！三样滚进圆肚子。
- **原朗读稿（核对用）**：啊呜！三样滚进圆肚子。
- **共读分类**：`"autonomous"`；紧邻承接 p32。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S16 · p34｜p35

来源：[34-hide.js](../../../src/content/books/awulubo/specs/34-hide.js)。

#### p34 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream","focus":[1000,500]}`；角色 `null`；道具 `[]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[-93.88,27.58],"scale":1.09}`。
- **旁白**：咦，噜啵不见了。
- **提示**：翻过来找找看。
- **纸书提示**：翻过来找找看。
- **原朗读稿（核对用）**：咦，噜啵不见了。翻过来找找看。
- **共读分类**：`"observe"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p35 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream","focus":[0,500]}`；角色 `null`；道具 `[{"id":"apple-E","kind":"apple","at":[260,200],"scale":0.62},{"id":"breath-1","kind":"bubble","at":[130,340],"scale":0.1},{"id":"breath-2","kind":"bubble","at":[190,270],"scale":0.07}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[-93.88,27.58],"scale":1.09}`。
- **旁白**：另一个大苹果后，<br>冒出小泡泡。
- **原朗读稿（核对用）**：另一个大苹果后，冒出小泡泡。
- **共读分类**：`"autonomous"`；紧邻承接 p34。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S17 · p36｜p37

来源：[36-here.js](../../../src/content/books/awulubo/specs/36-here.js)。

#### p36 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream","focus":[1000,500]}`；角色 `null`；道具 `[{"id":"apple-E","kind":"apple","at":[260,200],"scale":0.62},{"id":"breath-1","kind":"bubble","at":[130,340],"scale":0.08},{"id":"foot-1","kind":"foot","at":[50,300],"scale":0.55,"class":"prop-foot"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[-109.06,39.4],"scale":1.05}`。
- **旁白**：小泡泡旁，露出一只脚。
- **提示**：指指那只脚。
- **纸书提示**：指指那只脚。
- **原朗读稿（核对用）**：小泡泡旁，露出一只脚。指指那只脚。
- **共读分类**：`"observe"`。
- **屏幕动作**：指一指；动作 `"find"`；对象 `"foot-1"`；热区 `[180,660]`，大小 260。
- **紧邻后页核对**：p37 旁白：嘿！它从大苹果后蹦出来！

#### p37 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream","focus":[0,500]}`；角色 `{"pose":"cheer","at":[420,150],"scale":0.65,"spiral":true,"state":"state-rainbow"}`；道具 `[{"id":"apple-E","kind":"apple","at":[260,200],"scale":0.62,"layer":"behind"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[-109.06,39.4],"scale":1.05}`。
- **旁白**：嘿！它从大苹果后蹦出来！
- **原朗读稿（核对用）**：嘿！它从大苹果后蹦出来！
- **共读分类**：`"autonomous"`；紧邻承接 p36。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S18 · p38｜p39

来源：[38-count.js](../../../src/content/books/awulubo/specs/38-count.js)。

#### p38 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream","focus":[1000,500]}`；角色 `{"pose":"look-down","at":[230,425],"scale":0.43,"spiral":true,"state":"state-rainbow"}`；道具 `[{"id":"apple-F","kind":"apple","at":[60,565],"scale":0.22,"class":"prop-apple count-item"},{"id":"apple-G","kind":"apple","at":[360,565],"scale":0.22,"class":"prop-apple count-item"},{"id":"apple-H","kind":"apple","at":[660,565],"scale":0.22,"class":"prop-apple count-item"}]`；共享场景 `{"kind":"doorway","side":"left"}`；取景 `{"at":[113.97,-210.37],"scale":0.95}`。
- **旁白**：门口另有一排红苹果。
- **提示**：挨个点着数。
- **纸书提示**：挨个点着数。
- **数字 1**：`"1"`；初始隐藏；位置 `[150,430]`。
- **数字 2**：`"2"`；初始隐藏；位置 `[450,430]`。
- **数字 3**：`"3"`；初始隐藏；位置 `[750,430]`。
- **原朗读稿（核对用）**：门口另有一排红苹果。挨个点着数。
- **共读分类**：`"observe"`。
- **屏幕动作**：数一数；动作 `"count"`；对象 `"apple-F"`；热区 `[60,565]`，大小 270。
- **屏幕动作**：数一数；动作 `"count"`；对象 `"apple-G"`；热区 `[360,565]`，大小 270。
- **屏幕动作**：数一数；动作 `"count"`；对象 `"apple-H"`；热区 `[660,565]`，大小 270。
- **紧邻后页核对**：p39 旁白：一、二、三！

#### p39 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream","focus":[0,500]}`；角色 `{"pose":"look-down","at":[230,425],"scale":0.43,"spiral":true,"state":"state-rainbow"}`；道具 `[{"id":"apple-F","kind":"apple","at":[60,565],"scale":0.22,"class":"prop-apple count-item"},{"id":"apple-G","kind":"apple","at":[360,565],"scale":0.22,"class":"prop-apple count-item"},{"id":"apple-H","kind":"apple","at":[660,565],"scale":0.22,"class":"prop-apple count-item"}]`；共享场景 `{"kind":"doorway","side":"right"}`；取景 `{"at":[113.97,-210.37],"scale":0.95}`。
- **旁白**：一、二、三！
- **数字 1**：`"1"`；初始显示；位置 `[150,430]`。
- **数字 2**：`"2"`；初始显示；位置 `[450,430]`。
- **数字 3**：`"3"`；初始显示；位置 `[750,430]`。
- **原朗读稿（核对用）**：一、二、三！
- **共读分类**：`"autonomous"`；紧邻承接 p38。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S19 · p40｜p41

来源：[40-three.js](../../../src/content/books/awulubo/specs/40-three.js)。

#### p40 · 左页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-cream","colors":["--wash-yellow"],"gap":"--paper","cover":"all","focus":[1000,500]}`；角色 `{"pose":"look-back","at":[410,255],"scale":0.65,"spiral":true,"state":"state-rainbow"}`；道具 `[{"id":"apple-F","kind":"apple","at":[10,710],"scale":0.075},{"id":"apple-G","kind":"apple","at":[90,710],"scale":0.075},{"id":"apple-H","kind":"apple","at":[170,710],"scale":0.075}]`；共享场景 `{"kind":"grass","occlude":false,"grassScale":2,"side":"left"}`；取景 `{"at":[21,-8.87],"scale":0.97}`。
- **旁白**：它跨到门外，也歪着头数。
- **原朗读稿（核对用）**：它跨到门外，也歪着头数。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p41 · 右页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-cream","colors":["--wash-yellow"],"gap":"--paper","cover":"all","focus":[0,500]}`；角色 `{"pose":"beaming-lean","at":[240,255],"scale":0.65,"spiral":true,"state":"state-rainbow"}`；道具 `[]`；共享场景 `{"kind":"grass","occlude":false,"grassScale":2,"side":"right"}`；取景 `{"at":[21,-8.87],"scale":0.97}`。
- **旁白**：它点点头，咧嘴朝你笑。
- **数字 1**：`"3"`；初始显示；位置 `[700,300]`。
- **原朗读稿（核对用）**：它点点头，咧嘴朝你笑。
- **共读分类**：`"autonomous"`；紧邻承接 p40。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S20 · p42｜p43

来源：[42-shout.js](../../../src/content/books/awulubo/specs/42-shout.js)。

#### p42 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream","focus":[1000,500]}`；角色 `null`；道具 `[{"id":"apple-F","kind":"apple","at":[10,710],"scale":0.075},{"id":"apple-G","kind":"apple","at":[90,710],"scale":0.075},{"id":"apple-H","kind":"apple","at":[170,710],"scale":0.075}]`；共享场景 `{"kind":"grass","occlude":true,"grassScale":2,"side":"left"}`；取景 `{"at":[18.55,-53.26],"scale":1.14}`。
- **旁白**：噜啵又躲进草里了。
- **提示**：叫三声噜啵。
- **纸书提示**：叫三声噜啵。
- **原朗读稿（核对用）**：噜啵又躲进草里了。叫三声噜啵。
- **共读分类**：`"simulate"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p43 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream","focus":[0,500]}`；角色 `{"pose":"hidden-feet","at":[400,60],"scale":0.55,"spiral":false}`；道具 `[]`；共享场景 `{"kind":"grass","occlude":true,"grassScale":2,"side":"right"}`；取景 `{"at":[18.55,-53.26],"scale":1.14}`。
- **旁白**：草里两只脚一翘：我在这儿！
- **原朗读稿（核对用）**：草里两只脚一翘：我在这儿！
- **共读分类**：`"autonomous"`；紧邻承接 p42。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S21 · p44｜p45

来源：[44-seen.js](../../../src/content/books/awulubo/specs/44-seen.js)。

#### p44 · 左页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-cream","colors":["--wash-yellow"],"gap":"--paper","cover":"all","focus":[1000,500]}`；角色 `null`；道具 `[{"id":"apple-F","kind":"apple","at":[10,710],"scale":0.075},{"id":"apple-G","kind":"apple","at":[90,710],"scale":0.075},{"id":"apple-H","kind":"apple","at":[170,710],"scale":0.075}]`；共享场景 `{"kind":"grass","occlude":false,"grassScale":2,"side":"left"}`；取景 `{"at":[207.38,-111.55],"scale":0.95}`。
- **旁白**：你认出它的声音了。
- **原朗读稿（核对用）**：你认出它的声音了。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p45 · 右页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-cream","colors":["--wash-yellow"],"gap":"--paper","cover":"all","focus":[0,500]}`；角色 `{"pose":"belly-offer","at":[100,150],"scale":0.78,"spiral":true,"state":"state-rainbow"}`；道具 `[]`；共享场景 `{"kind":"grass","occlude":false,"grassScale":2,"side":"right"}`；取景 `{"at":[207.38,-111.55],"scale":0.95}`。
- **旁白**：它蹦到面前，把肚子挺起来。
- **原朗读稿（核对用）**：它蹦到面前，把肚子挺起来。
- **共读分类**：`"autonomous"`；紧邻承接 p44。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S22 · p46｜p47

来源：[46-gift.js](../../../src/content/books/awulubo/specs/46-gift.js)。

#### p46 · 左页

- **画面记录**：背景 `{"kind":"rays","wash":"--wash-cream","colors":["--wash-yellow"],"gap":"--paper","cover":"all","focus":[1000,500]}`；角色 `{"pose":"push","at":[110,205],"scale":0.7,"spiral":true,"state":"state-rainbow"}`；道具 `[{"id":"apple-F","kind":"apple","at":[10,710],"scale":0.075},{"id":"apple-G","kind":"apple","at":[90,710],"scale":0.075},{"id":"apple-H","kind":"apple","at":[170,710],"scale":0.075}]`；共享场景 `{"kind":"grass","occlude":false,"grassScale":2,"side":"left"}`；取景 `{"at":[30.2,-55.95],"scale":0.87}`。
- **旁白**：肚子里的颜色，都送给你！
- **提示**：伸开手接一接。
- **纸书提示**：伸开手接一接。
- **原朗读稿（核对用）**：肚子里的颜色，都送给你！伸开手接一接。
- **共读分类**：`"simulate"`。
- **屏幕动作**：一起试试；动作 `"gift"`；对象 `"character"`；热区 `[247.09,438.73]`，大小 419.23。
- **紧邻后页核对**：p47 旁白：红、蓝、黄变成彩纸，<br>落在手上、脚边！

#### p47 · 右页

- **画面记录**：背景 `{"kind":"rays","wash":"--wash-cream","colors":["--wash-yellow"],"gap":"--paper","cover":"all","focus":[0,500]}`；角色 `{"pose":"ready","at":[420,255],"scale":0.65,"spiral":true}`；道具 `[{"id":"child-hand","kind":"palm","at":[60,475],"scale":0.35},{"id":"K2-red","kind":"paper-red","at":[185,615],"scale":0.09},{"id":"K2-blue","kind":"paper-blue","at":[520,755],"scale":0.1},{"id":"K2-yellow","kind":"paper-yellow","at":[30,650],"scale":0.1}]`；共享场景 `{"kind":"grass","occlude":false,"grassScale":2,"side":"right"}`；取景 `{"at":[30.2,-55.95],"scale":0.87}`。
- **旁白**：红、蓝、黄变成彩纸，<br>落在手上、脚边！
- **原朗读稿（核对用）**：红、蓝、黄变成彩纸，落在手上、脚边！
- **共读分类**：`"autonomous"`；紧邻承接 p46。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S23 · p48｜p49

来源：[48-clap.js](../../../src/content/books/awulubo/specs/48-clap.js)。

#### p48 · 左页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-cream","colors":["--wash-yellow"],"gap":"--paper","cover":"all","focus":[1000,500]}`；角色 `{"pose":"beaming-lean","at":[130,255],"scale":0.65,"spiral":true}`；道具 `[{"id":"apple-F","kind":"apple","at":[10,710],"scale":0.075},{"id":"apple-G","kind":"apple","at":[90,710],"scale":0.075},{"id":"apple-H","kind":"apple","at":[170,710],"scale":0.075},{"id":"K2-red","kind":"paper-red","at":[380,760],"scale":0.09},{"id":"K2-blue","kind":"paper-blue","at":[600,770],"scale":0.1},{"id":"K2-yellow","kind":"paper-yellow","at":[760,670],"scale":0.1}]`；共享场景 `{"kind":"grass","occlude":false,"grassScale":2,"side":"left"}`；取景 `{"at":[153.67,-168.23],"scale":0.95}`。
- **旁白**：它站在彩纸上，<br>笑眯眯地等你。
- **提示**：一起拍拍手。
- **纸书提示**：一起拍拍手。
- **原朗读稿（核对用）**：它站在彩纸上，笑眯眯地等你。一起拍拍手。
- **共读分类**：`"simulate"`。
- **屏幕动作**：一起试试；动作 `"clap"`；对象 `"character"`；热区 `[252.3,361.83]`，大小 463.43。
- **紧邻后页核对**：p49 旁白：啪！它跟着你左右摇。

#### p49 · 右页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-cream","colors":["--wash-yellow"],"gap":"--paper","cover":"all","focus":[0,500]}`；角色 `{"pose":"yield","at":[230,270],"scale":0.65,"spiral":true}`；道具 `[{"id":"K2-red","kind":"paper-red","at":[380,760],"scale":0.09},{"id":"K2-blue","kind":"paper-blue","at":[600,770],"scale":0.1},{"id":"K2-yellow","kind":"paper-yellow","at":[760,690],"scale":0.1}]`；共享场景 `{"kind":"grass","occlude":false,"grassScale":2,"side":"right"}`；取景 `{"at":[153.67,-168.23],"scale":0.95}`。
- **旁白**：啪！它跟着你左右摇。
- **原朗读稿（核对用）**：啪！它跟着你左右摇。
- **共读分类**：`"autonomous"`；紧邻承接 p48。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S24 · p50｜p51

来源：[50-spin.js](../../../src/content/books/awulubo/specs/50-spin.js)。

#### p50 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream","focus":[1000,500]}`；角色 `{"pose":"side","at":[150,285],"scale":0.6,"spiral":true}`；道具 `[{"id":"apple-F","kind":"apple","at":[10,710],"scale":0.075},{"id":"apple-G","kind":"apple","at":[90,710],"scale":0.075},{"id":"apple-H","kind":"apple","at":[170,710],"scale":0.075},{"id":"K2-red","kind":"paper-red","at":[380,760],"scale":0.09},{"id":"K2-blue","kind":"paper-blue","at":[600,770],"scale":0.1},{"id":"K2-yellow","kind":"paper-yellow","at":[760,710],"scale":0.1}]`；共享场景 `{"kind":"grass","occlude":false,"grassScale":2,"side":"left"}`；取景 `{"at":[145,159],"scale":0.83}`。
- **旁白**：彩纸慢慢落下。
- **提示**：慢慢转一转。
- **纸书提示**：慢慢转一转。
- **原朗读稿（核对用）**：彩纸慢慢落下。慢慢转一转。
- **共读分类**：`"simulate"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p51 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream","focus":[0,500]}`；角色 `{"pose":"lean-rest","at":[240,290],"scale":0.6,"spiral":false}`；道具 `[{"id":"K2-red","kind":"paper-red","at":[380,760],"scale":0.09},{"id":"K2-blue","kind":"paper-blue","at":[600,770],"scale":0.1},{"id":"K2-yellow","kind":"paper-yellow","at":[760,730],"scale":0.1}]`；共享场景 `{"kind":"grass","occlude":false,"grassScale":2,"side":"right"}`；取景 `{"at":[145,159],"scale":0.83}`。
- **旁白**：它转半圈，靠在你身边。
- **原朗读稿（核对用）**：它转半圈，靠在你身边。
- **共读分类**：`"autonomous"`；紧邻承接 p50。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S25 · p52｜p53

来源：[52-stomp.js](../../../src/content/books/awulubo/specs/52-stomp.js)。

#### p52 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream","focus":[1000,500]}`；角色 `{"pose":"poised","at":[130,255],"scale":0.65,"spiral":true}`；道具 `[{"id":"apple-F","kind":"apple","at":[10,710],"scale":0.075},{"id":"apple-G","kind":"apple","at":[90,710],"scale":0.075},{"id":"apple-H","kind":"apple","at":[170,710],"scale":0.075},{"id":"K2-red","kind":"paper-red","at":[380,760],"scale":0.09},{"id":"K2-blue","kind":"paper-blue","at":[600,770],"scale":0.1},{"id":"K2-yellow","kind":"paper-yellow","at":[760,755],"scale":0.1}]`；共享场景 `{"kind":"grass","occlude":false,"grassScale":2,"side":"left"}`；取景 `{"at":[81.95,-239.64],"scale":1.05}`。
- **旁白**：最后一片彩纸落在脚边。
- **提示**：轻轻跺一下脚。
- **纸书提示**：轻轻跺一下脚。
- **原朗读稿（核对用）**：最后一片彩纸落在脚边。轻轻跺一下脚。
- **共读分类**：`"simulate"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p53 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream","focus":[0,500]}`；角色 `{"pose":"beaming-lean","at":[240,285],"scale":0.6,"spiral":true}`；道具 `[{"id":"K2-red","kind":"paper-red","at":[380,760],"scale":0.09},{"id":"K2-blue","kind":"paper-blue","at":[600,770],"scale":0.1},{"id":"K2-yellow","kind":"paper-yellow","at":[760,755],"scale":0.1}]`；共享场景 `{"kind":"grass","occlude":false,"grassScale":2,"side":"right"}`；取景 `{"at":[81.95,-239.64],"scale":1.05}`。
- **旁白**：咚。它跟着跺一下，停住了。
- **原朗读稿（核对用）**：咚。它跟着跺一下，停住了。
- **共读分类**：`"autonomous"`；紧邻承接 p52。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S26 · p54｜p55

来源：[54-sleepy.js](../../../src/content/books/awulubo/specs/54-sleepy.js)。

#### p54 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-night","focus":[1000,500]}`；角色 `{"pose":"sleepy","at":[130,255],"scale":0.65,"spiral":true}`；道具 `[{"id":"apple-F","kind":"apple","at":[10,710],"scale":0.075,"style":"opacity:.4"},{"id":"apple-G","kind":"apple","at":[90,710],"scale":0.075,"style":"opacity:.4"},{"id":"apple-H","kind":"apple","at":[170,710],"scale":0.075,"style":"opacity:.4"},{"id":"K2-red","kind":"paper-red","at":[380,760],"scale":0.09,"style":"opacity:.4"},{"id":"K2-blue","kind":"paper-blue","at":[600,770],"scale":0.1,"style":"opacity:.4"},{"id":"K2-yellow","kind":"paper-yellow","at":[760,755],"scale":0.1,"style":"opacity:.4"}]`；共享场景 `{"kind":"grass","light":"night","occlude":false,"grassScale":2,"side":"left"}`；取景 `{"at":[136.44,141.53],"scale":0.85}`。
- **旁白**：天黑了，噜啵的眼皮垂下来。
- **原朗读稿（核对用）**：天黑了，噜啵的眼皮垂下来。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p55 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-night","focus":[0,500]}`；角色 `{"pose":"yawn","at":[240,255],"scale":0.65,"spiral":true}`；道具 `[{"id":"K2-red","kind":"paper-red","at":[380,760],"scale":0.09,"style":"opacity:.4"},{"id":"K2-blue","kind":"paper-blue","at":[600,770],"scale":0.1,"style":"opacity:.4"},{"id":"K2-yellow","kind":"paper-yellow","at":[760,755],"scale":0.1,"style":"opacity:.4"}]`；共享场景 `{"kind":"grass","light":"night","occlude":false,"grassScale":2,"side":"right"}`；取景 `{"at":[136.44,141.53],"scale":0.85}`。
- **旁白**：啊——好长一个哈欠。
- **原朗读稿（核对用）**：啊——好长一个哈欠。
- **共读分类**：`"autonomous"`；紧邻承接 p54。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S27 · p56｜p57

来源：[56-night.js](../../../src/content/books/awulubo/specs/56-night.js)。

#### p56 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--night-deep","focus":[1000,500]}`；角色 `{"pose":"curled","at":[160,310],"scale":0.6,"spiral":false}`；道具 `[{"id":"apple-F","kind":"apple","at":[10,710],"scale":0.075,"style":"opacity:.22"},{"id":"apple-G","kind":"apple","at":[90,710],"scale":0.075,"style":"opacity:.22"},{"id":"apple-H","kind":"apple","at":[170,710],"scale":0.075,"style":"opacity:.22"},{"id":"K2-red","kind":"paper-red","at":[380,760],"scale":0.09,"style":"opacity:.22"},{"id":"K2-blue","kind":"paper-blue","at":[600,770],"scale":0.1,"style":"opacity:.22"},{"id":"K2-yellow","kind":"paper-yellow","at":[760,755],"scale":0.1,"style":"opacity:.22"}]`；共享场景 `{"kind":"grass","light":"late-night","occlude":false,"grassScale":2,"side":"left"}`；取景 `{"at":[174.94,135.89],"scale":0.76}`。
- **旁白**：晚安，噜啵。
- **提示**：轻轻翻过去。
- **纸书提示**：轻轻翻过去。
- **原朗读稿（核对用）**：晚安，噜啵。轻轻翻过去。
- **共读分类**：`"observe"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p57 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--night-deep","focus":[0,500]}`；角色 `{"pose":"sleep-curled","at":[270,310],"scale":0.6,"spiral":false}`；道具 `[{"id":"K2-red","kind":"paper-red","at":[380,760],"scale":0.09,"style":"opacity:.22"},{"id":"K2-blue","kind":"paper-blue","at":[600,770],"scale":0.1,"style":"opacity:.22"},{"id":"K2-yellow","kind":"paper-yellow","at":[760,755],"scale":0.1,"style":"opacity:.22"}]`；共享场景 `{"kind":"grass","light":"late-night","occlude":false,"grassScale":2,"side":"right"}`；取景 `{"at":[174.94,135.89],"scale":0.76}`。
- **旁白**：呼噜……
- **原朗读稿（核对用）**：呼噜……
- **共读分类**：`"autonomous"`；紧邻承接 p56。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S28 · p58｜p59

来源：[58-tomorrow.js](../../../src/content/books/awulubo/specs/58-tomorrow.js)。

#### p58 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--night-deep","focus":[1000,500]}`；角色 `{"pose":"sleep-curled","at":[160,310],"scale":0.6,"spiral":false}`；道具 `[{"id":"apple-F","kind":"apple","at":[10,710],"scale":0.075,"style":"opacity:.22"},{"id":"apple-G","kind":"apple","at":[90,710],"scale":0.075,"style":"opacity:.22"},{"id":"apple-H","kind":"apple","at":[170,710],"scale":0.075,"style":"opacity:.22"},{"id":"K2-red","kind":"paper-red","at":[380,760],"scale":0.09,"style":"opacity:.22"},{"id":"K2-blue","kind":"paper-blue","at":[600,770],"scale":0.1,"style":"opacity:.22"},{"id":"K2-yellow","kind":"paper-yellow","at":[760,755],"scale":0.1,"style":"opacity:.22"}]`；共享场景 `{"kind":"grass","light":"late-night","occlude":false,"grassScale":2,"side":"left"}`；取景 `{"at":[174.94,135.89],"scale":0.76}`。
- **旁白**：它睡着了。
- **原朗读稿（核对用）**：它睡着了。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p59 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--night-deep","focus":[0,500]}`；角色 `{"pose":"sleep-curled","at":[270,310],"scale":0.6,"spiral":false}`；道具 `[{"id":"K2-red","kind":"paper-red","at":[380,760],"scale":0.09,"style":"opacity:.22"},{"id":"K2-blue","kind":"paper-blue","at":[600,770],"scale":0.1,"style":"opacity:.22"},{"id":"K2-yellow","kind":"paper-yellow","at":[760,755],"scale":0.1,"style":"opacity:.22"}]`；共享场景 `{"kind":"grass","light":"late-night","occlude":false,"grassScale":2,"side":"right"}`；取景 `{"at":[174.94,135.89],"scale":0.76}`。
- **旁白**：明天见。
- **原朗读稿（核对用）**：明天见。
- **共读分类**：`"autonomous"`；紧邻承接 p58。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### p60｜p61 · 前后置

来源：[60-back.js](../../../src/content/books/awulubo/specs/60-back.js)。

#### p60 · 左页（仅纸书）

- **画面记录**：背景 `{}`；角色 `null`；道具 `[{"id":"spiral-1","kind":"spiral","at":[430,640],"scale":0.14}]`。
- **旁白**：《啊呜噜啵！》
- **成人文字**：一个要你喂的小怪物<br>文字与插画：rockbenben<br>出版：＿＿＿＿＿＿＿　初版：＿＿＿＿年＿＿月<br>作品内容：CC BY-NC-ND 4.0，非商业分享请署名。<br>字体：站酷快乐体 · 霞鹜文楷（SIL OFL 1.1），可商用、可嵌入出版物。<br>（空行）<br>编者说：从接受喂食到主动找孩子、赠送颜色。读到犹豫的地方，可以停一停，听孩子怎么说。
- **原朗读稿（核对用）**：《啊呜噜啵！》
一个要你喂的小怪物
文字与插画：rockbenben
出版：＿＿＿＿＿＿＿　初版：＿＿＿＿年＿＿月
作品内容：CC BY-NC-ND 4.0，非商业分享请署名。
字体：站酷快乐体 · 霞鹜文楷（SIL OFL 1.1），可商用、可嵌入出版物。

编者说：从接受喂食到主动找孩子、赠送颜色。读到犹豫的地方，可以停一停，听孩子怎么说。
- **屏幕动作**：未声明专属热区；共读与翻页，角色可有通用反馈。

#### p61 · 右页（仅纸书）

- **画面记录**：背景 `{}`；角色 `null`；道具 `[{"id":"spiral-1","kind":"spiral","at":[430,130],"scale":0.14}]`。
- **旁白**：怎么读这本册子
- **成人文字**：旁白慢慢念，拟声让孩子接着说。指认、拍手、呼气都可以在共读时一起做，不要求每页都做动作。孩子没有回应时，可以等一等，也可以翻过去。<br>这册可以特别停在：p42–p43 叫到回应与 p46–p47 送颜色。让孩子说说看，不急着给答案。<br>睡前最后几跨，声音逐渐放轻。孩子想停在某一页，就在那里停一会儿。
- **原朗读稿（核对用）**：怎么读这本册子
旁白慢慢念，拟声让孩子接着说。指认、拍手、呼气都可以在共读时一起做，不要求每页都做动作。孩子没有回应时，可以等一等，也可以翻过去。
这册可以特别停在：p42–p43 叫到回应与 p46–p47 送颜色。让孩子说说看，不急着给答案。
睡前最后几跨，声音逐渐放轻。孩子想停在某一页，就在那里停一会儿。
- **屏幕动作**：未声明专属热区；共读与翻页，角色可有通用反馈。

### p62｜p63 · 前后置

来源：[60-back.js](../../../src/content/books/awulubo/specs/60-back.js)。

#### p62 · 左页

- **画面记录**：背景 `{"kind":"rays-tight","colors":["--yellow-deep","--yellow"],"gap":"--paper","focus":[500,700],"cover":"all","wash":"--yellow"}`；角色 `{"pose":"happy","at":[540,450],"scale":0.52,"spiral":true}`；道具 `[{"id":"arrow-1","kind":"arrow","at":[120,420],"scale":0.72,"class":"prop-arrow"}]`。
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

- **画面记录**：背景 `{}`；角色 `null`；道具 `[{"id":"star-1","kind":"star","at":[120,140],"scale":0.18,"rotate":14},{"id":"apple-1","kind":"apple","at":[620,90],"scale":0.2,"rotate":-10},{"id":"fish-1","kind":"fish","at":[300,380],"scale":0.2,"rotate":-18},{"id":"star-2","kind":"star","at":[760,520],"scale":0.15,"rotate":8},{"id":"apple-2","kind":"apple","at":[120,660],"scale":0.16,"rotate":16},{"id":"fish-2","kind":"fish","at":[480,760],"scale":0.17,"rotate":12},{"id":"star-3","kind":"star","at":[840,820],"scale":0.13,"rotate":-14}]`。
- **原朗读稿（核对用）**：后环衬：苹果、小鱼、星星散落在纸上。
- **屏幕动作**：未声明专属热区；共读与翻页，角色可有通用反馈。

### p64 · 前后置

来源：[60-back.js](../../../src/content/books/awulubo/specs/60-back.js)。

#### p64 · 单页（仅纸书）

- **画面记录**：背景 `{"kind":"rays","colors":["--red-deep","--red"],"gap":"--red","focus":[500,680],"cover":"all","wash":"--red"}`；角色 `{"pose":"happy","state":"on-color state-red","at":[260,420],"scale":0.58,"spiral":true}`；道具 `[{"id":"blob-1","kind":"blob","at":[240,-132],"scale":0.5}]`。
- **旁白**：《啊呜噜啵！》
- **大字／拟声词**：啊呜！
- **原朗读稿（核对用）**：《啊呜噜啵！》啊呜！
- **屏幕动作**：未声明专属热区；共读与翻页，角色可有通用反馈。

## 快照溯源

本册来源 SHA-256：`bfd3833e7b697d5c4c522da6ddc035e69bff3e93dc93b429f7b1a58b742bab7c`。摘要依次连接 reader-ui.js、book.json 与读取顺序下去重的书稿文件的“仓库相对路径 + 换行 + 统一 LF 的 UTF-8 文本 + 换行”。数据区含全部数字与初始显隐；内容变更后重新运行生成命令。设计契约仍以设计规格为准。
