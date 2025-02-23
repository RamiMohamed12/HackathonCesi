<?php
require 'db.php';

function loginUser($pdo, $email, $password) {
    // Query the existing "users" table
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Check password and, when verified, assign a default role since no role field exists.
    if ($user && password_verify($password, $user['password'])) {
        $user['user_type'] = 'student';
        return $user;
    }
    return false;
}
?>
