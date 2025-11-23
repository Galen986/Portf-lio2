/* =========================================================
   script.js — Tema Persistente / Menu Mobile / Animação Scroll
========================================================= */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/* ======== TEMA ESCURO PERSISTENTE ======== */
const body = document.body;
const botaoTema = $(".toggle-tema");

let temaSalvo = localStorage.getItem("tema");
if (temaSalvo === "dark") {
  body.classList.add("dark");
}

botaoTema.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    localStorage.setItem("tema", "dark");
  } else {
    localStorage.setItem("tema", "light");
  }
});

/* ======== MENU MOBILE ======== */
const botaoMenu = $(".btn-toggle-menu");
const menu = $("nav.menu");

botaoMenu.addEventListener("click", () => {
  menu.classList.toggle("menu-ativo");
  botaoMenu.classList.toggle("ativo");
});

$$(".menu-link").forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("menu-ativo");
    botaoMenu.classList.remove("ativo");
  });
});

/* ======== ANIMAÇÃO AO ROLAR ======== */
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