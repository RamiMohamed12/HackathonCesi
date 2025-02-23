<?php
require 'db.php';
session_start(); // Start the session

function loginUser($pdo, $email, $password) {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
    $stmt->execute(['email' => $email]);                                         
    $user = $stmt->fetch();                                                      

    if ($user && password_verify($password, $user['password'])) {                
        $_SESSION['user_id'] = $user['id'];                                      
        header('Location: home.html');
        exit;
    } else {
        echo 'Incorrect email or password';                                       
    }
}

