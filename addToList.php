<?php
require 'host.php';
session_start();
if (!isset($_SESSION['user_id'])) {
  header("Location: reviewPage.html");//im sure u need to add extra to this url
  exit();
}

$user_id = intval($_SESSION['user_id']);
$meda_id = intval($_SESSION['media_id']);
$list_type = $_SESSION['list_type'];

$date = new DateTimeImmutable();
$now = $date->format('Y-m-d');

if($list_type === 'favourite'){
    $checksql = "SELECT * FROM favourites WHERE user_id = $user_id AND media_id = $meda_id";
    $result = $mysqli->query($checksql);
    if($result->num_rows == 0){
        $addsql = "INSERT INTO favourites (favourites_date, user_id, media_id) VALUES ($now, $user_id, $meda_id)";
        $mysqli->query($addsql);
        $mysqli->close();
    }
}

if($list_type === 'diary'){
    $checksql = "SELECT * FROM diary WHERE user_id = $user_id AND media_id = $meda_id";
    $result = $mysqli->query($checksql);
    if($result->num_rows == 0){
        $addsql = "INSERT INTO diary (diary_date, user_id, media_id) VALUES ($now, $user_id, $meda_id)";
        $mysqli->query($addsql);
        $mysqli->close();
    }   
}

if($list_type === 'to_watch'){
    $checksql = "SELECT * FROM to_watch WHERE user_id = $user_id AND media_id = $meda_id";
    $result = $mysqli->query($checksql);
    if($result->num_rows == 0){
       $addsql = "INSERT INTO to_watch (to_watch_date, user_id, media_id) VALUES ($now, $user_id, $meda_id)";
        $mysqli->query($addsql);
        $mysqli->close(); 
    }  
}

//$list_type = null;
//$media_id = null; //idk if they need resetting or not yk
?>