/* =========================================================
   script.js — Menu bolha + Tema persistente + Animações
========================================================= */

/* ========== SELETORES RÁPIDOS ========== */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

/* ========== TEMA ESCURO/CLARO COM LOCALSTORAGE ========== */
const botaoTema = $(".toggle-tema");
const body = document.body;

// Carregar tema salvo
const temaSalvo = localStorage.getItem("tema");
if (temaSalvo === "dark") {
  body.classList.add("dark");
}

// Alternar tema
botaoTema.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    localStorage.setItem("tema", "dark");
  } else {
    localStorage.setItem("tema", "light");
  }
});

/* ========== MENU BOLHA MINIMALISTA ========== */
const botaoMenu = $(".btn-toggle-menu");
const menu = $(".menu");

botaoMenu.addEventListener("click", () => {
  menu.classList.toggle("menu-ativo");
  botaoMenu.classList.toggle("ativo");
});

/* Fechar menu clicando no link */
$$(".menu-link").forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("menu-ativo");
    botaoMenu.classList.remove("ativo");
  });
});

/* ========== ANIMAÇÃO AO ROLAR ========== */
function animarAoRolar() {
  const elementos = $$("[data-animate]");

  elementos.forEach(el => {
    const pos = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight * 0.85;

    if (pos < windowHeight) {
      el.classList.add("animado");
    }
  });
}

window.addEventListener("scroll", animarAoRolar);
window.addEventListener("load", animarAoRolar);