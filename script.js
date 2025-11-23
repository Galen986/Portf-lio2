/* =====================================================
   script.js
   Comportamento: menu mobile, animação ao rolar, tema, download
===================================================== */

/* ===== Helpers ===== */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* ===== MENU HAMBURGUER ===== */
const btnMenu = $('.btn-toggle-menu');
const menu = $('.menu');

btnMenu.addEventListener('click', () => {
  btnMenu.classList.toggle('ativo');
  
  // para mobile, toggla a classe menu aberto
  menu.classList.toggle('menu-ativo');
  if(menu.classList.contains('menu-ativo')){
    menu.classList.add('open');
  } else {
    menu.classList.remove('open');
  }
});

/* ===== TOGGLE TEMA ===== */
const btnTema = $('.toggle-tema');
btnTema.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const icon = btnTema.querySelector('i');
  if(document.body.classList.contains('dark')){
    icon.classList.replace('fa-sun','fa-moon');
  } else {
    icon.classList.replace('fa-moon','fa-sun');
  }
});

/* ===== ANIMAÇÃO AO ROLAR ===== */
const elementos = $$('[data-animate]');
function animarScroll(){
  const topo = window.innerHeight * 0.85;
  elementos.forEach(el => {
    const pos = el.getBoundingClientRect().top;
    if(pos < topo){
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }
  });
}
window.addEventListener('scroll', animarScroll);
window.addEventListener('load', animarScroll);

/* ===== DOWNLOAD CURRÍCULO ===== */
const btnDownload = $('#downloadBtn');
if(btnDownload){
  btnDownload.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'Curriculo-Guilherme.pdf'; // coloque o nome do PDF correto na pasta
    link.download = 'Curriculo-Guilherme.pdf';
    link.click();
  });
}