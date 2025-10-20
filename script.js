// Botão para abrir e fechar o menu mobile
const btnMenu = document.querySelector(".btn-toggle-menu");
const menu = document.querySelector(".cabecalho-menu");

btnMenu.addEventListener("click", () => {
  menu.classList.toggle("ativo");
});