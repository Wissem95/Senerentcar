import { useState, useEffect } from 'react'
import { apiClient } from '@/lib/api'

export interface DashboardStats {
  totalRevenue: number
  totalBookings: number
  activeVehicles: number
  totalUsers: number
  revenueGrowth: number
  bookingGrowth: number
  vehicleUtilization: number
  customerSatisfaction: number
}

export interface RecentBooking {
  id: string
  bookingNumber: string
  customerName: string
  vehicleName: string
  startDate: string
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  totalAmount: number
}

export interface MaintenanceAlert {
  id: string
  vehicleName: string
  vehicleId: string
  alertType: 'maintenance_due' | 'insurance_expiry' | 'inspection_due'
  message: string
  dueDate: string
  priority: 'low' | 'medium' | 'high'
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await apiClient.get<DashboardStats>('/admin/dashboard/stats')
      setStats(response.data)
    } catch (err) {
      console.error('Error fetching dashboard stats:', err)
      setError('Impossible de charger les statistiques du dashboard.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return { stats, loading, error, refetch: fetchStats }
}

export function useRecentBookings(limit: number = 5) {
  const [bookings, setBookings] = useState<RecentBooking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecentBookings = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await apiClient.get<RecentBooking[]>(`/admin/bookings/recent?limit=${limit}`)
        setBookings(response.data)
      } catch (err) {
        console.error('Error fetching recent bookings:', err)
        setError('Impossible de charger les réservations récentes.')
      } finally {
        setLoading(false)
      }
    }

    fetchRecentBookings()
  }, [limit])

  return { bookings, loading, error }
}

export function useMaintenanceAlerts() {
  const [alerts, setAlerts] = useState<MaintenanceAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMaintenanceAlerts = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await apiClient.get<MaintenanceAlert[]>('/admin/maintenance/alerts')
        setAlerts(response.data)
      } catch (err) {
        console.error('Error fetching maintenance alerts:', err)
        setError('Impossible de charger les alertes de maintenance.')
      } finally {
        setLoading(false)
      }
    }

    fetchMaintenanceAlerts()
  }, [])

  return { alerts, loading, error }
}