"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin, Phone, Clock, Car, Users, CheckCircle, ArrowLeft } from "lucide-react"

import { MainLayout } from "@/components/layouts/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const agencyInfo = {
  name: "Agence Dakar - Plateau",
  address: "Avenue Léopold Sédar Senghor, Immeuble Fahd, Plateau",
  phone: "+221 77 123 45 67",
  email: "dakar@senerentcar.sn",
  hours: {
    weekdays: "Lundi - Vendredi: 8h00 - 19h00",
    weekend: "Samedi - Dimanche: 9h00 - 17h00"
  },
  coordinates: {
    lat: 14.6937,
    lng: -17.4441
  }
}

const services = [
  "Location de véhicules toutes catégories",
  "Service avec chauffeur professionnel", 
  "Transferts aéroport 24h/7j",
  "Location longue durée",
  "Véhicules de fonction pour entreprises",
  "Assistance dépannage 24h/7j"
]

const nearbyAttractions = [
  {
    name: "Palais Présidentiel",
    distance: "500m",
    description: "Siège du gouvernement sénégalais"
  },
  {
    name: "Place de l'Indépendance", 
    distance: "300m",
    description: "Place historique du centre-ville"
  },
  {
    name: "Cathédrale du Souvenir Africain",
    distance: "400m", 
    description: "Monument religieux emblématique"
  },
  {
    name: "Marché Kermel",
    distance: "600m",
    description: "Marché traditionnel et artisanal"
  },
  {
    name: "Terminal Ferry Gorée",
    distance: "1,2km",
    description: "Embarquement vers l'île de Gorée"
  },
  {
    name: "Gare Routière Pompiers",
    distance: "800m",
    description: "Transport vers l'intérieur du pays"
  }
]

const vehicleFleet = [
  { category: "Économique", count: 15, example: "Toyota Yaris, Hyundai i10" },
  { category: "Compacte", count: 12, example: "Peugeot 208, Renault Clio" },
  { category: "Berline", count: 18, example: "Toyota Corolla, Nissan Sentra" },
  { category: "SUV", count: 10, example: "Nissan Qashqai, Toyota RAV4" },
  { category: "Premium", count: 8, example: "BMW Série 3, Audi A4" },
  { category: "Luxe", count: 5, example: "Mercedes Classe E, BMW Série 5" }
]

export default function DakarLocationPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-gradient-to-r from-senegal-green to-senegal-yellow py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center gap-2 text-white hover:text-white/80 mb-6">
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center text-white"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Notre Agence de Dakar
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Située au cœur du Plateau, notre agence principale vous accueille dans un cadre moderne
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Agency Information */}
              <div className="lg:col-span-2 space-y-8">
                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <MapPin className="w-6 h-6 text-senegal-green" />
                        Informations pratiques
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Adresse</h4>
                          <p className="text-gray-600">{agencyInfo.address}</p>
                          <p className="text-gray-600">Dakar, Sénégal</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Contact</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-senegal-green" />
                              <span className="text-gray-600">{agencyInfo.phone}</span>
                            </div>
                            <p className="text-gray-600">{agencyInfo.email}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Clock className="w-5 h-5 text-senegal-green" />
                          Horaires d'ouverture
                        </h4>
                        <div className="space-y-1 text-gray-600">
                          <p>{agencyInfo.hours.weekdays}</p>
                          <p>{agencyInfo.hours.weekend}</p>
                          <p className="text-sm text-senegal-green font-medium">
                            Service d'urgence 24h/7j disponible
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Services Available */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Car className="w-6 h-6 text-senegal-green" />
                        Services disponibles
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {services.map((service, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-senegal-green flex-shrink-0" />
                            <span className="text-gray-600">{service}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Vehicle Fleet */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Users className="w-6 h-6 text-senegal-green" />
                        Notre flotte à Dakar
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {vehicleFleet.map((fleet, index) => (
                          <div key={index} className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{fleet.category}</h4>
                              <Badge variant="secondary">{fleet.count} véhicules</Badge>
                            </div>
                            <p className="text-sm text-gray-600">{fleet.example}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-gray-600 mb-4">
                          Plus de 68 véhicules disponibles dans notre agence de Dakar
                        </p>
                        <Link href="/catalogue">
                          <Button variant="senegal">
                            Voir tous nos véhicules
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Actions rapides</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Link href="/catalogue">
                        <Button className="w-full" variant="senegal">
                          <Car className="mr-2 w-4 h-4" />
                          Réserver maintenant
                        </Button>
                      </Link>
                      <Link href="/contact">
                        <Button className="w-full" variant="outline">
                          <Phone className="mr-2 w-4 h-4" />
                          Nous contacter
                        </Button>
                      </Link>
                      <Button className="w-full" variant="outline">
                        <MapPin className="mr-2 w-4 h-4" />
                        Itinéraire GPS
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Nearby Attractions */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">À proximité</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {nearbyAttractions.map((attraction, index) => (
                          <div key={index} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 text-sm">{attraction.name}</h4>
                                <p className="text-xs text-gray-600 mt-1">{attraction.description}</p>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {attraction.distance}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Emergency Contact */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="bg-senegal-green/5 border-senegal-green/20">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Urgence 24h/7j
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        En cas de problème avec votre véhicule
                      </p>
                      <Button className="w-full" variant="senegal" size="sm">
                        <Phone className="mr-2 w-4 h-4" />
                        +221 77 999 88 77
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}