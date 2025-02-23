document.querySelector(".loginbutton").addEventListener("click", async function () {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    
    let messageBox = document.getElementById("message");
    if (!messageBox) {
        messageBox = document.createElement("p");
        messageBox.id = "message";
        document.querySelector(".login").appendChild(messageBox);
    }

    if (!email || !password) {
        messageBox.style.color = "red";
        messageBox.innerText = "Please fill in all fields.";
        return;
    }

    const loginBtn = document.querySelector(".loginbutton");
    loginBtn.disabled = true;

    try {
        const response = await fetch("../Model/login.php", { // ✅ Correct path
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        });

        const data = await response.json();

        if (data.success) {
            messageBox.style.color = "green";
            messageBox.innerText = data.message + " Redirecting...";
            setTimeout(() => {
                window.location.href = "../View/home.html"; // ✅ Redirect after login
            }, 1500);
        } else {
            messageBox.style.color = "red";
            messageBox.innerText = data.message;
        }
    } catch (error) {
        console.error("Login request failed:", error);
        messageBox.style.color = "red";
        messageBox.innerText = "Something went wrong. Please try again.";
    } finally {
        loginBtn.disabled = false;
    }
});