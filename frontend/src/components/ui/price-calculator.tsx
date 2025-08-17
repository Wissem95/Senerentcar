"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Calculator, Info, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Badge } from "./badge"
import { Currency } from "./currency"

interface PriceBreakdown {
  basePrice: number
  days: number
  subtotal: number
  insurance: number
  taxes: number
  fees: number
  discounts: number
  total: number
}

interface PriceCalculatorProps {
  pricePerDay: number
  startDate?: Date
  endDate?: Date
  vehicleCategory?: string
  location?: string
  className?: string
  onPriceChange?: (breakdown: PriceBreakdown) => void
}

const INSURANCE_RATE = 0.12 // 12%
const TAX_RATE = 0.18 // 18% (TVA Sénégal)
const SERVICE_FEE = 2500 // Frais de service fixe
const WEEKEND_MULTIPLIER = 1.2 // Supplément weekend
const LONG_TERM_DISCOUNT_THRESHOLD = 7 // Jours pour remise long terme
const LONG_TERM_DISCOUNT_RATE = 0.1 // 10% de remise

function calculateDays(startDate?: Date, endDate?: Date): number {
  if (!startDate || !endDate) return 0
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(1, diffDays) // Minimum 1 jour
}

function isWeekend(date: Date): boolean {
  const day = date.getDay()
  return day === 0 || day === 6 // Dimanche ou Samedi
}

function hasWeekendDays(startDate?: Date, endDate?: Date): boolean {
  if (!startDate || !endDate) return false
  
  const current = new Date(startDate)
  while (current <= endDate) {
    if (isWeekend(current)) return true
    current.setDate(current.getDate() + 1)
  }
  return false
}

export function PriceCalculator({
  pricePerDay,
  startDate,
  endDate,
  vehicleCategory = "Économique",
  location = "Dakar",
  className,
  onPriceChange
}: PriceCalculatorProps) {
  const [showDetails, setShowDetails] = useState(false)

  const breakdown = useMemo((): PriceBreakdown => {
    const days = calculateDays(startDate, endDate)
    if (days === 0) {
      return {
        basePrice: pricePerDay,
        days: 0,
        subtotal: 0,
        insurance: 0,
        taxes: 0,
        fees: 0,
        discounts: 0,
        total: 0
      }
    }

    // Prix de base avec supplément weekend si nécessaire
    let adjustedPricePerDay = pricePerDay
    if (hasWeekendDays(startDate, endDate)) {
      adjustedPricePerDay = pricePerDay * WEEKEND_MULTIPLIER
    }

    const subtotal = adjustedPricePerDay * days
    const insurance = subtotal * INSURANCE_RATE
    const fees = SERVICE_FEE
    
    // Calcul des taxes sur subtotal + assurance + frais
    const taxableAmount = subtotal + insurance + fees
    const taxes = taxableAmount * TAX_RATE

    // Remise long terme
    let discounts = 0
    if (days >= LONG_TERM_DISCOUNT_THRESHOLD) {
      discounts = subtotal * LONG_TERM_DISCOUNT_RATE
    }

    const total = subtotal + insurance + fees + taxes - discounts

    return {
      basePrice: adjustedPricePerDay,
      days,
      subtotal,
      insurance,
      taxes,
      fees,
      discounts,
      total: Math.round(total)
    }
  }, [pricePerDay, startDate, endDate])

  // Notify parent of price changes
  useEffect(() => {
    onPriceChange?.(breakdown)
  }, [breakdown, onPriceChange])

  const hasValidDates = startDate && endDate && breakdown.days > 0

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-senegal-green" />
          Calcul du prix
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!hasValidDates ? (
          <div className="text-center py-8">
            <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-gray-500">
              Sélectionnez vos dates pour voir le prix
            </p>
          </div>
        ) : (
          <>
            {/* Prix total principal */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="text-center p-6 bg-gradient-to-r from-senegal-green/10 to-senegal-yellow/10 rounded-lg"
            >
              <div className="text-3xl font-bold text-senegal-green">
                <Currency amount={breakdown.total} />
              </div>
              <p className="text-gray-600 mt-1">
                pour {breakdown.days} jour{breakdown.days > 1 ? 's' : ''}
              </p>
              
              {/* Badges informatifs */}
              <div className="flex justify-center gap-2 mt-3 flex-wrap">
                {hasWeekendDays(startDate, endDate) && (
                  <Badge variant="outline" className="text-xs">
                    Supplément weekend
                  </Badge>
                )}
                {breakdown.days >= LONG_TERM_DISCOUNT_THRESHOLD && (
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    Remise long terme
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs">
                  Assurance incluse
                </Badge>
              </div>
            </motion.div>

            {/* Résumé rapide */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Prix par jour:</span>
                <span className="font-medium">
                  <Currency amount={breakdown.basePrice} />
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Nombre de jours:</span>
                <span className="font-medium">{breakdown.days}</span>
              </div>
            </div>

            {/* Toggle détails */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-center gap-2 py-2 text-senegal-green hover:text-senegal-green/80 transition-colors"
            >
              <Info className="w-4 h-4" />
              <span className="text-sm">
                {showDetails ? 'Masquer' : 'Voir'} le détail
              </span>
            </button>

            {/* Détail des prix */}
            <motion.div
              initial={false}
              animate={{ height: showDetails ? 'auto' : 0, opacity: showDetails ? 1 : 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-3 pt-3 border-t">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Location ({breakdown.days} jour{breakdown.days > 1 ? 's' : ''})
                    </span>
                    <span><Currency amount={breakdown.subtotal} /></span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Assurance ({Math.round(INSURANCE_RATE * 100)}%)
                    </span>
                    <span><Currency amount={breakdown.insurance} /></span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frais de service</span>
                    <span><Currency amount={breakdown.fees} /></span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      TVA ({Math.round(TAX_RATE * 100)}%)
                    </span>
                    <span><Currency amount={breakdown.taxes} /></span>
                  </div>
                  
                  {breakdown.discounts > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>
                        Remise long terme (-{Math.round(LONG_TERM_DISCOUNT_RATE * 100)}%)
                      </span>
                      <span>-<Currency amount={breakdown.discounts} /></span>
                    </div>
                  )}
                </div>
                
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between font-semibold">
                    <span>Total à payer</span>
                    <span className="text-senegal-green">
                      <Currency amount={breakdown.total} />
                    </span>
                  </div>
                </div>

                {/* Informations supplémentaires */}
                <div className="p-3 bg-blue-50 rounded-lg text-xs text-blue-800">
                  <p className="font-medium mb-1">Inclus dans ce prix :</p>
                  <ul className="space-y-1">
                    <li>• Assurance tous risques</li>
                    <li>• Assistance 24h/7j</li>
                    <li>• Kilométrage illimité au Sénégal</li>
                    <li>• Carburant à la prise en charge</li>
                  </ul>
                </div>

                {/* Prix par jour moyen si remise */}
                {breakdown.discounts > 0 && (
                  <div className="text-center text-sm text-green-600">
                    <p>
                      Soit <Currency amount={breakdown.total / breakdown.days} /> par jour
                      <span className="text-gray-500"> (au lieu de <Currency amount={breakdown.basePrice} />)</span>
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </CardContent>
    </Card>
  )
}