# 参与这个项目

## 你贡献的东西落在哪个协议下

这个仓库有**两套授权**，动手之前先看你改的是哪一层：

| 你改的地方 | 授权 | 意思 |
|---|---|---|
| `src/js/`、`src/css/`、`tools/`、构建与 CI | [MIT](LICENSE) | 你的改动可以被任何人拿去商用 |
| `src/components/`、`src/content/`、`docs/superpowers/specs/` | [CC BY-NC-ND 4.0](LICENSE-CONTENT.md) | 你的改动只能非商业使用，且不能被改编成别的作品 |

**默认规则**：你在 PR 里提交的内容，按它所在那一层的协议授权。不需要额外签 CLA，也不需要保留版权声明——在 PR 说明里写一句你改的是哪一层就够了。

三条实际的：

1. **代码层**（修 bug、加闸门、改构建）：随便提，MIT 覆盖，不会有人来问你要授权。
2. **作品层**（改旁白、加一页、画一个新姿态）：同样欢迎，但**不适用商业授权**——你贡献的这一部分同样不能被拿去商用，也不能被改编成新故事。想动故事的话，先开个 issue 说想法，免得白画。
3. **不确定算哪层**：算作品层。判据很简单——**它会不会出现在书页上**。会 → 作品层；不会 → 代码层。

## 提交之前

CI 使用 Node.js 24、Python 3.12 和 Playwright 配套的 Chromium。首次检出时，在项目根目录运行：

```bash
npm ci
python -m pip install -r requirements.txt
npx playwright install chromium
npm run build
npm run check
npm run smoke
```

Linux 新机器把浏览器安装命令换成 `npx playwright install --with-deps chromium`。Python 依赖可装在已激活的虚拟环境中。完整的破坏性回归使用 Bash，Windows 可在 Git Bash 中运行 `npm run verify:teeth`。

单页、A4 与 A3 导出都会使用 pypdf 解析实际成品，逐页核对纸型、裁切与方向，检查字体嵌入、Type3 和书名／纸型标题。缺少依赖时重新运行 `python -m pip install -r requirements.txt`。局部修改 PDF 工具或拼版样式后，先构建，再运行 `node tools/verify-pdf.mjs`，它在临时副本里执行三种导出及破坏回归，并用校准色块量实际 PDF 的比例、双页位置与垂直居中；移除拼版尺寸隔离也必须使回归失败。校准色块不会进入正式成品。这些回归也由 `npm run verify:teeth` 统一调用。只有验收通过的 PDF 才会替换同名成品。

截图整册验收必须有非空且无重复册页的 `manifest.json`，实际 PNG 的 `册/页.png` 集合须与清单完全一致，`--expect` 只追加页数断言，不能替代清单。`npm run check:shots` 保持原命令；印刷截图用 `python tools/check-shots.py --shots dist/print-shots` 验收。单图仅诊断墨迹时显式使用 `python tools/check-shots.py --image dist/shots/awulubo/p01.png`，它不代表整册通过。热区检查按 `targetId` 对应的 `data-object` 测量具体对象；揉肚子、彩纸等局部动作不要求包住整个角色或背景，但目标仍须存在且可见。

局部验收工具的回归入口是 `python tools/verify-shots.py`、构建后的 `node tools/verify-hotspots.mjs` 与 `node tools/verify-density.mjs`，均已接入 `npm run verify:teeth`。密度回归会在临时副本调用原有 Bash 破坏脚本，并故意让闸门报错却退出 0、正常输出却退出 1，确认两种情况都被拒绝；不要在作者工作区直接调用内部破坏脚本。

