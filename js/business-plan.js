document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    initializeBusinessPlan();
});

function initializeBusinessPlan() {
    // Initialize steps
    const steps = document.querySelectorAll('.step');
    const sections = document.querySelectorAll('.plan-section');
    let currentStep = 0;

    // Navigation functions
    document.getElementById('nextSection').addEventListener('click', nextSection);
    document.getElementById('prevSection').addEventListener('click', prevSection);
    document.getElementById('generatePlan').addEventListener('click', generateAIPlan);

    // Form real-time updates
    setupFormListeners();

    function nextSection() {
        if (currentStep < steps.length - 1) {
            // Validate current section
            if (validateCurrentSection()) {
                steps[currentStep].classList.remove('active');
                sections[currentStep].classList.remove('active');
                
                currentStep++;
                
                steps[currentStep].classList.add('active');
                sections[currentStep].classList.add('active');
                updateNavigation();
                updatePreview();
            }
        }
    }

    function prevSection() {
        if (currentStep > 0) {
            steps[currentStep].classList.remove('active');
            sections[currentStep].classList.remove('active');
            
            currentStep--;
            
            steps[currentStep].classList.add('active');
            sections[currentStep].classList.add('active');
            updateNavigation();
        }
    }

    function updateNavigation() {
        const prevBtn = document.getElementById('prevSection');
        const nextBtn = document.getElementById('nextSection');
        const downloadBtn = document.getElementById('downloadPlan');

        // Update previous button
        prevBtn.style.display = currentStep === 0 ? 'none' : 'inline-block';

        // Update next button text
        if (currentStep === steps.length - 1) {
            nextBtn.textContent = 'Complete Plan';
            nextBtn.classList.add('btn-success');
            downloadBtn.style.display = 'inline-block';
        } else {
            nextBtn.textContent = 'Next Section';
            nextBtn.classList.remove('btn-success');
            downloadBtn.style.display = 'none';
        }
    }

    function validateCurrentSection() {
        const currentSection = sections[currentStep];
        const requiredInputs = currentSection.querySelectorAll('input[required], textarea[required], select[required]');
        
        for (let input of requiredInputs) {
            if (!input.value.trim()) {
                showValidationError(input, 'This field is required');
                return false;
            }
        }
        return true;
    }

    function showValidationError(input, message) {
        // Remove existing error
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add error styling
        input.style.borderColor = '#ef4444';
        
        // Create error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = '#ef4444';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '0.5rem';
        errorElement.textContent = message;
        
        input.parentNode.appendChild(errorElement);

        // Scroll to error
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        input.focus();
    }

    function setupFormListeners() {
        // Real-time input validation
        document.querySelectorAll('#businessPlanForm input, #businessPlanForm textarea, #businessPlanForm select').forEach(input => {
            input.addEventListener('input', function() {
                // Clear error when user starts typing
                if (this.style.borderColor === 'rgb(239, 68, 68)') {
                    this.style.borderColor = '';
                    const error = this.parentNode.querySelector('.error-message');
                    if (error) error.remove();
                }
                
                // Update preview in real-time
                updatePreview();
            });
        });

        // Auto-save every 10 seconds
        setInterval(saveDraft, 10000);
    }

    function updatePreview() {
        const businessName = document.getElementById('planBusinessName').value;
        const mission = document.getElementById('missionStatement').value;
        const description = document.getElementById('businessDescription').value;
        const businessType = document.getElementById('businessType').value;

        // Update executive summary preview
        const executivePreview = document.getElementById('executivePreview');
        if (businessName || mission || description) {
            executivePreview.innerHTML = `
                ${businessName ? `<h4>${businessName}</h4>` : ''}
                ${mission ? `<p><strong>Mission:</strong> ${mission}</p>` : ''}
                ${description ? `<p>${description}</p>` : ''}
                ${businessType ? `<p><strong>Business Type:</strong> ${businessType}</p>` : ''}
            `;
        }

        // Update metrics based on inputs (simulated AI analysis)
        updateMetrics();
    }

    function updateMetrics() {
        // Simulate AI analysis based on form inputs
        const businessName = document.getElementById('planBusinessName').value;
        const description = document.getElementById('businessDescription').value;
        
        // Simple scoring logic (in real app, this would call AI API)
        let marketSize = 'Small';
        let growthPotential = 'Medium';
        let competitionLevel = 'High';
        let riskLevel = 'Medium';

        if (description.length > 100) {
            marketSize = 'Large';
            growthPotential = 'High';
        }

        if (businessName.includes('Tech') || businessName.includes('AI')) {
            competitionLevel = 'Very High';
            riskLevel = 'High';
        }

        if (description.includes('sustainable') || description.includes('eco')) {
            growthPotential = 'Very High';
            riskLevel = 'Low';
        }

        // Update metric displays
        document.getElementById('marketSize').textContent = marketSize;
        document.getElementById('growthPotential').textContent = growthPotential;
        document.getElementById('competitionLevel').textContent = competitionLevel;
        document.getElementById('riskLevel').textContent = riskLevel;
    }

    async function generateAIPlan() {
        const button = document.getElementById('generatePlan');
        const originalText = button.innerHTML;
        
        try {
            // Show loading state
            button.disabled = true;
            button.innerHTML = '✨ AI is generating your plan...';

            // Collect form data
            const formData = {
                businessName: document.getElementById('planBusinessName').value,
                mission: document.getElementById('missionStatement').value,
                description: document.getElementById('businessDescription').value,
                businessType: document.getElementById('businessType').value,
                funding: document.getElementById('fundingSought').value
            };

            // Simulate AI API call (replace with actual API call)
            const aiPlan = await simulateAIPlanGeneration(formData);
            
            // Populate the form with AI suggestions
            populateAISuggestions(aiPlan);
            
            // Show success message
            showNotification('AI plan generated successfully!', 'success');
            
        } catch (error) {
            console.error('AI plan generation failed:', error);
            showNotification('Failed to generate AI plan. Please try again.', 'error');
        } finally {
            // Reset button
            button.disabled = false;
            button.innerHTML = originalText;
        }
    }

    async function simulateAIPlanGeneration(formData) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Mock AI response (in real app, this would come from your backend)
        return {
            mission: `${formData.businessName} aims to revolutionize the ${formData.businessType} industry through innovative solutions and customer-centric approach.`,
            description: `Based on your input, ${formData.businessName} shows strong potential in the current market. The business focuses on delivering exceptional value through [AI-generated content based on business type].`,
            marketAnalysis: `The target market for ${formData.businessType} shows significant growth potential with an estimated 15% annual growth rate.`,
            financialProjections: `Conservative estimates project $50,000 in first-year revenue with break-even expected within 18 months.`
        };
    }

    function populateAISuggestions(aiPlan) {
        // Populate mission statement if empty
        const missionField = document.getElementById('missionStatement');
        if (!missionField.value) {
            missionField.value = aiPlan.mission;
        }

        // Populate business description if empty
        const descField = document.getElementById('businessDescription');
        if (!descField.value) {
            descField.value = aiPlan.description;
        }

        // Update preview
        updatePreview();
    }

    function saveDraft() {
        const formData = new FormData(document.getElementById('businessPlanForm'));
        const draftData = {};
        
        for (let [key, value] of formData.entries()) {
            draftData[key] = value;
        }
        
        // Save to localStorage (in real app, save to backend)
        localStorage.setItem('businessPlanDraft', JSON.stringify(draftData));
        console.log('Draft saved automatically');
    }

    function loadDraft() {
        const draftData = localStorage.getItem('businessPlanDraft');
        if (draftData) {
            const data = JSON.parse(draftData);
            
            // Populate form fields
            for (let [key, value] of Object.entries(data)) {
                const field = document.getElementById(key);
                if (field) {
                    field.value = value;
                }
            }
            
            updatePreview();
            showNotification('Draft loaded successfully!', 'success');
        }
    }

    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `;

        // Set background based on type
        if (type === 'success') {
            notification.style.background = 'linear-gradient(45deg, #10b981, #059669)';
        } else if (type === 'error') {
            notification.style.background = 'linear-gradient(45deg, #ef4444, #dc2626)';
        } else {
            notification.style.background = 'var(--gradient)';
        }

        notification.textContent = message;
        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // Add CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Load draft on page load
    loadDraft();

    // Initialize preview
    updatePreview();
    updateNavigation();
}

// Export for testing (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initializeBusinessPlan };
}