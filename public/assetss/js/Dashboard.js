// /public/assets/js/dashboard.js
const token = localStorage.getItem('authToken');
if (!token) {
    window.location.href = 'page-login.html'; // Redirect to login page if no token
} else {
    fetch('/api/dashboard', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.user) {
            document.getElementById('userInfo').innerHTML = `
                <p><strong>Name:</strong> ${data.user.name}</p>
                <p><strong>Phone:</strong> ${data.user.whatsapp}</p>
                <p><strong>Client Type:</strong> ${data.user.client}</p>
            `;
        } else {
            alert("Invalid token, please log in again!");
            window.location.href = 'page-login.html'; // Redirect if JWT is invalid
        }
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById("logoutBtn").addEventListener("click", function() {
    localStorage.removeItem('authToken');
    window.location.href = 'page-login.html'; // Redirect to login
});
