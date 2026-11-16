# 授权说明

## 授权分层

仓库里有三种东西，授权不一样：

| 层 | 授权 | 覆盖 |
|---|---|---|
| **代码与工具** | [MIT](LICENSE) | `src/js/`、`src/css/`、`tools/`、构建与 CI 配置 |
| **作品内容** | [**CC BY-NC-ND 4.0**](LICENSE-CONTENT.md) | `src/components/`（噜啵与道具的图形）、`src/content/`（五册正文与页面数据）、`docs/superpowers/specs/`（故事脚本与角色设计） |
| **字体** | SIL OFL 1.1（见下） | `src/fonts/` |

**为什么代码和作品要分开**：MIT 允许任何人商用，而且**不可撤回**——一旦按 MIT 发出去，
此后所有拿到副本的人都永久持有商用权。对引擎来说这是好事（用的人越多越好），
对噜啵来说是坏事：这个形象和这五册书将来可能要做成商业产品。
所以代码走 MIT 招人用，作品走「免费读、免费打印、免费分享，不许商用、不许改编」，
商业用途另签授权。

作品内容的完整条款在 [LICENSE-CONTENT.md](LICENSE-CONTENT.md)：

- **可以**：读、打印（非商业）、分享、翻译，需署名
- **不可以**：印了卖、做成商品、放进收费产品、用噜啵做新故事
- **商业授权**：联系作者

## 字体

| 字体 | 用途 | 授权 | 来源 |
|---|---|---|---|
| 站酷快乐体（ZCOOL KuaiLe） | 拟声词、动作提示 | **SIL Open Font License 1.1** | `@fontsource/zcool-kuaile`（源自 googlefonts/zcool-kuaile） |
| 霞鹜文楷（LXGW WenKai） | 旁白正文 | **SIL Open Font License 1.1**（含 Klee，OFL） | `@fontsource/lxgw-wenkai` |

两套字体的 `LICENSE` 原文均写明 "This Font Software is licensed under the SIL Open Font
License, Version 1.1"，且**都没有声明 Reserved Font Name**（OFL 里出现的是术语定义，不是保留名声明）。

OFL 1.1 对本项目的实际含义：

- **可商用**：可免费用于商业项目、出版物、印刷品 ✓
- **可嵌入出版物**：字体子集内嵌进 PDF / EPUB 属于 OFL 明确允许的 "Document" 使用 ✓
- **子集可保留原名**：无 RFN，`src/fonts/*.woff2` 继续叫 ZCOOL KuaiLe / LXGW WenKai 没问题 ✓
- **必须做到**：不得单独售卖字体本身；随书附带字体文件时要一并附上 OFL 全文（本文件即）
- **不得**：把字体本身用于制作新的字体、或者暗示作者背书

构建时按全书实际用字切子集（`tools/build-fonts.mjs`），产物为 `src/fonts/*.woff2`，以 base64 内联进单文件 HTML。
子集化会丢弃部分 OpenType 特性（FFTM / feat / morx），对本书用字无影响。

**授权闸门**：`npm run check` 里的 `tools/check-licenses.mjs` 会逐个检查字体包的 LICENSE——
不在白名单（OFL 1.1 / OFL 1.0 / Apache-2.0 / MIT）里、或出现"仅供个人使用/非商用"之类表述、
或声明了保留字体名的字体，都会让检查失败。换字体后必须重跑这条。

> 注：站酷官网自己分发的版本条款与 Google Fonts 的 OFL 版本不同。本项目只使用
> `@fontsource`（OFL 1.1）版本，**不要**从站酷官网手动替换字体文件。

## 工具与依赖

| 工具 | 用途 | 授权 |
|---|---|---|
| [Vite](https://vite.dev) | 构建、打包、开发服务器 | MIT |
| [vite-plugin-singlefile](https://github.com/Matro-Nastya/vite-plugin-singlefile) | 把 CSS/JS/字体内联成单文件 HTML | MIT |
| [Handlebars](https://handlebarsjs.com) | 页面模板渲染 | MIT |
| [Playwright](https://playwright.dev) | 印刷 PDF 导出、交互冒烟、版式测量、逐页截图 | Apache-2.0 |
| [fontTools](https://github.com/fonttools/fonttools) | 字体子集化、cmap 覆盖检查 | MIT |
| [pypdf](https://github.com/py-pdf/pypdf) | 成品 PDF 的纸型、嵌入字体、Type3 与标题验收 | BSD-3-Clause |
| [Pillow](https://python-pillow.org) | 截图闸门与联系表读 PNG | MIT-CMU |
| [@fontsource/zcool-kuaile](https://fontsource.org/fonts/zcool-kuaile)、[@fontsource/lxgw-wenkai](https://fontsource.org/fonts/lxgw-wenkai) | 字体文件分发 | OFL-1.1（见上） |

以上均为宽松许可（MIT / Apache-2.0 / BSD-3-Clause 等），可自由用于商业出版；随产物分发的只有构建结果（HTML/PDF/PNG），不涉及第三方代码。

## 音效

全部由 Web Audio API 实时合成（`src/js/audio.js`），不含任何第三方采样文件。

## 图形

角色、道具、文本、互动序列均为本项目原创，由 `tools/gen-paths.py` 生成的确定性路径构成。

**授权：CC BY-NC-ND 4.0**（见 [LICENSE-CONTENT.md](LICENSE-CONTENT.md)）——
可以免费读、打印、分享、翻译（需署名），不可以商用、不许改编成新故事。

## 故事与文本

五册的旁白、拟声词与页面数据（`src/content/`）与图形同属一份作品，
授权见 [LICENSE-CONTENT.md](LICENSE-CONTENT.md)。

## 参考书

《魔法师杜噜嘟嘟 太神奇啦！》与《魔法师杜噜嘟嘟 神奇的故事又来啦！》（（法）埃尔维·杜莱文图，赵佼佼译）仅用于画风分析。
本项目不复制其角色、咒语文本、互动桥段与具体页面构图，只沿用"白纸舞台 + 粗黑线 + 饱和平涂 + 手写字入画 +
第二人称指令"这类类型语法。参考 PDF 由用户自行提供，不随项目分发。
