"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Settings,
  Globe,
  Bell,
  Shield,
  Users,
  Car,
  CreditCard,
  Mail,
  Database,
  Save,
  RefreshCw,
} from "lucide-react"

import { AdminLayout } from "@/components/layouts/admin-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "SeneRentCar",
    siteDescription: "Location de véhicules au Sénégal",
    defaultCurrency: "XOF",
    defaultLanguage: "fr",
    timezone: "Africa/Dakar",
    
    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    
    // Booking Settings
    autoConfirmBookings: false,
    maxBookingDays: 30,
    minBookingHours: 2,
    cancellationDeadlineHours: 24,
    
    // Payment Settings
    defaultPaymentMethod: "cash",
    requireDeposit: true,
    depositPercentage: 30,
    
    // Maintenance
    maintenanceAlerts: true,
    maintenanceReminderDays: 7,
    autoMaintenanceScheduling: false,
  })

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      alert("Paramètres sauvegardés avec succès !")
    }, 1500)
  }

  const settingSections = [
    {
      title: "Paramètres généraux",
      icon: Globe,
      description: "Configuration de base de l'application",
      gradient: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Notifications",
      icon: Bell,
      description: "Gestion des alertes et notifications",
      gradient: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50"
    },
    {
      title: "Réservations",
      icon: Car,
      description: "Paramètres des réservations",
      gradient: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50"
    },
    {
      title: "Paiements",
      icon: CreditCard,
      description: "Configuration des méthodes de paiement",
      gradient: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50"
    }
  ]

  return (
    <AdminLayout>
      <div className="w-full bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="w-full max-w-none space-y-6 sm:space-y-8">
          {/* Page header */}
          <section className="w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-slate-200/50 dark:border-slate-700/50 gap-4 sm:gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Paramètres
                  </h1>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base lg:text-lg">
                  Configuration et personnalisation de votre plateforme de location
                </p>
              </div>
              <Button 
                onClick={handleSave}
                disabled={isSaving}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-6 py-3"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Sauvegarde...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Sauvegarder
                  </>
                )}
              </Button>
            </div>
          </section>

          {/* Settings sections */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
            {/* General Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 sm:p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-xl border-0">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                      🌍 Paramètres généraux
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Configuration de base
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="siteName">Nom du site</Label>
                    <Input
                      id="siteName"
                      value={settings.siteName}
                      onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="siteDescription">Description</Label>
                    <Textarea
                      id="siteDescription"
                      value={settings.siteDescription}
                      onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="currency">Devise</Label>
                      <Select value={settings.defaultCurrency}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="XOF">XOF (Franc CFA)</SelectItem>
                          <SelectItem value="EUR">EUR (Euro)</SelectItem>
                          <SelectItem value="USD">USD (Dollar)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="language">Langue</Label>
                      <Select value={settings.defaultLanguage}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="wo">Wolof</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 sm:p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-xl border-0">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mr-4">
                    <Bell className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                      🔔 Notifications
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Gestion des alertes
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notifications email</Label>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Recevoir des emails pour les réservations
                      </p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notifications SMS</Label>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Recevoir des SMS pour les alertes urgentes
                      </p>
                    </div>
                    <Switch
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => setSettings({...settings, smsNotifications: checked})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notifications push</Label>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Recevoir des notifications navigateur
                      </p>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => setSettings({...settings, pushNotifications: checked})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Alertes maintenance</Label>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Alertes automatiques pour la maintenance
                      </p>
                    </div>
                    <Switch
                      checked={settings.maintenanceAlerts}
                      onCheckedChange={(checked) => setSettings({...settings, maintenanceAlerts: checked})}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Booking Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 sm:p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-xl border-0">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mr-4">
                    <Car className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                      🚗 Réservations
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Paramètres des réservations
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Confirmation automatique</Label>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Confirmer automatiquement les réservations
                      </p>
                    </div>
                    <Switch
                      checked={settings.autoConfirmBookings}
                      onCheckedChange={(checked) => setSettings({...settings, autoConfirmBookings: checked})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="maxDays">Durée max (jours)</Label>
                      <Input
                        id="maxDays"
                        type="number"
                        value={settings.maxBookingDays}
                        onChange={(e) => setSettings({...settings, maxBookingDays: parseInt(e.target.value)})}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="minHours">Durée min (heures)</Label>
                      <Input
                        id="minHours"
                        type="number"
                        value={settings.minBookingHours}
                        onChange={(e) => setSettings({...settings, minBookingHours: parseInt(e.target.value)})}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="cancellation">Délai d'annulation (heures)</Label>
                    <Input
                      id="cancellation"
                      type="number"
                      value={settings.cancellationDeadlineHours}
                      onChange={(e) => setSettings({...settings, cancellationDeadlineHours: parseInt(e.target.value)})}
                      className="mt-1"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Délai minimum pour annuler sans frais
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Payment Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 sm:p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-xl border-0">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                      💳 Paiements
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Configuration des paiements
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="paymentMethod">Méthode de paiement par défaut</Label>
                    <Select value={settings.defaultPaymentMethod}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Espèces</SelectItem>
                        <SelectItem value="card">Carte bancaire</SelectItem>
                        <SelectItem value="mobile">Paiement mobile</SelectItem>
                        <SelectItem value="bank_transfer">Virement bancaire</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Caution obligatoire</Label>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Exiger une caution pour toute réservation
                      </p>
                    </div>
                    <Switch
                      checked={settings.requireDeposit}
                      onCheckedChange={(checked) => setSettings({...settings, requireDeposit: checked})}
                    />
                  </div>
                  
                  {settings.requireDeposit && (
                    <div>
                      <Label htmlFor="deposit">Pourcentage de caution (%)</Label>
                      <Input
                        id="deposit"
                        type="number"
                        min="0"
                        max="100"
                        value={settings.depositPercentage}
                        onChange={(e) => setSettings({...settings, depositPercentage: parseInt(e.target.value)})}
                        className="mt-1"
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        Pourcentage du prix total à verser en caution
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Save button bottom */}
          <div className="flex justify-end pt-4">
            <Button 
              onClick={handleSave}
              disabled={isSaving}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-3"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                  Sauvegarde en cours...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-5 w-5" />
                  Sauvegarder tous les paramètres
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}