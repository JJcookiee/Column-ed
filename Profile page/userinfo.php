<?php
$usersql = "SELECT user_id, user_name, bio, display_name, pfp FROM users where user_id = 2"; //change later
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
  echo '<script>console.log("No profile found"); </script>';
}

$dsql = "SELECT COUNT(*) AS total FROM diary WHERE user_id = $id";
$dresult = $conn->query($dsql);
$revsql = "SELECT COUNT(*) AS total FROM reviews WHERE user_id = $id";
$revresult = $conn->query($revsql);
$favesql = "SELECT COUNT(*) AS total FROM favourites WHERE user_id = $id";
$faveresult = $conn->query($favesql);
$conn->close();
?>