"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Car, ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    // Auto-redirect vers la démo après 3 secondes
    const timer = setTimeout(() => {
      router.push('/demo-login')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  const handleDemoRedirect = () => {
    router.push('/demo-login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="h-16 w-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Car className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            SeneRentCar
          </h1>
          <p className="text-slate-600">
            Mode Démonstration Activé
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-bold text-slate-800">
                🎯 Démonstration Interactive
              </CardTitle>
              <CardDescription className="text-slate-600">
                L'authentification a été désactivée pour cette démo.
                Explorez la plateforme avec des profils pré-configurés.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">👤 Profils disponibles :</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• <strong>Client Standard</strong> - Amadou Diallo</li>
                  <li>• <strong>Client VIP</strong> - Fatou Sow</li>
                  <li>• <strong>Administrateur</strong> - Admin SeneRentCar</li>
                </ul>
              </div>

              <Button 
                onClick={handleDemoRedirect}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-12"
              >
                <Play className="mr-2 h-4 w-4" />
                Commencer la Démo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="text-center text-xs text-slate-500 mt-4">
                Redirection automatique dans <span className="font-mono">3s</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
            <p className="text-emerald-700 text-sm">
              <strong>🔒 Mode Sécurisé :</strong> Toutes les données sont simulées.
              Aucune information réelle n'est collectée ou stockée.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}