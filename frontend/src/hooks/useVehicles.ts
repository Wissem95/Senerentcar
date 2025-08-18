import { useState, useEffect } from 'react'
import { apiClient, endpoints } from '@/lib/api'
import { Vehicle } from '@/types'

interface UseVehiclesOptions {
  category?: string
  location?: string
  priceMin?: number
  priceMax?: number
  transmission?: string
  fuelType?: string
  seats?: string
  page?: number
  limit?: number
}

interface UseVehiclesReturn {
  vehicles: Vehicle[]
  loading: boolean
  error: string | null
  totalCount: number
  currentPage: number
  totalPages: number
  refetch: () => void
}

export function useVehicles(options: UseVehiclesOptions = {}): UseVehiclesReturn {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(options.page || 1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchVehicles = async () => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      
      if (options.category && options.category !== 'all') {
        params.append('category', options.category)
      }
      if (options.location && options.location !== 'all') {
        params.append('location', options.location)
      }
      if (options.priceMin) {
        params.append('price_min', options.priceMin.toString())
      }
      if (options.priceMax) {
        params.append('price_max', options.priceMax.toString())
      }
      if (options.transmission && options.transmission !== 'all') {
        params.append('transmission', options.transmission)
      }
      if (options.fuelType && options.fuelType !== 'all') {
        params.append('fuel_type', options.fuelType)
      }
      if (options.seats && options.seats !== 'all') {
        params.append('seats', options.seats)
      }
      
      params.append('page', (options.page || 1).toString())
      params.append('limit', (options.limit || 20).toString())

      const response = await apiClient.getPaginated<Vehicle>(
        `${endpoints.vehicles.list}?${params.toString()}`
      )

      setVehicles(response.data)
      setTotalCount(response.meta.total)
      setCurrentPage(response.meta.current_page)
      setTotalPages(response.meta.last_page)
    } catch (err) {
      console.error('Error fetching vehicles:', err)
      setError('Impossible de charger les véhicules. Veuillez réessayer.')
      setVehicles([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVehicles()
  }, [
    options.category,
    options.location,
    options.priceMin,
    options.priceMax,
    options.transmission,
    options.fuelType,
    options.seats,
    options.page,
    options.limit
  ])

  return {
    vehicles,
    loading,
    error,
    totalCount,
    currentPage,
    totalPages,
    refetch: fetchVehicles
  }
}

export function useVehicle(id: string) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVehicle = async () => {
      if (!id) return

      setLoading(true)
      setError(null)

      try {
        const response = await apiClient.get<Vehicle>(endpoints.vehicles.details(id))
        setVehicle(response.data)
      } catch (err) {
        console.error('Error fetching vehicle:', err)
        setError('Impossible de charger les détails du véhicule.')
        setVehicle(null)
      } finally {
        setLoading(false)
      }
    }

    fetchVehicle()
  }, [id])

  return { vehicle, loading, error }
}

export function useVehicleAvailability(id: string, startDate?: Date, endDate?: Date) {
  const [availability, setAvailability] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkAvailability = async () => {
    if (!id || !startDate || !endDate) return

    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString()
      })

      const response = await apiClient.get<{ available: boolean }>(
        `${endpoints.vehicles.availability(id)}?${params.toString()}`
      )
      
      setAvailability(response.data.available)
    } catch (err) {
      console.error('Error checking availability:', err)
      setError('Impossible de vérifier la disponibilité.')
      setAvailability(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAvailability()
  }, [id, startDate?.getTime(), endDate?.getTime()])

  return { availability, loading, error, checkAvailability }
}