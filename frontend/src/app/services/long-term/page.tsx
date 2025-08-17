"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Calendar, CheckCircle, ArrowLeft, Car, Shield, Wrench, CreditCard } from "lucide-react"

import { MainLayout } from "@/components/layouts/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const features = [
  "Tarifs préférentiels dégressifs",
  "Maintenance complète incluse",
  "Assurance tous risques",
  "Véhicule de remplacement",
  "Kilométrage illimité",
  "Support dédié 24h/7j"
]

const pricingTiers = [
  {
    duration: "1 mois",
    price: "350 000",
    discount: "",
    description: "Idéal pour missions courtes"
  },
  {
    duration: "3 mois",
    price: "300 000",
    discount: "-15%",
    description: "Parfait pour projets moyens"
  },
  {
    duration: "6 mois",
    price: "275 000",
    discount: "-22%",
    description: "Excellent pour résidents temporaires"
  },
  {
    duration: "12 mois+",
    price: "250 000",
    discount: "-30%",
    description: "Meilleur tarif pour expatriés"
  }
]

const includedServices = [
  {
    icon: Wrench,
    title: "Maintenance incluse",
    description: "Entretien complet, vidanges, révisions selon le constructeur"
  },
  {
    icon: Shield,
    title: "Assurance complète",
    description: "Tous risques, assistance 24h, protection juridique"
  },
  {
    icon: Car,
    title: "Véhicule de remplacement",
    description: "En cas de panne ou d'accident, véhicule de courtoisie"
  }
]

export default function LongTermPage() {
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
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">
                    Location longue durée
                  </h1>
                  <p className="text-xl text-gray-600 mt-2">
                    Solutions économiques pour vos projets de plusieurs mois
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
                  Pourquoi choisir notre location longue durée ?
                </h2>
                <div className="prose prose-gray">
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Notre service de location longue durée s'adresse aux entreprises, expatriés, 
                    et particuliers ayant des besoins de mobilité sur plusieurs mois. Bénéficiez 
                    de tarifs préférentiels et d'un service complet incluant maintenance et assurance.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Que vous soyez en mission professionnelle au Sénégal, résident temporaire ou 
                    que votre entreprise ait besoin d'une flotte, nous vous proposons des solutions 
                    flexibles et économiques adaptées à vos besoins spécifiques.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">Avantages inclus :</h3>
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
                  Nos tarifs dégressifs
                </h2>
                <div className="space-y-4">
                  {pricingTiers.map((tier, index) => (
                    <Card key={index} className="border-2 hover:border-senegal-green/20 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                              {tier.duration}
                              {tier.discount && (
                                <Badge className="bg-senegal-green text-white">
                                  {tier.discount}
                                </Badge>
                              )}
                            </h3>
                            <p className="text-sm text-gray-600">{tier.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">
                              {tier.price} FCFA
                            </div>
                            <div className="text-sm text-gray-500">par mois</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-senegal-green/5 rounded-lg border border-senegal-green/20">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-senegal-green" />
                    Conditions de paiement
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Caution équivalente à 1 mois de location</li>
                    <li>• Paiement mensuel à terme échu</li>
                    <li>• Facturation précise au jour près</li>
                    <li>• Remises négociables pour flotte</li>
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Services Included */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
                Services inclus dans votre contrat
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {includedServices.map((service, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-senegal-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <service.icon className="w-8 h-8 text-senegal-green" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
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
                    Besoin d'un devis personnalisé ?
                  </h2>
                  <p className="text-white/90 mb-6">
                    Contactez-nous pour obtenir une offre adaptée à vos besoins spécifiques
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact">
                      <Button size="lg" className="bg-white text-senegal-green hover:bg-gray-100">
                        <CreditCard className="mr-2 w-5 h-5" />
                        Demander un devis
                      </Button>
                    </Link>
                    <Link href="/catalogue">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-senegal-green">
                        <Car className="mr-2 w-5 h-5" />
                        Voir les véhicules
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