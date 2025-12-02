/* ===== SELETOR RÁPIDO ===== */
const $ = (s)=>document.querySelector(s); 
const $$=(s)=>document.querySelectorAll(s);

/* ===== THEME SWITCH ===== */
const tema = $(".toggle-tema");

if (localStorage.tema)
    document.body.classList.add(localStorage.tema);

tema.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.tema = document.body.classList.contains("dark") ? "dark" : "";
});

/* ===== MENU ===== */
const menu = $(".menu"), btn = $(".btn-toggle-menu");
btn.addEventListener("click", ()=>{
    menu.classList.toggle("open");
    btn.classList.toggle("ativo");
});
$$(".menu-link").forEach(l=>l.addEventListener("click",()=>{
    menu.classList.remove("open"); btn.classList.remove("ativo");
}));

/* ===== DOWNLOAD ===== */
const dl = $("#btnDownload");
if(dl){
    dl.addEventListener("click",()=>{
        if(dl.classList.contains("loading")) return;
        dl.classList.add("loading");
        dl.textContent="Baixando 0%";

        let pct=0,set=setInterval(()=>{
            pct+=8+Math.random()*10;
            if(pct>=100){
                pct=100; clearInterval(set);
                dl.textContent="✔ Concluído";
                let a=document.createElement("a");
                a.href="Guilherme.pdf";
                a.download="Curriculo-Guilherme-Cardoso.pdf";
                a.click();
                setTimeout(()=>{dl.classList.remove("loading");dl.textContent="Baixar Currículo"},1200);
            }else dl.textContent="Baixando "+Math.round(pct)+"%";
        },120);
    });
}