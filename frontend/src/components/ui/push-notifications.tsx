"use client"

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { Bell, Car, Wrench, CreditCard, Calendar, MessageCircle, Settings } from 'lucide-react'
import { useNotifications } from './notification-system'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface PushNotification {
  id: string
  type: 'booking' | 'maintenance' | 'payment' | 'reminder' | 'system'
  title: string
  message: string
  data?: Record<string, any>
  timestamp: string
  read: boolean
  priority: 'low' | 'medium' | 'high' | 'urgent'
  userId?: string
  actionUrl?: string
}

interface PushNotificationContextType {
  notifications: PushNotification[]
  unreadCount: number
  isConnected: boolean
  requestPermission: () => Promise<boolean>
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  deleteNotification: (id: string) => void
  clearAll: () => void
  isSupported: boolean
}

const PushNotificationContext = createContext<PushNotificationContextType | undefined>(undefined)

export function usePushNotifications() {
  const context = useContext(PushNotificationContext)
  if (!context) {
    throw new Error('usePushNotifications must be used within a PushNotificationProvider')
  }
  return context
}

interface PushNotificationProviderProps {
  children: ReactNode
  userId?: string
  wsUrl?: string
}

// Simulated WebSocket events for demo purposes
const mockNotifications: PushNotification[] = [
  {
    id: '1',
    type: 'booking',
    title: 'Réservation confirmée',
    message: 'Votre réservation #SRC-20250117-001 a été confirmée pour demain',
    timestamp: new Date().toISOString(),
    read: false,
    priority: 'high',
    data: { bookingNumber: 'SRC-20250117-001' },
    actionUrl: '/profile?tab=bookings'
  },
  {
    id: '2',
    type: 'maintenance',
    title: 'Maintenance programmée',
    message: 'Le véhicule Toyota Corolla sera en maintenance demain de 9h à 11h',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
    read: false,
    priority: 'medium',
    data: { vehicleId: '1', maintenanceType: 'preventive' }
  },
  {
    id: '3',
    type: 'payment',
    title: 'Paiement reçu',
    message: 'Nous avons reçu votre paiement de 75,000 XOF',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2h ago
    read: true,
    priority: 'low',
    data: { amount: 75000, method: 'wave' }
  },
  {
    id: '4',
    type: 'reminder',
    title: 'Rappel de récupération',
    message: 'N\'oubliez pas de récupérer votre véhicule à l\'aéroport à 14h',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4h ago
    read: false,
    priority: 'urgent',
    actionUrl: '/profile?tab=bookings'
  }
]

export function PushNotificationProvider({ 
  children, 
  userId, 
  wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:6001' 
}: PushNotificationProviderProps) {
  const [notifications, setNotifications] = useState<PushNotification[]>(mockNotifications)
  const [isConnected, setIsConnected] = useState(false)
  const [permissionGranted, setPermissionGranted] = useState(false)
  const { addNotification } = useNotifications()

  const isSupported = typeof window !== 'undefined' && 'Notification' in window

  useEffect(() => {
    // Check if notifications are already permitted
    if (isSupported) {
      setPermissionGranted(Notification.permission === 'granted')
    }

    // Simulate WebSocket connection for demo
    const interval = setInterval(() => {
      setIsConnected(true)
      
      // Simulate random notifications for demo
      if (Math.random() < 0.1) { // 10% chance every 10 seconds
        const demoNotifications = [
          {
            type: 'booking' as const,
            title: 'Nouvelle réservation',
            message: 'Une nouvelle réservation vient d\'être créée',
            priority: 'medium' as const
          },
          {
            type: 'maintenance' as const,
            title: 'Maintenance terminée',
            message: 'La maintenance de votre véhicule est terminée',
            priority: 'low' as const
          },
          {
            type: 'reminder' as const,
            title: 'Retour du véhicule',
            message: 'Il vous reste 2 heures pour retourner le véhicule',
            priority: 'urgent' as const
          }
        ]
        
        const randomNotif = demoNotifications[Math.floor(Math.random() * demoNotifications.length)]
        simulateIncomingNotification(randomNotif)
      }
    }, 10000)

    return () => {
      clearInterval(interval)
      setIsConnected(false)
    }
  }, [])

  const requestPermission = async (): Promise<boolean> => {
    if (!isSupported) return false

    const permission = await Notification.requestPermission()
    const granted = permission === 'granted'
    setPermissionGranted(granted)
    return granted
  }

  const simulateIncomingNotification = (data: Partial<PushNotification>) => {
    const newNotification: PushNotification = {
      id: Math.random().toString(36).substring(7),
      type: data.type || 'system',
      title: data.title || 'Notification',
      message: data.message || '',
      timestamp: new Date().toISOString(),
      read: false,
      priority: data.priority || 'medium',
      ...data
    }

    setNotifications(prev => [newNotification, ...prev])

    // Show browser notification if permitted
    if (permissionGranted && document.hidden) {
      new Notification(newNotification.title, {
        body: newNotification.message,
        icon: '/favicon.ico',
        badge: '/badge-icon.png',
        tag: newNotification.id,
        requireInteraction: newNotification.priority === 'urgent'
      })
    }

    // Show in-app notification
    addNotification({
      type: newNotification.priority === 'urgent' ? 'warning' : 'info',
      title: newNotification.title,
      message: newNotification.message,
      duration: newNotification.priority === 'urgent' ? 0 : 5000,
      action: newNotification.actionUrl ? {
        label: 'Voir',
        onClick: () => window.location.href = newNotification.actionUrl!
      } : undefined
    })
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <PushNotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isConnected,
        requestPermission,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
        isSupported
      }}
    >
      {children}
    </PushNotificationContext.Provider>
  )
}

