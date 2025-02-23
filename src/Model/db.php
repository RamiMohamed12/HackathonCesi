<?php 

    // Database connection
    $host = "localhost";   
    $user = "root";
    $password = "rami2004";
    $db = "dbeco";

    // Create a DSN (Data Source Name)
    try { 
        $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        ]); 
     

    // Display a message if the connection is successful

        echo "Connected to the $db database successfully!";

    } 
    
    // Display an error message if the connection fails
    catch (PDOException $e) {  
        
        die("Error: Can't connect to the database. " . $e->getMessage()); 
    
    } 
?>

