<?php
session_start();

require 'host.php';

$sql = "
    SELECT m.title, m.api_id
    FROM diary d
    JOIN media m ON d.media_id = m.media_id
    WHERE d.user_id = " . intval($_SESSION['user_id']);
$result = $conn->query($sql);
$row = $result->fetch_assoc();

$title = $row['title'];
$id = $row['id'];
?>