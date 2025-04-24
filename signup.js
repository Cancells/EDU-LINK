// Initialize Lucide icons
lucide.createIcons();

// Get role from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const selectedRole = urlParams.get('role');

// Highlight selected role button
const roleButtons = document.querySelectorAll('.role-button');
roleButtons.forEach(button => {
    button.addEventListener('click', () => {
        roleButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });

    if (selectedRole && button.getAttribute('data-role') === selectedRole) {
        button.classList.add('active');
    }
});

// Theme Handling
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

// Show appropriate form on page load
window.addEventListener('DOMContentLoaded', () => {
    if (selectedRole === 'student' || selectedRole === 'teacher') {
        selectRole(selectedRole);
    }

    if (selectedRole) {
        document.querySelector('.signup-form').scrollIntoView({ behavior: 'smooth' });
    }
});

// Show specific form based on role
function selectRole(role) {
    const studentForm = document.getElementById("signupForm");
    const teacherForm = document.getElementById("teacher-form");
    const teacherMoreForm = document.getElementById("teacher-more");

    if (role === 'student') {
        studentForm.style.display = 'block';
        teacherForm.style.display = 'none';
        teacherMoreForm.style.display = 'none';
    } else if (role === 'teacher') {
        studentForm.style.display = 'none';
        teacherForm.style.display = 'block';
        teacherMoreForm.style.display = 'none';
    }
}

// Show next step in teacher form
function showTeacherMore() {
    const teacherForm = document.getElementById("teacher-form");
    const teacherMoreForm = document.getElementById("teacher-more");

    teacherForm.style.display = "none";
    teacherMoreForm.style.display = "block";
}
window.showTeacherMore = showTeacherMore; // Make it accessible from HTML inline onclick

// Helper to get array safely from localStorage
function getStoredUsers() {
    const stored = localStorage.getItem('signupData');
    let storedUsers = [];

    try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
            storedUsers = parsed;
        } else if (parsed && typeof parsed === 'object') {
            storedUsers = [parsed];
        }
    } catch (e) {
        storedUsers = [];
    }

    return storedUsers;
}

// Student Form Submit
document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const role = 'student';
    const fullName = document.getElementById('fullName').value;
    const userName = document.getElementById('user').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const grade = document.getElementById('student-grade').value;

    let storedUsers = getStoredUsers();

    const alreadyExists = storedUsers.some(user =>
        user.userName === userName || user.email === email
    );

    if (alreadyExists) {
        alert('Username or Email is already registered!');
        return;
    }

    const newUser = {
        role,
        fullName,
        userName,
        email,
        password,
        grade
    };

    storedUsers.push(newUser);
    localStorage.setItem('signupData', JSON.stringify(storedUsers)); // Only save once!

    alert('Student account created successfully!');
    window.location.href = "login.html";
});

// Teacher More Form Submit
document.getElementById('teacher-more')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const teacherName = document.getElementById('teacher-name').value;
    const teacherEmail = document.getElementById('teacher-email').value;
    const teacherUsername = document.getElementById('teacher-username').value;
    const teacherPassword = document.getElementById('teacher-password').value;
    const aboutMe = document.getElementById('about-me').value;
    const subject = document.getElementById('subject').value;

    const newTeacher = {
        role: 'teacher',
        fullName: teacherName,
        userName: teacherUsername,
        email: teacherEmail,
        password: teacherPassword,
        aboutMe,
        subject
    };

    let storedUsers = getStoredUsers();

    const alreadyExists = storedUsers.some(user =>
        user.userName === teacherUsername || user.email === teacherEmail
    );

    if (alreadyExists) {
        alert('Username or Email is already registered!');
        return;
    }

    storedUsers.push(newTeacher);
    localStorage.setItem('signupData', JSON.stringify(storedUsers));

    alert('Teacher account created successfully!');
    window.location.href = "login.html";
});