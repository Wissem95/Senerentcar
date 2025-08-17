"use client"

import { Suspense, lazy, ComponentType } from 'react'
import { LoadingSpinner } from './loading'

// HOC pour le lazy loading des composants
export function withLazyLoading<T extends {}>(
  importComponent: () => Promise<{ default: ComponentType<T> }>,
  fallback?: React.ReactNode
) {
  const LazyComponent = lazy(importComponent)
  
  return function LazyWrapper(props: T) {
    return (
      <Suspense fallback={fallback || <LoadingSpinner />}>
        <LazyComponent {...props} />
      </Suspense>
    )
  }
}

// Composants lazy spécifiques
export const LazyVehicleCard = withLazyLoading(
  () => import('../ui/vehicle-card').then(mod => ({ default: mod.VehicleCard })),
  <div className="animate-pulse bg-gray-200 rounded-lg h-96" />
)

export const LazyFeaturedVehicles = withLazyLoading(
  () => import('../sections/featured-vehicles').then(mod => ({ default: mod.FeaturedVehicles })),
  <div className="animate-pulse bg-gray-200 rounded-lg h-64" />
)

export const LazyTestimonials = withLazyLoading(
  () => import('../sections/testimonials').then(mod => ({ default: mod.Testimonials })),
  <div className="animate-pulse bg-gray-200 rounded-lg h-64" />
)

export const LazyImageUpload = withLazyLoading(
  () => import('../ui/image-upload').then(mod => ({ default: mod.ImageUpload })),
  <div className="animate-pulse bg-gray-200 rounded-lg h-48" />
)

export const LazyContactForm = withLazyLoading(
  () => import('../forms/contact-form').then(mod => ({ default: mod.ContactForm })),
  <div className="animate-pulse bg-gray-200 rounded-lg h-96" />
)

// Hook d'intersection observer pour le lazy loading personnalisé
import { useState, useEffect, useRef } from 'react'

export function useIntersectionObserver(
  threshold = 0.1,
  rootMargin = '50px'
) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { ref, isIntersecting }
}

// Composant pour le lazy loading avec intersection observer
interface LazyLoadProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
}

export function LazyLoad({ 
  children, 
  fallback = <LoadingSpinner />, 
  className,
  threshold = 0.1,
  rootMargin = '50px'
}: LazyLoadProps) {
  const { ref, isIntersecting } = useIntersectionObserver(threshold, rootMargin)

  return (
    <div ref={ref} className={className}>
      {isIntersecting ? children : fallback}
    </div>
  )
}

// Composant pour optimiser les images avec lazy loading
import Image from 'next/image'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  fill?: boolean
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  fill = false
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder pendant le chargement */}
      {isLoading && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}

      {/* Image d'erreur */}
      {error && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-xs">Image non disponible</p>
          </div>
        </div>
      )}

      {/* Image Next.js optimisée */}
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        sizes={sizes}
        priority={priority}
        quality={90}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setError(true)
        }}
        style={{
          objectFit: 'cover',
        }}
      />
    </div>
  )
}