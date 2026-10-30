# 《啊呜噜啵！》

3–5 岁互动绘本。一套 HTML 源码，同时产出**屏幕互动版**与**印刷 PDF**；画面全部由 HTML / CSS / SVG 构成，不用一张位图插画。

- 角色、文本、桥段全部原创。画风承接参考书（埃尔维·杜莱）的"白纸 + 粗黑线 + 饱和平涂 + 手写字入画"这套类型语法，不复制其角色、咒语、构图。
- 设计规格：[docs/superpowers/specs/2026-10-30-awulubo-picture-book-design.md](docs/superpowers/specs/2026-10-30-awulubo-picture-book-design.md)
- 过程记录与画风确认点：[docs/M0-样张记录.md](docs/M0-样张记录.md)

## 当前进度

| 阶段 | 内容 | 状态 |
|---|---|---|
| M0 风格样张 | 骨架、令牌、角色零件与姿态、笔触特效层、授权核验 | ✅ 完成 |
| M1 全部页面 | **32 页全部落地**、12 个跨页、11 套模板、11 种互动 | ✅ 完成 |
| M2 互动 | 彩纸飞行动画、找一找反馈、减少动效、设备测试 | 部分（基础反馈已有） |
| M3 印刷 | PDF 管线已通（32 页 / 216 mm / 字体内嵌）；布局检查、300 dpi 逐页检查、实物打样 | 部分 |
| M4 共读测试 | **「幼儿乱读」自动化压力测试已落地**（`npm run chaos`）；真人试读 | 部分（自动化已覆盖，待真人试读） |

## 命令

```bash
npm install          # 依赖：vite、vite-plugin-singlefile、playwright、两个字体包
npm run fonts        # 按全书实际用字切字体子集（src/fonts/*.woff2）
npm run build        # vite build → dist/index.html、dist/print.html、dist/proof.html
npm run dev          # 开发服务器（改页面数据即时刷新）
npm run check        # 页面数据检查（32/28 页强校验）+ 版式检查（含热点是否罩住道具）+ 字体授权闸门 + 字体覆盖检查
npm run check:shots  # 截图闸门：每页都得真的画出来（不能是白板）
npm run smoke        # 交互冒烟（Playwright，43 项断言）
npm run chaos        # 幼儿乱读压力测试（Playwright，随机种子可复现）
npm run shots        # 逐页截图 + 联系表（见下方「出图」）
npm run pdf          # 导出 dist/book.pdf
```

> **`npm run check` 查不出"图坏了"**：它量的是版式与结构，不是像素。
> 曾经有一次把"书页居中"的 CSS 写成了 `body.screen`，拼版（`body.screen.static`）
> 也吃到了这条规则，32 页全叠到一起——结构 / 版式 / 冒烟 / 压力测试**全部通过**，
> 只有人眼看联系表才发现整本白板。
> 所以出图之后要跟一步 `npm run check:shots`（每页墨迹占比不能低于 1%）。

**工具链**（都是成熟依赖，不自造轮子）：

| 环节 | 用什么 |
|---|---|
| 打包 / 压缩 / 内联 / 开发服务器 | **Vite** + **vite-plugin-singlefile**（产出单文件 HTML） |
| 页面模板 | **Handlebars**（`src/templates/page.hbs`，模板里不写逻辑） |
| 背景自动出血 / 拟声词逐字微转 | `tools/render-page.mjs`（本书特有的画法规则，没有现成库） |
| 字体子集 | **fontTools**（`pyftsubset`） |
| 字体覆盖检查 | **fontTools**（读 cmap） |
| 印刷 PDF | **Playwright**（Chromium 打印） |
| 逐页截图 | **html-shot** 技能 |
| 交互冒烟 | **Playwright** |

> 页面框架的自研部分只剩两件事：**背景放大倍数的计算**和**拟声词逐字微转**——
> 前者保证笔触布满全局，后者让每个字歪一点点。两者算完交给 Handlebars 模板，
> 模板本身不含逻辑，改版式只改模板或数据。

> `npm run check` 里的 **字体授权闸门** 会逐个核对字体包的 LICENSE：不在白名单
> （OFL 1.1 / OFL 1.0 / Apache-2.0 / MIT）、出现"仅供个人使用/非商用"表述、
> 或声明了保留字体名的字体，都会让检查失败。换字体后必须重跑。

## 目录

