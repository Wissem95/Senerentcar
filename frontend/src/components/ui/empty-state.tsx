"use client"

import { ReactNode } from "react"
import { LucideIcon } from "lucide-react"
import { Button } from "./button"
import { Card } from "./card"

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  children?: ReactNode
  className?: string
}

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action, 
  children, 
  className = "" 
}: EmptyStateProps) {
  return (
    <Card className={`p-12 ${className}`}>
      <div className="text-center">
        {Icon && (
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <Icon className="h-6 w-6 text-gray-400" />
          </div>
        )}
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {description}
          </p>
        )}
        {action && (
          <Button onClick={action.onClick}>
            {action.label}
          </Button>
        )}
        {children}
      </div>
    </Card>
  )
}