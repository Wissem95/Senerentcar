"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Filter, Grid, List, SlidersHorizontal } from "lucide-react"
import { MainLayout } from "@/components/layouts/main-layout"
import { VehicleCard } from "@/components/ui/vehicle-card"
import { VehicleSearchForm } from "@/components/forms/vehicle-search-form"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Vehicle, VehicleCategory, TransmissionType, FuelType } from "@/types"
import { useVehicles } from "@/hooks/useVehicles"


export default function CataloguePage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 100000,
    transmission: "all",
    fuelType: "all",
    seats: "all",
    location: "all",
    features: [] as string[]
  })
  const [sortBy, setSortBy] = useState("recommended")

  // Use the API hook to fetch vehicles
  const { vehicles, loading, error, totalCount } = useVehicles({
    category: selectedCategory === 'all' ? undefined : selectedCategory,
    location: filters.location === 'all' ? undefined : filters.location,
    priceMin: filters.priceMin,
    priceMax: filters.priceMax,
    transmission: filters.transmission === 'all' ? undefined : filters.transmission,
    fuelType: filters.fuelType === 'all' ? undefined : filters.fuelType,
    seats: filters.seats === 'all' ? undefined : filters.seats,
  })

  // Calculate category counts dynamically from the vehicle data
  const categories = useMemo(() => [
    { key: "all", label: "Toutes", count: totalCount },
    { key: VehicleCategory.ECONOMY, label: "Économique", count: vehicles.filter(v => v.category === VehicleCategory.ECONOMY).length },
    { key: VehicleCategory.COMPACT, label: "Compacte", count: vehicles.filter(v => v.category === VehicleCategory.COMPACT).length },
    { key: VehicleCategory.STANDARD, label: "Standard", count: vehicles.filter(v => v.category === VehicleCategory.STANDARD).length },
    { key: VehicleCategory.SUV, label: "SUV", count: vehicles.filter(v => v.category === VehicleCategory.SUV).length },
    { key: VehicleCategory.PREMIUM, label: "Premium", count: vehicles.filter(v => v.category === VehicleCategory.PREMIUM).length },
    { key: VehicleCategory.LUXURY, label: "Luxe", count: vehicles.filter(v => v.category === VehicleCategory.LUXURY).length },
    { key: VehicleCategory.VAN, label: "Utilitaire", count: vehicles.filter(v => v.category === VehicleCategory.VAN).length },
  ], [vehicles, totalCount])

  // Sort vehicles based on sortBy option
  const filteredVehicles = useMemo(() => {
    const sorted = [...vehicles].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.pricePerDay - b.pricePerDay
        case "price-high":
          return b.pricePerDay - a.pricePerDay
        case "name":
          return a.name.localeCompare(b.name)
        case "year":
          return b.year - a.year
        default:
          return 0
      }
    })
    return sorted
  }, [vehicles, sortBy])

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-senegal-green to-senegal-yellow py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-white sm:text-5xl"
              >
                Notre Catalogue
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-4 text-xl text-white/90"
              >
                Trouvez le véhicule parfait pour votre voyage
              </motion.p>
            </div>

            {/* Search Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-12"
            >
              <VehicleSearchForm className="max-w-4xl mx-auto" />
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* Mobile Filter Toggle */}
                <div className="lg:hidden mb-6">
                  <Button
                    onClick={() => setShowFilters(!showFilters)}
                    variant="outline"
                    className="w-full"
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filtres
                  </Button>
                </div>

                {/* Filters */}
                <div className={`lg:block ${showFilters ? "block" : "hidden"} space-y-6`}>
                  {/* Categories */}
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-semibold text-lg mb-4">Catégories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category.key}
                          onClick={() => setSelectedCategory(category.key)}
                          className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                            selectedCategory === category.key
                              ? "bg-senegal-green text-white"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <span>{category.label}</span>
                          <Badge variant="secondary" className="ml-2">
                            {category.count}
                          </Badge>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-semibold text-lg mb-4">Prix par jour</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="0"
                          max="100000"
                          step="5000"
                          value={filters.priceMin}
                          onChange={(e) => setFilters(prev => ({ ...prev, priceMin: parseInt(e.target.value) }))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{filters.priceMin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} FCFA</span>
                        <span>{filters.priceMax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} FCFA</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="0"
                          max="100000"
                          step="5000"
                          value={filters.priceMax}
                          onChange={(e) => setFilters(prev => ({ ...prev, priceMax: parseInt(e.target.value) }))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Transmission */}
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-semibold text-lg mb-4">Transmission</h3>
                    <div className="space-y-2">
                      {[
                        { value: "all", label: "Toutes" },
                        { value: "automatic", label: "Automatique" },
                        { value: "manual", label: "Manuelle" }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="transmission"
                            value={option.value}
                            checked={filters.transmission === option.value}
                            onChange={(e) => setFilters(prev => ({ ...prev, transmission: e.target.value }))}
                            className="w-4 h-4 text-senegal-green border-gray-300 focus:ring-senegal-green"
                          />
                          <span className="text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Fuel Type */}
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-semibold text-lg mb-4">Carburant</h3>
                    <div className="space-y-2">
                      {[
                        { value: "all", label: "Tous" },
                        { value: "gasoline", label: "Essence" },
                        { value: "diesel", label: "Diesel" },
                        { value: "hybrid", label: "Hybride" },
                        { value: "electric", label: "Électrique" }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="fuelType"
                            value={option.value}
                            checked={filters.fuelType === option.value}
                            onChange={(e) => setFilters(prev => ({ ...prev, fuelType: e.target.value }))}
                            className="w-4 h-4 text-senegal-green border-gray-300 focus:ring-senegal-green"
                          />
                          <span className="text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Number of Seats */}
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-semibold text-lg mb-4">Nombre de places</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: "all", label: "Toutes" },
                        { value: "2", label: "2" },
                        { value: "4", label: "4" },
                        { value: "5", label: "5" },
                        { value: "7", label: "7" },
                        { value: "9", label: "9+" }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setFilters(prev => ({ ...prev, seats: option.value }))}
                          className={`p-2 text-sm rounded-lg border transition-colors ${
                            filters.seats === option.value
                              ? "bg-senegal-green text-white border-senegal-green"
                              : "border-gray-300 hover:border-senegal-green hover:bg-senegal-green/10"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-semibold text-lg mb-4">Localisation</h3>
                    <select
                      value={filters.location}
                      onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-senegal-green focus:border-transparent"
                    >
                      <option value="all">Toutes les villes</option>
                      <option value="Dakar">Dakar</option>
                      <option value="Thiès">Thiès</option>
                      <option value="Saint-Louis">Saint-Louis</option>
                      <option value="Ziguinchor">Ziguinchor</option>
                    </select>
                  </div>

                  {/* Clear Filters */}
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <Button
                      onClick={() => {
                        setSelectedCategory("all")
                        setFilters({
                          priceMin: 0,
                          priceMax: 100000,
                          transmission: "all",
                          fuelType: "all",
                          seats: "all",
                          location: "all",
                          features: []
                        })
                        setSortBy("recommended")
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Réinitialiser les filtres
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Grid */}
            <div className="lg:col-span-3">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {filteredVehicles.length} véhicule{filteredVehicles.length > 1 ? "s" : ""} trouvé{filteredVehicles.length > 1 ? "s" : ""}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {selectedCategory === "all" 
                      ? "Tous nos véhicules disponibles"
                      : `Catégorie: ${categories.find(c => c.key === selectedCategory)?.label}`
                    }
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Trier par:</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-senegal-green focus:border-transparent"
                    >
                      <option value="recommended">Recommandé</option>
                      <option value="price-low">Prix croissant</option>
                      <option value="price-high">Prix décroissant</option>
                      <option value="name">Nom A-Z</option>
                      <option value="year">Année récente</option>
                    </select>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="flex justify-center items-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-senegal-green"></div>
                  <span className="ml-3 text-gray-600">Chargement des véhicules...</span>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Erreur de chargement
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {error}
                  </p>
                  <Button
                    onClick={() => window.location.reload()}
                    variant="outline"
                  >
                    Réessayer
                  </Button>
                </div>
              )}

              {/* Vehicles Grid */}
              {!loading && !error && (
                <motion.div
                  layout
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                      : "space-y-6"
                  }
                >
                  {filteredVehicles.map((vehicle, index) => (
                    <motion.div
                      key={vehicle.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      layout
                    >
                      <VehicleCard 
                        vehicle={vehicle}
                        className={viewMode === "list" ? "max-w-none" : ""}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Empty State */}
              {!loading && !error && filteredVehicles.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Filter className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Aucun véhicule trouvé
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Essayez de modifier vos critères de recherche
                  </p>
                  <Button
                    onClick={() => setSelectedCategory("all")}
                    variant="senegal"
                  >
                    Voir tous les véhicules
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}