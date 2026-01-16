<?php
require 'host.php';
session_start();

$response = [];
$sql = "Select u.display_name, u.pfp, r.rating, m.api_id from users u join reviews r on u.user_id = r.user_id left join media m on r.media_id = m.media_id order by rand() limit 5";
$stmt = $conn->prepare($sql);
$stmt->execute();
$result = $stmt->get_result();
while($row = $result->fetch_assoc()) {
    $response[] = [
        'name' => $row['display_name'] ?? null,
        'pfp' => $row['pfp'] ?? null,
        'rating' => $row['rating'] ?? null,
        'api_id' => $row['api_id'] ?? null,
    ];
}
echo json_encode($response);
$stmt->close();
?>