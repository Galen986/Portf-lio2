/* ======================================================
   script.js — Versão levemente reforçada (ARIA + fallback)
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

function atualizarIconeTema() {
    // atualiza ícone e aria-pressed com segurança
    const icone = btnToggleTema?.querySelector('i');
    if (btnToggleTema) {
        const isDark = body.classList.contains('dark');
        btnToggleTema.setAttribute('aria-pressed', isDark ? 'true' : 'false');
        if (icone) icone.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
    } else {
        // fallback: tenta procurar por qualquer botão similar
        const fallback = document.querySelector('[data-toggle-tema-fallback]');
        if (fallback) {
            const ic = fallback.querySelector('i');
            if (ic) ic.className = body.classList.contains('dark') ? "fa-solid fa-sun" : "fa-solid fa-moon";
        }
    }
}

// inicializa ícone
atualizarIconeTema();

if (btnToggleTema) {
    btnToggleTema.addEventListener("click", () => {
        body.classList.toggle("dark");
        localStorage.setItem("tema", body.classList.contains("dark") ? "dark" : "light");
        atualizarIconeTema();
    });
}

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
        if (navMenu.classList.contains('open')) {
            navMenu.classList.remove("open");
            btnMenu.classList.remove("ativo");
            btnMenu.setAttribute("aria-expanded", "false");
        }
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
revelarAoRolar();

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

            const txt = downloadBtn.querySelector(".txt");
            const prog = downloadBtn.querySelector(".progress");
            if (txt) txt.innerText = pct + "%";
            if (prog) prog.style.width = pct + "%";

            if (pct === 100) {
                clearInterval(simular);

                if (txt) txt.innerText = "✔ Completo";

                setTimeout(() => {
                    const link = document.createElement("a");
                    link.href = "Guilherme.pdf"; // ajuste se necessário
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