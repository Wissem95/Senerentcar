<?php
echo json_encode([
    'env_check' => [
        'MYSQL_HOST' => $_ENV['MYSQL_HOST'] ?? 'NOT_SET',
        'MYSQL_PORT' => $_ENV['MYSQL_PORT'] ?? 'NOT_SET',
        'MYSQL_DATABASE' => $_ENV['MYSQL_DATABASE'] ?? 'NOT_SET',
        'MYSQL_USER' => $_ENV['MYSQL_USER'] ?? 'NOT_SET',
        'MYSQL_PASSWORD' => !empty($_ENV['MYSQL_PASSWORD']) ? 'SET' : 'NOT_SET',
        'DB_HOST' => $_ENV['DB_HOST'] ?? 'NOT_SET',
        'DB_PORT' => $_ENV['DB_PORT'] ?? 'NOT_SET',
        'DB_DATABASE' => $_ENV['DB_DATABASE'] ?? 'NOT_SET',
        'DB_USERNAME' => $_ENV['DB_USERNAME'] ?? 'NOT_SET',
        'DB_PASSWORD' => !empty($_ENV['DB_PASSWORD']) ? 'SET' : 'NOT_SET',
    ],
    'server_vars' => [
        'MYSQL_HOST' => $_SERVER['MYSQL_HOST'] ?? 'NOT_SET',
        'MYSQL_PORT' => $_SERVER['MYSQL_PORT'] ?? 'NOT_SET', 
        'MYSQL_DATABASE' => $_SERVER['MYSQL_DATABASE'] ?? 'NOT_SET',
        'MYSQL_USER' => $_SERVER['MYSQL_USER'] ?? 'NOT_SET',
        'DATABASE_URL' => $_SERVER['DATABASE_URL'] ?? 'NOT_SET'
    ],
    'all_mysql_vars' => array_filter($_SERVER, function($key) {
        return strpos($key, 'MYSQL') !== false || strpos($key, 'DB_') !== false || strpos($key, 'DATABASE') !== false;
    }, ARRAY_FILTER_USE_KEY)
], JSON_PRETTY_PRINT);
?>