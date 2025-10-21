// Create animated background sparks (optional - remove if you prefer just the logo)
function createSparks() {
    const container = document.createElement('div');
    container.className = 'spark-container';
    container.id = 'sparks';
    document.body.appendChild(container);

    const sparkCount = 30; // Fewer sparks since we have logo background
    
    for (let i = 0; i < sparkCount; i++) {
        const spark = document.createElement('div');
        spark.className = 'spark';
        
        // Random position
        spark.style.left = Math.random() * 100 + 'vw';
        spark.style.top = Math.random() * 100 + 'vh';
        
        // Random size
        const size = Math.random() * 3 + 1;
        spark.style.width = size + 'px';
        spark.style.height = size + 'px';
        
        // Random delay and duration
        spark.style.animationDelay = Math.random() * 4 + 's';
        spark.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        // Random color
        const colors = ['var(--spark-1)', 'var(--spark-2)', 'var(--spark-3)'];
        spark.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        container.appendChild(spark);
    }
}

// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create subtle sparks (optional)
    createSparks();

    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId + 'Form').classList.add('active');
        });
    });

    // Check URL for action parameter
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action');
    if (action === 'signup') {
        document.querySelector('[data-tab="signup"]').click();
    }

    // Login form submission
    document.getElementById('loginForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                window.location.href = 'dashboard.html';
            } else {
                alert(data.error || 'Login failed');
            }
        } catch (error) {
            alert('Server error. Please try again later.');
        }
    });

    // Signup form submission
    document.getElementById('signupForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirm').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                window.location.href = 'dashboard.html';
            } else {
                alert(data.error || 'Registration failed');
            }
        } catch (error) {
            alert('Server error. Please try again later.');
        }
    });
});