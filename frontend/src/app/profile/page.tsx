"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { 
  User, 
  Car, 
  Calendar, 
  CreditCard, 
  Settings, 
  Star,
  MapPin,
  Clock,
  Download,
  MessageCircle,
  Eye,
  Edit,
  History,
  Award,
  TrendingUp,
  Shield,
  ThumbsUp,
  FileText
} from "lucide-react"

import { MainLayout } from "@/components/layouts/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Currency } from "@/components/ui/currency"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReviewModal } from "@/components/ui/review-modal"
import { ReviewsList } from "@/components/ui/review-card"
import { useBookingNotifications } from "@/components/ui/notification-system"

interface BookingHistory {
  id: string
  booking_number: string
  vehicle_id: string
  vehicle?: {
    name: string
    image: string
    brand: string
    model: string
  }
  start_date: string
  end_date: string
  status: "completed" | "in_progress" | "cancelled" | "confirmed"
  total_amount: number
  pickup_location: string
  rating?: number
  canRate: boolean
  review_id?: string
}

interface UserProfile {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  address?: string
  city?: string
  date_of_birth?: string
  driver_license_number?: string
  driver_license_expiry?: string
  avatar?: string
  member_since: string
  loyalty_points: number
  loyalty_tier: "Bronze" | "Argent" | "Or" | "Platine"
}

interface UserReview {
  id: string
  rating: number
  comment: string
  created_at: string
  vehicle: {
    name: string
    brand: string
    model: string
  }
  booking: {
    booking_number: string
    start_date: string
    end_date: string
  }
  is_verified: boolean
  helpful_count: number
}

const mockProfile: UserProfile = {
  id: "1",
  first_name: "Amadou",
  last_name: "Diop",
  email: "amadou.diop@example.com",
  phone: "+221 77 123 45 67",
  address: "Sicap Liberté 6, Villa 123",
  city: "Dakar",
  date_of_birth: "1985-06-15",
  driver_license_number: "DK123456789",
  driver_license_expiry: "2027-06-15",
  member_since: "2023-03-15",
  loyalty_points: 2450,
  loyalty_tier: "Argent"
}

const mockBookings: BookingHistory[] = [
  {
    id: "1",
    booking_number: "SRC-20250110-001",
    vehicle_id: "1",
    vehicle: {
      name: "Toyota Corolla 2023",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=200&h=150&fit=crop&crop=center",
      brand: "Toyota",
      model: "Corolla"
    },
    start_date: "2025-01-10",
    end_date: "2025-01-15",
    status: "completed",
    total_amount: 75000,
    pickup_location: "Dakar",
    rating: 5,
    canRate: false,
    review_id: "r1"
  },
  {
    id: "2", 
    booking_number: "SRC-20241220-002",
    vehicle_id: "2",
    vehicle: {
      name: "Nissan Qashqai 2023",
      image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=200&h=150&fit=crop&crop=center",
      brand: "Nissan", 
      model: "Qashqai"
    },
    start_date: "2024-12-20",
    end_date: "2024-12-25",
    status: "completed",
    total_amount: 125000,
    pickup_location: "Thiès",
    rating: 4,
    canRate: false,
    review_id: "r2"
  },
  {
    id: "3",
    booking_number: "SRC-20250220-003",
    vehicle_id: "3",
    vehicle: {
      name: "Mercedes Classe C 2024",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=200&h=150&fit=crop&crop=center",
      brand: "Mercedes",
      model: "Classe C"
    },
    start_date: "2025-02-20",
    end_date: "2025-02-25",
    status: "confirmed",
    total_amount: 225000,
    pickup_location: "Dakar",
    canRate: false
  },
  {
    id: "4",
    booking_number: "SRC-20241115-004",
    vehicle_id: "4", 
    vehicle: {
      name: "Hyundai H1 2023",
      image: "https://images.unsplash.com/photo-1623074490371-1d0497caa8a6?w=200&h=150&fit=crop&crop=center",
      brand: "Hyundai",
      model: "H1"
    },
    start_date: "2024-11-15",
    end_date: "2024-11-20",
    status: "completed",
    total_amount: 175000,
    pickup_location: "Saint-Louis",
    canRate: true
  }
]

