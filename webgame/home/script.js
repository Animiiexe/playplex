document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggle-btn');
    const navbar = document.querySelector('.navbar');

    toggleBtn.addEventListener('click', function() {
        navbar.classList.toggle('active');
    });
});
