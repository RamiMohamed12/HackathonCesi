document.querySelector(".loginbutton").addEventListener("click", async function () {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    
    // Create or select a message box dynamically
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

    // Disable the button to prevent multiple clicks
    const loginBtn = document.querySelector(".loginbutton");
    loginBtn.disabled = true;

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
            messageBox.innerText = "Login successful! Redirecting...";
            setTimeout(() => {
                window.location.href = "home.html";
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
        loginBtn.disabled = false;
    }
});