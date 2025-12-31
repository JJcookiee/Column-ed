<?php
session_start();
if (!isset($_SESSION['user_id'])) {
  header("Location: index.html");
  exit();
}

$usersql = "SELECT user_id, user_name, bio, display_name, pfp FROM users where user_id = " . intval($_SESSION['user_id']);
$result = $conn->query($usersql);

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $id = $row["user_id"];
    $username = $row["user_name"];
    $bio = $row["bio"];
    $displayname = $row["display_name"];
    $pfp = $row["pfp"];
  }
} else {
  error_log("User not found: ID " . intval($_SESSION['user_id']));
  header("Location: index.html");
  exit();
}

$dsql = "SELECT COUNT(*) AS total FROM diary WHERE user_id = $id";
$dresult = $conn->query($dsql);
if (!is_string($dresult)) {
  echo '<script>console.log("Error: " . $conn->error); </script>';
  $dresult = "0";
}
$revsql = "SELECT COUNT(*) AS total FROM reviews WHERE user_id = $id";
$revresult = $conn->query($revsql);
if (!is_string($revresult)) {
  echo '<script>console.log("Error: " . $conn->error); </script>';
  $revresult = "0";
}
$favsql = "SELECT COUNT(*) AS total FROM favourites WHERE user_id = $id";
$favresult = $conn->query($favsql);
if (!is_string($favresult)) {
  echo '<script>console.log("Error: " . $conn->error); </script>';
  $favresult = "0";
}
$conn->close();
?>