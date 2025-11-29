/* ======================================================
   SCRIPT OFICIAL — Guilherme Cardoso (2025)
   Tema com persistência | Menu Mobile responsivo
   Scroll Reveal | Download com barra e porcentagem real
====================================================== */

/* Helpers */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));


/* =================== TEMA DARK/CLARO =================== */
const btnToggleTema = $('.toggle-tema');
const body = document.body;
const temaSalvo = localStorage.getItem('tema');

// aplica tema salvo
if (temaSalvo === 'dark') body.classList.add('dark');
atualizarIconeTema();

function atualizarIconeTema() {
    const icone = btnToggleTema?.querySelector('i');
    if (!icone) return;

    if (body.classList.contains('dark')) {
        icone.className = "fa-solid fa-sun"; // modo escuro = sol visível
    } else {
        icone.className = "fa-solid fa-moon";
    }
}

btnToggleTema?.addEventListener("click", () => {
    body.classList.toggle("dark");
    localStorage.setItem("tema", body.classList.contains("dark") ? "dark" : "light");
    atualizarIconeTema();
});


/* =================== MENU MOBILE =================== */
const btnMenu = $(".btn-toggle-menu");
const navMenu = $(".menu");
const linksMenu = $$(".menu-link");

btnMenu?.addEventListener("click", () => {
    const active = navMenu.classList.toggle("open");
    btnMenu.classList.toggle("ativo");
    btnMenu.setAttribute("aria-expanded", active ? "true" : "false");
});

// fecha ao clicar em link
linksMenu.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        btnMenu.classList.remove("ativo");
        btnMenu.setAttribute("aria-expanded", "false");
    });
});


/* =================== SCROLL REVEAL =================== */
const elementos = $$('[data-animate]');

function revelarAoRolar() {
    elementos.forEach(el => {
        const posY = el.getBoundingClientRect().top;
        if (posY < window.innerHeight - 100) el.classList.add("animado");
    });
}
window.addEventListener("scroll", revelarAoRolar);
revelarAoRolar(); // ativação inicial


/* ===================== DOWNLOAD REAL ===================== */
const downloadBtn = document.getElementById("btnDownload");

if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
        if (downloadBtn.classList.contains("loading")) return;

        downloadBtn.innerHTML = `<span class="txt">0%</span><span class="progress"></span>`;
        downloadBtn.classList.add("loading");

        let pct = 0;
        const simular = setInterval(() => {
            pct += Math.floor(Math.random() * 6) + 3;
            if (pct > 100) pct = 100;

            downloadBtn.querySelector(".txt").innerText = pct + "%";
            downloadBtn.querySelector(".progress").style.width = pct + "%";

            if (pct === 100) {
                clearInterval(simular);

                downloadBtn.querySelector(".txt").innerText = "✔ Completo";

                setTimeout(() => {
                    const link = document.createElement("a");
                    link.href = "Guilherme.pdf"; // nome do seu arquivo
                    link.download = "Curriculo-Guilherme-Cardoso.pdf";
                    document.body.appendChild(link);
                    link.click();
                    link.remove();

                    setTimeout(() => {
                        downloadBtn.classList.remove("loading");
                        downloadBtn.innerHTML = "Baixar Currículo";
                    }, 900);

                }, 600);
            }
        }, 120);
    });
}