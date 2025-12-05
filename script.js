// script.js — tema, menu e botão de download (versão otimizada)
document.addEventListener("DOMContentLoaded", () => {

  /* ===== TEMA (persistente) ===== */
  // ... (o código do tema é estável e não precisa de alteração) ...
  const btnTema = document.querySelector(".toggle-tema");
  if (btnTema) {
    const iconeTema = btnTema.querySelector("i");
    const setIcon = (isDark) => {
      if (!iconeTema) return;
      iconeTema.classList.remove("fa-moon", "fa-sun");
      iconeTema.classList.add(isDark ? "fa-sun" : "fa-moon");
    };
    const saved = localStorage.getItem("tema");
    if (saved === "dark") {
      document.body.classList.add("dark");
      setIcon(true);
    } else {
      setIcon(false);
    }
    btnTema.addEventListener("click", () => {
      const isNowDark = document.body.classList.toggle("dark");
      setIcon(isNowDark);
      localStorage.setItem("tema", isNowDark ? "dark" : "light");
    });
  }


  /* ===== MENU MOBILE ===== */
  // ... (o código do menu é estável e não precisa de alteração) ...
  const menu = document.getElementById("main-menu");
  const btnMenu = document.querySelector(".btn-toggle-menu");

  if (btnMenu && menu) {
    btnMenu.addEventListener("click", () => {
      const opened = menu.classList.toggle("open");
      btnMenu.classList.toggle("ativo");
      btnMenu.setAttribute("aria-expanded", opened ? "true" : "false");
    });
    menu.querySelectorAll(".menu-link").forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("open");
        btnMenu.classList.remove("ativo");
        btnMenu.setAttribute("aria-expanded", "false");
      });
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        menu.classList.remove("open");
        btnMenu.classList.remove("ativo");
        btnMenu.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ===== DOWNLOAD (botão com porcentagem simulado) ===== */
  // 💡 CORREÇÃO: Mudar de ID para CLASSE para selecionar todos os botões de download
  const dlButtons = document.querySelectorAll(".btn-download-simulado");
  dlButtons.forEach(dl => {
    dl.addEventListener("click", (ev) => {
      if (dl.classList.contains("loading")) {
        ev.preventDefault();
        return;
      }

      const originalLabel = dl.querySelector(".label")?.textContent || dl.textContent;
      const labelEl = dl.querySelector(".label") || dl;
      let pct = 0;

      dl.classList.add("loading");
      if (labelEl) labelEl.textContent = "Baixando 0%";

      const timer = setInterval(() => {
        pct += Math.max(4, Math.floor(6 + Math.random() * 10));
        if (pct >= 100) {
          pct = 100;
          clearInterval(timer);
          if (labelEl) labelEl.textContent = "✔ Concluído";

          setTimeout(() => {
            dl.classList.remove("loading");
            if (labelEl) labelEl.textContent = originalLabel;
          }, 1100);
        } else {
          if (labelEl) labelEl.textContent = `Baixando ${Math.round(pct)}%`;
        }
      }, 120);
    });
  });

  /* ===== Melhorias de acessibilidade: fechar com ESC quando menu aberto ===== */
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const openMenu = document.querySelector(".menu.open");
      if (openMenu) {
        openMenu.classList.remove("open");
        const btn = document.querySelector(".btn-toggle-menu");
        if (btn) {
          btn.classList.remove("ativo");
          btn.setAttribute("aria-expanded", "false");
          btn.focus();
        }
      }
    }
  });

});