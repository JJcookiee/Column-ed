<?php
$dotenv = parse_ini_file(__DIR__ . '/.env');

if (!$dotenv) {
    die(".env file could not be parsed. Check formatting.");
}

$host = $dotenv['DB_HOST'];
$port = $dotenv['DB_PORT'];
$db   = $dotenv['DB_NAME'];
$user = $dotenv['DB_USER'];
$pass = $dotenv['DB_PASS'];
$name = $dotenv['DB_NAME'];
$ca = $dotenv['SSL_CA_PATH'];

// build the DSN including SSL settings
$dsn = "mysql:host={$host};dbname={$db};port={$port};charset=utf8mb4";

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::MYSQL_ATTR_SSL_CA => $ca,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);

    $stmt = $pdo->query("SELECT VERSION()");
    echo $stmt->fetch()[0];
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>