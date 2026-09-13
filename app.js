const form=document.querySelector('#website-inquiry');
const company=document.querySelector('#company');
const website=document.querySelector('#website');
const wish=document.querySelector('#wish');
const imageFocus=document.querySelector('#image-focus');
const message=document.querySelector('#form-message');

form?.addEventListener('submit',(event)=>{
  event.preventDefault();
  const name=company?.value.trim()||'';
  const websiteValue=website?.value.trim()||'';
  const wishValue=wish?.value.trim()||'';
  const scope=form.querySelector('input[name="scope"]:checked')?.value||'';
  const structure=form.querySelector('input[name="structure"]:checked')?.value||'';
  const imageValue=imageFocus?.value||'noch offen';
  if(!scope){message.textContent='Bitte wählen Sie zuerst den passenden Seitenumfang.';return;}
  if(!structure){message.textContent='Bitte wählen Sie eine Struktur, die Ihnen zusagt.';return;}
  if(!name){message.textContent='Bitte nennen Sie uns Ihr Unternehmen oder Ihren Namen.';company?.focus();return;}
  if(websiteValue){try{const parsed=new URL(websiteValue);if(!['http:','https:'].includes(parsed.protocol))throw new Error('unsupported protocol');}catch{message.textContent='Bitte geben Sie eine vollständige öffentliche Website-Adresse ein – zum Beispiel https://www.ihr-unternehmen.de.';website?.focus();return;}}
  const subject=encodeURIComponent(`Anfrage: Maya Website-Vorschlag für ${name}`);
  const body=encodeURIComponent(`Guten Tag,\n\nich möchte einen persönlichen Maya Website-Vorschlag anfragen.\n\nUnternehmen/Name: ${name}\nGewählter Umfang: ${scope}\nStrukturvorwahl: ${structure}\nAktuelle Website: ${websiteValue||'noch keine Angabe'}\nBildrichtung: ${imageValue}\nGewünschte Wirkung: ${wishValue||'noch keine Angabe'}\n\nBitte melden Sie sich bei mir.\n`);
  message.textContent='Ihr E-Mail-Programm wird vorbereitet. Versendet wird die Anfrage erst durch Sie.';
  window.location.href=`mailto:support@stimmewirkt.de?subject=${subject}&body=${body}`;
});
