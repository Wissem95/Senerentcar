"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Star, Send } from "lucide-react"
import { apiClient } from "@/lib/api"
// import { Booking } from "@/types"
import { cn } from "@/lib/utils"

const reviewSchema = z.object({
  rating: z.number().min(1, "Veuillez sélectionner une note").max(5),
  comment: z.string().min(10, "Le commentaire doit contenir au moins 10 caractères"),
})

type ReviewForm = z.infer<typeof reviewSchema>

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  booking: any
  onSuccess?: () => void
}

export function ReviewModal({ isOpen, onClose, booking, onSuccess }: ReviewModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hoveredRating, setHoveredRating] = useState(0)
  
  const form = useForm<ReviewForm>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  })

  const onSubmit = async (data: ReviewForm) => {
    setIsSubmitting(true)
    try {
      await apiClient.post("/reviews", {
        booking_id: booking.id,
        vehicle_id: booking.vehicle_id,
        rating: data.rating,
        comment: data.comment,
      })
      
      onSuccess?.()
      onClose()
      form.reset()
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'avis:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const ratingLabels = [
    "Très insatisfait",
    "Insatisfait",
    "Correct",
    "Satisfait",
    "Très satisfait"
  ]

  const suggestions = [
    "Véhicule propre et bien entretenu",
    "Service client excellent",
    "Processus de réservation simple",
    "Rapport qualité-prix",
    "Ponctualité de la livraison",
    "État du véhicule",
    "Facilité de récupération/retour",
    "Documentation claire"
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Évaluer votre location</DialogTitle>
          <DialogDescription>
            Partagez votre expérience avec le {booking.vehicle?.name || "véhicule"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Rating Stars */}
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Note globale
            </Label>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => form.setValue("rating", star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star
                      className={cn(
                        "w-8 h-8 transition-colors",
                        (hoveredRating || form.watch("rating")) >= star
                          ? "fill-senegal-yellow text-senegal-yellow"
                          : "text-gray-300"
                      )}
                    />
                  </button>
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-2">
                {ratingLabels[(hoveredRating || form.watch("rating")) - 1] || "Cliquez pour noter"}
              </span>
            </div>
            {form.formState.errors.rating && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.rating.message}
              </p>
            )}
          </div>

          {/* Quick Suggestions */}
          <div>
            <Label className="text-sm text-gray-600 mb-2 block">
              Aspects à mentionner :
            </Label>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    const currentComment = form.getValues("comment")
                    form.setValue(
                      "comment",
                      currentComment 
                        ? `${currentComment}. ${suggestion}`
                        : suggestion
                    )
                  }}
                  className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-senegal-green/10 hover:text-senegal-green transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <Label htmlFor="comment" className="text-base font-semibold mb-2 block">
              Votre commentaire
            </Label>
            <textarea
              id="comment"
              rows={4}
              {...form.register("comment")}
              placeholder="Partagez votre expérience avec les futurs clients..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-senegal-green focus:border-transparent resize-none"
            />
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-gray-500">
                {form.watch("comment")?.length || 0} caractères
              </p>
              {form.formState.errors.comment && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.comment.message}
                </p>
              )}
            </div>
          </div>

          {/* Booking Info */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-sm">
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Réservation :</span> #{booking.booking_number}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Période :</span>{" "}
              {new Date(booking.start_date).toLocaleDateString("fr-FR")} -{" "}
              {new Date(booking.end_date).toLocaleDateString("fr-FR")}
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !form.watch("rating")}
              className="bg-senegal-green hover:bg-senegal-green/90"
            >
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? "Envoi..." : "Envoyer l'avis"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}