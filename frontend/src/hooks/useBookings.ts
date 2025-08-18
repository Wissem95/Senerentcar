import { useState, useEffect } from 'react'
import { apiClient, endpoints } from '@/lib/api'

export interface Booking {
  id: string
  bookingNumber: string
  customerName: string
  customerEmail: string
  vehicleName: string
  vehicleId: string
  startDate: Date
  endDate: Date
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  totalAmount: number
  pickupLocation: string
  dropoffLocation: string
  paymentStatus: 'pending' | 'partial' | 'paid' | 'failed'
  createdAt: Date
  updatedAt: Date
}

interface UseBookingsOptions {
  status?: string
  customerEmail?: string
  dateFrom?: Date
  dateTo?: Date
  page?: number
  limit?: number
}

interface UseBookingsReturn {
  bookings: Booking[]
  loading: boolean
  error: string | null
  totalCount: number
  currentPage: number
  totalPages: number
  refetch: () => void
}

export function useBookings(options: UseBookingsOptions = {}): UseBookingsReturn {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(options.page || 1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchBookings = async () => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      
      if (options.status && options.status !== 'all') {
        params.append('status', options.status)
      }
      if (options.customerEmail) {
        params.append('customer_email', options.customerEmail)
      }
      if (options.dateFrom) {
        params.append('date_from', options.dateFrom.toISOString())
      }
      if (options.dateTo) {
        params.append('date_to', options.dateTo.toISOString())
      }
      
      params.append('page', (options.page || 1).toString())
      params.append('limit', (options.limit || 20).toString())

      const response = await apiClient.getPaginated<Booking>(
        `${endpoints.bookings.list}?${params.toString()}`
      )

      // Convert date strings to Date objects
      const bookingsWithDates = response.data.map(booking => ({
        ...booking,
        startDate: new Date(booking.startDate),
        endDate: new Date(booking.endDate),
        createdAt: new Date(booking.createdAt),
        updatedAt: new Date(booking.updatedAt)
      }))

      setBookings(bookingsWithDates)
      setTotalCount(response.meta.total)
      setCurrentPage(response.meta.current_page)
      setTotalPages(response.meta.last_page)
    } catch (err) {
      console.error('Error fetching bookings:', err)
      setError('Impossible de charger les réservations. Veuillez réessayer.')
      setBookings([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [
    options.status,
    options.customerEmail,
    options.dateFrom?.getTime(),
    options.dateTo?.getTime(),
    options.page,
    options.limit
  ])

  return {
    bookings,
    loading,
    error,
    totalCount,
    currentPage,
    totalPages,
    refetch: fetchBookings
  }
}

export function useBooking(id: string) {
  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBooking = async () => {
      if (!id) return

      setLoading(true)
      setError(null)

      try {
        const response = await apiClient.get<Booking>(endpoints.bookings.details(id))
        const bookingWithDates = {
          ...response.data,
          startDate: new Date(response.data.startDate),
          endDate: new Date(response.data.endDate),
          createdAt: new Date(response.data.createdAt),
          updatedAt: new Date(response.data.updatedAt)
        }
        setBooking(bookingWithDates)
      } catch (err) {
        console.error('Error fetching booking:', err)
        setError('Impossible de charger les détails de la réservation.')
        setBooking(null)
      } finally {
        setLoading(false)
      }
    }

    fetchBooking()
  }, [id])

  return { booking, loading, error }
}

export function useCreateBooking() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createBooking = async (bookingData: Partial<Booking>) => {
    setLoading(true)
    setError(null)

    try {
      const response = await apiClient.post<Booking>(endpoints.bookings.create, bookingData)
      return response.data
    } catch (err) {
      console.error('Error creating booking:', err)
      setError('Impossible de créer la réservation. Veuillez réessayer.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { createBooking, loading, error }
}

export function useUpdateBookingStatus() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateStatus = async (bookingId: string, status: Booking['status']) => {
    setLoading(true)
    setError(null)

    try {
      const response = await apiClient.patch<Booking>(
        endpoints.bookings.details(bookingId),
        { status }
      )
      return response.data
    } catch (err) {
      console.error('Error updating booking status:', err)
      setError('Impossible de mettre à jour le statut de la réservation.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { updateStatus, loading, error }
}

export function useCancelBooking() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const cancelBooking = async (bookingId: string, reason?: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await apiClient.post<Booking>(
        endpoints.bookings.cancel(bookingId),
        { reason }
      )
      return response.data
    } catch (err) {
      console.error('Error cancelling booking:', err)
      setError('Impossible d\'annuler la réservation.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { cancelBooking, loading, error }
}