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
import { useDashboardStats } from "@/hooks/useDashboard"


export default function AdminDashboard() {
  const { stats, loading, error } = useDashboardStats()

  const statsCards = stats ? [
    {
      title: "Revenus totaux",
      value: `${(stats.totalRevenue / 1000000).toFixed(2)}M FCFA`,
      change: `+${stats.revenueGrowth}%`,
      changeType: stats.revenueGrowth >= 0 ? "positive" as const : "negative" as const,
      icon: TrendingUp,
      description: "vs mois dernier",
    },
    {
      title: "Réservations",
      value: stats.totalBookings.toString(),
      change: `+${stats.bookingGrowth}%`,
      changeType: stats.bookingGrowth >= 0 ? "positive" as const : "negative" as const,
      icon: Calendar,
      description: "ce mois",
    },
    {
      title: "Véhicules actifs",
      value: `${stats.activeVehicles}`,
      change: `${stats.vehicleUtilization}%`,
      changeType: "positive" as const,
      icon: Car,
      description: "taux d'utilisation",
    },
    {
      title: "Clients actifs",
      value: stats.totalUsers.toString(),
      change: `${stats.customerSatisfaction}/5`,
      changeType: "positive" as const,
      icon: Users,
      description: "satisfaction client",
    },
  ] : []

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

        {/* Error State */}
        {error && (
          <Card className="p-6">
            <div className="text-center">
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
              <Button onClick={() => window.location.reload()}>
                Réessayer
              </Button>
            </div>
          </Card>
        )}

        {/* Stats cards */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-6">
                <div className="animate-pulse">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                    <div className="ml-4 flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
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
        )}

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