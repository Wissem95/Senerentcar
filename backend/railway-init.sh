#!/bin/bash

echo "=== Railway Initialization ==="

# Run migrations
echo "Running migrations..."
php artisan migrate --force

# Run seeders
echo "Running seeders..."
php artisan db:seed --force

echo "=== Initialization complete ==="