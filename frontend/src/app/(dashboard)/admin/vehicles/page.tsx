"use client"

import { useState, useEffect, useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { motion } from "framer-motion"
import {
  Car,
  Plus,
  Edit2,
  Trash2,
  MoreHorizontal,
  ToggleLeft,
  Eye,
  Settings,
} from "lucide-react"

import { AdminLayout } from "@/components/layouts/admin-layout"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { VehicleFormModal } from "@/components/admin/vehicle-form-modal"

interface Vehicle {
  id: string
  name: string
  brand: string
  model: string
  year: number
  category: string
  licensePlate: string
  fuelType: "gasoline" | "diesel" | "hybrid" | "electric"
  transmission: "manual" | "automatic"
  seats: number
  pricePerDay: number
  images: string[]
  status: "available" | "rented" | "maintenance" | "inactive"
  location: string
  mileage: number
  isFeatured: boolean
}

const senegalVehiclesAdmin: Vehicle[] = [
  {
    id: "1",
    name: "Toyota Yaris",
    brand: "Toyota",
    model: "Yaris",
    year: 2023,
    category: "Économique",
    licensePlate: "DK-2345-AB",
    fuelType: "gasoline",
    transmission: "automatic",
    seats: 5,
    pricePerDay: 12000,
    images: ["https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400"],
    status: "available",
    location: "Dakar",
    mileage: 8500,
    isFeatured: true,
  },
  {
    id: "2",
    name: "Hyundai i10",
    brand: "Hyundai",
    model: "i10",
    year: 2022,
    category: "Compacte",
    licensePlate: "TH-6789-CD",
    fuelType: "gasoline",
    transmission: "manual",
    seats: 5,
    pricePerDay: 10000,
    images: ["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400"],
    status: "available",
    location: "Thiès",
    mileage: 15000,
    isFeatured: false,
  },
  {
    id: "3",
    name: "Toyota Corolla",
    brand: "Toyota",
    model: "Corolla",
    year: 2023,
    category: "Berline",
    licensePlate: "DK-1111-EF",
    fuelType: "gasoline",
    transmission: "automatic",
    seats: 5,
    pricePerDay: 18000,
    images: ["https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400"],
    status: "rented",
    location: "Dakar",
    mileage: 5200,
    isFeatured: true,
  },
  {
    id: "4",
    name: "Toyota RAV4",
    brand: "Toyota",
    model: "RAV4",
    year: 2023,
    category: "SUV",
    licensePlate: "DK-7777-GH",
    fuelType: "gasoline",
    transmission: "automatic",
    seats: 5,
    pricePerDay: 32000,
    images: ["https://images.unsplash.com/photo-1518792528501-352f829886dc?w=400"],
    status: "available",
    location: "Dakar",
    mileage: 12000,
    isFeatured: true,
  },
  {
    id: "5",
    name: "Toyota Land Cruiser",
    brand: "Toyota",
    model: "Land Cruiser",
    year: 2022,
    category: "SUV",
    licensePlate: "ZG-3333-IJ",
    fuelType: "diesel",
    transmission: "automatic",
    seats: 7,
    pricePerDay: 55000,
    images: ["https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400"],
    status: "available",
    location: "Ziguinchor",
    mileage: 28000,
    isFeatured: true,
  },
  {
    id: "6",
    name: "Hyundai H1",
    brand: "Hyundai",
    model: "H1",
    year: 2022,
    category: "Utilitaire",
    licensePlate: "DK-8888-KL",
    fuelType: "diesel",
    transmission: "manual",
    seats: 9,
    pricePerDay: 30000,
    images: ["https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400"],
    status: "maintenance",
    location: "Dakar",
    mileage: 35000,
    isFeatured: false,
  },
  {
    id: "7",
    name: "Peugeot 208",
    brand: "Peugeot",
    model: "208",
    year: 2022,
    category: "Compacte",
    licensePlate: "SL-5555-MN",
    fuelType: "gasoline",
    transmission: "manual",
    seats: 5,
    pricePerDay: 11000,
    images: ["https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400"],
    status: "available",
    location: "Saint-Louis",
    mileage: 18500,
    isFeatured: false,
  },
  {
    id: "8",
    name: "Nissan Patrol",
    brand: "Nissan",
    model: "Patrol",
    year: 2022,
    category: "SUV",
    licensePlate: "SL-9999-OP",
    fuelType: "diesel",
    transmission: "automatic",
    seats: 7,
    pricePerDay: 50000,
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"],
    status: "available",
    location: "Saint-Louis",
    mileage: 22000,
    isFeatured: true,
  },
  {
    id: "9",
    name: "Mercedes Classe C",
    brand: "Mercedes",
    model: "Classe C",
    year: 2023,
    category: "Luxe",
    licensePlate: "DK-1234-QR",
    fuelType: "gasoline",
    transmission: "automatic",
    seats: 5,
    pricePerDay: 65000,
    images: ["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400"],
    status: "available",
    location: "Dakar",
    mileage: 3500,
    isFeatured: true,
  },
  {
    id: "10",
    name: "Toyota Hilux",
    brand: "Toyota",
    model: "Hilux",
    year: 2023,
    category: "Pick-up",
    licensePlate: "ZG-7777-ST",
    fuelType: "diesel",
    transmission: "manual",
    seats: 5,
    pricePerDay: 35000,
    images: ["https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400"],
    status: "available",
    location: "Ziguinchor",
    mileage: 9800,
    isFeatured: false,
  },
]

const getStatusBadge = (status: Vehicle["status"]) => {
  switch (status) {
    case "available":
      return <Badge className="bg-green-100 text-green-800">Disponible</Badge>
    case "rented":
      return <Badge className="bg-blue-100 text-blue-800">Loué</Badge>
    case "maintenance":
      return <Badge className="bg-yellow-100 text-yellow-800">Maintenance</Badge>
    case "inactive":
      return <Badge className="bg-red-100 text-red-800">Inactif</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null)

  // Fetch vehicles from API
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/vehicles`)
        if (response.ok) {
          const result = await response.json()
          setVehicles(result.data || [])
        } else {
          // Fallback to mock data
          setVehicles(senegalVehiclesAdmin)
        }
      } catch (error) {
        console.error('Error fetching vehicles:', error)
        // Fallback to mock data
        setVehicles(senegalVehiclesAdmin)
      } finally {
        setLoading(false)
      }
    }

    fetchVehicles()
  }, [])

  const toggleStatus = async (vehicleId: string) => {
    try {
      const vehicle = vehicles.find(v => v.id === vehicleId)
      if (!vehicle) return

      const newStatus = vehicle.status === "available" ? "inactive" : "available"
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/vehicles/${vehicleId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setVehicles(prev =>
          prev.map(vehicle =>
            vehicle.id === vehicleId
              ? { ...vehicle, status: newStatus }
              : vehicle
          )
        )
      } else {
        alert('Erreur lors de la mise à jour du statut')
      }
    } catch (error) {
      console.error('Error updating vehicle status:', error)
      alert('Erreur lors de la mise à jour du statut')
    }
  }

  const deleteVehicle = async (vehicleId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/vehicles/${vehicleId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setVehicles(prev => prev.filter(vehicle => vehicle.id !== vehicleId))
      } else {
        alert('Erreur lors de la suppression du véhicule')
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error)
      alert('Erreur lors de la suppression du véhicule')
    }
  }

  const editVehicle = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle)
    setIsModalOpen(true)
  }

  const columns: ColumnDef<Vehicle>[] = useMemo(
    () => [
      {
        accessorKey: "images",
        header: "Photo",
        cell: ({ row }) => {
          const images = row.getValue("images") as string[]
          return (
            <div className="h-12 w-16 rounded-lg overflow-hidden bg-gray-100">
              {images?.[0] ? (
                <img
                  src={images[0]}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Car className="h-6 w-6 text-gray-400" />
                </div>
              )}
            </div>
          )
        },
      },
      {
        accessorKey: "name",
        header: "Véhicule",
        cell: ({ row }) => {
          const vehicle = row.original
          return (
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {vehicle.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {vehicle.licensePlate}
              </p>
            </div>
          )
        },
      },
      {
        accessorKey: "category",
        header: "Type",
        cell: ({ row }) => (
          <Badge variant="outline">{row.getValue("category")}</Badge>
        ),
      },
      {
        accessorKey: "year",
        header: "Année",
      },
      {
        accessorKey: "fuelType",
        header: "Carburant",
        cell: ({ row }) => {
          const fuelType = row.getValue("fuelType") as string
          const fuelLabels = {
            gasoline: "Essence",
            diesel: "Diesel",
            hybrid: "Hybride",
            electric: "Électrique",
          }
          return fuelLabels[fuelType as keyof typeof fuelLabels] || fuelType
        },
      },
      {
        accessorKey: "transmission",
        header: "Transmission",
        cell: ({ row }) => {
          const transmission = row.getValue("transmission") as string
          return transmission === "automatic" ? "Automatique" : "Manuelle"
        },
      },
      {
        accessorKey: "pricePerDay",
        header: "Prix/jour",
        cell: ({ row }) => (
          <span className="font-medium">
            {new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "XOF",
            }).format(row.getValue("pricePerDay"))}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Statut",
        cell: ({ row }) => getStatusBadge(row.getValue("status")),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const vehicle = row.original

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Ouvrir le menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => editVehicle(vehicle)}>
                  <Edit2 className="mr-2 h-4 w-4" />
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  Voir détails
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toggleStatus(vehicle.id)}>
                  <ToggleLeft className="mr-2 h-4 w-4" />
                  {vehicle.status === "available" ? "Désactiver" : "Activer"}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Maintenance
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => deleteVehicle(vehicle.id)}
                  className="text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ],
    []
  )

  const stats = [
    {
      title: "Total véhicules",
      value: vehicles.length.toString(),
      icon: Car,
      color: "blue",
    },
    {
      title: "Disponibles",
      value: vehicles.filter(v => v.status === "available").length.toString(),
      icon: Car,
      color: "green",
    },
    {
      title: "En location",
      value: vehicles.filter(v => v.status === "rented").length.toString(),
      icon: Car,
      color: "blue",
    },
    {
      title: "En maintenance",
      value: vehicles.filter(v => v.status === "maintenance").length.toString(),
      icon: Car,
      color: "yellow",
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Gestion des véhicules
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gérez votre flotte de véhicules
            </p>
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingVehicle(null)}>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter véhicule
              </Button>
            </DialogTrigger>
            <VehicleFormModal
              vehicle={editingVehicle}
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false)
                setEditingVehicle(null)
              }}
              onSubmit={async (vehicleData) => {
                try {
                  if (editingVehicle) {
                    // Update existing vehicle
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/vehicles/${editingVehicle.id}`, {
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(vehicleData),
                    })

                    if (response.ok) {
                      const result = await response.json()
                      setVehicles(prev =>
                        prev.map(v =>
                          v.id === editingVehicle.id ? { ...v, ...result.data } : v
                        )
                      )
                    } else {
                      alert('Erreur lors de la mise à jour du véhicule')
                      return
                    }
                  } else {
                    // Add new vehicle
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/vehicles`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ ...vehicleData, status: "available" }),
                    })

                    if (response.ok) {
                      const result = await response.json()
                      setVehicles(prev => [...prev, result.data])
                    } else {
                      alert('Erreur lors de la création du véhicule')
                      return
                    }
                  }
                  
                  setIsModalOpen(false)
                  setEditingVehicle(null)
                } catch (error) {
                  console.error('Error saving vehicle:', error)
                  alert('Erreur lors de la sauvegarde du véhicule')
                }
              }}
            />
          </Dialog>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                    <stat.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Vehicles table */}
        <Card className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3">Chargement des véhicules...</span>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={vehicles}
              searchKey="name"
              searchPlaceholder="Rechercher un véhicule..."
            />
          )}
        </Card>
      </div>
    </AdminLayout>
  )
}