const landingModels = [
 {name:'Academia',category:'Fitness & bem-estar',image:'04',url:'https://modeloacad.netlify.app/',description:'Uma apresentação de impacto para mostrar a estrutura da academia, valorizar os treinos e incentivar o próximo passo.'},
 {name:'Energia solar',category:'Energia & sustentabilidade',image:'06',url:'https://siteenergiasolar.netlify.app/',description:'Uma página para apresentar soluções de energia solar com clareza e aproximar o visitante de um novo orçamento.'},
 {name:'Restaurante',category:'Gastronomia',image:'08',asset:'assets/restaurante-cover.png',url:'https://modelonobile.netlify.app/',description:'Uma experiência visual que apresenta o restaurante, valoriza sua identidade e convida a conhecer a casa.'},
 {name:'Móveis de casa',category:'Design & interiores',image:'07',url:'https://moveisdecasa.netlify.app/',description:'Uma vitrine para apresentar móveis e ambientes, destacar os detalhes e inspirar novas possibilidades para a casa.'}
];
const modelGrid = document.querySelector('#model-grid');
if(modelGrid){
 modelGrid.replaceChildren();
 landingModels.forEach(model=>{
  const row=document.createElement('article');row.className='landing-work';
  const preview=document.createElement('a');preview.className='landing-image';preview.href=model.url;preview.target='_blank';preview.rel='noopener noreferrer';preview.setAttribute('aria-label','Abrir modelo '+model.name);
  const image=document.createElement('img');image.src=model.asset||'assets/model-ready-'+model.image+'.png';image.alt='Prévia da landing page '+model.name;image.width=1265;image.height=712;image.loading='lazy';
  const arrow=document.createElement('span');arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');preview.append(image,arrow);
  const copy=document.createElement('div');copy.className='landing-copy';
  const category=document.createElement('small');category.textContent=model.category;
  const title=document.createElement('h3');title.textContent=model.name;
  const description=document.createElement('p');description.textContent=model.description;
  const features=document.createElement('ul');['Landing page','Layout responsivo','Desenvolvimento web'].forEach(text=>{const item=document.createElement('li');item.textContent=text;features.append(item)});
  const link=document.createElement('a');link.className='landing-link';link.href=model.url;link.target='_blank';link.rel='noopener noreferrer';link.append(document.createTextNode('Ver demonstração'));const icon=document.createElement('span');icon.textContent='↗';icon.setAttribute('aria-hidden','true');link.append(icon);
  copy.append(category,title,description,features,link);row.append(preview,copy);modelGrid.append(row);
 });
}
