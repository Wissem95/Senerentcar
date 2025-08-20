<?php

/**
 * Laravel Server Script for Railway Deployment
 */

// Set the document root
$publicPath = __DIR__ . '/public';

// Get the request URI
$uri = urldecode(
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '/'
);

// Handle static files (CSS, JS, images, etc.)
if ($uri !== '/' && file_exists($publicPath . $uri)) {
    return false;
}

// Set the script name to index.php for Laravel routing
$_SERVER['SCRIPT_NAME'] = '/index.php';

// Include Laravel's public/index.php
require_once $publicPath . '/index.php';