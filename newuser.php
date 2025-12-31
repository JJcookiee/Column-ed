<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') { 
    $username = htmlspecialchars($_POST['user'] ?? '');
    $password = htmlspecialchars($_POST['password'] ?? '');
    $repeat = htmlspecialchars($_POST['repeat'] ??'');
    $display_name = htmlspecialchars($_POST['display_name'] ?? '');
    $email = htmlspecialchars($_POST['email'] ??'');

    require 'host.php';
    
    $existsql = "SELECT COUNT(*) AS total FROM users WHERE user_name = ?";
    $stmt_check = $conn->prepare($existsql);
    $stmt_check->bind_param("s", $username);
    $stmt_check->execute();
    $stmt_check->bind_result($total);
    $stmt_check->fetch();
    $stmt_check->close();
    if ($total > 0) {
        header("Location: sign.php?error=user&sign=up");
        exit();
    }
    if ($password !== $repeat) {
        header("Location: sign.php?error=password&sign=up");
        exit();
    }

    $createsql = "INSERT INTO users (user_name, password, email, display_name) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($createsql);
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT); // this hashes the password and the login should be able to deal with hashes i hope but u may need to get rid of this line in testing
    $stmt->bind_param("ssss", $username, $hashedPassword, $email, $display_name);
    $stmt->execute();

    $_SESSION['user_id'] = mysqli_insert_id($conn);
    header("Location: profile.php");
    exit();
}
?>