"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
// import { useSession } from "next-auth/react" // DISABLED FOR DEMO
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Car, User, Crown, Wrench, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { NotificationBell } from "@/components/ui/push-notifications"
// import { LogoutButton } from "@/components/auth/logout-button" // DISABLED FOR DEMO
import { useDemoSession } from "@/hooks/useDemoSession"

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Catalogue", href: "/catalogue" },
  { name: "À propos", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  // DEMO MODE: Use demo session instead of NextAuth
  const { user, isAuthenticated, isLoading, logout } = useDemoSession()

  const getUserIcon = () => {
    if (!user) return User
    switch (user.type) {
      case 'admin': return Wrench
      case 'client-vip': return Crown
      default: return User
    }
  }

  const getUserBadge = () => {
    if (!user) return null
    switch (user.type) {
      case 'admin': return { text: 'Admin', color: 'bg-red-100 text-red-700' }
      case 'client-vip': return { text: 'VIP', color: 'bg-amber-100 text-amber-700' }
      default: return { text: 'Client', color: 'bg-blue-100 text-blue-700' }
    }
  }

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">SeneRentCar</span>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-senegal-green to-senegal-yellow rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold senegal-gradient-text">
                SeneRentCar
              </span>
            </div>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Ouvrir le menu principal</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-semibold leading-6 transition-colors hover:text-senegal-green",
                pathname === item.href
                  ? "text-senegal-green"
                  : "text-gray-900"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Auth buttons */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          {isLoading ? (
            <div className="flex items-center gap-x-4">
              <div className="w-16 h-8 bg-gray-200 animate-pulse rounded"></div>
            </div>
          ) : isAuthenticated && user ? (
            <div className="flex items-center gap-x-4">
              <NotificationBell />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 flex items-center">
                    {React.createElement(getUserIcon(), { className: "w-4 h-4" })}
                    <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
                    {getUserBadge() && (
                      <Badge className={`text-xs px-2 py-1 ${getUserBadge()!.color}`}>
                        {getUserBadge()!.text}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      <Badge className={`text-xs w-fit ${getUserBadge()!.color}`}>
                        🎯 Mode Démo - {getUserBadge()!.text}
                      </Badge>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Mon Profil
                    </Link>
                  </DropdownMenuItem>
                  {user.type === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex items-center">
                        <Wrench className="mr-2 h-4 w-4" />
                        Administration
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={logout}
                    className="text-red-600 cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-x-4">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  🎯 Démo
                </Button>
              </Link>
              <Link href="/demo-login">
                <Button variant="default" size="sm" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                  Se Connecter
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden"
          >
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50" />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
            >
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-senegal-green to-senegal-yellow rounded-lg flex items-center justify-center">
                      <Car className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-bold senegal-gradient-text">
                      SeneRentCar
                    </span>
                  </div>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Fermer le menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50",
                          pathname === item.href
                            ? "text-senegal-green"
                            : "text-gray-900"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  
                  <div className="py-6">
                    {isLoading ? (
                      <div className="space-y-2">
                        <div className="w-full h-10 bg-gray-200 animate-pulse rounded"></div>
                      </div>
                    ) : isAuthenticated && user ? (
                      <div className="space-y-2">
                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-3 mb-4 border border-emerald-200">
                          <div className="flex items-center gap-2 mb-2">
                            {React.createElement(getUserIcon(), { className: "w-4 h-4" })}
                            <span className="font-medium text-sm">{user.name}</span>
                            {getUserBadge() && (
                              <Badge className={`text-xs ${getUserBadge()!.color}`}>
                                {getUserBadge()!.text}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-emerald-700">🎯 Mode Démonstration</p>
                        </div>
                        
                        <Link
                          href="/profile"
                          className="-mx-3 flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          Mon Profil
                        </Link>
                        
                        {user.type === 'admin' && (
                          <Link
                            href="/admin"
                            className="-mx-3 flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <Wrench className="w-4 h-4" />
                            Administration
                          </Link>
                        )}
                        
                        <button
                          onClick={() => {
                            logout()
                            setMobileMenuOpen(false)
                          }}
                          className="-mx-3 flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-red-600 hover:bg-red-50 w-full text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Déconnexion
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start">
                            🎯 Démo
                          </Button>
                        </Link>
                        <Link href="/demo-login" onClick={() => setMobileMenuOpen(false)}>
                          <Button className="w-full justify-start bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                            Se Connecter
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}