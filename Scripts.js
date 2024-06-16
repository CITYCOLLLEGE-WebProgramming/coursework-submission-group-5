// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    // Scroll animation for sections
    function reveal() {
        const reveals = document.querySelectorAll('.reveal');
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            } else {
                reveals[i].classList.remove('active');
            }
        }
    }

    window.addEventListener('scroll', reveal);

    // To check the scroll position on page load
    reveal();

    // Form submission handling
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get data from the form
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        // Send data to the server via fetch
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response Data:', data); // Log response for debugging
            if (data.success) {
                alert('Login successful');
            } else {
                alert('Login failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    });
});
