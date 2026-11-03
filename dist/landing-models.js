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
  const filterTrigger = document.querySelector('#model-filter-trigger');
  const filterMenu = document.querySelector('#model-filter-menu');
  const filterOptions = document.querySelector('#model-filter-options');
  const filterSearch = document.querySelector('.model-filter-search');
  const filterValue = document.querySelector('#model-filter-value');
  let focusedOption = 0;
  const categories = ['all', ...new Set(landingModels.map(model => model.category))];
  function closeFilter(returnFocus = false) {
    filterMenu.hidden = true;
    filterTrigger.setAttribute('aria-expanded', 'false');
    if (returnFocus) filterTrigger.focus();
  }
  function chooseCategory(value) {
    modelFilter.value = value;
    filterValue.textContent = value === 'all' ? 'Todos os segmentos' : value;
    renderOptions(filterSearch.value);
    closeFilter(true);
    modelFilter.dispatchEvent(new Event('change'));
  }
  function renderOptions(query = '') {
    filterOptions.replaceChildren();
    const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR');
    const filtered = categories.filter(value => {
      const label = value === 'all' ? 'Todos os segmentos' : value;
      return label.toLocaleLowerCase('pt-BR').includes(normalizedQuery);
    });
    focusedOption = Math.min(focusedOption, Math.max(0, filtered.length - 1));
    filtered.forEach((value, index) => {
      const label = value === 'all' ? 'Todos os segmentos' : value;
      const option = document.createElement('button');
      option.type = 'button';
      option.className = 'model-filter-option';
      option.id = 'model-filter-option-' + index;
      option.setAttribute('role', 'option');
      option.setAttribute('aria-selected', String(modelFilter.value === value));
      option.tabIndex = -1;
      option.dataset.value = value;
      option.textContent = label;
      const count = value === 'all' ? landingModels.length : landingModels.filter(model => model.category === value).length;
      const tally = document.createElement('span');
      tally.className = 'model-filter-count';
      tally.textContent = String(count).padStart(2, '0');
      option.append(tally);
      option.addEventListener('click', () => chooseCategory(value));
      filterOptions.append(option);
    });
    if (!filtered.length) {
      const empty = document.createElement('p');
      empty.className = 'model-filter-empty';
      empty.textContent = 'Nenhum segmento encontrado';
      filterOptions.append(empty);
    }
  }
  renderOptions();
  filterTrigger.addEventListener('click', () => {
    const opening = filterMenu.hidden;
    filterMenu.hidden = !opening;
    filterTrigger.setAttribute('aria-expanded', String(opening));
    if (opening) {
      filterSearch.value = '';
      focusedOption = Math.max(0, categories.indexOf(modelFilter.value));
      renderOptions();
      filterSearch.focus();
    }
  });
  filterSearch.addEventListener('input', () => { focusedOption = 0; renderOptions(filterSearch.value); });
  filterSearch.addEventListener('keydown', event => {
    const options = [...filterOptions.querySelectorAll('[role="option"]')];
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!options.length) return;
      focusedOption = (focusedOption + (event.key === 'ArrowDown' ? 1 : options.length - 1)) % options.length;
      options[focusedOption].focus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      closeFilter(true);
    }
  });
  filterOptions.addEventListener('keydown', event => {
    const options = [...filterOptions.querySelectorAll('[role="option"]')];
    const current = options.indexOf(document.activeElement);
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      focusedOption = (current + (event.key === 'ArrowDown' ? 1 : options.length - 1)) % options.length;
      options[focusedOption]?.focus();
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      focusedOption = event.key === 'Home' ? 0 : options.length - 1;
      options[focusedOption]?.focus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      closeFilter(true);
    } else if (event.key === 'Tab') closeFilter();
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.model-select-wrap') && !filterMenu.hidden) closeFilter();
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
