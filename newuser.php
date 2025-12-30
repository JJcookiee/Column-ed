<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') { 
    $username = htmlspecialchars($_POST['user'] ?? '');
    $password = htmlspecialchars($_POST['password'] ?? '');
    $repeat = htmlspecialchars($_POST['repeat'] ??'');
    $email = htmlspecialchars($_POST['email'] ??'');

    require 'host.php';
    
    $existsql = "SELECT COUNT(*) AS total FROM users WHERE user_name = '$username'";
    $result = $conn->query($existsql);
    if ($result->num_rows > 0) {
        header("Location: sign.php?error=user&sign=up");
        exit();
    }
    if ($password !== $repeat) {
        header("Location: sign.php?error=password&sign=up");
        exit();
    }

    $createsql = "INSERT INTO users (user_name, password, email) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($createsql);
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT); // this hashes the password and the login should be able to deal with hashes i hope but u may need to get rid of this line in testing
    $stmt->bind_param("sss", $username, $hashedPassword, $email);
    $stmt->execute();

    $_SESSION['user_id'] = mysqli_insert_id($conn);
    header("Location: /profile page/Profile.php");
    exit();
}
?>