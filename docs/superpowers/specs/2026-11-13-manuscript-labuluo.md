# 第二册《噜啵生病啦！》完整文字剧本

整理日期：2026-11-13。性质：当前工作区书稿的审阅快照，包含未提交修改；未改写原文。设计契约仍为[设计规格](2026-10-30-awulubo-picture-book-design.md)，逐字现稿仍以 src/content/books/labuluo/specs/ 为准。

[返回五册审稿总览](2026-11-13-manuscript-review.md)。本册 64 页，其中正文 28 跨、56 页，屏幕显示 60 页。跨页直接采用 loadBooks() 返回的 spreads（底层使用 model.ts 的 physicalSpreads），保留书稿顺序。

## 故事与节奏

噜啵今天没有像往常一样叫，孩子找到生病的它，盖毯子、喂水、喂药，陪它入睡并在半夜守着。天亮后它渐渐恢复，愿意吃苹果、站起来和一起跑跳，最后两人安心睡下。

| 页段 | 故事任务 | 节奏与审阅重点 |
|---|---|---|
| p04–p11 | 发现异常 | 没叫→寻找→摸到发烫→想办法。 |
| p12–p19 | 照顾遇到阻力 | 盖毯子、拒水后喝一口、拒药后吃药。 |
| p20–p25 | 苦味高点与安慰 | 皱脸→轻拍→唱歌→入睡。 |
| p26–p35 | 守夜与等待 | 半夜醒来、陪坐、早晨仍在等；保持缓慢有其情节理由。 |
| p36–p45 | 恢复行动 | 醒来→吃苹果→站起→跳→跟上跑步。 |
| p46–p49 | 康复庆祝 | 跑跳、确认好了、再以变红确认一次。 |
| p50–p59 | 安心入睡 | 玩累、晚安、相伴、呼噜、明天见。 |

本册先审：保留整套照顾与守夜的独立弧线；优先补齐 p06 寻找对象与文字的对应，并审 p40–p49 的多次“好了”是否逐次增加了信息。

## 阅读说明

- 下面保留全部现稿旁白、大字、提示及成人文字；纸书没有覆写的槽位沿用现稿。仅在有 print 声明时单列纸书版本，空串如实标注。原文换行以行内换行保留，数组空行单独标注。
- “画面记录”只根据书稿中的底色、笔触、角色姿态与道具整理，不是看图后的构图结论；道具数按声明计，具体遮挡与可见性待粗分镜或校样核对。
- “原朗读稿”逐字保留 aria，供检查它是否与可见文字同步；它可能含旧文案，不能代替当前旁白，也不能当作画面事实。
- “屏幕回应”根据 interactions.js 静态阅读整理，尚未操作验证。无专属热区的页仍可有共读动作。普通完成动作交给阅读状态机处理；宽屏需整组完成后才向前，不能把后页文字出现时机等同于单页翻页。
- 每个动作页另列紧邻后页旁白，便于人工审查承诺与兑现；这不是自动判定因果成立。同页动画与后页剧情各有作用。前后置按真实装订成组，p59 后的 p60 为版权页。

## 逐跨页剧本

本节由 `node tools/manuscript.mjs` 从当前工作区生成；人工故事与节奏审阅保留在前文。画面记录是书稿数据，不代替看图；动作记录是声明，不代替操作验收。

**本册屏幕共读提示**：这一册孩子是照顾人的那个。念到「苦」那页可以问一句「苦不苦？」；药只能大人拿。

### p01 · 前后置

来源：[01-front.js](../../../src/content/books/labuluo/specs/01-front.js)。

#### p01 · 单页

- **画面记录**：背景 `{"kind":"rays","colors":["--blue","--deep-blue"],"gap":"--blue","focus":[500,560],"wash":"--blue"}`；角色 `null`；道具 `[{"id":"paper-narration","kind":"blob","at":[226.5,52.1],"scale":0.53},{"id":"blanket-1","kind":"blanket","at":[170,470],"scale":0.7}]`。
- **大字／拟声词**：噜啵生病啦！
- **旁白**：一个要你照顾的小怪物
- **提示**：点我，开始。
- **纸书提示**：（空串）
- **原朗读稿（核对用）**：《噜啵生病啦！》一个要你照顾的小怪物。点我，开始。
- **屏幕动作**：点封面开始阅读；动作 `"start"`；对象 `"page"`；热区 `[0,0]`，大小 1000。
- **紧邻后页核对**：p02 旁白：（无旁白）

### p02｜p03 · 前后置

来源：[01-front.js](../../../src/content/books/labuluo/specs/01-front.js)。

#### p02 · 左页

- **画面记录**：背景 `{}`；角色 `null`；道具 `[{"id":"cup-1","kind":"cup","at":[120,120],"scale":0.2,"rotate":-8},{"id":"blanket-1","kind":"blanket","at":[300,330],"scale":0.22,"rotate":-4},{"id":"apple-1","kind":"apple","at":[700,460],"scale":0.15,"rotate":18},{"id":"cup-2","kind":"cup","at":[80,600],"scale":0.17,"rotate":14}]`。
- **原朗读稿（核对用）**：前环衬：毯子与杯子。
- **屏幕动作**：未声明专属热区；共读与翻页，角色可有通用反馈。

#### p03 · 右页

- **画面记录**：背景 `{"kind":"rays-tight","colors":["--purple","--blue"],"focus":[500,760],"wash":"--wash-purple"}`；角色 `null`；道具 `[{"id":"paper-narration","kind":"blob","at":[226.5,62.1],"scale":0.53},{"id":"paper-sound","kind":"blob","at":[148.2,-227.8],"scale":0.68},{"id":"blanket-1","kind":"blanket","at":[230,540],"scale":0.7}]`。
- **大字／拟声词**：噜啵生病啦！
- **旁白**：一个要你照顾的小怪物
- **原朗读稿（核对用）**：扉页：《噜啵生病啦！》一个要你照顾的小怪物。
- **屏幕动作**：未声明专属热区；共读与翻页，角色可有通用反馈。

### S01 · p04｜p05

来源：[04-quiet.js](../../../src/content/books/labuluo/specs/04-quiet.js)。

