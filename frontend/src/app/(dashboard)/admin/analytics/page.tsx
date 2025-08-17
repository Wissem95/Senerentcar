"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatsCard } from "@/components/ui/stats-card"
import { PageHeader } from "@/components/ui/page-header"
import { AdminLayout } from "@/components/layouts/admin-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Car, 
  CreditCard,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  DollarSign,
  Activity,
  Target,
  Award,
  MapPin,
  Clock
} from "lucide-react"
import {
  Line,
  Bar,
  Doughnut,
  Radar
} from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler
} from "chart.js"
import { apiClient } from "@/lib/api"

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler
)

interface AnalyticsData {
  revenue: {
    total: number
    growth: number
    daily: { date: string; amount: number }[]
    monthly: { month: string; amount: number }[]
  }
  bookings: {
    total: number
    active: number
    completed: number
    cancelled: number
    byStatus: { status: string; count: number }[]
    trend: { date: string; count: number }[]
  }
  vehicles: {
    total: number
    available: number
    rented: number
    maintenance: number
    byCategory: { category: string; count: number; revenue: number }[]
    utilization: { vehicle: string; rate: number }[]
  }
  customers: {
    total: number
    active: number
    new: number
    retention: number
    byLocation: { city: string; count: number }[]
    satisfaction: number
  }
  performance: {
    conversionRate: number
    averageBookingValue: number
    averageRentalDuration: number
    peakHours: { hour: number; bookings: number }[]
    popularRoutes: { from: string; to: string; count: number }[]
  }
}

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'year'>('month')
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    fetchAnalytics()
  }, [dateRange])

  const fetchAnalytics = async () => {
    setIsLoading(true)
    try {
      // Simuler les données analytics
      // En production, ceci viendrait de l'API Laravel
      const mockData: AnalyticsData = {
        revenue: {
          total: 12450000,
          growth: 15.3,
          daily: Array.from({ length: 30 }, (_, i) => ({
            date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
            amount: Math.floor(300000 + Math.random() * 200000)
          })),
          monthly: [
            { month: "Jan", amount: 8500000 },
            { month: "Fév", amount: 9200000 },
            { month: "Mar", amount: 10100000 },
            { month: "Avr", amount: 9800000 },
            { month: "Mai", amount: 11200000 },
            { month: "Juin", amount: 12450000 }
          ]
        },
        bookings: {
          total: 845,
          active: 42,
          completed: 756,
          cancelled: 47,
          byStatus: [
            { status: "Confirmées", count: 756 },
            { status: "En cours", count: 42 },
            { status: "Annulées", count: 47 }
          ],
          trend: Array.from({ length: 7 }, (_, i) => ({
            date: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"][i],
            count: Math.floor(100 + Math.random() * 50)
          }))
        },
        vehicles: {
          total: 125,
          available: 78,
          rented: 42,
          maintenance: 5,
          byCategory: [
            { category: "Économique", count: 35, revenue: 3200000 },
            { category: "Compacte", count: 28, revenue: 2800000 },
            { category: "SUV", count: 25, revenue: 4100000 },
            { category: "Luxe", count: 15, revenue: 2350000 },
            { category: "Utilitaire", count: 22, revenue: 1800000 }
          ],
          utilization: [
            { vehicle: "Toyota Corolla", rate: 92 },
            { vehicle: "Renault Duster", rate: 88 },
            { vehicle: "Hyundai Tucson", rate: 85 },
            { vehicle: "Mercedes C-Class", rate: 78 },
            { vehicle: "Ford Transit", rate: 72 }
          ]
        },
        customers: {
          total: 3245,
          active: 892,
          new: 156,
          retention: 78.5,
          byLocation: [
            { city: "Dakar", count: 1845 },
            { city: "Thiès", count: 425 },
            { city: "Saint-Louis", count: 312 },
            { city: "Ziguinchor", count: 284 },
            { city: "Autres", count: 379 }
          ],
          satisfaction: 4.6
        },
        performance: {
          conversionRate: 34.2,
          averageBookingValue: 75000,
          averageRentalDuration: 4.5,
          peakHours: [
            { hour: 9, bookings: 45 },
            { hour: 10, bookings: 62 },
            { hour: 11, bookings: 58 },
            { hour: 14, bookings: 71 },
            { hour: 15, bookings: 68 },
            { hour: 16, bookings: 52 },
            { hour: 17, bookings: 48 }
          ],
          popularRoutes: [
            { from: "Aéroport LSS", to: "Dakar Centre", count: 234 },
            { from: "Dakar", to: "Saly", count: 189 },
            { from: "Dakar", to: "Saint-Louis", count: 156 },
            { from: "Dakar", to: "Thiès", count: 142 }
          ]
        }
      }
      
      setAnalytics(mockData)
    } catch (error) {
      console.error("Erreur chargement analytics:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await fetchAnalytics()
    setIsRefreshing(false)
  }

  const handleExportData = () => {
    // En production, générer un CSV ou Excel
    const csvContent = "data:text/csv;charset=utf-8,"
      + "Métrique,Valeur\n"
      + `Revenus Total,${analytics?.revenue.total}\n`
      + `Réservations Total,${analytics?.bookings.total}\n`
      + `Clients Total,${analytics?.customers.total}\n`
      + `Véhicules Total,${analytics?.vehicles.total}\n`
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `analytics_${new Date().toISOString()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-senegal-green"></div>
        </div>
      </AdminLayout>
    )
  }

  if (!analytics) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p>Erreur lors du chargement des données</p>
        </div>
      </AdminLayout>
    )
  }

  // Configuration des graphiques
  const revenueChartData = {
    labels: analytics.revenue.monthly.map(m => m.month),
    datasets: [
      {
        label: 'Revenus (XOF)',
        data: analytics.revenue.monthly.map(m => m.amount),
        borderColor: '#00853D',
        backgroundColor: 'rgba(0, 133, 61, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  }

  const bookingsTrendData = {
    labels: analytics.bookings.trend.map(b => b.date),
    datasets: [
      {
        label: 'Réservations',
        data: analytics.bookings.trend.map(b => b.count),
        backgroundColor: '#FDEF42',
        borderColor: '#00853D',
        borderWidth: 2
      }
    ]
  }

  const vehicleCategoryData = {
    labels: analytics.vehicles.byCategory.map(v => v.category),
    datasets: [
      {
        label: 'Revenus par catégorie',
        data: analytics.vehicles.byCategory.map(v => v.revenue),
        backgroundColor: [
          '#00853D',
          '#FDEF42',
          '#E31E24',
          '#006A31',
          '#F8E600'
        ],
        borderWidth: 0
      }
    ]
  }

  const customerLocationData = {
    labels: analytics.customers.byLocation.map(c => c.city),
    datasets: [
      {
        label: 'Clients',
        data: analytics.customers.byLocation.map(c => c.count),
        backgroundColor: 'rgba(0, 133, 61, 0.7)',
        borderColor: '#00853D',
        borderWidth: 1,
        pointBackgroundColor: '#00853D',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#00853D'
      }
    ]
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <PageHeader
            title="Analytics & Rapports"
            description="Analyse complète des performances de Senerentcar"
          />
          
          <div className="flex items-center gap-2">
            {/* Sélecteur période */}
            <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              {(['week', 'month', 'year'] as const).map((range) => (
                <Button
                  key={range}
                  variant={dateRange === range ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setDateRange(range)}
                  className="capitalize"
                >
                  {range === 'week' ? 'Semaine' : range === 'month' ? 'Mois' : 'Année'}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Actualiser
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExportData}
            >
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>

        {/* KPIs principaux */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Revenus Total"
            value={`${(analytics.revenue.total / 1000000).toFixed(1)}M XOF`}
            change={`+${analytics.revenue.growth}% vs mois dernier`}
            changeType={analytics.revenue.growth > 0 ? "positive" : "negative"}
            icon={DollarSign}
            color="green"
          />
          
          <StatsCard
            title="Réservations"
            value={analytics.bookings.total.toString()}
            change={`${analytics.bookings.active} actives`}
            changeType="positive"
            icon={Calendar}
            color="blue"
          />
          
          <StatsCard
            title="Clients"
            value={analytics.customers.total.toLocaleString()}
            change={`+${analytics.customers.new} nouveaux`}
            changeType="positive"
            icon={Users}
            color="purple"
          />
          
          <StatsCard
            title="Véhicules"
            value={`${analytics.vehicles.available}/${analytics.vehicles.total}`}
            change="Disponibles"
            changeType="neutral"
            icon={Car}
            color="yellow"
          />
        </div>

        {/* Graphiques principaux */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Évolution revenus */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Évolution des Revenus</span>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Line 
                data={revenueChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          return `${(context.parsed.y / 1000000).toFixed(1)}M XOF`
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      ticks: {
                        callback: (value) => `${(Number(value) / 1000000).toFixed(0)}M`
                      }
                    }
                  }
                }}
                height={200}
              />
            </CardContent>
          </Card>

          {/* Tendance réservations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Tendance Réservations</span>
                <Activity className="w-5 h-5 text-blue-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Bar 
                data={bookingsTrendData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false }
                  }
                }}
                height={200}
              />
            </CardContent>
          </Card>
        </div>

        {/* Métriques détaillées */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Répartition par catégorie */}
          <Card>
            <CardHeader>
              <CardTitle>Revenus par Catégorie</CardTitle>
            </CardHeader>
            <CardContent>
              <Doughnut 
                data={vehicleCategoryData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        padding: 10,
                        font: { size: 11 }
                      }
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          const value = context.parsed
                          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
                          const percentage = ((value / total) * 100).toFixed(1)
                          return `${context.label}: ${percentage}% (${(value / 1000000).toFixed(1)}M XOF)`
                        }
                      }
                    }
                  }
                }}
              />
            </CardContent>
          </Card>

          {/* Clients par ville */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Répartition Géographique
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analytics.customers.byLocation.map((location) => {
                  const percentage = (location.count / analytics.customers.total) * 100
                  return (
                    <div key={location.city}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{location.city}</span>
                        <span className="font-medium">{location.count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-senegal-green h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Top véhicules */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                Top Véhicules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analytics.vehicles.utilization.map((vehicle, index) => (
                  <div key={vehicle.vehicle} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-400">
                        #{index + 1}
                      </span>
                      <span className="text-sm">{vehicle.vehicle}</span>
                    </div>
                    <Badge 
                      variant={vehicle.rate > 85 ? "success" : vehicle.rate > 70 ? "warning" : "default"}
                    >
                      {vehicle.rate}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Métriques de performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Indicateurs de Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Taux de Conversion</p>
                <p className="text-2xl font-bold text-senegal-green">
                  {analytics.performance.conversionRate}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Valeur Moyenne</p>
                <p className="text-2xl font-bold">
                  {(analytics.performance.averageBookingValue / 1000).toFixed(0)}K XOF
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Durée Moyenne</p>
                <p className="text-2xl font-bold">
                  {analytics.performance.averageRentalDuration} jours
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Satisfaction Client</p>
                <div className="flex items-center gap-1">
                  <p className="text-2xl font-bold text-senegal-yellow">
                    {analytics.customers.satisfaction}
                  </p>
                  <span className="text-senegal-yellow">★</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Routes populaires */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Routes Populaires
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analytics.performance.popularRoutes.map((route, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">#{index + 1}</Badge>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{route.from}</span>
                      <span className="text-gray-400">→</span>
                      <span className="font-medium">{route.to}</span>
                    </div>
                  </div>
                  <Badge variant="secondary">{route.count} trajets</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}