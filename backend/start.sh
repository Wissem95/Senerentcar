#!/bin/bash

# Script de démarrage pour Railway
set -e  # Arrêter si une commande échoue

echo "=== Démarrage de SeneRentCar Backend ==="

# Obtenir le port depuis l'environnement ou utiliser 8000 par défaut
PORT=${PORT:-8000}

# S'assurer que PORT est un entier
if ! [[ "$PORT" =~ ^[0-9]+$ ]]; then
    echo "PORT n'est pas un nombre valide: $PORT. Utilisation du port 8000."
    PORT=8000
fi

echo "Port configuré: $PORT"

# Vérifier les variables d'environnement critiques
echo "=== Vérification de l'environnement ==="
echo "APP_ENV: ${APP_ENV:-non défini}"
echo "DB_CONNECTION: ${DB_CONNECTION:-non défini}"
echo "DB_HOST: ${DB_HOST:-non défini}"

# Nettoyer les caches
echo "=== Nettoyage des caches ==="
php artisan config:clear || echo "Erreur config:clear ignorée"
php artisan route:clear || echo "Erreur route:clear ignorée" 
php artisan cache:clear || echo "Erreur cache:clear ignorée"

# Test de connexion à la base de données
echo "=== Test de connexion DB ==="
php artisan db:show || echo "Erreur de connexion DB - continuons..."

# Migrations
echo "=== Exécution des migrations ==="
php artisan migrate --force || echo "Erreur migrations - continuons..."

# Seeders (seulement si les migrations ont réussi)
echo "=== Exécution des seeders ==="
php artisan db:seed --force || echo "Erreur seeders - continuons..."

# Démarrer le serveur
echo "=== Démarrage du serveur Laravel sur le port: $PORT ==="
php artisan serve --host=0.0.0.0 --port=$PORT