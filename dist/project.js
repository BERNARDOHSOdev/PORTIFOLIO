const params=new URLSearchParams(location.search);
const preview=params.get('preview')==='1';
const project=preview?{title:'Nome do projeto',description:'Este espaço vai apresentar o contexto do projeto: a necessidade inicial, a solução desenvolvida e sua participação no trabalho. Os textos, a imagem e os links serão preenchidos quando você escolher os projetos.',technologies:['Tecnologia 1','Tecnologia 2'],features:['Principal recurso da aplicação','Detalhe da experiência do usuário','Solução técnica de destaque']}:window.portfolioData.projects.find(p=>p.id===params.get('id'));
function safeURL(value){try{const url=new URL(value,location.href);return ['https:','http:'].includes(url.protocol)?url.href:null;}catch{return null;}}
function appendText(parent,tag,value,className){const node=document.createElement(tag);node.textContent=value;if(className)node.className=className;parent.append(node);return node;}
if(!project){document.querySelector('.project-empty').hidden=false;}else{
 document.querySelector('#project-content').hidden=false;
 document.querySelector('.project-notice').hidden=!preview;
 document.title=project.title+' — Bernardo Henrique';
 document.querySelector('#project-title').textContent=project.title;
 document.querySelector('.project-description').textContent=project.description;
 if(project.role)appendText(document.querySelector('.project-description').parentElement,'p',project.role,'project-role');
 if(project.note)appendText(document.querySelector('.project-features'),'p',project.note,'project-health-note');
 const technologies=project.technologies||[];const features=project.features||[];
 for(const [number,label] of [[technologies.length,'Tecnologias'],[features.length,'Funcionalidades']]){const stat=appendText(document.querySelector('.project-stats'),'div','', 'project-stat');appendText(stat,'strong',number);appendText(stat,'span',label);}
 technologies.forEach(name=>appendText(document.querySelector('.project-tags'),'span',name));
 features.forEach(name=>appendText(document.querySelector('.project-features ul'),'li',name));
 for(const [url,label] of [[project.liveUrl,project.liveLabel||'Ver site'],[project.sourceUrl,'Ver código']]){const href=url&&safeURL(url);if(href){const link=appendText(document.querySelector('.project-links'),'a',label+' ↗','button primary');link.href=href;link.target='_blank';link.rel='noopener noreferrer';}}
 const image=project.image&&safeURL(project.image);if(image){const img=document.createElement('img');img.src=image;img.alt=project.imageAlt||'Prévia de '+project.title;document.querySelector('.project-visual').append(img);}else document.querySelector('.project-visual').textContent=preview?'Imagem do projeto':'Prévia visual em preparação';
}
