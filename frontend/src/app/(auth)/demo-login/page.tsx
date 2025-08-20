"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Car, User, Crown, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const demoUsers = [
  {
    id: "client-demo",
    name: "Amadou Diallo", 
    email: "amadou@example.com",
    type: "client",
    icon: User,
    description: "Client standard avec historique de réservations",
    stats: "5 réservations • Membre depuis 2023",
    gradient: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50"
  },
  {
    id: "client-vip", 
    name: "Fatou Sow",
    email: "fatou@example.com", 
    type: "client-vip",
    icon: Crown,
    description: "Cliente VIP avec privilèges spéciaux",
    stats: "25 réservations • Membre Gold",
    gradient: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50"
  },
  {
    id: "admin-demo",
    name: "Admin SeneRentCar",
    email: "admin@senerentcar.com",
    type: "admin", 
    icon: Wrench,
    description: "Administrateur avec accès complet",
    stats: "Gestion complète de la plateforme",
    gradient: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50"
  }
]

export default function DemoLoginPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const router = useRouter()

  const handleDemoLogin = async (user: typeof demoUsers[0]) => {
    setIsLoading(user.id)
    
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Stocker les données de démo dans localStorage
    const demoSession = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type
      },
      isDemo: true,
      loginTime: new Date().toISOString()
    }
    
    localStorage.setItem('demoSession', JSON.stringify(demoSession))

    // Redirection selon le type d'utilisateur
    if (user.type === 'admin') {
      router.push('/admin')
    } else {
      router.push('/profile')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="h-16 w-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Car className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            SeneRentCar - Mode Démo
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Choisissez un profil de démonstration pour explorer la plateforme sans authentification
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demoUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className={`relative p-6 ${user.bgColor} dark:bg-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden cursor-pointer`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${user.gradient} opacity-5 hover:opacity-10 transition-opacity duration-500`}></div>
                
                <CardHeader className="relative z-10 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`h-12 w-12 bg-gradient-to-br ${user.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                      <user.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge 
                      className={`${user.type === 'admin' ? 'bg-red-100 text-red-700' : user.type === 'client-vip' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'} font-semibold`}
                    >
                      {user.type === 'admin' ? 'Admin' : user.type === 'client-vip' ? 'VIP' : 'Client'}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-xl font-bold text-slate-800 dark:text-white">
                    {user.name}
                  </CardTitle>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {user.email}
                  </p>
                </CardHeader>

                <CardContent className="relative z-10">
                  <CardDescription className="text-slate-700 dark:text-slate-300 mb-4">
                    {user.description}
                  </CardDescription>
                  
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                    {user.stats}
                  </p>

                  <Button 
                    onClick={() => handleDemoLogin(user)}
                    disabled={isLoading !== null}
                    className={`w-full bg-gradient-to-r ${user.gradient} hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0`}
                  >
                    {isLoading === user.id ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Connexion...
                      </div>
                    ) : (
                      <>
                        Se connecter comme {user.name.split(' ')[0]}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              🎯 Mode Démonstration
            </h3>
            <p className="text-slate-600 text-sm">
              Cette démo vous permet d'explorer toutes les fonctionnalités sans créer de compte.
              Toutes les données sont simulées à des fins de présentation.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}