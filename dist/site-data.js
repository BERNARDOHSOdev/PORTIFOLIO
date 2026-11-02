// Fill only with contact details and projects approved by Bernardo.
window.portfolioData = {
 contact:{email:'bhsoworks@gmail.com',phone:'+55 31 9683-7772',whatsapp:false},
 projects:[{
  id:'medscan',title:'MedScan',category:'Saúde digital · Aplicação web',
  summary:'Histórico de saúde, rotina de cuidados e orientação inicial por IA em uma plataforma responsiva.',
  description:'O MedScan reúne informações de saúde que costumam ficar espalhadas entre documentos, mensagens e aplicativos. A plataforma permite organizar sintomas, exames, medicamentos, consultas e medições em uma experiência acessível pelo celular e pelo computador. Desenvolvido pela equipe MEDTECH, da FUNEC Riacho, para a Mostra de Tecnologia de 2026.',
  role:'Minha participação: desenvolvimento, integração e apresentação do projeto, em colaboração com a equipe MEDTECH.',
  note:'A IA oferece orientação informativa, não diagnóstico. O MedScan não substitui a avaliação de profissionais de saúde.',
  technologies:['React Native','Expo','React Native Web','Node.js','Express','MongoDB','Mongoose','JWT'],
  features:['Relato de sintomas e envio de imagens para orientação inicial por IA.','Prontuário digital com linha do tempo, busca e filtros.','Organização de medicamentos, consultas, alergias e vacinação.','Registro manual de medições com histórico e gráficos.','Perfis de familiares e pessoas acompanhadas.','Resumo para consulta com opção de salvar ou imprimir em PDF.','Interface responsiva com temas claro e escuro.'],
  cardImage:'assets/medscan-home.png',cardImageAlt:'Tela inicial do MedScan no tema escuro.',
  image:'assets/medscan-cover.png',imageAlt:'Tela de boas-vindas do MedScan.',
  liveUrl:'https://medscan-h9jq.onrender.com',liveLabel:'Abrir demonstração'
 },{
  id:'dollartrack',title:'DollarTrack',category:'Finanças · Aplicação web',
  summary:'Painel de câmbio para acompanhar moedas, converter valores e explorar dados históricos.',
  cardImage:'assets/dollartrack-cover.png',cardImageAlt:'Página inicial do DollarTrack com painel de cotações.',
  image:'assets/dollartrack-cover.png',imageAlt:'Página inicial do DollarTrack e panorama de moedas.',
  description:'O DollarTrack reúne taxas de referência diárias, conversão de moedas e ferramentas de análise histórica em uma interface responsiva. Os dados são fornecidos pela Frankfurter API.',
  note:'As taxas são referências diárias e não necessariamente correspondem a valores negociáveis. O simulador não inclui impostos ou custos.',
  technologies:['HTML','CSS','JavaScript','Frankfurter API'],
  features:['Panorama de moedas e favoritos salvos no navegador.','Conversor com seleção e inversão de moedas.','Gráficos históricos com comparação de moedas.','Simulação de valorização cambial.','Exportação de dados em CSV e JSON.','Temas claro e escuro e layout responsivo.']
 }]
};
