document.getElementById("login-btn").addEventListener("click", async function () {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const messageBox = document.getElementById("message");

    if (!email || !password) {
        messageBox.innerText = "Please fill in all fields.";
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        messageBox.innerText = data.message;

        if (data.success) {
            setTimeout(() => (window.location.href = "home.html"), 1500);
        }
    } catch (error) {
        console.error("Login failed:", error);
        messageBox.innerText = "Something went wrong.";
    }
});
