"use client"

import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Calendar, User, Car, Clock } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface RecentBooking {
  id: string
  bookingNumber: string
  customerName: string
  vehicleName: string
  startDate: Date
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled"
  totalAmount: number
}

const mockBookings: RecentBooking[] = [
  {
    id: "1",
    bookingNumber: "SRC-20250815-0001",
    customerName: "Amadou Diallo",
    vehicleName: "Toyota Camry 2022",
    startDate: new Date("2025-08-20"),
    status: "confirmed",
    totalAmount: 225000,
  },
  {
    id: "2",
    bookingNumber: "SRC-20250815-0002",
    customerName: "Fatou Sow",
    vehicleName: "Hyundai Tucson 2023",
    startDate: new Date("2025-08-18"),
    status: "pending",
    totalAmount: 350000,
  },
  {
    id: "3",
    bookingNumber: "SRC-20250815-0003",
    customerName: "Ousmane Ba",
    vehicleName: "Mercedes E-Class",
    startDate: new Date("2025-08-16"),
    status: "in_progress",
    totalAmount: 500000,
  },
  {
    id: "4",
    bookingNumber: "SRC-20250815-0004",
    customerName: "Awa Ndiaye",
    vehicleName: "Renault Clio 2022",
    startDate: new Date("2025-08-14"),
    status: "completed",
    totalAmount: 125000,
  },
]

const getStatusColor = (status: RecentBooking["status"]) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "confirmed":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "in_progress":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "completed":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    case "cancelled":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusText = (status: RecentBooking["status"]) => {
  switch (status) {
    case "pending":
      return "En attente"
    case "confirmed":
      return "Confirmée"
    case "in_progress":
      return "En cours"
    case "completed":
      return "Terminée"
    case "cancelled":
      return "Annulée"
    default:
      return status
  }
}

export function RecentBookings() {
  return (
    <div className="space-y-4">
      {mockBookings.map((booking) => (
        <div
          key={booking.id}
          className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="flex items-center space-x-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
              <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {booking.bookingNumber}
                </p>
                <Badge className={getStatusColor(booking.status)}>
                  {getStatusText(booking.status)}
                </Badge>
              </div>
              
              <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <User className="h-3 w-3" />
                  <span>{booking.customerName}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Car className="h-3 w-3" />
                  <span>{booking.vehicleName}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>
                    {format(booking.startDate, "dd MMM yyyy", { locale: fr })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "XOF",
              }).format(booking.totalAmount)}
            </p>
            <Button variant="ghost" size="sm" className="mt-1 h-6 px-2 text-xs">
              Voir détails
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}