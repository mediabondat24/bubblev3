// /public/assets/js/login.js
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const phoneNumber = document.getElementById("whatsapp").value;

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ whatsapp: phoneNumber })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('authToken', data.token);
            window.location.href = 'userDashboard.html'; // Redirect to dashboard
        } else {
            alert("Invalid phone number!");
        }
    })
    .catch(error => console.error('Error:', error));
});
