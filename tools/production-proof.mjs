/* 按册元数据生成已制作册纸书联系表；只读取原四入口，不创建新阅读入口。 */
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import { chromium } from 'playwright';
import { loadBooks } from './load-specs.mjs';
const books=(await loadBooks()).filter(b=>b.meta.production);
if(!books.length)throw new Error('制作校样不得读空');
const browser=await chromium.launch();
try {
  const page=await browser.newPage({viewport:{width:1280,height:1000},deviceScaleFactor:1});
  for(const book of books) {
    const out=new URL('../dist/production-proof/'+book.id+'/',import.meta.url);fs.mkdirSync(out,{recursive:true});
    await page.goto(new URL('../dist/proof.html',import.meta.url).href+'?book='+book.id);
    await page.evaluate(()=>document.fonts.ready);
    await page.addStyleTag({content:'body{overflow:visible!important}body.static .stage{display:block!important;padding:0!important;width:1280px!important}.proof-sheet{display:grid;grid-template-columns:repeat(2,600px);gap:10px;padding:10px;background:#ddd;width:1250px}.proof-sheet .page{display:block!important;position:relative!important;width:300px!important;height:300px!important;--page:300px;--u:3px;margin:0!important}.proof-spread{display:flex;width:600px;gap:0}.proof-item{width:300px}.proof-label{font:14px sans-serif;color:#111;height:20px}'});
    await page.evaluate(({book,groups})=>{
      const source=new Map([...document.querySelectorAll('.page')].filter(p=>p.dataset.book===book).map(p=>[p.dataset.id,p]));
      const stage=document.getElementById('stage');stage.replaceChildren();
      for(let start=0;start<groups.length;start+=8){
        const sheet=document.createElement('div');sheet.className='proof-sheet';sheet.dataset.sheet=String(start/8);
        groups.slice(start,start+8).forEach(ids=>{const spread=document.createElement('div');spread.className='proof-spread';ids.forEach(id=>{const item=document.createElement('div');item.className='proof-item';const label=document.createElement('div');label.className='proof-label';label.textContent=id;item.append(label,source.get(id));spread.append(item);});sheet.append(spread);});stage.append(sheet);
      }
    },{book:book.id,groups:book.spreads.map(group=>group.map(p=>p.id))});
    const sheets=page.locator('.proof-sheet');
    for(let i=0;i<await sheets.count();i++)await sheets.nth(i).screenshot({path:fileURLToPath(new URL('paper-'+(i+1)+'.png',out))});
    console.log('✓ '+book.id+' 全64页纸书联系表：dist/production-proof/'+book.id);
  }
} finally {await browser.close();}
