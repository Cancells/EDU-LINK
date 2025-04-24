lucide.createIcons();

// Theme handling
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Function to set theme
function setTheme(theme) {
  if (theme === 'system') {
    document.documentElement.setAttribute('data-theme', prefersDarkScheme.matches ? 'dark' : 'light');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
  localStorage.setItem('theme', theme);
  themeToggle.setAttribute('data-theme', theme);
}

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 'system';
setTheme(savedTheme);

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
  const currentTheme = themeToggle.getAttribute('data-theme');
  const themes = ['dark', 'light', 'system'];
  const currentIndex = themes.indexOf(currentTheme);
  const nextIndex = (currentIndex + 1) % themes.length;
  setTheme(themes[nextIndex]);
});

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
  if (localStorage.getItem('theme') === 'system') {
    document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
  }
});

// Mobile menu toggle
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarLinks = document.querySelector('.nav-links');

navbarToggler.addEventListener('click', () => {
  navbarLinks.classList.toggle('active');
});