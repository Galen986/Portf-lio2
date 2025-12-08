/* script.js
   Tema persistente, menu mobile e botão de download com simulação de progresso.
*/

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------
     TEMA (persistente com localStorage)
     ------------------------- */
  const THEME_KEY = "gc_theme";
  const body = document.body;
  const btnTemaList = document.querySelectorAll(".toggle-tema");

  // Inicializa tema salvo (se houver)
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light") body.classList.add("light");
  else body.classList.remove("light");

  // Função para atualizar ícone e aria
  function updateThemeButtons() {
    btnTemaList.forEach(btn => {
      const icon = btn.querySelector("i");
      if (body.classList.contains("light")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
        btn.setAttribute("aria-label", "Ativar tema escuro");
      } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
        btn.setAttribute("aria-label", "Ativar tema claro");
      }
    });
  }
  updateThemeButtons();

  btnTemaList.forEach(btn => {
    btn.addEventListener("click", () => {
      const nowLight = body.classList.toggle("light");
      localStorage.setItem(THEME_KEY, nowLight ? "light" : "dark");
      updateThemeButtons();
    });
  });


  /* -------------------------
     MENU MOBILE
     ------------------------- */
  const menu = document.getElementById("main-menu");
  const btnMenuList = document.querySelectorAll(".btn-toggle-menu");

  btnMenuList.forEach(btnMenu => {
    btnMenu.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");
      btnMenu.classList.toggle("is-open", isOpen);
      btnMenu.setAttribute("aria-expanded", String(isOpen));
    });
  });

  // fecha menu ao clicar em link (melhora UX)
  menu.addEventListener("click", (e) => {
    if (e.target && e.target.matches(".menu-link")) {
      menu.classList.remove("open");
      btnMenuList.forEach(b => b.classList.remove("is-open"));
      btnMenuList.forEach(b => b.setAttribute("aria-expanded", "false"));
    }
  });

  // fechar menu com ESC
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("open")) {
      menu.classList.remove("open");
      btnMenuList.forEach(b => { b.classList.remove("is-open"); b.setAttribute("aria-expanded", "false"); });
    }
  });


  /* -------------------------
     DOWNLOAD SIMULADO (porcentagem)
     - Segurança: não faz requests; simula progresso e dispara download.
     ------------------------- */
  const dlButtons = document.querySelectorAll(".btn-download-simulado");

  dlButtons.forEach(btn => {
    btn.addEventListener("click", (ev) => {
      // se tiver atributo data-busy, evita múltiplos cliques
      if (btn.dataset.busy === "1") {
        ev.preventDefault();
        return;
      }

      const href = btn.getAttribute("href");
      // se não há href, nada a fazer
      if (!href) return;

      ev.preventDefault(); // bloqueia comportamento padrão para simular

      btn.dataset.busy = "1";
      const progressEl = btn.querySelector(".progress");
      if (progressEl) progressEl.textContent = "0%";

      // simulação: aumenta rápido no começo, desacelera no fim
      let percent = 0;
      const start = Date.now();

      // parâmetros de tempo
      const totalSimMs = 1200 + Math.random() * 900; // entre ~1.2s e 2.1s
      const step = () => {
        const elapsed = Date.now() - start;
        const ratio = Math.min(1, elapsed / totalSimMs);

        // ease-out curve (mais natural): 1 - (1 - x)^3
        const eased = 1 - Math.pow(1 - ratio, 3);
        percent = Math.floor(eased * 100);

        if (progressEl) progressEl.textContent = `${percent}%`;

        if (ratio < 1) {
          requestAnimationFrame(step);
        } else {
          // conclusão: faz o download real
          progressEl.textContent = `100%`;
          // pequena espera para UX (mostrar 100%)
          setTimeout(() => {
            // cria link temporário para download
            const a = document.createElement("a");
            a.href = href;
            // tenta manter mesmo nome de arquivo
            const filename = href.split("/").pop() || "documento.pdf";
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();

            // limpa estado
            delete btn.dataset.busy;
            // limpa texto progress depois de um tempo
            setTimeout(() => { if (progressEl) progressEl.textContent = ""; }, 600);
          }, 250);
        }
      };

      requestAnimationFrame(step);
    });
  });


  /* -------------------------
     Pequenas melhorias de acessibilidade/teclas
     - Ctrl/Cmd + K foca no menu
     ------------------------- */
  window.addEventListener("keydown", (e) => {
    const isCmdK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k";
    if (isCmdK) {
      e.preventDefault();
      const firstLink = document.querySelector(".menu .menu-link");
      if (firstLink) firstLink.focus();
    }
  });

});