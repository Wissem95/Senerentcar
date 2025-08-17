"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Calendar,
  User,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Car,
  Clock,
  MapPin,
  Phone,
  Mail,
  IdCard,
  Shield
} from "lucide-react"

import { MainLayout } from "@/components/layouts/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/ui/date-picker"
import { PriceCalculator } from "@/components/ui/price-calculator"
import { Stepper, useStepper, type Step } from "@/components/ui/stepper"
import { Currency } from "@/components/ui/currency"
import { Badge } from "@/components/ui/badge"
import { PaymentForm } from "@/components/ui/payment-form"
import { Vehicle, VehicleCategory, TransmissionType, FuelType } from "@/types"

// Schemas de validation
const datesSchema = z.object({
  startDate: z.date({ message: "La date de début est requise" }),
  endDate: z.date({ message: "La date de fin est requise" }),
  pickupLocation: z.string().min(1, "Le lieu de prise en charge est requis"),
  dropoffLocation: z.string().min(1, "Le lieu de retour est requis"),
}).refine(
  (data) => data.endDate > data.startDate,
  {
    message: "La date de fin doit être après la date de début",
    path: ["endDate"],
  }
)

const customerSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  dateOfBirth: z.date({ message: "La date de naissance est requise" }),
  address: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
  city: z.string().min(2, "La ville est requise"),
  driverLicenseNumber: z.string().min(5, "Numéro de permis invalide"),
  driverLicenseExpiry: z.date({ message: "Date d'expiration du permis requise" }),
})

const paymentSchema = z.object({
  paymentMethod: z.enum(["card", "orange_money", "wave", "bank_transfer"]),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
  cardholderName: z.string().optional(),
})

type DatesFormData = z.infer<typeof datesSchema>
type CustomerFormData = z.infer<typeof customerSchema>
type PaymentFormData = z.infer<typeof paymentSchema>

// Mock vehicle data
const mockVehicle: Vehicle = {
  id: "1",
  name: "Toyota Corolla",
  brand: "Toyota",
  model: "Corolla",
  year: 2023,
  category: VehicleCategory.ECONOMY,
  transmission: TransmissionType.AUTOMATIC,
  fuelType: FuelType.GASOLINE,
  seats: 5,
  doors: 5,
  airConditioning: true,
  pricePerDay: 15000,
  images: ["https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop&crop=center"],
  description: "Toyota Corolla économique et fiable",
  features: ["Climatisation", "Direction assistée", "Bluetooth"],
  isAvailable: true,
  location: "Dakar",
  createdAt: new Date(),
  updatedAt: new Date()
}

const bookingSteps: Step[] = [
  {
    id: "dates",
    title: "Dates & Lieux",
    description: "Sélectionnez vos dates et lieux",
    icon: Calendar
  },
  {
    id: "customer",
    title: "Vos informations",
    description: "Renseignez vos données",
    icon: User
  },
  {
    id: "summary",
    title: "Récapitulatif",
    description: "Vérifiez votre réservation",
    icon: CheckCircle
  },
  {
    id: "payment",
    title: "Paiement",
    description: "Finalisez votre réservation",
    icon: CreditCard
  },
  {
    id: "confirmation",
    title: "Confirmation",
    description: "Réservation confirmée",
    icon: CheckCircle
  }
]

