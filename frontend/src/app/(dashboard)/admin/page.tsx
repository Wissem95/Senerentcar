"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Car,
  Calendar,
  Users,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"

import { AdminLayout } from "@/components/layouts/admin-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { DashboardChart } from "@/components/charts/dashboard-chart"
import { RecentBookings } from "@/components/admin/recent-bookings"
import { MaintenanceAlerts } from "@/components/admin/maintenance-alerts"

interface DashboardStats {
  totalRevenue: number
  totalBookings: number
  activeVehicles: number
  totalUsers: number
  revenueGrowth: number
  bookingGrowth: number
  vehicleUtilization: number
  customerSatisfaction: number
}

const mockStats: DashboardStats = {
  totalRevenue: 2850000,
  totalBookings: 156,
  activeVehicles: 24,
  totalUsers: 89,
  revenueGrowth: 12.5,
  bookingGrowth: 8.3,
  vehicleUtilization: 78.5,
  customerSatisfaction: 4.7,
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>(mockStats)
  const [loading, setLoading] = useState(false)

  const statsCards = [
    {
      title: "Revenus totaux",
      value: `${(stats.totalRevenue / 1000000).toFixed(2)}M FCFA`,
      change: `+${stats.revenueGrowth}%`,
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "vs mois dernier",
    },
    {
      title: "Réservations",
      value: stats.totalBookings.toString(),
      change: `+${stats.bookingGrowth}%`,
      changeType: "positive" as const,
      icon: Calendar,
      description: "ce mois",
    },
    {
      title: "Véhicules actifs",
      value: `${stats.activeVehicles}/26`,
      change: `${stats.vehicleUtilization}%`,
      changeType: "positive" as const,
      icon: Car,
      description: "taux d'utilisation",
    },
    {
      title: "Clients actifs",
      value: stats.totalUsers.toString(),
      change: "+15",
      changeType: "positive" as const,
      icon: Users,
      description: "nouveaux ce mois",
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Vue d'ensemble de votre activité de location
            </p>
          </div>
          <Button>
            Générer un rapport
          </Button>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between">
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
                </div>
                <div className="mt-4 flex items-center">
                  <Badge
                    variant={
                      stat.changeType === "positive"
                        ? "default"
                        : stat.changeType === "negative"
                        ? "destructive"
                        : "secondary"
                    }
                    className="mr-2"
                  >
                    {stat.change}
                  </Badge>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.description}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Revenus mensuels
            </h3>
            <DashboardChart type="revenue" />
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Véhicules populaires
            </h3>
            <DashboardChart type="vehicles" />
          </Card>
        </div>

        {/* Recent activity section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Réservations récentes
              </h3>
              <Button variant="outline" size="sm">
                Voir tout
              </Button>
            </div>
            <RecentBookings />
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Alertes maintenance
              </h3>
              <Badge variant="destructive" className="ml-2">
                3
              </Badge>
            </div>
            <MaintenanceAlerts />
          </Card>
        </div>

        {/* Quick actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Actions rapides
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button className="h-20 flex-col space-y-2">
              <Car className="h-6 w-6" />
              <span>Ajouter véhicule</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Calendar className="h-6 w-6" />
              <span>Nouvelle réservation</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Users className="h-6 w-6" />
              <span>Gestion clients</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <TrendingUp className="h-6 w-6" />
              <span>Rapports</span>
            </Button>
          </div>
        </Card>
      </div>
    </AdminLayout>
  )
}