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
  ] : []

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="p-6 sm:p-8 bg-white/80 backdrop-blur-sm shadow-xl border-0 min-h-[180px]">
                    <div className="animate-pulse">
                      <div className="flex items-center">
                        <div className="h-12 w-12 sm:h-14 sm:w-14 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex-shrink-0"></div>
                        <div className="ml-4 sm:ml-6 flex-1 min-w-0">
                          <div className="h-4 sm:h-5 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full w-3/4 mb-2 sm:mb-3"></div>
                          <div className="h-6 sm:h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full w-1/2"></div>
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-6">
                        <div className="h-4 sm:h-5 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full w-1/3"></div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full">
                {statsCards.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 120 }}
                  whileHover={{ scale: 1.02, y: -3 }}
                  className="group w-full"
                >
                  <Card className={`relative p-6 sm:p-8 ${stat.bgColor} dark:bg-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden h-full min-h-[180px] flex flex-col justify-between`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <div className="flex items-center w-full">
                          <div className={`flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg transform group-hover:scale-105 transition-transform duration-300 flex-shrink-0`}>
                            <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                          </div>
                          <div className="ml-4 sm:ml-6 flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide truncate">
                              {stat.title}
                            </p>
                            <p className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mt-1 truncate">
                              {stat.value}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <Badge
                          variant={
                            stat.changeType === "positive"
                              ? "default"
                              : stat.changeType === "negative"
                              ? "destructive"
                              : "secondary"
                          }
                          className={`px-2 sm:px-3 py-1 font-bold shadow-sm text-xs sm:text-sm ${stat.changeType === 'positive' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : ''} flex-shrink-0`}
                        >
                          {stat.change}
                        </Badge>
                        <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium truncate">
                          {stat.description}
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* Charts section */}
          <section className="w-full">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
              <Card className="p-6 sm:p-8 lg:p-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-xl border-0 h-full">
                <div className="flex items-center mb-6 sm:mb-8">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                    <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 dark:text-white">
                    📊 Revenus mensuels
                  </h3>
                </div>
                <div className="w-full overflow-hidden">
                  <DashboardChart type="revenue" />
                </div>
              </Card>
              
              <Card className="p-6 sm:p-8 lg:p-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-xl border-0 h-full">
                <div className="flex items-center mb-6 sm:mb-8">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                    <Car className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 dark:text-white">
                    🚗 Véhicules populaires
                  </h3>
                </div>
                <div className="w-full overflow-hidden">
                  <DashboardChart type="vehicles" />
                </div>
              </Card>
            </div>
          </section>

          {/* Recent activity section */}
          <section className="w-full">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
              <Card className="p-6 sm:p-8 lg:p-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-xl border-0 h-full">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-6">
                  <div className="flex items-center">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                      <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 dark:text-white">
                      📅 Réservations récentes
                    </h3>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full sm:w-auto border-amber-200 text-amber-600 hover:bg-amber-50 hover:border-amber-300 transition-all duration-300"
                  >
                    Voir tout
                  </Button>
                </div>
                <div className="w-full overflow-hidden">
                  <RecentBookings />
                </div>
              </Card>

              <Card className="p-6 sm:p-8 lg:p-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-xl border-0 h-full">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-6">
                  <div className="flex items-center">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 dark:text-white">
                      ⚠️ Alertes maintenance
                    </h3>
                  </div>
                  <Badge 
                    variant="destructive" 
                    className="bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg px-3 py-1 font-bold"
                  >
                    3
                  </Badge>
                </div>
                <div className="w-full overflow-hidden">
                  <MaintenanceAlerts />
                </div>
              </Card>
            </div>
          </section>

          {/* Quick actions */}
          <section className="w-full">
            <Card className="p-6 sm:p-8 lg:p-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-xl border-0">
              <div className="flex items-center mb-6 sm:mb-8 lg:mb-10">
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 dark:text-white">
                  ⚡ Actions rapides
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full">
                <Button className="h-20 sm:h-24 lg:h-28 flex-col space-y-2 sm:space-y-3 bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 w-full">
                  <Car className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
                  <span className="font-semibold text-sm sm:text-base lg:text-lg">🚗 Ajouter véhicule</span>
                </Button>
                <Button variant="outline" className="h-20 sm:h-24 lg:h-28 flex-col space-y-2 sm:space-y-3 border-2 border-amber-200 text-amber-600 hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-50 hover:border-amber-300 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full">
                  <Calendar className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
                  <span className="font-semibold text-sm sm:text-base lg:text-lg">📅 Nouvelle réservation</span>
                </Button>
                <Button variant="outline" className="h-20 sm:h-24 lg:h-28 flex-col space-y-2 sm:space-y-3 border-2 border-purple-200 text-purple-600 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 hover:border-purple-300 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full">
                  <Users className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
                  <span className="font-semibold text-sm sm:text-base lg:text-lg">👥 Gestion clients</span>
                </Button>
                <Button variant="outline" className="h-20 sm:h-24 lg:h-28 flex-col space-y-2 sm:space-y-3 border-2 border-blue-200 text-blue-600 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full">
                  <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
                  <span className="font-semibold text-sm sm:text-base lg:text-lg">📊 Rapports</span>
                </Button>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </AdminLayout>
  )
}