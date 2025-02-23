<?php
require 'db.php';
session_start();

header('Content-Type: application/json'); // ✅ Ensure JSON output

function loginUser($pdo, $email, $password) {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];

        // ✅ Return JSON response instead of redirecting
        echo json_encode([
            "success" => true,
            "message" => "Login successful"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Incorrect email or password"
        ]);
    }
}
?>