#### p04 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-blue","focus":[1000,500]}`；角色 `null`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket","at":[165,430],"scale":0.74}]`；共享场景 `{"kind":"window-nook","side":"left"}`；取景 `{"at":[71.17,82.47],"scale":0.9}`。
- **旁白**：蓝蓝的屋里，没听见咕噜声。
- **提示**：轻轻叫叫噜啵。
- **纸书提示**：轻轻叫叫噜啵。
- **原朗读稿（核对用）**：蓝蓝的屋里，没听见咕噜声。
轻轻叫叫噜啵。
- **共读分类**：`"simulate"`。
- **屏幕动作**：轻轻叫叫噜啵；动作 `"poke"`；对象 `"blanket-1"`；热区 `[200,470]`，大小 650。
- **紧邻后页核对**：p05 旁白：噜……毯子里鼓起小小一团。

#### p05 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-blue","focus":[0,500]}`；角色 `null`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket","at":[155,414],"scale":0.74}]`；共享场景 `{"kind":"window-nook","side":"right"}`；取景 `{"at":[71.17,82.47],"scale":0.9}`。
- **旁白**：噜……毯子里鼓起小小一团。
- **原朗读稿（核对用）**：噜……毯子里鼓起小小一团。
- **共读分类**：`"autonomous"`；紧邻承接 p04。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S02 · p06｜p07

来源：[06-where.js](../../../src/content/books/labuluo/specs/06-where.js)。

#### p06 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-blue","focus":[1000,500]}`；角色 `null`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket-corner","at":[170,430],"scale":0.5}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[62.45,-407.33],"scale":1.2}`。
- **旁白**：杯子旁，露出一角毯子。
- **提示**：指指那角毯子。
- **纸书提示**：指指那角毯子。
- **原朗读稿（核对用）**：杯子旁，露出一角毯子。
指指那角毯子。
- **共读分类**：`"observe"`。
- **屏幕动作**：指指那角毯子；动作 `"find"`；对象 `"blanket-1"`；热区 `[210,470]`，大小 380。
- **紧邻后页核对**：p07 旁白：毯子一角，两只小脚露出来。

#### p07 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-blue","focus":[0,500]}`；角色 `{"pose":"hidden-feet","at":[170,360],"scale":0.6,"spiral":false,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket","at":[170,470],"scale":0.6}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[62.45,-407.33],"scale":1.2}`。
- **旁白**：毯子一角，两只小脚露出来。
- **原朗读稿（核对用）**：毯子一角，两只小脚露出来。
- **共读分类**：`"autonomous"`；紧邻承接 p06。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S03 · p08｜p09

来源：[08-still.js](../../../src/content/books/labuluo/specs/08-still.js)。

#### p08 · 左页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-blue","colors":["--wash-blue"],"gap":"--paper","cover":"all","focus":[1000,500]}`；角色 `{"pose":"sick-curled","at":[230,300],"scale":0.62,"spiral":true,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket","at":[220,510],"scale":0.58,"layer":"behind"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[-110.26,-367.73],"scale":1.35}`。
- **旁白**：它蜷着，肚子贴着地。
- **提示**：轻轻摸一下。
- **纸书提示**：轻轻摸一下。
- **原朗读稿（核对用）**：它蜷着，肚子贴着地。
轻轻摸一下。
- **共读分类**：`"simulate"`。
- **屏幕动作**：轻轻摸一下；动作 `"poke"`；对象 `"character"`；热区 `[328.77,548.8]`，大小 403.14。
- **紧邻后页核对**：p09 旁白：呀，肚子热热的。

#### p09 · 右页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-blue","colors":["--wash-blue"],"gap":"--paper","cover":"all","focus":[0,500]}`；角色 `{"pose":"sick-curled","at":[260,300],"scale":0.62,"spiral":true,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket","at":[220,510],"scale":0.58,"layer":"behind"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[-110.26,-367.73],"scale":1.35}`。
- **旁白**：呀，肚子热热的。
- **原朗读稿（核对用）**：呀，肚子热热的。
- **共读分类**：`"autonomous"`；紧邻承接 p08。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S04 · p10｜p11

来源：[10-sick.js](../../../src/content/books/labuluo/specs/10-sick.js)。

#### p10 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-blue","focus":[1000,500]}`；角色 `{"pose":"sick-raised","at":[210,300],"scale":0.62,"spiral":true,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket","at":[220,510],"scale":0.58,"layer":"behind"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[-54.79,-438.79],"scale":1.3}`。
- **旁白**：你生病啦？
- **原朗读稿（核对用）**：你生病啦？
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p11 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-blue","focus":[0,500]}`；角色 `{"pose":"prone","at":[260,300],"scale":0.62,"spiral":true,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket","at":[220,510],"scale":0.58,"layer":"behind"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[-54.79,-438.79],"scale":1.3}`。
- **旁白**：它抬抬头，又软软地趴下。
- **原朗读稿（核对用）**：它抬抬头，又软软地趴下。
- **共读分类**：`"autonomous"`；紧邻承接 p10。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S05 · p12｜p13

来源：[12-care.js](../../../src/content/books/labuluo/specs/12-care.js)。

#### p12 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-blue","focus":[1000,500]}`；角色 `{"pose":"listen-low","at":[210,300],"scale":0.62,"spiral":true,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket","at":[220,510],"scale":0.58,"layer":"behind"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[-70.37,-201.42],"scale":1.15}`。
- **旁白**：我陪着你。
- **提示**：坐近一点。
- **纸书提示**：坐近一点。
- **原朗读稿（核对用）**：我陪着你。
坐近一点。
- **共读分类**：`"simulate"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p13 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-blue","focus":[0,500]}`；角色 `{"pose":"lean-close","at":[245,315],"scale":0.66,"spiral":false,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket","at":[220,510],"scale":0.58,"layer":"behind"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[-70.37,-201.42],"scale":1.15}`。
- **旁白**：它往你身边靠了靠。
- **原朗读稿（核对用）**：它往你身边靠了靠。
- **共读分类**：`"autonomous"`；紧邻承接 p12。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S06 · p14｜p15

来源：[14-water.js](../../../src/content/books/labuluo/specs/14-water.js)。

#### p14 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-blue","focus":[1000,500]}`；角色 `{"pose":"look-down","at":[120,270],"scale":0.54,"spiral":true,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket","at":[620,540],"scale":0.3,"class":"prop-blanket"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[-85.51,-97.18],"scale":1.12}`。
- **旁白**：毯子就在旁边。
- **提示**：把毯子盖上。
- **纸书提示**：把毯子盖上。
- **原朗读稿（核对用）**：毯子就在旁边。
把毯子盖上。
- **共读分类**：`"simulate"`。
- **屏幕动作**：把毯子盖上；动作 `"cover"`；对象 `"blanket-1"`；热区 `[625,550]`，大小 300。
- **紧邻后页核对**：p15 旁白：盖好了，只露出两只眼睛。

