document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form default submission

        // Get form values
        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();
        let phone = document.getElementById("phone").value.trim();

        // Client-side validation
        if (!name || !email || !password || !phone) {
            alert("All fields are required!");
            return;
        }

        // Additional client-side email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address!");
            return;
        }

        // Phone number basic validation (10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            alert("Please enter a valid 10-digit phone number!");
            return;
        }

        // Create FormData object
        let formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("phone", phone);

        // Send data to PHP
        fetch("../Model/register.php", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === "success") {
                alert("Registration successful!");
                window.location.href = "../View/login.html"; // Adjusted path assuming structure
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred during registration. Please try again.");
        });
    });
});
