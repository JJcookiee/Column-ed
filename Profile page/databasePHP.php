<?php
$conn = new mysqli("localhost", "root", "", "column-ed");
$sql = "SELECT COUNT(*) AS total FROM films";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$count = $row['total'];
?>