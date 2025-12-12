/* ==========================================================
   script.js (Refatorado para Modularidade e Performance)
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

  // ... (MÓDULO 1: TEMA - Mantenha este código inalterado)
  (( ) => {
    const THEME_KEY = "gc_theme";
    const body = document.body;
    const btnTemaList = document.querySelectorAll(".toggle-tema");

    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light") body.classList.add("light");
    else body.classList.remove("light");

    const updateThemeButtons = () => {
      const isLight = body.classList.contains("light");
      btnTemaList.forEach(btn => {
        const icon = btn.querySelector("i");
        if (icon) {
          icon.classList.toggle("fa-sun", isLight);
          icon.classList.toggle("fa-moon", !isLight);
        }
        btn.setAttribute("aria-label", isLight ? "Ativar tema escuro" : "Ativar tema claro");
      });
    };
    updateThemeButtons();

    btnTemaList.forEach(btn => {
      btn.addEventListener("click", () => {
        const nowLight = body.classList.toggle("light");
        localStorage.setItem(THEME_KEY, nowLight ? "light" : "dark");
        updateThemeButtons();
      });
    });
  })();


  /* -------------------------
     MÓDULO 2: MENU MOBILE (Acessibilidade) - CORRIGIDO
     ------------------------- */
  (( ) => {
    const menu = document.getElementById("main-menu");
    // Seleciona todos os botões de menu
    const btnMenuList = document.querySelectorAll(".btn-toggle-menu");

    if (!menu) return; // Sai se o menu principal não existe

    // Função para abrir/fechar o menu em todos os botões E no elemento <nav>
    const toggleMenu = (openState) => {
        // Alterna a classe 'open' no elemento do menu, ou usa o estado passado
        const isOpen = typeof openState === 'boolean' ? openState : menu.classList.toggle("open");

        // Aplica o estado em todos os botões (para animação do hamburger e ARIA)
        btnMenuList.forEach(btnMenu => {
            btnMenu.classList.toggle("is-open", isOpen);
            btnMenu.setAttribute("aria-expanded", String(isOpen));
        });
        
        // **LINHA CORRIGIDA:** Garante que a classe 'open' seja aplicada na NAV para o CSS
        menu.classList.toggle("open", isOpen); 
    };

    // 1. Evento de clique para alternar o menu
    btnMenuList.forEach(btnMenu => {
      btnMenu.addEventListener("click", () => toggleMenu());
    });

    // 2. Fecha menu ao clicar em link interno (melhora UX)
    menu.addEventListener("click", (e) => {
      if (e.target && e.target.matches(".menu-link")) {
        toggleMenu(false); // Fecha o menu
      }
    });

    // 3. Fechar menu com ESC ou Ctrl/Cmd + K
    window.addEventListener("keydown", (e) => {
      // Fecha com ESC
      if (e.key === "Escape" && menu.classList.contains("open")) {
        toggleMenu(false);
      }

      // Ctrl/Cmd + K: Foca no primeiro link do menu (para acessibilidade)
      const isCmdK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k";
      if (isCmdK) {
        e.preventDefault();
        const firstLink = menu.querySelector(".menu-link");
        if (firstLink) firstLink.focus();
      }
    });
  })();


  // ... (MÓDULO 3: DOWNLOAD SIMULADO - Mantenha este código inalterado)
  (( ) => {
    const dlButtons = document.querySelectorAll(".btn-download-simulado");

    dlButtons.forEach(btn => {
      btn.addEventListener("click", (ev) => {
        if (btn.dataset.busy === "1") {
          ev.preventDefault();
          return;
        }

        const href = btn.getAttribute("href");
        if (!href) return;

        ev.preventDefault();

        btn.dataset.busy = "1";
        const progressEl = btn.querySelector(".progress");
        if (progressEl) progressEl.textContent = "0%";

        let percent = 0;
        const start = Date.now();

        const totalSimMs = 1200 + Math.random() * 900;

        const step = () => {
          const elapsed = Date.now() - start;
          const ratio = Math.min(1, elapsed / totalSimMs);

          const eased = 1 - Math.pow(1 - ratio, 4); 
          percent = Math.floor(eased * 100);

          if (progressEl) progressEl.textContent = `${percent}%`;

          if (ratio < 1) {
            requestAnimationFrame(step);
          } else {
            progressEl.textContent = `100%`;

            setTimeout(() => {
              const a = document.createElement("a");
              a.href = href;
              a.download = href.split("/").pop() || "documento.pdf";
              document.body.appendChild(a);
              a.click();
              a.remove();

              delete btn.dataset.busy;
              setTimeout(() => { 
                if (progressEl) progressEl.textContent = ""; 
              }, 600);
            }, 250);
          }
        };

        requestAnimationFrame(step);
      });
    });
  })();

});
