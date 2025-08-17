"use client"

import { Star, User, Calendar, Car, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Review {
  id: string
  rating: number
  comment: string
  created_at: string
  vehicle?: {
    name: string
    brand: string
    model: string
  }
  user?: {
    first_name: string
    last_name: string
    avatar?: string
  }
  booking?: {
    booking_number: string
    start_date: string
    end_date: string
  }
  is_verified?: boolean
  helpful_count?: number
}

interface ReviewCardProps {
  review: Review
  showVehicle?: boolean
  showUser?: boolean
  compact?: boolean
  className?: string
}

export function ReviewCard({ 
  review, 
  showVehicle = false, 
  showUser = true, 
  compact = false,
  className 
}: ReviewCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={cn(
          "w-4 h-4",
          index < rating 
            ? "fill-senegal-yellow text-senegal-yellow" 
            : "text-gray-300"
        )}
      />
    ))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  if (compact) {
    return (
      <div className={cn("p-4 border-b border-gray-100 dark:border-gray-800 last:border-b-0", className)}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {renderStars(review.rating)}
            </div>
            {review.is_verified && (
              <Badge variant="secondary" className="text-xs">
                <CheckCircle className="w-3 h-3 mr-1" />
                Vérifié
              </Badge>
            )}
          </div>
          <span className="text-xs text-gray-500">
            {formatDate(review.created_at)}
          </span>
        </div>
        
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
          {review.comment}
        </p>
        
        {showUser && review.user && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <User className="w-3 h-3" />
            <span>{review.user.first_name} {review.user.last_name.charAt(0)}.</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {showUser && review.user && (
              <div className="flex items-center gap-3">
                {review.user.avatar ? (
                  <img
                    src={review.user.avatar}
                    alt={`${review.user.first_name} ${review.user.last_name}`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-senegal-green text-white rounded-full flex items-center justify-center font-medium">
                    {getInitials(review.user.first_name, review.user.last_name)}
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {review.user.first_name} {review.user.last_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Client vérifié
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-1 mb-1">
              {renderStars(review.rating)}
            </div>
            <p className="text-xs text-gray-500">
              {formatDate(review.created_at)}
            </p>
          </div>
        </div>

        {/* Vehicle Info */}
        {showVehicle && review.vehicle && (
          <div className="flex items-center gap-2 mb-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Car className="w-4 h-4 text-senegal-green" />
            <span className="text-sm font-medium">
              {review.vehicle.name}
            </span>
            <span className="text-xs text-gray-500">
              ({review.vehicle.brand} {review.vehicle.model})
            </span>
          </div>
        )}

        {/* Booking Info */}
        {review.booking && (
          <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <span>Réservation #{review.booking.booking_number}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>
                {new Date(review.booking.start_date).toLocaleDateString("fr-FR")} - {" "}
                {new Date(review.booking.end_date).toLocaleDateString("fr-FR")}
              </span>
            </div>
          </div>
        )}

        {/* Comment */}
        <div className="mb-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {review.comment}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {review.is_verified && (
              <Badge variant="success" className="text-xs">
                <CheckCircle className="w-3 h-3 mr-1" />
                Avis vérifié
              </Badge>
            )}
          </div>
          
          {review.helpful_count && review.helpful_count > 0 && (
            <div className="text-xs text-gray-500">
              {review.helpful_count} personne{review.helpful_count > 1 ? "s" : ""} ont trouvé cet avis utile
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface ReviewsListProps {
  reviews: Review[]
  showVehicle?: boolean
  showUser?: boolean
  compact?: boolean
  className?: string
  emptyMessage?: string
}

export function ReviewsList({ 
  reviews, 
  showVehicle = false, 
  showUser = true, 
  compact = false,
  className,
  emptyMessage = "Aucun avis pour le moment"
}: ReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    )
  }

  if (compact) {
    return (
      <Card className={className}>
        <CardContent className="p-0">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              showVehicle={showVehicle}
              showUser={showUser}
              compact={true}
            />
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={cn("space-y-4", className)}>
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          showVehicle={showVehicle}
          showUser={showUser}
        />
      ))}
    </div>
  )
}

interface ReviewsSummaryProps {
  reviews: Review[]
  className?: string
}

export function ReviewsSummary({ reviews, className }: ReviewsSummaryProps) {
  if (reviews.length === 0) {
    return null
  }

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100
  }))

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Average Rating */}
          <div className="text-center">
            <div className="text-4xl font-bold text-senegal-green mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex justify-center gap-1 mb-2">
              {renderStars(Math.round(averageRating))}
            </div>
            <p className="text-sm text-gray-600">
              Basé sur {reviews.length} avis client{reviews.length > 1 ? "s" : ""}
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-2 text-sm">
                <span className="w-8">{rating}</span>
                <Star className="w-4 h-4 fill-senegal-yellow text-senegal-yellow" />
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-senegal-green h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-8 text-gray-500">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Helper function to render stars (exported for reuse)
export function renderStars(rating: number, className?: string) {
  return Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      className={cn(
        "w-4 h-4",
        index < rating 
          ? "fill-senegal-yellow text-senegal-yellow" 
          : "text-gray-300",
        className
      )}
    />
  ))
}