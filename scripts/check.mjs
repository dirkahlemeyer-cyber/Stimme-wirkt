import {readFile} from 'node:fs/promises';

const pages=['index.html','impressum.html','datenschutz.html'];
const forbidden=/stimmeklar|ki-telefonie|telefonie/i;
for(const page of pages){
  const value=await readFile(new URL(`../${page}`,import.meta.url),'utf8');
  if(forbidden.test(value)) throw new Error(`${page} contains a forbidden previous-brand reference`);
  if(!value.includes('www.stimmewirkt.de')) throw new Error(`${page} does not name the target domain`);
}
const js=await readFile(new URL('../app.js',import.meta.url),'utf8');
if(!js.includes('history.back')||!js.includes('history.forward')) throw new Error('History navigation is incomplete');
if(!js.includes('mailto:support@stimmewirkt.de')||js.includes('deinewebstimme.de')) throw new Error('Inquiry mail target is incomplete or outdated');
const index=await readFile(new URL('../index.html',import.meta.url),'utf8');
for(const value of ['99 € netto','300 Minuten inklusive','249 € netto','20 € netto','Hier kündigen','mailto:support@stimmewirkt.de','Auftragsverarbeitungsvertrag (AVV)']){
  if(!index.includes(value)) throw new Error(`index.html is missing: ${value}`);
}
const impressum=await readFile(new URL('../impressum.html',import.meta.url),'utf8');
if(!impressum.includes('D. Ahlemeyer')||!impressum.includes('support@stimmewirkt.de')) throw new Error('Impressum contact or provider is incomplete');
if(/Inhaber|Einzelunternehmer|DA-Marketing/i.test(impressum)) throw new Error('Impressum contains a removed provider label');
const privacy=await readFile(new URL('../datenschutz.html',import.meta.url),'utf8');
if(!privacy.includes('datenschutz@stimmewirkt.de')) throw new Error('Datenschutz contact is incomplete');
console.log('Static site checks passed.');
