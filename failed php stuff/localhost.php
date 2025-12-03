<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$dotenv = parse_ini_file(__DIR__ . '/.env');

if (!$dotenv) {
    echo(".env file could not be parsed. Check formatting.");
}

$host = $dotenv['DB_HOST'];
$user = $dotenv['DB_USER'];
$pass = $dotenv['DB_PASS'];
$db   = $dotenv['DB_NAME'];

$conn=mysqli_connect($host,$user,$pass,$db);
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
else {
    echo "connected";
}
?>