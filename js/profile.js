document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    // Load user data
    loadUserProfile();

    // Profile form submission
    document.getElementById('profileForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        await saveProfile();
    });

    // Business form submission
    document.getElementById('businessForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        await saveBusinessInfo();
    });
});

async function loadUserProfile() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    // Populate form fields
    document.getElementById('profileUserName').textContent = user.name || 'Founder';
    document.getElementById('profileName').textContent = user.name || 'Founder Name';
    document.getElementById('profileEmail').textContent = user.email || 'founder@example.com';
    
    document.getElementById('fullName').value = user.name || '';
    document.getElementById('userEmail').value = user.email || '';
}

async function saveProfile() {
    const token = localStorage.getItem('token');
    const profileData = {
        name: document.getElementById('fullName').value,
        email: document.getElementById('userEmail').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value,
        bio: document.getElementById('bio').value
    };

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Update local storage
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user.name = profileData.name;
        user.email = profileData.email;
        localStorage.setItem('user', JSON.stringify(user));
        
        // Update UI
        document.getElementById('profileUserName').textContent = user.name;
        document.getElementById('profileName').textContent = user.name;
        document.getElementById('profileEmail').textContent = user.email;
        
        alert('Profile updated successfully!');
    } catch (error) {
        alert('Error updating profile');
    }
}

async function saveBusinessInfo() {
    const businessData = {
        name: document.getElementById('businessName').value,
        industry: document.getElementById('industry').value,
        stage: document.getElementById('businessStage').value,
        market: document.getElementById('targetMarket').value,
        description: document.getElementById('businessDescription').value
    };

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert('Business information saved successfully!');
    } catch (error) {
        alert('Error saving business information');
    }
}