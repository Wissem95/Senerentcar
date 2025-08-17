"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Shield, Calendar, Eye, Lock, UserCheck, Database, Phone, Mail } from "lucide-react"

import { MainLayout } from "@/components/layouts/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const sections = [
  {
    id: "collecte",
    title: "1. Données collectées",
    icon: Database,
    content: [
      "Données d'identification : nom, prénom, date de naissance, pièce d'identité",
      "Coordonnées : adresse email, numéro de téléphone, adresse postale",
      "Informations de conduite : numéro de permis de conduire, expérience de conduite",
      "Données de paiement : informations bancaires, historique des transactions",
      "Données de géolocalisation : pour la localisation des véhicules et agences",
      "Données d'utilisation : historique des locations, préférences, commentaires"
    ]
  },
  {
    id: "finalites",
    title: "2. Finalités du traitement",
    icon: UserCheck,
    content: [
      "Gestion des réservations et contrats de location",
      "Vérification de l'identité et des autorisations de conduire",
      "Traitement des paiements et facturation",
      "Communication avec les clients (confirmations, rappels, support)",
      "Amélioration de nos services et développement de nouvelles fonctionnalités",
      "Respect des obligations légales et réglementaires",
      "Marketing et promotion de nos services (avec votre consentement)"
    ]
  },
  {
    id: "base-legale",
    title: "3. Base légale du traitement",
    icon: Shield,
    content: [
      "Exécution du contrat : traitement nécessaire à la fourniture du service de location",
      "Obligation légale : respect des réglementations en matière de transport et de location",
      "Intérêt légitime : amélioration de nos services, prévention de la fraude",
      "Consentement : marketing direct, cookies non essentiels, géolocalisation précise"
    ]
  },
  {
    id: "partage",
    title: "4. Partage des données",
    icon: Eye,
    content: [
      "Partenaires techniques : fournisseurs de paiement, services de géolocalisation",
      "Autorités compétentes : en cas d'obligation légale ou de réquisition judiciaire",
      "Assureurs : en cas de sinistre ou pour l'évaluation des risques",
      "Aucune vente ou cession de données à des fins commerciales",
      "Tous les partenaires sont liés par des accords de confidentialité stricts"
    ]
  },
  {
    id: "conservation",
    title: "5. Durée de conservation",
    icon: Calendar,
    content: [
      "Données de compte actif : conservées tant que le compte est actif",
      "Historique des locations : 5 ans après la fin du contrat",
      "Données comptables : 10 ans conformément aux obligations fiscales",
      "Données de géolocalisation : supprimées après 30 jours",
      "Consentements marketing : conservés jusqu'au retrait du consentement"
    ]
  },
  {
    id: "droits",
    title: "6. Vos droits",
    icon: Lock,
    content: [
      "Droit d'accès : consulter les données personnelles que nous détenons sur vous",
      "Droit de rectification : corriger des données inexactes ou incomplètes",
      "Droit à l'effacement : demander la suppression de vos données dans certains cas",
      "Droit à la limitation : restreindre le traitement de vos données",
      "Droit à la portabilité : récupérer vos données dans un format structuré",
      "Droit d'opposition : refuser le traitement pour des raisons légitimes",
      "Droit de retrait du consentement : retirer votre accord à tout moment"
    ]
  },
  {
    id: "securite",
    title: "7. Sécurité des données",
    icon: Shield,
    content: [
      "Chiffrement des données sensibles en transit et au repos",
      "Contrôles d'accès stricts avec authentification à deux facteurs",
      "Sauvegardes régulières et sécurisées de nos bases de données",
      "Formation régulière de nos équipes sur la protection des données",
      "Audits de sécurité périodiques par des experts indépendants",
      "Plan de réponse aux incidents de sécurité"
    ]
  },
  {
    id: "cookies",
    title: "8. Cookies et technologies similaires",
    icon: Database,
    content: [
      "Cookies essentiels : nécessaires au fonctionnement du site (authentification, panier)",
      "Cookies d'analyse : pour comprendre l'utilisation du site et l'améliorer",
      "Cookies marketing : pour personnaliser la publicité (avec votre consentement)",
      "Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur",
      "La suppression des cookies essentiels peut affecter le fonctionnement du site"
    ]
  },
  {
    id: "transferts",
    title: "9. Transferts internationaux",
    icon: Shield,
    content: [
      "Vos données sont principalement traitées au Sénégal",
      "Certains services tiers peuvent traiter des données en dehors du Sénégal",
      "Tous les transferts sont encadrés par des garanties appropriées",
      "Respect des standards internationaux de protection des données"
    ]
  },
  {
    id: "mineurs",
    title: "10. Protection des mineurs",
    icon: UserCheck,
    content: [
      "Nos services ne sont pas destinés aux personnes de moins de 18 ans",
      "Aucune collecte intentionnelle de données de mineurs",
      "Si nous découvrons des données de mineurs, elles sont supprimées immédiatement",
      "Les parents peuvent nous contacter pour signaler une collecte inappropriée"
    ]
  }
]