#### p15 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-blue","focus":[0,500]}`；角色 `{"pose":"hidden-eyes","at":[160,261],"scale":0.65,"spiral":false,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket","at":[190,440],"scale":0.65}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[-85.51,-97.18],"scale":1.12}`。
- **旁白**：盖好了，只露出两只眼睛。
- **原朗读稿（核对用）**：盖好了，只露出两只眼睛。
- **共读分类**：`"autonomous"`；紧邻承接 p14。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S07 · p16｜p17

来源：[16-sip.js](../../../src/content/books/labuluo/specs/16-sip.js)。

#### p16 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-blue","focus":[1000,500]}`；角色 `{"pose":"tired","at":[280,300],"scale":0.58,"spiral":true,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[640,400],"scale":0.34,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket-fold","at":[275,550],"scale":0.58}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[-105.09,-298.33],"scale":1.07}`。
- **旁白**：毯边落低，它抿嘴不想喝。
- **提示**：把杯子放一放。
- **纸书提示**：把杯子放一放。
- **原朗读稿（核对用）**：毯边落低，它抿嘴不想喝。
把杯子放一放。
- **共读分类**：`"simulate"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p17 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-blue","focus":[0,500]}`；角色 `{"pose":"turn-away","at":[280,300],"scale":0.58,"spiral":true,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[730,670],"scale":0.26,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket-fold","at":[275,550],"scale":0.58}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[-105.09,-298.33],"scale":1.07}`。
- **旁白**：它转开脸，你把杯子放下。
- **原朗读稿（核对用）**：它转开脸，你把杯子放下。
- **共读分类**：`"autonomous"`；紧邻承接 p16。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S08 · p18｜p19

来源：[18-pill.js](../../../src/content/books/labuluo/specs/18-pill.js)。

#### p18 · 左页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-blue","colors":["--wash-blue"],"gap":"--paper","cover":"all","focus":[1000,500]}`；角色 `{"pose":"willing","at":[280,300],"scale":0.58,"spiral":true,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[730,670],"scale":0.26,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket-fold","at":[275,550],"scale":0.58}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[-81.21,-149.95],"scale":1.08}`。
- **旁白**：它自己转回脸，<br>朝杯子张开嘴。
- **提示**：把杯子递近些。
- **纸书提示**：把杯子递近些。
- **原朗读稿（核对用）**：它自己转回脸，朝杯子张开嘴。
把杯子递近些。
- **共读分类**：`"simulate"`。
- **屏幕动作**：把杯子递近些；动作 `"water"`；对象 `"cup-1"`；热区 `[740,700]`，大小 250。
- **紧邻后页核对**：p19 旁白：咕嘟。它只喝了一小口。

#### p19 · 右页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-blue","colors":["--wash-blue"],"gap":"--paper","cover":"all","focus":[0,500]}`；角色 `{"pose":"sip","at":[280,300],"scale":0.58,"spiral":true,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket-fold","at":[275,550],"scale":0.58}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[-81.21,-149.95],"scale":1.08}`。
- **旁白**：咕嘟。它只喝了一小口。
- **原朗读稿（核对用）**：咕嘟。它只喝了一小口。
- **共读分类**：`"autonomous"`；紧邻承接 p18。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S09 · p20｜p21

来源：[20-bitter.js](../../../src/content/books/labuluo/specs/20-bitter.js)。

#### p20 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-blue","focus":[1000,500]}`；角色 `{"pose":"willing","at":[80,290],"scale":0.62,"spiral":true,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket-fold","at":[275,550],"scale":0.58},{"id":"medicine-adult","kind":"medicine-adult","at":[322,452],"scale":0.8}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[-91.97,-215.87],"scale":1.18}`。
- **旁白**：大人拿来药，噜啵吃了一口。
- **原朗读稿（核对用）**：大人拿来药，噜啵吃了一口。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p21 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-red","focus":[0,500]}`；角色 `{"pose":"bitter-curled","at":[275,300],"scale":0.62,"spiral":true,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket-lap","at":[235,560],"scale":0.62}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[-91.97,-215.87],"scale":1.18}`。
- **旁白**：苦！嘴皱扁了，<br>红色一下铺开！
- **原朗读稿（核对用）**：苦！嘴皱扁了，红色一下铺开！
- **共读分类**：`"autonomous"`；紧邻承接 p20。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S10 · p22｜p23

来源：[22-soothe.js](../../../src/content/books/labuluo/specs/22-soothe.js)。

#### p22 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-red","focus":[1000,500]}`；角色 `{"pose":"listen-low","at":[210,300],"scale":0.62,"spiral":true,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket-fold","at":[275,550],"scale":0.58}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[89.57,-296.43],"scale":1.06}`。
- **旁白**：你就在旁边。
- **提示**：轻轻拍拍它。
- **纸书提示**：轻轻拍拍它。
- **原朗读稿（核对用）**：你就在旁边。
轻轻拍拍它。
- **共读分类**：`"simulate"`。
- **屏幕动作**：轻轻拍拍它；动作 `"poke"`；对象 `"character"`；热区 `[297.43,507.92]`，大小 453.69。
- **紧邻后页核对**：p23 旁白：它向你一歪，<br>红色慢慢淡下去。

#### p23 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-pink","focus":[0,500]}`；角色 `{"pose":"lean-close","at":[245,315],"scale":0.66,"spiral":false,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket-fold","at":[275,550],"scale":0.58}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[89.57,-296.43],"scale":1.06}`。
- **旁白**：它向你一歪，<br>红色慢慢淡下去。
- **原朗读稿（核对用）**：它向你一歪，红色慢慢淡下去。
- **共读分类**：`"autonomous"`；紧邻承接 p22。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S11 · p24｜p25

来源：[24-song.js](../../../src/content/books/labuluo/specs/24-song.js)。

