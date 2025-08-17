# SeneRentCar 🚗

Site de location de véhicules au Sénégal - Interface moderne construite avec Next.js 14

## 🌟 Caractéristiques

- **Design moderne** avec identité visuelle sénégalaise (couleurs du drapeau)
- **Responsive** mobile-first avec Tailwind CSS
- **Animations fluides** avec Framer Motion  
- **Formulaires robustes** avec React Hook Form + Zod
- **TypeScript** pour la sécurité du code
- **Architecture modulaire** avec composants réutilisables

## 🛠 Stack Technique

- **Framework**: Next.js 14 avec App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + animations personnalisées
- **Animations**: Framer Motion
- **Formulaires**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Auth**: Next-Auth (configuration prête)

## 🎨 Design System

### Couleurs du Sénégal
- **Vert**: `#00853D` (couleur principale)
- **Jaune**: `#FDEF42` (accent)  
- **Rouge**: `#E31E24` (erreurs/alertes)
- **Gradients** et **glassmorphism** pour un style moderne

### Composants UI
- Button avec variantes (default, senegal, outline, ghost)
- Card, Input, Label, Badge
- Loading spinners
- Navbar responsive avec menu mobile
- Footer complet

## 📁 Structure du Projet

```
src/
├── app/                    # Pages Next.js 14 (App Router)
│   ├── (auth)/            # Groupe de routes auth
│   │   ├── login/         # Page de connexion
│   │   └── register/      # Page d'inscription
│   ├── (dashboard)/       # Groupe admin (préparé)
│   ├── catalogue/         # Catalogue des véhicules
│   ├── profile/           # Profil utilisateur
│   └── booking/           # Réservations (préparé)
├── components/
│   ├── ui/                # Composants UI réutilisables
│   ├── forms/             # Formulaires spécialisés
│   ├── layouts/           # Layouts (navbar, footer)
│   └── sections/          # Sections de pages (hero)
├── lib/
│   ├── api.ts            # Client API avec Axios
│   └── utils.ts          # Utilitaires (formatage, etc.)
└── types/
    └── index.ts          # Types TypeScript
```

## 🚀 Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd senerentcar
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration environnement**
```bash
cp .env.example .env.local
# Éditer .env.local avec vos valeurs
```

4. **Lancer en développement**
```bash
npm run dev
```

Le site sera disponible sur `http://localhost:3000`

## 🔧 Scripts Disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # Linter ESLint
npm run type-check   # Vérification TypeScript
```

## 📱 Pages Implémentées

### ✅ Complétées
- **Accueil** - Hero section avec formulaire de recherche
- **Catalogue** - Grille de véhicules avec filtres
- **Connexion** - Formulaire d'authentification complet
- **Inscription** - Formulaire d'enregistrement avec validation
- **Profil** - Dashboard utilisateur basique

### 🔄 En cours / À venir
- **Réservation** - Processus de booking complet
- **Paiement** - Intégration Stripe/Wave
- **Admin Dashboard** - Gestion des véhicules et utilisateurs
- **Historique** - Suivi des réservations

## 🎯 Fonctionnalités Clés

### Recherche de Véhicules
- Formulaire avec validation Zod
- Filtres par localisation, dates, passagers
- Interface responsive magnifique

### Authentification
- Pages login/register avec glassmorphism
- Validation côté client robuste
- Préparé pour Next-Auth

### Catalogue
- Cartes véhicules avec informations complètes
- Filtres par catégorie, transmission, carburant
- Modes d'affichage grille/liste

## 🌍 Spécificités Sénégal

- **Localisation française** (fr-SN)
- **Devise CFA** (formatage automatique)
- **Numéros sénégalais** (+221)
- **Villes principales** (Dakar, Thiès, Saint-Louis)
- **Design patriotique** avec couleurs nationales

## 🔗 Backend API

Le frontend est conçu pour se connecter à une API Laravel. Points d'API attendus :

```typescript
/api/auth/*          # Authentification
/api/vehicles/*      # Gestion véhicules  
/api/bookings/*      # Réservations
/api/users/*         # Utilisateurs
```

## 📦 Dépendances Principales

```json
{
  "next": "^15.x",
  "react": "^18.x", 
  "typescript": "^5.x",
  "tailwindcss": "^3.x",
  "framer-motion": "^11.x",
  "react-hook-form": "^7.x",
  "zod": "^3.x",
  "axios": "^1.x",
  "lucide-react": "^0.x"
}
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📄 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

**SeneRentCar** - Votre partenaire de confiance pour la location de véhicules au Sénégal 🇸🇳