export default function PrivacyPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center gap-4 mb-6">
              <Link href="/register">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Retour
                </Button>
              </Link>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-senegal-green to-senegal-yellow rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Politique de Confidentialité
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Notre engagement pour la protection de vos données personnelles
              </p>
              <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Dernière mise à jour : 15 août 2024
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Version 2.1
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Lock className="w-6 h-6 text-senegal-green" />
                    Notre engagement
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p className="text-gray-600 leading-relaxed">
                    Chez Senerentcar, la protection de vos données personnelles est une priorité absolue. 
                    Cette politique de confidentialité vous informe de manière transparente sur la façon 
                    dont nous collectons, utilisons et protégeons vos informations personnelles.
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-4">
                    Nous nous engageons à respecter la réglementation sénégalaise en matière de protection 
                    des données personnelles et à mettre en œuvre les meilleures pratiques internationales 
                    pour assurer la sécurité de vos informations.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sections */}
            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-xl text-senegal-green">
                        <section.icon className="w-6 h-6" />
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {section.content.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-senegal-green rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-600 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Exercise Rights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-16"
            >
              <Card className="border-2 border-senegal-green/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-senegal-green">
                    <UserCheck className="w-6 h-6" />
                    Exercer vos droits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">
                    Pour exercer vos droits ou pour toute question concernant le traitement de vos données personnelles, 
                    contactez notre Délégué à la Protection des Données :
                  </p>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-senegal-green" />
                        <div>
                          <div className="font-medium text-gray-900">Téléphone</div>
                          <div className="text-gray-600 text-sm">+221 33 123 45 67</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-senegal-green" />
                        <div>
                          <div className="font-medium text-gray-900">Email</div>
                          <div className="text-gray-600 text-sm">privacy@senerentcar.sn</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-senegal-green/10 rounded-lg">
                      <p className="text-sm text-senegal-green">
                        <strong>Délai de réponse :</strong> Nous nous engageons à répondre à votre demande 
                        dans un délai maximum de 30 jours ouvrés.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact DPO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-8"
            >
              <Card className="bg-gradient-to-r from-senegal-green to-senegal-yellow text-white">
                <CardHeader>
                  <CardTitle className="text-white">
                    Questions sur cette politique ?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90 mb-6">
                    Notre équipe de protection des données est à votre écoute pour tout renseignement 
                    concernant le traitement de vos données personnelles.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-white" />
                      <div>
                        <div className="font-medium text-white">Délégué à la Protection des Données</div>
                        <div className="text-white/90 text-sm">+221 33 123 45 67</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-white" />
                      <div>
                        <div className="font-medium text-white">Email DPO</div>
                        <div className="text-white/90 text-sm">dpo@senerentcar.sn</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Footer */}
            <div className="mt-12 text-center">
              <p className="text-gray-500 text-sm">
                Senerentcar - Société sénégalaise de location de véhicules
                <br />
                Registre du Commerce de Dakar - NINEA : 123456789
                <br />
                Siège social : Avenue Léopold Sédar Senghor, Dakar, Sénégal
              </p>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}