```
src/
  content/
    book.json          # 书名与副标题（页面清单在 specs/ 里）
    specs/*.js         # 页面数据：每页的背景/角色/道具/文字/热点（框架的输入）
  components/
    character.svg      # 噜啵的零件与姿态（idle/hungry/chomp/happy/peek/full/burp/asleep/rainbow）
    props.svg          # 苹果 / 小鱼 / 星星 / 白底块 / 月亮 / 圆箭头 / 气泡
    effects.svg        # 笔触特效层（放射线/色带/漩涡/色盘/彩纸/彩虹条/星星）
    rainbow.svg        # 彩虹身体的六条色带
  css/
    tokens.css         # 色板、字阶、角色颜色状态
    fonts.css          # 字体子集的 @font-face（Vite 负责内联）
    book.css           # 舞台、可点目标、动画、打印规则
    templates.css      # 模板底色 + 文字默认样式（位置与字号由页面数据给）
  js/
    boot.js            # 入口：按顺序引入下面三个
    audio.js           # Web Audio 合成音效
    interactions.js    # 热点 → 反馈 → 翻页
    book.js            # 翻页状态机、导航、朗读播报
  fonts/               # 字体子集（woff2，构建产物）
index.html             # 屏幕版入口
print.html             # 印刷版入口
proof.html             # 拼版入口（供截图）
vite.config.js         # 三个入口 + 单文件输出
tools/
  render-page.mjs      # 页面数据 → HTML（含背景自动出血计算、拟声词逐字微转）
  load-specs.mjs       # 读取全部页面数据
  layout-constants.mjs # 页宽/边距/页数等共用常量
  vite-pages.mjs       # Vite 插件：注入页面与 SVG 组件
  build-fonts.mjs      # 字体子集
  check-pages.mjs      # 页面数据检查（--full 强校验 32/28 页）
  check-layout.mjs     # 版式检查（Playwright 量墨迹：重叠 / 越界 / 裁切 / 热点是否罩住道具）
  check-licenses.mjs   # 字体授权闸门
  check-text.py        # 字体覆盖检查（漏字会退回系统字体）
  dump-text.mjs        # 逐页导出全书文字与字数
  gen-paths.py         # 手绘路径生成器（身体、螺旋、苹果、星星、白底块）
  gen-effects.py       # 笔触特效生成器（射线、色带、漩涡、色盘、彩纸、彩虹）
  smoke.mjs            # 交互冒烟
  chaos.mjs            # 幼儿乱读压力测试（乱点/连点/乱翻/乱划/乱敲键盘）
  pdf.mjs              # 导出印刷 PDF
  shots.mjs            # 逐页截图（调用 html-shot 技能）
  contact_sheet.py     # 联系表
dist/
  index.html           # 屏幕互动版（单文件，离线双击可读，28 页）
  print.html           # 印刷版（单文件，216 × 216 mm 出血页，32 页）
  proof.html           # 拼版（全部页面平铺，供截图）
  book.pdf             # 印刷 PDF
  shots/               # 逐页 1440 × 1440 截图 + 联系表
```

## 页面框架：改版式只改框架，不改 32 份文件

每页是一份**数据**（`src/content/specs/*.js`），不是一份手写 HTML：

```js
{
  id: 'p05',
  template: 't-dialog',
  sound: 'gulu',                       // 音效名
  aria: '咕噜，咕噜。谁的肚子在叫？',
  bg: { kind: 'bands', colors: ['--yellow', '--yellow-deep'], focus: [500, 500] },
  char: { pose: 'hungry', at: [190, 200], scale: 0.62, spiral: true },
  props: [{ kind: 'apple', at: [320, 180], scale: 0.36 }],
  text: {
    sound: { at: [40, 30], size: 11, rotate: -2 },
    narration: { at: [50, 160], size: 3.4, width: 340 },
  },
  hotspot: { action: 'belly', at: [366, 488], size: 260, label: '点一下噜啵的肚子' },
}
```

- **坐标单位是页宽千分比**（0–1000），跟画布的 viewBox 一致。
- **背景自动布满全局**：放大倍数由「焦点到页面最远角的距离 ÷ 特效半径」算出，
  所以背景永远盖满整页并溢出出血，不用逐页手调。`cover: 'x' | 'y' | 'all' | 'none'` 可控方向。
- **热点可以给一个或一组**（p13 的三样、p27 的三个道具各是三个热点）。
- 页面清单只有这一份来源：构建、检查、字体子集、截图都从 `specs/` 读。

## 几条实现上的关键约定

1. **组件一律用 `<g>`，不用 `<symbol>`。**
   `<use>` 引用 `<symbol>` 会建立一个视口，超出部分被裁掉——出血的笔触会被切出一条笔直的边
   （2026-10-30 踩过：p08 放射线被横切、p06 漩涡被竖切）。
   `<g>` 没有视口，`<use>` 只克隆不裁剪；摆放一律 `transform="translate() scale()"`。

2. **零件被 `<use>` 引用后落在影子树里，文档 CSS 选择器不生效。**
   所以 `components/*.svg` 里所有外观都写成元素内联样式，颜色与线宽走 CSS 变量（自定义属性能穿透影子树）。
   角色的颜色状态 `.state-red` 挂在页面的 `<g class="char">` 上，变量一路继承进零件。

3. **螺旋单独引用。**
   `pose-*` 里不含螺旋，页面额外写一行 `<use href="#ch-spiral" class="spiral">`，
   这样文档 CSS 才转得到它（屏幕上慢转，印刷与"减少动效"时不动）。

