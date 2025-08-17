"use client"

import { useState, useCallback } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useDropzone } from "react-dropzone"
import { motion, AnimatePresence } from "framer-motion"
import {
  Upload,
  X,
  Image as ImageIcon,
  Car,
  Fuel,
  Settings,
  DollarSign,
} from "lucide-react"

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

const vehicleSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  brand: z.string().min(1, "La marque est requise"),
  model: z.string().min(1, "Le modèle est requis"),
  year: z.number().min(1990, "Année invalide").max(new Date().getFullYear() + 1),
  category: z.string().min(1, "La catégorie est requise"),
  licensePlate: z.string().min(1, "La plaque est requise"),
  fuelType: z.enum(["gasoline", "diesel", "hybrid", "electric"]),
  transmission: z.enum(["manual", "automatic"]),
  seats: z.number().min(1).max(50),
  doors: z.number().min(1).max(10),
  pricePerDay: z.number().min(1, "Le prix doit être supérieur à 0"),
  description: z.string().min(10, "Description trop courte"),
  features: z.array(z.string()),
  location: z.string().min(1, "La localisation est requise"),
  mileage: z.number().min(0),
  airConditioning: z.boolean(),
  isFeatured: z.boolean(),
})

type VehicleFormData = z.infer<typeof vehicleSchema>

interface VehicleFormModalProps {
  vehicle?: any
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: VehicleFormData & { images: string[] }) => void
}

const categories = [
  "Économique",
  "Compact",
  "Berline",
  "SUV",
  "4x4",
  "Minibus",
  "Luxe",
  "Utilitaire",
]

const features = [
  "Climatisation",
  "GPS",
  "Radio Bluetooth",
  "Airbags",
  "Verrouillage centralisé",
  "Direction assistée",
  "Régulateur de vitesse",
  "Caméra de recul",
  "Sièges chauffants",
  "Toit ouvrant",
  "4x4",
  "Sièges en cuir",
  "Système multimédia",
  "USB",
  "Prise 12V",
  "Coffre spacieux",
]

