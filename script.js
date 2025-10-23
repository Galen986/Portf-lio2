const btnToggle = document.querySelector('.btn-toggle-menu');
const menu = document.querySelector('.menu');

btnToggle.addEventListener('click', () => {
  menu.classList.toggle('ativo');
});