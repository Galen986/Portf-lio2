/* =========================================================
   script.js — Menu bolha + Tema persistente + Animações
========================================================= */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

/* ========== TEMA ESCURO/CLARO ========== */
const botaoTema = $(".toggle-tema");
const body = document.body;

const temaSalvo = localStorage.getItem("tema");
if (temaSalvo === "dark") body.classList.add("dark");

botaoTema.addEventListener("click", () => {
  body.classList.toggle("dark");

  localStorage.setItem("tema",
    body.classList.contains("dark") ? "dark" : "light"
  );
});

/* ========== MENU BOLHA FUNCIONANDO ========== */
const botaoMenu = $(".btn-toggle-menu");
const menu = $(".menu");

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

/* ========== ANIMAÇÃO AO ROLAR ========== */
function animarAoRolar() {
  const els = $$("[data-animate]");
  els.forEach(el => {
    if (el.getBoundingClientRect().top < innerHeight * 0.85) {
      el.classList.add("animado");
    }
  });
}

addEventListener("scroll", animarAoRolar);
addEventListener("load", animarAoRolar);