export function VehicleFormModal({
  vehicle,
  isOpen,
  onClose,
  onSubmit,
}: VehicleFormModalProps) {
  const [images, setImages] = useState<string[]>(vehicle?.images || [])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    vehicle?.features || []
  )

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      name: vehicle?.name || "",
      brand: vehicle?.brand || "",
      model: vehicle?.model || "",
      year: vehicle?.year || new Date().getFullYear(),
      category: vehicle?.category || "",
      licensePlate: vehicle?.licensePlate || "",
      fuelType: vehicle?.fuelType || "gasoline",
      transmission: vehicle?.transmission || "manual",
      seats: vehicle?.seats || 5,
      doors: vehicle?.doors || 5,
      pricePerDay: vehicle?.pricePerDay || 0,
      description: vehicle?.description || "",
      features: vehicle?.features || [],
      location: vehicle?.location || "Dakar",
      mileage: vehicle?.mileage || 0,
      airConditioning: vehicle?.airConditioning || true,
      isFeatured: vehicle?.isFeatured || false,
    },
  })

  const watchedBrand = watch("brand")
  const watchedModel = watch("model")

  // Auto-generate name when brand and model change
  const generateName = useCallback(() => {
    if (watchedBrand && watchedModel) {
      setValue("name", `${watchedBrand} ${watchedModel}`)
    }
  }, [watchedBrand, watchedModel, setValue])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (images.length + acceptedFiles.length > 5) {
      alert("Vous ne pouvez ajouter que 5 images maximum")
      return
    }

    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onabort = () => console.log("file reading was aborted")
      reader.onerror = () => console.log("file reading has failed")
      reader.onload = () => {
        const binaryStr = reader.result as string
        setImages((prev) => [...prev, binaryStr])
      }
      reader.readAsDataURL(file)
    })
  }, [images.length])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: 5 - images.length,
    disabled: images.length >= 5,
  })

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) => {
      const updated = prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
      setValue("features", updated)
      return updated
    })
  }

  const onFormSubmit = (data: VehicleFormData) => {
    onSubmit({ ...data, images, features: selectedFeatures })
  }

  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>
          {vehicle ? "Modifier le véhicule" : "Ajouter un véhicule"}
        </DialogTitle>
        <DialogDescription>
          Remplissez les informations du véhicule
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* Images Upload */}
        <Card className="p-4">
          <div className="flex items-center mb-4">
            <ImageIcon className="h-5 w-5 mr-2" />
            <h3 className="text-lg font-medium">Images ({images.length}/5)</h3>
          </div>

          <div className="grid grid-cols-5 gap-4 mb-4">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-video rounded-lg overflow-hidden bg-gray-100"
              >
                <img
                  src={image}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.div>
            ))}
          </div>

          {images.length < 5 && (
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-blue-500 hover:bg-gray-50"
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">
                {isDragActive
                  ? "Déposez les images ici..."
                  : "Glissez-déposez des images ou cliquez pour sélectionner"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Maximum 5 images (JPEG, PNG, WebP)
              </p>
            </div>
          )}
        </Card>

        {/* Basic Information */}
        <Card className="p-4">
          <div className="flex items-center mb-4">
            <Car className="h-5 w-5 mr-2" />
            <h3 className="text-lg font-medium">Informations de base</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="brand">Marque</Label>
              <Input
                id="brand"
                {...register("brand")}
                onBlur={generateName}
              />
              {errors.brand && (
                <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="model">Modèle</Label>
              <Input
                id="model"
                {...register("model")}
                onBlur={generateName}
                error={errors.model?.message}
              />
            </div>

            <div>
              <Label htmlFor="name">Nom complet</Label>
              <Input id="name" {...register("name")} error={errors.name?.message} />
            </div>

            <div>
              <Label htmlFor="year">Année</Label>
              <Input
                id="year"
                type="number"
                {...register("year", { valueAsNumber: true })}
                error={errors.year?.message}
              />
            </div>

            <div>
              <Label htmlFor="category">Catégorie</Label>
              <select
                id="category"
                {...register("category")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-sm text-red-600">{errors.category.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="licensePlate">Plaque d'immatriculation</Label>
              <Input
                id="licensePlate"
                {...register("licensePlate")}
                placeholder="DK-1234-AB"
                error={errors.licensePlate?.message}
              />
            </div>
          </div>
        </Card>

        {/* Technical Specifications */}
        <Card className="p-4">
          <div className="flex items-center mb-4">
            <Settings className="h-5 w-5 mr-2" />
            <h3 className="text-lg font-medium">Spécifications techniques</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="fuelType">Carburant</Label>
              <select
                id="fuelType"
                {...register("fuelType")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="gasoline">Essence</option>
                <option value="diesel">Diesel</option>
                <option value="hybrid">Hybride</option>
                <option value="electric">Électrique</option>
              </select>
            </div>

            <div>
              <Label htmlFor="transmission">Transmission</Label>
              <select
                id="transmission"
                {...register("transmission")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="manual">Manuelle</option>
                <option value="automatic">Automatique</option>
              </select>
            </div>

            <div>
              <Label htmlFor="seats">Nombre de places</Label>
              <Input
                id="seats"
                type="number"
                {...register("seats", { valueAsNumber: true })}
                error={errors.seats?.message}
              />
            </div>

            <div>
              <Label htmlFor="doors">Nombre de portes</Label>
              <Input
                id="doors"
                type="number"
                {...register("doors", { valueAsNumber: true })}
                error={errors.doors?.message}
              />
            </div>

            <div>
              <Label htmlFor="mileage">Kilométrage</Label>
              <Input
                id="mileage"
                type="number"
                {...register("mileage", { valueAsNumber: true })}
                error={errors.mileage?.message}
              />
            </div>

            <div>
              <Label htmlFor="location">Localisation</Label>
              <Input
                id="location"
                {...register("location")}
                error={errors.location?.message}
              />
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="airConditioning"
                {...register("airConditioning")}
                className="rounded border-gray-300"
              />
              <Label htmlFor="airConditioning">Climatisation</Label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isFeatured"
                {...register("isFeatured")}
                className="rounded border-gray-300"
              />
              <Label htmlFor="isFeatured">Véhicule mis en avant</Label>
            </div>
          </div>
        </Card>

        {/* Pricing */}
        <Card className="p-4">
          <div className="flex items-center mb-4">
            <DollarSign className="h-5 w-5 mr-2" />
            <h3 className="text-lg font-medium">Tarification</h3>
          </div>

          <div>
            <Label htmlFor="pricePerDay">Prix par jour (FCFA)</Label>
            <Input
              id="pricePerDay"
              type="number"
              {...register("pricePerDay", { valueAsNumber: true })}
              error={errors.pricePerDay?.message}
            />
          </div>
        </Card>

        {/* Features */}
        <Card className="p-4">
          <div className="flex items-center mb-4">
            <Settings className="h-5 w-5 mr-2" />
            <h3 className="text-lg font-medium">Équipements</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {features.map((feature) => (
              <Badge
                key={feature}
                variant={selectedFeatures.includes(feature) ? "default" : "outline"}
                className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 justify-center"
                onClick={() => toggleFeature(feature)}
              >
                {feature}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Description */}
        <Card className="p-4">
          <div className="mb-4">
            <h3 className="text-lg font-medium">Description</h3>
          </div>

          <div>
            <Label htmlFor="description">Description détaillée</Label>
            <textarea
              id="description"
              {...register("description")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Décrivez le véhicule, ses avantages, son état..."
            />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>
        </Card>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Enregistrement..."
              : vehicle
              ? "Mettre à jour"
              : "Ajouter"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}