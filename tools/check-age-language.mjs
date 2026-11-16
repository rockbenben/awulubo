/* 适龄语言闸门：正文里不该出现三岁孩子接不住的说法。
   依据设计规格 §5.3 / §5.3.1 的三岁硬标准（能理解、能接受、愿意互动），
   以及 AGENTS.md「不用『没关系』否定第四册的生气情绪」。

   只查正文 p04–p59：p60 之后是版权页、给大人的话、后环衬，
   那几页是写给大人看的，「没关系」「所以」都是正常说法。

   用法：node tools/check-age-language.mjs
   失败即退出码 1，报错要说清怎么改。 */
import { loadBooks } from './load-specs.mjs';

const SLOTS = [
  ['旁白', 'narration'],
  ['提示', 'prompt'],
  ['拟声词', 'sound'],
];

/* 每条规则都带「怎么修」——闸门光说不合格，写稿的人不知道往哪儿改。 */
const RULES = [
  {
    name: '比喻/类比',
    re: /(?<!好)像|仿佛|似的/,
    fix: '三岁按字面听，改成看得见的动作或画面（例：『像云一样散了』→『一起呼——』）',
  },
  {
    name: '条件或转折复句',
    re: /不然|因为|所以|但是|可是/,
    fix: '拆成两个短句（例：『脚有点软，可是跟上了』→『脚有点软。还是跟上了。』）',
  },
  {
    name: '抽象或指令不明的词',
    re: /别憋着|满满当当|一个字也没有|按顺序/,
    fix: '换成三岁看得见、做得到的说法（例：『按顺序点三样』→『三样都点一点』）',
  },
  {
    name: '否定情绪',
    re: /没关系/,
    books: ['shengqi'],
    fix: '《生气啦！》讲的是承认生气，别由大人替孩子说没关系；改成『先放着。』这类不给结论的话',
  },
];

function linesOf(value) {
  if (!value || !value.text) return [];
  const raw = Array.isArray(value.text) ? value.text : [value.text];
  return raw.map((line) => String(line).replace(/<br>/g, ''));
}

const books = await loadBooks();
let checkedPages = 0;
let checkedLines = 0;
let hits = 0;

for (const b of books) {
  for (const page of b.pages) {
    const n = Number(page.id.slice(1));
    if (!(n >= 4 && n <= 59)) continue;
    checkedPages++;

    /* 同一页里同一条规则可能命中好几个槽位，报一次就够。 */
    const seen = new Set();
    const slots = SLOTS.map(([label, key]) => [label, linesOf(page.text && page.text[key])]);
    /* 纸书用 print 覆写同一槽位：那几页也是念给三岁孩子听的，
       一样不能出现比喻、复句或「没关系」。 */
    for (const [label, key] of SLOTS) {
      const t = page.text && page.text[key];
      if (t && t.print !== undefined && t.print !== null) {
        slots.push(['印刷版' + label, linesOf({ text: t.print })]);
      }
    }
    if (page.aria) slots.push(['朗读文本', [String(page.aria)]]);

    for (const [label, lines] of slots) {
      for (const line of lines) {
        checkedLines++;
        for (const rule of RULES) {
          if (rule.books && !rule.books.includes(b.id)) continue;
          if (!rule.re.test(line)) continue;
          const key = rule.name + '|' + line;
          if (seen.has(key)) continue;
          seen.add(key);
          hits++;
          console.log(
            `✗ ${b.id}/${page.id} ${label}「${line}」命中「${rule.name}」\n` +
              `    → ${rule.fix}`
          );
        }
      }
    }
  }
}

/* 读到零条数据不能算过：槽名一改、范围一改，闸门就会悄悄变成假绿。
   跟 check-contrast.mjs / audit-script.mjs 同一个形状。 */
if (checkedPages === 0 || checkedLines === 0) {
  console.error(
    '✗ 一页正文文字都没读到（text 槽名变了？正文范围不是 p04–p59？）' +
      '——读到空不等于适龄'
  );
  process.exit(1);
}

console.log(`\n读了 ${checkedPages} 页正文、${checkedLines} 条文字，命中 ${hits} 处`);
if (hits === 0) console.log('（没有三岁接不住的说法）');
process.exitCode = hits === 0 ? 0 : 1;