清单与跨页模块按文件内容摘要区分缓存版本，不依赖修改时间或文件长度；摘要和模块执行使用同一次读取的源码，保存与导入交错时也不会把 B 缓存到 A 的版本键下。加载器使用 Node 24 已提供的同步模块加载钩子，只接管正在导入的精确文件 URL，保留相对导入和 `import.meta.url`。修改加载器后运行 `node tools/verify-loader.mjs`，它在临时副本中固定时间戳，覆盖错误清单及语法恢复、同长度重排、书稿连续修改、读取 A 后保存 B 再恢复 A 的交错和并发加载；再运行 `node tools/verify-framework.mjs` 验证清单与书稿 A→B→A、模板和 SVG 的真实开发自动刷新。两项都由 `npm run verify:teeth` 调用，不需要延时或反复重跑来等待文件时间变化。

各册屏幕共读提示放在 `book.json` 的可选 `adultTip`；省略时使用通用提示。阅读器固定文案放在 `src/content/reader-ui.js`，由界面、字体生成与覆盖检查共用。`node tools/dump-text.mjs --json` 保留原有字段，并追加界面文字与每页数字的值、初始显隐；数字按文楷检查，不并入站酷快乐体。修改这些文字后先 `npm run fonts`，再构建。

`node tools/dump-text.mjs` 与 `--json` 的 `books[].chars`／`total` 使用同一统计：基础 `text` 的四类书面文案加数字（含初始隐藏数字），按非空白 Unicode 码点计数，保留标点；数组不增加分隔符，HTML 换行标记与 LF／CRLF 不计字。朗读稿 `aria` 和界面文字不计入，与朗读稿同文的书面文字仍照常计入。纸书 `print` 覆写继续单列导出，不叠加到基础文案合计。修改统计后运行 `node tools/verify-text-count.mjs`，它在临时册中验证换行、数组、数字、同文朗读稿、合计及既有 JSON 字段，已接入 `npm run verify:teeth`。

`node tools/manuscript.mjs` 刷新五册审稿快照的数据区，保留前面的人工故事与节奏审阅；`--check` 检查数据区是否与当前书稿一致。摘要统一 LF，兼容不同平台换行。构建后运行 `node tools/verify-content.mjs`，覆盖真实浮层字体、元数据提示与旧数据回退、数字导出、两处动作承诺及快照删数字的破坏回归；它也由 `npm run verify:teeth` 统一调用。

数字视觉验收按书稿 `numbers` 推导数量、`num-*` 槽位、文字和初始 `on`，由版式与对比度闸门共同检查。纸书保留初始隐藏；屏幕还会在验收浏览器中按 `.is-on` 样式显示隐藏数字，测量互动显示后的版式和笔画底色，不改成品。数字版式使用截图差分的实际墨迹，避免把字体行框留白当成重叠或裁切；有 `overflow` 裁切时另拍解除裁切的参照，以黑白字形探针分离笔画，分别核对横纵墨迹是否缺失，不能只看滚动尺寸。参照只在验收浏览器里改动并恢复数字样式，缺少可靠参照必须失败；字体行框溢出但墨迹完整仍须通过。大字至少 3:1，小于 24 CSS px 的数字至少 4.5:1，并计入字色及祖先透明度。构建后运行 `node tools/verify-numbers.mjs`，它仅在临时副本破坏数字的节点、值、身份、显隐、对比度、位置和裁切，包含宽 50px／高 400px 的水平裁切、纵向裁切及完整墨迹正常基线，验证两种产物分别被拦截，并用 900px／1440px 下的真实点击核对点数显示和重进复位；该回归已接入 `npm run verify:teeth`。

透明文字的对比度另拍黑、白字形填色校准图，保留原背景及各级透明度，逐 RGB 通道识别完整笔画并排除 LCD 抗锯齿外缘，再直接比较原图与无字图在最终合成阶段的颜色；不能把已合成的底图再次作为原始底色混合。校准只用于透明文字，不透明文字沿用原测量；像素差门槛 16、局部低对比笔画容差 2% 和字号阈值保持不变，读不到完整笔画必须失败。`node tools/verify-opacity.mjs` 在临时成品中覆盖灰色内底、白色外底、多层透明度、纸屏分别破坏、半透明字色及字形抗锯齿正常基线，以独立截图参照核对结果；已接入 `npm run verify:teeth`。

