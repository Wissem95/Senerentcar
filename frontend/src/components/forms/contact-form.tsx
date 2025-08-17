"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertCircle, Send, MapPin, Phone, Mail } from "lucide-react"

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Le sujet doit contenir au moins 5 caractères"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
})

type ContactForm = z.infer<typeof contactSchema>

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactForm) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de l\'envoi')
      }

      setIsSuccess(true)
      form.reset()
    } catch (error: any) {
      setError(error.message || 'Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-senegal-green mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Message envoyé !
          </h3>
          <p className="text-gray-600 mb-6">
            Merci pour votre message. Notre équipe vous contactera sous 24h.
          </p>
          <Button 
            onClick={() => setIsSuccess(false)}
            variant="outline"
          >
            Envoyer un autre message
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Formulaire de contact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="w-5 h-5 text-senegal-green" />
            Envoyez-nous un message
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nom complet *</Label>
                <Input
                  id="name"
                  placeholder="Votre nom"
                  {...form.register("name")}
                  className="mt-1"
                />
                {form.formState.errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  {...form.register("email")}
                  className="mt-1"
                />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+221 XX XXX XX XX"
                {...form.register("phone")}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="subject">Sujet *</Label>
              <Input
                id="subject"
                placeholder="Objet de votre message"
                {...form.register("subject")}
                className="mt-1"
              />
              {form.formState.errors.subject && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.subject.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="message">Message *</Label>
              <textarea
                id="message"
                rows={6}
                placeholder="Décrivez votre demande en détail..."
                {...form.register("message")}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-senegal-green focus:border-transparent resize-none"
              />
              {form.formState.errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.message.message}
                </p>
              )}
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                "Envoi en cours..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Envoyer le message
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Informations de contact */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Nos coordonnées</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-senegal-green mt-0.5" />
              <div>
                <p className="font-medium">Adresse</p>
                <p className="text-gray-600">
                  Avenue Cheikh Anta Diop<br />
                  Dakar, Sénégal
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-senegal-green mt-0.5" />
              <div>
                <p className="font-medium">Téléphone</p>
                <p className="text-gray-600">
                  <a href="tel:+221338234567" className="hover:text-senegal-green">
                    +221 33 823 45 67
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-senegal-green mt-0.5" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-600">
                  <a href="mailto:contact@senerentcar.com" className="hover:text-senegal-green">
                    contact@senerentcar.com
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3">Horaires d'ouverture</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Lundi - Vendredi</span>
                <span className="text-senegal-green font-medium">8h - 18h</span>
              </div>
              <div className="flex justify-between">
                <span>Samedi</span>
                <span className="text-senegal-green font-medium">9h - 16h</span>
              </div>
              <div className="flex justify-between">
                <span>Dimanche</span>
                <span className="text-gray-500">Fermé</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-senegal-green text-white">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold mb-2">Urgence 24h/7j</h3>
            <p className="text-green-100 mb-3 text-sm">
              En cas de problème avec votre véhicule
            </p>
            <a 
              href="tel:+221776543210" 
              className="text-white font-semibold text-lg hover:text-senegal-yellow"
            >
              +221 77 654 32 10
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}