const technologyGroups = [
  ['Linguagens', 'Linguagens que uso para desenvolver aplicações.', [['Java','java'],['JavaScript','javascript'],['Python','python'],['PHP','php'],['Lua','lua']]],
  ['Frontend', 'Interfaces e experiências para a web.', [['HTML5','html5'],['CSS3','css3'],['JavaScript','javascript'],['React','react'],['Vite','vitejs'],['Tailwind CSS','tailwindcss']]],
  ['Backend', 'Serviços e integração entre sistemas.', [['Node.js','nodejs'],['Express','express'],['APIs REST',null]]],
  ['Bancos de dados & BaaS', 'Armazenamento e serviços de dados.', [['MySQL','mysql'],['MongoDB','mongodb'],['PostgreSQL','postgresql'],['Supabase','supabase']]],
  ['Ferramentas', 'Ferramentas para desenvolvimento e controle de versão.', [['Git','git'],['GitHub','github'],['VS Code','vscode']]],
  ['Atualmente estudando', 'Conhecimentos que estou aprofundando.', [['TypeScript','typescript'],['Spring Boot','spring'],['Row Level Security',null],['LGPD',null]]]
];
const technologyPanel = document.querySelector('#panel-technologies');
if (technologyPanel) {
  technologyPanel.replaceChildren();
  technologyGroups.forEach(([name, description, items]) => {
    const group = document.createElement('div');
    group.className = 'technology-group';
    const info = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = name;
    const text = document.createElement('p');
    text.textContent = description;
    info.append(title, text);
    const grid = document.createElement('div');
    grid.className = 'technology-grid';
    items.forEach(([label, icon]) => {
      const tile = document.createElement('div');
      tile.className = 'technology-tile';
      if (icon) {
        const img = document.createElement('img');
        img.className = 'technology-icon' + (icon === 'github' || icon === 'express' ? ' technology-icon-light' : '');
        const local = ['java','javascript','python','php','html5','css3','react','nodejs','mysql','mongodb','git','github'].includes(icon);
        img.src = local ? 'assets/technologies/' + icon + '.svg' : 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/' + icon + '/' + icon + '-original.svg';
        img.alt = '';
        img.width = 48;
        img.height = 48;
        img.loading = 'lazy';
        tile.append(img);
      } else {
        const mark = document.createElement('span');
        mark.className = 'technology-mark';
        mark.setAttribute('aria-hidden','true');
        mark.textContent = label === 'APIs REST' ? '{ }' : label === 'LGPD' ? '§' : '◈';
        tile.append(mark);
      }
      const caption = document.createElement('span');
      caption.textContent = label;
      tile.append(caption);
      grid.append(tile);
    });
    group.append(info, grid);
    technologyPanel.append(group);
  });
}