export default function BookingPage() {
  const params = useParams()
  const router = useRouter()
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [loading, setLoading] = useState(true)
  const [bookingData, setBookingData] = useState<{
    dates?: DatesFormData
    customer?: CustomerFormData
    payment?: PaymentFormData
    priceBreakdown?: any
    bookingConfirmation?: any
  }>({})

  const {
    currentStep,
    completedSteps,
    nextStep,
    prevStep,
    completeCurrentStep,
    canGoNext,
    canGoPrev,
    getCurrentStepIndex
  } = useStepper(bookingSteps)

  // Fetch vehicle data
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/vehicles/${params.vehicleId}`)
        if (response.ok) {
          const result = await response.json()
          setVehicle(result.data)
        } else {
          // Fallback to mock data if API fails
          setVehicle(mockVehicle)
        }
      } catch (error) {
        console.error('Error fetching vehicle:', error)
        // Fallback to mock data
        setVehicle(mockVehicle)
      } finally {
        setLoading(false)
      }
    }

    fetchVehicle()
  }, [params.vehicleId])

  // Forms
  const datesForm = useForm<DatesFormData>({
    resolver: zodResolver(datesSchema)
  })

  const customerForm = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema)
  })

  const paymentForm = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { paymentMethod: "card" }
  })

  const handleDatesSubmit = (data: DatesFormData) => {
    setBookingData(prev => ({ ...prev, dates: data }))
    completeCurrentStep()
    nextStep()
  }

  const handleCustomerSubmit = (data: CustomerFormData) => {
    setBookingData(prev => ({ ...prev, customer: data }))
    completeCurrentStep()
    nextStep()
  }

  const handleSummaryNext = () => {
    completeCurrentStep()
    nextStep()
  }

  const handlePaymentSubmit = async (data: PaymentFormData) => {
    setBookingData(prev => ({ ...prev, payment: data }))
    
    try {
      // Create booking on backend
      const bookingPayload = {
        vehicleId: params.vehicleId,
        startDate: bookingData.dates?.startDate?.toISOString(),
        endDate: bookingData.dates?.endDate?.toISOString(),
        pickupLocation: bookingData.dates?.pickupLocation,
        dropoffLocation: bookingData.dates?.dropoffLocation,
        totalAmount: bookingData.priceBreakdown?.total || 0,
        customerInfo: bookingData.customer,
        paymentMethod: data.paymentMethod,
        paymentStatus: 'paid'
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(bookingPayload),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la création de la réservation')
      }

      const result = await response.json()
      
      // Store booking confirmation
      setBookingData(prev => ({ ...prev, bookingConfirmation: result.data }))
      
      completeCurrentStep()
      nextStep()
    } catch (error) {
      console.error('Booking error:', error)
      alert('Erreur lors de la finalisation de votre réservation. Veuillez réessayer.')
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case "dates":
        return (
          <form onSubmit={datesForm.handleSubmit(handleDatesSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Date de début</Label>
                <DatePicker
                  value={datesForm.watch("startDate")}
                  onChange={(date) => datesForm.setValue("startDate", date!)}
                  minDate={new Date()}
                />
                {datesForm.formState.errors.startDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {datesForm.formState.errors.startDate.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Date de fin</Label>
                <DatePicker
                  value={datesForm.watch("endDate")}
                  onChange={(date) => datesForm.setValue("endDate", date!)}
                  minDate={datesForm.watch("startDate") || new Date()}
                />
                {datesForm.formState.errors.endDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {datesForm.formState.errors.endDate.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Lieu de prise en charge</Label>
                <select
                  {...datesForm.register("pickupLocation")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Sélectionner un lieu</option>
                  <option value="aeroport-dakar">Aéroport Dakar</option>
                  <option value="centre-ville-dakar">Centre-ville Dakar</option>
                  <option value="plateau-dakar">Plateau Dakar</option>
                  <option value="thies">Thiès</option>
                </select>
                {datesForm.formState.errors.pickupLocation && (
                  <p className="text-red-500 text-sm mt-1">
                    {datesForm.formState.errors.pickupLocation.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Lieu de retour</Label>
                <select
                  {...datesForm.register("dropoffLocation")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Sélectionner un lieu</option>
                  <option value="aeroport-dakar">Aéroport Dakar</option>
                  <option value="centre-ville-dakar">Centre-ville Dakar</option>
                  <option value="plateau-dakar">Plateau Dakar</option>
                  <option value="thies">Thiès</option>
                </select>
                {datesForm.formState.errors.dropoffLocation && (
                  <p className="text-red-500 text-sm mt-1">
                    {datesForm.formState.errors.dropoffLocation.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="px-8">
                Continuer
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </form>
        )

      case "customer":
        return (
          <form onSubmit={customerForm.handleSubmit(handleCustomerSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Prénom</Label>
                <Input {...customerForm.register("firstName")} placeholder="Votre prénom" />
                {customerForm.formState.errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {customerForm.formState.errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Nom</Label>
                <Input {...customerForm.register("lastName")} placeholder="Votre nom" />
                {customerForm.formState.errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {customerForm.formState.errors.lastName.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Email</Label>
                <Input {...customerForm.register("email")} type="email" placeholder="votre@email.com" />
                {customerForm.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {customerForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Téléphone</Label>
                <Input {...customerForm.register("phone")} placeholder="+221 77 123 45 67" />
                {customerForm.formState.errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {customerForm.formState.errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Date de naissance</Label>
                <DatePicker
                  value={customerForm.watch("dateOfBirth")}
                  onChange={(date) => customerForm.setValue("dateOfBirth", date!)}
                  maxDate={new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate())}
                />
                {customerForm.formState.errors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1">
                    {customerForm.formState.errors.dateOfBirth.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Numéro de permis</Label>
                <Input {...customerForm.register("driverLicenseNumber")} placeholder="SN123456789" />
                {customerForm.formState.errors.driverLicenseNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {customerForm.formState.errors.driverLicenseNumber.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label>Adresse complète</Label>
              <Input {...customerForm.register("address")} placeholder="Votre adresse complète" />
              {customerForm.formState.errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {customerForm.formState.errors.address.message}
                </p>
              )}
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 w-4 h-4" />
                Retour
              </Button>
              <Button type="submit" className="px-8">
                Continuer
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </form>
        )

      case "summary":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Véhicule */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Car className="w-5 h-5" />
                      Véhicule sélectionné
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <img
                        src={vehicle.images[0]}
                        alt={vehicle.name}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-semibold">{vehicle.name}</h3>
                        <p className="text-gray-600">{vehicle.year} • {vehicle.seats} places</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Dates et lieux */}
                {bookingData.dates && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Dates et lieux
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-600">Début</p>
                            <p className="font-medium">
                              {bookingData.dates.startDate.toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-600">Fin</p>
                            <p className="font-medium">
                              {bookingData.dates.endDate.toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-600">Prise en charge</p>
                            <p className="font-medium">{bookingData.dates.pickupLocation}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-600">Retour</p>
                            <p className="font-medium">{bookingData.dates.dropoffLocation}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Informations client */}
                {bookingData.customer && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Vos informations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-600">Nom complet</p>
                            <p className="font-medium">
                              {bookingData.customer.firstName} {bookingData.customer.lastName}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="font-medium">{bookingData.customer.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-600">Téléphone</p>
                            <p className="font-medium">{bookingData.customer.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <IdCard className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-600">Permis de conduire</p>
                            <p className="font-medium">{bookingData.customer.driverLicenseNumber}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Calcul des prix */}
              <div>
                {bookingData.dates && (
                  <PriceCalculator
                    pricePerDay={vehicle.pricePerDay}
                    startDate={bookingData.dates.startDate}
                    endDate={bookingData.dates.endDate}
                    onPriceChange={(breakdown) => 
                      setBookingData(prev => ({ ...prev, priceBreakdown: breakdown }))
                    }
                  />
                )}
              </div>
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 w-4 h-4" />
                Retour
              </Button>
              <Button onClick={handleSummaryNext} className="px-8">
                Procéder au paiement
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )

      case "payment":
        return (
          <PaymentForm
            amount={bookingData.priceBreakdown?.total || 0}
            onSubmit={async (data) => {
              setBookingData(prev => ({ ...prev, payment: data }))
              // Simulate payment processing
              await new Promise(resolve => setTimeout(resolve, 2000))
              completeCurrentStep()
              nextStep()
            }}
            onBack={prevStep}
          />
        )

      case "confirmation":
        return (
          <div className="text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center"
            >
              <CheckCircle className="w-10 h-10 text-green-600" />
            </motion.div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Réservation confirmée !
              </h2>
              <p className="text-gray-600">
                Votre réservation a été enregistrée avec succès
              </p>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Numéro de réservation :</span>
                    <Badge>
                      {bookingData.bookingConfirmation?.id || `SRC-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`}
                    </Badge>
                  </div>
                  {bookingData.priceBreakdown && (
                    <div className="flex justify-between font-semibold">
                      <span>Montant payé :</span>
                      <Currency amount={bookingData.priceBreakdown.total} />
                    </div>
                  )}
                  {bookingData.customer && (
                    <div className="flex justify-between">
                      <span>Email de confirmation :</span>
                      <span className="text-senegal-green">{bookingData.customer.email}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Un email de confirmation a été envoyé à {bookingData.customer?.email}
              </p>
              <p className="text-sm text-gray-600">
                Notre équipe vous contactera 24h avant la prise en charge
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={() => router.push('/profile')} className="px-8">
                  Voir mes réservations
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => router.push('/catalogue')} 
                  className="px-8"
                >
                  Nouvelle réservation
                </Button>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="bg-gray-50 min-h-screen py-8">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }

  if (!vehicle) {
    return (
      <MainLayout>
        <div className="bg-gray-50 min-h-screen py-8">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Véhicule non trouvé
              </h1>
              <p className="text-gray-600 mb-8">
                Le véhicule que vous cherchez n'existe pas ou n'est plus disponible.
              </p>
              <Button onClick={() => router.push('/catalogue')}>
                Retour au catalogue
              </Button>
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </button>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Réserver {vehicle.name}
            </h1>
            <p className="text-gray-600">
              Complétez votre réservation en {bookingSteps.length} étapes simples
            </p>
          </div>

          {/* Stepper */}
          <div className="mb-8">
            <Stepper
              steps={bookingSteps}
              currentStep={currentStep}
              completedSteps={completedSteps}
            />
          </div>

          {/* Step Content */}
          <Card>
            <CardHeader>
              <CardTitle>
                {bookingSteps.find(step => step.id === currentStep)?.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}