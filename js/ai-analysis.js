document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    // Analysis card clicks
    document.querySelectorAll('.analysis-card .btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const analysisType = this.closest('.analysis-card').dataset.analysis;
            startAnalysis(analysisType);
        });
    });

    // Quick analysis form
    document.getElementById('quickAnalysisForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        await performQuickAnalysis();
    });
});

async function startAnalysis(type) {
    alert(`Starting ${type.replace('-', ' ')} analysis...`);
    // Implementation would connect to your AI backend
}

async function performQuickAnalysis() {
    const form = document.getElementById('quickAnalysisForm');
    const button = form.querySelector('button');
    const spinner = button.querySelector('.loading-spinner');
    
    // Show loading state
    button.disabled = true;
    spinner.style.display = 'inline-block';
    button.innerHTML = 'Analyzing...';
    
    const analysisData = {
        idea: document.getElementById('businessIdea').value,
        market: document.getElementById('analysisMarket').value,
        differentiator: document.getElementById('differentiator').value,
        revenueModel: document.getElementById('revenueModel').value
    };

    try {
        // Simulate AI analysis
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Show results
        alert('Analysis complete! Check your dashboard for detailed insights.');
        form.reset();
        
    } catch (error) {
        alert('Analysis failed. Please try again.');
    } finally {
        // Reset button
        button.disabled = false;
        spinner.style.display = 'none';
        button.innerHTML = 'Analyze My Business';
    }
}