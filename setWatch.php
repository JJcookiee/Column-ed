<?php
session_start();
require 'host.php';
$user_id = $_SESSION['user_id'] ?? null;

$data = json_decode(file_get_contents("php://input"), true);

$watch = $data['watch'] ?? null;
$active = $data['active'] ?? null;
$media_id = getMediaId($watch, $conn);

if (!$watch || !isset($user_id) || !isset($active) || !$media_id) {
    echo json_encode(['success' => false, 'msg' => 'No data']);
    exit;
}

if($active) {
    $sql = "INSERT INTO to_watch (user_id, media_id) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $user_id, $media_id);
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'msg' => 'To watch added']);
    } else {
        error_log("Database error: " . $stmt->error);
        echo json_encode(['success' => false, 'msg' => 'Database error']);
    }
} else {
    $sql = "DELETE FROM to_watch WHERE user_id = ? AND media_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $user_id, $media_id);
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'msg' => 'To watch removed']);
    } else {
        error_log("Database error: " . $stmt->error);
        echo json_encode(['success' => false, 'msg' => 'Database error']);
    }
    exit;
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