锁文件使用 npm 官方源。若本机使用的镜像没有审计接口，可运行 `npm audit --registry=https://registry.npmjs.org` 查询依赖公告。

`npm run check` 里含授权闸门：它核的是 `LICENSE-CONTENT.md` 里写的适用范围跟仓库里的内容目录还对不对得上，往 `src/content/` 或 `src/components/` 底下加新目录时，这张表要一起改。

## 本批交付文件核对

前后置验收保留原命令 `node tools/verify-r5-paratext.mjs`，预期读取唯一规格§0.3引用的五册冻结R7附件并核对原始SHA-256，不再读取历史R5。核对每册 p01–p03、p60–p64 共40页的文字槽位、实际纸书覆写、p60–p62 aria及重读接口；缺少附件、指纹不符或读空必须失败。13项破坏在临时副本验证：第四册p61正文／aria／两者／print分别回退旧句、五册前置错误、纸书提示清空、R7链接读空、附件缺失及冻结稿改写，恢复后须通过。`--gate`仅执行当前数据检查；完整专项已接入 `npm run verify:teeth`，不得在作者稿上手动破坏。通过只代表前后置契约，不代替正文制作、纸屏校样或人工试读。

第二册 p06–p07 毯角迁移另跑 `node tools/verify-r5-blanket.mjs`，已接入 `verify:teeth`。它核对 R5 读词、纸屏提示、单一毯角身份、静态入口，以及 900px／1440px 的点击、键盘、重复输入、离页重进、五次点空放行与三物寻找兼容；寻找完成按本页目标身份计算，毯角不飞走。其余正文仍按阶段迁移，局部通过不代表五册已完成 R5。

第二册 p14–p15 盖毯迁移另跑 `node tools/verify-r5-cover.mjs`，已接入 `verify:teeth`。它核对 R5 纸屏读词、同一毯子身份、cover 热区、仅露双眼的回应、900px／1440px 下的点击与键盘、重复输入、对象重排、离页重进和静态入口。p13 旧盖毯已在后续陪伴子阶段移除；局部通过仍不代表全册情节已完成迁移。

第二册 p12–p13 陪伴迁移使用 `node tools/verify-r5-care.mjs`，已接入 `verify:teeth`。它核对定稿读词、角色移近与歪靠、取消旧盖毯和默认拍打、纸屏普通翻页与重进；p12–p15 的盖毯只保留 p14。页面可设 `pat: false` 关闭隐式拍角色反馈，未声明时沿用原行为。上段记录的 p13 旧盖毯已在此后续阶段移除；其余正文仍待逐跨迁移。

第二册 p16–p17 拒水迁移使用 `node tools/verify-r5-refusal.mjs`，已接入 `verify:teeth`。它核对拒水与收杯的定稿读词、同杯放低退开、毯子保持原位、无旧 water 或默认拍打，以及纸屏静态入口、900px／1440px 普通阅读与重进。smoke 同步检查本跨不强制递杯或喝水，不再把旧 p17 作为饮水成功页；p18–p19 的自主转脸与一小口仍待单独迁移。

下表记录此前优化批次的 28 个新增文件，不是当前全部交付清单；R5 规范性附件、其引用的历史文稿及本阶段新增回归也须纳入。正式交付须包含已有跟踪文件的全部相关改动及所有必需新增文件；只提交 `git diff` 或使用 `git add -u` 会漏掉新增文件。用 `git ls-files --others --exclude-standard` 核对新增清单，再检查最终提交差异；字体子集及两个隐藏戳记也须保留。`.workbuddy/`、`.qoder-credits/`、`docs/reference/` 和构建产物属于本地文件，不随源码交付。

