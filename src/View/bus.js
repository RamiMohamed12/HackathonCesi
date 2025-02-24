// Get URL parameters
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param) ? decodeURIComponent(urlParams.get(param)) : "Not specified";
}

document.addEventListener("DOMContentLoaded", function() {
  // Populate ride details
  document.getElementById("startpoint").textContent = getQueryParam("startpoint");
  document.getElementById("destination").textContent = getQueryParam("destination");
  document.getElementById("dateTime").textContent = getQueryParam("dateTime");
  document.getElementById("price").textContent = getQueryParam("price");

  // Get modal elements
  const modal = document.getElementById("reservationModal");
  const seatNumberSpan = document.getElementById("seatNumber");
  const closeModalButton = document.getElementById("closeModal");

  // Handle seat confirmation
  document.querySelector(".confirm").addEventListener("click", function() {
    const selectedSeats = document.querySelectorAll('input[name="seat"]:checked');
    
    if (selectedSeats.length > 0) {
      // Gather all selected seat values and join them separated by commas
      const seats = Array.from(selectedSeats).map(seat => seat.value).join(', ');
      seatNumberSpan.textContent = seats;
      modal.style.display = "flex";
    } else {
      // If no seat is selected, alert the user
      alert("Please select at least one seat before confirming.");
    }
  });

  // Close modal when "OK" is clicked
  closeModalButton.addEventListener("click", function() {
    modal.style.display = "none"; // Hide modal
    window.location.href = "home.html"; // Redirect to home page
  });
});
