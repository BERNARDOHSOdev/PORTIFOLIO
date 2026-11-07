(() => {
 const titlePatterns=[
  ['#tecnologias .expertise-heading','Tecnologias','Áreas de','conhecimento.'],
  ['#portfolio .portfolio-heading','Portfólio','Trabalhos','selecionados.'],
  ['#modelos .landing-intro','Landing pages','Landing pages','selecionadas.'],
  ['#contato .contact-heading','Contato','Seu próximo site','começa aqui.']
 ];
 titlePatterns.forEach(([selector,kicker,first,outline])=>{
  const heading=document.querySelector(selector);if(!heading)return;
  heading.classList.add('section-standard-heading');
  let label=heading.querySelector('.section-standard-kicker');
  if(!label){label=document.createElement('span');label.className='section-standard-kicker';label.innerHTML='<i></i>'+kicker;heading.prepend(label)}
  const title=heading.querySelector('h2');
  if(title)title.innerHTML='<span>'+first+'</span><span class="title-outline">'+outline+'</span>';
 });
 const section=document.querySelector('#portfolio');
 const grid=section?.querySelector('.project-grid');
 const panel=section?.querySelector('#panel-projects');
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const desktop=matchMedia('(min-width: 801px) and (min-height: 760px)');
 if(!grid||!panel)return;
 const pin=document.createElement('div');pin.className='work-pin';
 const heading=section.querySelector('.portfolio-heading');
 heading.querySelector('p').textContent='Explore os projetos';
 pin.append(heading,panel);section.append(pin);
 const navigation=document.createElement('div');navigation.className='work-navigation';
 navigation.innerHTML='<button type="button" aria-label="Projeto anterior">←</button><div class="work-meter" aria-hidden="true"><span></span></div><span class="work-count">01 / 03</span><button type="button" aria-label="Próximo projeto">→</button>';
 pin.append(navigation);
 const [previous,next]=navigation.querySelectorAll('button');
 const meter=navigation.querySelector('.work-meter span'),count=navigation.querySelector('.work-count');
 let distance=0,start=0,active=0,pinned=false,queued=false;
 const clamp=value=>Math.min(1,Math.max(0,value));
 function paint(){
  queued=false;
  const progress=pinned?clamp((scrollY-start)/Math.max(1,distance)):clamp(panel.scrollLeft/Math.max(1,panel.scrollWidth-panel.clientWidth));
  if(pinned)grid.style.transform=`translate3d(${-progress*distance}px,0,0)`;
  active=Math.round(progress*(grid.children.length-1));
  const label=String(active+1).padStart(2,'0')+' / '+String(grid.children.length).padStart(2,'0');
  if(count.textContent!==label)count.textContent=label;
  meter.style.transform=`scaleX(${(1+progress*(grid.children.length-1))/grid.children.length})`;
  previous.disabled=active===0;next.disabled=active===grid.children.length-1;
 }
 function schedule(){if(!queued){queued=true;requestAnimationFrame(paint)}}
 function measure(){
  pinned=desktop.matches&&!reduce.matches&&!document.documentElement.classList.contains('paused');
  section.classList.toggle('work-horizontal',pinned);
  grid.style.transform='';section.style.height='';
  distance=Math.max(0,grid.scrollWidth-innerWidth);
  if(pinned){section.style.height=(innerHeight+distance)+'px';panel.scrollLeft=0;}
  start=section.getBoundingClientRect().top+scrollY;
  paint();
 }
 function go(direction){
  const target=Math.max(0,Math.min(grid.children.length-1,active+direction));
  const behavior=reduce.matches||document.documentElement.classList.contains('paused')?'instant':'smooth';
  if(pinned)window.scrollTo({top:start+distance*target/(grid.children.length-1),behavior});
  else panel.scrollTo({left:(panel.scrollWidth-panel.clientWidth)*target/(grid.children.length-1),behavior});
 }
 previous.addEventListener('click',()=>go(-1));next.addEventListener('click',()=>go(1));
 grid.addEventListener('focusin',event=>{const card=event.target.closest('.project-card');if(!card)return;const index=[...grid.children].indexOf(card);if(pinned)window.scrollTo({top:start+distance*index/(grid.children.length-1),behavior:'instant'});});
 addEventListener('scroll',schedule,{passive:true});panel.addEventListener('scroll',schedule,{passive:true});
 addEventListener('resize',measure);addEventListener('load',measure);reduce.addEventListener('change',measure);
 document.fonts?.ready.then(measure);
 new ResizeObserver(measure).observe(document.querySelector('#sobre'));
 new MutationObserver(measure).observe(document.documentElement,{attributes:true,attributeFilter:['class','lang']});
 measure();
 const targets=document.querySelectorAll('.about-heading,.about-content>p,.service-focus>article,.expertise-heading,.expertise-row,.portfolio-heading,.landing-intro,.landing-image,.landing-copy,.contact-heading,.contact-compose,.footer-invite,.footer-grid');
 if(!('IntersectionObserver' in window)||reduce.matches)return;
 const observer=new IntersectionObserver(entries=>{
  for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
 },{threshold:0,rootMargin:'0px 0px -7% 0px'});
 targets.forEach(element=>{
  if(element.getBoundingClientRect().bottom<0)return;
  element.classList.add('scroll-entrance');
  if(element.classList.contains('landing-image'))element.classList.add('reveal-picture');
  if(element.classList.contains('landing-copy'))element.style.setProperty('--reveal-delay','80ms');
  observer.observe(element);
 });
 reduce.addEventListener('change',()=>{if(reduce.matches){targets.forEach(element=>element.classList.add('is-visible'));observer.disconnect()}});
})();