#### p24 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-pink","focus":[1000,500]}`；角色 `{"pose":"sick-curled","at":[230,300],"scale":0.62,"spiral":true,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket-lap","at":[235,560],"scale":0.62}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[72.21,3.51],"scale":0.95}`。
- **旁白**：屋里静下来。
- **提示**：轻轻哼一小段。
- **纸书提示**：轻轻哼一小段。
- **原朗读稿（核对用）**：屋里静下来。
轻轻哼一小段。
- **共读分类**：`"simulate"`。
- **屏幕动作**：轻轻哼一小段；动作 `"poke"`；对象 `"character"`；热区 `[328.77,548.8]`，大小 403.14。
- **紧邻后页核对**：p25 旁白：夜蓝色里，<br>只剩毯子轻轻起伏。

#### p25 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--night","focus":[0,500]}`；角色 `{"pose":"covered-rest","at":[260,300],"scale":0.62,"spiral":false,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket-lap","at":[235,560],"scale":0.62}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[72.21,3.51],"scale":0.95}`。
- **旁白**：夜蓝色里，<br>只剩毯子轻轻起伏。
- **原朗读稿（核对用）**：夜蓝色里，只剩毯子轻轻起伏。
- **共读分类**：`"autonomous"`；紧邻承接 p24。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S12 · p26｜p27

来源：[26-cough.js](../../../src/content/books/labuluo/specs/26-cough.js)。

#### p26 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--night","focus":[1000,500]}`；角色 `{"pose":"sick-curled","at":[230,300],"scale":0.62,"spiral":true,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket-lap","at":[235,560],"scale":0.62}]`；共享场景 `{"kind":"room","light":"night","side":"left"}`；取景 `{"at":[-94.12,-227.88],"scale":1.2}`。
- **旁白**：半夜，毯子忽然动了一下。
- **原朗读稿（核对用）**：半夜，毯子忽然动了一下。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p27 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--night","focus":[0,500]}`；角色 `{"pose":"sick-raised","at":[260,300],"scale":0.62,"spiral":true,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket-lap","at":[235,560],"scale":0.62}]`；共享场景 `{"kind":"room","light":"night","side":"right"}`；取景 `{"at":[-94.12,-227.88],"scale":1.2}`。
- **旁白**：咳。你醒来，到了它身边。
- **原朗读稿（核对用）**：咳。你醒来，到了它身边。
- **共读分类**：`"autonomous"`；紧邻承接 p26。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S13 · p28｜p29

来源：[28-awake.js](../../../src/content/books/labuluo/specs/28-awake.js)。

#### p28 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--night","focus":[1000,500]}`；角色 `{"pose":"sick-curled","at":[230,300],"scale":0.62,"spiral":true,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket-lap","at":[235,560],"scale":0.62}]`；共享场景 `{"kind":"room","light":"night","side":"left"}`；取景 `{"at":[117.24,73.66],"scale":0.85}`。
- **旁白**：它的呼吸慢下来。
- **提示**：陪它坐一会儿。
- **纸书提示**：陪它坐一会儿。
- **原朗读稿（核对用）**：它的呼吸慢下来。
陪它坐一会儿。
- **共读分类**：`"simulate"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p29 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--night","focus":[0,500]}`；角色 `{"pose":"covered-rest","at":[260,300],"scale":0.62,"spiral":false,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket-lap","at":[235,560],"scale":0.62}]`；共享场景 `{"kind":"room","light":"night","side":"right"}`；取景 `{"at":[117.24,73.66],"scale":0.85}`。
- **旁白**：你坐着，听它慢慢呼气。
- **原朗读稿（核对用）**：你坐着，听它慢慢呼气。
- **共读分类**：`"autonomous"`；紧邻承接 p28。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S14 · p30｜p31

来源：[30-morning.js](../../../src/content/books/labuluo/specs/30-morning.js)。

#### p30 · 左页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-yellow","colors":["--yellow"],"gap":"--paper","cover":"all","focus":[1000,500]}`；角色 `{"pose":"sleep-curled","at":[230,300],"scale":0.62,"spiral":true,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket-lap","at":[235,560],"scale":0.62}]`；共享场景 `{"kind":"window-nook","side":"left"}`；取景 `{"at":[87.18,-326.65],"scale":1.05}`。
- **旁白**：又一个早晨，<br>窗边透进浅黄的光。
- **原朗读稿（核对用）**：又一个早晨，窗边透进浅黄的光。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p31 · 右页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-yellow","colors":["--yellow"],"gap":"--paper","cover":"all","focus":[0,500]}`；角色 `{"pose":"kick-corner","at":[260,300],"scale":0.62,"spiral":true,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket-lap-open","at":[235,560],"scale":0.62},{"id":"foot-corner","kind":"foot-pushing","at":[675,730],"scale":0.65}]`；共享场景 `{"kind":"window-nook","side":"right"}`；取景 `{"at":[87.18,-326.65],"scale":1.05}`。
- **旁白**：它伸出一只脚，蹬开毯角。
- **原朗读稿（核对用）**：它伸出一只脚，蹬开毯角。
- **共读分类**：`"autonomous"`；紧邻承接 p30。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S15 · p32｜p33

来源：[32-hungry.js](../../../src/content/books/labuluo/specs/32-hungry.js)。

#### p32 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-yellow","focus":[1000,500]}`；角色 `{"pose":"tired","at":[210,300],"scale":0.62,"spiral":true,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket-hood","at":[275,340],"scale":0.58}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[-88.74,-141.49],"scale":1.15}`。
- **旁白**：毯边搭在头顶，它还眯着眼。
- **提示**：叫一声噜啵。
- **纸书提示**：叫一声噜啵。
- **原朗读稿（核对用）**：毯边搭在头顶，它还眯着眼。
叫一声噜啵。
- **共读分类**：`"simulate"`。
- **屏幕动作**：叫一声噜啵；动作 `"poke"`；对象 `"character"`；热区 `[326.17,425.81]`，大小 405.93。
- **紧邻后页核对**：p33 旁白：它眨眨眼，又眯起来。

#### p33 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-yellow","focus":[0,500]}`；角色 `{"pose":"sick-curled","at":[260,300],"scale":0.62,"spiral":true,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket-hood","at":[270,465],"scale":0.62}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[-88.74,-141.49],"scale":1.15}`。
- **旁白**：它眨眨眼，又眯起来。
- **原朗读稿（核对用）**：它眨眨眼，又眯起来。
- **共读分类**：`"autonomous"`；紧邻承接 p32。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S16 · p34｜p35

来源：[34-apple.js](../../../src/content/books/labuluo/specs/34-apple.js)。

