document.addEventListener('DOMContentLoaded', function() {
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const authOverlay = document.getElementById('authOverlay');
    const mainApp = document.getElementById('mainApp');
    const logoutBtn = document.getElementById('logoutBtn');
    const themeToggle = document.getElementById('themeToggle');

    // Tab switching
    loginTab.addEventListener('click', function() {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    });

    registerTab.addEventListener('click', function() {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
    });

    // Mock login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real app, you would validate credentials with a server
        authOverlay.style.display = 'none';
        mainApp.style.display = 'flex';
        
        // Store user session
        localStorage.setItem('isLoggedIn', 'true');
    });

    // Mock registration
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real app, you would send data to a server
        alert('Account created! Please login.');
        loginTab.click();
    });

    // Check if user is already logged in
    if (localStorage.getItem('isLoggedIn')) {
        authOverlay.style.display = 'none';
        mainApp.style.display = 'flex';
    }

    // Logout
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        authOverlay.style.display = 'flex';
        mainApp.style.display = 'none';
    });

    // Theme toggle
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('light-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Matter';
        }
    });

    // Navigation
    const navItems = document.querySelectorAll('.main-nav li');
    const contentSections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            
            // Update active nav item
            navItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding section
            contentSections.forEach(content => content.classList.remove('active'));
            document.getElementById(section).classList.add('active');
        });
    });
});
