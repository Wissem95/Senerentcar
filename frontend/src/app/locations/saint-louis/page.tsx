"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin, Phone, Clock, Car, Users, CheckCircle, ArrowLeft } from "lucide-react"

import { MainLayout } from "@/components/layouts/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const agencyInfo = {
  name: "Agence Saint-Louis - Île",
  address: "Quai Henry Jay, près du Pont Faidherbe",
  phone: "+221 77 345 67 89",
  email: "saintlouis@senerentcar.sn",
  hours: {
    weekdays: "Lundi - Vendredi: 8h00 - 18h00",
    weekend: "Samedi: 9h00 - 16h00",
    sunday: "Dimanche: Sur rendez-vous"
  }
}

const services = [
  "Véhicules pour découverte du patrimoine UNESCO",
  "Excursions vers le Parc du Djoudj",
  "Transport vers les plages de Langue de Barbarie",
  "Véhicules 4x4 pour désert et brousse",
  "Service avec guide touristique local",
  "Transport vers Rosso (frontière Mauritanie)"
]

const nearbyAttractions = [
  {
    name: "Pont Faidherbe",
    distance: "100m",
    description: "Monument historique emblématique"
  },
  {
    name: "Île de Saint-Louis (UNESCO)",
    distance: "50m",
    description: "Centre historique classé"
  },
  {
    name: "Parc National du Djoudj",
    distance: "60km",
    description: "Réserve ornithologique mondiale"
  },
  {
    name: "Langue de Barbarie",
    distance: "15km",
    description: "Parc national et plages"
  },
  {
    name: "Hydrobase",
    distance: "2km",
    description: "Base aéronautique historique"
  },
  {
    name: "Musée de Saint-Louis",
    distance: "300m",
    description: "Histoire coloniale du Sénégal"
  }
]

const vehicleFleet = [
  { category: "Compact", count: 6, example: "Peugeot 208, Renault Clio" },
  { category: "Tout-terrain", count: 8, example: "Toyota Land Cruiser, Nissan Patrol" },
  { category: "Berline", count: 5, example: "Toyota Corolla, Hyundai Elantra" },
  { category: "Minibus", count: 3, example: "Toyota Hiace, Hyundai H1" },
  { category: "Climatisé Premium", count: 4, example: "Mercedes Classe C, BMW Série 3" }
]

const touristDestinations = [
  { destination: "Parc du Djoudj", distance: "60km", duration: "1h", price: "20 000 FCFA", type: "Ornithologie" },
  { destination: "Rosso (Mauritanie)", distance: "95km", duration: "1h30", price: "35 000 FCFA", type: "Frontière" },
  { destination: "Richard Toll", distance: "40km", duration: "45min", price: "15 000 FCFA", type: "Agro-industrie" },
  { destination: "Podor", distance: "85km", duration: "1h15", price: "25 000 FCFA", type: "Fleuve Sénégal" },
  { destination: "Dagana", distance: "45km", duration: "50min", price: "18 000 FCFA", type: "Rural" },
  { destination: "Louga", distance: "120km", duration: "1h45", price: "40 000 FCFA", type: "Région" }
]

export default function SaintLouisLocationPage() {
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
                Notre Agence de Saint-Louis
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Au cœur de la ville historique classée UNESCO, votre point de départ vers le Nord
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
                          <p className="text-gray-600">Saint-Louis, Région du Nord</p>
                          <p className="text-sm text-senegal-green mt-2">Sur l'île historique UNESCO</p>
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
                            Service d'urgence disponible 24h/7j
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
                        Services touristiques et régionaux
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
                        <h5 className="font-medium text-gray-900 mb-2">Spécialités Saint-Louis</h5>
                        <p className="text-sm text-gray-600">
                          Guides locaux spécialisés dans le patrimoine UNESCO, l'ornithologie du Djoudj et 
                          les excursions vers la Mauritanie. Véhicules adaptés aux pistes sahéliennes.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Tourist Destinations */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Excursions populaires depuis Saint-Louis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {touristDestinations.map((dest, index) => (
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
                        Notre flotte à Saint-Louis
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
                          26 véhicules spécialement équipés pour le tourisme et les pistes du Nord
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
                      <CardTitle className="text-lg">Sites touristiques</CardTitle>
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
                        Assistance Nord Sénégal
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Dépannage et assistance jusqu'à la frontière mauritanienne
                      </p>
                      <Button className="w-full" variant="senegal" size="sm">
                        <Phone className="mr-2 w-4 h-4" />
                        +221 77 777 88 99
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* UNESCO Heritage */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Card className="bg-senegal-yellow/5 border-senegal-yellow/20">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Patrimoine UNESCO
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Découvrez l'île historique de Saint-Louis classée au patrimoine mondial
                      </p>
                      <div className="text-sm space-y-1 mb-4">
                        <p><strong>Visite guidée:</strong> 3h</p>
                        <p><strong>Inclus:</strong> Guide + véhicule</p>
                        <p><strong>Tarif:</strong> 35 000 FCFA</p>
                      </div>
                      <Button className="w-full" variant="outline" size="sm">
                        Réserver visite UNESCO
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Djoudj Park */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Excursion Parc du Djoudj
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Réserve ornithologique classée UNESCO, 3ème parc au monde
                      </p>
                      <div className="text-sm space-y-1 mb-4">
                        <p><strong>Saison:</strong> Nov - Avril</p>
                        <p><strong>Durée:</strong> Journée complète</p>
                        <p><strong>Transport 4x4:</strong> Inclus</p>
                      </div>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white" size="sm">
                        Excursion ornithologique
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