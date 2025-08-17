"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Clock, CheckCircle, ArrowLeft, Car, Calendar, CreditCard } from "lucide-react"

import { MainLayout } from "@/components/layouts/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const features = [
  "Réservation en ligne 24h/7j",
  "Prise en charge rapide (sous 30min)",
  "Kilométrage illimité sur Dakar",
  "Assurance tous risques incluse",
  "Carburant non inclus",
  "Pas de frais cachés"
]

const pricingTiers = [
  {
    duration: "2-4 heures",
    price: "15 000",
    description: "Parfait pour les courses en ville"
  },
  {
    duration: "Demi-journée (12h)",
    price: "25 000", 
    description: "Idéal pour vos rendez-vous"
  },
  {
    duration: "Journée complète",
    price: "35 000",
    description: "Pour vos déplacements de la journée"
  },
  {
    duration: "Week-end (2 jours)",
    price: "60 000",
    description: "Escapade en toute liberté"
  }
]

export default function ShortTermPage() {
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
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">
                    Location courte durée
                  </h1>
                  <p className="text-xl text-gray-600 mt-2">
                    Flexibilité maximale pour vos déplacements ponctuels
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Pourquoi choisir notre location courte durée ?
                </h2>
                <div className="prose prose-gray">
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Notre service de location courte durée est conçu pour répondre à vos besoins de mobilité immédiate. 
                    Que ce soit pour un rendez-vous important, des courses en ville ou une sortie improvisée, 
                    nous mettons à votre disposition des véhicules modernes et fiables.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Avec plus de 50 véhicules disponibles dans le grand Dakar, nous garantissons une disponibilité 
                    optimale et une prise en charge rapide. Notre procédure simplifiée vous permet de récupérer 
                    votre véhicule en moins de 30 minutes.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">Ce qui est inclus :</h3>
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
                  Nos tarifs
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
                    Modalités de paiement
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Caution de 50 000 FCFA (remboursable)</li>
                    <li>• Paiement par Orange Money, Wave ou CB</li>
                    <li>• Facturation précise à la minute</li>
                    <li>• Pas de frais supplémentaires</li>
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 text-center"
            >
              <Card className="bg-gradient-to-r from-senegal-green to-senegal-yellow text-white">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">
                    Prêt à réserver ?
                  </h2>
                  <p className="text-white/90 mb-6">
                    Choisissez votre véhicule et réservez en quelques clics
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/catalogue">
                      <Button size="lg" className="bg-white text-senegal-green hover:bg-gray-100">
                        <Car className="mr-2 w-5 h-5" />
                        Voir les véhicules
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-senegal-green">
                        <Calendar className="mr-2 w-5 h-5" />
                        Réserver par téléphone
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