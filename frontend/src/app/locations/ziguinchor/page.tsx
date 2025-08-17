"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin, Phone, Clock, Car, Users, CheckCircle, ArrowLeft } from "lucide-react"

import { MainLayout } from "@/components/layouts/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const agencyInfo = {
  name: "Agence Ziguinchor - Centre",
  address: "Avenue Émile Badiane, près du Marché Central",
  phone: "+221 77 456 78 90",
  email: "ziguinchor@senerentcar.sn",
  hours: {
    weekdays: "Lundi - Vendredi: 8h00 - 18h00",
    weekend: "Samedi: 9h00 - 16h00",
    sunday: "Dimanche: 9h00 - 13h00"
  }
}

const services = [
  "Véhicules adaptés aux pistes de Casamance",
  "Excursions vers Cap Skirring et plages",
  "Transport vers frontières Guinée-Bissau",
  "Véhicules 4x4 pour villages reculés",
  "Service avec guide culturel diola",
  "Location pour ONG et projets humanitaires"
]

const nearbyAttractions = [
  {
    name: "Marché Central",
    distance: "100m",
    description: "Marché traditionnel de Casamance"
  },
  {
    name: "Cathédrale de Ziguinchor",
    distance: "500m",
    description: "Monument religieux principal"
  },
  {
    name: "Port de Ziguinchor",
    distance: "800m",
    description: "Port fluvial sur le fleuve Casamance"
  },
  {
    name: "Musée de la Casamance",
    distance: "600m",
    description: "Culture et traditions diola"
  },
  {
    name: "Alliance Franco-Sénégalaise",
    distance: "400m",
    description: "Centre culturel"
  },
  {
    name: "Gouvernance Régionale",
    distance: "1km",
    description: "Institutions administratives"
  }
]

const vehicleFleet = [
  { category: "Tout-terrain", count: 10, example: "Toyota Land Cruiser, Nissan Patrol" },
  { category: "Pick-up", count: 6, example: "Toyota Hilux, Ford Ranger" },
  { category: "Berline", count: 4, example: "Toyota Corolla, Hyundai Elantra" },
  { category: "Minibus", count: 3, example: "Toyota Hiace, Hyundai H1" },
  { category: "Économique", count: 5, example: "Peugeot 208, Renault Clio" }
]

const casamanceDestinations = [
  { destination: "Cap Skirring", distance: "75km", duration: "1h30", price: "25 000 FCFA", type: "Plages" },
  { destination: "Oussouye", distance: "55km", duration: "1h15", price: "20 000 FCFA", type: "Culture Diola" },
  { destination: "Bignona", distance: "35km", duration: "45min", price: "15 000 FCFA", type: "Centre Régional" },
  { destination: "Bissau (Guinée)", distance: "120km", duration: "2h30", price: "45 000 FCFA", type: "International" },
  { destination: "Kolda", distance: "180km", duration: "3h", price: "60 000 FCFA", type: "Région" },
  { destination: "Kafountine", distance: "85km", duration: "1h45", price: "30 000 FCFA", type: "Pêche/Plages" }
]

const culturalSites = [
  {
    name: "Île de Carabane",
    distance: "65km",
    description: "Île historique et écotourisme",
    specialty: "Ferry + 4x4"
  },
  {
    name: "Forêt de Casamance",
    distance: "Diverses",
    description: "Réserves naturelles et biodiversité", 
    specialty: "Guide spécialisé"
  },
  {
    name: "Villages Diola",
    distance: "20-80km",
    description: "Découverte culturelle authentique",
    specialty: "Guide local"
  },
  {
    name: "Parc National de Basse Casamance",
    distance: "90km",
    description: "Faune et flore tropicale",
    specialty: "4x4 obligatoire"
  }
]

export default function ZiguinchorLocationPage() {
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
                Notre Agence de Ziguinchor
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Votre porte d'entrée vers la Casamance, terre de culture diola et de nature luxuriante
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
                          <p className="text-gray-600">Ziguinchor, Région de Casamance</p>
                          <p className="text-sm text-senegal-green mt-2">Capitale de la Casamance</p>
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
                            Service d'urgence disponible en Casamance
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
                        Services spécialisés Casamance
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
                        <h5 className="font-medium text-gray-900 mb-2">Spécialités Casamance</h5>
                        <p className="text-sm text-gray-600">
                          Véhicules tout-terrain adaptés aux pistes latéritiques de la Casamance. 
                          Guides locaux parlant diola et connaissant parfaitement la culture et les traditions de la région.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Casamance Destinations */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Destinations populaires en Casamance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {casamanceDestinations.map((dest, index) => (
                          <div key={index} className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{dest.destination}</h4>
                              <Badge variant="outline">{dest.distance}</Badge>
                            </div>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p>Type: <span className="text-senegal-green">{dest.type}</span></p>
                              <p>Durée: {dest.duration}</p>
                              <p className="font-medium text-senegal-green">À partir de {dest.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Cultural Sites */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Sites culturels et écotouristiques</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {culturalSites.map((site, index) => (
                          <div key={index} className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900">{site.name}</h4>
                                <p className="text-sm text-gray-600 mt-1">{site.description}</p>
                              </div>
                              <Badge variant="outline" className="ml-2">{site.distance}</Badge>
                            </div>
                            <div className="flex items-center gap-2 mt-3">
                              <Badge className="text-xs bg-senegal-green/10 text-senegal-green">
                                {site.specialty}
                              </Badge>
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
                        Notre flotte à Ziguinchor
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
                          28 véhicules robustes et adaptés aux conditions de la Casamance
                        </p>
                        <Link href="/catalogue">
                          <Button variant="senegal">
                            Voir nos véhicules 4x4
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

                {/* Nearby Points */}
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
                        Assistance Casamance
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Dépannage et assistance dans toute la région de Casamance
                      </p>
                      <Button className="w-full" variant="senegal" size="sm">
                        <Phone className="mr-2 w-4 h-4" />
                        +221 77 666 77 88
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Cap Skirring */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Excursion Cap Skirring
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Les plus belles plages du Sénégal et stations balnéaires
                      </p>
                      <div className="text-sm space-y-1 mb-4">
                        <p><strong>Distance:</strong> 75km (1h30)</p>
                        <p><strong>Transport:</strong> 4x4 climatisé</p>
                        <p><strong>Saison:</strong> Novembre - Mai</p>
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                        Réserver excursion plages
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Cultural Tours */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Card className="bg-senegal-yellow/5 border-senegal-yellow/20">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Circuits Culturels Diola
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Découverte authentique de la culture diola avec guide local
                      </p>
                      <div className="text-sm space-y-1 mb-4">
                        <p><strong>Villages traditionnels</strong></p>
                        <p><strong>Artisanat local</strong></p>
                        <p><strong>Cérémonies traditionnelles</strong></p>
                      </div>
                      <Button className="w-full" variant="outline" size="sm">
                        Circuits culturels
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