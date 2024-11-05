// Get DOM elements
const authForm = document.getElementById('auth-form');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const toggleLink = document.getElementById('toggle-link');
const forgotPasswordLink = document.getElementById('forgot-password-link');
const cancelBtn = document.getElementById('cancel-btn');

let isLogin = true;  // Default to login mode
let isForgotPassword = false;  // Default to not in forgot password mode

// Toggle between Login and Sign Up
toggleLink.addEventListener('click', () => {
    if (isLogin) {
        formTitle.textContent = 'Sign Up';
        submitBtn.textContent = 'Sign Up';
        toggleLink.textContent = 'Already have an account? Login';
        forgotPasswordLink.style.display = 'none';  // Hide forgot password link
    } else {
        formTitle.textContent = 'Login';
        submitBtn.textContent = 'Login';
        toggleLink.textContent = "Don't have an account? Sign Up";
        forgotPasswordLink.style.display = 'block';  // Show forgot password link
    }
    isLogin = !isLogin;  // Switch mode
});

// Handle forgot password mode
forgotPasswordLink.addEventListener('click', () => {
    formTitle.textContent = 'Reset Password';
    submitBtn.textContent = 'Send Reset Link';
    forgotPasswordLink.style.display = 'none';  // Hide forgot password link
    toggleLink.style.display = 'none';  // Hide toggle link
    isForgotPassword = true;
});

// Cancel button functionality - navigate to the home page
cancelBtn.addEventListener('click', () => {
    window.location.href = 'index.html';  // Navigate to home page
});

// Form submission handler
authForm.addEventListener('submit', async (event) => {
    event.preventDefault();  // Prevent default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let endpoint;
    if (isForgotPassword) {
        endpoint = '/forgot-password';  // Reset password route
    } else {
        endpoint = isLogin ? '/signin' : '/signup';  // Login or Sign Up
    }

    // Send data to the server
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),  // Send email and password
    });

    const data = await response.json();  // Parse JSON response

    // Show success or error message
    if (data.success) {
        alert(data.message);
        
        if (isLogin) {
            window.location.href = 'dashboard.html';  // Redirect to dashboard after login
        } else if (isForgotPassword) {
            isForgotPassword = false;
            window.location.reload();  // Reload page to return to login
        }
    } else {
        alert('Error: ' + data.message);
    }
});
