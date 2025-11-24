/* =========================================================
   script.js — Menu bolha + Tema persistente + Animações
========================================================= */

/* ====== SELETORES ====== */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

/* ====== TEMA ESCURO / CLARO ====== */
const botaoTema = $(".toggle-tema");
const body = document.body;

// Carregar tema salvo
const temaSalvo = localStorage.getItem("tema");
if (temaSalvo === "dark") body.classList.add("dark");

// Alterar tema ao clicar
if (botaoTema) {
  botaoTema.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
      localStorage.setItem("tema", "dark");
    } else {
      localStorage.setItem("tema", "light");
    }
  });
}

/* ====== MENU MOBILE ====== */
const botaoMenu = $(".btn-toggle-menu");
const navMenu = $(".menu");

// Criar painel mobile via JS
let painelMobile = document.createElement("div");
painelMobile.classList.add("menu-mobile");
painelMobile.innerHTML = `
  <a href="index.html" class="menu-mobile-link">Início</a>
  <a href="sobre.html" class="menu-mobile-link">Sobre Mim</a>
  <a href="curriculo.html" class="menu-mobile-link">Currículo</a>
`;
document.body.appendChild(painelMobile);

if (botaoMenu) {
  botaoMenu.addEventListener("click", () => {
    botaoMenu.classList.toggle("ativo");
    painelMobile.classList.toggle("aberto");
  });
}

// Fechar menu ao clicar nos links
$$(".menu-mobile-link").forEach(link => {
  link.addEventListener("click", () => {
    painelMobile.classList.remove("aberto");
    botaoMenu.classList.remove("ativo");
  });
});

/* ====== ANIMAÇÃO AO ROLAR ====== */
function animarAoRolar() {
  const elementos = $$("[data-animate]");

  elementos.forEach(el => {
    const pos = el.getBoundingClientRect().top;
    const trigger = window.innerHeight * 0.85;

    if (pos < trigger) {
      el.classList.add("animado");
    }
  });
}

window.addEventListener("scroll", animarAoRolar);
window.addEventListener("load", animarAoRolar);