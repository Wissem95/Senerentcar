"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion, AnimatePresence } from "framer-motion"
import {
  CreditCard,
  Smartphone,
  Building2,
  Shield,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
  Loader2
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Currency } from "@/components/ui/currency"

const paymentSchema = z.object({
  paymentMethod: z.enum(["card", "orange_money", "wave", "bank_transfer"]),
  // Card fields
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
  cardholderName: z.string().optional(),
  // Mobile money fields
  phoneNumber: z.string().optional(),
  // Bank transfer fields
  bankAccount: z.string().optional(),
  accountHolder: z.string().optional(),
})

type PaymentFormData = z.infer<typeof paymentSchema>

interface PaymentFormProps {
  amount: number
  onSubmit: (data: PaymentFormData) => Promise<void>
  onBack: () => void
  loading?: boolean
}

interface PaymentMethod {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  fees?: number
  processingTime: string
  popular?: boolean
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    name: "Carte Bancaire",
    description: "Visa, Mastercard, etc.",
    icon: <CreditCard className="w-5 h-5" />,
    color: "bg-blue-500",
    fees: 0,
    processingTime: "Instantané",
    popular: true
  },
  {
    id: "orange_money",
    name: "Orange Money",
    description: "Paiement mobile Orange",
    icon: <Smartphone className="w-5 h-5" />,
    color: "bg-orange-500",
    fees: 100,
    processingTime: "1-2 minutes"
  },
  {
    id: "wave",
    name: "Wave",
    description: "Portefeuille mobile Wave",
    icon: <Smartphone className="w-5 h-5" />,
    color: "bg-purple-500",
    fees: 0,
    processingTime: "Instantané",
    popular: true
  },
  {
    id: "bank_transfer",
    name: "Virement Bancaire",
    description: "Virement depuis votre banque",
    icon: <Building2 className="w-5 h-5" />,
    color: "bg-green-600",
    fees: 0,
    processingTime: "1-2 jours ouvrés"
  }
]

