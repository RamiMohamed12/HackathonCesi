<?php
session_start();
require 'auth.php';

// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];

    try {
        $user = loginUser($pdo, $email, $password);

        if ($user) {
            $_SESSION["user"] = $user;
            $_SESSION["role"] = $user['user_type'];

            // Default redirect: since there is no separate admin table, all users are redirected as students.
            $redirect = '/View/home.html';

            echo json_encode([
                "success"  => true,
                "redirect" => $redirect,
                "message"  => "Login successful"
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
