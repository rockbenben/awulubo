/* 单球争抢、轮流及饰品状态；由通用制作入口调用。 */
import assert from 'node:assert/strict';
import fs from 'node:fs';import {fileURLToPath} from 'node:url';
import {pngPixels} from './png-pixels.mjs';
export function verifyPlay(book){
 const p=n=>book.pages.find(p=>+p.id.slice(1)===n);
 const ball=n=>p(n).props?.find(o=>o.id==='ball-1');
 const head=n=>p(n).props?.find(o=>o.id==='headband-1');
 for(let n=4;n<=59;n++){
  assert.equal(p(n).props?.filter(o=>/^ball/.test(o.kind)).length,1,'只允许同球A，不复制');assert.ok(ball(n),'同球A不得消失');
  assert.match(ball(n).style,/--ball:\s*var\(--blue\)/,'同球颜色保持');
  assert.ok(!p(n).props.some(o=>['paper','flower','moon'].includes(o.kind)),'无新彩纸或月亮任务');
  if(n<7)assert.equal(p(n).char.wear,'headband');
  else if(n<23)assert.equal(p(n).char.wear,'headband-tilted');
  else if(n<50)assert.equal(p(n).char.wear,'headband-low','分享后不能把歪发带复正');
  else {assert.ok(!p(n).char.wear,'摘下发带不再戴回');assert.equal(head(n)?.kind,'headband','同带H必须保留');}
  if(n%2)assert.equal(p(n).responseTo,'p'+String(n-1).padStart(2,'0'));
  if(n>=56){assert.equal(p(n).scene.light,'late-night');assert.ok(!p(n).hotspot&&!p(n).char.spiral);}
 }
 assert.equal(p(9).char.pose,'back');assert.equal(ball(9).layer,'behind','藏球须由身体遮挡');
 for(const n of [14,15]){assert.ok(!p(n).hotspot,'数三不是强制分享倒计时');assert.deepEqual(ball(n).at,ball(14).at);}
 assert.equal(ball(20).kind,'ball');for(const n of [21,22])assert.equal(ball(n).kind,'ball-squeezed');
 for(let n=23;n<=34;n++){assert.equal(ball(n).kind,'ball');assert.deepEqual(ball(n).at,ball(23).at,'墙脚停留不能提前归角色');assert.equal(ball(n).scale,ball(23).scale);}
 for(const n of [35,36,37,43])assert.equal(p(n).props.find(o=>o.id==='child-hand')?.kind,'palm','接到孩子手中，不能由角色接管');
 assert.deepEqual(ball(35).at,ball(36).at);assert.deepEqual(ball(36).at,ball(37).at,'短抛后仍由孩子接住');
 assert.match(ball(36).style,/--go-arc:\s*90/);assert.match(ball(36).style,/--go-y:[ ]*0(?:;|$)/);
 assert.equal(p(34).char.pose,'push','角色应朝孩子侧推球，不背向接球方');
 assert.ok(ball(34).at[0]<p(34).char.at[0],'角色到墙边，从球的右后方向左侧孩子推出');
 assert.deepEqual(ball(39).at,ball(40).at);assert.deepEqual(ball(40).at,ball(41).at);assert.notEqual(ball(41).layer,'behind','让开后不再藏球');
 assert.deepEqual(ball(45).at,ball(46).at,'p45迎到脚前，p46才从同处回传');
 for(let n=49;n<=59;n++)assert.deepEqual(ball(n).at,ball(49).at,'停止后不再演额外传球');
 for(let n=51;n<=59;n++)assert.deepEqual(head(n).at,head(51).at,'摘下的同带静放');
 for(const n of [34,36,38,42,44])assert.equal(p(n).hotspot?.targetId,'ball-1');
 const routes=[34,36,38,42,44].map(n=>{
  const from=ball(n),to=ball(n+1);
  const offset=axis=>Number(from.style.match(new RegExp('--go-'+axis+':\\s*(-?[\\d.]+)'))?.[1]||0);
  return {page:p(n).id,end:[from.at[0]+offset('x'),from.at[1]+offset('y'),from.scale,from.rotate||0],next:[...to.at,to.scale,to.rotate||0]};
 });
 assert.deepEqual(routes.map(r=>({page:r.page,end:r.end})),routes.map(r=>({page:r.page,end:r.next})),'五处传球终点必须与紧邻结果页同球位置、尺度及朝向一致');
 for(const n of [10,16]){const h=p(n).props.find(o=>o.id==='child-hand');assert.ok(h.at[0]+h.scale*378<ball(n).at[0]+50-40,'请求摸球前手不能已经抓住');}
 assert.equal(p(42).char.pose,'step','主动回传应挺身，区别低身护球');
 const hand=p(22).props.find(o=>o.id==='child-hand');assert.ok(hand.at[0]+hand.scale*378<ball(22).at[0],'都松了之后手必须离开球');
 assert.equal(p(17).char.pose,'guard-step','拒绝侧移不能笑着让球');
 assert.equal(p(20).char.pose,'press-ball');
 assert.equal(p(18).hotspot,undefined);assert.equal(p(20).hotspot,undefined,'不让孩子实际拉扯');
 assert.equal(p(19).bg.wash,'--wash-blue');for(let n=20;n<=45;n++)assert.equal(p(n).bg.wash,'--wash-orange','橙黄挤入后不无依据换回蓝色');
 assert.equal(p(46).bg.wash,'--wash-yellow');assert.equal(p(52).bg.wash,'--night');
}
export const playMutations=[
 [10,"record.pages[0].props.find(o=>o.id==='child-hand').at=[300,620];",/手不能已经抓住/],
 [22,"record.pages[0].props.find(o=>o.id==='child-hand').at=[300,600];",/手必须离开/],
 [22,"record.pages[1].props.push({...record.pages[1].props.find(o=>o.id==='ball-1'),id:'ball-2'});",/只允许同球/],
 [24,"record.pages[0].props.find(o=>o.id==='ball-1').at=[700,500];",/墙脚停留/],
 [20,"record.pages[1].props.find(o=>o.id==='ball-1').kind='ball';",/ball-squeezed/],
 [32,"record.pages[1].char.wear='headband';",/分享后不能/],
 [36,"record.pages[1].props=record.pages[1].props.filter(o=>o.id!=='child-hand');",/孩子手中/],
 [36,"record.pages[0].props.find(o=>o.id==='ball-1').style='--ball:var(--blue);--go-y:-300';",/go-arc/],
 [44,"record.pages[1].props.find(o=>o.id==='ball-1').at=[0,0];",/p45迎到/],
 [50,"record.pages[1].char.wear='headband-low';",/不再戴回/],
 [54,"record.pages[1].props.find(o=>o.id==='ball-1').at=[0,0];",/停止后/],
 [58,"record.pages[1].char.spiral=true;",/assert|falsy/],
 ...[34,36,38,42,44].map(n=>[n,"const ball=record.pages[0].props.find(o=>o.id==='ball-1');ball.style=ball.style.replace(/--go-x:-?[\\d.]+/,'--go-x:1');",/五处传球终点/]),
 [34,"record.pages[0].props.find(o=>o.id==='ball-1').style='--ball:var(--blue);--go-x:400;--go-y:0';",/五处传球终点/],
 [42,"record.pages[0].props.find(o=>o.id==='ball-1').style='--ball:var(--blue);--go-x:-320;--go-y:0';",/五处传球终点/],
 [34,"record.pages[0].char.pose='push-right';",/朝孩子侧/],
];
export async function verifyPlayBrowser(browser){
 const page=await browser.newPage();page.setDefaultTimeout(6000);
 const open=async(w,id,mode='index')=>{await page.goto('about:blank');await page.setViewportSize({width:w,height:1100});await page.goto(new URL('../dist/'+mode+'.html',import.meta.url).href+'?book=yiqiwan#'+id);await page.evaluate(()=>document.fonts.ready);};
 const values=t=>t.match(/-?\d+(?:\.\d+)?/g).map(Number);
 for(const width of [900,1440]){
  for(const reducedMotion of ['no-preference','reduce']){
   await page.emulateMedia({reducedMotion});
   for(const n of [34,36,38,42,44]){
    const id='p'+n,next='p'+(n+1);await open(width,id);
    const host=page.locator('[data-book=yiqiwan][data-id='+id+']');
    const object=host.locator('[data-object="ball-1"]');
    assert.equal(await host.locator('[data-action=pass]').count(),1,'每次只传同一个球');
    assert.equal(await object.count(),1,'同球身份唯一');
    await object.evaluate(el=>el.parentNode.appendChild(el));
    await page.evaluate(()=>{const host=Book.page(),ball=host.querySelector('[data-object="ball-1"]'),finish=BookEffects.finish;window.__routeEnd=null;BookEffects.finish=function(p){if(p===host)window.__routeEnd={transform:ball.getAttribute('transform'),sameObject:p.querySelector('[data-object="ball-1"]')===ball};return finish.apply(this,arguments);};});
    await host.locator('[data-action=pass]').focus();await page.keyboard.press(n===36?'Space':'Enter');
    await page.waitForFunction(()=>window.__routeEnd!==null);
    const end=await page.evaluate(()=>window.__routeEnd);
    const expected=await page.locator('[data-book=yiqiwan][data-id='+next+'] [data-object="ball-1"]').getAttribute('transform');
    assert.deepEqual(values(end.transform),values(expected),width+'px '+id+' '+reducedMotion+' 实际传球终点须与紧邻结果一致');
    assert.ok(end.sameObject,'传球不能替换对象');
    await page.waitForFunction(id=>Book.page().dataset.id===id,'p'+(n+(width===900?1:2)));
    if(reducedMotion==='no-preference'){
     await open(width,id);await host.locator('[data-action=pass]').dblclick({delay:40});
     await page.waitForFunction(id=>Book.page().dataset.id===id,'p'+(n+(width===900?1:2)));
     await page.waitForTimeout(150);
     assert.equal(await page.evaluate(()=>Book.page().dataset.id),'p'+(n+(width===900?1:2)),'重复输入不能多翻一组');
     await open(width,id);const initial=await object.getAttribute('transform');
     await host.locator('[data-action=pass]').click();
     await page.evaluate(id=>{Book.goToId('p48');Book.goToId(id);},id);
     await page.waitForTimeout(850);
     assert.equal(await page.evaluate(()=>Book.page().dataset.id),id,'旧回调不能带走重进页');
     assert.equal(await object.getAttribute('transform'),initial,'同球离页后须复原');
     assert.equal(await host.getAttribute('data-passing'),null);
     assert.equal(await host.getAttribute('data-done'),null);
    }
   }
  }
  await page.emulateMedia({reducedMotion:'no-preference'});
  await open(width,'p36');const ball=page.locator('[data-book=yiqiwan][data-id=p36] [data-object="ball-1"]');const original=await ball.getAttribute('transform');
  await page.evaluate(()=>{const host=Book.page(),el=host.querySelector('[data-object="ball-1"]');window.__playSamples=[];window.__playEnd=null;const finish=BookEffects.finish;BookEffects.finish=function(p){if(p===host)window.__playEnd=el.getAttribute('transform');return finish.apply(this,arguments);};new MutationObserver(()=>window.__playSamples.push(el.getAttribute('transform'))).observe(el,{attributes:true,attributeFilter:['transform']});});
  const button=page.locator('.is-active [data-action=pass]');await button.focus();await page.keyboard.press(width===900?'Enter':'Space');
  await page.waitForFunction(id=>Book.page().dataset.id===id,width===900?'p37':'p38');
  const motion=await page.evaluate(()=>({end:window.__playEnd,samples:window.__playSamples}));const y=t=>Number(t.match(/translate\(\s*[^, ]+[ ,]+(-?[\d.]+)/)[1]);
  assert.ok(motion.end&&motion.samples.length>3);assert.ok(Math.abs(y(motion.end)-y(original))<1,'轻抛终点必须回到孩子手中');
  const rise=y(original)-Math.min(...motion.samples.map(y));assert.ok(rise>40&&rise<=95,'轻抛只允许短弧线：'+rise);
  if(width===900){
   await open(width,'p36');
   await page.evaluate(()=>{const el=Book.page().querySelector('[data-object="ball-1"]');el.style.setProperty('--go-arc','0');el.style.setProperty('--go-y','-100');window.__legacyEnd=null;const finish=BookEffects.finish;BookEffects.finish=function(p){window.__legacyEnd=el.getAttribute('transform');return finish.apply(this,arguments);};});
   await page.locator('.is-active [data-action=pass]').click();await page.waitForFunction(()=>window.__legacyEnd!==null);
   const oldEnd=await page.evaluate(()=>window.__legacyEnd);
   assert.throws(()=>assert.ok(Math.abs(y(oldEnd)-y(original))<1,'轻抛终点必须回到孩子手中'),/回到孩子手中/,'旧的直线上抛反例必须失败');
   await page.reload();await page.evaluate(()=>document.fonts.ready); // 反例的临时style与finish包装不能污染后续真实页面

  }
  await open(width,'p14');await page.waitForTimeout(900);assert.equal(await page.evaluate(()=>Book.page().dataset.id),'p14');assert.equal(await page.locator('.is-active .hotspot').count(),0);
  await open(width,'p56');await page.waitForTimeout(800);assert.equal(await page.locator('.is-active').evaluateAll(ps=>ps.reduce((n,p)=>n+p.getAnimations({subtree:true}).length,0)),0);
  console.log('✓ 一起玩 '+width+'px 孩子短抛自接、重复／重排、离页复位、非强制等候及夜尾');
 }
 // Compare actual pixels to prove the same ball is hidden by the body, then fully visible after yielding.
 for(const [id,visible]of [['p09',false],['p41',true]]){await open(1440,id,'proof');const host=page.locator('[data-book=yiqiwan][data-id='+id+']');const before=pngPixels(await host.screenshot());await host.locator('[data-object="ball-1"]').evaluate(el=>el.style.visibility='hidden');const after=pngPixels(await host.screenshot());let diff=0;for(let i=0;i<before.data.length;i+=before.channels)if([0,1,2].some(c=>Math.abs(before.data[i+c]-after.data[i+c])>16))diff++;assert.ok(visible?diff>500:diff===0,'藏球与不再藏须在实际墨迹成立：'+id+'/'+diff);}
 const out=new URL('../dist/production-proof/yiqiwan/',import.meta.url);fs.mkdirSync(out,{recursive:true});for(const id of ['p06','p18','p20','p24','p30','p34','p36','p38','p44','p46','p50','p56']){await open(1440,id);await page.locator('#stage').screenshot({path:fileURLToPath(new URL('screen-'+id+'.png',out))});}
 for(const mode of ['print','proof','booklet']){await open(900,'p36',mode);assert.equal(await page.locator('[data-book=yiqiwan][data-id=p36] button').count(),0);}
 await page.close();
}
