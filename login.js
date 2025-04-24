lucide.createIcons();

// Theme handling
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

// Password visibility toggle
const togglePassword = document.querySelector('.toggle-password');
const passwordInput = document.querySelector('#password');
const showIcon = document.querySelector('.show-password');
const hideIcon = document.querySelector('.hide-password');

togglePassword.addEventListener('click', function () {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        showIcon.classList.add('hidden');
        hideIcon.classList.remove('hidden');
    } else {
        passwordInput.type = 'password';
        showIcon.classList.remove('hidden');
        hideIcon.classList.add('hidden');
    }
});

// Helper function to get users from localStorage
function getStoredUsers() {
    const stored = localStorage.getItem('signupData');
    let storedUsers = [];

    try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
            storedUsers = parsed;
        } else if (parsed && typeof parsed === 'object') {
            storedUsers = [parsed]; // Convert single object to array
        }
    } catch (e) {
        console.error("Error parsing user data:", e);
        storedUsers = [];
    }

    return storedUsers;
}

// Handle login form submit
document.querySelector('.login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const users = getStoredUsers();
    
    console.log("Attempting login with:", email);
    console.log("Available users:", users);

    const matchedUser = users.find(user => user && user.email === email && user.password === password);

    if (matchedUser) {
        // Save current logged in user to localStorage
        localStorage.setItem('currentUser', JSON.stringify(matchedUser));

        // Redirect based on role
        if (matchedUser.role === 'student') {
            window.location.href = `student.html`;
        } else if (matchedUser.role === 'teacher') {
            window.location.href = `dashboard-teacher.html`;
        }
    } else {
        alert('Invalid email or password!');
    }
});