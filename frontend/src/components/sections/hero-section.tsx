"use client"

import { motion } from "framer-motion"
import { ChevronDown, Star, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VehicleSearchForm } from "@/components/forms/vehicle-search-form"

const stats = [
  { value: "500+", label: "Véhicules disponibles" },
  { value: "15k+", label: "Clients satisfaits" },
  { value: "24/7", label: "Support client" },
  { value: "98%", label: "Taux de satisfaction" },
]

const features = [
  {
    icon: Shield,
    title: "Sécurité garantie",
    description: "Tous nos véhicules sont assurés et régulièrement entretenus",
  },
  {
    icon: Star,
    title: "Service premium",
    description: "Une expérience de location exceptionnelle à chaque fois",
  },
  {
    icon: Clock,
    title: "Disponible 24/7",
    description: "Réservez et récupérez votre véhicule à tout moment",
  },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-senegal-green/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-senegal-yellow/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-senegal-green/5 via-transparent to-senegal-red/5" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 lg:px-8">
        <div className="text-center">
          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Louez votre voiture
              <br />
              <span className="senegal-gradient-text">
                au Sénégal
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
              Découvrez le Sénégal en toute liberté avec nos véhicules modernes et fiables. 
              Réservation simple, tarifs transparents, service de qualité.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <div className="text-3xl font-bold text-senegal-green">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16"
          >
            <VehicleSearchForm 
              variant="hero"
              className="max-w-6xl mx-auto"
            />
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3 max-w-4xl mx-auto"
          >
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-senegal-green to-senegal-yellow rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg" 
              variant="senegal"
              className="px-8 py-6 text-lg font-semibold"
            >
              Voir le catalogue
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="px-8 py-6 text-lg font-semibold border-senegal-green text-senegal-green hover:bg-senegal-green hover:text-white"
            >
              Comment ça marche ?
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-20 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center cursor-pointer"
            >
              <span className="text-sm text-gray-500 mb-2">Découvrir plus</span>
              <ChevronDown className="w-6 h-6 text-senegal-green" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}