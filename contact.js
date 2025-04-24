lucide.createIcons();

const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme) {
    if (theme === 'system') {
        document.documentElement.setAttribute('data-theme', prefersDarkScheme.matches ? 'dark' : 'light');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
    }
    localStorage.setItem('theme', theme);
    themeToggle.setAttribute('data-theme', theme);
}

const savedTheme = localStorage.getItem('theme') || 'system';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = themeToggle.getAttribute('data-theme');
    const themes = ['dark', 'light', 'system'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
});

prefersDarkScheme.addEventListener('change', (e) => {
    if (localStorage.getItem('theme') === 'system') {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
});