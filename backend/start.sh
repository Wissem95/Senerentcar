#!/bin/bash

# Script de démarrage pour Railway
# Gestion robuste du port

# Obtenir le port depuis l'environnement ou utiliser 8000 par défaut
PORT=${PORT:-8000}

# S'assurer que PORT est un entier
if ! [[ "$PORT" =~ ^[0-9]+$ ]]; then
    echo "PORT n'est pas un nombre valide: $PORT. Utilisation du port 8000."
    PORT=8000
fi

echo "Démarrage du serveur Laravel sur le port: $PORT"

# Démarrer le serveur
php artisan serve --host=0.0.0.0 --port=$PORT