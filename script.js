const toggleMenu = document.querySelector('.btn-toggle-menu');
const menu = document.querySelector('.menu');

toggleMenu.addEventListener('click', () => {
  menu.classList.toggle('ativo');
});