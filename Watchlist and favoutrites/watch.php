<?php
session_start();

require 'host.php';

$dsql = "SELECT media_id FROM diary where user_id = " . intval($_SESSION['user_id']);
$dresult = $conn->query($dsql);

$fsql = "SELECT media_id FROM favourites where user_id = " . intval($_SESSION['user_id']);
$fresult = $conn->query($fsql);
?>