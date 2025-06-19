// TEMPORARY: Bypass login for testing (remove in production)
localStorage.setItem('isLoggedIn', 'true');
document.getElementById('authOverlay').style.display = 'none';
document.getElementById('mainApp').style.display = 'flex';

// Rest of your auth.js code (for reference)
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

    // Mock login (will override the bypass if used)
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        localStorage.setItem('isLoggedIn', 'true');
        authOverlay.style.display = 'none';
        mainApp.style.display = 'flex';
    });

    // Mock registration
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Account created! Please login.');
        loginTab.click();
    });

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
            <script>
document.addEventListener('DOMContentLoaded', function() {
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    loginTab.addEventListener('click', function() {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.style.display = '';
        registerForm.style.display = 'none';
    });

    registerTab.addEventListener('click', function() {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.style.display = '';
        loginForm.style.display = 'none';
    });
});
</script>
        }
    });
});
