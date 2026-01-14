<?php
require 'host.php';
session_start();

$user_id = $_SESSION['user_id'] ?? null;
$api_id = $_GET['id'] ?? null;

if (!isset($user_id) || !$api_id) {
    echo json_encode(['success' => false, 'msg' => 'No data']);
    exit;
}

$sql = "Select rating, descr, post_date from reviews r join media m on r.media_id = m.media_id where r.user_id = ? and m.api_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $user_id, $api_id);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
if($row) {
    $response = [
        'rating' => $row['rating'] ?? null,
        'review' => $row['descr'] ?? null,
        'date' => $row['post_date'] ?? null,
    ];
} else {
    $response = [
        'rating' => null,
        'review' => null,
        'date' => null,
    ];
}
echo json_encode($response);
$stmt->close();
?>