/* =====================================================
   script.js
   Tema persistente, menu mobile, animações, download
===================================================== */

/* ===== Helpers ===== */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* =====================================================
      🟦  TEMA PERSISTENTE EM TODAS AS PÁGINAS
===================================================== */

// 1. Carrega o tema salvo
const temaSalvo = localStorage.getItem("tema-site");

if (temaSalvo === "dark") {
  document.body.classList.add("dark");
}

// 2. Define o ícone corretamente ao carregar
const btnTema = $('.toggle-tema');
if (btnTema) {
  const icon = btnTema.querySelector("i");

  function atualizarIcone() {
    if (document.body.classList.contains("dark")) {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    } else {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    }
  }

  atualizarIcone();

  // 3. Ao clicar no botão muda o tema e salva
  btnTema.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    // salva no localStorage
    const temaAtual = document.body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("tema-site", temaAtual);

    atualizarIcone();
  });
}

/* =====================================================
      MENU HAMBURGUER
===================================================== */

const btnMenu = $('.btn-toggle-menu');
const menu = $('.menu');

if(btnMenu){
  btnMenu.addEventListener('click', () => {
    btnMenu.classList.toggle('ativo');
    menu.classList.toggle('menu-ativo');

    if(menu.classList.contains('menu-ativo')){
      menu.classList.add('open');
    } else {
      menu.classList.remove('open');
    }
  });
}

/* =====================================================
      ANIMAÇÃO AO ROLAR
===================================================== */

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

/* =====================================================
      DOWNLOAD CURRÍCULO
===================================================== */

const btnDownload = $('#downloadBtn');
if(btnDownload){
  btnDownload.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'Curriculo-Guilherme.pdf';
    link.download = 'Curriculo-Guilherme.pdf';
    link.click();
  });
}