4. **拟声词逐字微转在构建时完成。**
   `tools/render-page.mjs` 把 `<h1 class="sound">` 里的每个字包成 `<span style="--r:…deg;--dy:…%">`，
   角度 ±3°、位移 ±1%，由字序确定性生成。打印与屏幕共用同一份标记。

5. **满版色页上角色与底色同色。**
   角色身体用页面色，靠粗黑线与白色细节（眼白、瞳孔、舌头）撑住形状——这是参考书同款做法。

6. **出图用 html-shot。**
   `dist/proof.html` 里的页面固定 720 × 720 CSS px，`--dpr 2` 出 1440 × 1440。
   渲染时带 `--offline`：产物内联了全部 CSS/JS/SVG/字体，不应有任何外部请求。

7. **同一时刻最多只有一个待定效果，且它一定属于读者当前所在页。**
   换页（`show()`）会作废还在计时的效果；计时器到期时再校验一次当前页，对不上就丢弃。
   不守这条不变量的后果是实打实的：上一页的"翻页"会活到读者翻走之后，
   等他回头再进那一页，页面会莫名自己翻走。

8. **进页面要复位这一页"已经演出过的效果"。**
   读者会走回头路（p25 摸噜啵、p30 再读一次都跳回 p05）。
   `BookInteractions.reset(page)` 不只清计数，还要复位页面状态类（`is-dim` / `is-bloom`）、
   揉肚子的螺旋角度、以及"越吃越圆"的角色缩放——
   不复位的话，读者第二次进 p23 会发现灯还是暗的、点月亮没反应。

9. **页面的键一律用 `data-id` 字符串。**
   `Book.after()` / `Book.skipPending()` 内部用 `pageKey()` 归一化，元素和 id 都收，
   但类型不认识会直接抛错——传错时早失败早好，
   静默合并成一个键会让所有页面的计时器互相打架。

10. **节流只限速，不吞输入。**
    翻页最短 350 ms 一页（防止一帧跳两页），但锁住期间到达的翻页请求会被**记住**，
    锁一开就补上：每个 350 ms 窗口里只要有点击就翻一页。
    以前是"锁住就丢"——孩子连点六下只有两下有反应，另外四下"点了没反应"，
    听起来就是坏的。实测（150 ms 间隔连点 6 下）：修前前进 2 页，修后 4 页。
    排队中的请求也会被**换页作废**（`show()` 里清），否则它会在新页面上突然翻一页。

11. **多步互动的页面标 `trap: true`：点空白不翻页。**
    "按顺序点三样 / 再喂一口 / 揉肚子 / 找一找"这几页要点好几下才过，
    点错地方就翻页等于把这一页跳过去——"找一找"更糟，会直接跳到
    "你都找到了吗？"，孩子一个都没找到。
    标了 `trap` 的页面，点空白（**书页内外都算**）只摇一下头；连错 5 下才放人走。

12. **热区必须罩住道具本身。**
    道具是按组件自己的几何渲染的，页面里写的 `at` 是锚点，不等于它在页面上的位置。
    热区没罩住的话，"点一下那条鱼"点不到鱼——书直接翻页过去。
    `tools/check-layout.mjs` 现在会量这件事。

13. **纸上点不动的提示，印刷版要改写。**
    页面文案可以带 `print` 字段覆盖印刷版：空字符串 = 印刷版不出现这句
    （封面"点我，开始。"），也可以换成"翻回第一页吧。"这种纸上做得出来的说法。
    印刷版的字也要进字体子集（`textsOfAll`）。

14. **手写手势不能挂在 click 上。**
    触屏上拖动**不产生 click**，而且浏览器会用 `touch-action: manipulation`
    抢走拖动手势、发 `pointercancel`——挂在 click 上的判定在平板/手机上等于没有。
    所以：判定放在 `pointerup`；该热区 `touch-action: none`；
    `pointerup/pointercancel` 挂到 document 上统一收尾（手势在热区外结束也要清状态，
    不然鼠标只是在肚子上晃也会累加角度）。

## 出图

```bash
# 逐页（屏幕版 1440 × 1440）
node "<html-shot>/render.mjs" dist/proof.html dist/shots/p05.png \
  --selector "[data-id='p05']" --dpr 2 --offline --wait 300

# 联系表
python tools/contact_sheet.py "dist/shots/p*.png" -o dist/shots/contact.png --cols 4 --cell 330
```

## 打印

`dist/book.pdf` 的页面是 **216 × 216 mm**（210 mm 正文 + 3 mm 出血），交给印厂时按 210 × 210 裁切。

家用打印机直接打的话：页面比 A4（210 mm 宽）宽 6 mm，请在打印对话框里选
**「适应纸张大小 / Fit to page」**（多数驱动也会自动缩到可打印区），
打出来就是裁掉出血后的 210 mm 成品。

## 授权

见 [LICENSES.md](LICENSES.md)。音效全部为 Web Audio 合成，无第三方采样；参考 PDF 由用户提供，不随项目分发。
