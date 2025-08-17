"use client"

import { useState } from "react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { LogOut, Loader2, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface LogoutButtonProps {
  className?: string
  variant?: "default" | "ghost" | "outline" | "secondary" | "destructive" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  showConfirmation?: boolean
  redirectTo?: string
  children?: React.ReactNode
}

export function LogoutButton({
  className,
  variant = "ghost",
  size = "sm",
  showConfirmation = true,
  redirectTo = "/",
  children
}: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoading(true)
    
    try {
      // Sign out with NextAuth
      await signOut({
        redirect: false // We'll handle redirect manually
      })
      
      // Clear any additional client-side storage
      localStorage.removeItem('user-preferences')
      localStorage.removeItem('cart-items')
      sessionStorage.clear()
      
      // Close dialog
      setShowDialog(false)
      
      // Redirect to specified page
      router.push(redirectTo)
      router.refresh() // Refresh to ensure auth state is updated
      
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClick = () => {
    if (showConfirmation) {
      setShowDialog(true)
    } else {
      handleLogout()
    }
  }

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <LogOut className="w-4 h-4 mr-2" />
        )}
        {children || "Déconnexion"}
      </Button>

      <AnimatePresence>
        {showDialog && (
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent className="sm:max-w-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <DialogTitle>Confirmer la déconnexion</DialogTitle>
                      <DialogDescription>
                        Êtes-vous sûr de vouloir vous déconnecter de votre compte Senerentcar ?
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>

                <div className="my-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Après déconnexion, vous devrez vous reconnecter pour :
                  </p>
                  <ul className="mt-2 text-sm text-gray-600 space-y-1">
                    <li>• Accéder à votre profil</li>
                    <li>• Voir vos réservations</li>
                    <li>• Effectuer de nouvelles réservations</li>
                  </ul>
                </div>

                <DialogFooter className="gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowDialog(false)}
                    disabled={isLoading}
                  >
                    Annuler
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleLogout}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Déconnexion...
                      </>
                    ) : (
                      <>
                        <LogOut className="w-4 h-4 mr-2" />
                        Se déconnecter
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  )
}

// Quick logout button without confirmation
export function QuickLogoutButton({ className }: { className?: string }) {
  return (
    <LogoutButton
      className={className}
      showConfirmation={false}
      variant="ghost"
      size="sm"
    >
      <LogOut className="w-4 h-4" />
    </LogoutButton>
  )
}