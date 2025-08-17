"use client"

import { ReactNode } from "react"
import { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"
import { Card } from "./card"

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  color?: "blue" | "green" | "red" | "yellow" | "purple" | "gray"
  children?: ReactNode
  delay?: number
}

const colorClasses = {
  blue: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400",
  green: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400",
  red: "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400",
  yellow: "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400",
  purple: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400",
  gray: "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400",
}

const changeColorClasses = {
  positive: "text-green-600 dark:text-green-400",
  negative: "text-red-600 dark:text-red-400",
  neutral: "text-gray-600 dark:text-gray-400",
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  change,
  changeType = "neutral",
  color = "blue",
  children,
  delay = 0,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colorClasses[color]}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {title}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {typeof value === 'number' ? value.toLocaleString('fr-FR') : value}
              </p>
              {change && (
                <p className={`text-xs ${changeColorClasses[changeType]}`}>
                  {change}
                </p>
              )}
            </div>
          </div>
          {children}
        </div>
      </Card>
    </motion.div>
  )
}