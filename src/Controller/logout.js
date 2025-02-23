document.getElementById("logout-btn").addEventListener("click", async function () {

    const logoutBtn = document.getElementById("logout-btn");
    logoutBtn.disabled = true; // Prevent multiple clicks

    try {
        const response = await fetch("../Model/logout.php", {
            method: "POST",
            credentials: "include" // Ensure cookies/session are sent
        });

        const data = await response.json();

        if (data.success) {
            alert("You have been logged out successfully!");
            window.location.href = "../View/login.html"; // Redirect to login page
        } else {
            alert("Logout failed. Please try again.");
            logoutBtn.disabled = false;
        }
    } catch (error) {
        console.error("Logout request failed:", error);
        alert("Something went wrong. Please try again.");
        logoutBtn.disabled = false;
    }
});