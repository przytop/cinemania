const switcher = document.querySelector('.theme-switcher');
const root = document.documentElement;

function switchTheme() {
  const newTheme =
    root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  switcher.classList.toggle('active');
}

switcher.addEventListener('click', switchTheme);
