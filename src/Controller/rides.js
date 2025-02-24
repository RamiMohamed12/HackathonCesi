document.addEventListener("DOMContentLoaded", function () {
    fetch("/Model/getRides.php", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        const ridesContainer = document.getElementById("rides-container");
        ridesContainer.innerHTML = ""; // Clear existing content

        if (data.success) {
            data.rides.forEach(ride => {
                // Determine the icon class based on ride_type
                let iconClass;
                switch (ride.ride_type) {
                    case "Bus":
                        iconClass = "fa-bus";
                        break;
                    case "Car":
                        iconClass = "fa-car";
                        break;
                    case "Metro":
                        iconClass = "fa-subway"; // using subway as an icon for metro
                        break;
                    case "Train":
                        iconClass = "fa-train";
                        break;
                    default:
                        iconClass = "fa-road";
                }

                // Create a new ride card element
                const card = document.createElement("div");
                card.className = "stage-card";
                card.innerHTML = `
                    <h3>
                        <i class="fa-solid ${iconClass}"></i>
                        ${ride.ride_type} Trip
                    </h3>
                    <div class="stage-detail">
                        <i class="fas fa-building" style="color: var(--sage);"></i>
                        <span>${ride.startpoint}</span>
                    </div>
                    <div class="stage-detail">
                        <i class="fas fa-map-marker-alt" style="color: var(--golden);"></i>
                        <span>${ride.destination}</span>
                    </div>
                    <div class="stage-detail">
                        <i class="fas fa-clock" style="color: var(--sage);"></i>
                        <span>${ride.dateTime}</span>
                    </div>
                    <div class="stage-detail">
                        <i class="fas fa-euro-sign" style="color: var(--sage);"></i>
                        <span>${ride.price} DA</span>
                    </div>
                    <div class="postuler">
                        <button class="bouton-postuler">Reserve</button>
                    </div>
                `;
                ridesContainer.appendChild(card);
            });
        } else {
            console.error("Error retrieving rides:", data.message);
            ridesContainer.innerHTML = "<p>There was an error loading the rides.</p>";
        }
    })
    .catch(error => {
        console.error("Error fetching rides:", error);
        const ridesContainer = document.getElementById("rides-container");
        ridesContainer.innerHTML = "<p>Unable to load rides at this time.</p>";
    });
});
