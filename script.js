/* script.js — tema, menu e botão de download (atualizado) */
document.addEventListener("DOMContentLoaded", () => {

  /* ===== TEMA (persistente) ===== */
  const btnTema = document.querySelector(".toggle-tema");
  const iconeTema = btnTema.querySelector("i");

  // Aplica tema salvo
  if (localStorage.tema === "dark") {
    document.body.classList.add("dark");
    iconeTema.classList.remove("fa-moon");
    iconeTema.classList.add("fa-sun");
  } else {
    iconeTema.classList.remove("fa-sun");
    iconeTema.classList.add("fa-moon");
  }

  btnTema.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");

    // troca o ícone (fa-moon <-> fa-sun)
    iconeTema.classList.remove("fa-moon", "fa-sun");
    iconeTema.classList.add(isDark ? "fa-sun" : "fa-moon");

    // salva estado
    localStorage.tema = isDark ? "dark" : "";
  });

  /* ===== MENU MOBILE ===== */
  const menu = document.querySelector(".menu");
  const btnMenu = document.querySelector(".btn-toggle-menu");

  btnMenu.addEventListener("click", () => {
    const opened = menu.classList.toggle("open");
    btnMenu.classList.toggle("ativo");
    btnMenu.setAttribute("aria-expanded", opened ? "true" : "false");
  });

  // fechar menu ao clicar em um link
  document.querySelectorAll(".menu-link").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      btnMenu.classList.remove("ativo");
      btnMenu.setAttribute("aria-expanded", "false");
    });
  });

  /* ===== DOWNLOAD (botão com porcentagem) ===== */
  const dl = document.querySelector("#btnDownload");
  if (dl) {
    dl.addEventListener("click", () => {
      if (dl.classList.contains("loading")) return;
      dl.classList.add("loading");
      const originalText = dl.textContent;
      let pct = 0;
      dl.textContent = "Baixando 0%";

      const timer = setInterval(() => {
        // incremento pseudo-randômico
        pct += Math.floor(6 + Math.random() * 12);
        if (pct >= 100) {
          pct = 100;
          clearInterval(timer);
          dl.textContent = "✔ Concluído";
          // Trigger download (substitua o href por seu arquivo real)
          const a = document.createElement("a");
          a.href = "Guilherme.pdf";
          a.download = "Curriculo-Guilherme-Cardoso.pdf";
          document.body.appendChild(a);
          a.click();
          a.remove();

          setTimeout(() => {
            dl.classList.remove("loading");
            dl.textContent = originalText;
          }, 1200);
        } else {
          dl.textContent = `Baixando ${Math.round(pct)}%`;
        }
      }, 110);
    });
  }

  /* ===== Melhora pequena: fecha menu ao redimensionar para desktop ===== */
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      menu.classList.remove("open");
      btnMenu.classList.remove("ativo");
      btnMenu.setAttribute("aria-expanded", "false");
    }
  });

});