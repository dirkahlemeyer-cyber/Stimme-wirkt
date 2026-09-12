const back=document.querySelector('#history-back');
const forward=document.querySelector('#history-forward');
back?.addEventListener('click',()=>history.back());
forward?.addEventListener('click',()=>history.forward());

const form=document.querySelector('#website-inquiry');
const input=document.querySelector('#website');
const message=document.querySelector('#form-message');
form?.addEventListener('submit',(event)=>{
  event.preventDefault();
  const raw=input?.value.trim()||'';
  let website;
  try { website=new URL(raw); } catch { message.textContent='Bitte geben Sie eine vollständige öffentliche Website-Adresse ein, zum Beispiel https://www.ihr-unternehmen.de.'; input?.focus(); return; }
  if(!['http:','https:'].includes(website.protocol)){ message.textContent='Bitte geben Sie eine öffentliche Website-Adresse mit http oder https ein.'; input?.focus(); return; }
  const subject=encodeURIComponent('Anfrage: sprechende Webseite');
  const body=encodeURIComponent(`Guten Tag,\n\nich möchte meine Website unverbindlich besprechen:\n${website.href}\n\nBitte melden Sie sich bei mir.\n`);
  message.textContent='Ihr E-Mail-Programm wird geöffnet. Versendet wird die Nachricht erst von Ihnen selbst.';
  window.location.href=`mailto:support@stimmewirkt.de?subject=${subject}&body=${body}`;
});
