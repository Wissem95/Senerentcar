"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Shield, Calendar, FileText, Phone, Mail } from "lucide-react"

import { MainLayout } from "@/components/layouts/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const sections = [
  {
    id: "definitions",
    title: "1. Définitions",
    content: [
      "Senerentcar : Société sénégalaise de location de véhicules, immatriculée au Registre du Commerce de Dakar.",
      "Client : Toute personne physique ou morale ayant souscrit aux services de Senerentcar.",
      "Véhicule : Tout véhicule automobile mis à disposition par Senerentcar dans le cadre d'un contrat de location.",
      "Services : L'ensemble des prestations de location de véhicules proposées par Senerentcar."
    ]
  },
  {
    id: "objet",
    title: "2. Objet",
    content: [
      "Les présentes conditions générales d'utilisation régissent l'utilisation de la plateforme Senerentcar et les relations contractuelles entre Senerentcar et ses clients.",
      "Elles s'appliquent à toute location de véhicule effectuée via notre plateforme web ou mobile.",
      "L'utilisation de nos services implique l'acceptation pleine et entière des présentes conditions."
    ]
  },
  {
    id: "conditions-location",
    title: "3. Conditions de location",
    content: [
      "Âge minimum : 21 ans pour les véhicules de catégorie économique, 25 ans pour les véhicules de luxe.",
      "Permis de conduire : Permis de conduire valide depuis au moins 2 ans.",
      "Pièces d'identité : Carte d'identité nationale ou passeport en cours de validité.",
      "Caution : Une caution est exigée lors de la prise du véhicule, son montant varie selon la catégorie."
    ]
  },
  {
    id: "tarifs",
    title: "4. Tarifs et paiement",
    content: [
      "Les tarifs affichés sur la plateforme sont exprimés en francs CFA (XOF) et incluent la TVA.",
      "Le paiement peut s'effectuer par : Orange Money, Wave, virement bancaire ou carte bancaire.",
      "Les tarifs comprennent : assurance responsabilité civile, assistance 24h/7j, kilométrage illimité.",
      "Carburant non inclus : Le véhicule est remis avec un plein de carburant et doit être restitué dans le même état."
    ]
  },
  {
    id: "assurance",
    title: "5. Assurance et responsabilité",
    content: [
      "Tous nos véhicules sont couverts par une assurance responsabilité civile obligatoire.",
      "Une assurance tous risques est incluse avec une franchise variable selon le véhicule.",
      "Le client est responsable des dommages causés par sa faute, négligence ou usage non conforme.",
      "Les vols doivent être déclarés immédiatement aux autorités et à Senerentcar."
    ]
  },
  {
    id: "utilisation",
    title: "6. Utilisation du véhicule",
    content: [
      "Le véhicule ne peut être utilisé que sur le territoire sénégalais sauf accord préalable.",
      "Interdiction de : sous-louer, transporter des matières dangereuses, participer à des courses.",
      "Le nombre de conducteurs autorisés doit être déclaré lors de la réservation.",
      "Toute infraction au code de la route est à la charge exclusive du client."
    ]
  },
  {
    id: "annulation",
    title: "7. Annulation et modification",
    content: [
      "Annulation gratuite jusqu'à 24h avant la prise du véhicule.",
      "Annulation entre 24h et 2h avant : 50% du montant de la location.",
      "Annulation moins de 2h avant ou non-présentation : 100% du montant.",
      "Les modifications de réservation sont possibles sous réserve de disponibilité."
    ]
  },
  {
    id: "donnees",
    title: "8. Protection des données",
    content: [
      "Senerentcar collecte et traite vos données personnelles conformément à la réglementation sénégalaise.",
      "Vos données sont utilisées uniquement pour la gestion de votre location et l'amélioration de nos services.",
      "Vous disposez d'un droit d'accès, de rectification et de suppression de vos données.",
      "Aucune donnée n'est transmise à des tiers sans votre consentement explicite."
    ]
  },
  {
    id: "litiges",
    title: "9. Règlement des litiges",
    content: [
      "En cas de litige, une solution amiable sera recherchée en priorité.",
      "À défaut d'accord amiable, les tribunaux de Dakar seront seuls compétents.",
      "Le droit sénégalais est applicable à tous les contrats de location.",
      "Une procédure de médiation peut être engagée avant toute action judiciaire."
    ]
  }
]

export default function TermsPage() {
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
                  <FileText className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Conditions Générales d'Utilisation
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Conditions régissant l'utilisation des services de location de véhicules Senerentcar
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
                    <Shield className="w-6 h-6 text-senegal-green" />
                    Préambule
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p className="text-gray-600 leading-relaxed">
                    Bienvenue chez Senerentcar, votre partenaire de confiance pour la location de véhicules au Sénégal. 
                    Ces conditions générales d'utilisation définissent les droits et obligations de chaque partie dans 
                    le cadre de l'utilisation de nos services. Elles sont essentielles pour garantir une expérience 
                    de location sûre et transparente pour tous nos clients.
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-4">
                    En acceptant ces conditions, vous reconnaissez avoir pris connaissance de l'ensemble des clauses 
                    et vous engagez à les respecter durant toute la durée de votre relation avec Senerentcar.
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
                      <CardTitle className="text-xl text-senegal-green">
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

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-16"
            >
              <Card className="bg-gradient-to-r from-senegal-green to-senegal-yellow text-white">
                <CardHeader>
                  <CardTitle className="text-white">
                    Des questions sur nos conditions ?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90 mb-6">
                    Notre équipe juridique est à votre disposition pour toute clarification 
                    concernant ces conditions générales d'utilisation.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-white" />
                      <div>
                        <div className="font-medium text-white">Support juridique</div>
                        <div className="text-white/90 text-sm">+221 33 123 45 67</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-white" />
                      <div>
                        <div className="font-medium text-white">Email</div>
                        <div className="text-white/90 text-sm">legal@senerentcar.sn</div>
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