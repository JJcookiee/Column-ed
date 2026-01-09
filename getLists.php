<?php
require 'host.php';
session_start();

$user_id = $_SESSION['user_id'] ?? null;
$api_id = $_GET['id'] ?? null;

if (!isset($user_id) || !$api) {
    echo json_encode(['success' => false, 'msg' => 'No data']);
    exit;
}

$lists = ["favourites", "to_watch", "diary"];

foreach ($lists as $list) {
    $sql = "Select exists (select 1 from $list l join media m on l.media_id = m.media_id where l.user_id = ? and m.api_id = ?) as saved";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $user_id, $api_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $response[$list] = (bool)$row['saved'];
}
?>