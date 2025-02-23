document.getElementById("login-btn").addEventListener("click", async function () {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const messageBox = document.getElementById("message");

    if (!email || !password) {
        messageBox.style.color = "red";
        messageBox.innerText = "Please fill in all fields.";
        return;
    }

    document.getElementById("login-btn").disabled = true;

    try {
        const response = await fetch("../Model/login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        });

        const data = await response.json();
        
        if (data.success) {
            messageBox.style.color = "green";
            messageBox.innerText = "Logged in successfully. Redirecting...";
            setTimeout(() => {
                window.location.href = "../View/home.html"; // Redirect to dashboard
            }, 1500);
        } else {
            messageBox.style.color = "red";
            messageBox.innerText = data.error;
        }
    } catch (error) {
        console.error("Login request failed:", error);
        messageBox.style.color = "red";
        messageBox.innerText = "Something went wrong. Please try again.";
    } finally {
        document.getElementById("login-btn").disabled = false;
    }
});