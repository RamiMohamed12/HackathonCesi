<?php
require 'db.php'; // Include your PDO database connection file

header('Content-Type: application/json');

// Check if the request is a POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $phone = trim($_POST['phone']);

    // Validate fields
    if (empty($name) || empty($email) || empty($password) || empty($phone)) {
        echo json_encode(["status" => "error", "message" => "All fields are required."]);
        exit();
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "error", "message" => "Invalid email format."]);
        exit();
    }

    // Validate phone (assuming 10-digit format)
    if (!preg_match('/^\d{10}$/', $phone)) {
        echo json_encode(["status" => "error", "message" => "Invalid phone number."]);
        exit();
    }

    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    // Check if email already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $existing_user = $stmt->fetch();

    if ($existing_user) {
        echo json_encode(["status" => "error", "message" => "Email already registered."]);
        exit();
    }

    // Insert new user
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)");
    $success = $stmt->execute([$name, $email, $hashed_password, $phone]);

    if ($success) {
        echo json_encode(["status" => "success", "message" => "Registration successful."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Registration failed."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request."]);
}
?>
