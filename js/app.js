// Landing page animations
document.addEventListener('DOMContentLoaded', function() {
    // Scroll animations
    const fadeElems = document.querySelectorAll('.fade-in');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElems.forEach(elem => {
        elem.style.animationPlayState = 'paused';
        fadeObserver.observe(elem);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token && window.location.pathname.includes('index.html')) {
        // User is logged in, show dashboard link
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.innerHTML = `
                <a href="#features">Features</a>
                <a href="#testimonials">Success Stories</a>
                <a href="dashboard.html" class="btn-outline">Dashboard</a>
            `;
        }
    }
});