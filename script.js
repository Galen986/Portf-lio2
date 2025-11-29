/* ======================================================
   script.js — Final Premium 2025
====================================================== */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* 🌙 TEMA */
const btnToggleTema = $('.toggle-tema');
const temaSalvo = localStorage.getItem('tema');
if(temaSalvo) document.body.classList.add(temaSalvo);

btnToggleTema.addEventListener("click", ()=>{
    document.body.classList.toggle("dark");
    localStorage.setItem("tema", document.body.classList.contains("dark")?"dark":"light");
    btnToggleTema.querySelector("i").className =
        document.body.classList.contains("dark")?"fa-solid fa-sun":"fa-solid fa-moon";
});

/* 📱 MENU */
const btnMenu = document.querySelector(".btn-toggle-menu");
const menu = document.querySelector(".menu");

btnMenu.addEventListener("click", ()=>{
    menu.classList.toggle("open");
    btnMenu.classList.toggle("ativo");
});

$$(".menu-link").forEach(link=>link.addEventListener("click",()=>{
    menu.classList.remove("open"); btnMenu.classList.remove("ativo");
}));

/* 🔥 SCROLL */
const itens = $$('[data-animate]');
const reveal = ()=>itens.forEach(el=>{
    if(el.getBoundingClientRect().top < window.innerHeight-100) el.classList.add("animado");
});
window.addEventListener("scroll",reveal); reveal();

/* 📄 DOWNLOAD */
const downloadBtn = document.getElementById("btnDownload");
if(downloadBtn){
    downloadBtn.addEventListener("click",()=>{
        if(downloadBtn.classList.contains("loading"))return;

        downloadBtn.innerHTML=`<span class="txt">0%</span><span class="progress"></span>`;
        downloadBtn.classList.add("loading");

        let pct=0,set=setInterval(()=>{
            pct+=Math.random()*10+5; if(pct>=100){pct=100;clearInterval(set);}
            downloadBtn.querySelector(".txt").textContent=Math.round(pct)+"%";
            downloadBtn.querySelector(".progress").style.width=pct+"%";

            if(pct===100){
                setTimeout(()=>{
                    downloadBtn.querySelector(".txt").textContent="✔ Completo";
                    const a=document.createElement("a");
                    a.href="Guilherme.pdf";
                    a.download="Curriculo-Guilherme-Cardoso.pdf";
                    document.body.appendChild(a);a.click();a.remove();

                    setTimeout(()=>{
                        downloadBtn.classList.remove("loading");
                        downloadBtn.textContent="Baixar Currículo";
                    },900);

                },600);
            }
        },120);
    });
}