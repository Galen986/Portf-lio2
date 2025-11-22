/* ======================================================
   🌌 SCRIPT GLOBAL - GUILHERME CARDOSO DA SILVA
   Tema: Azul-Ciano + Lilás Nebuloso
   Efeitos: Animações suaves, menu responsivo e brilho dinâmico
====================================================== */


/* ================================
   ANIMAÇÃO SUAVE AO ROLAR
================================ */
const animatedElements = document.querySelectorAll("[data-animate]");

function handleScrollAnimation() {
  const windowHeight = window.innerHeight * 0.85;

  animatedElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight) {
      el.classList.add("visible");
    } else {
      el.classList.remove("visible");
    }
  });
}

window.addEventListener("scroll", handleScrollAnimation);
handleScrollAnimation();


/* ================================
   MENU RESPONSIVO
================================ */
const menuToggle = document.querySelector(".btn-toggle-menu");
const navMenu = document.querySelector(".menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("menu-ativo");
    menuToggle.classList.toggle("ativo");

    // Efeito de brilho
    navMenu.style.boxShadow = navMenu.classList.contains("menu-ativo")
      ? "0 0 25px rgba(156,142,255,0.4)"
      : "none";
  });
}

// fecha o menu ao clicar em link
document.querySelectorAll(".menu-link").forEach(link => {
  link.addEventListener("click", () => {
    if (navMenu.classList.contains("menu-ativo")) {
      navMenu.classList.remove("menu-ativo");
      menuToggle.classList.remove("ativo");
    }
  });
});


/* ================================
   APARIÇÃO SUAVE NO INÍCIO
================================ */
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
  document.body.style.transition = "opacity 1.2s ease";
});


/* ================================
   BRILHO PULSANTE GENERALIZADO
================================ */
function pulsarBrilho() {
  const botoes = document.querySelectorAll(
    ".btn, .btn-degrade, .whatsapp-btn, .instagram-btn, .facebook-btn, .toggle-tema"
  );

  botoes.forEach((btn, i) => {
    const delay = i * 300;

    setTimeout(() => {
      btn.animate(
        [
          { boxShadow: "0 0 15px rgba(74,240,255,0.4)" },
          { boxShadow: "0 0 35px rgba(156,142,255,0.7)" },
          { boxShadow: "0 0 15px rgba(74,240,255,0.4)" }
        ],
        {
          duration: 3500,
          iterations: Infinity,
          easing: "ease-in-out"
        }
      );
    }, delay);
  });
}

window.addEventListener("load", pulsarBrilho);


/* ================================
   MODO CLARO / ESCURO + ANIMAÇÃO
================================ */
const toggleTema = document.querySelector(".toggle-tema");

if (toggleTema) {
  const icon = toggleTema.querySelector("i");

  // animação inicial do botão
  toggleTema.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.15)" },
      { transform: "scale(1)" }
    ],
    { duration: 800, easing: "ease", iterations: 1 }
  );

  toggleTema.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    // troca o ícone
    if (document.body.classList.contains("dark")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }

    // animação ao clicar
    toggleTema.animate(
      [
        { transform: "rotate(0deg) scale(1)" },
        { transform: "rotate(180deg) scale(1.3)" },
        { transform: "rotate(360deg) scale(1)" }
      ],
      { duration: 700, easing: "ease-out" }
    );
  });

  // ícone inicial correto
  if (document.body.classList.contains("dark")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
}