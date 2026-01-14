<?php
require 'host.php';
session_start();

$sql = "Select user_id, display_name, pfp, bio from users order by rand() limit 5";
$stmt = $conn->prepare($sql);
$stmt->execute();
$result = $stmt->get_result();
while($row = $result->fetch_assoc()) {
    $response[] = [
        'user_id' => $row['user_id'] ?? null,
        'name' => $row['display_name'] ?? null,
        'pfp' => $row['pfp'] ?? null,
        'bio' => $row['bio'] ?? null,
    ];
}
echo json_encode($response);
$stmt->close();
?>