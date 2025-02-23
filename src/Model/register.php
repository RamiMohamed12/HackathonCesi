<?php
require 'db.php'; // Include your database connection file

try {
    // Auto-generate user details
    $name = "Admin";
    $email = "admin" . rand(1000, 9999) . "@example.com"; // Unique email each time
    $plain_password = "admin123"; // Change this as needed
    $hashed_password = password_hash($plain_password, PASSWORD_BCRYPT);
    $phone = strval(rand(1000000000, 9999999999)); // Random 10-digit phone number

    // Insert the user
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password, phone) VALUES (:name, :email, :password, :phone)");
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':password' => $hashed_password,
        ':phone' => $phone
    ]);

    echo "User created successfully: <br>";
    echo "Name: $name <br>";
    echo "Email: $email <br>";
    echo "Phone: $phone <br>";
    echo "Password (hashed): $hashed_password <br>";

} catch (PDOException $e) {
    die("Database error: " . $e->getMessage());
}
?>

