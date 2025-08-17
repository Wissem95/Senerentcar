"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Car, 
  Wrench, 
  Calendar, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Plus,
  Filter,
  Search,
  Download,
  Settings,
  Clock,
  User,
  MapPin,
  Euro,
  FileText,
  TrendingUp,
  BarChart3,
  PieChart
} from "lucide-react"

import { AdminLayout } from "@/components/layouts/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Currency } from "@/components/ui/currency"

interface MaintenanceRecord {
  id: string
  vehicle_id: string
  vehicle: {
    name: string
    license_plate: string
    model: string
    brand: string
    image: string
  }
  type: "preventive" | "corrective" | "urgent"
  status: "scheduled" | "in_progress" | "completed" | "cancelled"
  service_type: string
  description: string
  scheduled_date: string
  completed_date?: string
  technician?: string
  garage: string
  cost?: number
  mileage: number
  next_service_date?: string
  notes?: string
  priority: "low" | "medium" | "high" | "urgent"
}

interface MaintenanceStats {
  totalRecords: number
  scheduledToday: number
  inProgress: number
  overdue: number
  totalCost: number
  avgCostPerVehicle: number
  topIssues: Array<{
    type: string
    count: number
    avgCost: number
  }>
}

const mockMaintenanceRecords: MaintenanceRecord[] = [
  {
    id: "1",
    vehicle_id: "1",
    vehicle: {
      name: "Toyota Corolla 2023",
      license_plate: "DK-123-AB",
      model: "Corolla",
      brand: "Toyota",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=200&h=150&fit=crop&crop=center"
    },
    type: "preventive",
    status: "scheduled",
    service_type: "Vidange moteur",
    description: "Changement huile moteur + filtre",
    scheduled_date: "2025-01-20",
    technician: "Moussa Faye",
    garage: "Garage Plateau",
    cost: 35000,
    mileage: 15000,
    next_service_date: "2025-04-20",
    priority: "medium"
  },
  {
    id: "2",
    vehicle_id: "2",
    vehicle: {
      name: "Nissan Qashqai 2023",
      license_plate: "DK-456-CD",
      model: "Qashqai",
      brand: "Nissan",
      image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=200&h=150&fit=crop&crop=center"
    },
    type: "corrective",
    status: "in_progress",
    service_type: "Réparation freins",
    description: "Remplacement plaquettes frein avant",
    scheduled_date: "2025-01-18",
    technician: "Ibrahima Ndiaye",
    garage: "Auto Service Dakar",
    cost: 85000,
    mileage: 22000,
    priority: "high"
  },
  {
    id: "3",
    vehicle_id: "3",
    vehicle: {
      name: "Mercedes Classe C 2024",
      license_plate: "DK-789-EF",
      model: "Classe C",
      brand: "Mercedes",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=200&h=150&fit=crop&crop=center"
    },
    type: "preventive",
    status: "completed",
    service_type: "Révision complète",
    description: "Révision 20,000 km - tous fluides",
    scheduled_date: "2025-01-15",
    completed_date: "2025-01-15",
    technician: "Abdou Sarr",
    garage: "Mercedes Dakar",
    cost: 150000,
    mileage: 20000,
    next_service_date: "2025-07-15",
    priority: "medium"
  },
  {
    id: "4",
    vehicle_id: "4",
    vehicle: {
      name: "Hyundai H1 2023",
      license_plate: "DK-012-GH",
      model: "H1",
      brand: "Hyundai",
      image: "https://images.unsplash.com/photo-1623074490371-1d0497caa8a6?w=200&h=150&fit=crop&crop=center"
    },
    type: "urgent",
    status: "scheduled",
    service_type: "Panne moteur",
    description: "Diagnostic et réparation urgente",
    scheduled_date: "2025-01-19",
    technician: "Omar Ba",
    garage: "SOS Auto",
    mileage: 18500,
    priority: "urgent"
  }
]

const mockStats: MaintenanceStats = {
  totalRecords: 24,
  scheduledToday: 3,
  inProgress: 2,
  overdue: 1,
  totalCost: 890000,
  avgCostPerVehicle: 74166,
  topIssues: [
    { type: "Vidange moteur", count: 8, avgCost: 35000 },
    { type: "Réparation freins", count: 5, avgCost: 75000 },
    { type: "Pneus", count: 4, avgCost: 120000 },
    { type: "Climatisation", count: 3, avgCost: 65000 }
  ]
}

