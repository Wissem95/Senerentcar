"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Plane, CheckCircle, ArrowLeft, Car, Clock, Phone, CreditCard } from "lucide-react"

import { MainLayout } from "@/components/layouts/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const features = [
  "Suivi des vols en temps réel",
  "Chauffeur à l'accueil avec pancarte",
  "Ponctualité garantie",
  "Tarif fixe sans surprise",
  "Véhicules climatisés premium",
  "Service 24h/7j toute l'année"
]

const routes = [
  {
    from: "Aéroport LSS",
    to: "Centre-ville Dakar",
    price: "15 000",
    duration: "45 min",
    description: "Plateau, Almadies, Point E"
  },
  {
    from: "Aéroport LSS", 
    to: "Parcelles Assainies",
    price: "12 000",
    duration: "30 min",
    description: "Unité 1 à 26"
  },
  {
    from: "Aéroport LSS",
    to: "Guédiawaye/Pikine",
    price: "18 000", 
    duration: "50 min",
    description: "Toutes zones"
  },
  {
    from: "Aéroport LSS",
    to: "Rufisque/Bargny",
    price: "20 000",
    duration: "60 min", 
    description: "Zone industrielle incluse"
  },
  {
    from: "Aéroport LSS",
    to: "Thiès",
    price: "35 000",
    duration: "90 min",
    description: "Centre-ville et environs"
  },
  {
    from: "Aéroport LSS",
    to: "Saly/Mbour",
    price: "45 000",
    duration: "120 min",
    description: "Zone touristique"
  }
]

const serviceSteps = [
  {
    step: "1",
    title: "Réservation",
    description: "Réservez en ligne ou par téléphone avec vos détails de vol"
  },
  {
    step: "2", 
    title: "Suivi de vol",
    description: "Nous suivons votre vol et ajustons l'heure de prise en charge"
  },
  {
    step: "3",
    title: "Accueil personnalisé", 
    description: "Votre chauffeur vous attend avec une pancarte à votre nom"
  },
  {
    step: "4",
    title: "Transport confortable",
    description: "Transfert direct vers votre destination dans un véhicule premium"
  }
]

export default function AirportTransferPage() {
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
                  <Plane className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">
                    Transferts aéroport
                  </h1>
                  <p className="text-xl text-gray-600 mt-2">
                    Service de navette depuis et vers l'aéroport Léopold Sédar Senghor
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
                  Transfert aéroport sans stress
                </h2>
                <div className="prose prose-gray">
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Notre service de transfert aéroport vous garantit un voyage serein depuis et vers 
                    l'aéroport international Léopold Sédar Senghor de Dakar. Nous suivons votre vol 
                    en temps réel et adaptons nos horaires en conséquence.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Que vous arriviez tard le soir ou partiez tôt le matin, notre service 24h/7j 
                    vous assure un transport ponctuel et confortable. Nos chauffeurs vous accueillent 
                    personnellement à l'aéroport avec une pancarte à votre nom.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">Avantages du service :</h3>
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-senegal-green flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Routes and Pricing */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Tarifs par destination
                </h2>
                <div className="space-y-3">
                  {routes.map((route, index) => (
                    <Card key={index} className="border-2 hover:border-senegal-green/20 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {route.to}
                            </h3>
                            <p className="text-sm text-gray-600">{route.description}</p>
                          </div>
                          <div className="text-right">
                            <Badge className="text-base font-bold mb-1">
                              {route.price} FCFA
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Clock className="w-3 h-3" />
                              {route.duration}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-senegal-green/5 rounded-lg border border-senegal-green/20">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-senegal-green" />
                    Informations importantes
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Tarifs valables pour 1-4 passagers</li>
                    <li>• Supplément de 2 000 FCFA par bagage volumineux</li>
                    <li>• Attente gratuite de 60 minutes après atterrissage</li>
                    <li>• Réservation recommandée 24h à l'avance</li>
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Service Process */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
                Comment ça marche ?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {serviceSteps.map((step, index) => (
                  <Card key={index} className="text-center relative">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-senegal-green text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                        {step.step}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                    {index < serviceSteps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                        <div className="w-8 h-0.5 bg-senegal-green"></div>
                      </div>
                    )}
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
                    Réservez votre transfert aéroport
                  </h2>
                  <p className="text-white/90 mb-6">
                    Service disponible 24h/7j - Paiement à bord ou en ligne
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact">
                      <Button size="lg" className="bg-white text-senegal-green hover:bg-gray-100">
                        <Phone className="mr-2 w-5 h-5" />
                        Réserver par téléphone
                      </Button>
                    </Link>
                    <Link href="/catalogue">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-senegal-green">
                        <Car className="mr-2 w-5 h-5" />
                        Réservation en ligne
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