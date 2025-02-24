document.addEventListener("DOMContentLoaded", function () {
    const ridesContainer = document.getElementById("rides-container");
    const searchInput = document.querySelector(".search-box input");
    const searchButton = document.querySelector(".search-box button");
    const filterButtons = document.querySelectorAll(".search-tabs button, .featured-tags .tag");

    function fetchRides(query = "", filter = "All") {
        fetch(`/Model/getRides.php?query=${encodeURIComponent(query)}&filter=${encodeURIComponent(filter)}`)
            .then(response => response.json())
            .then(data => {
                ridesContainer.innerHTML = ""; // Clear previous results

                if (data.success && data.rides.length > 0) {
                    data.rides.forEach(ride => {
                        let iconClass = getRideIcon(ride.ride_type);

                        // Create the card and set the ride id as a data attribute
                        const card = document.createElement("div");
                        card.className = "stage-card";
                        card.setAttribute("data-ride-id", ride.id);
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
                    ridesContainer.innerHTML = "<p>No matching rides found.</p>";
                }
            })
            .catch(error => {
                console.error("Error fetching rides:", error);
                ridesContainer.innerHTML = "<p>Unable to load rides at this time.</p>";
            });
    }

    function getRideIcon(rideType) {
        switch (rideType) {
            case "Bus": return "fa-bus";
            case "Car": return "fa-car";
            case "Metro": return "fa-subway";
            case "Train": return "fa-train";
            default: return "fa-road";
        }
    }

    // Search by input text
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        fetchRides(query);
    });

    // Allow "Enter" key for search
    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            fetchRides(searchInput.value.trim());
        }
    });

    // Handle filter buttons (All, Recent, Transport types)
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            const filterType = button.textContent.trim();
            fetchRides(searchInput.value.trim(), filterType);
        });
    });

    // Event delegation for Reserve buttons
    ridesContainer.addEventListener("click", function (e) {
        if (e.target && e.target.classList.contains("bouton-postuler")) {
            const card = e.target.closest(".stage-card");
            const rideId = card.getAttribute("data-ride-id");
            
            // Prompt user for number of seats to book (you can customize this as needed)
            const bookedSeats = prompt("Enter the number of seats you want to reserve:");
            if (!bookedSeats || isNaN(bookedSeats) || bookedSeats <= 0) {
                alert("Invalid number of seats.");
                return;
            }

            // In a real app, user_id should come from session/authentication; here it's hard-coded as 1
            const user_id = 1;

            // Prepare form data
            const formData = new FormData();
            formData.append("user_id", user_id);
            formData.append("ride_id", rideId);
            formData.append("booked_seats", bookedSeats);

            // Send POST request to booking.php
            fetch("booking.php", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Booking successful!");
                    // Optionally, update the ride's available seats in the UI or refetch rides.
                    fetchRides(searchInput.value.trim());
                } else {
                    alert("Booking failed: " + data.message);
                }
            })
            .catch(error => {
                console.error("Error processing booking:", error);
                alert("An error occurred while booking.");
            });
        }
    });

    // Load all rides initially
    fetchRides();
});
