"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  Car, 
  CreditCard, 
  Shield, 
  Clock, 
  Phone, 
  Mail, 
  MessageCircle,
  FileText,
  MapPin,
  AlertCircle
} from "lucide-react"

import { MainLayout } from "@/components/layouts/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const categories = [
  {
    id: "reservation",
    title: "Réservation",
    icon: Car,
    color: "bg-blue-100 text-blue-700",
    questions: [
      {
        question: "Comment puis-je réserver un véhicule ?",
        answer: "Vous pouvez réserver directement sur notre site web ou via notre application mobile. Sélectionnez vos dates, choisissez votre véhicule et suivez les étapes de réservation. Vous pouvez également nous appeler au +221 33 123 45 67."
      },
      {
        question: "Combien de temps à l'avance dois-je réserver ?",
        answer: "Nous recommandons de réserver au moins 24h à l'avance pour garantir la disponibilité. Cependant, des réservations de dernière minute sont possibles selon la disponibilité de notre flotte."
      },
      {
        question: "Puis-je modifier ou annuler ma réservation ?",
        answer: "Oui, vous pouvez modifier ou annuler votre réservation jusqu'à 24h avant la prise du véhicule sans frais. Les modifications tardives peuvent entraîner des frais supplémentaires."
      },
      {
        question: "Quels documents dois-je fournir pour réserver ?",
        answer: "Vous devez fournir : une pièce d'identité valide (CNI ou passeport), un permis de conduire valide depuis au moins 2 ans, et une carte bancaire pour la caution."
      }
    ]
  },
  {
    id: "paiement",
    title: "Paiement",
    icon: CreditCard,
    color: "bg-green-100 text-green-700",
    questions: [
      {
        question: "Quels moyens de paiement acceptez-vous ?",
        answer: "Nous acceptons : Orange Money, Wave, Free Money, virements bancaires, cartes Visa/Mastercard, et les espèces dans nos agences."
      },
      {
        question: "Quand dois-je payer ma location ?",
        answer: "Le paiement s'effectue lors de la réservation en ligne ou à la prise du véhicule. Pour les réservations par téléphone, le paiement doit être effectué avant la récupération du véhicule."
      },
      {
        question: "Quelle est le montant de la caution ?",
        answer: "La caution varie selon le véhicule : 100 000 FCFA pour les véhicules économiques, 200 000 FCFA pour les berlines, et 500 000 FCFA pour les véhicules de luxe. Elle est libérée après retour du véhicule."
      },
      {
        question: "Les prix incluent-ils l'assurance ?",
        answer: "Oui, nos tarifs incluent l'assurance responsabilité civile et une assurance tous risques avec franchise. Le carburant n'est pas inclus."
      }
    ]
  },
  {
    id: "conduite",
    title: "Conduite & Assurance",
    icon: Shield,
    color: "bg-purple-100 text-purple-700",
    questions: [
      {
        question: "Quel âge minimum pour louer un véhicule ?",
        answer: "L'âge minimum est de 21 ans pour les véhicules de catégorie économique et 25 ans pour les véhicules de luxe. Le permis de conduire doit être valide depuis au moins 2 ans."
      },
      {
        question: "Puis-je conduire en dehors du Sénégal ?",
        answer: "La conduite est autorisée uniquement sur le territoire sénégalais sauf accord préalable écrit. Pour les déplacements vers la Gambie ou la Guinée-Bissau, veuillez nous contacter."
      },
      {
        question: "Que faire en cas d'accident ?",
        answer: "En cas d'accident : 1) Assurez-vous que personne n'est blessé, 2) Contactez immédiatement la police (17) et Senerentcar (+221 77 123 45 67), 3) Ne quittez pas les lieux, 4) Prenez des photos si possible."
      },
      {
        question: "Puis-je ajouter un conducteur supplémentaire ?",
        answer: "Oui, vous pouvez ajouter des conducteurs supplémentaires moyennant 5 000 FCFA par conducteur et par jour. Ils doivent également présenter un permis valide et être âgés de plus de 21 ans."
      }
    ]
  },
  {
    id: "utilisation",
    title: "Utilisation du véhicule",
    icon: Car,
    color: "bg-orange-100 text-orange-700",
    questions: [
      {
        question: "Le carburant est-il inclus ?",
        answer: "Non, le carburant n'est pas inclus. Le véhicule vous est remis avec le plein de carburant et doit être restitué dans le même état. Le réservoir doit être plein au retour."
      },
      {
        question: "Y a-t-il une limitation de kilométrage ?",
        answer: "Non, le kilométrage est illimité sur le territoire sénégalais. Vous pouvez parcourir autant de kilomètres que nécessaire sans frais supplémentaires."
      },
      {
        question: "Puis-je fumer dans le véhicule ?",
        answer: "Non, il est strictement interdit de fumer dans nos véhicules. Des frais de nettoyage de 50 000 FCFA seront appliqués en cas de non-respect de cette règle."
      },
      {
        question: "Que faire si j'ai une panne ?",
        answer: "Contactez immédiatement notre assistance 24h/7j au +221 77 123 45 67. Nous vous enverrons un dépanneur ou un véhicule de remplacement selon la situation."
      }
    ]
  },
  {
    id: "pratique",
    title: "Informations pratiques",
    icon: Clock,
    color: "bg-gray-100 text-gray-700",
    questions: [
      {
        question: "Quels sont vos horaires d'ouverture ?",
        answer: "Nos agences sont ouvertes du lundi au samedi de 8h à 18h, et le dimanche de 9h à 15h. Notre assistance téléphonique est disponible 24h/7j."
      },
      {
        question: "Où puis-je récupérer mon véhicule ?",
        answer: "Vous pouvez récupérer votre véhicule dans nos agences de Dakar (Plateau), Thiès (centre-ville), ou Saint-Louis (centre). Livraison possible à l'aéroport moyennant supplément."
      },
      {
        question: "Proposez-vous la livraison à domicile ?",
        answer: "Oui, nous proposons la livraison et la récupération à domicile dans un rayon de 15 km de nos agences pour 15 000 FCFA. Au-delà, le tarif est de 1 000 FCFA par kilomètre."
      },
      {
        question: "Comment contacter le service client ?",
        answer: "Vous pouvez nous contacter par téléphone (+221 33 123 45 67), WhatsApp (+221 77 123 45 67), email (contact@senerentcar.sn), ou via le chat en direct sur notre site."
      }
    ]
  }
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("reservation")
  const [openQuestions, setOpenQuestions] = useState<string[]>([])

  const toggleQuestion = (categoryId: string, questionIndex: number) => {
    const questionId = `${categoryId}-${questionIndex}`
    setOpenQuestions(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    )
  }

  const filteredCategories = categories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-senegal-green to-senegal-yellow rounded-full flex items-center justify-center">
                  <HelpCircle className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Centre d'Aide & FAQ
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Trouvez rapidement les réponses à vos questions sur la location de véhicules au Sénégal
              </p>
              
              {/* Search bar */}
              <div className="max-w-2xl mx-auto relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Rechercher dans la FAQ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 focus:border-senegal-green"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all ${
                    activeCategory === category.id
                      ? "bg-senegal-green text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  <category.icon className="w-5 h-5" />
                  {category.title}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {searchTerm ? (
              // Search results
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  Résultats de recherche pour "{searchTerm}"
                </h2>
                {filteredCategories.length > 0 ? (
                  <div className="space-y-8">
                    {filteredCategories.map((category) => (
                      <div key={category.id}>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                          <category.icon className="w-6 h-6 text-senegal-green" />
                          {category.title}
                        </h3>
                        <div className="space-y-4">
                          {category.questions.map((faq, index) => (
                            <Card key={index} className="hover:shadow-md transition-shadow">
                              <CardContent className="p-6">
                                <h4 className="font-medium text-gray-900 mb-3">{faq.question}</h4>
                                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Aucun résultat trouvé</h3>
                    <p className="text-gray-600">Essayez avec d'autres mots-clés ou parcourez nos catégories.</p>
                  </div>
                )}
              </div>
            ) : (
              // Category view
              <div>
                {categories
                  .filter(category => category.id === activeCategory)
                  .map((category) => (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${category.color}`}>
                          <category.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-gray-900">{category.title}</h2>
                          <p className="text-gray-600">
                            {category.questions.length} question(s) fréquente(s)
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {category.questions.map((faq, index) => {
                          const questionId = `${category.id}-${index}`
                          const isOpen = openQuestions.includes(questionId)
                          
                          return (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                              <Card className="hover:shadow-md transition-shadow">
                                <CardHeader 
                                  className="cursor-pointer"
                                  onClick={() => toggleQuestion(category.id, index)}
                                >
                                  <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg font-medium text-gray-900 pr-4">
                                      {faq.question}
                                    </CardTitle>
                                    <motion.div
                                      animate={{ rotate: isOpen ? 180 : 0 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                    </motion.div>
                                  </div>
                                </CardHeader>
                                <AnimatePresence>
                                  {isOpen && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      <CardContent className="pt-0 pb-6">
                                        <p className="text-gray-600 leading-relaxed">
                                          {faq.answer}
                                        </p>
                                      </CardContent>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </Card>
                            </motion.div>
                          )
                        })}
                      </div>
                    </motion.div>
                  ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Vous ne trouvez pas votre réponse ?
              </h2>
              <p className="text-xl text-gray-600">
                Notre équipe de support est là pour vous aider 24h/7j
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Phone className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Appelez-nous</h3>
                    <p className="text-gray-600 mb-6">
                      Support téléphonique disponible 24h/7j
                    </p>
                    <div className="space-y-2">
                      <div className="font-medium text-gray-900">+221 33 123 45 67</div>
                      <div className="text-sm text-gray-500">Fixe - Appel local</div>
                      <div className="font-medium text-gray-900">+221 77 123 45 67</div>
                      <div className="text-sm text-gray-500">Mobile - WhatsApp</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <MessageCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Chat en direct</h3>
                    <p className="text-gray-600 mb-6">
                      Discutez avec un agent en temps réel
                    </p>
                    <Button className="w-full" variant="senegal">
                      Démarrer le chat
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Mail className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Envoyez un email</h3>
                    <p className="text-gray-600 mb-6">
                      Réponse garantie sous 2h ouvrées
                    </p>
                    <div className="space-y-2">
                      <div className="font-medium text-gray-900">contact@senerentcar.sn</div>
                      <div className="text-sm text-gray-500">Support général</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Liens utiles
              </h2>
              <p className="text-xl text-gray-600">
                Accédez rapidement aux informations importantes
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Conditions générales", href: "/terms", icon: FileText },
                { title: "Politique de confidentialité", href: "/privacy", icon: Shield },
                { title: "Nos agences", href: "/contact", icon: MapPin },
                { title: "À propos", href: "/about", icon: HelpCircle }
              ].map((link, index) => (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Link href={link.href}>
                    <Card className="text-center hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                      <CardContent className="p-6">
                        <link.icon className="w-12 h-12 text-senegal-green mx-auto mb-4" />
                        <h3 className="font-medium text-gray-900">{link.title}</h3>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}