import {verifyTidy,verifyTidyBrowser,tidyMutations} from './production-tidy.mjs';
import {verifyAngry,verifyAngryBrowser,angryMutations} from './production-angry.mjs';
import {verifyPlay,verifyPlayBrowser,playMutations} from './production-play.mjs';
import {verifyCare, verifyCareBrowser, careMutations} from './production-care.mjs';
/* 已制作册的冻结文字与完整状态链验收；由册元数据登记，不另建册专属流水线。 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {chromium} from 'playwright';
import {pngPixels} from './png-pixels.mjs';
import { loadBooks } from './load-specs.mjs';
const books=await loadBooks();
const requested=process.argv.find(a=>a.startsWith('--book='))?.slice(7);
const selected=requested?books.filter(b=>b.id===requested):process.argv.includes('--baseline')?books.filter(b=>b.id==='awulubo'):books.filter(b=>b.meta.production);
assert.ok(selected.length,'制作验收不得读空');
for(const book of selected) {
  assert.equal(book.pages.length,64);
  const source=fs.readFileSync(new URL('../docs/superpowers/specs/'+(book.meta.production?.script || '2026-11-15-script-r7-'+book.id+'.md'),import.meta.url),'utf8');
  const hash=createHash('sha256').update(source).digest('hex');
  assert.ok(fs.readFileSync(new URL('../docs/superpowers/specs/2026-11-15-r7-freeze.md',import.meta.url),'utf8').includes(hash),'冻结源稿指纹');
  const plain=t=>String(t).replace(/<br\s*\/?\s*>/gi,'').replace(/\s/g,'');
  for(const page of book.pages.filter(p=>Number(p.id.slice(1))>=4&&Number(p.id.slice(1))<=59)) {
    const narration=source.match(new RegExp('^- '+page.id+' 朗读正文：(.+)$','m'))?.[1].trim();
    const prompt=source.match(new RegExp('^- '+page.id+' 共读提示：(.+)$','m'))?.[1].trim();
    assert.ok(narration&&prompt,'冻结预期不得读空');
    assert.equal(plain(page.text.narration.text),plain(narration),book.id+'/'+page.id+' 正文须逐字对应冻结R7');
    assert.deepEqual(Object.keys(page.text).sort(),prompt==='—'?['narration']:['narration','prompt']);
    assert.equal(plain(page.text.prompt?.text || ''),prompt==='—'?'':plain(prompt));
    if(prompt!=='—')assert.equal(plain(page.text.prompt.print),plain(prompt));
    assert.equal(plain(page.aria),plain(narration+(prompt==='—'?'':prompt)));
    assert.ok(page.reading&&page.scene);
    assert.ok(!page.exit&&!page.trap,'正文不得隐式重读或强制操作');
  }
  if(book.id==='wuzilai') verifyTidy(book);
  if(book.id==='shengqi') verifyAngry(book);
  if(book.id==='yiqiwan') verifyPlay(book);
  if(book.id==='labuluo') verifyCare(book);
  if(book.id==='awulubo') {
    const p=n=>book.pages.find(p=>p.id==='p'+String(n).padStart(2,'0'));
    const ids=n=>(p(n).props||[]).map(o=>o.id);
    const has=(n,id)=>assert.ok(ids(n).includes(id),n+'缺少'+id);
    const absent=(n,pattern)=>assert.ok(!ids(n).some(id=>pattern.test(id)),n+'有提前或复活的物件');
    for(const [a,id] of [[8,'apple-A'],[10,'fish-A'],[12,'star-A'],[16,'apple-C']]){has(a,id);absent(a+1,new RegExp('^'+id+'$'));}
    for(const n of [30,31,32])for(const kind of ['apple','fish','star'])has(n,kind+'-D');
    absent(33,/-D$/);
    for(const n of [35,36,37])has(n,'apple-E');
    const large=n=>p(n).props.find(o=>o.id==='apple-E');
    for(const n of [36,37]){assert.deepEqual(large(n).at,large(35).at);assert.equal(large(n).scale,large(35).scale);}
    assert.equal(large(37).layer,'behind','角色蹦出后E仍在原位但退到身后');
    for(const n of [38,39,40])for(const id of ['F','G','H'])has(n,'apple-'+id);
    for(const n of [22,23])assert.equal(p(n).char.wear,'paper');
    for(const n of book.pages.filter(p=>+p.id.slice(1)>=4&&+p.id.slice(1)<=59)) {
      const i=+n.id.slice(1);
      if(![22,23].includes(i))assert.ok(!n.char?.wear,'额贴不得提前或重新佩戴');
      if(i>=9)absent(i,/^apple-A$/);
      if(i>=11)absent(i,/^fish-A$/);
      if(i>=13)absent(i,/^star-A$/);
      if(i>=15)absent(i,/-B$/);
      if(i>=17)absent(i,/^apple-C$/);
      if(i>=33)absent(i,/-D$/);
      if(i>=40)absent(i,/^K1/);
      if(i<21)absent(i,/^K1/);
      if(i<47)absent(i,/^K2/);
      if(i>=40)assert.equal(n.scene.grassScale,2,'同一草地保持草丛空间尺度');
      if(i>=40&&i!==42&&i!==43)assert.equal(n.scene.occlude,false,'出草后不得被前景草丛遮住');
    }
    for(const n of [25,26,27,28,29])has(n,'K1-tag');
    for(const n of [47,48,49,50,51,52,53,54,55,56,57,58,59])for(const color of ['red','blue','yellow'])has(n,'K2-'+color);
    has(47,'child-hand');
    const drops=[47,48,49,50,51,52].map(n=>p(n).props.find(o=>o.id==='K2-yellow').at[1]);
    assert.ok(drops.every((y,i)=>!i||y>=drops[i-1]),'最后纸片不能再次升起');
    for(const q of book.pages.filter(p=>p.numbers?.length))assert.ok([38,39,41].includes(+q.id.slice(1)),'不得增添稿外数字');
    assert.equal(p(17).char.pose,'inflated');assert.equal(p(19).char.pose,'round-ground');
    assert.equal(p(23).char.pose,'flying');
    assert.equal(p(43).char.pose,'hidden-feet');
    for(const n of [34,35,36,42,44])assert.ok(!p(n).char,'藏身页不能通过半透明角色泄露整身');
    for(const n of [56,57,58,59]){assert.equal(p(n).scene.light,'late-night');assert.ok(!p(n).char.spiral&&!p(n).hotspot);}
    assert.equal(p(28).reading,'simulate');
    assert.equal(book.pages.filter(p=>p.exit).length,1);assert.equal(p(62).exit,'p04');
    const wash=n=>p(n).bg.wash;
    assert.equal(wash(8),'--wash-cream');assert.equal(wash(9),'--wash-red');
    assert.equal(wash(10),wash(9));assert.equal(wash(11),'--wash-blue');
    assert.equal(wash(12),wash(11));assert.equal(wash(13),'--wash-yellow');
    assert.equal(wash(15),'--wash-yellow','彩虹只在肚上');
  }
}
console.log('✓ 已制作册64页、冻结正文／纸屏提示、身份链、紧邻结果、藏露与末段静止');
if(process.argv.includes('--gate'))process.exit(0);
const root=fileURLToPath(new URL('../',import.meta.url));
const temp=fs.mkdtempSync(path.join(fs.realpathSync.native(os.tmpdir()),'awulubo-production-'));
const modules=path.join(temp,'node_modules');
try {
 for(const name of ['src','tools','docs','package.json'])fs.cpSync(path.join(root,name),path.join(temp,name),{recursive:true,filter:s=>!s.includes(path.join('docs','reference'))});
 fs.symlinkSync(path.join(root,'node_modules'),modules,'junction');
 for(const book of selected) {
 const mutations=book.id==='wuzilai'?tidyMutations:book.id==='shengqi'?angryMutations:book.id==='yiqiwan'?playMutations:book.id==='labuluo'?careMutations:[
  [4,"record.pages[0].text.narration.text='旧正文';",/正文须逐字/],
  [8,"record.pages[1].props=[{id:'apple-A',kind:'apple',at:[0,0],scale:.2}];",/提前或复活/],
  [30,"record.pages[1].props=[];",/缺少/],
  [34,"record.pages[1].props[0].id='apple-D';",/缺少/],
  [24,"record.pages[1].char.wear='paper';",/额贴/],
  [46,"record.scene.occlude=true;",/前景草丛/],
  [46,"record.pages[0].props.push({id:'K2-early',kind:'paper',at:[0,0],scale:.2});",/提前或复活/],
  [28,"record.pages[0].exit='p04';",/正文不得/],
  [58,"record.pages[0].char.spiral=true;",/断言|assert|falsy/],
 ];
 for(const [n,change,error] of mutations) {
  const spec=book.pages.find(p=>+p.id.slice(1)===n),file=path.join(temp,'src/content/books',book.id,'specs',spec.file);
  const original=fs.readFileSync(file,'utf8'),changed=original.replace('export default','const record =')+'\n'+change+'\nexport default record;';
  fs.writeFileSync(file,changed);assert.notEqual(fs.readFileSync(file,'utf8'),original);
  const result=spawnSync(process.execPath,['tools/verify-production.mjs','--gate'],{cwd:temp,encoding:'utf8'});
  assert.notEqual(result.status,0,'破坏必须失败p'+n);assert.match(result.stderr,error);
  fs.writeFileSync(file,original);console.log('✓ 制作破坏回归 p'+n);
 }
}
} finally {if(fs.existsSync(modules))fs.unlinkSync(modules);fs.rmSync(temp,{recursive:true,force:true});}
const browser=await chromium.launch();
try {
 if(selected.some(b=>b.id==='wuzilai'))await verifyTidyBrowser(browser);
 if(selected.some(b=>b.id==='shengqi'))await verifyAngryBrowser(browser);
 if(selected.some(b=>b.id==='yiqiwan'))await verifyPlayBrowser(browser);
 if(selected.some(b=>b.id==='labuluo'))await verifyCareBrowser(browser);
 if(!selected.some(b=>b.id==='awulubo'))process.exitCode=0;
 else {
 const page=await browser.newPage();
 page.setDefaultTimeout(6000);
 const open=async(width,id,entry='index')=>{
  // 独立用例先销毁旧阅读文档，避免旧resize监听器与同文档hash导航交错。
  await page.goto('about:blank');
  await page.setViewportSize({width,height:1100});
  await page.goto(new URL('../dist/'+entry+'.html',import.meta.url).href+'?book=awulubo#'+id);
  await page.evaluate(()=>document.fonts.ready);
  if(entry==='index')assert.equal(await page.evaluate(()=>Book.page().dataset.id),id,'用例必须从指定页面开始');
 };
 const at=()=>page.evaluate(()=>Book.page().dataset.id);
 for(const width of [900,1440]) {
  for(const [id,object] of [['p08','apple-A'],['p10','fish-A'],['p12','star-A']]) {
    await open(width,id);const food=page.locator('.is-active [data-object="'+object+'"]');
    const initial=await food.boundingBox();await page.locator('.is-active [data-action=feed]').click();
    const measured=await food.evaluate(async(el,initial)=>{
      const animation=el.querySelector('[data-feed-ink]').getAnimations().find(a=>a.effect.getTiming().duration===700);
      if(!animation)throw Error('喂食动画缺失');
      animation.pause();animation.currentTime=0;await new Promise(requestAnimationFrame);
      const start=el.getBoundingClientRect();
      const jump=Math.hypot(start.x+start.width/2-initial.x-initial.width/2,start.y+start.height/2-initial.y-initial.height/2);
      animation.currentTime=700;await new Promise(requestAnimationFrame);
      const end=el.getBoundingClientRect(),mouth=el.closest('.page').querySelector('[data-mouth]').getBoundingClientRect();
      return {jump,distance:Math.hypot(end.x+end.width/2-mouth.x-mouth.width/2,end.y+end.height/2-mouth.y-mouth.height/2)};
    },initial);
    assert.ok(measured.jump<4,'原构图不能因动画起点跳动（描边框容差4px）：'+object+' '+measured.jump);
    assert.ok(measured.distance<8,'三种喂食实际终点须到嘴边：'+object+' '+measured.distance);
    const n=+id.slice(1)+(width===900?1:2);
    await page.waitForFunction(id=>Book.page().dataset.id===id,'p'+String(n).padStart(2,'0'));
  }
  const apple=page.locator('.is-active [data-object="apple-A"]');
  await open(width,'p16');await page.locator('.is-active [data-action=feed]').focus();await page.keyboard.press('Enter');
  await page.waitForFunction(id=>Book.page().dataset.id===id,width===900?'p17':'p18');
  await open(width,'p30');const host=page.locator('[data-book=awulubo][data-id=p30]');
  await page.locator('.is-active [data-target-id="apple-D"]').click();
  assert.equal(await host.locator('.is-flying').count(),0);assert.equal(await at(),'p30');
  await page.locator('.is-active [data-target-id="apple-D"]').click();
  assert.equal(await host.getAttribute('data-found'),'apple-D');
  for(const id of ['fish-D','star-D'])await page.locator('.is-active [data-target-id="'+id+'"]').click();
  await page.waitForFunction(id=>Book.page().dataset.id===id,width===900?'p31':'p32');
  await open(width,'p28');await page.locator('.is-active .hotspot').click();await page.waitForFunction(id=>Book.page().dataset.id===id,width===900?'p29':'p30');
  await open(width,'p08');await page.locator('.is-active .hotspot').click();await page.evaluate(()=>{Book.goToId('p12');Book.goToId('p08');});await page.waitForTimeout(900);
  assert.equal(await at(),'p08');assert.equal(await apple.evaluate(el=>el.classList.contains('is-flying')),false);
  await open(width,'p48');await page.locator('.is-active .hotspot').click();await page.waitForTimeout(180);
  assert.equal(await page.locator('[data-book=awulubo][data-id=p48] .is-wobble').count(),0,'p48须站稳等待，不提前演p49摇身');
  await page.waitForFunction(id=>Book.page().dataset.id===id,width===900?'p49':'p50');
  await open(width,'p56');await page.waitForTimeout(600);assert.equal(await at(),'p56');
  assert.equal(await page.locator('.is-active .hotspot').count(),0);
  assert.equal(await page.locator('.is-active').evaluateAll(ps=>ps.reduce((n,p)=>n+p.getAnimations({subtree:true}).length,0)),0);
  await open(width,'p56');
  const mean=data=>{let sum=0;for(let i=0;i<data.data.length;i+=data.channels)sum+=(data.data[i]+data.data[i+1]+data.data[i+2])/3;return sum/(data.width*data.height);};
  const late=mean(pngPixels(await page.locator('#stage').screenshot()));
  await open(width,'p54');const night=mean(pngPixels(await page.locator('#stage').screenshot()));
  assert.ok(late<night,'最后两跨实际画面应比入夜更暗');
  console.log('✓ '+width+'px 一口、向嘴喂食、指认守恒、次日继续、离页复位与夜歇');
 }
 const out=new URL('../dist/production-proof/awulubo/',import.meta.url);fs.mkdirSync(out,{recursive:true});
 for(const id of ['p08','p16','p22','p38','p42','p46','p56']){await open(1440,id);await page.locator('#stage').screenshot({path:fileURLToPath(new URL('screen-'+id+'.png',out))});}
 await open(1440,'p57','proof');
 const sleeping=page.locator('[data-book=awulubo][data-id=p57]');
 const ink=pngPixels(await sleeping.screenshot());
 await sleeping.locator('.char').evaluate(el=>el.style.visibility='hidden');
 const bare=pngPixels(await sleeping.screenshot());
 let changed=0;for(let i=0;i<ink.data.length;i+=ink.channels)if([0,1,2].some(c=>Math.abs(ink.data[i+c]-bare.data[i+c])>16))changed++;
 assert.ok(changed>15000,'睡姿实际墨迹不得被草丛遮住：'+changed);
 console.log('✓ 实际夜色沉降与纸书睡姿可见像素');
 for(const mode of ['print','proof','booklet']){await open(900,'p22',mode);assert.equal(await page.locator('[data-book=awulubo][data-id=p23] button').count(),0);}
}
} finally {await browser.close();}
