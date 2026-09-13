import {readFile} from 'node:fs/promises';
const pages=['index.html','faq.html','impressum.html','datenschutz.html','avv.html'];
const legacy=/sprechende Webseite|Mara|Gesprächsminuten|OpenAI|stimmeklar/i;
for(const page of pages){const value=await readFile(new URL(`../${page}`,import.meta.url),'utf8');if(legacy.test(value))throw new Error(`${page} contains a legacy voice-product reference`);if(!value.includes('Maya Website'))throw new Error(`${page} does not name Maya Website`);for(const link of ['href="/faq"','href="/datenschutz"','href="/impressum"'])if(!value.includes(link))throw new Error(`${page} footer navigation is incomplete`);}
const index=await readFile(new URL('../index.html',import.meta.url),'utf8');
for(const value of ['69 € einmalig','89','Änderungs-Credits','geschützten Inhaberbereich','Unternehmensangaben und Rechtstexte','Keine automatische Veröffentlichung','id="website-inquiry"'])if(!index.includes(value))throw new Error(`index.html is missing: ${value}`);
if(index.includes('href="/mara"'))throw new Error('Public Maya voice route is still linked');
const js=await readFile(new URL('../app.js',import.meta.url),'utf8');if(!js.includes('mailto:support@stimmewirkt.de')||!js.includes('Maya Website-Vorschlag'))throw new Error('Inquiry mail preparation is incomplete');
const privacy=await readFile(new URL('../datenschutz.html',import.meta.url),'utf8');if(!privacy.includes('datenschutz@stimmewirkt.de')||!privacy.includes('Kein öffentlicher Sprach- oder Kundenbereich'))throw new Error('Privacy statement is incomplete');
const config=JSON.parse(await readFile(new URL('../vercel.json',import.meta.url),'utf8'));if(config.rewrites?.length)throw new Error('Public voice rewrites must not remain enabled');if(!config.redirects?.some(route=>route.source==='/avv-stimmewirkt-2026-09-13.pdf'&&route.destination==='/avv'))throw new Error('Legacy AVV PDF is not safely redirected');if(!config.headers?.[0]?.headers?.some(header=>header.key==='Content-Security-Policy'))throw new Error('Public CSP is missing');
console.log('Maya Website static checks passed.');
