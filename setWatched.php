<?php
session_start();
require 'host.php';
$user_id = $_SESSION['user_id'] ?? null;

$data = json_decode(file_get_contents("php://input"), true);

$watched = $data['watched'] ?? null;
$active = $data['active'] ?? null;
$media_id = getMediaId($watched, $conn);

if (!$watched || !isset($user_id) || !isset($active) || !$media_id) {
    echo json_encode(['success' => false, 'msg' => 'No data']);
    exit;
}

if($active) {
    $sql = "INSERT INTO diary (user_id, media_id, diary_date) VALUES (?, ?, now())";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $user_id, $media_id);
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'msg' => 'Watched added']);
    } else {
        error_log("Database error: " . $stmt->error);
        echo json_encode(['success' => false, 'msg' => 'Database error']);
    }
} else {
    $sql = "DELETE FROM diary WHERE user_id = ? AND media_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $user_id, $media_id);
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'msg' => 'Watched removed']);
    } else {
        error_log("Database error: " . $stmt->error);
        echo json_encode(['success' => false, 'msg' => 'Database error']);
    }
}

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