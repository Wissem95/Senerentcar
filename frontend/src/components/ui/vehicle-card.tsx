"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Users, Fuel, Zap, Car, Star, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Vehicle, VehicleCategory, TransmissionType, FuelType } from "@/types"
import { Currency } from "@/components/ui/currency"

interface VehicleCardProps {
  vehicle: Partial<Vehicle>
  className?: string
}

const categoryLabels: Record<VehicleCategory, string> = {
  [VehicleCategory.ECONOMY]: "Économique",
  [VehicleCategory.COMPACT]: "Compacte",
  [VehicleCategory.STANDARD]: "Standard",
  [VehicleCategory.PREMIUM]: "Premium",
  [VehicleCategory.SUV]: "SUV",
  [VehicleCategory.LUXURY]: "Luxe",
  [VehicleCategory.VAN]: "Utilitaire",
}

const transmissionLabels: Record<TransmissionType, string> = {
  [TransmissionType.MANUAL]: "Manuelle",
  [TransmissionType.AUTOMATIC]: "Automatique",
}

const fuelTypeIcons = {
  [FuelType.GASOLINE]: Fuel,
  [FuelType.DIESEL]: Fuel,
  [FuelType.HYBRID]: Zap,
  [FuelType.ELECTRIC]: Zap,
}

export function VehicleCard({ vehicle, className }: VehicleCardProps) {
  const {
    id = "1",
    name = "Toyota Corolla",
    brand = "Toyota",
    model = "Corolla",
    year = 2023,
    category = VehicleCategory.ECONOMY,
    transmission = TransmissionType.AUTOMATIC,
    fuelType = FuelType.GASOLINE,
    seats = 5,
    pricePerDay = 15000,
    images = ["/placeholder-car.jpg"],
    isAvailable = true,
    location = "Dakar",
  } = vehicle

  const FuelIcon = fuelTypeIcons[fuelType]

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
        <div className="relative aspect-[4/3]">
          <Image
            src={images[0]}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3">
            <Badge variant={isAvailable ? "success" : "destructive"}>
              {isAvailable ? "Disponible" : "Indisponible"}
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <Badge variant="secondary">
              {categoryLabels[category]}
            </Badge>
          </div>
          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-sm">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="mb-3">
            <h3 className="font-semibold text-lg text-gray-900 mb-1">
              {name}
            </h3>
            <p className="text-sm text-gray-600">
              {brand} {model} {year}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-senegal-green" />
              <span>{seats} places</span>
            </div>
            <div className="flex items-center gap-2">
              <FuelIcon className="w-4 h-4 text-senegal-green" />
              <span>{fuelType === FuelType.GASOLINE ? "Essence" : fuelType === FuelType.DIESEL ? "Diesel" : fuelType === FuelType.HYBRID ? "Hybride" : "Électrique"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-senegal-green" />
              <span>{transmissionLabels[transmission]}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-senegal-yellow fill-current" />
              <span>4.8 (124)</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-senegal-green">
                <Currency amount={pricePerDay} />
              </div>
              <div className="text-sm text-gray-600">par jour</div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex gap-2">
          <Link href={`/vehicles/${id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              Voir détails
            </Button>
          </Link>
          <Link href={`/booking/${id}`} className="flex-1">
            <Button 
              variant="senegal" 
              className="w-full"
              disabled={!isAvailable}
            >
              Réserver
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}