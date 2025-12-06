// script.js — tema, menu e botão de download (versão otimizada)
document.addEventListener("DOMContentLoaded", () => {

  /* ===== TEMA (persistente) ===== */
  // Seleciona o botão de tema. AGORA ELE FUNCIONARÁ, pois o HEADER foi incluído.
  const btnTema = document.querySelector(".toggle-tema"); 
  if (btnTema) {
    // ... (Lógica de persistência e troca de tema e ícones) ...
    const iconeTema = btnTema.querySelector("i");
    // ...
    // A lógica de setIcon, saved, etc., está correta.
    // ...
    btnTema.addEventListener("click", () => {
      const isNowDark = document.body.classList.toggle("dark");
      // ...
    });
  }


  /* ===== MENU MOBILE ===== */
  // Seleciona o menu e o botão. AGORA ELES FUNCIONARÃO.
  const menu = document.getElementById("main-menu");
  const btnMenu = document.querySelector(".btn-toggle-menu");

  if (btnMenu && menu) {
    // ... (Lógica para abrir/fechar menu, resize, e fechar ao clicar no link) ...
    btnMenu.addEventListener("click", () => {
      const opened = menu.classList.toggle("open");
      // ...
    });
    // ...
  }

  /* ===== DOWNLOAD (botão com porcentagem simulado) ===== */
  // OK: Seleciona todos os botões com a classe .btn-download-simulado (presente em todos os HTMLs)
  const dlButtons = document.querySelectorAll(".btn-download-simulado");
  dlButtons.forEach(dl => {
    // ... (Lógica de simulação de download) ...
  });

  /* ===== Melhorias de acessibilidade: fechar com ESC quando menu aberto ===== */
  window.addEventListener("keydown", (e) => {
    // ... (Lógica para fechar menu com a tecla ESC) ...
  });

});
