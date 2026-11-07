(() => {
const projects=window.portfolioData.projects;
const requested=new URLSearchParams(location.search).get('id');
const project=projects.find(p=>p.id===requested)||projects[0];
const text=(id,value)=>{document.getElementById(id).textContent=value;};
let headerLanguage='pt';
try{headerLanguage=sessionStorage.getItem('portfolio-language')==='en'?'en':'pt'}catch{}
const headerLabels={pt:['Início','Sobre','Portfólio','Contato'],en:['Home','About','Portfolio','Contact']};
function setHeaderLanguage(language){
  headerLanguage=language;
  document.querySelectorAll('.language-switch button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.lang===language)));
  document.querySelectorAll('.header nav a').forEach((link,index)=>{link.textContent=headerLabels[language][index];});
  try{sessionStorage.setItem('portfolio-language',language)}catch{}
}
document.querySelectorAll('.language-switch button').forEach(button=>button.addEventListener('click',()=>setHeaderLanguage(button.dataset.lang)));
setHeaderLanguage(headerLanguage);
document.title=project.title+' — Bernardo Henrique';
text('case-category',project.category);
text('case-title',project.title);
text('case-summary',project.summary);
text('case-team',project.id==='medscan'?'MEDTECH · FUNEC Riacho':project.title);
text('case-context',project.id==='medscan'?'Plataforma de saúde digital desenvolvida pela equipe MEDTECH.':project.id==='vetflow'?'Plataforma de gestão veterinária em desenvolvimento.':'Cotações, conversão de moedas e dados históricos em uma plataforma.');
text('case-role',project.role||project.description);
text('case-impact',project.summary);
text('case-note',project.note||'');
text('tech-count',project.technologies.length);
text('feature-count',project.features.length);
project.features.forEach(value=>{const li=document.createElement('li');li.textContent=value;document.getElementById('case-features').append(li);});
project.technologies.forEach(value=>{const li=document.createElement('li');li.textContent=value;document.getElementById('case-stack').append(li);});
if(project.liveUrl){const live=document.getElementById('case-live');live.href=project.liveUrl;live.hidden=false;}
if(project.repoUrl){const repo=document.getElementById('case-repo');repo.href=project.repoUrl;repo.hidden=false;}
const next=projects[(projects.indexOf(project)+1)%projects.length];const nextLink=document.getElementById('case-next');nextLink.href='project.html?id='+encodeURIComponent(next.id);nextLink.firstElementChild.textContent=next.title;
const gallery=project.id==='medscan'?[
  ['assets/medscan-gallery-cover.png','Boas-vindas ao MedScan'],
  ['assets/medscan-gallery-1.png','Início — rotina e cuidados'],
  ['assets/medscan-gallery-2.png','Visão geral e sinais vitais'],
  ['assets/medscan-gallery-3.png','Conversa com IA'],
  ['assets/medscan-gallery-4.png','Formulário de orientação'],
  ['assets/medscan-gallery-5.png','Prontuário digital'],
  ['assets/medscan-gallery-6.png','Monitoramento de saúde'],
  ['assets/medscan-gallery-7.png','Dispositivos conectados'],
  ['assets/medscan-gallery-8.png','Preferências']
]:[];
let slide=0;
const frame=document.querySelector('.case-blank');
const dotsContainer=document.querySelector('.gallery-dots');
const caption=document.querySelector('.gallery-caption span');
const count=gallery.length||3;
let photo;
if(gallery.length){
  frame.classList.add('has-images');
  frame.setAttribute('aria-label','Imagens do MedScan');
  photo=document.createElement('img');
  photo.className='gallery-photo';
  photo.decoding='async';
  frame.prepend(photo);
}
dotsContainer.replaceChildren();
const dots=Array.from({length:count},(_,i)=>{
  const dot=document.createElement('button');
  dot.type='button';
  dot.setAttribute('aria-label',gallery[i]?.[1]||'Imagem '+(i+1));
  dot.addEventListener('click',()=>select(i));
  dotsContainer.append(dot);
  return dot;
});
function select(index){
  slide=(index+count)%count;
  text('gallery-counter',String(slide+1).padStart(2,'0')+' / '+String(count).padStart(2,'0'));
  dots.forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i===slide)));
  if(photo){photo.src=gallery[slide][0];photo.alt=gallery[slide][1];caption.textContent=gallery[slide][1];}
}
select(0);
document.querySelector('.gallery-prev').addEventListener('click',()=>select(slide-1));
document.querySelector('.gallery-next').addEventListener('click',()=>select(slide+1));
})();
