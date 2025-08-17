"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Building2, Calendar, Scale, Globe, Phone, Mail, MapPin, CreditCard, Shield } from "lucide-react"

import { MainLayout } from "@/components/layouts/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const sections = [
  {
    id: "editeur",
    title: "1. Éditeur du site",
    icon: Building2,
    content: [
      {
        label: "Dénomination sociale",
        value: "SENERENTCAR SARL"
      },
      {
        label: "Forme juridique",
        value: "Société à Responsabilité Limitée (SARL)"
      },
      {
        label: "Capital social",
        value: "10 000 000 FCFA"
      },
      {
        label: "NINEA",
        value: "123456789"
      },
      {
        label: "Registre du Commerce",
        value: "SN.DKR.2020.A.123456"
      },
      {
        label: "Adresse du siège social",
        value: "Avenue Léopold Sédar Senghor, Plateau, Dakar, Sénégal"
      },
      {
        label: "Téléphone",
        value: "+221 33 123 45 67"
      },
      {
        label: "Email",
        value: "contact@senerentcar.sn"
      }
    ]
  },
  {
    id: "directeur",
    title: "2. Directeur de la publication",
    icon: Scale,
    content: [
      {
        label: "Nom",
        value: "Amadou DIALLO"
      },
      {
        label: "Qualité",
        value: "Gérant de la société SENERENTCAR SARL"
      },
      {
        label: "Email",
        value: "direction@senerentcar.sn"
      }
    ]
  },
  {
    id: "hebergement",
    title: "3. Hébergement",
    icon: Globe,
    content: [
      {
        label: "Hébergeur",
        value: "Orange Business Services Sénégal"
      },
      {
        label: "Adresse",
        value: "Immeuble Orange, Avenue Cheikh Anta Diop, Dakar, Sénégal"
      },
      {
        label: "Téléphone",
        value: "+221 33 839 5000"
      },
      {
        label: "Email",
        value: "contact@orange-business.sn"
      }
    ]
  },
  {
    id: "conception",
    title: "4. Conception et développement",
    icon: Building2,
    content: [
      {
        label: "Agence",
        value: "DigiTech Solutions Sénégal"
      },
      {
        label: "Adresse",
        value: "VDN, Sacré-Cœur 3, Dakar, Sénégal"
      },
      {
        label: "Téléphone",
        value: "+221 77 123 45 67"
      },
      {
        label: "Email",
        value: "contact@digitech.sn"
      }
    ]
  },
  {
    id: "activite",
    title: "5. Activité économique",
    icon: CreditCard,
    content: [
      {
        label: "Secteur d'activité",
        value: "Location de véhicules automobiles"
      },
      {
        label: "Code ISIC",
        value: "7711 - Location de véhicules automobiles"
      },
      {
        label: "Autorisation préfectorale",
        value: "N° 2020/MTPMM/DG/DTCD/123"
      },
      {
        label: "Assurance professionnelle",
        value: "SONAR Assurances - Police N° 123456789"
      },
      {
        label: "Garantie financière",
        value: "Banque Atlantique Sénégal - 50 000 000 FCFA"
      }
    ]
  },
  {
    id: "propriete",
    title: "6. Propriété intellectuelle",
    icon: Shield,
    content: [
      {
        label: "Marque",
        value: "SENERENTCAR® - Déposée à l'OAPI"
      },
      {
        label: "Logo et identité visuelle",
        value: "Propriété exclusive de SENERENTCAR SARL"
      },
      {
        label: "Contenu du site",
        value: "Textes, images et vidéos propriété de SENERENTCAR"
      },
      {
        label: "Licence logicielle",
        value: "Développement propriétaire sous licence commerciale"
      }
    ]
  }
]

