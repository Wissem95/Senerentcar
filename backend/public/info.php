<?php
echo json_encode([
    'status' => 'PHP is working',
    'php_version' => phpversion(),
    'timestamp' => date('Y-m-d H:i:s'),
    'server' => $_SERVER['SERVER_SOFTWARE'] ?? 'unknown'
]);
?>