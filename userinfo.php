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
$result = $conn->query($dsql);
$dresult = $result->fetch_assoc()['total'];
if (!isset($dresult)) {
  error_log("Error: " . $conn->error);
  $dresult = "0";
}

$revsql = "SELECT COUNT(*) AS total FROM reviews WHERE user_id = $id";
$result = $conn->query($revsql);
$revresult = $result->fetch_assoc()['total'];
if (!isset($revresult)) {
  error_log("Error: " . $conn->error);
  $revresult = "0";
}

$favsql = "SELECT COUNT(*) AS total FROM favourites WHERE user_id = $id";
$result = $conn->query($favsql);
$favresult = $result->fetch_assoc()['total'];
if (!isset($favresult)) {
  error_log("Error: " . $conn->error);
  $favresult = "0";
}

$followingsql = "SELECT COUNT(*) AS total FROM user_follows WHERE follower_id = $id";
$result = $conn->query($followingsql);
$following = $result->fetch_assoc()['total'];
if (!isset($following)) {
  error_log("Error: " . $conn->error);
  $following = "0";
}

$followerssql = "SELECT COUNT(*) AS total FROM user_follows WHERE followed_id = $id";
$result = $conn->query($followerssql);
$followers = $result->fetch_assoc()['total'];
if (!isset($followers)) {
  error_log("Error: " . $conn->error);
  $followers = "0";
}

$conn->close();
?>