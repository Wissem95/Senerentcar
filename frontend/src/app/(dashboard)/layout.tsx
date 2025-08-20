import { ReactNode } from "react"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  // DEMO MODE: No authentication checks, direct access to admin pages
  return <>{children}</>
}