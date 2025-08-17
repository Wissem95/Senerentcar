"use client"

import { useState, useCallback, useRef } from "react"
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Upload, 
  X, 
  FileImage, 
  CheckCircle, 
  AlertCircle, 
  Eye,
  Trash2,
  RotateCcw
} from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadedImage {
  id: string
  file: File
  preview: string
  url?: string
  publicId?: string
  status: 'uploading' | 'success' | 'error'
  progress?: number
  error?: string
}

interface ImageUploadProps {
  maxFiles?: number
  maxSize?: number // in MB
  onUpload?: (images: UploadedImage[]) => void
  className?: string
  multiple?: boolean
  folder?: string
  accept?: string[]
}

export function ImageUpload({
  maxFiles = 10,
  maxSize = 5, // 5MB par défaut
  onUpload,
  className,
  multiple = true,
  folder = 'uploads',
  accept = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
}: ImageUploadProps) {
  const [images, setImages] = useState<UploadedImage[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadToCloudinary = async (file: File): Promise<{ url: string; publicId: string }> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Erreur lors de l\'upload')
    }

    return response.json()
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setError(null)

    // Vérifier le nombre maximum de fichiers
    if (images.length + acceptedFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} images autorisées`)
      return
    }

    // Vérifier la taille des fichiers
    const oversizedFiles = acceptedFiles.filter(file => file.size > maxSize * 1024 * 1024)
    if (oversizedFiles.length > 0) {
      setError(`Fichiers trop volumineux. Taille maximale : ${maxSize}MB`)
      return
    }

    // Créer les objets image avec preview
    const newImages: UploadedImage[] = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: URL.createObjectURL(file),
      status: 'uploading' as const,
      progress: 0
    }))

    setImages(prev => [...prev, ...newImages])
    setIsUploading(true)

    // Upload des images
    for (const imageData of newImages) {
      try {
        // Simuler le progrès
        const progressInterval = setInterval(() => {
          setImages(prev => prev.map(img => 
            img.id === imageData.id 
              ? { ...img, progress: Math.min((img.progress || 0) + 10, 90) }
              : img
          ))
        }, 200)

        const { url, publicId } = await uploadToCloudinary(imageData.file)

        clearInterval(progressInterval)

        setImages(prev => prev.map(img => 
          img.id === imageData.id 
            ? { ...img, url, publicId, status: 'success' as const, progress: 100 }
            : img
        ))
      } catch (error: any) {
        setImages(prev => prev.map(img => 
          img.id === imageData.id 
            ? { ...img, status: 'error' as const, error: error.message }
            : img
        ))
      }
    }

    setIsUploading(false)

    // Appeler le callback avec les images uploadées
    const successImages = images.filter(img => img.status === 'success')
    onUpload?.(successImages)
  }, [images, maxFiles, maxSize, folder, onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    multiple,
    disabled: isUploading
  })

  const removeImage = (id: string) => {
    setImages(prev => {
      const image = prev.find(img => img.id === id)
      if (image?.preview) {
        URL.revokeObjectURL(image.preview)
      }
      return prev.filter(img => img.id !== id)
    })
  }

  const retryUpload = async (id: string) => {
    const image = images.find(img => img.id === id)
    if (!image) return

    setImages(prev => prev.map(img => 
      img.id === id 
        ? { ...img, status: 'uploading' as const, progress: 0, error: undefined }
        : img
    ))

    try {
      const { url, publicId } = await uploadToCloudinary(image.file)
      setImages(prev => prev.map(img => 
        img.id === id 
          ? { ...img, url, publicId, status: 'success' as const, progress: 100 }
          : img
      ))
    } catch (error: any) {
      setImages(prev => prev.map(img => 
        img.id === id 
          ? { ...img, status: 'error' as const, error: error.message }
          : img
      ))
    }
  }

  const clearAll = () => {
    images.forEach(image => {
      if (image.preview) {
        URL.revokeObjectURL(image.preview)
      }
    })
    setImages([])
    setError(null)
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Zone de drop */}
      <Card 
        {...getRootProps()} 
        className={cn(
          "border-2 border-dashed transition-colors cursor-pointer",
          isDragActive 
            ? "border-senegal-green bg-senegal-green/5" 
            : "border-gray-300 hover:border-senegal-green",
          isUploading && "opacity-50 cursor-not-allowed"
        )}
      >
        <div className="p-8 text-center">
          <input {...getInputProps()} ref={fileInputRef} />
          
          <div className="mx-auto mb-4">
            <Upload className={cn(
              "w-12 h-12 mx-auto",
              isDragActive ? "text-senegal-green" : "text-gray-400"
            )} />
          </div>

          <h3 className="text-lg font-semibold mb-2">
            {isDragActive 
              ? "Déposez vos images ici" 
              : "Glissez-déposez vos images"
            }
          </h3>
          
          <p className="text-gray-600 mb-4">
            ou cliquez pour sélectionner ({maxFiles} max, {maxSize}MB chacune)
          </p>

          <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500">
            <Badge variant="outline">JPEG</Badge>
            <Badge variant="outline">PNG</Badge>
            <Badge variant="outline">WebP</Badge>
          </div>

          {!multiple && (
            <p className="text-xs text-gray-500 mt-2">
              Une seule image autorisée
            </p>
          )}
        </div>
      </Card>

      {/* Messages d'erreur */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Actions */}
      {images.length > 0 && (
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            {images.length} image{images.length > 1 ? 's' : ''} 
            {images.filter(img => img.status === 'success').length > 0 && 
              ` (${images.filter(img => img.status === 'success').length} uploadée${images.filter(img => img.status === 'success').length > 1 ? 's' : ''})`
            }
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearAll}
            disabled={isUploading}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Tout supprimer
          </Button>
        </div>
      )}

      {/* Aperçu des images */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={image.preview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                
                {/* Overlay de statut */}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  {image.status === 'uploading' && (
                    <div className="text-center text-white">
                      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                      <p className="text-xs">{image.progress}%</p>
                    </div>
                  )}
                  
                  {image.status === 'success' && (
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  )}
                  
                  {image.status === 'error' && (
                    <div className="text-center text-white">
                      <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-1" />
                      <p className="text-xs">{image.error}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="absolute top-2 right-2 flex gap-1">
                  {image.status === 'error' && (
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-6 h-6 p-0"
                      onClick={() => retryUpload(image.id)}
                    >
                      <RotateCcw className="w-3 h-3" />
                    </Button>
                  )}
                  
                  <Button
                    size="sm"
                    variant="destructive"
                    className="w-6 h-6 p-0"
                    onClick={() => removeImage(image.id)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {/* Informations du fichier */}
              <div className="p-2">
                <p className="text-xs text-gray-600 truncate">
                  {image.file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(image.file.size / 1024 / 1024).toFixed(1)} MB
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}