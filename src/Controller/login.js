document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    if (!loginForm) {
        console.error("Login form element not found.");
        return;
    }

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const formData = new URLSearchParams();
        formData.append('email', email);
        formData.append('password', password);

        fetch("/Model/login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData.toString()
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = data.redirect;
            } else {
                document.getElementById("error-message").innerText = data.message;
            }
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("error-message").innerText = "An error occurred during login.";
        });
    });
});
