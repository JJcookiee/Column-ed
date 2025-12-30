<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') { 
    $username = htmlspecialchars($_POST['user'] ?? '');
    $password = htmlspecialchars($_POST['password'] ?? '');

    require 'host.php';
    
    $checkUser = $conn->prepare("SELECT user_id, password FROM users WHERE user_name = ?");
    $checkUser->bind_param("s", $username);
    $checkUser->execute();
    $result = $checkUser->get_result();

    if ($result->num_rows === 0) {
        header("Location: sign.php?error=user");
        exit();
    }

    $user = $result->fetch_assoc();

    if (!password_verify($password, $user['password'])) {
        header("Location: sign.php?error=password");
        exit();
    }

    $_SESSION['user_id'] = $user['user_id'];
    header("Location: /profile page/Profile.php");
    exit();
}
?>
