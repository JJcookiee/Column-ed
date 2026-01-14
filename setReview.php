<?php
session_start();
require 'host.php';

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $_SESSION['user_id'] ?? null;
$rating = $data['rating'] ?? null;
$descr = $data['review'] ?? null;
$post_date = $data['date'] ?? null;
$api_id = $data['api_id'] ?? null;

if (!isset($rating) || !isset($user_id) || !$post_date || !$api_id || !$descr) {
    echo json_encode(['success' => false, 'msg' => 'No data','user' => $user_id , 'data' => $data]);
    exit;
}
$media_id = getMediaId($api_id, $conn);

$stmt = $conn->prepare("INSERT INTO reviews (user_id, rating, descr, post_date, media_id) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE rating = ?, descr = ?, post_date = ?");//not sure if the duplicate thingy works
$stmt->bind_param("iissiiss", $user_id, $rating, $descr, $post_date, $media_id, $rating, $descr, $post_date);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => $stmt->error]);
}

$stmt->close();

function getMediaId($api_id, $conn) {
    $sql = "SELECT media_id FROM media WHERE api_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $api_id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return $row['media_id'];
    } else {
        $insertsql = "INSERT INTO media (api_id) VALUES (?)";
        $insertstmt = $conn->prepare($insertsql);
        $insertstmt->bind_param("i", $api_id);
        if ($insertstmt->execute()) {
            return $insertstmt->insert_id;
        } else {
            error_log("Database error: " . $insertstmt->error);
            return null;
        }
    }
}
?>