"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Clock, Users, MapPin, Plane, Car, CheckCircle, ArrowRight } from "lucide-react"

import { MainLayout } from "@/components/layouts/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const services = [
  {
    id: "short-term",
    title: "Location courte durée",
    description: "Parfait pour vos sorties, week-ends ou déplacements ponctuels",
    icon: Clock,
    features: [
      "À partir de quelques heures",
      "Tarifs avantageux",
      "Procédure simplifiée",
      "Disponibilité immédiate"
    ],
    startingPrice: "15 000",
    duration: "à partir de 2h",
    href: "/services/short-term"
  },
  {
    id: "long-term",
    title: "Location longue durée",
    description: "Solutions économiques pour vos besoins de mobilité sur plusieurs semaines",
    icon: Users,
    features: [
      "Tarifs préférentiels",
      "Maintenance incluse",
      "Assurance complète",
      "Véhicule de remplacement"
    ],
    startingPrice: "350 000",
    duration: "par mois",
    href: "/services/long-term"
  },
  {
    id: "with-driver",
    title: "Véhicules avec chauffeur",
    description: "Voyagez en toute sérénité avec nos chauffeurs professionnels",
    icon: Users,
    features: [
      "Chauffeurs expérimentés",
      "Connaissance du terrain",
      "Service personnalisé",
      "Véhicules premium"
    ],
    startingPrice: "25 000",
    duration: "par jour",
    href: "/services/with-driver"
  },
  {
    id: "airport-transfer",
    title: "Transferts aéroport",
    description: "Service de navette depuis et vers l'aéroport Léopold Sédar Senghor",
    icon: Plane,
    features: [
      "Ponctualité garantie",
      "Suivi des vols",
      "Chauffeur à l'accueil",
      "Tarif fixe"
    ],
    startingPrice: "15 000",
    duration: "par trajet",
    href: "/services/airport-transfer"
  }
]

export default function ServicesPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-senegal-green to-senegal-yellow py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Nos Services
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Des solutions de mobilité adaptées à tous vos besoins au Sénégal
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-senegal-green/10 rounded-full flex items-center justify-center">
                          <service.icon className="w-6 h-6 text-senegal-green" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-gray-900">
                            {service.title}
                          </CardTitle>
                          <Badge className="mt-1">
                            À partir de {service.startingPrice} FCFA {service.duration}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Avantages inclus :
                        </h4>
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-senegal-green flex-shrink-0" />
                              <span className="text-gray-600 text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Link href={service.href}>
                        <Button className="w-full gap-2" variant="senegal">
                          En savoir plus
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Besoin d'un service personnalisé ?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Notre équipe est là pour vous conseiller et trouver la solution idéale
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" variant="senegal">
                    <MapPin className="mr-2 w-5 h-5" />
                    Nous contacter
                  </Button>
                </Link>
                <Link href="/catalogue">
                  <Button size="lg" variant="outline">
                    <Car className="mr-2 w-5 h-5" />
                    Voir le catalogue
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}