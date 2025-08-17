"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin, Phone, Clock, Car, Users, CheckCircle, ArrowLeft } from "lucide-react"

import { MainLayout } from "@/components/layouts/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const agencyInfo = {
  name: "Agence Thiès - Centre",
  address: "Avenue Général de Gaulle, près de la Gare",
  phone: "+221 77 234 56 78",
  email: "thies@senerentcar.sn",
  hours: {
    weekdays: "Lundi - Vendredi: 8h30 - 18h30",
    weekend: "Samedi: 9h00 - 16h00",
    sunday: "Dimanche: Fermé (service urgence disponible)"
  }
}

const services = [
  "Location de véhicules adaptés aux routes rurales",
  "Service avec chauffeur local",
  "Transport vers Dakar et aéroport",
  "Véhicules 4x4 pour zones difficiles",
  "Location pour entreprises minières",
  "Assistance et dépannage régional"
]

const nearbyAttractions = [
  {
    name: "Gare de Thiès",
    distance: "200m",
    description: "Station ferroviaire historique"
  },
  {
    name: "Marché central de Thiès",
    distance: "300m",
    description: "Grand marché régional"
  },
  {
    name: "Manufacture de Tapisseries",
    distance: "1,5km",
    description: "Artisanat traditionnel sénégalais"
  },
  {
    name: "Centre-ville de Thiès",
    distance: "100m",
    description: "Commerces et administrations"
  },
  {
    name: "Route de Dakar",
    distance: "500m",
    description: "Axe principal vers la capitale"
  },
  {
    name: "Zone industrielle",
    distance: "2km",
    description: "Industries et entreprises"
  }
]

const vehicleFleet = [
  { category: "Économique", count: 8, example: "Toyota Yaris, Hyundai i10" },
  { category: "Tout-terrain", count: 6, example: "Toyota Hilux, Nissan Navara" },
  { category: "Berline", count: 10, example: "Toyota Corolla, Hyundai Elantra" },
  { category: "Utilitaire", count: 4, example: "Hyundai H1, Toyota Hiace" },
  { category: "SUV", count: 5, example: "Toyota RAV4, Hyundai Tucson" }
]

const regionalDestinations = [
  { destination: "Dakar", distance: "70km", duration: "1h15", price: "25 000 FCFA" },
  { destination: "Aéroport LSS", distance: "85km", duration: "1h30", price: "30 000 FCFA" },
  { destination: "Kaolack", distance: "120km", duration: "1h45", price: "35 000 FCFA" },
  { destination: "Diourbel", distance: "45km", duration: "45min", price: "18 000 FCFA" },
  { destination: "Mbour", distance: "65km", duration: "1h", price: "22 000 FCFA" },
  { destination: "Touba", distance: "90km", duration: "1h20", price: "28 000 FCFA" }
]

export default function ThiesLocationPage() {
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
                Notre Agence de Thiès
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Votre porte d'entrée vers l'intérieur du Sénégal, au cœur de la région de Thiès
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
                          <p className="text-gray-600">Thiès, Région de Thiès</p>
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
                          <p>{agencyInfo.hours.sunday}</p>
                          <p className="text-sm text-senegal-green font-medium">
                            Service d'urgence disponible les dimanches
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
                        Services spécialisés Thiès
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
                      <div className="mt-6 p-4 bg-senegal-green/5 rounded-lg">
                        <h5 className="font-medium text-gray-900 mb-2">Spécialités régionales</h5>
                        <p className="text-sm text-gray-600">
                          Véhicules adaptés aux routes rurales et pistes de l'intérieur du Sénégal. 
                          Chauffeurs connaissant parfaitement la région de Thiès et ses environs.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Regional Destinations */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Destinations populaires depuis Thiès</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {regionalDestinations.map((dest, index) => (
                          <div key={index} className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{dest.destination}</h4>
                              <Badge variant="outline">{dest.distance}</Badge>
                            </div>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p>Durée: {dest.duration}</p>
                              <p className="font-medium text-senegal-green">À partir de {dest.price}</p>
                            </div>
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
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Users className="w-6 h-6 text-senegal-green" />
                        Notre flotte à Thiès
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
                          33 véhicules spécialement adaptés aux routes de l'intérieur
                        </p>
                        <Link href="/catalogue">
                          <Button variant="senegal">
                            Voir nos véhicules disponibles
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
                      <CardTitle className="text-lg">Points d'intérêt</CardTitle>
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
                        Assistance Thiès
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Dépannage et assistance dans toute la région
                      </p>
                      <Button className="w-full" variant="senegal" size="sm">
                        <Phone className="mr-2 w-4 h-4" />
                        +221 77 888 99 00
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Transfer to Dakar */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Card className="bg-senegal-yellow/5 border-senegal-yellow/20">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Navette Thiès → Dakar
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Service quotidien vers la capitale
                      </p>
                      <div className="text-sm space-y-1 mb-4">
                        <p><strong>Départs:</strong> 7h, 14h, 18h</p>
                        <p><strong>Durée:</strong> 1h15</p>
                        <p><strong>Tarif:</strong> 25 000 FCFA</p>
                      </div>
                      <Button className="w-full" variant="outline" size="sm">
                        Réserver navette
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