// === ANIMAÇÃO SUAVE AO ROLAR ===
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

// Executa ao rolar
window.addEventListener("scroll", handleScrollAnimation);
// Executa no carregamento inicial
handleScrollAnimation();


// === MENU RESPONSIVO ===
const menuToggle = document.querySelector(".btn-toggle-menu");
const navMenu = document.querySelector(".menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("menu-ativo");
    menuToggle.classList.toggle("ativo");

    // Animação de brilho quando o menu abre
    if (navMenu.classList.contains("menu-ativo")) {
      navMenu.style.boxShadow = "0 0 25px rgba(156,142,255,0.4)";
    } else {
      navMenu.style.boxShadow = "none";
    }
  });
}

// Fecha o menu ao clicar em um link (mobile)
const menuLinks = document.querySelectorAll(".menu-link");

menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (navMenu.classList.contains("menu-ativo")) {
      navMenu.classList.remove("menu-ativo");
      menuToggle.classList.remove("ativo");
    }
  });
});


// === EFEITO DE APARIÇÃO SUAVE NO INÍCIO ===
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
  document.body.style.transition = "opacity 1.2s ease";
});


// === BRILHO PULSANTE NOS BOTÕES E ÍCONES ===
function pulsarBrilho() {
  const botoes = document.querySelectorAll(".btn, .btn-degrade, .whatsapp-btn, .instagram-btn, .facebook-btn");

  botoes.forEach((btn, i) => {
    const delay = i * 300;
    setTimeout(() => {
      btn.animate(
        [
          { boxShadow: "0 0 15px rgba(74,240,255,0.4)" },
          { boxShadow: "0 0 30px rgba(156,142,255,0.6)" },
          { boxShadow: "0 0 15px rgba(74,240,255,0.4)" }
        ],
        {
          duration: 3000,
          iterations: Infinity,
          easing: "ease-in-out"
        }
      );
    }, delay);
  });
}

// Ativa o brilho após o carregamento da página
window.addEventListener("load", pulsarBrilho);

/* ======================================================
   🌙 MODO CLARO / MODO ESCURO
====================================================== */

const toggleTema = document.querySelector(".toggle-tema");

if (toggleTema) {
  toggleTema.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    // Troca o ícone
    const icon = toggleTema.querySelector("i");
    if (document.body.classList.contains("dark")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  });
}