"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Users, CheckCircle, ArrowLeft, Car, Phone, Star, CreditCard } from "lucide-react"

import { MainLayout } from "@/components/layouts/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const features = [
  "Chauffeurs expérimentés et certifiés",
  "Connaissance parfaite du terrain",
  "Service personnalisé et discret",
  "Véhicules premium climatisés",
  "Ponctualité garantie",
  "Disponible 24h/7j"
]

const pricingTiers = [
  {
    duration: "Demi-journée (4h)",
    price: "25 000",
    description: "Parfait pour rendez-vous d'affaires"
  },
  {
    duration: "Journée complète (8h)",
    price: "40 000",
    description: "Idéal pour visites ou tourisme"
  },
  {
    duration: "Forfait week-end",
    price: "70 000",
    description: "Service complet sur 2 jours"
  },
  {
    duration: "Tarif horaire",
    price: "8 000",
    description: "Facturation à l'heure (minimum 2h)"
  }
]

const driverProfiles = [
  {
    name: "Ibrahima Sow",
    experience: "12 ans d'expérience",
    languages: "Français, Wolof, Anglais",
    specialty: "Tourisme et visites culturelles",
    rating: 4.9
  },
  {
    name: "Fatou Diagne",
    experience: "8 ans d'expérience", 
    languages: "Français, Sérère, Portugais",
    specialty: "Transport d'affaires",
    rating: 4.8
  },
  {
    name: "Moussa Kane",
    experience: "15 ans d'expérience",
    languages: "Français, Peul, Arabe",
    specialty: "Transferts aéroport et longue distance",
    rating: 5.0
  }
]

export default function WithDriverPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link href="/services" className="inline-flex items-center gap-2 text-senegal-green hover:text-senegal-green/80 mb-6">
              <ArrowLeft className="w-4 h-4" />
              Retour aux services
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-senegal-green to-senegal-yellow rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">
                    Véhicules avec chauffeur
                  </h1>
                  <p className="text-xl text-gray-600 mt-2">
                    Voyagez en toute sérénité avec nos chauffeurs professionnels
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Le confort d'un chauffeur privé au Sénégal
                </h2>
                <div className="prose prose-gray">
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Notre service avec chauffeur vous offre une expérience de transport premium 
                    au Sénégal. Nos chauffeurs professionnels connaissent parfaitement Dakar, 
                    les routes du pays et parlent plusieurs langues locales.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Que ce soit pour vos déplacements d'affaires, visites touristiques, ou 
                    transferts vers l'aéroport, nos chauffeurs vous garantissent ponctualité, 
                    sécurité et service personnalisé dans des véhicules premium.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">Services inclus :</h3>
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-senegal-green flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Pricing */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Nos tarifs avec chauffeur
                </h2>
                <div className="space-y-4">
                  {pricingTiers.map((tier, index) => (
                    <Card key={index} className="border-2 hover:border-senegal-green/20 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {tier.duration}
                            </h3>
                            <p className="text-sm text-gray-600">{tier.description}</p>
                          </div>
                          <Badge className="text-lg font-bold">
                            {tier.price} FCFA
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-senegal-green/5 rounded-lg border border-senegal-green/20">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-senegal-green" />
                    Informations tarifaires
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Carburant et péages inclus dans Dakar</li>
                    <li>• Supplément de 500 FCFA/km hors Dakar</li>
                    <li>• Attente gratuite jusqu'à 30 minutes</li>
                    <li>• Réservation possible 24h/7j</li>
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Driver Profiles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
                Nos chauffeurs professionnels
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {driverProfiles.map((driver, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-senegal-green to-senegal-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {driver.name}
                      </h3>
                      <div className="flex items-center justify-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(driver.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">({driver.rating})</span>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p><strong>Expérience:</strong> {driver.experience}</p>
                        <p><strong>Langues:</strong> {driver.languages}</p>
                        <p><strong>Spécialité:</strong> {driver.specialty}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <Card className="bg-gradient-to-r from-senegal-green to-senegal-yellow text-white">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">
                    Réservez votre chauffeur maintenant
                  </h2>
                  <p className="text-white/90 mb-6">
                    Service disponible 24h/7j - Réservation en ligne ou par téléphone
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact">
                      <Button size="lg" className="bg-white text-senegal-green hover:bg-gray-100">
                        <Phone className="mr-2 w-5 h-5" />
                        Réserver maintenant
                      </Button>
                    </Link>
                    <Link href="/catalogue">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-senegal-green">
                        <Car className="mr-2 w-5 h-5" />
                        Voir nos véhicules
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}