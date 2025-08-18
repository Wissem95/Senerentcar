"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CalendarDays, MapPin, Search, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const searchSchema = z.object({
  location: z.string().min(1, "La localisation est requise"),
  startDate: z.string().min(1, "La date de début est requise"),
  endDate: z.string().min(1, "La date de fin est requise"),
  passengers: z.string().min(1, "Le nombre de passagers est requis"),
})

type SearchFormData = z.infer<typeof searchSchema>

interface VehicleSearchFormProps {
  onSearch?: (data: SearchFormData) => void
  className?: string
  variant?: "default" | "hero"
}

export function VehicleSearchForm({ 
  onSearch, 
  className,
  variant = "default" 
}: VehicleSearchFormProps) {
  const [isSearching, setIsSearching] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  })

  const onSubmit = async (data: SearchFormData) => {
    setIsSearching(true)
    try {
      onSearch?.(data)
      
      // Build search params
      const params = new URLSearchParams()
      if (data.location && data.location !== 'all') {
        params.append('location', data.location)
      }
      if (data.pickupDate) {
        params.append('pickupDate', data.pickupDate)
      }
      if (data.returnDate) {
        params.append('returnDate', data.returnDate)
      }
      if (data.vehicleType && data.vehicleType !== 'all') {
        params.append('category', data.vehicleType)
      }
      
      // Navigate to catalogue with search params
      const searchUrl = params.toString() ? `/catalogue?${params.toString()}` : '/catalogue'
      window.location.href = searchUrl
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsSearching(false)
    }
  }

  const isHero = variant === "hero"

  return (
    <Card className={cn(
      "w-full",
      isHero && "bg-white/95 backdrop-blur-md border-white/20 shadow-2xl",
      className
    )}>
      <CardContent className={cn("p-6", isHero && "p-8")}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className={cn(
            "grid gap-4",
            isHero ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 md:grid-cols-2"
          )}>
            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2 text-sm font-medium">
                <MapPin className="w-4 h-4 text-senegal-green" />
                Lieu de prise en charge
              </Label>
              <Input
                id="location"
                placeholder="Dakar, Thiès, Saint-Louis..."
                {...register("location")}
                className={cn(
                  "focus:ring-senegal-green focus:border-senegal-green",
                  errors.location && "border-red-500"
                )}
              />
              {errors.location && (
                <p className="text-xs text-red-500">{errors.location.message}</p>
              )}
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <Label htmlFor="startDate" className="flex items-center gap-2 text-sm font-medium">
                <CalendarDays className="w-4 h-4 text-senegal-green" />
                Date de début
              </Label>
              <Input
                id="startDate"
                type="date"
                {...register("startDate")}
                className={cn(
                  "focus:ring-senegal-green focus:border-senegal-green",
                  errors.startDate && "border-red-500"
                )}
              />
              {errors.startDate && (
                <p className="text-xs text-red-500">{errors.startDate.message}</p>
              )}
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <Label htmlFor="endDate" className="flex items-center gap-2 text-sm font-medium">
                <CalendarDays className="w-4 h-4 text-senegal-green" />
                Date de fin
              </Label>
              <Input
                id="endDate"
                type="date"
                {...register("endDate")}
                className={cn(
                  "focus:ring-senegal-green focus:border-senegal-green",
                  errors.endDate && "border-red-500"
                )}
              />
              {errors.endDate && (
                <p className="text-xs text-red-500">{errors.endDate.message}</p>
              )}
            </div>

            {/* Passengers */}
            <div className="space-y-2">
              <Label htmlFor="passengers" className="flex items-center gap-2 text-sm font-medium">
                <Users className="w-4 h-4 text-senegal-green" />
                Passagers
              </Label>
              <select
                id="passengers"
                {...register("passengers")}
                className={cn(
                  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-senegal-green focus-visible:ring-offset-2",
                  errors.passengers && "border-red-500"
                )}
              >
                <option value="">Sélectionner</option>
                <option value="1">1 passager</option>
                <option value="2">2 passagers</option>
                <option value="3">3 passagers</option>
                <option value="4">4 passagers</option>
                <option value="5">5 passagers</option>
                <option value="7">7 passagers</option>
                <option value="9">9+ passagers</option>
              </select>
              {errors.passengers && (
                <p className="text-xs text-red-500">{errors.passengers.message}</p>
              )}
            </div>
          </div>

          {/* Search Button */}
          <div className={cn(
            "flex justify-center",
            isHero && "pt-4"
          )}>
            <Button
              type="submit"
              disabled={isSearching}
              variant="senegal"
              size={isHero ? "lg" : "default"}
              className={cn(
                "gap-2 font-semibold",
                isHero && "px-12 py-6 text-lg"
              )}
            >
              <Search className="w-5 h-5" />
              {isSearching ? "Recherche..." : "Rechercher"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}