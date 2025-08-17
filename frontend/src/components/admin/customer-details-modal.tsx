"use client"

import { useState } from "react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  TrendingUp,
  CreditCard,
  CheckCircle,
  Clock,
  Car,
  DollarSign,
} from "lucide-react"

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  dateOfBirth?: Date
  isVerified: boolean
  status: "active" | "inactive" | "suspended"
  totalBookings: number
  totalSpent: number
  avgRating: number
  lastBookingDate?: Date
  joinDate: Date
  driverLicenseNumber?: string
  driverLicenseExpiry?: Date
}

interface CustomerDetailsModalProps {
  customer: Customer
  isOpen: boolean
  onClose: () => void
}

// Mock data for booking history
const mockBookingHistory = [
  {
    id: "1",
    bookingNumber: "SRC-20250810-001",
    vehicleName: "Toyota Camry 2022",
    startDate: new Date("2025-08-10"),
    endDate: new Date("2025-08-15"),
    amount: 225000,
    status: "completed",
    rating: 5,
  },
  {
    id: "2",
    bookingNumber: "SRC-20250715-002",
    vehicleName: "Hyundai Tucson 2023",
    startDate: new Date("2025-07-15"),
    endDate: new Date("2025-07-20"),
    amount: 250000,
    status: "completed",
    rating: 4,
  },
  {
    id: "3",
    bookingNumber: "SRC-20250620-003",
    vehicleName: "Mercedes E-Class",
    startDate: new Date("2025-06-20"),
    endDate: new Date("2025-06-25"),
    amount: 400000,
    status: "completed",
    rating: 5,
  },
]

const getCustomerTier = (totalSpent: number) => {
  if (totalSpent >= 1500000) return { label: "Premium", color: "bg-purple-100 text-purple-800", icon: "👑" }
  if (totalSpent >= 800000) return { label: "Gold", color: "bg-yellow-100 text-yellow-800", icon: "🥇" }
  if (totalSpent >= 300000) return { label: "Silver", color: "bg-gray-100 text-gray-800", icon: "🥈" }
  return { label: "Bronze", color: "bg-orange-100 text-orange-800", icon: "🥉" }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-100 text-green-800">Terminée</Badge>
    case "confirmed":
      return <Badge className="bg-blue-100 text-blue-800">Confirmée</Badge>
    case "cancelled":
      return <Badge className="bg-red-100 text-red-800">Annulée</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export function CustomerDetailsModal({ customer, isOpen, onClose }: CustomerDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "bookings" | "documents">("overview")
  
  const tier = getCustomerTier(customer.totalSpent)
  const averageBookingValue = customer.totalBookings > 0 ? customer.totalSpent / customer.totalBookings : 0

  return (
    <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <div className="flex items-center space-x-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
            {customer.firstName[0]}{customer.lastName[0]}
          </div>
          <div>
            <DialogTitle className="text-2xl">
              {customer.firstName} {customer.lastName}
            </DialogTitle>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className={tier.color}>
                {tier.icon} {tier.label}
              </Badge>
              {customer.isVerified && (
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Vérifié
                </Badge>
              )}
              <Badge
                className={
                  customer.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }
              >
                {customer.status === "active" ? "Actif" : "Inactif"}
              </Badge>
            </div>
          </div>
        </div>
      </DialogHeader>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === "overview"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Aperçu
        </button>
        <button
          onClick={() => setActiveTab("bookings")}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === "bookings"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Historique réservations
        </button>
        <button
          onClick={() => setActiveTab("documents")}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === "documents"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Documents
        </button>
      </div>

      <div className="mt-6">
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Total réservations</p>
                    <p className="text-xl font-bold text-gray-900">{customer.totalBookings}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Total dépensé</p>
                    <p className="text-xl font-bold text-gray-900">
                      {new Intl.NumberFormat("fr-FR", {
                        style: "currency",
                        currency: "XOF",
                        notation: "compact",
                      }).format(customer.totalSpent)}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Panier moyen</p>
                    <p className="text-xl font-bold text-gray-900">
                      {new Intl.NumberFormat("fr-FR", {
                        style: "currency",
                        currency: "XOF",
                        notation: "compact",
                      }).format(averageBookingValue)}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-sm text-gray-600">Note moyenne</p>
                    <p className="text-xl font-bold text-gray-900">{customer.avgRating}/5</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Personal Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Informations personnelles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{customer.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Téléphone</p>
                      <p className="font-medium">{customer.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Ville</p>
                      <p className="font-medium">{customer.city}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {customer.dateOfBirth && (
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Date de naissance</p>
                        <p className="font-medium">
                          {format(customer.dateOfBirth, "dd MMMM yyyy", { locale: fr })}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Inscription</p>
                      <p className="font-medium">
                        {format(customer.joinDate, "dd MMMM yyyy", { locale: fr })}
                      </p>
                    </div>
                  </div>

                  {customer.lastBookingDate && (
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Dernière réservation</p>
                        <p className="font-medium">
                          {format(customer.lastBookingDate, "dd MMMM yyyy", { locale: fr })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Driver License */}
            {customer.driverLicenseNumber && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Permis de conduire
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Numéro de permis</p>
                    <p className="font-medium">{customer.driverLicenseNumber}</p>
                  </div>
                  {customer.driverLicenseExpiry && (
                    <div>
                      <p className="text-sm text-gray-600">Date d'expiration</p>
                      <p className="font-medium">
                        {format(customer.driverLicenseExpiry, "dd MMMM yyyy", { locale: fr })}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Historique des réservations
              </h3>
              <Badge variant="outline">
                {mockBookingHistory.length} réservation(s)
              </Badge>
            </div>

            <div className="space-y-4">
              {mockBookingHistory.map((booking) => (
                <Card key={booking.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                        <Car className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {booking.bookingNumber}
                          </p>
                          {getStatusBadge(booking.status)}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {booking.vehicleName}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {format(booking.startDate, "dd MMM", { locale: fr })} -{" "}
                          {format(booking.endDate, "dd MMM yyyy", { locale: fr })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {new Intl.NumberFormat("fr-FR", {
                          style: "currency",
                          currency: "XOF",
                        }).format(booking.amount)}
                      </p>
                      {booking.rating && (
                        <div className="flex items-center justify-end space-x-1 mt-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{booking.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "documents" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Documents
            </h3>
            <div className="text-center py-8">
              <p className="text-gray-500">Aucun document uploadé</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button variant="outline" onClick={onClose}>
          Fermer
        </Button>
        <Button>
          Modifier client
        </Button>
      </div>
    </DialogContent>
  )
}