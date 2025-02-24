document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.querySelector(".logout-btn");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            fetch("../Model/logout.php", {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = "../View/login.html";
                } else {
                    alert("Logout failed. Please try again.");
                }
            })
            .catch(error => console.error("Error:", error));
        });
    }
});
