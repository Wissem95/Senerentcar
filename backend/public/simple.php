<?php
// Simple test sans dépendances Laravel
header('Content-Type: application/json');
echo json_encode([
    'status' => 'PHP works!',
    'timestamp' => date('Y-m-d H:i:s'),
    'php_version' => phpversion(),
    'mysql_extension' => extension_loaded('pdo_mysql') ? 'loaded' : 'not_loaded'
]);
?>