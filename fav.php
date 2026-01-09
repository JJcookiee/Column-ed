<?php
require 'host.php';
session_start();

$user_id = $_SESSION['user_id'] ?? null;

if (!isset($user_id)) {
    echo json_encode(['success' => false, 'msg' => 'No data']);
    exit;
}

$sql = "SELECT m.api_id FROM favourites f JOIN media m ON f.media_id = m.media_id WHERE f.user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$list= [];
while ($row = $result->fetch_assoc()) {
    $list[] = $row['api_id'];
}
echo json_encode($list);
?>