document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    // Display user info
    if (user.name) {
        document.getElementById('userName').textContent = user.name;
        document.querySelector('.user-name').textContent = user.name;
    }

    // Logout functionality
    document.querySelector('.logout').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    });

    // Load user profile data
    loadUserProfile();
});

async function loadUserProfile() {
    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch('http://localhost:3000/api/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const profile = await response.json();
            // Update dashboard with profile data
            console.log('Profile loaded:', profile);
        }
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}