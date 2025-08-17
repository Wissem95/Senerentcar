"use client"

import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { AlertTriangle, Car, Calendar, Wrench } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface MaintenanceAlert {
  id: string
  vehicleName: string
  licensePlate: string
  alertType: "overdue" | "upcoming" | "critical"
  description: string
  dueDate: Date
  mileage?: number
  priority: "low" | "medium" | "high" | "critical"
}

const mockAlerts: MaintenanceAlert[] = [
  {
    id: "1",
    vehicleName: "Honda CR-V 2022",
    licensePlate: "DK-9999-QR",
    alertType: "critical",
    description: "Vidange moteur en retard",
    dueDate: new Date("2025-08-10"),
    mileage: 22000,
    priority: "critical",
  },
  {
    id: "2",
    vehicleName: "Toyota Land Cruiser",
    licensePlate: "DK-5555-IJ",
    alertType: "overdue",
    description: "Contrôle technique expiré",
    dueDate: new Date("2025-08-05"),
    priority: "high",
  },
  {
    id: "3",
    vehicleName: "Ford Transit",
    licensePlate: "DK-8888-OP",
    alertType: "upcoming",
    description: "Révision générale prévue",
    dueDate: new Date("2025-08-25"),
    mileage: 45000,
    priority: "medium",
  },
]

const getAlertColor = (alertType: MaintenanceAlert["alertType"]) => {
  switch (alertType) {
    case "critical":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    case "overdue":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
    case "upcoming":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getAlertText = (alertType: MaintenanceAlert["alertType"]) => {
  switch (alertType) {
    case "critical":
      return "Critique"
    case "overdue":
      return "En retard"
    case "upcoming":
      return "À venir"
    default:
      return alertType
  }
}

const getPriorityIcon = (priority: MaintenanceAlert["priority"]) => {
  switch (priority) {
    case "critical":
      return <AlertTriangle className="h-4 w-4 text-red-600" />
    case "high":
      return <AlertTriangle className="h-4 w-4 text-orange-600" />
    case "medium":
      return <Wrench className="h-4 w-4 text-yellow-600" />
    case "low":
      return <Wrench className="h-4 w-4 text-green-600" />
    default:
      return <Wrench className="h-4 w-4 text-gray-600" />
  }
}

export function MaintenanceAlerts() {
  return (
    <div className="space-y-4">
      {mockAlerts.map((alert) => (
        <div
          key={alert.id}
          className="flex items-start justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="flex items-start space-x-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900">
              {getPriorityIcon(alert.priority)}
            </div>
            
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {alert.vehicleName}
                </p>
                <Badge className={getAlertColor(alert.alertType)}>
                  {getAlertText(alert.alertType)}
                </Badge>
              </div>
              
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {alert.description}
              </p>
              
              <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Car className="h-3 w-3" />
                  <span>{alert.licensePlate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {format(alert.dueDate, "dd MMM yyyy", { locale: fr })}
                  </span>
                </div>
                {alert.mileage && (
                  <span>{alert.mileage.toLocaleString()} km</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-1">
            <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
              Programmer
            </Button>
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
              Détails
            </Button>
          </div>
        </div>
      ))}
      
      {mockAlerts.length === 0 && (
        <div className="text-center py-8">
          <Wrench className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">
            Aucune alerte de maintenance
          </p>
        </div>
      )}
    </div>
  )
}