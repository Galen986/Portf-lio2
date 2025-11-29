/* ======================================================
   script.js — Versão Premium Final
====================================================== */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* =================== 🌙 TEMA DARK/CLARO =================== */
const btnToggleTema = $('.toggle-tema');
const body = document.body;
const temaSalvo = localStorage.getItem('tema');

if (temaSalvo) body.classList.add(temaSalvo);
atualizarIconeTema();

btnToggleTema?.addEventListener("click", () => {
    body.classList.contains('dark')
        ? body.classList.remove('dark')
        : body.classList.add('dark');

    localStorage.setItem('tema', body.classList.contains('dark') ? 'dark' : 'light');
    atualizarIconeTema();
});

function atualizarIconeTema(){
    const icon = btnToggleTema.querySelector("i");
    if(!icon) return;
    if(body.classList.contains("dark")){
        icon.className = "fa-solid fa-sun";
        btnToggleTema.style.color = "#ffeb3b";
    } else {
        icon.className = "fa-solid fa-moon";
        btnToggleTema.style.color = "#00eaff";
    }
}

/* =================== 📱 MENU MOBILE =================== */
const btnMenu = $(".btn-toggle-menu");
const navMenu = $(".menu");

btnMenu.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    btnMenu.classList.toggle("ativo");
});

$$(".menu-link").forEach(l =>
    l.addEventListener("click", () => {
        navMenu.classList.remove("open");
        btnMenu.classList.remove("ativo");
    })
);

/* =================== 🔥 SCROLL REVEAL =================== */
const itens = $$('[data-animate]');
function scrollReveal(){
    itens.forEach(el => {
        if(el.getBoundingClientRect().top < window.innerHeight - 120){
            el.classList.add("animado");
        }
    })
}
scrollReveal();
window.addEventListener("scroll", scrollReveal);

/* =================== ⬇ DOWNLOAD SURREAL =================== */
const downloadBtn = $("#btnDownload");

if(downloadBtn){
    downloadBtn.addEventListener("click", () => {
        if(downloadBtn.classList.contains("loading")) return;

        downloadBtn.innerHTML = `<span class="txt">0%</span><span class="progress"></span>`;
        downloadBtn.classList.add("loading");

        let pct = 0;
        const sim = setInterval(()=>{
            pct += Math.random()*10+5;
            if(pct>=100){
                pct = 100;
                clearInterval(sim);
                downloadBtn.querySelector(".txt").innerText="✔ Pronto";

                setTimeout(()=>{
                    const a=document.createElement("a");
                    a.href="Guilherme.pdf"; 
                    a.download="Curriculo-Guilherme-Cardoso.pdf";
                    document.body.appendChild(a);
                    a.click();
                    a.remove();

                    setTimeout(()=>{
                        downloadBtn.classList.remove("loading");
                        downloadBtn.innerText="Baixar Currículo";
                    },900);
                },700);
            }
            downloadBtn.querySelector(".txt").innerText = Math.round(pct)+"%";
            downloadBtn.querySelector(".progress").style.width=pct+"%";
        },120);
    });
}