| 新增文件 | 依赖关系 |
|---|---|
| `src/content/reader-ui.js` | 阅读器、书稿加载器、字体与审稿工具共用的界面文字源 |
| `tools/png-pixels.mjs`、`tools/visual-numbers.mjs` | 版式、对比度及数字回归的共用测量模块 |
| `tools/pdf-check.mjs`、`tools/check-pdf.py`、`tools/verify-pdf.mjs`、`tools/verify-pdf.py`、`tools/verify-pdf-layout.py` | 单页、A4/A3 导出与实际 PDF 结构、比例回归 |
| `tools/check-age-language.mjs`、`tools/check-interaction-density.mjs`、`tools/verify-age-language-teeth.sh`、`tools/verify-density-teeth.sh`、`tools/verify-density.mjs` | `check` 中的内容闸门及 `verify:teeth` 中的破坏回归 |
| `tools/verify-content.mjs`、`tools/verify-hotspots.mjs`、`tools/verify-loader.mjs`、`tools/verify-numbers.mjs`、`tools/verify-opacity.mjs`、`tools/verify-publish.mjs`、`tools/verify-shots.py`、`tools/verify-text-count.mjs` | `verify:teeth` 调用的内容、热区、缓存、数字、透明度、发布目录、截图与字数回归 |
| `tools/manuscript.mjs`、`docs/superpowers/specs/2026-11-13-manuscript-{awulubo,labuluo,yiqiwan,shengqi,wuzilai,review}.md`（六份文档） | 审稿快照生成、快照一致性回归及人工审阅记录 |

完整性验收应使用只含交付文件的临时副本，不带原工作区的 `dist/`、`dist-print/`、`dist-site/` 或本地工具目录；依赖按上面的安装说明准备。先运行 `npm run verify:teeth`，再运行 `npm run typecheck`、`npm run build` 和 `npm run check`；破坏回归自行在临时目录构建，最后的构建与检查验证交付副本本身。CI 仍按下文完整验收顺序先构建再检查，Node、Python、Chromium 及 Bash 都是制作依赖，不进入离线成品。

P1-1共用角色回归使用 `node tools/verify-character.mjs`，已接入 `verify:teeth`。它检查旧姿态ID、无手设定、纸屏渲染、背面不露五官腹纹、身体与腹纹坐标一致、独立旋转起终态、描边可见框及穿戴实际像素；生成 `dist/character-proof/poses.png`、`wear.png` 和几何记录，仅供组件校样，不是第五个阅读入口或整册迁移结果。新增的 `tools/character-rig.mjs` 是渲染器的能力表，必须随交付纳入。组件改动后运行 `npm run brand`，必要时构建后运行 `npm run shots:readme`，继续保留字体新鲜度与现有页面验收。

书稿可选`framing: {at: [x, y], scale}`声明取景，范围为0.5–2倍。角色、物件与动画保留故事坐标；渲染时同步移动热区和数字，旁白独立排布。同跨使用相同取景，跨页场景绕书脊连续缩放；不可用逐页独立缩放代替共享场景。`verify-character`覆盖取景后的纸屏墨迹／热区／数字与错位反例，`verify-scenes`以整幅场景作远近取景参照并验证断景反例；原`verify:teeth`统一执行。新增姿态须同步能力表、身体锚点、可见框及穿戴检查。

P1-2场景回归使用 `node tools/verify-scenes.mjs`，已接入 `verify:teeth`。它在临时副本验证场景声明、加载兼容、组件／底色缺失，以及实际纸屏双页拼接、错误缩放反例、昼夜光照、不透明草丛遮挡和本地字体夜间墨迹对比度；生成 `dist/scene-proof/scenes.png`、`light.png`，仅供组件校样。交付须包含 `src/components/scenes.svg`、`tools/scenes.mjs` 与专项回归；正式书稿未声明scene时保持原输出，组件通过不代表整册已迁移。

P1-3共读映射使用 `node tools/verify-reading.mjs`，已接入 `verify:teeth`。它核对冻结指纹与五册140跨映射，验证观察不移走对象、角色自主叙事无热区／默认拍打／自动翻页、模拟完成不带走右页任务、按实际待收对象完成、键盘和离页复位，以及纸书／校样／拼版不执行动作。新书稿可选声明 `reading: 'observe' | 'simulate' | 'autonomous'`，未声明时保留旧接口；显式分类须符合冻结稿，不为密度补剧情外poke。可选 `responseTo` 只校验实际顺序中紧邻前页，不代替物理关系或图文审核。交付须包含专项脚本及 `2026-11-15-p1-reading-map.md`；`dist/reading-proof/` 是临时诊断校样，不是新入口或整册迁移。

