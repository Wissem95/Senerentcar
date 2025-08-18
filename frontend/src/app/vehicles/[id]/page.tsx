"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { 
  ArrowLeft, 
  Star, 
  Users, 
  Car, 
  Fuel, 
  Calendar,
  MapPin,
  Shield,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Check,
  X
} from "lucide-react"
import { MainLayout } from "@/components/layouts/main-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VehicleCard } from "@/components/ui/vehicle-card"
import { Currency } from "@/components/ui/currency"
import { Vehicle, VehicleCategory, TransmissionType, FuelType } from "@/types"
import { useVehicle, useVehicles } from "@/hooks/useVehicles"


export default function VehicleDetailPage() {
  const params = useParams()
  const vehicleId = params.id as string
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  
  // Fetch vehicle details from API
  const { vehicle, loading, error } = useVehicle(vehicleId)
  
  // Fetch similar vehicles
  const { vehicles: similarVehicles } = useVehicles({
    category: vehicle?.category,
    limit: 3
  })
  
  // Filter out the current vehicle from similar vehicles
  const filteredSimilarVehicles = similarVehicles.filter(v => v.id !== vehicleId).slice(0, 2)

  const nextImage = () => {
    if (!vehicle?.images) return
    setCurrentImageIndex((prev) => 
      prev === vehicle.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    if (!vehicle?.images) return
    setCurrentImageIndex((prev) => 
      prev === 0 ? vehicle.images.length - 1 : prev - 1
    )
  }
  
  // Generate specifications from vehicle data
  const specifications = vehicle ? [
    { label: "Marque", value: vehicle.brand },
    { label: "Modèle", value: vehicle.model },
    { label: "Année", value: vehicle.year.toString() },
    { label: "Kilométrage", value: vehicle.mileage ? `${vehicle.mileage.toLocaleString()} km` : "N/A" },
    { label: "Carburant", value: vehicle.fuelType === 'gasoline' ? 'Essence' : vehicle.fuelType === 'diesel' ? 'Diesel' : 'Hybride' },
    { label: "Transmission", value: vehicle.transmission === 'automatic' ? 'Automatique' : 'Manuelle' },
    { label: "Nombre de places", value: vehicle.seats.toString() },
    { label: "Nombre de portes", value: vehicle.doors ? vehicle.doors.toString() : "N/A" },
    { label: "Climatisation", value: vehicle.airConditioning ? "Oui" : "Non" },
    { label: "Lieu", value: vehicle.location },
  ] : []

  // Loading state
  if (loading) {
    return (
      <MainLayout>
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="flex items-center space-x-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-senegal-green"></div>
            <span className="text-gray-600">Chargement du véhicule...</span>
          </div>
        </div>
      </MainLayout>
    )
  }

  // Error state
  if (error) {
    return (
      <MainLayout>
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Véhicule introuvable
            </h3>
            <p className="text-gray-600 mb-6">
              {error}
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/catalogue">
                <Button variant="outline">Voir le catalogue</Button>
              </Link>
              <Button onClick={() => window.location.reload()}>Réessayer</Button>
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }

  // Vehicle not found
  if (!vehicle) {
    return (
      <MainLayout>
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Véhicule introuvable
            </h3>
            <p className="text-gray-600 mb-6">
              Le véhicule demandé n'existe pas ou n'est plus disponible.
            </p>
            <Link href="/catalogue">
              <Button>Voir le catalogue</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-senegal-green">Accueil</Link>
              <span>/</span>
              <Link href="/catalogue" className="hover:text-senegal-green">Catalogue</Link>
              <span>/</span>
              <span className="text-gray-900">{vehicle?.name || 'Chargement...'}</span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Link href="/catalogue">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Retour au catalogue
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Images and Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardContent className="p-0">
                    <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={mockVehicle.images[currentImageIndex]}
                        alt={`${mockVehicle.name} - Image ${currentImageIndex + 1}`}
                        fill
                        className="object-cover cursor-pointer"
                        onClick={() => setIsImageModalOpen(true)}
                        sizes="(max-width: 1024px) 100vw, 66vw"
                      />
                      
                      {/* Navigation Arrows */}
                      {mockVehicle.images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}

                      {/* Image Indicator */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {vehicle.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === currentImageIndex ? "bg-white" : "bg-white/50"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Availability Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge variant={vehicle.isAvailable ? "default" : "destructive"}>
                          {vehicle.isAvailable ? "Disponible" : "Indisponible"}
                        </Badge>
                      </div>
                    </div>

                    {/* Thumbnail Gallery */}
                    <div className="p-4">
                      <div className="flex gap-2 overflow-x-auto">
                        {vehicle.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`flex-shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition-colors ${
                              index === currentImageIndex ? "border-senegal-green" : "border-gray-200"
                            }`}
                          >
                            <Image
                              src={image}
                              alt={`Thumbnail ${index + 1}`}
                              width={64}
                              height={48}
                              className="object-cover w-full h-full"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Vehicle Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl">{vehicle.name}</CardTitle>
                        <p className="text-gray-600 mt-1">
                          {vehicle.brand} {vehicle.model} {vehicle.year}
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-senegal-yellow text-senegal-yellow" />
                            <span className="font-medium">4.8</span>
                            <span className="text-gray-600">(124 avis)</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{vehicle.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsWishlisted(!isWishlisted)}
                          className={isWishlisted ? "text-red-500" : ""}
                        >
                          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">
                      {vehicle.description || 'Aucune description disponible.'}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Specifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Spécifications techniques</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {specifications.map((spec) => (
                        <div key={spec.label} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                          <span className="text-gray-600">{spec.label}</span>
                          <span className="font-medium">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Équipements inclus</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {vehicle.features?.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-senegal-green" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right Column - Booking */}
            <div className="space-y-6">
              {/* Pricing and Booking */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-24"
              >
                <Card>
                  <CardHeader>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-senegal-green">
                        <Currency amount={vehicle.pricePerDay} />
                      </div>
                      <div className="text-gray-600">par jour</div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-senegal-green" />
                        <span>{vehicle.seats} places</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Car className="w-4 h-4 text-senegal-green" />
                        <span>{vehicle.transmission === 'automatic' ? 'Automatique' : 'Manuelle'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Fuel className="w-4 h-4 text-senegal-green" />
                        <span>{vehicle.fuelType === 'gasoline' ? 'Essence' : vehicle.fuelType === 'diesel' ? 'Diesel' : 'Hybride'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Shield className="w-4 h-4 text-senegal-green" />
                        <span>Assuré</span>
                      </div>
                    </div>

                    {/* Calendar placeholder */}
                    <Card className="bg-gray-50">
                      <CardContent className="p-4 text-center">
                        <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600 mb-3">
                          Sélectionnez vos dates pour voir la disponibilité
                        </p>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Date de début
                            </label>
                            <input
                              type="date"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                              min={new Date().toISOString().split('T')[0]}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Date de fin
                            </label>
                            <input
                              type="date"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                              min={new Date().toISOString().split('T')[0]}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Booking Buttons */}
                    <div className="space-y-3">
                      <Link href={`/booking/${vehicle.id}`}>
                        <Button 
                          variant="default"
                          size="lg" 
                          className="w-full bg-senegal-green hover:bg-senegal-green/90"
                          disabled={!vehicle.isAvailable}
                        >
                          Réserver maintenant
                        </Button>
                      </Link>
                      <Button variant="outline" size="lg" className="w-full">
                        Demander un devis
                      </Button>
                    </div>

                    {/* Contact Info */}
                    <div className="text-center pt-4 border-t">
                      <p className="text-sm text-gray-600 mb-2">
                        Besoin d'aide ?
                      </p>
                      <a 
                        href="tel:+221771234567"
                        className="text-senegal-green font-medium hover:underline"
                      >
                        +221 77 123 45 67
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Similar Vehicles */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Véhicules similaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSimilarVehicles.map((similarVehicle) => (
                <VehicleCard key={similarVehicle.id} vehicle={similarVehicle} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  )
}