const btnToggle = document.querySelector('.btn-toggle-menu');
const menu = document.querySelector('.menu');

btnToggle.addEventListener('click', () => {
  menu.classList.toggle('ativo');
});

// ======= BOTÃO DE TEMA COM ANIMAÇÃO =======
const toggleBtn = document.getElementById("toggle-theme");
const body = document.body;

// verifica tema salvo
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  body.classList.add("light-theme");
  toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

toggleBtn.addEventListener("click", () => {
  // adiciona efeito flash
  body.classList.add("theme-transition");
  setTimeout(() => body.classList.remove("theme-transition"), 600);

  // alterna tema
  body.classList.toggle("light-theme");

  if (body.classList.contains("light-theme")) {
    toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem("theme", "light");
  } else {
    toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem("theme", "dark");
  }
});