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

// Evita criar duplicado se o script rodar duas vezes
if (!document.querySelector(".menu-mobile")) {
  let painelMobile = document.createElement("div");
  painelMobile.classList.add("menu-mobile");
  painelMobile.innerHTML = `
    <a href="index.html" class="menu-mobile-link">Início</a>
    <a href="sobre.html" class="menu-mobile-link">Sobre Mim</a>
    <a href="curriculo.html" class="menu-mobile-link">Currículo</a>
  `;
  document.body.appendChild(painelMobile);
}

const painelMobile = document.querySelector(".menu-mobile");

if (botaoMenu && painelMobile) {
  botaoMenu.addEventListener("click", () => {
    const aberto = painelMobile.classList.toggle("aberto");
    botaoMenu.classList.toggle("ativo");
    botaoMenu.setAttribute("aria-expanded", aberto ? "true" : "false");
  });
}

// Fechar menu ao clicar nos links (protegendo caso não existam)
if (painelMobile) {
  const links = painelMobile.querySelectorAll(".menu-mobile-link");
  if (links && links.length) {
    links.forEach(link => {
      link.addEventListener("click", () => {
        painelMobile.classList.remove("aberto");
        if (botaoMenu) {
          botaoMenu.classList.remove("ativo");
          botaoMenu.setAttribute("aria-expanded", "false");
        }
      });
    });
  }
}

/* ====== ANIMAÇÃO AO ROLAR ====== */
function animarAoRolar() {
  const elementos = $$("[data-animate]") || [];

  elementos.forEach(el => {
    const rect = el.getBoundingClientRect();
    const pos = rect.top;
    const trigger = window.innerHeight * 0.85;

    if (pos < trigger) {
      el.classList.add("animado");
    }
  });
}

window.addEventListener("scroll", animarAoRolar);
window.addEventListener("load", animarAoRolar);