#### p34 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-yellow","focus":[1000,500]}`；角色 `{"pose":"tired","at":[210,300],"scale":0.62,"spiral":true,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket-drape","at":[255,435],"scale":0.62,"layer":"behind"},{"id":"apple-A","kind":"apple","at":[170,600],"scale":0.2,"class":"prop-apple"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[-99.5,-250.26],"scale":1.25}`。
- **旁白**：你把苹果放在旁边。
- **提示**：指指苹果。
- **纸书提示**：指指苹果。
- **原朗读稿（核对用）**：你把苹果放在旁边。
指指苹果。
- **共读分类**：`"observe"`。
- **屏幕动作**：指指苹果；动作 `"find"`；对象 `"apple-A"`；热区 `[170,600]`，大小 250。
- **紧邻后页核对**：p35 旁白：它的嘴巴动动，<br>身子挪近一点。

#### p35 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-yellow","focus":[0,500]}`；角色 `{"pose":"sick-raised","at":[275,300],"scale":0.62,"spiral":true,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket-drape","at":[255,435],"scale":0.62,"layer":"behind"},{"id":"apple-A","kind":"apple","at":[170,600],"scale":0.2,"class":"prop-apple"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[-99.5,-250.26],"scale":1.25}`。
- **旁白**：它的嘴巴动动，<br>身子挪近一点。
- **原朗读稿（核对用）**：它的嘴巴动动，身子挪近一点。
- **共读分类**：`"autonomous"`；紧邻承接 p34。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S17 · p36｜p37

来源：[36-open.js](../../../src/content/books/labuluo/specs/36-open.js)。

#### p36 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-yellow","focus":[1000,500]}`；角色 `{"pose":"curious-tilt","at":[210,300],"scale":0.62,"spiral":true,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket-drape","at":[255,435],"scale":0.62,"layer":"behind"},{"id":"apple-A","kind":"apple","at":[170,600],"scale":0.2,"class":"prop-apple"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[53.03,-284.06],"scale":1.09}`。
- **旁白**：它抬起头，望着你。
- **原朗读稿（核对用）**：它抬起头，望着你。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p37 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-yellow","focus":[0,500]}`；角色 `{"pose":"lean-near","at":[275,300],"scale":0.62,"spiral":true,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket-drape","at":[255,435],"scale":0.62,"layer":"behind"},{"id":"apple-A","kind":"apple","at":[170,600],"scale":0.2,"class":"prop-apple"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[53.03,-284.06],"scale":1.09}`。
- **旁白**：嘴张得大大的：啊——
- **原朗读稿（核对用）**：嘴张得大大的：啊——
- **共读分类**：`"autonomous"`；紧邻承接 p36。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S18 · p38｜p39

来源：[38-eat.js](../../../src/content/books/labuluo/specs/38-eat.js)。

#### p38 · 左页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-yellow","colors":["--yellow"],"gap":"--paper","cover":"all","focus":[1000,500]}`；角色 `{"pose":"willing","at":[210,300],"scale":0.62,"spiral":true,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket-drape","at":[255,435],"scale":0.62,"layer":"behind"},{"id":"apple-A","kind":"apple","at":[450,512],"scale":0.14,"class":"prop-apple"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[-99.5,-243.03],"scale":1.25}`。
- **旁白**：苹果来到嘴边。
- **提示**：喂它一口苹果。
- **纸书提示**：喂它一口苹果。
- **原朗读稿（核对用）**：苹果来到嘴边。
喂它一口苹果。
- **共读分类**：`"simulate"`。
- **屏幕动作**：喂它一口苹果；动作 `"feed"`；对象 `"apple-A"`；热区 `[430,490]`，大小 250。
- **紧邻后页核对**：p39 旁白：啊呜！它吃下一口。

#### p39 · 右页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-yellow","colors":["--yellow"],"gap":"--paper","cover":"all","focus":[0,500]}`；角色 `{"pose":"chew","at":[275,300],"scale":0.62,"spiral":true,"state":"state-pale"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket-drape","at":[255,435],"scale":0.62,"layer":"behind"},{"id":"apple-A","kind":"apple-bitten","at":[170,600],"scale":0.2,"class":"prop-apple"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[-99.5,-243.03],"scale":1.25}`。
- **旁白**：啊呜！它吃下一口。
- **原朗读稿（核对用）**：啊呜！它吃下一口。
- **共读分类**：`"autonomous"`；紧邻承接 p38。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S19 · p40｜p41

来源：[40-up.js](../../../src/content/books/labuluo/specs/40-up.js)。

#### p40 · 左页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-yellow","colors":["--yellow"],"gap":"--paper","cover":"all","focus":[1000,500]}`；角色 `{"pose":"rise-one","at":[370,260],"scale":0.62,"spiral":true,"state":"state-paper"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket-drape","at":[350,380],"scale":0.62,"layer":"behind"},{"id":"apple-A","kind":"apple-bitten","at":[170,600],"scale":0.2,"class":"prop-apple"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[-83.36,-100.18],"scale":1.1}`。
- **旁白**：它先伸出一只脚，踩住地。
- **原朗读稿（核对用）**：它先伸出一只脚，踩住地。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p41 · 右页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-yellow","colors":["--yellow"],"gap":"--paper","cover":"all","focus":[0,500]}`；角色 `{"pose":"ready","at":[350,260],"scale":0.62,"spiral":true,"state":"state-paper"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket-drape","at":[350,380],"scale":0.62,"layer":"behind"},{"id":"apple-A","kind":"apple-bitten","at":[170,600],"scale":0.2,"class":"prop-apple"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[-83.36,-100.18],"scale":1.1}`。
- **旁白**：另一只也落地，身子撑起来！
- **原朗读稿（核对用）**：另一只也落地，身子撑起来！
- **共读分类**：`"autonomous"`；紧邻承接 p40。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S20 · p42｜p43

来源：[42-run.js](../../../src/content/books/labuluo/specs/42-run.js)。

#### p42 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-yellow","focus":[1000,500]}`；角色 `{"pose":"poised","at":[370,260],"scale":0.62,"spiral":true,"state":"state-paper"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket","at":[210,605],"scale":0.39,"layer":"behind"},{"id":"apple-A","kind":"apple-bitten","at":[170,600],"scale":0.2,"class":"prop-apple"}]`；共享场景 `{"kind":"room","side":"left"}`；取景 `{"at":[25.38,-260.48],"scale":1.1}`。
- **旁白**：毯子落在身后，它弯弯小脚。
- **提示**：轻轻跳一下。
- **纸书提示**：轻轻跳一下。
- **原朗读稿（核对用）**：毯子落在身后，它弯弯小脚。
轻轻跳一下。
- **共读分类**：`"simulate"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p43 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-yellow","focus":[0,500]}`；角色 `{"pose":"yield","at":[350,260],"scale":0.62,"spiral":true,"state":"state-paper"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket","at":[210,605],"scale":0.39,"layer":"behind"},{"id":"apple-A","kind":"apple-bitten","at":[170,600],"scale":0.2,"class":"prop-apple"}]`；共享场景 `{"kind":"room","side":"right"}`；取景 `{"at":[25.38,-260.48],"scale":1.1}`。
- **旁白**：它跟着跳了一下，稳稳落地。
- **原朗读稿（核对用）**：它跟着跳了一下，稳稳落地。
- **共读分类**：`"autonomous"`；紧邻承接 p42。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S21 · p44｜p45

