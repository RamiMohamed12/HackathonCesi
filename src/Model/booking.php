<?php
header("Content-Type: application/json");
require_once "db.php";

// Allow only POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
    exit;
}

// Retrieve and validate input
$user_id = isset($_POST['user_id']) ? intval($_POST['user_id']) : 0;
$ride_id = isset($_POST['ride_id']) ? intval($_POST['ride_id']) : 0;
$booked_seats = isset($_POST['booked_seats']) ? intval($_POST['booked_seats']) : 0;

if ($user_id <= 0 || $ride_id <= 0 || $booked_seats <= 0) {
    echo json_encode(["success" => false, "message" => "Invalid input parameters."]);
    exit;
}

try {
    // Start transaction
    $pdo->beginTransaction();

    // Lock the ride row to safely check and update available seats
    $stmt = $pdo->prepare("SELECT availableSeats FROM rides WHERE id = :ride_id FOR UPDATE");
    $stmt->bindValue(":ride_id", $ride_id, PDO::PARAM_INT);
    $stmt->execute();
    $ride = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$ride) {
        echo json_encode(["success" => false, "message" => "Ride not found."]);
        $pdo->rollBack();
        exit;
    }

    if ($ride['availableSeats'] < $booked_seats) {
        echo json_encode(["success" => false, "message" => "Not enough available seats."]);
        $pdo->rollBack();
        exit;
    }

    // Insert the booking into the bookings table
    $stmt = $pdo->prepare("INSERT INTO bookings (user_id, ride_id, booked_seats) VALUES (:user_id, :ride_id, :booked_seats)");
    $stmt->bindValue(":user_id", $user_id, PDO::PARAM_INT);
    $stmt->bindValue(":ride_id", $ride_id, PDO::PARAM_INT);
    $stmt->bindValue(":booked_seats", $booked_seats, PDO::PARAM_INT);
    $stmt->execute();

    // Update the available seats in the rides table
    $stmt = $pdo->prepare("UPDATE rides SET availableSeats = availableSeats - :booked_seats WHERE id = :ride_id");
    $stmt->bindValue(":booked_seats", $booked_seats, PDO::PARAM_INT);
    $stmt->bindValue(":ride_id", $ride_id, PDO::PARAM_INT);
    $stmt->execute();

    // Commit transaction
    $pdo->commit();

    echo json_encode(["success" => true, "message" => "Booking successful."]);
    
} catch (PDOException $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
?>