export function PaymentForm({ amount, onSubmit, onBack, loading = false }: PaymentFormProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("wave")
  const [showCvv, setShowCvv] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: "wave" as const
    }
  })

  const selectedPaymentMethod = paymentMethods.find(m => m.id === selectedMethod)
  const totalWithFees = amount + (selectedPaymentMethod?.fees || 0)

  const handleSubmit = async (data: PaymentFormData) => {
    setIsProcessing(true)
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      await onSubmit(data)
    } finally {
      setIsProcessing(false)
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const renderPaymentFields = () => {
    switch (selectedMethod) {
      case "card":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white">
              <div className="flex justify-between items-start mb-4">
                <div className="text-sm">Nom du porteur</div>
                <CreditCard className="w-6 h-6" />
              </div>
              <div className="text-lg font-mono tracking-wider mb-2">
                {form.watch("cardNumber") ? formatCardNumber(form.watch("cardNumber") || "") : "•••• •••• •••• ••••"}
              </div>
              <div className="flex justify-between text-sm">
                <div>{form.watch("cardholderName") || "NOM PRENOM"}</div>
                <div>{form.watch("expiryDate") || "MM/YY"}</div>
              </div>
            </div>

            <div>
              <Label>Nom du porteur</Label>
              <Input
                {...form.register("cardholderName")}
                placeholder="Nom tel qu'inscrit sur la carte"
                className="uppercase"
              />
            </div>

            <div>
              <Label>Numéro de carte</Label>
              <Input
                {...form.register("cardNumber")}
                placeholder="1234 5678 9012 3456"
                onChange={(e) => {
                  const formatted = formatCardNumber(e.target.value)
                  form.setValue("cardNumber", formatted)
                }}
                maxLength={19}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Date d'expiration</Label>
                <Input
                  {...form.register("expiryDate")}
                  placeholder="MM/YY"
                  onChange={(e) => {
                    const formatted = formatExpiryDate(e.target.value)
                    form.setValue("expiryDate", formatted)
                  }}
                  maxLength={5}
                />
              </div>
              <div>
                <Label>Code CVV</Label>
                <div className="relative">
                  <Input
                    {...form.register("cvv")}
                    type={showCvv ? "text" : "password"}
                    placeholder="123"
                    maxLength={4}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCvv(!showCvv)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCvv ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg text-green-800">
              <Shield className="w-4 h-4" />
              <span className="text-sm">Paiement sécurisé SSL 256 bits</span>
            </div>
          </motion.div>
        )

      case "orange_money":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-white">
              <div className="flex items-center gap-3 mb-4">
                <Smartphone className="w-6 h-6" />
                <div>
                  <div className="font-semibold">Orange Money</div>
                  <div className="text-sm opacity-90">Paiement mobile sécurisé</div>
                </div>
              </div>
            </div>

            <div>
              <Label>Numéro de téléphone Orange</Label>
              <Input
                {...form.register("phoneNumber")}
                placeholder="+221 77 123 45 67"
                type="tel"
              />
              <p className="text-sm text-gray-600 mt-1">
                Un code de confirmation sera envoyé sur ce numéro
              </p>
            </div>

            <div className="p-3 bg-orange-50 rounded-lg">
              <h4 className="font-medium text-orange-800 mb-2">Instructions de paiement :</h4>
              <ol className="text-sm text-orange-700 space-y-1">
                <li>1. Composez #144# depuis votre téléphone Orange</li>
                <li>2. Sélectionnez "Paiement marchand"</li>
                <li>3. Entrez le code marchand qui vous sera fourni</li>
                <li>4. Confirmez le montant et validez avec votre code PIN</li>
              </ol>
            </div>
          </motion.div>
        )

      case "wave":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg text-white">
              <div className="flex items-center gap-3 mb-4">
                <Smartphone className="w-6 h-6" />
                <div>
                  <div className="font-semibold">Wave</div>
                  <div className="text-sm opacity-90">Portefeuille mobile gratuit</div>
                </div>
              </div>
            </div>

            <div>
              <Label>Numéro de téléphone Wave</Label>
              <Input
                {...form.register("phoneNumber")}
                placeholder="+221 70 123 45 67"
                type="tel"
              />
              <p className="text-sm text-gray-600 mt-1">
                Assurez-vous d'avoir un solde suffisant sur votre compte Wave
              </p>
            </div>

            <div className="p-3 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-2">Avantages Wave :</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Aucun frais de transaction</li>
                <li>• Confirmation instantanée</li>
                <li>• 100% sécurisé et garanti</li>
                <li>• Disponible 24h/24, 7j/7</li>
              </ul>
            </div>
          </motion.div>
        )

      case "bank_transfer":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="p-4 bg-gradient-to-r from-green-600 to-green-700 rounded-lg text-white">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-6 h-6" />
                <div>
                  <div className="font-semibold">Virement Bancaire</div>
                  <div className="text-sm opacity-90">Transfert depuis votre banque</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Nom du titulaire</Label>
                <Input
                  {...form.register("accountHolder")}
                  placeholder="Nom du titulaire du compte"
                />
              </div>
              <div>
                <Label>IBAN ou numéro de compte</Label>
                <Input
                  {...form.register("bankAccount")}
                  placeholder="SN08 1234 5678 9012 3456 7890"
                />
              </div>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Informations de virement :</h4>
              <div className="text-sm text-blue-700 space-y-1">
                <p><strong>Bénéficiaire :</strong> Senerentcar SARL</p>
                <p><strong>Banque :</strong> CBAO Groupe Attijariwafa Bank</p>
                <p><strong>IBAN :</strong> SN08 CBAO 1234 5678 9012 3456 7890</p>
                <p><strong>Code BIC :</strong> CBAOSNDK</p>
                <p><strong>Référence :</strong> {Date.now().toString().slice(-6)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg text-yellow-800">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">
                Délai de traitement : 1-2 jours ouvrés. Votre réservation sera confirmée après réception.
              </span>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Payment Methods Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Choisissez votre méthode de paiement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <motion.label
                key={method.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedMethod === method.id
                    ? "border-senegal-green bg-senegal-green/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={(e) => {
                    setSelectedMethod(e.target.value)
                    form.setValue("paymentMethod", e.target.value as any)
                  }}
                  className="sr-only"
                />
                
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white mr-3 ${method.color}`}>
                  {method.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{method.name}</p>
                    {method.popular && (
                      <Badge variant="secondary" className="text-xs">Populaire</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{method.description}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                    <span>⚡ {method.processingTime}</span>
                    {method.fees ? (
                      <span>💰 Frais: <Currency amount={method.fees} /></span>
                    ) : (
                      <span className="text-green-600">✓ Gratuit</span>
                    )}
                  </div>
                </div>

                {selectedMethod === method.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-6 h-6 bg-senegal-green rounded-full flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </motion.label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Form */}
      <Card>
        <CardHeader>
          <CardTitle>Détails de paiement</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <AnimatePresence mode="wait">
              {renderPaymentFields()}
            </AnimatePresence>

            {/* Price Summary */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span>Sous-total</span>
                <Currency amount={amount} />
              </div>
              {selectedPaymentMethod?.fees ? (
                <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
                  <span>Frais de transaction ({selectedPaymentMethod.name})</span>
                  <Currency amount={selectedPaymentMethod.fees} />
                </div>
              ) : null}
              <div className="border-t pt-2 flex justify-between items-center font-bold text-lg">
                <span>Total à payer</span>
                <Currency amount={totalWithFees} className="text-senegal-green" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={onBack} disabled={isProcessing}>
                Retour
              </Button>
              <Button 
                type="submit" 
                className="px-8 bg-senegal-green hover:bg-senegal-green/90"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Traitement...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Payer <Currency amount={totalWithFees} />
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}