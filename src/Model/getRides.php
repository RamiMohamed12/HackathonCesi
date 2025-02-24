<?php
header("Content-Type: application/json");

// Include the database connection
require_once "db.php";

try {
    // Prepare the query to fetch all rides
    $stmt = $pdo->prepare("SELECT id, startpoint, destination, dateTime, availableSeats, price, ride_type, phone FROM rides ORDER BY dateTime ASC");
    $stmt->execute();

    // Fetch all results as an associative array
    $rides = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Check if rides are available
    if ($rides) {
        echo json_encode(["success" => true, "rides" => $rides]);
    } else {
        echo json_encode(["success" => false, "message" => "No rides available"]);
    }

} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
?>

