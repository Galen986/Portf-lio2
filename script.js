// script.js — tema, menu e botão de download (estável)
document.addEventListener("DOMContentLoaded", () => {

  /* ===== TEMA (persistente) ===== */
  const btnTema = document.querySelector(".toggle-tema");
  if (btnTema) {
    const iconeTema = btnTema.querySelector("i");

    // Função para aplicar estado visual do ícone
    const setIcon = (isDark) => {
      if (!iconeTema) return;
      iconeTema.classList.remove("fa-moon", "fa-sun");
      iconeTema.classList.add(isDark ? "fa-sun" : "fa-moon");
    };

    // Aplica tema salvo
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
  const menu = document.getElementById("main-menu");
  const btnMenu = document.querySelector(".btn-toggle-menu");

  if (btnMenu && menu) {
    btnMenu.addEventListener("click", () => {
      const opened = menu.classList.toggle("open");
      btnMenu.classList.toggle("ativo");
      btnMenu.setAttribute("aria-expanded", opened ? "true" : "false");
    });

    // fechar menu ao clicar em um link
    menu.querySelectorAll(".menu-link").forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("open");
        btnMenu.classList.remove("ativo");
        btnMenu.setAttribute("aria-expanded", "false");
      });
    });

    // fecha menu ao redimensionar para desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        menu.classList.remove("open");
        btnMenu.classList.remove("ativo");
        btnMenu.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ===== DOWNLOAD (botão com porcentagem simulado) ===== */
  const dlButtons = document.querySelectorAll("#btnDownload");
  dlButtons.forEach(dl => {
    // Se for um <a> com href para o PDF, manter download padrão ao mesmo tempo que animamos
    dl.addEventListener("click", (ev) => {
      // evita comportamento padrão se já está carregando (pré-evita multi-clique)
      if (dl.classList.contains("loading")) {
        ev.preventDefault();
        return;
      }

      // Se é um link com href e existe o atributo download, deixamos o navegador iniciar o download.
      // Ainda assim, mostramos a animação de progresso para o usuário.
      const originalLabel = dl.querySelector(".label")?.textContent || dl.textContent;
      const labelEl = dl.querySelector(".label") || dl;
      let pct = 0;

      dl.classList.add("loading");
      if (labelEl) labelEl.textContent = "Baixando 0%";

      const timer = setInterval(() => {
        // incremento pseudo-randômico suave
        pct += Math.max(4, Math.floor(6 + Math.random() * 10));
        if (pct >= 100) {
          pct = 100;
          clearInterval(timer);
          if (labelEl) labelEl.textContent = "✔ Concluído";

          // se o elemento é um <a> com href & download, deixamos o navegador gerenciar a descarga.
          // Caso queira forçar download via JS, descomente bloco abaixo (a criação de <a>).
          // const a = document.createElement('a');
          // a.href = dl.href || 'assets/Curriculo-Guilherme-Cardoso.pdf';
          // a.download = dl.getAttribute('download') || 'Curriculo-Guilherme-Cardoso.pdf';
          // document.body.appendChild(a);
          // a.click();
          // a.remove();

          setTimeout(() => {
            dl.classList.remove("loading");
            if (labelEl) labelEl.textContent = originalLabel;
          }, 1100);
        } else {
          if (labelEl) labelEl.textContent = `Baixando ${Math.round(pct)}%`;
        }
      }, 120);

      // Não prevenir o evento do <a> para manter download nativo.
      // se quiser prevenir e usar fetch+blob, podemos implementar (mas o download nativo é mais simples).
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