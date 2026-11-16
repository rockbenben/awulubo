/* P1-3：共读分类不能把观察变喂食，也不能让角色自主动作等待点击。 */
import assert from 'node:assert/strict';
import { createPageRenderer } from './render-page.mjs';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import { chromium } from 'playwright';
import { createHash } from 'node:crypto';
import { validateReading, validateResponses } from '../src/js/model.ts';
const render = createPageRenderer();
const char = {pose:'ready',at:[200,250],scale:.6};
for (const reading of ['observe','simulate','autonomous']) {
  const html = render({id:'p06',reading,char});
  assert.ok(!html.includes('data-pat="1"'), `${reading}不得隐式变成拍打任务`);
  assert.ok(html.includes(`data-reading="${reading}"`));
}
const root=fileURLToPath(new URL('../',import.meta.url));
const temp=fs.mkdtempSync(path.join(fs.realpathSync.native(os.tmpdir()),'awulubo-reading-'));
const modules=path.join(temp,'node_modules');
let browser;
try {
  const doc='docs/superpowers/specs/';
  const mapping=fs.readFileSync(path.join(root,doc,'2026-11-15-p1-reading-map.md'),'utf8');
  const freeze=fs.readFileSync(path.join(root,doc,'2026-11-15-r7-freeze.md'),'utf8');
  const expected=[];
  for(const book of ['awulubo','labuluo','yiqiwan','shengqi','wuzilai']) {
    const name='2026-11-15-script-r7-'+book+'.md';
    const bytes=fs.readFileSync(path.join(root,doc,name));
    const hash=createHash('sha256').update(bytes).digest('hex');
    assert.ok(freeze.split('\n').some(line=>line.includes(name)&&line.includes(hash)),'冻结原稿指纹不符');
    const state=fs.readFileSync(path.join(root,doc,'2026-11-15-r7-state-'+book+'.md'),'utf8');
    const blocks=[...bytes.toString('utf8').matchAll(/### (S\d{2}) · (p\d{2})｜(p\d{2}) · ([^\r\n]+)\r?\n([\s\S]*?)(?=\r?\n### |\r?\n## |$)/g)];
    assert.equal(blocks.length,28,'每册必须有28跨，不得读空');
    for(const [,sn,left,right,title,body] of blocks) {
      const prompt=body.match(new RegExp('- '+left+' 共读提示：([^\\r\\n]+)'))?.[1];
      const result=body.match(new RegExp('- '+right+' 朗读正文：([^\\r\\n]+)'))?.[1];
      const category=body.match(/- 共读定位：([^；]+)/)?.[1];
      assert.ok(prompt&&result&&category);
      const mode=category.startsWith('模拟')?'simulate':/^(观察|阅读)/.test(category)?'observe':'autonomous';
      assert.ok(state.includes('| '+left+'／'+sn+' |')&&state.includes('| '+right+'／'+sn+' |'));
      expected.push(`| ${sn} ${left}→${right} ${title} | ${mode} | ${prompt} | ${result} |`);
    }
  }
  const verifyMap=text=>{
    const rows=text.split('\n').filter(line=>/^\| S\d{2} p/.test(line));
    assert.equal(rows.length,140,'五册映射必须覆盖140跨');
    assert.equal(expected.length,140);
    expected.forEach((prefix,i)=>assert.ok(rows[i].startsWith(prefix),'映射须逐跨对应冻结稿：'+prefix));
  };
  verifyMap(mapping);
  const mapFile=path.join(temp,'broken-map.md');
  fs.writeFileSync(mapFile,mapping.replace(/^\| S01 p[^\n]+\n/m,''));
  assert.notEqual(fs.readFileSync(mapFile,'utf8'),mapping);
  assert.throws(()=>verifyMap(fs.readFileSync(mapFile,'utf8')),/140跨/);
  console.log('✓ 五册140跨分类、提示、紧邻结果及冻结指纹；映射缺行必须失败');
  for(const name of ['src','tools','package.json','index.html','print.html','proof.html','booklet.html','vite.config.js']) {
    if(fs.existsSync(path.join(root,name)))fs.cpSync(path.join(root,name),path.join(temp,name),{recursive:true});
  }
  fs.symlinkSync(path.join(root,'node_modules'),modules,'junction');
  const {loadBooks}=await import(pathToFileURL(path.join(temp,'tools/load-specs.mjs')));
  const baseline=await loadBooks();
  const book=baseline.find(b=>b.id==='labuluo');
  const files=new Map();
  for(const id of ['p06','p08','p10','p12','p14']) {
    const file=path.join(temp,'src/content/books/labuluo/specs',book.pages.find(p=>p.id===id).file);
    files.set(id,{file,original:fs.readFileSync(file,'utf8')});
  }
  const prop=(id,at)=>({id,kind:'apple',at,scale:.27});
  const hs=(targetId,at,action='find')=>({targetId,target:action==='poke'?'char':'apple',action,at,size:300,label:'指指这里'});
  const fixtures={
    p06:[{id:'p06',reading:'observe',char,props:[prop('A',[80,580]),prop('B',[600,580])],hotspot:[hs('A',[80,580]),hs('B',[600,580])]},
      {id:'p07',reading:'autonomous',responseTo:'p06',char}],
    p08:[{id:'p08',reading:'simulate',char,hotspot:hs('character',[200,250],'poke')},
      {id:'p09',reading:'simulate',char,hotspot:hs('character',[200,250],'poke')}],
    p12:[{id:'p12',reading:'simulate',props:[{id:'S',kind:'star',at:[100,300],scale:.3,style:'--go-x:400;--go-y:250'}, {id:'B',kind:'basket',at:[600,650],scale:.3}],hotspot:{...hs('S',[100,300],'tidy'),target:'star'}},
      {id:'p13',reading:'autonomous',responseTo:'p12',props:[{id:'S',kind:'star',at:[500,550],scale:.3},{id:'B',kind:'basket',at:[600,650],scale:.3}]}],
    p14:[{id:'p14',trap:true,props:['apple','fish','star'].map((kind,i)=>({id:'legacy-'+kind,kind,at:[80+i*280,350],scale:.25,style:'--go-x:0;--go-y:200'})),hotspot:['apple','fish','star'].map((kind,i)=>({targetId:'legacy-'+kind,target:kind,action:'tidy',at:[60+i*280,300],size:250,label:'收进篮子'}))},
      {id:'p15',reading:'autonomous',responseTo:'p14'}],
    p10:[{id:'p10',reading:'autonomous',char,props:[{id:'ball-A',kind:'ball',at:[400,650],scale:.25}]},
      {id:'p11',reading:'autonomous',responseTo:'p10',char,props:[{id:'ball-A',kind:'ball',at:[100,650],scale:.25}]}],
  };
  const put=(id,pages)=>{
    const {file}=files.get(id),previous=fs.readFileSync(file,'utf8');
    fs.writeFileSync(file,'export default '+JSON.stringify({pages})+';\n');
    assert.notEqual(fs.readFileSync(file,'utf8'),previous,'回归须确实改动临时文件');
  };
  for(const [name,patch,error] of [
    ['观察绑定喂食',{reading:'observe',hotspot:hs('A',[80,580],'feed')},/观察/],
    ['自主绑定传球',{reading:'autonomous',hotspot:hs('A',[80,580],'pass')},/自主/],
    ['共读强制trap',{reading:'simulate',trap:true},/trap/],
    ['隐式拍打复活',{reading:'simulate',pat:true},/pat/],
    ['未知类别',{reading:'other'},/未知reading/],
    ['兑现隔页',{reading:'autonomous',hotspot:undefined,responseTo:'p04'},/紧邻/],
    ['对象身份错误',{reading:'observe',hotspot:hs('missing',[80,580])},/targetId/],
  ]) {
    put('p06',[{...fixtures.p06[0],...patch},fixtures.p06[1]]);
    await assert.rejects(loadBooks,error,name);
    console.log('✓ 共读声明破坏回归 '+name);
  }
  for(const {file,original} of files.values())fs.writeFileSync(file,original);
  assert.deepEqual(await loadBooks(),baseline,'新字段未声明时加载接口与数据原样恢复');
  assert.throws(()=>validateResponses([{id:'p07',reading:'autonomous',responseTo:'p06'},{id:'p06'}]),/紧邻/);
  assert.throws(()=>validateReading({id:'p20',reading:'simulate',hotspot:hs('A',[0,0],'medicine')}),/药物/);
  const densityFiles=[...new Set(baseline.find(b=>b.id==='yiqiwan').pages.filter(p=>Number(p.id.slice(1))>=4&&Number(p.id.slice(1))<=47).map(p=>p.file))].map(name=>{
    const file=path.join(temp,'src/content/books/yiqiwan/specs',name);
    return {file,original:fs.readFileSync(file,'utf8')};
  });
  const density=()=>spawnSync(process.execPath,['tools/check-interaction-density.mjs'],{cwd:temp,encoding:'utf8'});
  for(const mapped of [false,true]) {
    for(const {file,original} of densityFiles) {
      const changed=original.replace('export default','const record =')+`\nrecord.pages.forEach(p=>{delete p.hotspot;delete p.trap;delete p.pat;delete p.reading;delete p.responseTo;${mapped?"p.reading='autonomous';":''}});export default record;`;
      fs.writeFileSync(file,changed);assert.notEqual(fs.readFileSync(file,'utf8'),original);
    }
    const result=density();
    assert.equal(result.status,mapped?0:1,mapped?'明确无输入的自主叙事不得被密度闸门逼补poke':result.stdout+result.stderr);
  }
  for(const {file,original} of densityFiles)fs.writeFileSync(file,original);
  console.log('✓ 显式共读分类与旧书稿密度检查分别验收');
  for(const [id,pages] of Object.entries(fixtures))put(id,pages);
  const build=spawnSync(process.execPath,['node_modules/vite/bin/vite.js','build'],{cwd:temp,encoding:'utf8'});
  assert.equal(build.status,0,build.stderr);
  browser=await chromium.launch();
  const page=await browser.newPage();
  page.setDefaultTimeout(5000);
  const open=async(width,mode='index',id='p06')=>{
    await page.setViewportSize({width,height:1100});
    await page.goto(pathToFileURL(path.join(temp,'dist',mode+'.html')).href+'?book=labuluo#'+id);
    await page.evaluate(()=>document.fonts.ready);
  };
  const current=()=>page.evaluate(()=>Book.page().dataset.id);
  const target=id=>page.locator('.is-active [data-target-id="'+id+'"]');
  for(const width of [900,1440]) {
    await open(width);
    const before=await page.locator('.is-active [data-object="A"]').getAttribute('transform');
    await target('A').click();
    assert.equal(await page.locator('.is-active .is-flying').count(),0,'指认不能飞走、被吃掉或提前改变位置');
    assert.equal(await page.locator('.is-active [data-object="A"]').getAttribute('transform'),before);
    await target('A').click();
    assert.equal(await page.locator('.is-active').first().getAttribute('data-found'),'A','重复指认按身份去重');
    await page.evaluate(()=>{const p=Book.page();p.querySelector('svg').append(p.querySelector('[data-object="A"]'));});
    await target('B').focus();await page.keyboard.press('Enter');
    await page.waitForFunction(expected=>Book.page().dataset.id===expected,width===900?'p07':'p08');
    if(width===900)await page.evaluate(()=>Book.goToId('p08'));
    await page.waitForTimeout(400);
    await page.locator('[data-id="p08"][data-book="labuluo"] button').click();
    if(width===1440) {
      await page.waitForTimeout(1000);
      assert.equal(await current(),'p08','左页模拟完成不得带走右页动作');
      await page.locator('[data-id="p09"][data-book="labuluo"] button').focus();await page.keyboard.press('Space');
      await page.waitForFunction(()=>Book.page().dataset.id==='p10');
    } else await page.waitForFunction(()=>Book.page().dataset.id==='p09');
    await page.evaluate(()=>Book.goToId('p06'));
    await target('A').click();await target('B').click();
    await page.evaluate(()=>{Book.goToId('p10');Book.goToId('p06');});
    await page.waitForTimeout(1000);
    assert.equal(await current(),'p06','旧指认回调不能完成新进入');
    assert.equal(await page.locator('.is-active').first().getAttribute('data-found'),null);
    assert.equal(await page.locator('.is-active').first().getAttribute('data-done'),null);
    await page.evaluate(()=>Book.goToId('p10'));
    await page.waitForTimeout(1000);
    assert.equal(await current(),'p10','自主动作不等待热区、不计时翻页');
    assert.equal(await page.locator('.is-active .hotspot').count(),0);
    assert.equal(await page.locator('.is-active[data-pat]').count(),0);
    await page.keyboard.press('ArrowRight');
    assert.equal(await current(),width===900?'p11':'p12');
    await page.evaluate(()=>Book.goToId('p12'));
    await target('S').click();
    await page.waitForFunction(expected=>Book.page().dataset.id===expected,width===900?'p13':'p14');
    await page.evaluate(()=>Book.goToId('p14'));
    for(const kind of ['apple','fish'])await target('legacy-'+kind).click();
    await page.waitForTimeout(900);
    assert.equal(await current(),'p14','旧未分类三物仍须等齐，不能两件后提前完成');
    assert.equal(await page.locator('.is-active [data-tidied]').count(),2);
    assert.match(await page.locator('.is-active [data-object="legacy-apple"]').getAttribute('transform'),/scale\(0\.1600\)/);
    assert.equal(await page.locator('.is-active [data-object="legacy-apple"]').evaluate(el=>Number(getComputedStyle(el).opacity)),.25,'旧三物缩小及淡出保持');
    await target('legacy-star').click();
    await page.waitForFunction(expected=>Book.page().dataset.id===expected,width===900?'p15':'p16');
    await page.evaluate(()=>Book.goToId('p14'));
    assert.equal(await page.locator('.is-active [data-tidied]').count(),0,'旧三物重进仍能重新收');
    console.log('✓ '+width+'px 指认守恒、对象重排、键盘、左右独立、紧邻阅读及离页复位');
  }
  const out=path.join(root,'dist/reading-proof');fs.mkdirSync(out,{recursive:true});
  for(const mode of ['print','proof','booklet']) {
    await open(1440,mode);
    assert.equal(await page.locator('[data-book="labuluo"][data-id="p06"] button.hotspot').count(),0);
    assert.equal(await page.locator('[data-book="labuluo"][data-id="p06"] [data-object="A"]').count(),1);
    assert.equal(await page.locator('[data-book="labuluo"][data-id="p11"] [data-object="ball-A"]').count(),1);
    await page.waitForTimeout(350);
    assert.equal(await page.locator('[data-book="labuluo"] [data-done]').count(),0,'静态入口不执行动作');
  }
  await open(1440);
  await page.locator('#stage').screenshot({path:path.join(out,'observe.png')});
  await page.evaluate(()=>Book.goToId('p10'));
  await page.locator('#stage').screenshot({path:path.join(out,'autonomous.png')});
  console.log('✓ 纸书／校样／拼版保留结果而不执行动作；诊断校样在dist/reading-proof/');
} finally {
  await browser?.close();
  if(fs.existsSync(modules))fs.unlinkSync(modules);
  fs.rmSync(temp,{recursive:true,force:true});
}
