/* ======================================================
   SCRIPT OFICIAL – Guilherme Cardoso (2025)
   Menu mobile + Tema persistente + Animações
   Botão de download com PORCENTAGEM REAL 
====================================================== */

/* ========= SHORTCUTS ========= */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);


/* ========= TEMA (ESCURO/CLARO) ========= */
const body = document.body;
const toggleTema = $("#toggle-tema");
const temaSalvo = localStorage.getItem("tema");

if (temaSalvo === "dark") body.classList.add("dark");

toggleTema?.addEventListener("click", () => {
    body.classList.toggle("dark");
    localStorage.setItem("tema", body.classList.contains("dark") ? "dark" : "light");
});


/* ========= MENU MOBILE ========= */
const btnMenu = $("#btn-menu");
const menuPanel = $("#menu-panel");

btnMenu?.addEventListener("click", () => {
    btnMenu.classList.toggle("ativo");
    menuPanel.classList.toggle("open");
});

// fechar ao clicar em link
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



/* ======================================================
   DOWNLOAD COM BARRA + PORCENTAGEM REAL + TEXTO FINAL
====================================================== */

const downloadBtn = $("#btn-download");
let pct = 0;

downloadBtn?.addEventListener("click",()=>{

    if(downloadBtn.classList.contains("loading")) return;

    downloadBtn.innerHTML = `<span class="txt">0%</span><div class="progress"></div>`;
    downloadBtn.classList.add("loading");
    pct = 0;

    let run = setInterval(()=>{
        pct++;
        downloadBtn.querySelector(".txt").innerText = pct+"%";
        downloadBtn.querySelector(".progress").style.width = pct+"%";

        if(pct >= 100){
            clearInterval(run);

            downloadBtn.querySelector(".txt").innerText = "✔ Completo";
            setTimeout(()=>{
                downloadBtn.innerHTML = "Baixar Novamente";
                downloadBtn.classList.remove("loading");
            },1000);
        }
    },25);
});