const mockReviews: UserReview[] = [
  {
    id: "r1",
    rating: 5,
    comment: "Excellente expérience ! Véhicule propre, service impeccable. Je recommande vivement Senerentcar pour vos déplacements au Sénégal.",
    created_at: "2025-01-16",
    vehicle: {
      name: "Toyota Corolla 2023",
      brand: "Toyota",
      model: "Corolla"
    },
    booking: {
      booking_number: "SRC-20250110-001",
      start_date: "2025-01-10",
      end_date: "2025-01-15"
    },
    is_verified: true,
    helpful_count: 3
  },
  {
    id: "r2",
    rating: 4,
    comment: "Très bon véhicule, confortable pour les longs trajets. Petit bémol sur l'heure de livraison qui a eu 30 minutes de retard.",
    created_at: "2024-12-26",
    vehicle: {
      name: "Nissan Qashqai 2023",
      brand: "Nissan",
      model: "Qashqai"
    },
    booking: {
      booking_number: "SRC-20241220-002",
      start_date: "2024-12-20",
      end_date: "2024-12-25"
    },
    is_verified: true,
    helpful_count: 1
  }
]

const loyaltyTiers = {
  Bronze: { minPoints: 0, color: "#CD7F32", benefits: ["Support prioritaire"] },
  Argent: { minPoints: 1000, color: "#C0C0C0", benefits: ["Réduction 5%", "Upgrade gratuit"] },
  Or: { minPoints: 5000, color: "#FFD700", benefits: ["Réduction 10%", "Livraison gratuite"] },
  Platine: { minPoints: 10000, color: "#E5E4E2", benefits: ["Réduction 15%", "Concierge dédié"] }
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(mockProfile)
  const [bookings, setBookings] = useState<BookingHistory[]>(mockBookings)
  const [reviews, setReviews] = useState<UserReview[]>(mockReviews)
  const [selectedBookingForReview, setSelectedBookingForReview] = useState<BookingHistory | null>(null)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const bookingNotifications = useBookingNotifications()

  const customerStats = {
    totalBookings: bookings.length,
    totalSpent: bookings.reduce((acc, booking) => acc + booking.total_amount, 0),
    averageRating: reviews.length > 0 ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : 0,
    favoriteLocation: "Dakar"
  }

  const getStatusBadge = (status: BookingHistory["status"]) => {
    const statusConfig = {
      completed: { label: "Terminée", variant: "success" as const },
      in_progress: { label: "En cours", variant: "default" as const },
      cancelled: { label: "Annulée", variant: "destructive" as const },
      confirmed: { label: "Confirmée", variant: "warning" as const }
    }
    
    return statusConfig[status] || { label: status, variant: "default" as const }
  }

  const handleReviewSubmit = () => {
    if (selectedBookingForReview) {
      setBookings(prev => 
        prev.map(booking => 
          booking.id === selectedBookingForReview.id 
            ? { ...booking, canRate: false, rating: 5 }
            : booking
        )
      )
      bookingNotifications.bookingConfirmed("Merci pour votre avis !")
      setSelectedBookingForReview(null)
    }
  }

  const generateInvoicePDF = (booking: BookingHistory) => {
    // En production, générer un vrai PDF
    const pdfContent = `
Facture Senerentcar
==================
Réservation: ${booking.booking_number}
Véhicule: ${booking.vehicle?.name}
Période: ${new Date(booking.start_date).toLocaleDateString()} - ${new Date(booking.end_date).toLocaleDateString()}
Montant: ${booking.total_amount.toLocaleString()} XOF
    `
    
    const blob = new Blob([pdfContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `facture-${booking.booking_number}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }


  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-senegal-green text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  {profile.first_name.charAt(0)}{profile.last_name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {profile.first_name} {profile.last_name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Membre depuis {new Date(profile.member_since).toLocaleDateString("fr-FR", { 
                      year: "numeric", 
                      month: "long" 
                    })}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge 
                      style={{ backgroundColor: loyaltyTiers[profile.loyalty_tier].color }}
                      className="text-white"
                    >
                      <Award className="w-3 h-3 mr-1" />
                      {profile.loyalty_tier}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {profile.loyalty_points} points fidélité
                    </span>
                  </div>
                </div>
              </div>
              
              <Button
                variant="outline"
                onClick={() => setIsEditingProfile(true)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Modifier le profil
              </Button>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Réservations</p>
                    <p className="text-2xl font-bold">{customerStats.totalBookings}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-senegal-green" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total dépensé</p>
                    <p className="text-2xl font-bold">
                      <Currency amount={customerStats.totalSpent} />
                    </p>
                  </div>
                  <CreditCard className="w-8 h-8 text-senegal-green" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Note moyenne</p>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold">{customerStats.averageRating.toFixed(1)}</p>
                      <Star className="w-5 h-5 fill-senegal-yellow text-senegal-yellow" />
                    </div>
                  </div>
                  <ThumbsUp className="w-8 h-8 text-senegal-green" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Lieu favori</p>
                    <p className="text-2xl font-bold">{customerStats.favoriteLocation}</p>
                  </div>
                  <MapPin className="w-8 h-8 text-senegal-green" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Content Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Tabs defaultValue="bookings" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="bookings">
                  <Calendar className="w-4 h-4 mr-2" />
                  Réservations
                </TabsTrigger>
                <TabsTrigger value="reviews">
                  <Star className="w-4 h-4 mr-2" />
                  Mes Avis
                </TabsTrigger>
                <TabsTrigger value="loyalty">
                  <Award className="w-4 h-4 mr-2" />
                  Fidélité
                </TabsTrigger>
                <TabsTrigger value="profile">
                  <User className="w-4 h-4 mr-2" />
                  Profil
                </TabsTrigger>
              </TabsList>

              {/* Bookings Tab */}
              <TabsContent value="bookings" className="space-y-4">
                {bookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-48 h-32 bg-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={booking.vehicle?.image}
                            alt={booking.vehicle?.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-semibold">{booking.vehicle?.name}</h3>
                              <p className="text-gray-600">#{booking.booking_number}</p>
                            </div>
                            <Badge {...getStatusBadge(booking.status)}>
                              {getStatusBadge(booking.status).label}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span>
                                {new Date(booking.start_date).toLocaleDateString("fr-FR")} - {" "}
                                {new Date(booking.end_date).toLocaleDateString("fr-FR")}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span>{booking.pickup_location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-4 h-4 text-gray-400" />
                              <Currency amount={booking.total_amount} />
                            </div>
                            {booking.rating && (
                              <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 fill-senegal-yellow text-senegal-yellow" />
                                <span>Note: {booking.rating}/5</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => generateInvoicePDF(booking)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Facture
                          </Button>
                          
                          {booking.canRate && (
                            <Button 
                              size="sm"
                              onClick={() => setSelectedBookingForReview(booking)}
                            >
                              <Star className="w-4 h-4 mr-2" />
                              Noter
                            </Button>
                          )}
                          
                          <Link href={`/vehicles/${booking.vehicle_id}`}>
                            <Button variant="ghost" size="sm" className="w-full">
                              <Eye className="w-4 h-4 mr-2" />
                              Détails
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Mes Évaluations ({reviews.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ReviewsList 
                      reviews={reviews}
                      showVehicle={true}
                      showUser={false}
                      emptyMessage="Vous n'avez pas encore d'avis. Réservez un véhicule pour laisser votre premier avis !"
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Loyalty Tab */}
              <TabsContent value="loyalty" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Programme Fidélité
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-senegal-green mb-2">
                          {profile.loyalty_points}
                        </div>
                        <p className="text-gray-600">Points fidélité</p>
                        <Badge 
                          style={{ backgroundColor: loyaltyTiers[profile.loyalty_tier].color }}
                          className="text-white mt-2"
                        >
                          Statut {profile.loyalty_tier}
                        </Badge>
                      </div>

                      <div className="space-y-4">
                        {Object.entries(loyaltyTiers).map(([tier, config]) => (
                          <div key={tier} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: config.color }}
                              />
                              <div>
                                <p className="font-medium">{tier}</p>
                                <p className="text-sm text-gray-600">
                                  {config.minPoints}+ points
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">
                                {config.benefits.join(", ")}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations Personnelles</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Prénom</label>
                        <p className="text-lg">{profile.first_name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Nom</label>
                        <p className="text-lg">{profile.last_name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <p className="text-lg">{profile.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Téléphone</label>
                        <p className="text-lg">{profile.phone}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Adresse</label>
                        <p className="text-lg">{profile.address}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Ville</label>
                        <p className="text-lg">{profile.city}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Review Modal */}
          {selectedBookingForReview && (
            <ReviewModal
              isOpen={!!selectedBookingForReview}
              onClose={() => setSelectedBookingForReview(null)}
              booking={selectedBookingForReview}
              onSuccess={handleReviewSubmit}
            />
          )}
        </div>
      </div>
    </MainLayout>
  )
}