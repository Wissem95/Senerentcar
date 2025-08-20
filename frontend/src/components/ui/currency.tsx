"use client"

import { useEffect, useState } from "react"

interface CurrencyProps {
  amount: number
  currency?: string
  notation?: "standard" | "compact" | "scientific" | "engineering"
  className?: string
}

export function Currency({ 
  amount, 
  currency = "XOF", 
  notation = "standard",
  className = "font-medium"
}: CurrencyProps) {
  const [formattedAmount, setFormattedAmount] = useState<string>("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const formatted = new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency,
      notation,
    }).format(amount)
    setFormattedAmount(formatted)
  }, [amount, currency, notation])

  // Fallback for SSR - simple formatting without locale-specific separators
  if (!mounted) {
    const simple = `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ${currency === 'XOF' ? 'FCFA' : currency}`
    return <span className={className}>{simple}</span>
  }

  return <span className={className}>{formattedAmount}</span>
}

export function formatCurrency(
  amount: number, 
  currency: string = "XOF", 
  notation: "standard" | "compact" | "scientific" | "engineering" = "standard"
): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    notation,
  }).format(amount)
}