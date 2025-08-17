export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  address?: string
  city?: string
  isVerified: boolean
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export enum UserRole {
  CLIENT = "client",
  ADMIN = "admin",
  MANAGER = "manager",
}

export interface Vehicle {
  id: string
  name: string
  brand: string
  model: string
  year: number
  category: VehicleCategory
  transmission: TransmissionType
  fuelType: FuelType
  seats: number
  doors: number
  airConditioning: boolean
  pricePerDay: number
  images: string[]
  description: string
  features: string[]
  isAvailable: boolean
  location: string
  createdAt: Date
  updatedAt: Date
}

export enum VehicleCategory {
  ECONOMY = "economy",
  COMPACT = "compact",
  STANDARD = "standard",
  PREMIUM = "premium",
  SUV = "suv",
  LUXURY = "luxury",
  VAN = "van",
}

export enum TransmissionType {
  MANUAL = "manual",
  AUTOMATIC = "automatic",
}

export enum FuelType {
  GASOLINE = "gasoline",
  DIESEL = "diesel",
  HYBRID = "hybrid",
  ELECTRIC = "electric",
}

export interface Booking {
  id: string
  userId: string
  vehicleId: string
  startDate: Date
  endDate: Date
  pickupLocation: string
  dropoffLocation: string
  totalAmount: number
  status: BookingStatus
  paymentStatus: PaymentStatus
  driverLicense: string
  additionalDrivers?: AdditionalDriver[]
  notes?: string
  createdAt: Date
  updatedAt: Date
  user?: User
  vehicle?: Vehicle
}

export interface AdditionalDriver {
  firstName: string
  lastName: string
  licenseNumber: string
  phone: string
}

export enum BookingStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum PaymentStatus {
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
  REFUNDED = "refunded",
}

export interface SearchFilters {
  location?: string
  startDate?: Date
  endDate?: Date
  category?: VehicleCategory
  transmission?: TransmissionType
  fuelType?: FuelType
  minPrice?: number
  maxPrice?: number
  seats?: number
  features?: string[]
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  accessToken: string
  refreshToken: string
}