const legalInfo = [
  {
    title: "Réglementation applicable",
    items: [
      "Code des obligations civiles et commerciales du Sénégal",
      "Loi n° 2008-12 sur la société de l'information",
      "Loi n° 2008-12 relative aux données à caractère personnel",
      "Décret n° 2007-1338 relatif à la location de véhicules",
      "Code de la route du Sénégal"
    ]
  },
  {
    title: "Médiateur",
    items: [
      "En cas de litige, vous pouvez saisir le médiateur de la consommation",
      "Chambre de Commerce de Dakar - Service Médiation",
      "Place de l'Indépendance, Dakar, Sénégal",
      "Téléphone : +221 33 823 71 89",
      "Email : mediation@cciad.sn"
    ]
  },
  {
    title: "Données personnelles",
    items: [
      "Délégué à la Protection des Données : Fatou SANÉ",
      "Email DPO : dpo@senerentcar.sn",
      "Déclaration CNIL Sénégal : En cours",
      "Registre des traitements disponible sur demande"
    ]
  }
]

export default function MentionsPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center gap-4 mb-6">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Retour
                </Button>
              </Link>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-senegal-green to-senegal-yellow rounded-full flex items-center justify-center">
                  <Scale className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Mentions Légales
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Informations légales et réglementaires sur Senerentcar
              </p>
              <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Dernière mise à jour : 15 août 2024
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Version 2.1
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Building2 className="w-6 h-6 text-senegal-green" />
                    Identification de l'entreprise
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p className="text-gray-600 leading-relaxed">
                    Conformément aux dispositions de la loi sénégalaise sur la société de l'information, 
                    nous vous communiquons ci-dessous les mentions légales obligatoires relatives au site 
                    internet Senerentcar et à la société qui l'édite.
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-4">
                    Ces informations vous permettent d'identifier clairement l'éditeur du site et les 
                    responsables de son contenu, conformément à la réglementation en vigueur au Sénégal.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Main sections */}
            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-xl text-senegal-green">
                        <section.icon className="w-6 h-6" />
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.content.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex flex-col">
                            <span className="text-sm font-medium text-gray-500 mb-1">
                              {item.label}
                            </span>
                            <span className="text-gray-900 font-medium">
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Additional legal information */}
            <div className="mt-16 space-y-8">
              {legalInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * (sections.length + index) }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl text-senegal-green">
                        {info.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {info.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-senegal-green rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-600 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Contact information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-16"
            >
              <Card className="bg-gradient-to-r from-senegal-green to-senegal-yellow text-white">
                <CardHeader>
                  <CardTitle className="text-white">
                    Nous contacter
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90 mb-6">
                    Pour toute question relative aux mentions légales ou aux informations 
                    contenues sur ce site, n'hésitez pas à nous contacter.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-white" />
                      <div>
                        <div className="font-medium text-white">Téléphone</div>
                        <div className="text-white/90 text-sm">+221 33 123 45 67</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-white" />
                      <div>
                        <div className="font-medium text-white">Email</div>
                        <div className="text-white/90 text-sm">legal@senerentcar.sn</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-white" />
                      <div>
                        <div className="font-medium text-white">Adresse</div>
                        <div className="text-white/90 text-sm">Plateau, Dakar</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Disclaimer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-8"
            >
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-yellow-800 mb-2">Avertissement</h3>
                      <p className="text-yellow-700 text-sm leading-relaxed">
                        Les informations contenues dans ces mentions légales sont données à titre indicatif 
                        et sont susceptibles d'évoluer. Il appartient à l'utilisateur de vérifier l'exactitude 
                        et la pertinence de ces informations. SENERENTCAR ne saurait être tenue responsable 
                        des erreurs ou omissions qui pourraient figurer dans ce document.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Footer */}
            <div className="mt-12 text-center">
              <p className="text-gray-500 text-sm">
                SENERENTCAR SARL - Société sénégalaise de location de véhicules
                <br />
                NINEA : 123456789 - RC : SN.DKR.2020.A.123456
                <br />
                Capital : 10 000 000 FCFA - Siège social : Plateau, Dakar, Sénégal
              </p>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}