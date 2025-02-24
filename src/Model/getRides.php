<?php
header("Content-Type: application/json");
require_once "db.php";

$searchQuery = isset($_GET['query']) ? trim($_GET['query']) : "";
$filterType = isset($_GET['filter']) ? trim($_GET['filter']) : "";

// Start with base query
$sql = "SELECT id, startpoint, destination, dateTime, availableSeats, price, ride_type, phone FROM rides";

// Apply filters if searchQuery is provided
if (!empty($searchQuery)) {
    $sql .= " WHERE destination LIKE :query OR startpoint LIKE :query OR dateTime LIKE :query OR price LIKE :query";
}

if (!empty($filterType) && $filterType !== "All") {
    $sql .= empty($searchQuery) ? " WHERE" : " AND";
    $sql .= " ride_type = :filterType";
}

$sql .= " ORDER BY dateTime ASC";

try {
    $stmt = $pdo->prepare($sql);
    
    if (!empty($searchQuery)) {
        $stmt->bindValue(":query", "%$searchQuery%", PDO::PARAM_STR);
    }
    if (!empty($filterType) && $filterType !== "All") {
        $stmt->bindValue(":filterType", $filterType, PDO::PARAM_STR);
    }

    $stmt->execute();
    $rides = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["success" => true, "rides" => $rides]);

} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
?>

