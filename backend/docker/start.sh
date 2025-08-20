#!/bin/bash

# Senerentcar Laravel Start Script
set -e

echo "🚀 Starting Senerentcar Laravel Application..."

# Wait for database
echo "⏳ Waiting for database connection..."
until php artisan db:show --no-interaction 2>/dev/null; do
    echo "Database not ready, waiting..."
    sleep 2
done

echo "✅ Database connection established!"

# Run migrations
echo "🔄 Running database migrations..."
php artisan migrate --force --no-interaction

# Create storage link if it doesn't exist
if [ ! -L "/var/www/html/public/storage" ]; then
    echo "🔗 Creating storage link..."
    php artisan storage:link
fi

# Clear configurations to ensure environment variables are read dynamically
echo "⚡ Clearing cached configurations..."
php artisan config:clear
php artisan route:cache
php artisan view:cache

# Set proper permissions
echo "🔐 Setting permissions..."
chown -R www-data:www-data /var/www/html/storage
chown -R www-data:www-data /var/www/html/bootstrap/cache
chmod -R 755 /var/www/html/storage
chmod -R 755 /var/www/html/bootstrap/cache

# Start queue workers and scheduler in background
echo "🔧 Starting Laravel queue workers..."

# Ensure log directories exist
mkdir -p /var/log/supervisor
mkdir -p /var/log/nginx
mkdir -p /var/log/php

# Generate nginx configuration from template with Railway PORT
echo "🔧 Generating nginx configuration for Railway..."
export NGINX_PORT=${PORT:-80}
envsubst '${NGINX_PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/sites-available/default
rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default

echo "✅ Nginx configured to listen on port: $NGINX_PORT"

# Start supervisord
echo "🎬 Starting services with supervisord..."
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf