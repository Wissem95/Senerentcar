"use client"

import { MainLayout } from "@/components/layouts/main-layout"
import { ContactForm } from "@/components/forms/contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Globe,
  Car
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function ContactPage() {
  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/senerentcar", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com/senerentcar", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com/senerentcar", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com/company/senerentcar", label: "LinkedIn" }
  ]

  const offices = [
    {
      name: "Siège Principal - Dakar Plateau",
      address: "Avenue Léopold Sédar Senghor, Immeuble Fahd",
      city: "Plateau, Dakar, Sénégal",
      phone: "+221 77 123 45 67",
      email: "dakar@senerentcar.sn",
      hours: "Lun-Ven: 8h-19h, Sam-Dim: 9h-17h",
      isMain: true
    },
    {
      name: "Agence Aéroport LSS",
      address: "Aéroport International Blaise Diagne",
      city: "Diass, Sénégal",
      phone: "+221 77 999 88 77",
      email: "airport@senerentcar.sn",
      hours: "7j/7: 5h-24h (service continu)",
      isMain: false
    },
    {
      name: "Agence Thiès Centre",
      address: "Avenue Général de Gaulle, près de la Gare",
      city: "Thiès, Sénégal",
      phone: "+221 77 234 56 78",
      email: "thies@senerentcar.sn",
      hours: "Lun-Ven: 8h30-18h30, Sam: 9h-16h",
      isMain: false
    },
    {
      name: "Agence Saint-Louis Île",
      address: "Quai Henry Jay, près du Pont Faidherbe",
      city: "Saint-Louis, Sénégal",
      phone: "+221 77 345 67 89",
      email: "saintlouis@senerentcar.sn",
      hours: "Lun-Ven: 8h-18h, Sam: 9h-16h",
      isMain: false
    },
    {
      name: "Agence Ziguinchor Casamance",
      address: "Avenue Émile Badiane, près du Marché Central",
      city: "Ziguinchor, Casamance",
      phone: "+221 77 456 78 90",
      email: "ziguinchor@senerentcar.sn",
      hours: "Lun-Ven: 8h-18h, Sam-Dim: 9h-16h",
      isMain: false
    }
  ]

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-senegal-green to-senegal-green/80 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-4 py-16 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Contactez-nous
              </h1>
              <p className="text-xl text-green-50">
                Notre équipe est à votre disposition pour répondre à toutes vos questions
                et vous accompagner dans votre location de véhicule au Sénégal.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Contact Form + Info */}
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>
        </div>

        {/* Offices Section */}
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-center mb-8">Nos Agences</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {offices.map((office, index) => (
                <motion.div
                  key={office.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <Card className={office.isMain ? "border-senegal-green border-2" : ""}>
                    <CardContent className="p-6">
                      {office.isMain && (
                        <Badge className="mb-3 bg-senegal-green text-white">
                          Siège Principal
                        </Badge>
                      )}
                      
                      <h3 className="font-semibold text-lg mb-4">{office.name}</h3>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-senegal-green mt-0.5" />
                          <div>
                            <p>{office.address}</p>
                            <p className="text-gray-600">{office.city}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-senegal-green" />
                          <a 
                            href={`tel:${office.phone}`}
                            className="hover:text-senegal-green transition-colors"
                          >
                            {office.phone}
                          </a>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-senegal-green" />
                          <a 
                            href={`mailto:${office.email}`}
                            className="hover:text-senegal-green transition-colors"
                          >
                            {office.email}
                          </a>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-senegal-green" />
                          <p className="text-gray-600">{office.hours}</p>
                        </div>
                      </div>

                      <Button 
                        variant="outline" 
                        className="w-full mt-4"
                        onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(office.address + ', ' + office.city)}`)}
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        Voir sur la carte
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-gray-800 py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-center mb-8">Questions Fréquentes</h2>
              
              <div className="max-w-3xl mx-auto space-y-4">
                {[
                  {
                    question: "Quels documents sont nécessaires pour louer un véhicule ?",
                    answer: "Vous devez présenter un permis de conduire valide, une pièce d'identité et une carte bancaire. Pour les étrangers, un permis international est recommandé."
                  },
                  {
                    question: "L'assurance est-elle incluse dans le prix de location ?",
                    answer: "Oui, une assurance responsabilité civile est incluse. Une assurance tous risques est disponible en option pour une protection complète."
                  },
                  {
                    question: "Puis-je modifier ou annuler ma réservation ?",
                    answer: "Oui, vous pouvez modifier ou annuler gratuitement jusqu'à 24h avant le début de la location. Au-delà, des frais peuvent s'appliquer."
                  },
                  {
                    question: "Proposez-vous la livraison à l'aéroport ?",
                    answer: "Oui, nous proposons un service de livraison/récupération à l'aéroport LSS de Dakar moyennant 5,000 XOF. Réservez 24h à l'avance."
                  },
                  {
                    question: "Quels modes de paiement acceptez-vous ?",
                    answer: "Nous acceptons les cartes bancaires (Visa, Mastercard), les virements, et les paiements mobiles (Orange Money, Wave)."
                  }
                ].map((faq, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2 flex items-start gap-2">
                        <MessageCircle className="w-5 h-5 text-senegal-green mt-0.5" />
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 pl-7">
                        {faq.answer}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-8">
                <p className="text-gray-600 mb-4">Vous ne trouvez pas la réponse à votre question ?</p>
                <Button>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contactez notre support
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Social Links */}
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold mb-6">Suivez-nous sur les réseaux sociaux</h3>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-senegal-green hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-senegal-green text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <h3 className="text-2xl font-bold mb-4">
                <Car className="inline-block w-6 h-6 mr-2" />
                Service d'Urgence 24h/7j
              </h3>
              <p className="mb-4 text-green-100">
                En cas de panne ou d'accident avec votre véhicule de location
              </p>
              <a
                href="tel:+221776543210"
                className="inline-flex items-center gap-2 bg-white text-senegal-green px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <Phone className="w-5 h-5" />
                +221 77 654 32 10
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

// Import Badge manquant
import { Badge } from "@/components/ui/badge"