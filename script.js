const btnToggleMenu = document.querySelector(".btn-toggle-menu");
const menu = document.querySelector(".cabecalho-menu");

btnToggleMenu.addEventListener("click", () => {
  menu.classList.toggle("active");
  btnToggleMenu.classList.toggle("active"); // animação do botão
});