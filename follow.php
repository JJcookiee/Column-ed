<?php
require 'host.php';
session_start();
if (!isset($_SESSION['user_id'])) {
  header("Location: index.html");//might need to change from index.php
  exit();
}

$user_id = intval($_SESSION['user_id']);
$other_id = intval($_SESSION['other_id']);//make sure the id of whoever to follow is stored in session. and the add variable
$add = $_SESSION['add']; //boolean true to follow, false to unfollow

if($add){
    $checksql = "SELECT * FROM user_follows WHERE follower_id = $user_id AND followed_id = $other_id";
    $result = $mysqli->query($checksql);   
    if($result->num_rows == 0){
        $addsql = "INSERT INTO user_follows (follower_id, followed_id) VALUES ($user_id, $other_id)";
        $mysqli->query($addsql);
    }
    $mysqli->close();
}
if(!$add){
    $checksql = "SELECT * FROM user_follows WHERE follower_id = $user_id AND followed_id = $other_id";
    $result = $mysqli->query($checksql);// dont know if checking before deleting is necessary, but it might cause error i guess
    if($result->num_rows > 0){
        $delsql = "DELETE FROM user_follows WHERE follower_id = $user_id AND followed_id = $other_id";
        $mysqli->query($delsql);
    }
    $mysqli->close();
}
//$other_id = null; //uncomment this depending on how you handle sessions
//$add = null; //remove after
?>