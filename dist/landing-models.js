const landingModels = [
  { category:'Barbearia', name:'Barbearia 01', url:'https://model1barber.netlify.app/' },
  { category:'Barbearia', name:'Barbearia 02', url:'https://modelo2barber.netlify.app/' },
  { category:'Barbearia', name:'Barbearia 03', url:'https://modelo3barber.netlify.app/' },
  { category:'Academia', name:'Academia', url:'https://modeloacad.netlify.app/' },
  { category:'Tatuagem', name:'Tatuagem', url:'https://modelotatto.netlify.app/' },
  { category:'Energia solar', name:'Energia solar', url:'https://siteenergiasolar.netlify.app/' },
  { category:'Móveis', name:'Móveis de casa', url:'https://moveisdecasa.netlify.app/' },
  { category:'Restaurante', name:'Restaurante', url:'https://modelonobile.netlify.app/' },
  { category:'Massoterapia', name:'Massoterapia', url:'https://modelomassoterapia.netlify.app/' },
  { category:'Nail design', name:'Nail design', url:'https://modelonaildesign.netlify.app/' },
  { category:'Pet shop', name:'Pet shop', url:'https://modelopets.netlify.app/' },
  { category:'Veterinário', name:'Veterinário', url:'https://modelvet.netlify.app/' },
  { category:'Mecânica', name:'Mecânica', url:'https://modelomecanico.netlify.app/' },
  { category:'Construção', name:'Materiais de construção', url:'https://modelmateriais.netlify.app/' }
];
const modelGrid = document.querySelector('#model-grid');
const modelFilter = document.querySelector('#model-filter');
if (modelGrid && modelFilter) {
  [...new Set(landingModels.map(model => model.category))].forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    modelFilter.append(option);
  });
  function renderModels() {
    modelGrid.replaceChildren();
    landingModels.forEach((model, index) => {
      if (modelFilter.value !== 'all' && modelFilter.value !== model.category) return;
      const link = document.createElement('a');
      link.className = 'model-card';
      link.href = model.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', 'Abrir modelo ' + model.name + ' em nova aba');
      const preview = document.createElement('div');
      preview.className = 'model-card-preview';
      const image = document.createElement('img');
      image.src = 'assets/model-ready-' + String(index + 1).padStart(2, '0') + '.png';
      image.alt = 'Prévia da landing page ' + model.name;
      image.width = 1265;
      image.height = 712;
      image.loading = 'lazy';
      preview.append(image);
      const top = document.createElement('div');
      top.className = 'model-card-top';
      const number = document.createElement('span');
      number.textContent = String(index + 1).padStart(2, '0');
      const arrow = document.createElement('span');
      arrow.textContent = '↗';
      arrow.setAttribute('aria-hidden', 'true');
      top.append(number, arrow);
      const body = document.createElement('div');
      body.className = 'model-card-body';
      const category = document.createElement('span');
      category.textContent = model.category;
      const title = document.createElement('h3');
      title.textContent = model.name;
      body.append(category, title);
      const footer = document.createElement('span');
      footer.className = 'model-card-footer';
      footer.textContent = 'Ver demonstração ↗';
      const details = document.createElement('div');
      details.className = 'model-card-details';
      details.append(top, body, footer);
      link.append(preview, details);
      modelGrid.append(link);
    });
  }
  modelFilter.addEventListener('change', renderModels);
  renderModels();
}
