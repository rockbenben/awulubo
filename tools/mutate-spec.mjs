/* 仅供临时副本中的破坏回归：按结构修改记录，避免依赖源码引号与坐标格式。 */
import fs from 'node:fs';
import assert from 'node:assert/strict';
const [file,mutation]=process.argv.slice(2);
assert.ok(file&&mutation);
const original=fs.readFileSync(file,'utf8');
assert.match(original,/export default/);
const changed=original.replace('export default','const record =')+'\n'+mutation+'\nexport default record;\n';
fs.writeFileSync(file,changed);
assert.notEqual(fs.readFileSync(file,'utf8'),original,'临时破坏必须确实改变文件');