## 提交信息

写**这次改了什么**，一两句话说清目的就行。不写工具名，不写 AI 署名。


## 修改书稿和互动

书稿使用跨页记录，共享背景放在 background，单页只覆写差异。道具 id 与热区 targetId 必须同步维护；重排道具时保留对象身份。再读一次等跳转写入 exit。全部书稿通过 JSDoc satisfies 接受 TypeScript 动作类型检查。

互动进度、计时与逐帧反馈交给 BookEffects，普通动作报告完成，由阅读状态机翻页。新增输入需验证取消、连点、离页重返和键盘替代。浮层输入与焦点统一通过 panels.js 管理。

修改正文后先运行 npm run fonts，并提交两个字体子集及其戳记。变更画面后检查纸屏两种版式；印刷版保留可共读的动作提示。

`npm run check` 里的 `tools/check-age-language.mjs` 管三岁听得懂的词：正文 p04–p59 出现比喻、条件或转折复句、抽象指令词会失败，《生气啦！》里出现「没关系」也会失败。`tools/check-interaction-density.mjs` 管后三册叙事段 p04–p47 的互动密度：连续 6 页以上只能点空白翻页会失败；睡前 p48–p59 是留白段，第一册喂食链与第二册「守着它睡」是既有节奏，这两处只统计、不判定。两道闸门的报错都会写清怎么改，破坏用例分别是 `tools/verify-age-language-teeth.sh` 与 `tools/verify-density-teeth.sh`，由 `npm run verify:teeth` 在临时副本里执行。

## 完整验收

```bash
npm run build
npm run site
npm run check
npm run verify:reader
node tools/audit-script.mjs
npm run check:repeat
npm run smoke
npm run chaos -- --seed 1 --steps 400
npm run shots
npm run check:shots
npm run shots:print
npm run check:contrast
npm run pdf
npm run pdf:booklet
npm run pdf:booklet -- --a3
npm run verify:teeth
```

破坏测试由 npm run verify:teeth 创建临时副本执行，禁止在书稿工作区直接运行内部破坏脚本。文字节点消失、无布局和完全透明都必须使文字闸门失败。补闸门时同步加入实际破坏用例。

发布前另跑 npm run check:publish。公开目录只包含四个 HTML 与 edgeone.json，PDF 留在 dist-print。未配置 Git 远端时发布检查会失败。实体试印、儿童试读和 Docker 实际构建需分别记录结果，自动化通过不能替代这些验证。


已制作册由各册 `book.json` 的 `production.script` 登记冻结附件，继续共用四入口与构建命令，不新建册专属流水线。`node tools/verify-production.mjs` 核对冻结文字、纸屏提示、物品身份、相邻兑现与藏露／沉降，执行临时书稿破坏及900/1440px真实操作；已接入 `verify:teeth`。`node tools/production-proof.mjs` 按共享装订分组生成已制作册全64页纸书联系表，专项另生成屏幕代表跨页，位置为 `dist/production-proof/<册>/`，均为内部校样而非额外阅读入口。正式交付须包含这两份通用工具及相关冻结附件；`tools/mutate-spec.mjs` 仅服务临时副本破坏，不在作者书稿上手动调用。

R7第一册不再沿用旧“p16三口、p28回开头、指认吃掉、左页已摇身”的剧情断言；对应语义由制作专项验证。原双页独立完成保留在共读临时书稿，旧trap补演接口保留在阅读器测试的浏览器夹具；冒烟保留25音色、浮层、切册、纸屏入口及全册真实鼠标通扫，并同时扫描窄／宽两种视口。场景可选 `occlude:false` 将草丛放到角色身后，`grassScale` 的1–2水平比例须在同一草地链保持一致；道具可选 `layer:'behind'` 保持遮挡物原位并改变层级，默认字段兼容旧稿。新共读喂食在道具原始变换内增加反馈层，按嘴部锚点的实际坐标移动，外层构图不受缩放中心影响。

