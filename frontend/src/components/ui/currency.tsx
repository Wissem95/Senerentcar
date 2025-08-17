"use client"

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
  const formattedAmount = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    notation,
  }).format(amount)

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