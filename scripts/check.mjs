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
console.log('Static site checks passed.');
