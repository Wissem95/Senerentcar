# 🚀 Guide de Déploiement Senerentcar

## Architecture de Déploiement

- **Backend Laravel**: Railway (PostgreSQL inclus)
- **Frontend Next.js**: Vercel
- **Images**: Cloudinary
- **Emails**: Resend
- **Queue**: Laravel Database Queue

---

## 📋 Prérequis

### Comptes requis

- [Railway Account](https://railway.app) - Backend + DB
- [Vercel Account](https://vercel.com) - Frontend
- [Cloudinary Account](https://cloudinary.com) - Images
- [Resend Account](https://resend.com) - Emails

### Clés API nécessaires

```bash
# Cloudinary
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name

# Resend
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@senerentcar.com
RESEND_FROM_NAME="Senerentcar"

# NextAuth
NEXTAUTH_SECRET=your-secret-key-32-chars-min
NEXTAUTH_URL=https://senerentcar.vercel.app
```

---

## 🔧 1. Déploiement Backend (Railway)

### Étape 1: Connexion Railway

```bash
# Installer Railway CLI
npm install -g @railway/cli

# Se connecter
railway login

# Créer nouveau projet
railway new
```

### Étape 2: Configuration du projet

```bash
cd backend/
railway link [PROJECT_ID]
```

### Étape 3: Variables d'environnement Railway

```bash
# Variables de base
railway variables set APP_NAME="Senerentcar API"
railway variables set APP_ENV=production
railway variables set APP_DEBUG=false
railway variables set APP_URL=https://your-app.railway.app

# Base de données (Railway PostgreSQL)
railway add postgresql
# Railway configurera automatiquement DATABASE_URL

# Cloudinary
railway variables set CLOUDINARY_URL="cloudinary://api_key:api_secret@cloud_name"

# Resend Email
railway variables set RESEND_API_KEY="re_xxxxxxxxxxxxx"
railway variables set RESEND_FROM_EMAIL="noreply@senerentcar.com"
railway variables set RESEND_FROM_NAME="Senerentcar"
railway variables set RESEND_CONTACT_EMAIL="contact@senerentcar.com"

# Laravel
railway variables set APP_KEY="base64:xxxxxxxxxxxxx"
railway variables set QUEUE_CONNECTION=database
railway variables set SESSION_DRIVER=database
railway variables set CACHE_DRIVER=database

# CORS
railway variables set FRONTEND_URL="https://senerentcar.vercel.app"
railway variables set SANCTUM_STATEFUL_DOMAINS="senerentcar.vercel.app"
```

### Étape 4: Déploiement

```bash
# Déployer
railway up

# Vérifier logs
railway logs
```

### Étape 5: Configuration post-déploiement

```bash
# Se connecter au container
railway shell

# Créer admin user
php artisan tinker
>>> $user = App\Models\User::create([
...     'first_name' => 'Admin',
...     'last_name' => 'Senerentcar',
...     'email' => 'admin@senerentcar.com',
...     'password' => bcrypt('password123'),
...     'phone' => '+221123456789'
... ]);
>>> $user->assignRole('admin');
```

---

## 🌐 2. Déploiement Frontend (Vercel)

### Étape 1: Installation Vercel CLI

```bash
npm install -g vercel
```

### Étape 2: Configuration projet

```bash
cd frontend/
vercel --prod
```

### Étape 3: Variables d'environnement Vercel

```bash
# API Backend
vercel env add NEXT_PUBLIC_API_URL production
# Valeur: https://your-app.railway.app/api

# Site URL
vercel env add NEXT_PUBLIC_SITE_URL production
# Valeur: https://senerentcar.vercel.app

# NextAuth
vercel env add NEXTAUTH_SECRET production
# Valeur: your-super-secret-key-32-chars-minimum

vercel env add NEXTAUTH_URL production
# Valeur: https://senerentcar.vercel.app

# Resend (pour contact form)
vercel env add RESEND_API_KEY production
# Valeur: re_xxxxxxxxxxxxx

vercel env add RESEND_FROM_EMAIL production
# Valeur: noreply@senerentcar.com

vercel env add RESEND_FROM_NAME production
# Valeur: Senerentcar

vercel env add RESEND_CONTACT_EMAIL production
# Valeur: contact@senerentcar.com
```

### Étape 4: Déploiement final

```bash
vercel --prod
```

---

## 🔐 3. Configuration Domaine (Optionnel)

### Domaine personnalisé Vercel

```bash
# Ajouter domaine
vercel domains add senerentcar.com

# Configurer DNS
# A record: @ -> 76.76.19.61
# CNAME: www -> cname.vercel-dns.com
```

### Domaine personnalisé Railway

```bash
# Dans Railway dashboard
# Settings > Networking > Custom Domain
# Ajouter: api.senerentcar.com
# Configurer CNAME: api -> your-app.railway.app
```

---

## ⚡ 4. Scripts de Déploiement Rapide

### Script Backend

```bash
#!/bin/bash
# deploy-backend.sh

echo "🚀 Déploiement Backend Senerentcar..."

cd backend/
railway up --detach

echo "⏳ Attente du déploiement..."
sleep 30

echo "🔄 Vérification des migrations..."
railway run php artisan migrate --force

echo "✅ Backend déployé!"
railway logs --tail
```

### Script Frontend

```bash
#!/bin/bash
# deploy-frontend.sh

echo "🌐 Déploiement Frontend Senerentcar..."

cd frontend/
npm run build
vercel --prod

echo "✅ Frontend déployé!"
vercel inspect
```

---

## 📊 5. Monitoring et Logs

### Logs Backend (Railway)

```bash
# Logs en temps réel
railway logs --tail

# Logs spécifiques
railway logs --filter "ERROR"

# Métriques
railway metrics
```

### Logs Frontend (Vercel)

```bash
# Dashboard Vercel
vercel logs --tail

# Analytics
vercel analytics
```

---

## 🛠️ 6. Maintenance

### Backup Base de Données

```bash
# Via Railway CLI
railway run pg_dump $DATABASE_URL > backup.sql

# Restauration
railway run psql $DATABASE_URL < backup.sql
```

### Mise à jour Backend

```bash
cd backend/
git pull origin main
railway up
```

### Mise à jour Frontend

```bash
cd frontend/
git pull origin main
vercel --prod
```

---

## 🚨 7. Troubleshooting

### Problèmes courants

#### ❌ Erreur CORS

```bash
# Vérifier variables FRONTEND_URL et SANCTUM_STATEFUL_DOMAINS
railway variables
```

#### ❌ Erreur Database

```bash
# Vérifier connexion DB
railway run php artisan db:show
```

#### ❌ Erreur Queue

```bash
# Redémarrer workers
railway restart
```

#### ❌ Images non visibles

```bash
# Vérifier Cloudinary config
railway run php artisan tinker
>>> config('services.cloudinary')
```

### Monitoring en production

```bash
# Status des services
curl https://your-app.railway.app/api/health
curl https://senerentcar.vercel.app/api/health

# Test upload images
curl -X POST https://your-app.railway.app/api/uploads/images

# Test envoi email
curl -X POST https://senerentcar.vercel.app/api/contact
```

---

## 📈 8. Optimisations Performance

### Backend Laravel

- ✅ Opcache activé
- ✅ Config/Route/View cache
- ✅ Queue workers configurés
- ✅ Rate limiting activé
- ✅ Gzip compression

### Frontend Next.js

- ✅ Images optimisées
- ✅ Lazy loading
- ✅ Static generation
- ✅ Bundle optimisé
- ✅ CDN Vercel

---

## 🎯 9. Checklist Final

### ✅ Avant mise en production

- [ ] Tests backend passent
- [ ] Tests frontend passent
- [ ] Variables d'environnement configurées
- [ ] Domaines configurés
- [ ] SSL activé
- [ ] Monitoring configuré
- [ ] Backup automatique
- [ ] Documentation à jour

### ✅ Après déploiement

- [ ] Site accessible
- [ ] API fonctionne
- [ ] Upload images OK
- [ ] Envoi emails OK
- [ ] Authentification OK
- [ ] Réservations OK
- [ ] Admin dashboard OK

---

## 🆘 Support

- **Documentation**: Cette documentation
- **Issues**: GitHub Issues
- **Email technique**: dev@senerentcar.com

**🇸🇳 Senerentcar - Découvrez le Sénégal en toute liberté !**
