<?php 
    // Database connection configuration
    $host = "localhost";   
    $user = "root";
    $password = "rami2004";
    $db = "dbeco";

    // Create a DSN (Data Source Name) and establish the PDO connection
    try { 
        $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        ]); 

        // Removed echo statement to avoid unexpected output in API responses
        // echo "Connected to the $db database successfully!";
    } 
    // Display an error message if the connection fails
    catch (PDOException $e) {  
        die("Error: Can't connect to the database. " . $e->getMessage()); 
    } 
?>
