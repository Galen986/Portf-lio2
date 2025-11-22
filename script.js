/* script.js - menu, animações, tema, download */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* ANIMAÇÃO AO ROLAR */
function handleScrollAnimation(){
  const animatedElements = $$("[data-animate]");
  const windowHeight = window.innerHeight * 0.85;
  animatedElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if(top < windowHeight) el.classList.add("visible");
    else el.classList.remove("visible");
  });
}
window.addEventListener("scroll", handleScrollAnimation);
window.addEventListener("load", handleScrollAnimation);

/* MENU RESPONSIVO */
const menuToggle = $(".btn-toggle-menu");
const navMenu = $(".menu");

if(menuToggle){
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navMenu.classList.toggle("menu-ativo");
    menuToggle.classList.toggle("ativo");
  });
  document.addEventListener("click", (e) => {
    if(!navMenu.contains(e.target) && !menuToggle.contains(e.target)){
      navMenu.classList.remove("menu-ativo");
      menuToggle.classList.remove("ativo");
    }
  });
}

$$(".menu-link").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("menu-ativo");
    menuToggle.classList.remove("ativo");
  });
});

/* ANIMAÇÃO NA ABERTURA */
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
  document.body.style.transition = "opacity 1.1s ease";
});

/* TEMA */
const toggleTema = $(".toggle-tema");
if(toggleTema){
  const icon = toggleTema.querySelector("i");
  const saved = localStorage.getItem("guilherme_tema");
  if(saved === "dark") document.body.classList.add("dark");

  toggleTema.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("guilherme_tema", isDark ? "dark" : "light");
    icon.classList.toggle("fa-moon");
    icon.classList.toggle("fa-sun");
  });
}

/* DOWNLOAD DO CURRÍCULO */
document.getElementById("downloadBtn")?.addEventListener("click", () => {
  const a = document.createElement("a");
  a.href = "curriculo.pdf";
  a.download = "Guilherme_Curriculo.pdf";
  a.click();
});