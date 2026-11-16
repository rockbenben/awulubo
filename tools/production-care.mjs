/* 制作中的照顾故事契约；复用通用制作入口，不创建独立构建或阅读状态。 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import {pngPixels} from './png-pixels.mjs';
export function verifyCare(book){
 const p=n=>book.pages.find(p=>+p.id.slice(1)===n);
 const obj=(n,id)=>p(n).props?.find(o=>o.id===id);
 for(let n=4;n<=59;n++){
  const q=p(n);assert.ok(!q.trap&&!q.exit,'照顾不能成为强制任务或重读出口');
  assert.ok(!(q.hotspot?[q.hotspot].flat():[]).some(h=>h.action==='medicine'),'成人药物不能交给孩子');
  assert.ok(!q.props?.some(o=>o.kind==='pill'),'药物由成人持有，不散放可点药丸');
  if(n<=45||n>=52){assert.ok(obj(n,'blanket-1'),'同毯必须留在小窝或身上');assert.ok(obj(n,'cup-1'),'同杯必须保留');}
  if(n<34)assert.ok(!obj(n,'apple-A'),'苹果不能提前');
  if(n>=39&&(n<=45||n>=52))assert.equal(obj(n,'apple-A')?.kind,'apple-bitten','一口后必须保留缺口');
  if(n>=56){assert.equal(q.scene.light,'late-night');assert.ok(!q.hotspot&&!q.char.spiral,'尾段应安静');}
 }
 assert.ok(obj(6,'blanket-1').at[0]+60-(obj(6,'cup-1').at[0]+168)<100,'毯角应紧邻杯子，不能隔半页');
 assert.equal(p(6).reading,'observe');assert.equal(p(7).char.pose,'hidden-feet');
 assert.equal(p(15).char.pose,'hidden-eyes');
 assert.equal(p(17).char.pose,'turn-away');
 assert.equal(p(18).char.pose,'willing','先自主张嘴再递水');
 for(const n of [16,17])assert.ok(!p(n).hotspot,'拒水不绑定饮水');
 assert.equal(p(18).hotspot.action,'water');assert.equal(p(18).hotspot.targetId,'cup-1');
 assert.ok(obj(17,'cup-1').at[1]>obj(16,'cup-1').at[1],'收杯应放低');
 assert.deepEqual(obj(18,'cup-1').at,obj(17,'cup-1').at,'自主张嘴前杯仍低处');
 assert.equal(obj(20,'medicine-adult')?.kind,'medicine-adult','成人持有药物应在画面中');
 for(const n of [20,21])assert.ok(!p(n).hotspot,'服药及苦味只能叙事');
 for(let n=22;n<=59;n++)assert.ok(!obj(n,'medicine-adult'),'成人收离药物');
 for(const n of [34,35,36,37])assert.deepEqual(obj(n,'apple-A').at,obj(34,'apple-A').at,'主动张嘴之前苹果不递近');
 for(const n of [39,40,41,42,43,44,45,52,53,54,55,56,57,58,59])assert.deepEqual(obj(n,'apple-A').at,obj(34,'apple-A').at,'同缺口苹果归原窗边');
 for(const n of [44,45])for(const id of ['cup-1','blanket-1','apple-A'])assert.deepEqual(obj(n,id),obj(42,id),'离窝三物不追着角色走');
 for(const n of [46,47,48,49,50,51])assert.ok(!p(n).props?.some(o=>['cup-1','blanket-1','apple-A'].includes(o.id)),'门外不复制屋内物');
 assert.equal(p(30).char.pose,'sleep-curled');assert.equal(p(31).char.pose,'kick-corner');
 assert.equal(p(40).char.pose,'rise-one');assert.equal(p(41).char.pose,'ready');
 assert.equal(p(55).char.pose,'push-corner');
 assert.deepEqual(obj(55,'blanket-1').at,obj(54,'blanket-1').at,'末尾只推毯角，不搬整条毯');
 for(const n of [31,55])assert.equal(obj(n,'foot-corner')?.kind,'foot-pushing','蹬角与推角的脚必须可辨');
 assert.equal(obj(63,'apple-A')?.kind,'apple-bitten','后环衬也不补全苹果');
 assert.ok(!p(63).props.some(o=>o.kind==='pill'),'后环衬不重新散放药物');
 assert.equal(p(20).bg.wash,'--wash-blue');assert.equal(p(21).bg.wash,'--wash-red');
 assert.equal(p(24).bg.wash,p(23).bg.wash);assert.equal(p(25).bg.wash,'--night');
}
export const careMutations=[
 [6,"record.pages[0].props.find(o=>o.id==='blanket-1').at=[600,430];",/紧邻杯子/],
 [18,"record.pages[0].char.pose='turn-away';",/先自主张嘴/],
 [16,"record.pages[0].hotspot={action:'water',targetId:'cup-1',at:[500,500],size:200,label:'喝水'};",/拒水/],
 [20,"record.pages[0].props=record.pages[0].props.filter(o=>o.id!=='medicine-adult');",/成人持有/],
 [20,"record.pages[0].hotspot={action:'medicine',targetId:'medicine-adult',at:[300,400],size:300,label:'喂药'};",/不能绑定药物|自主动作不能绑定/],
 [38,"record.pages[1].props.find(o=>o.id==='apple-A').kind='apple';",/缺口/],
 [44,"record.pages[1].props.find(o=>o.id==='cup-1').at=[500,500];",/不追/],
 [46,"record.pages[1].props=[{id:'blanket-1',kind:'blanket',at:[0,0],scale:.3}];",/不复制/],
 [54,"record.pages[1].char.pose='step';",/push-corner/],
 [58,"record.pages[0].char.spiral=true;",/尾段/],
 [30,"record.pages[1].props=record.pages[1].props.filter(o=>o.id!=='foot-corner');",/脚必须可辨/],
 [54,"record.pages[1].props.find(o=>o.id==='blanket-1').at=[500,100];",/不搬整条毯/],
];
export async function verifyCareBrowser(browser){
 const page=await browser.newPage();page.setDefaultTimeout(5000);
 const open=async(w,id,entry='index')=>{await page.setViewportSize({width:w,height:1100});await page.goto(new URL('../dist/'+entry+'.html',import.meta.url).href+'?book=labuluo#'+id);await page.evaluate(()=>document.fonts.ready);};
 const current=()=>page.evaluate(()=>Book.page().dataset.id);
 for(const width of [900,1440]){
  await open(width,'p18');const cup=page.locator('[data-book=labuluo][data-id=p18] [data-object="cup-1"]');const original=await cup.getAttribute('transform');
  await page.locator('.is-active [data-action=water]').click();await page.waitForTimeout(180);
  assert.equal(await page.locator('.is-active .is-wobble,.is-active .is-flying').count(),0,'递杯不提前喝水或整杯入口');
  await page.waitForFunction(id=>Book.page().dataset.id===id,width===900?'p19':'p20');
  assert.equal(await cup.getAttribute('transform'),original);
  await open(width,'p18');await page.locator('.is-active [data-action=water]').click();await page.evaluate(()=>{Book.goToId('p20');Book.goToId('p18');});await page.waitForTimeout(1100);
  assert.equal(await current(),'p18');assert.equal(await page.locator('.is-active').first().getAttribute('data-done'),null);
  await page.locator('.is-active [data-action=water]').focus();await page.keyboard.press('Space');await page.waitForFunction(id=>Book.page().dataset.id===id,width===900?'p19':'p20');
  await open(width,'p20');assert.equal(await page.locator('.is-active .hotspot').count(),0);await page.waitForTimeout(1000);assert.equal(await current(),'p20');
  await open(width,'p38');await page.locator('.is-active [data-action=feed]').click();await page.waitForFunction(id=>Book.page().dataset.id===id,width===900?'p39':'p40');
  await open(width,'p56');await page.waitForTimeout(800);assert.equal(await current(),'p56');assert.equal(await page.locator('.is-active').evaluateAll(ps=>ps.reduce((n,p)=>n+p.getAnimations({subtree:true}).length,0)),0);
  console.log('✓ 照顾故事 '+width+'px 自主饮水、键盘、离页复位、成人药物及安静结尾');
 }
 const out=new URL('../dist/production-proof/labuluo/',import.meta.url);fs.mkdirSync(out,{recursive:true});
 for(const id of ['p06','p14','p16','p18','p20','p30','p38','p40','p46','p54','p56']){await open(1440,id);await page.locator('#stage').screenshot({path:fileURLToPath(new URL('screen-'+id+'.png',out))});}
 // Inspect actual exposed eye ink: the hood must follow the lowered head, not cover its eyes.
 await open(1440,'p33','proof');
 const host=page.locator('[data-book=labuluo][data-id=p33]');
 await host.scrollIntoViewIfNeeded();const rect=await host.boundingBox();
 const camera=await host.locator('[data-framing]').evaluate(el=>{const m=el.transform.baseVal.consolidate().matrix;return {x:m.e,y:m.f,scale:m.a};});
 const clip={x:rect.x+rect.width*(440*camera.scale+camera.x)/1000,y:rect.y+rect.height*(610*camera.scale+camera.y)/1000,width:rect.width*.26*camera.scale,height:rect.height*.03*camera.scale};
 const eyeInk=async()=>{
  await host.locator('.char').evaluate(el=>el.style.visibility='visible');
  const before=pngPixels(await page.screenshot({clip}));await host.locator('.char').evaluate(el=>el.style.visibility='hidden');
  const after=pngPixels(await page.screenshot({clip}));let ink=0;
  for(let i=0;i<before.data.length;i+=before.channels)if([0,1,2].every(c=>before.data[i+c]<90)&&[0,1,2].some(c=>Math.abs(before.data[i+c]-after.data[i+c])>16))ink++;
  await host.locator('.char').evaluate(el=>el.style.visibility='visible');return ink;
 };
 const ink=await eyeInk();assert.ok(ink>4,'低头后双眼黑色墨迹被毯边遮住：'+ink);
 // Browser-only negative control: hide the same eye band with the blanket, without touching authored files.
 await host.locator('[data-object="blanket-1"]').evaluate(el=>el.style.translate='0 50px');
 const blocked=await eyeInk();assert.ok(blocked<=4,'遮眼反例必须被像素回归拦截：'+blocked);
 console.log('✓ 毯边随低头、双眼黑色墨迹及遮眼反例：'+ink+'/'+blocked);
 for(const mode of ['print','proof','booklet']){await open(900,'p20',mode);assert.equal(await page.locator('[data-book=labuluo][data-id=p20] button').count(),0);}
 await page.close();
}
