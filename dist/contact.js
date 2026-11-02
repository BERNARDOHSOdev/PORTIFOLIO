const contact=window.portfolioData.contact;
const emailLink=document.querySelector('#contact-email');
const phoneLink=document.querySelector('#contact-phone');
const contactStatus=document.querySelector('#contact-status');
const sendButton=document.querySelector('#send-contact');
const sendLabel=document.querySelector('#send-contact-label');
const methods=document.querySelectorAll('input[name="contact-method"]');
const senderEmail=document.querySelector('#sender-email');
const senderEmailLabel=document.querySelector('label[for="sender-email"]');
const hasEmail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email);
const phoneDigits=(contact.phone||'').replace(/\D/g,'');
if(hasEmail){emailLink.textContent=contact.email;emailLink.href='mailto:'+contact.email;emailLink.hidden=false;}
if(phoneDigits){phoneLink.textContent=contact.phone;phoneLink.href='tel:+'+phoneDigits;phoneLink.hidden=false;}
function selectedMethod(){return document.querySelector('input[name="contact-method"]:checked')?.value||'email';}
function updateContactMethod(){
  const whatsapp=selectedMethod()==='whatsapp';
  senderEmail.hidden=whatsapp;
  senderEmailLabel.hidden=whatsapp;
  senderEmail.required=!whatsapp;
  sendButton.disabled=whatsapp?!phoneDigits:!hasEmail;
  sendLabel.textContent=whatsapp?'Abrir no WhatsApp':'Abrir no meu e-mail';
  contactStatus.textContent=whatsapp?'A conversa abre no WhatsApp. Você revisa a mensagem antes de enviar.':'A mensagem abre no seu aplicativo de e-mail. Você revisa antes de enviar.';
}
methods.forEach(method=>method.addEventListener('change',updateContactMethod));
updateContactMethod();
document.querySelector('#contact-form').addEventListener('submit',e=>{
  e.preventDefault();
  const form=e.currentTarget;
  if(!form.reportValidity())return;
  const data=new FormData(form);
  const body='Nome: '+data.get('name')+(selectedMethod()==='email'?'\nE-mail: '+data.get('email'):'')+'\n\n'+data.get('message');
  if(selectedMethod()==='whatsapp'){
    if(!phoneDigits)return;
    window.open('https://wa.me/'+phoneDigits+'?text='+encodeURIComponent(body),'_blank','noopener,noreferrer');
    contactStatus.textContent='Confira a mensagem no WhatsApp e confirme o envio por lá.';
  }else{
    if(!hasEmail)return;
    const subject='Contato pelo portfólio — '+String(data.get('name')).trim();
    location.href='mailto:'+contact.email+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    contactStatus.textContent='Confira a mensagem no seu aplicativo de e-mail e confirme o envio por lá.';
  }
});
