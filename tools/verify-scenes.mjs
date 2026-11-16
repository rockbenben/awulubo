/* 场景组件专项：真实渲染、跨页拼接与临时书稿破坏，不迁移作者书稿。 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import { chromium } from 'playwright';
import { createPageRenderer } from './render-page.mjs';
import { pngPixels } from './png-pixels.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const render = createPageRenderer();
const initial = { id: 'p12', book: 'fixture', scene: { kind: 'room', light: 'day', side: 'left' }, bg: { kind: 'none', wash: '--wash-cream' } };
assert.ok(render(initial).includes('data-object="scene"'), '已声明具体场景却没有渲染；应独立于放射笔触生成场景层');
const { withSpreadScene, sceneKinds, sceneLights } = await import('../src/js/model.ts');
const { sceneView } = await import('./scenes.mjs');
assert.equal(sceneView(undefined), null);
const transition=withSpreadScene([{id:'p24',bg:{wash:'--wash-cream'}},{id:'p25',bg:{wash:'--wash-night'}}],{kind:'window-nook'});
assert.deepEqual(transition.map(p=>sceneView(p.scene,p.bg).light),['day','night'],'同跨的明确入夜转折应跟随已有页内底色，而非左页提前入夜或右页仍是白天');
const names = ['room', 'window-nook', 'doorway', 'wall-corner', 'play-mat', 'grass'];
assert.deepEqual([...sceneKinds], names);
const source = read('src/components/scenes.svg');
assert.match(source,/id="scene-fantasy-castle"/,'背景方向须包含儿童幻想远景，不继续使用家庭建筑布景');
assert.match(source,/id="scene-color-island"/,'空间以色块岛与留白表达');
assert.ok(!/<symbol\b/.test(source), '场景零件须使用g');
assert.ok(!/href="#(?:prop-|pose-|ch-)/.test(source), '背景不能烘焙角色、球、杯、毯或待收三物');
assert.ok(!/\b(?:script|image|foreignObject)\b/.test(source), '场景使用本地矢量零件，不嵌外部内容');

const pair = kind => withSpreadScene([{ id: 'p12', book: 'fixture' }, { id: 'p13', book: 'fixture' }], { kind, light: 'day' });
for (const kind of names) {
  const pages = pair(kind);
  assert.deepEqual(pages.map(p => p.scene.side), ['left', 'right']);
  for (const scope of ['screen', 'print']) {
    assert.match(render(pages[0], scope), /translate\(0 0\)/);
    assert.match(render(pages[1], scope), /translate\(-1000 0\)/);
  }
}
const originals = [{ id: 'p04', char: { pose: 'idle', at: [10, 20], scale: .5 } }, { id: 'p05' }];
assert.deepEqual(withSpreadScene(originals), originals, '旧记录不新增场景或改变页面数据');
assert.deepEqual(originals.map(p => p.id), ['p04', 'p05']);

const temp = fs.mkdtempSync(path.join(fs.realpathSync.native(os.tmpdir()), 'awulubo-scenes-'));
const modules = path.join(temp, 'node_modules');
let browser;
try {
  for (const name of ['src', 'tools', 'package.json']) fs.cpSync(path.join(root, name), path.join(temp, name), { recursive: true });
  fs.symlinkSync(path.join(root,'node_modules'),modules,'junction');
  const { loadBooks } = await import(pathToFileURL(path.join(temp, 'tools/load-specs.mjs')));
  const baseline = await loadBooks();
  const book = baseline.find(b => b.id === 'labuluo');
  const originalPage = book.pages.find(p => p.id === 'p12');
  const file = path.join(temp, 'src/content/books/labuluo/specs', originalPage.file);
  const original = fs.readFileSync(file, 'utf8');
  const record = original.replace('export default', 'const record =');
  assert.notEqual(record, original);
  const write = mutation => {
    const previous = fs.readFileSync(file, 'utf8');
    fs.writeFileSync(file, `${record}\n${mutation}\nexport default record;\n`);
    assert.notEqual(fs.readFileSync(file, 'utf8'), previous, '破坏书稿必须确实变化');
  };
  write("record.scene = {kind:'window-nook',light:'day'};");
  const pages = (await loadBooks()).find(b => b.id === 'labuluo').pages.filter(p => ['p12', 'p13'].includes(p.id));
  assert.deepEqual(pages.map(p => p.scene.side), ['left', 'right']);
  assert.deepEqual(pages.map(p => p.text), book.pages.filter(p => ['p12', 'p13'].includes(p.id)).map(p => p.text));
  const gate = () => spawnSync(process.execPath,['tools/check-pages.mjs','--full'],{cwd:temp,encoding:'utf8'});
  assert.equal(gate().status,0,'有效场景声明的书稿结构须通过');
  const componentFile=path.join(temp,'src/components/scenes.svg');
  fs.writeFileSync(componentFile,source.replace('id="scene-window-nook"','id="removed-window-nook"'));
  assert.notEqual(fs.readFileSync(componentFile,'utf8'),source,'场景组件破坏必须确实变化');
  let broken=gate();
  assert.equal(broken.status,1,'缺失场景组件必须失败');
  assert.match(broken.stderr,/场景组件/);
  fs.writeFileSync(componentFile,source);
  fs.writeFileSync(componentFile,source.replace('id="scene-page-clip"','id="removed-page-clip"'));
  assert.notEqual(fs.readFileSync(componentFile,'utf8'),source);
  broken=gate();assert.equal(broken.status,1,'缺失单页裁切必须失败');assert.match(broken.stderr,/scene-page-clip/);
  fs.writeFileSync(componentFile,source);
  write("record.scene={kind:'room'};record.background={kind:'none',wash:'--missing-scene-color'};");
  broken=gate();assert.equal(broken.status,1,'无笔触时未知场景底色也必须失败');assert.match(broken.stderr,/场景底色/);
  console.log('✓ 场景组件缺失及未知场景底色的真实闸门破坏回归');
  for (const [name, mutation, error] of [
    ['取景零缩放', "record.pages[0].framing={at:[0,0],scale:0};", /取景须使用/],
    ['取景坐标不完整', "record.pages[0].framing={at:[0],scale:1};", /取景须使用/],
    ['取景未知变换', "record.pages[0].framing={at:[0,0],scale:1,rotate:12};", /取景须使用/],
    ['未知场景', "record.scene = {kind:'missing'};", /未知场景/],
    ['未知光照', "record.scene = {kind:'room',light:'flash'};", /未知场景光照/],
    ['单页伪装整跨', "record.scene = {kind:'room'};record.pages=record.pages.slice(0,1);", /相邻双页/],
    ['逆序不重排', "record.scene = {kind:'room'};record.pages.reverse();", /相邻双页/],
    ['页内私换场景', "record.scene = {kind:'room'};record.pages[1].scene={kind:'grass'};", /跨页统一/],
  ]) {
    write(mutation);
    await assert.rejects(loadBooks, error, name + '不得静默通过');
    console.log('✓ 场景破坏回归 ' + name);
  }
  fs.writeFileSync(file, original);
  assert.deepEqual(await loadBooks(), baseline, '移除场景后恢复原始接口与数据');

  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1040, height: 1000 }, deviceScaleFactor: 1 });
  await page.route('**/*', route => route.abort());
  const defs = ['scenes', 'character', 'rainbow', 'props'].map(name => read(`src/components/${name}.svg`).replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')).join('\n');
  const css = read('src/css/tokens.css');
  const font = fs.readFileSync(path.join(root,'src/fonts/lxgw-wenkai-subset.woff2')).toString('base64');
  const body = (html, extra = '') => `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><style>${css}${read('src/css/templates.css')}
    @font-face{font-family:Proof;src:url(data:font/woff2;base64,${font})}
    body{margin:0;background:#eee;--body:var(--paper);--spiral:var(--ink);--line:26;--glint:var(--paper)}
    main{width:1000px;margin:20px}.pair{display:flex;width:1000px;gap:0}section.page{position:relative;width:500px;height:500px;flex:none;background:var(--paper);--page:500px;--u:5px}
    .art{position:absolute;inset:0}.art>svg{width:100%;height:100%;overflow:visible}h2{font:18px sans-serif;margin:18px 0 6px}
    .narration,.prompt{position:absolute;margin:0;font-family:Proof;z-index:1;color:var(--ink)}.t-night .narration,.t-night .prompt{color:var(--paper)}
    ${extra}</style><svg width="0" height="0" style="position:absolute"><defs>${defs}</defs></svg><main>${html}</main></html>`;
  const scenePair = (kind, light = 'day', scope = 'print', props = false, framing) => withSpreadScene([
    { id: 'p12', book: 'fixture', pat: false, bg: { kind: 'none', wash: light === 'night' || light === 'late-night' ? '--wash-night' : '--wash-cream' },
      ...(props ? {char: {pose: 'ready', at:[290,240],scale:.65,spiral:true}, props:[{id:'cup-1',kind:'cup',at:[730,600],scale:.2},{id:'blanket-1',kind:'blanket',at:[400,720],scale:.25}]} : {}) },
    { id: 'p13', book: 'fixture', pat: false, bg: { kind: 'none', wash: light === 'night' || light === 'late-night' ? '--wash-night' : '--wash-cream' } },
  ], { kind, light }).map(p => render({ ...p, ...(framing ? { framing } : {}) }, scope)).join('');
  const out = path.join(root, 'dist/scene-proof');
  fs.mkdirSync(out, {recursive:true});
  // 草丛前景必须真能遮挡，不能让角色轮廓透出来。
  for(const light of ['day','night','late-night']) {
    const view=sceneView({kind:'grass',light,side:'left'});
    const cover=probe=>body(`<svg id="occlusion" width="1000" height="500" viewBox="0 0 2000 1000" style="${view.vars}"><rect width="2000" height="1000" fill="var(--scene-base)"/>${probe?'<rect x="1450" y="760" width="100" height="50" fill="#F43934"/>':''}<use href="#scene-grass-front"/></svg>`);
    await page.setContent(cover(false));const a=pngPixels(await page.locator('#occlusion').screenshot());
    await page.setContent(cover(true));const b=pngPixels(await page.locator('#occlusion').screenshot());
    const i=(400*a.width+750)*a.channels;
    assert.deepEqual([...a.data.slice(i,i+3)],[...b.data.slice(i,i+3)],light+' 草丛必须完全遮住下方物体');
  }
  await page.setContent(body(names.map(kind => `<h2>${({room:'屋内', 'window-nook':'窗边小窝',doorway:'门槛与门外', 'wall-corner':'墙脚', 'play-mat':'地垫',grass:'草地'})[kind]}</h2><div class="pair" data-kind="${kind}">${scenePair(kind)}</div>`).join('')));
  for (const kind of names) {
    const host = page.locator(`[data-kind="${kind}"]`);
    assert.equal(await host.locator('[data-object="scene"]').count(), 2);
    assert.equal(await host.locator('.hotspot').count(), 0);
    const image = pngPixels(await host.screenshot());
    await host.locator('[data-object="scene"]').evaluateAll(nodes=>nodes.forEach(n=>n.style.visibility='hidden'));
    const bare=pngPixels(await host.screenshot());
    await host.locator('[data-object="scene"]').evaluateAll(nodes=>nodes.forEach(n=>n.style.visibility='visible'));
    let ink = 0;
    for (let i=0;i<image.data.length;i+=image.channels) if ([0,1,2].some(c=>Math.abs(image.data[i+c]-bare.data[i+c])>4)) ink++;
    assert.ok(ink>200, kind+' 场景缺少可见色块，不得仅渲染空底');
  }
  await page.screenshot({path:path.join(out,'scenes.png'),fullPage:true});
  // 两个真实1000页拼接结果必须等于单幅2000场景，避免右页重复左半或各页缩放。
  const calibration='#whole,[data-object=scene],[data-object=scene-foreground]{--scene-island-opacity:1!important;--scene-shape-opacity:1!important;--scene-castle-opacity:1!important;--scene-line-opacity:1!important;--paper:#F43934!important}';
  for (const kind of names) {
    await page.setContent(body(`<div class="pair">${scenePair(kind)}</div>`,calibration));
    const actual = pngPixels(await page.locator('.pair').screenshot());
    const view = sceneView({kind,light:'day',side:'left'}, {wash:'--wash-cream'});
    await page.setContent(body(`<svg id="whole" width="1000" height="500" viewBox="0 0 2000 1000" style="${view.vars}"><rect width="2000" height="1000" fill="var(--scene-base)"/><use href="#scene-${kind}"/>${view.foreground?`<use href="#${view.foreground}"/>`:''}</svg>`,calibration));
    const reference = pngPixels(await page.locator('#whole').screenshot());
    let large = 0, max = 0, total = 0;
    for (let i=0;i<actual.data.length;i+=actual.channels) {
      const delta=Math.max(...[0,1,2].map(c=>Math.abs(actual.data[i+c]-reference.data[i+c])));
      max=Math.max(max,delta);total+=delta;if(delta>16)large++;
    }
    console.log(`· ${kind} 拼接参照：差异>16的像素${large}，最大差${max}，平均差${(total/(actual.width*actual.height)).toFixed(4)}`);
    const limit=actual.width*actual.height*.001;
    assert.ok(large < limit, kind+' 左右页应保持同一幅景的连续空间（仅容忍边缘抗锯齿）');
    if(kind==='room') {
      // 在临时HTML确实改坏右页，验证像素参照不会放过重复左半或整幅压缩。
      const good=body(`<div class="pair">${scenePair(kind)}</div>`,calibration);
      const fixture=path.join(temp,'scene-fixture.html');fs.writeFileSync(fixture,good);
      for(const transform of ['translate(0 0)','translate(-500 0) scale(.5 1)']) {
        const previous=fs.readFileSync(fixture,'utf8');
        const bad=good.replaceAll('translate(-1000 0)',transform);
        fs.writeFileSync(fixture,bad);assert.notEqual(fs.readFileSync(fixture,'utf8'),previous);
        await page.setContent(fs.readFileSync(fixture,'utf8'));
        const image=pngPixels(await page.locator('.pair').screenshot());let mismatch=0;
        for(let i=0;i<image.data.length;i+=image.channels)if([0,1,2].some(c=>Math.abs(image.data[i+c]-reference.data[i+c])>16))mismatch++;
        assert.ok(mismatch>=limit,'左右重复或额外缩放必须被参照拒绝');
      }
    }
  }
  // 改变观看距离后仍须是一幅跨页画；参照使用整幅场景以书脊为锚点取景。
  for (const scale of [.75, 1.25]) for (const kind of ['room', 'grass']) {
    const framing = { at: [-80, -100], scale };
    const good = body(`<div class="pair">${scenePair(kind, 'day', 'print', false, framing)}</div>`, calibration);
    await page.setContent(good);
    const actual = pngPixels(await page.locator('.pair').screenshot());
    const view = sceneView({ kind, light: 'day', side: 'left' }, { wash: '--wash-cream' });
    const tx = 1000 * (1-scale) + framing.at[0];
    await page.setContent(body(`<svg id="whole" width="1000" height="500" viewBox="0 0 2000 1000" style="${view.vars}"><rect width="2000" height="1000" fill="var(--scene-base)"/><g transform="translate(${tx},-100) scale(${scale})"><use href="#scene-${kind}"/>${view.foreground ? `<use href="#${view.foreground}"/>` : ''}</g></svg>`, calibration));
    const reference = pngPixels(await page.locator('#whole').screenshot());
    const mismatch = image => {
      let count = 0;
      for (let i=0;i<image.data.length;i+=image.channels) if ([0,1,2].some(c=>Math.abs(image.data[i+c]-reference.data[i+c])>16)) count++;
      return count;
    };
    const limit = actual.width * actual.height * .001;
    assert.ok(mismatch(actual) < limit, kind+' 取景后书脊两侧仍须连续');
    const fixture = path.join(temp, 'framing-seam.html');
    fs.writeFileSync(fixture, good);
    const broken = good.replaceAll(`translate(-80,-100) scale(${scale})`, `translate(${tx},-100) scale(${scale})`);
    fs.writeFileSync(fixture, broken);
    assert.notEqual(fs.readFileSync(fixture, 'utf8'), good, '取景拼接破坏必须确实改变临时文件');
    await page.setContent(fs.readFileSync(fixture, 'utf8'));
    assert.ok(mismatch(pngPixels(await page.locator('.pair').screenshot())) >= limit, '逐页独立缩放的断景反例必须失败');
  }
  console.log('✓ 远／近取景的屋内及草地跨页参照、书脊连续和断景反例');
  await page.setContent(body(sceneLights.map(light => `<h2>${({day:'白天',dusk:'暮色',night:'夜间','late-night':'最后两跨'})[light]}</h2><div class="pair" data-light="${light}">${scenePair('window-nook',light,'print',true)}</div>`).join('')));
  for (const light of sceneLights) {
    const el=page.locator(`[data-light="${light}"]`);
    assert.equal(await el.locator('[data-object="cup-1"]').count(),1);
    assert.equal(await el.locator('[data-object="blanket-1"]').count(),1);
    assert.equal(await el.locator('[data-object="character"]').count(),1);
  }
  const mean = async light => {
    const image=pngPixels(await page.locator(`[data-light="${light}"]`).screenshot());
    let sum=0; for(let i=0;i<image.data.length;i+=image.channels)sum+=image.data[i]+image.data[i+1]+image.data[i+2];
    return sum/(image.width*image.height*3);
  };
  assert.ok(await mean('late-night') < await mean('night'), '最后两跨应比前一夜景更暗静');
  await page.screenshot({path:path.join(out,'light.png'),fullPage:true});
  // 在字形的实际差分墨迹上取白底与原图的颜色比，不用CSS框代替对比度。
  const textPages=withSpreadScene([{id:'p12',book:'fixture',template:'t-night',bg:{kind:'none',wash:'--wash-night'},text:{narration:{text:'我陪着你。',at:[70,70],size:4,width:500}}},{id:'p13',book:'fixture',template:'t-night',bg:{kind:'none',wash:'--wash-night'}}],{kind:'window-nook',light:'late-night'});
  await page.setContent(body(`<div class="pair">${textPages.map(p=>render(p,'print')).join('')}</div>`));
  const line=page.locator('.narration');
  await page.evaluate(()=>document.fonts.ready);
  const foreground=await line.evaluate(node=>getComputedStyle(node).color.match(/[\d.]+/g).slice(0,3).map(Number));
  const ink=pngPixels(await line.screenshot());
  await line.evaluate(node=>node.style.color='transparent');
  const bg=pngPixels(await line.screenshot());
  let solid=0;
  const lum=rgb=>rgb.map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
  for(let i=0;i<ink.data.length;i+=ink.channels){
    const a=[...ink.data.slice(i,i+3)],b=[...bg.data.slice(i,i+3)];
    if(a.every((v,c)=>Math.abs(v-foreground[c])<4)&&a.some((v,c)=>Math.abs(v-b[c])>16)) {
      solid++; assert.ok((Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05)>=4.5);
    }
  }
  assert.ok(solid>20,'文字预期与完整墨迹不得读空');
  console.log('✓ 场景专项通过：真实双页拼接、独立物件、昼夜沉降、墨迹对比度与旧数据兼容；校样在dist/scene-proof/');
} finally {
  await browser?.close();
  if(fs.existsSync(modules))fs.unlinkSync(modules);
  fs.rmSync(temp,{recursive:true,force:true});
}
