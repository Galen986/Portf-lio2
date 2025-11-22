/* script.js
   Comportamento: menu mobile, animação ao rolar, tema, download
*/

/* =========================
   Helpers - evita erros se elemento não existir
   ========================= */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* =========================
   ANIMAÇÃO AO ROLAR
   ========================= */
function handleScrollAnimation(){
  const animatedElements = $$("[data-animate]");
  if(!animatedElements.length) return;
  const windowHeight = window.innerHeight * 0.85;
  animatedElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if(top < windowHeight) el.classList.add("visible");
    else el.classList.remove("visible");
  });
}
window.addEventListener("scroll", handleScrollAnimation);
window.addEventListener("load", handleScrollAnimation);

/* =========================
   MENU RESPONSIVO
   ========================= */
const menuToggle = $(".btn-toggle-menu");
const navMenu = $(".menu");

if(menuToggle){
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navMenu.classList.toggle("menu-ativo");
    menuToggle.classList.toggle("ativo");
  });

  // fecha ao clicar fora
  document.addEventListener("click", (e) => {
    if(!navMenu.contains(e.target) && !menuToggle.contains(e.target)){
      navMenu.classList.remove("menu-ativo");
      menuToggle.classList.remove("ativo");
    }
  });
}

/* fecha menu ao clicar em link (mobile) */
$$(".menu-link").forEach(link => {
  link.addEventListener("click", () => {
    if(navMenu) navMenu.classList.remove("menu-ativo");
    if(menuToggle) menuToggle.classList.remove("ativo");
  });
});

/* =========================
   EFEITO SUAVE NA ABERTURA DA PÁGINA
   ========================= */
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
  document.body.style.transition = "opacity 1.1s ease";
});

/* =========================
   TOGGLE TEMA (com persistência no localStorage)
   ========================= */
const toggleTema = $(".toggle-tema");
if(toggleTema){
  const icon = toggleTema.querySelector("i");
  // estado salvo
  const saved = localStorage.getItem("guilherme_tema");
  if(saved === "dark") document.body.classList.add("dark");
  if(document.body.classList.contains("dark")){
    if(icon){ icon.classList.remove("fa-moon"); icon.classList.add("fa-sun"); }
  } else {
    if(icon){ icon.classList.remove("fa-sun"); icon.classList.add("fa-moon"); }
  }

  toggleTema.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("guilherme_tema", isDark ? "dark" : "light");
    if(icon){
      icon.classList.toggle("fa-moon");
      icon.classList.toggle("fa-sun");
    }
    // anima simples
    toggleTema.animate(
      [
        { transform: "rotate(0deg) scale(1)" },
        { transform: "rotate(180deg) scale(1.08)" },
        { transform: "rotate(360deg) scale(1)" }
      ],
      { duration: 700, easing: "ease-out" }
    );
  });
}

/* =========================
   PULSAR BRILHO (opcional, não crítico)
   ========================= */
function pulsarBrilho(){
  const botoes = $$(".toggle-tema, .download-btn, .whatsapp-btn, .instagram-btn, .facebook-btn");
  botoes.forEach((btn, i) => {
    try{
      btn.animate(
        [
          { boxShadow: "0 0 12px rgba(74,240,255,0.06)" },
          { boxShadow: "0 0 28px rgba(123,91,255,0.09)" },
          { boxShadow: "0 0 12px rgba(74,240,255,0.06)" }
        ],
        { duration: 3600 + (i*200), iterations: Infinity, easing: "ease-in-out" }
      );
    }catch(e){}
  });
}
window.addEventListener("load", pulsarBrilho);

/* =========================
   DOWNLOAD BUTTON (verifica arquivo)
   ========================= */
const downloadBtn = $("#downloadBtn");
if(downloadBtn){
  downloadBtn.addEventListener("click", (e) => {
    // Nome do arquivo que deve existir na raiz do site
    const fileHref = "Curriculo.pdf";
    // tenta abrir /forçar download
    const a = document.createElement("a");
    a.href = fileHref;
    a.download = "Currículo - Guilherme Cardoso da Silva.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  });
}