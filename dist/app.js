const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const fine = matchMedia('(hover: hover) and (pointer: fine)');
let paused = reduced.matches;
// A brief welcome sequence, independent of loading or network requests.
const welcome=document.querySelector('.welcome');
const skipIntro=document.querySelector('.welcome-skip');
const pageContent=[...document.body.children].filter(el=>el!==welcome&&el.tagName!=='SCRIPT');
let introTimer,exitTimer,previousFocus,introActive=false;
function finishIntro(immediate=false){
 if(!introActive)return;
 introActive=false;clearTimeout(introTimer);clearTimeout(exitTimer);
 welcome.classList.add('leaving');root.classList.remove('intro-running');
 pageContent.forEach(el=>el.inert=false);
 if(welcome.contains(document.activeElement)) (previousFocus?.isConnected?previousFocus:document.querySelector('.brand')).focus({preventScroll:true});
 const hide=()=>{welcome.hidden=true;welcome.classList.remove('leaving');};
 if(immediate||reduced.matches)hide();else exitTimer=setTimeout(hide,700);
}
function playIntro(){
 clearTimeout(introTimer);clearTimeout(exitTimer);previousFocus=document.activeElement;
 welcome.hidden=false;welcome.classList.remove('leaving');introActive=true;root.classList.add('intro-running');
 pageContent.forEach(el=>el.inert=true);
 // Restart only this occasional, explicitly replayable sequence.
 welcome.getAnimations({subtree:true}).forEach(animation=>{animation.cancel();animation.play();});
 skipIntro.focus({preventScroll:true});
 introTimer=setTimeout(()=>finishIntro(),reduced.matches||paused?900:3100);
}
skipIntro.addEventListener('click',()=>finishIntro(true));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&introActive)finishIntro(true);});
document.querySelector('.replay-intro').addEventListener('click',playIntro);
reduced.addEventListener('change',()=>{if(reduced.matches)finishIntro(true);});
if(!reduced.matches&&(!location.hash||location.hash==='#inicio'))playIntro();
const toggle = document.querySelector('.motion-toggle');
function syncMotion(){root.classList.toggle('paused',paused);toggle.setAttribute('aria-pressed',String(paused));toggle.querySelector('.motion-label').textContent=paused?'Retomar animações':'Pausar animações';toggle.firstElementChild.textContent=paused?'▷':'Ⅱ';}
toggle.addEventListener('click',()=>{paused=!paused;syncMotion();});
reduced.addEventListener('change',()=>{paused=reduced.matches;syncMotion();});syncMotion();
document.querySelector('#year').textContent=new Date().getFullYear();
const tabs=[...document.querySelectorAll('[role="tab"]')];
const projects=window.portfolioData?.projects||[];
if(projects.length){
 const panel=document.querySelector('#panel-projects');panel.replaceChildren();
 const grid=document.createElement('div');grid.className='project-grid';panel.append(grid);
 projects.forEach(project=>{
 const card=document.createElement('article');card.className='project-card';
 const link=document.createElement('a');link.href='project.html?id='+encodeURIComponent(project.id)+'&v=20261102-2';link.className='project-card-link';
 const visual=document.createElement('div');visual.className='project-card-visual';
 if(project.id==='dollartrack')visual.classList.add('project-card-visual-wide');
 if(project.cardImage||project.image){const img=document.createElement('img');img.src=project.cardImage||project.image;img.alt=project.cardImageAlt||project.imageAlt||'Prévia de '+project.title;img.width=390;img.height=844;img.loading='lazy';visual.append(img);}
 const label=document.createElement('span');label.className='project-cover-label';label.textContent=project.title;visual.append(label);link.append(visual);
 const content=document.createElement('div');content.className='project-card-content';
 const category=document.createElement('p');category.className='project-category';category.textContent=project.category;content.append(category);
 const title=document.createElement('h3');title.textContent=project.title;content.append(title);
 const summary=document.createElement('p');summary.textContent=project.summary;content.append(summary);
 const foot=document.createElement('div');foot.className='project-card-footer';const tags=document.createElement('span');tags.textContent=project.id==='medscan'?'React Native · Node.js · MongoDB':project.technologies.slice(0,3).join(' · ');foot.append(tags);const detail=document.createElement('span');detail.textContent='Ver projeto ↗';foot.append(detail);content.append(foot);link.append(content);card.append(link);grid.append(card);
 });
}
function selectTab(tab){
tabs.forEach(t=>{const active=t===tab;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!active;});
const panel=document.getElementById(tab.getAttribute('aria-controls'));
if(!paused&&!reduced.matches)panel.animate([{opacity:.3,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:220,easing:'cubic-bezier(.23,1,.32,1)'});
updateScroll();
}
tabs.forEach((tab,index)=>{
tab.addEventListener('click',()=>selectTab(tab));
tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(index+1)%tabs.length;if(e.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();selectTab(tabs[next]);tabs[next].focus();}});
});
const progress=document.querySelector('.scroll-progress');let scrollQueued=false;
function updateScroll(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?scrollY/max:0})`;scrollQueued=false;}
addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateScroll);}},{passive:true});addEventListener('resize',updateScroll);updateScroll();
const links=[...document.querySelectorAll('.header nav a')];
const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){links.forEach(a=>{const active=a.hash==='#'+entry.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}}},{rootMargin:'-15% 0px -50% 0px',threshold:0});
document.querySelectorAll('main section[id]').forEach(section=>observer.observe(section));