P2-2继续复用 `node tools/verify-production.mjs` 与 `node tools/production-proof.mjs`，按册production元数据选择已制作册；调试时可用 `--book=labuluo` 选一册，完整验收不加过滤。`tools/production-care.mjs` 是共用入口调用的照顾故事契约，随交付包含；验证自主饮水、成人持药、同毯／同杯／缺口苹果及末段静止。旧毯角、盖毯、陪伴和拒水专项命令保留，文字统一读取冻结R7；观察可跳过，旧trap容错仍在浏览器夹具验证。显式共读的poke／cover／water只确认本页模拟，不提前摇身、喝水或吃掉整杯；未分类旧稿保持原反馈。药物和角色自主咳嗽不绑定孩子任务。

P2-3的球权契约由 `tools/production-play.mjs` 接入原 `node tools/verify-production.mjs` 与 `verify:teeth`，可用 `--book=yiqiwan` 做专项。复用pass及BookEffects，新增道具style可选 `--go-arc`（页面单位），在原起终点之间形成短弧；未声明时仍为原直线，减少动效直接落原终点。第三册轻抛使用零终点位移和90单位短弧，回到孩子一侧，不是把球扔高或送给角色。旧内容联合回归保留真鼠标／键盘／离页测试，运动阈值改读实际起点；旧未分类密度的破坏当前使用临时副本的固定旧稿夹具，不依赖任何册尚未迁移，也不修改作者源文件，不把poke写回R7叙事。

传球收尾回归覆盖p34／p36／p38／p42／p44全部五路：数据终点与紧邻结果同球一致；900／1440px及普通／减少动效在BookEffects.finish前实测transform、尺度和同节点身份。每路另测对象重排、键盘、重复输入和离页复位，保留短抛高度、藏露及静态入口。新增五路错移、两处旧偏移及错误发球朝向的8条破坏，与既有12项合为20项；均由原专项在临时副本执行，不增加册专属入口。

P2-4的同五块、顶块支承、共同生气和约定明天由 tools/production-angry.mjs 接入原制作入口及 verify:teeth，专项用 node tools/verify-production.mjs --book=shengqi。明确 reading: simulate 的 breathe 只起伏一次，未分类旧稿仍两次，按下即开始、短按、键盘、减少动效和 BookEffects 生命周期不变；clap不提前摇身。专项在临时副本实际破坏15种状态，并量偏放／掉落／放正／夜尾每块的可见墨迹。语言牙齿按旁白结构写入，不依赖源文件引号格式。交付须包含该契约模块，不添加册专属构建或入口。

B4/B5旁置收尾另加5项破坏，共20项；固定位置从p07延续到结尾及后置，B1/B2/B3链不变。900／1440px在index与proof对重搭、放正、夜尾共12组校样量实际墨迹，并验证旧贴底座位置的反例。两散块须在底座两侧保留2%页宽的制作留白，不能靠节点存在或颜色差异替代实际分离；此裕量不是儿童理解阈值，儿童辨识仍人工验证。

P2-5由 tools/production-tidy.mjs 接入原制作入口和 verify:teeth，专项用 node tools/verify-production.mjs --book=wuzilai。tidy按本页实际待收身份集合完成，明确共读保持原尺度与可见性，旧未分类三物仍缩至0.16／淡至0.25并须收齐；verify-reading的临时夹具验证旧接口。19条制作破坏覆盖同三物、篮内0→1→2→3、固定篮口、悬脚未碰及停退、实际终点、静止末态与后置；纸屏实际墨迹另验证贴星反例。重复闸门仅排除与册名完全一致的扉页标题，正文重复和错误标题仍须失败。生产专项的独立用例从新文档初始化，避免旧视口监听器与hash导航交错。
