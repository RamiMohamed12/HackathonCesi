<?php
session_start();
require 'db.php';

// Enable error reporting for debugging (REMOVE in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// ✅ Set JSON response type
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST["email"] ?? '');
    $password = trim($_POST["password"] ?? '');

    try {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION["user_id"] = $user["id"];

            // ✅ Send JSON response instead of redirect
            echo json_encode([
                "success" => true,
                "message" => "Login successful"
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Invalid credentials"
            ]);
        }
    } catch (PDOException $e) {
        error_log("Login error: " . $e->getMessage());
        echo json_encode([
            "success" => false,
            "message" => "Database error occurred"
        ]);
    }
    exit;
}
?>