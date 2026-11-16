#!/bin/bash
# 只由verify:teeth或verify-density在临时副本执行。旧未分类行为使用固定合成夹具。
cd "$(dirname "$0")/.." || exit 1
SPEC=src/content/books/wuzilai/specs/09-wait.js
FILES="src/content/books/wuzilai/specs/06-cup.js src/content/books/wuzilai/specs/07-mess.js src/content/books/wuzilai/specs/08-sit.js $SPEC src/content/books/wuzilai/specs/10-mess2.js src/content/books/wuzilai/specs/11-noscold.js src/content/books/wuzilai/specs/12-cry.js"
GATE=tools/check-interaction-density.mjs
BAK=$(mktemp -d)
for f in $FILES; do cp "$f" "$BAK/original-$(basename "$f")" || exit 1; done
cp "$GATE" "$BAK/gate.mjs" || exit 1
cleanup() {
  for f in $FILES; do cp "$BAK/original-$(basename "$f")" "$f"; done
  cp "$BAK/gate.mjs" "$GATE"
  rm -rf "$BAK"
}
trap cleanup EXIT
node --input-type=module - $FILES <<'JS'
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
for(const file of process.argv.slice(2)){
 const original=fs.readFileSync(file,'utf8');
 const record=structuredClone((await import(pathToFileURL(path.resolve(file)))).default);
 for(const page of record.pages){
  delete page.reading;delete page.responseTo;delete page.hotspot;delete page.trap;delete page.pat;
  if(['p12','p18','p24'].includes(page.id))page.hotspot={targetId:'character',target:'char',action:'poke',at:[400,300],size:400,label:'点一下噜啵'};
 }
 fs.writeFileSync(file,'/** @satisfies {import(\'../../../../js/model.ts\').Spread} */\nexport default '+JSON.stringify(record,null,2)+';\n');
 assert.notEqual(fs.readFileSync(file,'utf8'),original,'旧稿夹具必须实际生成');
}
JS
if [ "$?" != "0" ]; then exit 1; fi
for f in $FILES; do cp "$f" "$BAK/legacy-$(basename "$f")" || exit 1; done
restore() {
  for f in $FILES; do cp "$BAK/legacy-$(basename "$f")" "$f"; done
  cp "$BAK/gate.mjs" "$GATE"
}
fail=0
check() {
  if [ "$4" != "0" ] && echo "$3" | grep -qF "$2"; then
    echo "✓ $1 → 报出来了"
  else
    echo "✗ $1 → 退出码 $4（必须非0），且应报告「$2」"
    echo "$3" | tail -8
    fail=1
  fi
}
broke() {
  if cmp -s "$1" "$2"; then echo "✗ 破坏没生效：$1"; fail=1; return 1; fi
}
echo "=== 1. 旧未分类夹具抽掉中间poke，叙事段断档 ==="
restore
node tools/mutate-spec.mjs "$SPEC" "delete record.pages[0].hotspot;"
if broke "$SPEC" "$BAK/legacy-$(basename "$SPEC")"; then
  out=$(node "$GATE" 2>&1); code=$?
  check "互动断档" "✗ wuzilai 从" "$out" "$code"
fi
restore
echo "=== 2. 闸门读空了必须红 ==="
sed -i 's/const START = 4;/const START = 999;/' "$GATE"
if broke "$GATE" "$BAK/gate.mjs"; then
  out=$(node "$GATE" 2>&1); code=$?
  check "读到零页" "一页叙事正文都没读到" "$out" "$code"
fi
restore
echo "=== 3. 基线：旧未分类夹具必须正常通过 ==="
out=$(node "$GATE" 2>&1); code=$?
if [ "$code" = "0" ] && echo "$out" | grep -qF "互动断档 0 处"; then
  echo "✓ 基线0处 → 闸门绿着"
else
  echo "✗ 基线没过：退出码 $code（必须为0）"; echo "$out" | tail -8; fail=1
fi
if [ "$fail" = "0" ]; then echo "全部3条都有牙齿"; else echo "有闸门没牙齿"; fi
exit $fail