export default function MaintenancePage() {
  const [records, setRecords] = useState<MaintenanceRecord[]>(mockMaintenanceRecords)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [selectedRecord, setSelectedRecord] = useState<MaintenanceRecord | null>(null)

  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.vehicle.license_plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.service_type.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || record.status === statusFilter
    const matchesType = typeFilter === "all" || record.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: MaintenanceRecord["status"]) => {
    const statusConfig = {
      scheduled: { label: "Programmé", variant: "warning" as const },
      in_progress: { label: "En cours", variant: "default" as const },
      completed: { label: "Terminé", variant: "success" as const },
      cancelled: { label: "Annulé", variant: "destructive" as const }
    }
    return statusConfig[status] || { label: status, variant: "default" as const }
  }

  const getPriorityBadge = (priority: MaintenanceRecord["priority"]) => {
    const priorityConfig = {
      low: { label: "Faible", variant: "secondary" as const },
      medium: { label: "Moyen", variant: "warning" as const },
      high: { label: "Élevé", variant: "destructive" as const },
      urgent: { label: "Urgent", variant: "destructive" as const }
    }
    return priorityConfig[priority] || { label: priority, variant: "default" as const }
  }

  const getTypeIcon = (type: MaintenanceRecord["type"]) => {
    switch (type) {
      case "preventive":
        return <Calendar className="w-4 h-4" />
      case "corrective":
        return <Wrench className="w-4 h-4" />
      case "urgent":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Settings className="w-4 h-4" />
    }
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold">Maintenance des Véhicules</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gestion complète de la maintenance de la flotte
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle maintenance
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Aujourd'hui</p>
                  <p className="text-2xl font-bold">{mockStats.scheduledToday}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">En cours</p>
                  <p className="text-2xl font-bold">{mockStats.inProgress}</p>
                </div>
                <Wrench className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">En retard</p>
                  <p className="text-2xl font-bold text-red-600">{mockStats.overdue}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Coût total</p>
                  <p className="text-2xl font-bold">
                    <Currency amount={mockStats.totalCost} notation="compact" />
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="records" className="space-y-6">
            <TabsList>
              <TabsTrigger value="records">
                <FileText className="w-4 h-4 mr-2" />
                Interventions
              </TabsTrigger>
              <TabsTrigger value="analytics">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analyses
              </TabsTrigger>
              <TabsTrigger value="planning">
                <Calendar className="w-4 h-4 mr-2" />
                Planification
              </TabsTrigger>
            </TabsList>

            {/* Records Tab */}
            <TabsContent value="records" className="space-y-6">
              {/* Filters */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                        <Input
                          placeholder="Rechercher par véhicule, plaque ou type..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les statuts</SelectItem>
                        <SelectItem value="scheduled">Programmé</SelectItem>
                        <SelectItem value="in_progress">En cours</SelectItem>
                        <SelectItem value="completed">Terminé</SelectItem>
                        <SelectItem value="cancelled">Annulé</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les types</SelectItem>
                        <SelectItem value="preventive">Préventif</SelectItem>
                        <SelectItem value="corrective">Correctif</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Records List */}
              <div className="space-y-4">
                {filteredRecords.map((record) => (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group"
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row gap-6">
                          {/* Vehicle Info */}
                          <div className="flex items-center gap-4">
                            <img
                              src={record.vehicle.image}
                              alt={record.vehicle.name}
                              className="w-16 h-12 object-cover rounded-lg"
                            />
                            <div>
                              <h3 className="font-semibold">{record.vehicle.name}</h3>
                              <p className="text-sm text-gray-600">{record.vehicle.license_plate}</p>
                            </div>
                          </div>

                          {/* Service Info */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  {getTypeIcon(record.type)}
                                  <h4 className="font-medium">{record.service_type}</h4>
                                </div>
                                <p className="text-sm text-gray-600">{record.description}</p>
                              </div>
                              <div className="flex gap-2">
                                <Badge {...getStatusBadge(record.status)}>
                                  {getStatusBadge(record.status).label}
                                </Badge>
                                <Badge {...getPriorityBadge(record.priority)}>
                                  {getPriorityBadge(record.priority).label}
                                </Badge>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <div>
                                  <p className="text-gray-600">Programmé</p>
                                  <p className="font-medium">
                                    {new Date(record.scheduled_date).toLocaleDateString("fr-FR")}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-gray-400" />
                                <div>
                                  <p className="text-gray-600">Technicien</p>
                                  <p className="font-medium">{record.technician || "Non assigné"}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <div>
                                  <p className="text-gray-600">Garage</p>
                                  <p className="font-medium">{record.garage}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <Euro className="w-4 h-4 text-gray-400" />
                                <div>
                                  <p className="text-gray-600">Coût</p>
                                  <p className="font-medium">
                                    {record.cost ? <Currency amount={record.cost} /> : "À définir"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col gap-2">
                            <Button variant="outline" size="sm">
                              <FileText className="w-4 h-4 mr-2" />
                              Détails
                            </Button>
                            {record.status === "scheduled" && (
                              <Button size="sm">
                                <Wrench className="w-4 h-4 mr-2" />
                                Commencer
                              </Button>
                            )}
                            {record.status === "in_progress" && (
                              <Button size="sm" variant="outline">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Terminer
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Issues */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="w-5 h-5" />
                      Types d'interventions les plus fréquents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockStats.topIssues.map((issue, index) => (
                        <div key={issue.type} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-senegal-green text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium">{issue.type}</p>
                              <p className="text-sm text-gray-600">{issue.count} interventions</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              <Currency amount={issue.avgCost} />
                            </p>
                            <p className="text-sm text-gray-600">coût moyen</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Cost Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Analyse des coûts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-senegal-green mb-2">
                          <Currency amount={mockStats.totalCost} />
                        </div>
                        <p className="text-gray-600">Coût total maintenance</p>
                      </div>

                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-2">
                          <Currency amount={mockStats.avgCostPerVehicle} />
                        </div>
                        <p className="text-gray-600">Coût moyen par véhicule</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Préventif</span>
                          <span className="font-medium">65%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }} />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Correctif</span>
                          <span className="font-medium">30%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{ width: '30%' }} />
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Urgent</span>
                          <span className="font-medium">5%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: '5%' }} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Planning Tab */}
            <TabsContent value="planning" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Planification des maintenances</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Calendrier de maintenance</h3>
                    <p className="text-gray-600 mb-4">
                      Cette fonctionnalité sera disponible prochainement
                    </p>
                    <Button variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Planifier une maintenance
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </AdminLayout>
  )
}