<?php
$conn = new mysqli("localhost", "root", "", "column-ed");

$sql_films = "SELECT COUNT(*) AS total_films FROM films";
$result_films = $conn->query($sql_films);
$total_films = $result_films->fetch_assoc()['total_films'];

$sql_reviews = "SELECT COUNT(*) AS total_reviews FROM reviews";
$result_reviews = $conn->query($sql_reviews);
$total_reviews = $result_reviews->fetch_assoc()['total_reviews'];
?>