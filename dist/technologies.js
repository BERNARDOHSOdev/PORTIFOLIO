const technologyGroups = [
  ['Linguagens', 'Linguagens que uso para desenvolver aplicações.', [['Java','java'],['JavaScript','javascript'],['Python','python'],['PHP','php'],['Lua','lua']]],
  ['Frontend', 'Interfaces e experiências para a web.', [['HTML5','html5'],['CSS3','css3'],['JavaScript','javascript'],['React','react'],['Vite','vitejs'],['Tailwind CSS','tailwindcss']]],
  ['Backend', 'Serviços e integração entre sistemas.', [['Node.js','nodejs'],['Express','express'],['APIs REST',null]]],
  ['Bancos de dados & BaaS', 'Armazenamento e serviços de dados.', [['MySQL','mysql'],['MongoDB','mongodb'],['PostgreSQL','postgresql'],['Supabase','supabase']]],
  ['Ferramentas', 'Ferramentas para desenvolvimento e controle de versão.', [['Git','git'],['GitHub','github'],['VS Code','vscode']]],
  ['Atualmente estudando', 'Conhecimentos que estou aprofundando.', [['TypeScript','typescript'],['Spring Boot','spring'],['Row Level Security',null],['LGPD',null]]]
];
const technologyPanel = document.querySelector('#expertise-list');
if (technologyPanel) {
  technologyPanel.replaceChildren();
  technologyGroups.forEach(([name, description, items], index) => {
    const group = document.createElement('article');
    group.className = 'expertise-row';
    const info = document.createElement('div');
    const title = document.createElement('h3');
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.textContent = name;
    trigger.setAttribute('aria-pressed', 'false');
    title.append(trigger);
    info.className = 'expertise-description';
    const text = document.createElement('p');
    text.textContent = description;
    info.append(text);
    const grid = document.createElement('div');
    grid.className = 'expertise-tools';
    items.forEach(([label]) => {
      const caption = document.createElement('span');
      caption.textContent = label;
      grid.append(caption);
    });
    info.append(grid);
    const preview = document.createElement('div');
    preview.className = 'expertise-preview';
    preview.setAttribute('aria-hidden', 'true');
    items.forEach(([label, icon], itemIndex) => {
      const tile = document.createElement('div');
      tile.className = 'expertise-icon-tile';
      tile.style.setProperty('--tile-index', itemIndex);
      if(icon){
        const img = document.createElement('img');
        const local = ['java','javascript','python','php','html5','css3','react','nodejs','mysql','mongodb','git','github'].includes(icon);
        img.src = local ? 'assets/technologies/'+icon+'.svg' : 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/'+icon+'/'+icon+'-original.svg';
        img.alt = ''; img.width = 42; img.height = 42;
        if(icon === 'github' || icon === 'express') img.className = 'expertise-icon-white';
        tile.append(img);
      }else{
        const symbol = document.createElement('span');symbol.className='expertise-symbol';
        symbol.textContent = label === 'APIs REST' ? '{ }' : label === 'LGPD' ? '§' : '◇';
        tile.append(symbol);
      }
      const caption = document.createElement('span');caption.textContent=label;tile.append(caption);preview.append(tile);
    });
    const content = document.createElement('div');content.className='expertise-content';content.append(info,preview);
    let pinned = false, hovered = false, hoverTimer;
    const sync = () => {const active=pinned||hovered;group.classList.toggle('is-active',active);trigger.setAttribute('aria-pressed',String(active));};
    group.addEventListener('pointerenter',e=>{
      if(e.pointerType==='mouse'){
        clearTimeout(hoverTimer);
        hoverTimer=setTimeout(()=>{hovered=true;sync();},120);
      }
    });
    group.addEventListener('pointerleave',()=>{clearTimeout(hoverTimer);hovered=false;sync();});
    trigger.addEventListener('click',()=>{clearTimeout(hoverTimer);pinned=!pinned;sync();});
    trigger.addEventListener('keydown',e=>{if(e.key==='Escape'){clearTimeout(hoverTimer);pinned=false;hovered=false;sync();}});
    group.append(title, content);
    technologyPanel.append(group);
  });
}
