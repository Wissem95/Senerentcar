"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { signIn } from "next-auth/react"
import { Mail, Lock, Eye, EyeOff, Car, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading"

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
})

type LoginFormData = z.infer<typeof loginSchema>

// Composant séparé pour gérer le message de succès avec useSearchParams
function SuccessMessage({ onMessageSet }: { onMessageSet: (message: string | null) => void }) {
  const searchParams = useSearchParams()

  useEffect(() => {
    const message = searchParams.get('message')
    if (message) {
      onMessageSet(message)
      // Auto-hide message after 5 seconds
      setTimeout(() => onMessageSet(null), 5000)
    }
  }, [searchParams, onMessageSet])

  return null
}

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [error, setError] = useState("")
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError("")
    
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      })

      if (result?.error) {
        setError("Email ou mot de passe incorrect")
      } else if (result?.ok) {
        router.push("/")
      }
    } catch (error) {
      setError("Une erreur est survenue lors de la connexion")
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Suspense fallback={null}>
        <SuccessMessage onMessageSet={setSuccessMessage} />
      </Suspense>
      <div className="flex justify-center items-center p-4 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Background decorations */}
      <div className="overflow-hidden absolute inset-0">
        <div className="absolute left-10 top-20 w-72 h-72 rounded-full blur-3xl bg-senegal-green/10" />
        <div className="absolute right-10 bottom-20 w-96 h-96 rounded-full blur-3xl bg-senegal-yellow/10" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <Card className="shadow-2xl glass border-white/20">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="flex justify-center items-center w-12 h-12 bg-gradient-to-r rounded-full from-senegal-green to-senegal-yellow">
                <Car className="w-6 h-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
            <CardDescription>
              Connectez-vous à votre compte SeneRentCar
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Success message */}
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex gap-3 items-center p-4 mb-6 rounded-lg border bg-senegal-green/10 border-senegal-green/20"
              >
                <CheckCircle className="flex-shrink-0 w-5 h-5 text-senegal-green" />
                <p className="text-sm font-medium text-senegal-green">{successMessage}</p>
              </motion.div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex gap-2 items-center">
                  <Mail className="w-4 h-4 text-senegal-green" />
                  Adresse email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  {...register("email")}
                  className={errors.email ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="flex gap-2 items-center">
                  <Lock className="w-4 h-4 text-senegal-green" />
                  Mot de passe
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Votre mot de passe"
                    {...register("password")}
                    className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 text-gray-500 transform -translate-y-1/2 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password.message}</p>
                )}
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-senegal-green focus:ring-senegal-green"
                  />
                  <span>Se souvenir de moi</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="font-medium text-senegal-green hover:text-senegal-green/80"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                variant="senegal"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner className="mr-2" />
                    Connexion en cours...
                  </>
                ) : (
                  "Se connecter"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center mt-6">
              <div className="flex-1 border-t border-gray-300" />
              <span className="px-4 text-sm text-gray-500">Ou</span>
              <div className="flex-1 border-t border-gray-300" />
            </div>

            {/* Social login */}
            <div className="mt-6 space-y-3">
              <Button variant="outline" className="w-full" disabled={isLoading}>
                <svg className="mr-2 w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continuer avec Google
              </Button>
            </div>

            {/* Sign up link */}
            <div className="mt-6 text-sm text-center">
              <span className="text-gray-600">Vous n&apos;avez pas de compte ? </span>
              <Link
                href="/register"
                className="font-medium text-senegal-green hover:text-senegal-green/80"
              >
                Créer un compte
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
    </>
  )
}

export default function LoginPage() {
  return <LoginForm />
}