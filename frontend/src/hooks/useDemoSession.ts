import { useState, useEffect } from 'react'

interface DemoUser {
  id: string
  name: string
  email: string
  type: 'client' | 'client-vip' | 'admin'
}

interface DemoSession {
  user: DemoUser
  isDemo: boolean
  loginTime: string
}

export function useDemoSession() {
  const [demoSession, setDemoSession] = useState<DemoSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Marquer le composant comme monté pour éviter les erreurs d'hydratation
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    // Charger la session démo depuis localStorage seulement côté client
    try {
      const storedSession = localStorage.getItem('demoSession')
      if (storedSession) {
        const session = JSON.parse(storedSession)
        setDemoSession(session)
      }
    } catch (error) {
      console.error('Erreur lors du parsing de la session démo:', error)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('demoSession')
      }
    } finally {
      setIsLoading(false)
    }
  }, [mounted])

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('demoSession')
      setDemoSession(null)
      window.location.href = '/'
    }
  }

  const loginAsDemo = (user: DemoUser) => {
    if (typeof window !== 'undefined') {
      const newSession: DemoSession = {
        user,
        isDemo: true,
        loginTime: new Date().toISOString()
      }
      
      localStorage.setItem('demoSession', JSON.stringify(newSession))
      setDemoSession(newSession)
    }
  }

  return {
    demoSession,
    user: demoSession?.user || null,
    isAuthenticated: !!demoSession,
    isDemo: demoSession?.isDemo || false,
    isLoading,
    logout,
    loginAsDemo
  }
}