来源：[44-play.js](../../../src/content/books/labuluo/specs/44-play.js)。

#### p44 · 左页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-yellow","colors":["--yellow"],"gap":"--paper","cover":"all","focus":[1000,500]}`；角色 `{"pose":"curious-tilt","at":[370,260],"scale":0.62,"spiral":true,"state":"state-paper"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket","at":[210,605],"scale":0.39,"layer":"behind"},{"id":"apple-A","kind":"apple-bitten","at":[170,600],"scale":0.2,"class":"prop-apple"}]`；共享场景 `{"kind":"doorway","side":"left"}`；取景 `{"at":[-88.74,-118.19],"scale":1.15}`。
- **旁白**：你慢慢走到门边。
- **提示**：走两小步。
- **纸书提示**：走两小步。
- **原朗读稿（核对用）**：你慢慢走到门边。
走两小步。
- **共读分类**：`"simulate"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p45 · 右页

- **画面记录**：背景 `{"kind":"wash","wash":"--wash-yellow","colors":["--yellow"],"gap":"--paper","cover":"all","focus":[0,500]}`；角色 `{"pose":"step","at":[350,260],"scale":0.62,"spiral":true,"state":"state-paper"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup"},{"id":"blanket-1","kind":"blanket","at":[210,605],"scale":0.39,"layer":"behind"},{"id":"apple-A","kind":"apple-bitten","at":[170,600],"scale":0.2,"class":"prop-apple"}]`；共享场景 `{"kind":"doorway","side":"right"}`；取景 `{"at":[-88.74,-118.19],"scale":1.15}`。
- **旁白**：嗒、嗒，它迈大步追上来。
- **原朗读稿（核对用）**：嗒、嗒，它迈大步追上来。
- **共读分类**：`"autonomous"`；紧邻承接 p44。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S22 · p46｜p47

来源：[46-run.js](../../../src/content/books/labuluo/specs/46-run.js)。

#### p46 · 左页

- **画面记录**：背景 `{"kind":"rays","wash":"--wash-cream","colors":["--wash-yellow"],"gap":"--paper","cover":"all","focus":[1000,500]}`；角色 `{"pose":"poised","at":[370,260],"scale":0.62,"spiral":true,"state":"state-paper"}`；道具 `[]`；共享场景 `{"kind":"doorway","side":"left"}`；取景 `{"at":[-396.51,-189.39],"scale":1.3}`。
- **旁白**：门外暖黄的光铺开：一起跑！
- **提示**：原地踏两小步。
- **纸书提示**：原地踏两小步。
- **原朗读稿（核对用）**：门外暖黄的光铺开：一起跑！
原地踏两小步。
- **共读分类**：`"simulate"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p47 · 右页

- **画面记录**：背景 `{"kind":"rays","wash":"--wash-cream","colors":["--wash-yellow"],"gap":"--paper","cover":"all","focus":[0,500]}`；角色 `{"pose":"run","at":[350,260],"scale":0.62,"spiral":true,"state":"state-paper"}`；道具 `[]`；共享场景 `{"kind":"doorway","side":"right"}`；取景 `{"at":[-396.51,-189.39],"scale":1.3}`。
- **旁白**：它跟出来，和你并排跑。
- **原朗读稿（核对用）**：它跟出来，和你并排跑。
- **共读分类**：`"autonomous"`；紧邻承接 p46。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S23 · p48｜p49

来源：[48-red.js](../../../src/content/books/labuluo/specs/48-red.js)。

#### p48 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream","focus":[1000,500]}`；角色 `{"pose":"belly-offer","at":[370,260],"scale":0.62,"spiral":true,"state":"state-paper"}`；道具 `[]`；共享场景 `{"kind":"grass","occlude":false,"side":"left"}`；取景 `{"at":[-237.87,-277.44],"scale":1.19}`。
- **旁白**：它挺起圆肚子，回头看你。
- **原朗读稿（核对用）**：它挺起圆肚子，回头看你。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p49 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream","focus":[0,500]}`；角色 `{"pose":"beaming-lean","at":[350,260],"scale":0.62,"spiral":true,"state":"state-paper"}`；道具 `[]`；共享场景 `{"kind":"grass","occlude":false,"side":"right"}`；取景 `{"at":[-237.87,-277.44],"scale":1.19}`。
- **旁白**：这回，是它等着你。
- **原朗读稿（核对用）**：这回，是它等着你。
- **共读分类**：`"autonomous"`；紧邻承接 p48。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S24 · p50｜p51

来源：[50-tired.js](../../../src/content/books/labuluo/specs/50-tired.js)。

#### p50 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream","focus":[1000,500]}`；角色 `{"pose":"prone","at":[230,300],"scale":0.62,"spiral":true,"state":"state-paper"}`；道具 `[]`；共享场景 `{"kind":"grass","occlude":false,"side":"left"}`；取景 `{"at":[-0.6,35.68],"scale":0.92}`。
- **旁白**：它趴下来，呼了一口气。
- **提示**：一起坐一会儿。
- **纸书提示**：一起坐一会儿。
- **原朗读稿（核对用）**：它趴下来，呼了一口气。
一起坐一会儿。
- **共读分类**：`"simulate"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p51 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--wash-cream","focus":[0,500]}`；角色 `{"pose":"curled","at":[260,300],"scale":0.62,"spiral":true,"state":"state-paper"}`；道具 `[]`；共享场景 `{"kind":"grass","occlude":false,"side":"right"}`；取景 `{"at":[-0.6,35.68],"scale":0.92}`。
- **旁白**：你也靠着它歇下了。
- **原朗读稿（核对用）**：你也靠着它歇下了。
- **共读分类**：`"autonomous"`；紧邻承接 p50。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S25 · p52｜p53

来源：[52-night.js](../../../src/content/books/labuluo/specs/52-night.js)。

#### p52 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--night","focus":[1000,500]}`；角色 `{"pose":"curled","at":[230,300],"scale":0.62,"spiral":false,"state":"state-paper"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup","style":"opacity:.6"},{"id":"blanket-1","kind":"blanket","at":[210,605],"scale":0.39,"layer":"behind"},{"id":"apple-A","kind":"apple-bitten","at":[170,600],"scale":0.2,"class":"prop-apple","style":"opacity:.6"}]`；共享场景 `{"kind":"window-nook","light":"night","side":"left"}`；取景 `{"at":[-55.33,-206.73],"scale":1.1}`。
- **旁白**：天黑了，你们回到毯子旁。
- **原朗读稿（核对用）**：天黑了，你们回到毯子旁。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p53 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--night","focus":[0,500]}`；角色 `{"pose":"covered-rest","at":[260,300],"scale":0.62,"spiral":false,"state":"state-paper"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup","style":"opacity:.6"},{"id":"blanket-1","kind":"blanket-lap","at":[235,560],"scale":0.62},{"id":"apple-A","kind":"apple-bitten","at":[170,600],"scale":0.2,"class":"prop-apple","style":"opacity:.6"}]`；共享场景 `{"kind":"window-nook","light":"night","side":"right"}`；取景 `{"at":[-55.33,-206.73],"scale":1.1}`。
- **旁白**：它把小脚缩回毯子里。
- **原朗读稿（核对用）**：它把小脚缩回毯子里。
- **共读分类**：`"autonomous"`；紧邻承接 p52。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S26 · p54｜p55

来源：[54-sleep.js](../../../src/content/books/labuluo/specs/54-sleep.js)。

#### p54 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--night","focus":[1000,500]}`；角色 `{"pose":"sick-curled","at":[230,300],"scale":0.62,"spiral":false,"state":"state-paper"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup","style":"opacity:.6"},{"id":"blanket-1","kind":"blanket-lap","at":[235,560],"scale":0.62},{"id":"apple-A","kind":"apple-bitten","at":[170,600],"scale":0.2,"class":"prop-apple","style":"opacity:.6"}]`；共享场景 `{"kind":"room","light":"night","side":"left"}`；取景 `{"at":[117.24,71.1],"scale":0.85}`。
- **旁白**：这次，你先打哈欠。
- **原朗读稿（核对用）**：这次，你先打哈欠。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p55 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--night","focus":[0,500]}`；角色 `{"pose":"push-corner","at":[260,300],"scale":0.62,"spiral":false,"state":"state-paper"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup","style":"opacity:.6"},{"id":"blanket-1","kind":"blanket-lap-shared","at":[235,560],"scale":0.62},{"id":"apple-A","kind":"apple-bitten","at":[170,600],"scale":0.2,"class":"prop-apple","style":"opacity:.6"},{"id":"foot-corner","kind":"foot-pushing","at":[245,780],"scale":0.6,"rotate":170}]`；共享场景 `{"kind":"room","light":"night","side":"right"}`；取景 `{"at":[117.24,71.1],"scale":0.85}`。
- **旁白**：它挪近，用小脚推来毯角。
- **原朗读稿（核对用）**：它挪近，用小脚推来毯角。
- **共读分类**：`"autonomous"`；紧邻承接 p54。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S27 · p56｜p57

来源：[56-zzz.js](../../../src/content/books/labuluo/specs/56-zzz.js)。

#### p56 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--night-deep","focus":[1000,500]}`；角色 `{"pose":"covered-rest","at":[230,300],"scale":0.62,"spiral":false,"state":"state-paper"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup","style":"opacity:.35"},{"id":"blanket-1","kind":"blanket-lap-shared","at":[235,560],"scale":0.62},{"id":"apple-A","kind":"apple-bitten","at":[170,600],"scale":0.2,"class":"prop-apple","style":"opacity:.35"}]`；共享场景 `{"kind":"room","light":"late-night","side":"left"}`；取景 `{"at":[148.77,120.42],"scale":0.78}`。
- **旁白**：晚安。
- **提示**：轻轻翻过去。
- **纸书提示**：轻轻翻过去。
- **原朗读稿（核对用）**：晚安。
轻轻翻过去。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p57 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--night-deep","focus":[0,500]}`；角色 `{"pose":"covered-rest","at":[260,300],"scale":0.62,"spiral":false,"state":"state-paper"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup","style":"opacity:.35"},{"id":"blanket-1","kind":"blanket-lap-shared","at":[235,560],"scale":0.62},{"id":"apple-A","kind":"apple-bitten","at":[170,600],"scale":0.2,"class":"prop-apple","style":"opacity:.35"}]`；共享场景 `{"kind":"room","light":"late-night","side":"right"}`；取景 `{"at":[148.77,120.42],"scale":0.78}`。
- **旁白**：呼噜……这一回睡得安稳。
- **原朗读稿（核对用）**：呼噜……这一回睡得安稳。
- **共读分类**：`"autonomous"`；紧邻承接 p56。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### S28 · p58｜p59

来源：[58-tomorrow.js](../../../src/content/books/labuluo/specs/58-tomorrow.js)。

#### p58 · 左页

- **画面记录**：背景 `{"kind":"none","wash":"--night-deep","focus":[1000,500]}`；角色 `{"pose":"covered-rest","at":[230,300],"scale":0.62,"spiral":false,"state":"state-paper"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup","style":"opacity:.35"},{"id":"blanket-1","kind":"blanket-lap-shared","at":[235,560],"scale":0.62},{"id":"apple-A","kind":"apple-bitten","at":[170,600],"scale":0.2,"class":"prop-apple","style":"opacity:.35"}]`；共享场景 `{"kind":"room","light":"late-night","side":"left"}`；取景 `{"at":[148.77,120.42],"scale":0.78}`。
- **旁白**：屋里只剩轻轻的呼吸。
- **原朗读稿（核对用）**：屋里只剩轻轻的呼吸。
- **共读分类**：`"autonomous"`。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

#### p59 · 右页

- **画面记录**：背景 `{"kind":"none","wash":"--night-deep","focus":[0,500]}`；角色 `{"pose":"covered-rest","at":[260,300],"scale":0.62,"spiral":false,"state":"state-paper"}`；道具 `[{"id":"cup-1","kind":"cup","at":[35,590],"scale":0.22,"class":"prop-cup","style":"opacity:.35"},{"id":"blanket-1","kind":"blanket-lap-shared","at":[235,560],"scale":0.62},{"id":"apple-A","kind":"apple-bitten","at":[170,600],"scale":0.2,"class":"prop-apple","style":"opacity:.35"}]`；共享场景 `{"kind":"room","light":"late-night","side":"right"}`；取景 `{"at":[148.77,120.42],"scale":0.78}`。
- **旁白**：明天，还想听你咕噜叫。
- **原朗读稿（核对用）**：明天，还想听你咕噜叫。
- **共读分类**：`"autonomous"`；紧邻承接 p58。
- **屏幕动作**：无必做输入与默认拍打，按本页故事阅读或共读模拟。

### p60｜p61 · 前后置

来源：[60-back.js](../../../src/content/books/labuluo/specs/60-back.js)。

#### p60 · 左页（仅纸书）

- **画面记录**：背景 `{}`；角色 `null`；道具 `[{"id":"spiral-1","kind":"spiral","at":[430,640],"scale":0.14}]`。
- **旁白**：《噜啵生病啦！》
- **成人文字**：一个要你照顾的小怪物<br>文字与插画：rockbenben<br>出版：＿＿＿＿＿＿＿　初版：＿＿＿＿年＿＿月<br>作品内容：CC BY-NC-ND 4.0，非商业分享请署名。<br>字体：站酷快乐体 · 霞鹜文楷（SIL OFL 1.1），可商用、可嵌入出版物。<br>（空行）<br>编者说：从发现难受到照顾、等待，最后被恢复的伙伴等候。读到犹豫的地方，可以停一停，听孩子怎么说。
- **原朗读稿（核对用）**：《噜啵生病啦！》
一个要你照顾的小怪物
文字与插画：rockbenben
出版：＿＿＿＿＿＿＿　初版：＿＿＿＿年＿＿月
作品内容：CC BY-NC-ND 4.0，非商业分享请署名。
字体：站酷快乐体 · 霞鹜文楷（SIL OFL 1.1），可商用、可嵌入出版物。

编者说：从发现难受到照顾、等待，最后被恢复的伙伴等候。读到犹豫的地方，可以停一停，听孩子怎么说。
- **屏幕动作**：未声明专属热区；共读与翻页，角色可有通用反馈。

#### p61 · 右页（仅纸书）

- **画面记录**：背景 `{}`；角色 `null`；道具 `[{"id":"spiral-1","kind":"spiral","at":[430,130],"scale":0.14}]`。
- **旁白**：怎么读这本册子
- **成人文字**：旁白慢慢念，拟声让孩子接着说。指认、拍手、呼气都可以在共读时一起做，不要求每页都做动作。孩子没有回应时，可以等一等，也可以翻过去。<br>虚构角色的颜色、动作变化不等同于现实疾病恢复规律；药物由成人负责，孩子共读时只作观察与模拟。<br>这册可以特别停在：p22–p23 苦后安慰与 p28–p35 等待。让孩子说说看，不急着给答案。<br>睡前最后几跨，声音逐渐放轻。孩子想停在某一页，就在那里停一会儿。
- **原朗读稿（核对用）**：怎么读这本册子
旁白慢慢念，拟声让孩子接着说。指认、拍手、呼气都可以在共读时一起做，不要求每页都做动作。孩子没有回应时，可以等一等，也可以翻过去。
虚构角色的颜色、动作变化不等同于现实疾病恢复规律；药物由成人负责，孩子共读时只作观察与模拟。
这册可以特别停在：p22–p23 苦后安慰与 p28–p35 等待。让孩子说说看，不急着给答案。
睡前最后几跨，声音逐渐放轻。孩子想停在某一页，就在那里停一会儿。
- **屏幕动作**：未声明专属热区；共读与翻页，角色可有通用反馈。

### p62｜p63 · 前后置

来源：[60-back.js](../../../src/content/books/labuluo/specs/60-back.js)。

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

- **画面记录**：背景 `{}`；角色 `null`；道具 `[{"id":"blanket-1","kind":"blanket","at":[280,300],"scale":0.24,"rotate":-4},{"id":"cup-1","kind":"cup","at":[700,180],"scale":0.18,"rotate":10},{"id":"apple-A","kind":"apple-bitten","at":[620,700],"scale":0.16,"rotate":14}]`。
- **原朗读稿（核对用）**：后环衬：同毯、杯子与缺口苹果。
- **屏幕动作**：未声明专属热区；共读与翻页，角色可有通用反馈。

### p64 · 前后置

来源：[60-back.js](../../../src/content/books/labuluo/specs/60-back.js)。

#### p64 · 单页（仅纸书）

- **画面记录**：背景 `{"kind":"rays","colors":["--deep-blue","--blue"],"gap":"--blue","focus":[500,680],"cover":"all","wash":"--blue"}`；角色 `{"pose":"covered-rest","at":[240,300],"scale":0.62,"spiral":false}`；道具 `[{"id":"blob-1","kind":"blob","at":[240,-132],"scale":0.5},{"id":"blanket-1","kind":"blanket-lap-shared","at":[235,560],"scale":0.62}]`。
- **旁白**：《噜啵生病啦！》
- **大字／拟声词**：啊呜！
- **原朗读稿（核对用）**：《噜啵生病啦！》一个要你照顾的小怪物。
- **屏幕动作**：未声明专属热区；共读与翻页，角色可有通用反馈。

## 快照溯源

本册来源 SHA-256：`a627633e5860712c9dcd154f841f88ab9e4e703130f53f74e4139e7c317c88e0`。摘要依次连接 reader-ui.js、book.json 与读取顺序下去重的书稿文件的“仓库相对路径 + 换行 + 统一 LF 的 UTF-8 文本 + 换行”。数据区含全部数字与初始显隐；内容变更后重新运行生成命令。设计契约仍以设计规格为准。
