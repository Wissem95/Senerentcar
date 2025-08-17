# 🚗 Senerentcar - Location de Voitures au Sénégal

## À propos du Projet

Senerentcar est une plateforme moderne de location de voitures au Sénégal, offrant une expérience utilisateur fluide pour la réservation de véhicules. Notre service est disponible dans plusieurs villes majeures du Sénégal, notamment Dakar, Saint-Louis, Thiès et Ziguinchor.

## 🌟 Fonctionnalités Principales

- Réservation de véhicules en ligne
- Différents services de location :
  - Location courte durée
  - Location longue durée
  - Service avec chauffeur
  - Transfert aéroport
- Système de gestion des réservations
- Interface d'administration complète
- Système de paiement sécurisé
- Gestion des avis clients
- Système de notifications
- Gestion de la maintenance des véhicules

## 🛠 Technologies Utilisées

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- NextAuth.js pour l'authentification

### Backend

- Laravel
- PHP 8
- MySQL
- Laravel Sanctum pour l'API authentication

## 📋 Prérequis

- PHP >= 8.0
- Node.js >= 18
- MySQL
- Composer
- npm ou yarn

## 🚀 Installation

### Configuration du Backend

```bash
cd backend

# Installation des dépendances
composer install

# Copier le fichier d'environnement
cp .env.example .env

# Générer la clé d'application
php artisan key:generate

# Configuration de la base de données dans .env
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=senerentcar
# DB_USERNAME=root
# DB_PASSWORD=

# Migrations et seeders
php artisan migrate --seed

# Démarrer le serveur
php artisan serve
```

### Configuration du Frontend

```bash
cd frontend

# Installation des dépendances
npm install
# ou
yarn install

# Copier le fichier d'environnement
cp .env.example .env.local

# Démarrer le serveur de développement
npm run dev
# ou
yarn dev
```

## 🔧 Structure du Projet

### Backend (Laravel)

- `app/Http/Controllers/API` - Contrôleurs API
- `app/Models` - Modèles de données
- `app/Services` - Services métier
- `database/migrations` - Migrations de base de données
- `routes/api.php` - Routes API

### Frontend (Next.js)

- `src/app` - Pages et routes
- `src/components` - Composants réutilisables
- `src/lib` - Utilitaires et configurations
- `src/providers` - Providers React

## 📱 Fonctionnalités Principales

### Pour les Clients

- Recherche et filtrage des véhicules
- Système de réservation en ligne
- Gestion du profil utilisateur
- Système d'avis et notations
- Suivi des réservations

### Pour les Administrateurs

- Tableau de bord analytique
- Gestion des véhicules
- Gestion des réservations
- Suivi de la maintenance
- Gestion des utilisateurs

## 🌐 Déploiement

Le projet est configuré pour être déployé sur :

- Backend : Railway
- Frontend : Vercel

Pour plus de détails sur le déploiement, consultez le fichier [DEPLOYMENT.md](DEPLOYMENT.md).

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Contact

Pour toute question ou suggestion, n'hésitez pas à nous contacter via la page de contact du site.
