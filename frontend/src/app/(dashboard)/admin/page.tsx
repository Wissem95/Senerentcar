"use client"

import React, { useState, useEffect, memo, Suspense } from "react"
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
import { useDashboardStats } from "@/hooks/useDashboard"

// Lazy load heavy components
const DashboardChart = React.lazy(() => import("@/components/charts/dashboard-chart").then(module => ({
  default: module.DashboardChart
})))
const RecentBookings = React.lazy(() => import("@/components/admin/recent-bookings").then(module => ({
  default: module.RecentBookings
})))
const MaintenanceAlerts = React.lazy(() => import("@/components/admin/maintenance-alerts").then(module => ({
  default: module.MaintenanceAlerts
})))


// Memoized stat card component
const StatCard = memo(({ stat, index }: { stat: any, index: number }) => (
  <Card className={`p-6 ${stat.bgColor} shadow-lg transition-shadow hover:shadow-xl border-0 h-full min-h-[180px]`}>
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center w-full">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} shadow-md flex-shrink-0`}>
          <stat.icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4 flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide truncate">
            {stat.title}
          </p>
          <p className="text-2xl font-bold text-slate-800 mt-1 truncate">
            {stat.value}
          </p>
        </div>
      </div>
    </div>
    <div className="flex items-center justify-between gap-2">
      <Badge
        variant={stat.changeType === "positive" ? "default" : "destructive"}
        className={`px-3 py-1 font-bold shadow-sm ${stat.changeType === 'positive' ? 'bg-emerald-100 text-emerald-700' : ''} flex-shrink-0`}
      >
        {stat.change}
      </Badge>
      <span className="text-sm text-slate-500 font-medium truncate">
        {stat.description}
      </span>
    </div>
  </Card>
))

StatCard.displayName = 'StatCard'

export default function AdminDashboard() {
  const { stats, loading, error } = useDashboardStats()

  const statsCards = React.useMemo(() => stats ? [
    {
      title: "Revenus totaux",
      value: `${(stats.totalRevenue / 1000000).toFixed(2)}M FCFA`,
      change: `+${stats.revenueGrowth}%`,
      changeType: stats.revenueGrowth >= 0 ? "positive" as const : "negative" as const,
      icon: TrendingUp,
      description: "vs mois dernier",
      gradient: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Réservations", 
      value: stats.totalBookings.toString(),
      change: `+${stats.bookingGrowth}%`,
      changeType: stats.bookingGrowth >= 0 ? "positive" as const : "negative" as const,
      icon: Calendar,
      description: "ce mois",
      gradient: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50",
    },
    {
      title: "Véhicules actifs",
      value: `${stats.activeVehicles}`,
      change: `${stats.vehicleUtilization}%`,
      changeType: "positive" as const,
      icon: Car,
      description: "taux d'utilisation", 
      gradient: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Clients actifs",
      value: stats.totalUsers.toString(),
      change: `${stats.customerSatisfaction}/5`,
      changeType: "positive" as const,
      icon: Users,
      description: "satisfaction client",
      gradient: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50",
    },
  ] : [], [stats])

  return (
    <AdminLayout>
      <div className="w-full bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="w-full max-w-none space-y-6 sm:space-y-8">
          {/* Page header */}
          <section className="w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-slate-200/50 dark:border-slate-700/50 gap-4 sm:gap-6">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Dashboard Admin
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm sm:text-base lg:text-lg">
                  Vue d'ensemble complète de votre activité de location de véhicules
                </p>
              </div>
              <Button className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-6 py-3">
                📊 Générer un rapport
              </Button>
            </div>
          </section>

          {/* Error State */}
          {error && (
            <Card className="p-8 bg-gradient-to-br from-red-50 to-rose-100 border-red-200 shadow-xl">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">
                  ⚠️ Erreur de chargement
                </h3>
                <p className="text-red-700 mb-8 text-lg">
                  {error}
                </p>
                <Button 
                  onClick={() => window.location.reload()}
                  className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  🔄 Réessayer
                </Button>
              </div>
            </Card>
          )}

          {/* Stats cards */}
          <section className="w-full">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="p-6 bg-white/80 shadow-lg border-0 min-h-[180px]">
                    <div className="animate-pulse">
                      <div className="flex items-center">
                        <div className="h-12 w-12 bg-gray-200 rounded-xl flex-shrink-0"></div>
                        <div className="ml-4 flex-1 min-w-0">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat, index) => (
                  <StatCard key={stat.title} stat={stat} index={index} />
                ))}
              </div>
            )}
          </section>

          {/* Charts section */}
          <section className="w-full">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card className="p-8 bg-white/80 shadow-lg border-0 h-full">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">
                    📊 Revenus mensuels
                  </h3>
                </div>
                <Suspense fallback={<div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>}>
                  <DashboardChart type="revenue" />
                </Suspense>
              </Card>
              
              <Card className="p-8 bg-white/80 shadow-lg border-0 h-full">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <Car className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">
                    🚗 Véhicules populaires
                  </h3>
                </div>
                <Suspense fallback={<div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>}>
                  <DashboardChart type="vehicles" />
                </Suspense>
              </Card>
            </div>
          </section>

          {/* Recent activity section */}
          <section className="w-full">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card className="p-8 bg-white/80 shadow-lg border-0 h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="h-12 w-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">
                      📅 Réservations récentes
                    </h3>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-amber-200 text-amber-600 hover:bg-amber-50"
                  >
                    Voir tout
                  </Button>
                </div>
                <Suspense fallback={<div className="h-48 bg-gray-100 rounded-lg animate-pulse"></div>}>
                  <RecentBookings />
                </Suspense>
              </Card>

              <Card className="p-8 bg-white/80 shadow-lg border-0 h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="h-12 w-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <AlertTriangle className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">
                      ⚠️ Alertes maintenance
                    </h3>
                  </div>
                  <Badge variant="destructive" className="bg-red-500 text-white px-3 py-1 font-bold">
                    3
                  </Badge>
                </div>
                <Suspense fallback={<div className="h-48 bg-gray-100 rounded-lg animate-pulse"></div>}>
                  <MaintenanceAlerts />
                </Suspense>
              </Card>
            </div>
          </section>

          {/* Quick actions */}
          <section className="w-full">
            <Card className="p-8 bg-white/80 shadow-lg border-0">
              <div className="flex items-center mb-8">
                <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">
                  ⚡ Actions rapides
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Button className="h-24 flex-col space-y-3 bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 border-0">
                  <Car className="h-7 w-7" />
                  <span className="font-semibold">🚗 Ajouter véhicule</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col space-y-3 border-amber-200 text-amber-600 hover:bg-amber-50 hover:border-amber-300 shadow-lg hover:shadow-xl transition-all duration-200">
                  <Calendar className="h-7 w-7" />
                  <span className="font-semibold">📅 Nouvelle réservation</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col space-y-3 border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 shadow-lg hover:shadow-xl transition-all duration-200">
                  <Users className="h-7 w-7" />
                  <span className="font-semibold">👥 Gestion clients</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col space-y-3 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all duration-200">
                  <TrendingUp className="h-7 w-7" />
                  <span className="font-semibold">📊 Rapports</span>
                </Button>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </AdminLayout>
  )
}