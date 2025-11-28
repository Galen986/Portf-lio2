/* ======================================================
   SCRIPT OFICIAL – Guilherme Cardoso (2025)
   Menu mobile + Troca de tema persistente + Animações
   Botão que vira barra de progresso com porcentagem
====================================================== */

/* ========= SHORTCUTS ========= */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);


/* ========= TEMA (ESCURO/CLARO) ========= */
const body = document.body;
const toggleTema = $("#toggle-tema");
const temaSalvo = localStorage.getItem("tema");

if (temaSalvo === "dark") body.classList.add("dark");

// alternar
toggleTema?.addEventListener("click", () => {
    body.classList.toggle("dark");

    // salvar tema
    localStorage.setItem("tema", body.classList.contains("dark") ? "dark" : "light");
});


/* ========= MENU MOBILE ========= */
const btnMenu = $("#btn-menu");
const menuPanel = $("#menu-panel");

btnMenu?.addEventListener("click", () => {
    btnMenu.classList.toggle("ativo");
    menuPanel.classList.toggle("open");
});

// fechar menu ao clicar em um link
$$(".menu-panel-link").forEach(link =>
    link.addEventListener("click", () => {
        menuPanel.classList.remove("open");
        btnMenu.classList.remove("ativo");
    })
);


/* ========= ANIMAÇÃO AO ROLAR ========= */
const elementos = $$("[data-animate]");

function revelarAoRolar() {
    elementos.forEach(el => {
        const pos = el.getBoundingClientRect().top;
        if (pos < window.innerHeight - 100) el.classList.add("animado");
    });
}
window.addEventListener("scroll", revelarAoRolar);
revelarAoRolar();


/* ========= DOWNLOAD COM PROGRESSO + % ========= */
const downloadBtn = $("#btn-download");

downloadBtn?.addEventListener("click", () => {
    if (downloadBtn.classList.contains("loading")) return; // evita duplo clique

    downloadBtn.classList.add("loading");

    const progress = document.createElement("div");
    progress.className = "progress";
    downloadBtn.appendChild(progress);

    const percent = document.createElement("div");
    percent.className = "percent";
    percent.innerText = "0%";
    downloadBtn.appendChild(percent);

    let p = 0;
    const animar = setInterval(() => {
        p++;
        percent.innerText = p + "%";
        progress.style.width = p + "%";

        if (p >= 100) {
            clearInterval(animar);
            setTimeout(() => {
                downloadBtn.classList.remove("loading");
                progress.remove();  
                percent.remove();
            }, 700);
        }

    }, 25); // velocidade da animação (quanto menor, mais rápido)
});