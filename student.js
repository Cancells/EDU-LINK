document.addEventListener('DOMContentLoaded', function() {
  // Initialize Lucide icons
  lucide.createIcons();

  // Sample student data (you would typically get this from a database)
  const studentName = "Ahmed Hassan";
  document.getElementById('student-name').textContent = `Welcome, ${studentName}`;

  // Theme handling (same as in landing.js)
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

  // Sample courses data (you would typically fetch this from an API)
  const courses = [
    {
      id: 1,
      title: "Mathematics: Algebra Fundamentals",
      image: "./imgs/math.jpg",
      teacher: "Dr. Sarah Johnson",
      description: "Master the core concepts of algebra with hands-on exercises and interactive lessons.",
      schedule: "Mon, Wed: 3:00 PM - 4:30 PM"
    },
    {
      id: 2,
      title: "Physics: Mechanics & Motion",
      image: "./imgs/physics.jpg",
      teacher: "Prof. David Chen",
      description: "Explore the fundamental principles of mechanics, forces, and motion in this comprehensive course.",
      schedule: "Tue, Thu: 2:00 PM - 3:30 PM"
    },
    {
      id: 3,
      title: "Biology: Human Systems",
      image: "./imgs/biology.jpg",
      teacher: "Dr. Emily Roberts",
      description: "Learn about human body systems, their functions, and how they work together to maintain health.",
      schedule: "Wed, Fri: 1:00 PM - 2:30 PM"
    },
    {
      id: 4,
      title: "English Literature",
      image: "./imgs/english.jpg",
      teacher: "Ms. Lisa Thompson",
      description: "Analyze classic and contemporary literature while developing critical thinking and writing skills.",
      schedule: "Mon, Thu: 10:00 AM - 11:30 AM"
    }
  ];

  // Function to populate courses
  function populateCourses() {
    const coursesContainer = document.getElementById('courses-container');
    coursesContainer.innerHTML = '';

    courses.forEach(course => {
      const courseCard = document.createElement('div');
      courseCard.className = 'card';
      courseCard.innerHTML = `
        <img src="${course.image}" class="card-img-top" alt="${course.title}">
        <div class="card-body">
          <h3 class="card-title">${course.title}</h3>
          <p class="card-text"><strong>Teacher:</strong> ${course.teacher}</p>
          <p class="card-text">${course.description}</p>
          <p class="card-text"><strong>Schedule:</strong> ${course.schedule}</p>
          <a href="#" class="btn-primary">Enroll Now</a>
        </div>
      `;
      coursesContainer.appendChild(courseCard);
    });
  }

  // Populate courses on page load
  populateCourses();

  // Handle grade selection
  const gradeSelect = document.getElementById('year');
  gradeSelect.addEventListener('change', function() {
    // In a real application, you would fetch courses specific to the selected grade
    console.log(`Selected grade: ${this.value}`);
    // For now, we'll just repopulate with the same courses
    populateCourses();
  });

  // Add functionality to cartoon helper (example)
  const cartoonHelper = document.querySelector('.cartoon-helper');
  cartoonHelper.addEventListener('click', function() {
    alert("Need help? Contact our support team at support@edulink.com");
  });
});