"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VehicleCard } from "@/components/ui/vehicle-card"
import { Vehicle, VehicleCategory, TransmissionType, FuelType } from "@/types"

const featuredVehicles: Partial<Vehicle>[] = [
  {
    id: "1",
    name: "Toyota Yaris",
    brand: "Toyota",
    model: "Yaris",
    year: 2023,
    category: VehicleCategory.ECONOMY,
    transmission: TransmissionType.AUTOMATIC,
    fuelType: FuelType.GASOLINE,
    seats: 5,
    pricePerDay: 12000,
    images: ["/images/voitures/Yaris_mobile_Large-Landscape.webp"],
    isAvailable: true,
    location: "Dakar",
  },
  {
    id: "6",
    name: "Toyota RAV4",
    brand: "Toyota",
    model: "RAV4",
    year: 2023,
    category: VehicleCategory.SUV,
    transmission: TransmissionType.AUTOMATIC,
    fuelType: FuelType.GASOLINE,
    seats: 5,
    pricePerDay: 32000,
    images: ["/images/voitures/RAV4.jpg"],
    isAvailable: true,
    location: "Dakar",
  },
  {
    id: "8",
    name: "Toyota Land Cruiser",
    brand: "Toyota",
    model: "Land Cruiser",
    year: 2023,
    category: VehicleCategory.SUV,
    transmission: TransmissionType.AUTOMATIC,
    fuelType: FuelType.DIESEL,
    seats: 7,
    pricePerDay: 55000,
    images: ["/images/voitures/Hyundai Tucson 2022.jpg"],
    isAvailable: true,
    location: "Ziguinchor",
  },
]

export function FeaturedVehicles() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Nos véhicules populaires
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de véhicules les plus appréciés par nos clients sénégalais
          </p>
        </motion.div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredVehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <VehicleCard vehicle={vehicle} />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/catalogue">
            <Button size="lg" variant="outline" className="gap-2">
              Voir tout le catalogue
              <ChevronRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}