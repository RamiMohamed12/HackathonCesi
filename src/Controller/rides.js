document.addEventListener("DOMContentLoaded", function () {
    const ridesContainer = document.getElementById("rides-container");
    const searchInput = document.querySelector(".search-box input");
    const searchButton = document.querySelector(".search-box button");
    const filterButtons = document.querySelectorAll(".search-tabs button, .featured-tags .tag");

    function fetchRides(query = "", filter = "All") {
        fetch(`/Model/getRides.php?query=${encodeURIComponent(query)}&filter=${encodeURIComponent(filter)}`)
            .then(response => response.json())
            .then(data => {
                ridesContainer.innerHTML = "";
                if (data.success && data.rides.length > 0) {
                    data.rides.forEach(ride => {
                        let iconClass = getRideIcon(ride.ride_type);
                        const card = document.createElement("div");
                        card.className = "stage-card";
                        card.dataset.rideType = ride.ride_type.trim();
                        card.dataset.startpoint = ride.startpoint;
                        card.dataset.destination = ride.destination;
                        card.dataset.dateTime = ride.dateTime;
                        card.dataset.price = ride.price;
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
        switch (rideType.toLowerCase()) {
            case "bus": return "fa-bus";
            case "car": return "fa-car";
            case "metro": return "fa-subway";
            case "train": return "fa-train";
            default: return "fa-road";
        }
    }

    // Search by button click
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        fetchRides(query);
    });

    // Search by Enter key
    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            fetchRides(searchInput.value.trim());
        }
    });

    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            const filterType = button.textContent.trim();
            fetchRides(searchInput.value.trim(), filterType);
        });
    });

    // Handle Reserve button clicks
    ridesContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("bouton-postuler")) {
            const card = event.target.closest(".stage-card");
            if (card) {
                const rideType = card.dataset.rideType.toLowerCase();
                if (rideType === "bus") {
                    const startpoint = card.dataset.startpoint;
                    const destination = card.dataset.destination;
                    const dateTime = card.dataset.dateTime;
                    const price = card.dataset.price;
                    const url = `bus.html?startpoint=${encodeURIComponent(startpoint)}&destination=${encodeURIComponent(destination)}&dateTime=${encodeURIComponent(dateTime)}&price=${encodeURIComponent(price)}`;
                    window.location.href = url;
                } else if (rideType === "car") {
                    window.location.href = "car.html";
                } else if (rideType === "train") {
                    window.location.href = "train.html";
                }
            }
        }
    });

    // Load rides on page load
    fetchRides();
});
