"use client"

import { ReactNode } from "react"
import { LucideIcon } from "lucide-react"
import { Badge } from "./badge"

interface StatusConfig {
  label: string
  className: string
  icon?: LucideIcon
}

interface StatusBadgeProps {
  status: string
  config: Record<string, StatusConfig>
  icon?: boolean
}

export function StatusBadge({ status, config, icon = true }: StatusBadgeProps) {
  const statusConfig = config[status]
  
  if (!statusConfig) {
    return <Badge variant="outline">{status}</Badge>
  }

  const { label, className, icon: StatusIcon } = statusConfig

  return (
    <Badge className={className}>
      {icon && StatusIcon && <StatusIcon className="mr-1 h-3 w-3" />}
      {label}
    </Badge>
  )
}

// Predefined configurations
export const vehicleStatusConfig: Record<string, StatusConfig> = {
  available: {
    label: "Disponible",
    className: "bg-green-100 text-green-800",
  },
  rented: {
    label: "Loué", 
    className: "bg-blue-100 text-blue-800",
  },
  maintenance: {
    label: "Maintenance",
    className: "bg-yellow-100 text-yellow-800",
  },
  inactive: {
    label: "Inactif",
    className: "bg-red-100 text-red-800",
  },
}

export const bookingStatusConfig: Record<string, StatusConfig> = {
  pending: {
    label: "En attente",
    className: "bg-yellow-100 text-yellow-800",
  },
  confirmed: {
    label: "Confirmée",
    className: "bg-blue-100 text-blue-800",
  },
  in_progress: {
    label: "En cours",
    className: "bg-green-100 text-green-800",
  },
  completed: {
    label: "Terminée",
    className: "bg-gray-100 text-gray-800",
  },
  cancelled: {
    label: "Annulée",
    className: "bg-red-100 text-red-800",
  },
}

export const paymentStatusConfig: Record<string, StatusConfig> = {
  pending: {
    label: "En attente",
    className: "bg-yellow-100 text-yellow-800",
  },
  partial: {
    label: "Partiel",
    className: "bg-orange-100 text-orange-800",
  },
  paid: {
    label: "Payé",
    className: "bg-green-100 text-green-800",
  },
  failed: {
    label: "Échec",
    className: "bg-red-100 text-red-800",
  },
}

export const customerStatusConfig: Record<string, StatusConfig> = {
  active: {
    label: "Actif",
    className: "bg-green-100 text-green-800",
  },
  inactive: {
    label: "Inactif", 
    className: "bg-gray-100 text-gray-800",
  },
  suspended: {
    label: "Suspendu",
    className: "bg-red-100 text-red-800",
  },
}