// Notification Bell Component
interface NotificationBellProps {
  className?: string
}

export function NotificationBell({ className }: NotificationBellProps) {
  const { unreadCount, requestPermission, isSupported } = usePushNotifications()
  const [showDropdown, setShowDropdown] = useState(false)

  const handleBellClick = async () => {
    if (isSupported && Notification.permission === 'default') {
      await requestPermission()
    }
    setShowDropdown(!showDropdown)
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className={`relative ${className}`}
        onClick={handleBellClick}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center p-0"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </Button>

      {showDropdown && (
        <NotificationDropdown onClose={() => setShowDropdown(false)} />
      )}
    </div>
  )
}

// Notification Dropdown Component
interface NotificationDropdownProps {
  onClose: () => void
}

function NotificationDropdown({ onClose }: NotificationDropdownProps) {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification,
    isConnected,
    isSupported,
    requestPermission
  } = usePushNotifications()

  const getNotificationIcon = (type: PushNotification['type']) => {
    switch (type) {
      case 'booking':
        return <Car className="w-4 h-4 text-blue-500" />
      case 'maintenance':
        return <Wrench className="w-4 h-4 text-orange-500" />
      case 'payment':
        return <CreditCard className="w-4 h-4 text-green-500" />
      case 'reminder':
        return <Calendar className="w-4 h-4 text-purple-500" />
      case 'system':
        return <MessageCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    
    if (diff < 1000 * 60) return 'À l\'instant'
    if (diff < 1000 * 60 * 60) return `Il y a ${Math.floor(diff / (1000 * 60))} min`
    if (diff < 1000 * 60 * 60 * 24) return `Il y a ${Math.floor(diff / (1000 * 60 * 60))} h`
    return date.toLocaleDateString('fr-FR')
  }

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute top-16 right-4 w-96 max-h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
        <Card className="w-full border-0 shadow-none">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notifications</CardTitle>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-xs text-gray-500">
                  {isConnected ? 'Connecté' : 'Déconnecté'}
                </span>
              </div>
            </div>
            {unreadCount > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  {unreadCount} non lue{unreadCount > 1 ? 's' : ''}
                </span>
                <Button variant="link" size="sm" onClick={markAllAsRead}>
                  Tout marquer comme lu
                </Button>
              </div>
            )}
          </CardHeader>
          
          <CardContent className="p-0">
            {/* Permission Request */}
            {isSupported && Notification.permission === 'default' && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-b">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Activer les notifications</p>
                    <p className="text-xs text-gray-600">
                      Recevez des alertes même quand l'onglet est fermé
                    </p>
                  </div>
                  <Button size="sm" onClick={requestPermission}>
                    Activer
                  </Button>
                </div>
              </div>
            )}

            {/* Notifications List */}
            <div className="max-h-64 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Aucune notification</p>
                </div>
              ) : (
                notifications.map((notification, index) => (
                  <div key={notification.id}>
                    <div
                      className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                        !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                      onClick={(e) => {
                        e.stopPropagation()
                        markAsRead(notification.id)
                        if (notification.actionUrl) {
                          window.location.href = notification.actionUrl
                        }
                      }}
                    >
                      <div className="flex items-start gap-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium truncate">
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            {formatTimestamp(notification.timestamp)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-6 h-6 p-0 opacity-0 group-hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteNotification(notification.id)
                          }}
                        >
                          ×
                        </Button>
                      </div>
                    </div>
                    {index < notifications.length - 1 && <Separator />}
                  </div>
                ))
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-4 border-t">
                <Button variant="outline" size="sm" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Gérer les notifications
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Service Worker Registration (for production PWA)
export function registerNotificationServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration)
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError)
      })
  }
}

// Utility hooks for specific notification types
export function useBookingPushNotifications() {
  const { notifications } = usePushNotifications()
  
  return {
    bookingNotifications: notifications.filter(n => n.type === 'booking'),
    hasUrgentBookingAlerts: notifications.some(n => 
      n.type === 'booking' && n.priority === 'urgent' && !n.read
    )
  }
}

export function useMaintenancePushNotifications() {
  const { notifications } = usePushNotifications()
  
  return {
    maintenanceNotifications: notifications.filter(n => n.type === 'maintenance'),
    hasMaintenanceAlerts: notifications.some(n => 
      n.type === 'maintenance' && !n.read
    )
  }
}