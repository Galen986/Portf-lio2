/* =======================================================
   script.js — Versão corrigida para o seu HTML (2025)
   Menu mobile | Tema persistente | Scroll reveal
   Botão download com barra e porcentagem real
   ======================================================= */

/* Helpers */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* ================= TEMA (escuro/claro) ================= */
const body = document.body;
const btnToggleTema = document.querySelector('.toggle-tema'); // usa classe no HTML
const temaSalvo = localStorage.getItem('tema') || null;

// aplica tema salvo
if (temaSalvo === 'dark') body.classList.add('dark');

// atualiza ícone (se existir) conforme tema atual
function atualizarIconeTema() {
  const icone = btnToggleTema?.querySelector('i');
  if (!icone) return;
  if (body.classList.contains('dark')) {
    icone.className = 'fa-solid fa-sun'; // sol quando está dark
  } else {
    icone.className = 'fa-solid fa-moon';
  }
}
atualizarIconeTema();

btnToggleTema?.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('tema', body.classList.contains('dark') ? 'dark' : 'light');
  atualizarIconeTema();
});

/* ================= MENU MOBILE ================= */
/*
HTML: botão .btn-toggle-menu e nav.menu (conforme seu HTML)
Vamos alternar a classe 'open' na <nav class="menu"> e 'ativo' no botão
*/
const btnToggleMenu = document.querySelector('.btn-toggle-menu');
const menuPanel = document.querySelector('.menu');
const menuLinks = $$('.menu-link');

btnToggleMenu?.addEventListener('click', () => {
  const isOpen = menuPanel.classList.toggle('open');
  btnToggleMenu.classList.toggle('ativo');
  // acessibilidade
  btnToggleMenu.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// fechar menu ao clicar em link (útil no mobile)
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (menuPanel.classList.contains('open')) {
      menuPanel.classList.remove('open');
      btnToggleMenu.classList.remove('ativo');
      btnToggleMenu.setAttribute('aria-expanded', 'false');
    }
  });
});

/* ============== ANIMAÇÃO AO ROLAR (reveal) ============= */
const elementos = $$('[data-animate]');

function revelarAoRolar() {
  elementos.forEach(el => {
    const pos = el.getBoundingClientRect().top;
    if (pos < window.innerHeight - 100) el.classList.add('animado');
  });
}
window.addEventListener('scroll', revelarAoRolar);
revelarAoRolar(); // one-time ao carregar

/* ======================================================
   DOWNLOAD COM BARRA + PORCENTAGEM REAL + BAIXAR ARQUIVO
   ====================================================== */
/*
HTML: botão com id="btnDownload" (conforme seu HTML).
Ele exibirá percent e barra e, ao finalizar, iniciará o download de "Guilherme.pdf".
*/
const downloadBtn = document.getElementById('btnDownload');

if (downloadBtn) {
  downloadBtn.addEventListener('click', async () => {
    if (downloadBtn.classList.contains('loading')) return; // evita multi-cliques

    // estrutura interna (texto + barra)
    downloadBtn.innerHTML = `<span class="txt">0%</span><span class="progress" aria-hidden="true"></span>`;
    downloadBtn.classList.add('loading');

    // animação fictícia de progresso (simula um download)
    let pct = 0;
    const interval = setInterval(() => {
      pct += Math.floor(Math.random() * 6) + 2; // incremento variável para parecer real
      if (pct > 100) pct = 100;
      downloadBtn.querySelector('.txt').innerText = pct + '%';
      downloadBtn.querySelector('.progress').style.width = pct + '%';

      if (pct >= 100) {
        clearInterval(interval);
        downloadBtn.querySelector('.txt').innerText = '✔ Completo';

        // inicia o download real do arquivo (se existir no mesmo diretório)
        setTimeout(() => {
          // criar link e forçar download
          const link = document.createElement('a');
          link.href = 'Guilherme.pdf'; // ajuste se o arquivo estiver em outra pasta
          link.download = 'Curriculo-Guilherme-Cardoso.pdf';
          document.body.appendChild(link);
          link.click();
          link.remove();

          // reset visual do botão
          setTimeout(() => {
            downloadBtn.classList.remove('loading');
            downloadBtn.innerHTML = `<span class="txt">Baixar Currículo</span><span class="progress" style="width:0%"></span>`;
          }, 900);
        }, 600);
      }
    }, 120);
  });
}