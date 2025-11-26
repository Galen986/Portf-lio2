/* script.js — Menu, Tema persistente e Animações (IntersectionObserver)
   Coloque este arquivo referenciado com `defer` no HTML.
*/

/* ===== helpers ===== */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

/* ===== THEME (persistência entre páginas) ===== */
const THEME_KEY = 'site_tema';
const body = document.body;
const btnTema = $('.toggle-tema');

function applySavedTheme() {
  const t = localStorage.getItem(THEME_KEY);
  if (t === 'dark') body.classList.add('dark');
  else if (t === 'light') body.classList.remove('dark');
  // if no key, do nothing (keeps default)
}
applySavedTheme();

if (btnTema) {
  btnTema.addEventListener('click', () => {
    body.classList.toggle('dark');
    const novo = body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem(THEME_KEY, novo);
    // update icon (if multiple toggles across pages)
    syncThemeButtons();
  });
}

/* Ensure all theme buttons have consistent icon (if present on multiple pages) */
function syncThemeButtons() {
  const all = $$('.toggle-tema');
  all.forEach(btn => {
    const icon = btn.querySelector('i');
    if (!icon) return;
    if (body.classList.contains('dark')) {
      icon.classList.remove('fa-moon'); icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun'); icon.classList.add('fa-moon');
    }
  });
}
syncThemeButtons();

/* On first load also set icons for any duplicates */
window.addEventListener('DOMContentLoaded', syncThemeButtons);

/* ===== MENU MOBILE PANEL ===== */
const menuPanelId = 'menu-panel';
let panel = document.getElementById(menuPanelId);

function buildMenuPanel() {
  if (panel) return panel;
  panel = document.createElement('div');
  panel.id = menuPanelId;
  panel.className = 'menu-panel';
  panel.innerHTML = `
    <a href="index.html" class="menu-panel-link">Início</a>
    <a href="sobre.html" class="menu-panel-link">Sobre Mim</a>
    <a href="curriculo.html" class="menu-panel-link">Currículo</a>
  `;
  document.body.appendChild(panel);
  return panel;
}
buildMenuPanel();

const btnMenu = $('.btn-toggle-menu');

if (btnMenu) {
  btnMenu.addEventListener('click', (e) => {
    const aberto = panel.classList.toggle('open');
    btnMenu.classList.toggle('ativo', aberto);
    btnMenu.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    // close when clicking outside
    if (aberto) setTimeout(()=> {
      const outsideHandler = (ev) => {
        if (!panel.contains(ev.target) && !btnMenu.contains(ev.target)) {
          closeMenu();
          document.removeEventListener('click', outsideHandler);
        }
      };
      document.addEventListener('click', outsideHandler);
    }, 40);
  });
}

function closeMenu() {
  if (!panel) return;
  panel.classList.remove('open');
  if (btnMenu) {
    btnMenu.classList.remove('ativo');
    btnMenu.setAttribute('aria-expanded', 'false');
  }
}

/* close on links click (better UX on mobile) */
panel.addEventListener('click', (e) => {
  const a = e.target.closest('a');
  if (a) {
    closeMenu();
    // allow navigation to proceed
  }
});

/* keyboard: close menu on Escape */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

/* ===== make sure desktop menu links reflect active page ===== */
function setActiveLinks() {
  const links = $$('.menu-link, .menu-panel-link');
  const path = location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href.includes(path) || (path === '' && href.includes('index.html'))) {
      link.classList.add('ativo');
    } else {
      link.classList.remove('ativo');
    }
  });
}
setActiveLinks();

/* ===== SOCIALS — optional: create if not in HTML (keeps consistent) ===== */
function ensureSocials() {
  if ($('.socials')) return;
  const block = document.createElement('div');
  block.className = 'socials';
  block.innerHTML = `
    <a class="whatsapp" href="https://wa.me/5511964002284" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"><i class="fab fa-whatsapp"></i></a>
    <a class="instagram" href="https://www.instagram.com/guilherme_cardoso132" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
    <a class="facebook" href="https://www.facebook.com/guilherme.cardosodasilva.35" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook-f"></i></a>
  `;
  document.body.appendChild(block);
}
ensureSocials();

/* ===== ANIMAÇÃO AO ROLAR (IntersectionObserver para performance) ===== */
const observerOptions = { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animado');
      // optionally unobserve to avoid repeated triggers
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const targets = $$('[data-animate]');
  targets.forEach(t => observer.observe(t));
});

/* ===== small utilities ===== */
/* Smooth focus outline for keyboard users */
document.addEventListener('keyup', (e) => {
  if (e.key === 'Tab') document.body.classList.add('user-is-tabbing');
});
document.addEventListener('mousedown', () => document.body.classList.remove('user-is-tabbing'));

/* Prevent double-loading side panel if script runs twice */
if (window.__siteScriptLoaded) {
  // nothing
} else {
  window.__siteScriptLoaded = true;
}

/* End of script.js */