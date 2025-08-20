<?php
echo json_encode([
    'railway_mysql_vars' => [
        'MYSQLHOST' => $_SERVER['MYSQLHOST'] ?? 'NOT_SET',
        'MYSQLPORT' => $_SERVER['MYSQLPORT'] ?? 'NOT_SET',
        'MYSQLDATABASE' => $_SERVER['MYSQLDATABASE'] ?? 'NOT_SET', 
        'MYSQLUSER' => $_SERVER['MYSQLUSER'] ?? 'NOT_SET',
        'MYSQLPASSWORD' => !empty($_SERVER['MYSQLPASSWORD']) ? 'SET' : 'NOT_SET'
    ],
    'laravel_db_vars' => [
        'DB_HOST' => $_SERVER['DB_HOST'] ?? 'NOT_SET',
        'DB_PORT' => $_SERVER['DB_PORT'] ?? 'NOT_SET',
        'DB_DATABASE' => $_SERVER['DB_DATABASE'] ?? 'NOT_SET',
        'DB_USERNAME' => $_SERVER['DB_USERNAME'] ?? 'NOT_SET',
        'DB_PASSWORD' => !empty($_SERVER['DB_PASSWORD']) ? 'SET' : 'NOT_SET',
        'DB_CONNECTION' => $_SERVER['DB_CONNECTION'] ?? 'NOT_SET'
    ],
    'connection_test' => [
        'host' => $_SERVER['MYSQLHOST'] ?? 'mysql.railway.internal',
        'port' => $_SERVER['MYSQLPORT'] ?? '3306',
        'database' => $_SERVER['MYSQLDATABASE'] ?? 'railway'
    ]
], JSON_PRETTY_PRINT);
?>