import {readFile} from 'node:fs/promises';

const pages=['index.html','faq.html','impressum.html','datenschutz.html','avv.html'];
const forbidden=/stimmeklar|ki-telefonie|telefonie/i;
for(const page of pages){
  const value=await readFile(new URL(`../${page}`,import.meta.url),'utf8');
  if(forbidden.test(value)) throw new Error(`${page} contains a forbidden previous-brand reference`);
  if(!value.includes('www.stimmewirkt.de')) throw new Error(`${page} does not name the target domain`);
  for(const link of ['href="/faq"','href="/datenschutz"','href="/avv"','href="/impressum"']) if(!value.includes(link)) throw new Error(`${page} footer navigation is incomplete`);
}
const js=await readFile(new URL('../app.js',import.meta.url),'utf8');
if(!js.includes('history.back')||!js.includes('history.forward')) throw new Error('History navigation is incomplete');
if(!js.includes('mailto:support@stimmewirkt.de')||js.includes('deinewebstimme.de')) throw new Error('Inquiry mail target is incomplete or outdated');
const index=await readFile(new URL('../index.html',import.meta.url),'utf8');
for(const value of ['pricing-price','€ netto','300 Gesprächsminuten inklusive','249 € netto','20 € netto','Hier kündigen','Hier bestellen','quiet-cancel-link','href="/mara"','Auftragsverarbeitung (AVV)','Mit Mara sprechen – bis zu 4 Minuten']){
  if(!index.includes(value)) throw new Error(`index.html is missing: ${value}`);
}
const impressum=await readFile(new URL('../impressum.html',import.meta.url),'utf8');
if(!impressum.includes('D. Ahlemeyer')||!impressum.includes('support@stimmewirkt.de')) throw new Error('Impressum contact or provider is incomplete');
if(/Inhaber|Einzelunternehmer|DA-Marketing/i.test(impressum)) throw new Error('Impressum contains a removed provider label');
const privacy=await readFile(new URL('../datenschutz.html',import.meta.url),'utf8');
if(!privacy.includes('datenschutz@stimmewirkt.de')) throw new Error('Datenschutz contact is incomplete');
if(!privacy.includes('Freiwillige Mara-Demo')||!privacy.includes('OpenAI')) throw new Error('Datenschutz does not explain the Mara audio path');
const faq=await readFile(new URL('../faq.html',import.meta.url),'utf8');
if((faq.match(/<details/g)||[]).length<30||!faq.includes('demselben bestätigten Wissensstand')||!faq.includes('faq-mara-cta')||!faq.includes('Sprechen Sie mit Mara')) throw new Error('FAQ is incomplete or not linked to the shared knowledge status');
const avv=await readFile(new URL('../avv.html',import.meta.url),'utf8');
if(!avv.includes('avv-stimmewirkt-2026-09-13.pdf')||!avv.includes('keine durch den bloßen Abruf abgeschlossene AVV')) throw new Error('AVV page or PDF link is incomplete');
const config=JSON.parse(await readFile(new URL('../vercel.json',import.meta.url),'utf8'));
const maraRoutes=new Map(config.rewrites.map(route=>[route.source,route.destination]));
if(maraRoutes.get('/mara')!=='https://stimmeklar-web.vercel.app/mara'||maraRoutes.get('/api/mara/:path*')!=='https://stimmeklar-web.vercel.app/api/mara/:path*') throw new Error('Mara brand proxy is incomplete');
if(!config.headers?.[0]?.headers?.some(header=>header.key==='Content-Security-Policy')) throw new Error('Public CSP is missing');
console.log('Static site checks passed.');
