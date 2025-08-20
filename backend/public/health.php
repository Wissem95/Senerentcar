<?php

// Simple health check endpoint
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: *');

echo json_encode([
    'status' => 'ok',
    'message' => 'Railway PHP server is working!',
    'timestamp' => date('Y-m-d H:i:s'),
    'server' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown',
    'php_version' => PHP_VERSION,
    'port' => $_SERVER['SERVER_PORT'] ?? 'Unknown'
]);