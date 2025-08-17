"use client"

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type NotificationType = 'success' | 'error' | 'warning' | 'info'

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
  clearAll: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

interface NotificationProviderProps {
  children: ReactNode
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substring(7)
    const newNotification = { ...notification, id }
    
    setNotifications(prev => [...prev, newNotification])

    // Auto remove after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id)
      }, notification.duration || 5000)
    }
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  return (
    <NotificationContext.Provider 
      value={{ notifications, addNotification, removeNotification, clearAll }}
    >
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  )
}

function NotificationContainer() {
  const { notifications, removeNotification } = useNotifications()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onRemove={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  )
}

interface NotificationCardProps {
  notification: Notification
  onRemove: () => void
}

function NotificationCard({ notification, onRemove }: NotificationCardProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Animation d'entrée
    setIsVisible(true)
  }, [])

  const handleRemove = () => {
    setIsVisible(false)
    setTimeout(onRemove, 300) // Attendre la fin de l'animation
  }

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  const getCardStyles = () => {
    const baseStyles = "border-l-4"
    switch (notification.type) {
      case 'success':
        return `${baseStyles} border-l-green-500 bg-green-50 dark:bg-green-900/20`
      case 'error':
        return `${baseStyles} border-l-red-500 bg-red-50 dark:bg-red-900/20`
      case 'warning':
        return `${baseStyles} border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20`
      case 'info':
        return `${baseStyles} border-l-blue-500 bg-blue-50 dark:bg-blue-900/20`
    }
  }

  return (
    <Card
      className={cn(
        "min-w-80 max-w-sm p-4 shadow-lg transition-all duration-300 transform",
        getCardStyles(),
        isVisible 
          ? "translate-x-0 opacity-100" 
          : "translate-x-full opacity-0"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          {getIcon()}
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {notification.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {notification.message}
            </p>
            {notification.action && (
              <Button
                variant="link"
                size="sm"
                className="mt-2 p-0 h-auto text-senegal-green"
                onClick={notification.action.onClick}
              >
                {notification.action.label}
              </Button>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-6 h-6 p-0 text-gray-500 hover:text-gray-700"
          onClick={handleRemove}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  )
}

// Hooks utilitaires pour différents types de notifications
export function useSuccessNotification() {
  const { addNotification } = useNotifications()
  
  return (title: string, message: string, options?: Partial<Notification>) => {
    addNotification({
      type: 'success',
      title,
      message,
      ...options
    })
  }
}

export function useErrorNotification() {
  const { addNotification } = useNotifications()
  
  return (title: string, message: string, options?: Partial<Notification>) => {
    addNotification({
      type: 'error',
      title,
      message,
      duration: 0, // Ne pas supprimer automatiquement les erreurs
      ...options
    })
  }
}

export function useWarningNotification() {
  const { addNotification } = useNotifications()
  
  return (title: string, message: string, options?: Partial<Notification>) => {
    addNotification({
      type: 'warning',
      title,
      message,
      ...options
    })
  }
}

export function useInfoNotification() {
  const { addNotification } = useNotifications()
  
  return (title: string, message: string, options?: Partial<Notification>) => {
    addNotification({
      type: 'info',
      title,
      message,
      ...options
    })
  }
}

// Hook pour les notifications de réservation
export function useBookingNotifications() {
  const addSuccess = useSuccessNotification()
  const addError = useErrorNotification()
  const addInfo = useInfoNotification()

  return {
    bookingConfirmed: (bookingNumber: string) => {
      addSuccess(
        'Réservation confirmée !',
        `Votre réservation #${bookingNumber} a été confirmée avec succès.`,
        {
          action: {
            label: 'Voir les détails',
            onClick: () => window.location.href = `/profile?tab=bookings`
          }
        }
      )
    },
    
    bookingCancelled: (bookingNumber: string) => {
      addInfo(
        'Réservation annulée',
        `Votre réservation #${bookingNumber} a été annulée.`
      )
    },
    
    paymentRequired: (amount: number) => {
      addInfo(
        'Paiement requis',
        `Un paiement de ${amount.toLocaleString()} XOF est requis pour finaliser votre réservation.`,
        {
          action: {
            label: 'Payer maintenant',
            onClick: () => console.log('Redirection vers paiement')
          }
        }
      )
    },
    
    reminderPickup: (date: string, location: string) => {
      addInfo(
        'Rappel de récupération',
        `N'oubliez pas de récupérer votre véhicule le ${date} à ${location}.`,
        {
          duration: 10000 // 10 secondes
        }
      )
    },
    
    error: (message: string) => {
      addError(
        'Erreur de réservation',
        message
      )
    }
  }
}