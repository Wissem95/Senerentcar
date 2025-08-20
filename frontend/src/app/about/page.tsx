"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { 
  Car, 
  Users, 
  MapPin, 
  Award, 
  Shield, 
  Clock, 
  Heart,
  Star,
  CheckCircle,
  Globe,
  Phone,
  Mail
} from "lucide-react"

import { MainLayout } from "@/components/layouts/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const teamMembers = [
  {
    name: "Amadou Diallo",
    role: "Fondateur & CEO",
    image: "/images/personnes/Amadou Diallo .jpeg",
    description: "Expert automobile avec 15 ans d'expérience dans le secteur au Sénégal",
    linkedin: "#",
    imageStyle: {}
  },
  {
    name: "Fatou Sané",
    role: "Directrice Opérations",
    image: "/images/personnes/Fatou Sane.png", 
    description: "Spécialisée en logistique et gestion de flotte automobile",
    linkedin: "#",
    imageStyle: { objectPosition: "center top" }
  },
  {
    name: "Ousmane Fall",
    role: "Directeur Technique",
    image: "/images/personnes/Ousmane Fall.jpeg",
    description: "Ingénieur informatique, expert en solutions digitales",
    linkedin: "#",
    imageStyle: { objectPosition: "right center" }
  },
  {
    name: "Aïssa Ndiaye", 
    role: "Responsable Relation Client",
    image: "/images/personnes/Aissa Ndiaye.jpeg",
    description: "Passionnée par le service client et l'expérience utilisateur",
    linkedin: "#",
    imageStyle: {}
  }
]

const milestones = [
  {
    year: "2020",
    title: "Création de Senerentcar",
    description: "Lancement de la première plateforme de location de véhicules 100% sénégalaise"
  },
  {
    year: "2021", 
    title: "Expansion Dakar",
    description: "Ouverture de 3 agences à Dakar et constitution d'une flotte de 50 véhicules"
  },
  {
    year: "2022",
    title: "Couverture nationale",
    description: "Extension à Thiès et Saint-Louis, partenariats avec hôtels et agences de voyage"
  },
  {
    year: "2023",
    title: "Innovation digitale", 
    description: "Lancement de l'app mobile et intégration paiements mobiles (Orange Money, Wave)"
  },
  {
    year: "2024",
    title: "Leader du marché",
    description: "Plus de 5000 clients satisfaits et 200 véhicules dans notre flotte"
  }
]

const values = [
  {
    icon: Heart,
    title: "Teranga",
    description: "L'hospitalité sénégalaise au cœur de notre service, pour que chaque client se sente chez lui"
  },
  {
    icon: Shield,
    title: "Confiance",
    description: "Véhicules entretenus, assurances complètes et transparence totale dans nos tarifs"
  },
  {
    icon: Star,
    title: "Excellence",
    description: "Service de qualité supérieure avec des véhicules modernes et un support 24h/7j"
  },
  {
    icon: Globe,
    title: "Accessibilité",
    description: "Démocratiser la location automobile pour rendre la mobilité accessible à tous"
  }
]

const stats = [
  { label: "Clients satisfaits", value: "5,000+", icon: Users },
  { label: "Véhicules disponibles", value: "200+", icon: Car },
  { label: "Villes couvertes", value: "3", icon: MapPin },
  { label: "Années d'expérience", value: "4+", icon: Award }
]

const certifications = [
  {
    name: "Certification ANPEJ",
    description: "Agence Nationale pour la Promotion de l'Emploi des Jeunes"
  },
  {
    name: "Partenaire APIX",
    description: "Agence de Promotion des Investissements et Grands Travaux"
  },
  {
    name: "Membre CCBM", 
    description: "Chambre de Commerce de Dakar"
  }
]

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-r from-senegal-green via-senegal-yellow to-senegal-red overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                À propos de Senerentcar
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
                La première plateforme de location de véhicules 100% sénégalaise, 
                créée par des Sénégalais pour les Sénégalais et leurs invités.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-6 min-w-[150px]"
                  >
                    <stat.icon className="w-8 h-8 text-white mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-white/80 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Notre Mission
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Démocratiser l'accès à la location de véhicules au Sénégal en proposant 
                  une solution moderne, accessible et transparente. Nous croyons que chaque 
                  Sénégalais doit pouvoir se déplacer librement et découvrir les merveilles 
                  de notre beau pays.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  Chez Senerentcar, nous combinons la technologie moderne avec l'hospitalité 
                  traditionnelle sénégalaise (Teranga) pour offrir une expérience unique 
                  de location automobile.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-senegal-green" />
                    <span>Service 24h/7j</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-senegal-green" />
                    <span>Tarifs transparents</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-senegal-green" />
                    <span>Véhicules récents</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-senegal-green" />
                    <span>Assurance complète</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <Image
                  src="/images/senegal/image.png"
                  alt="Véhicules Senerentcar au Sénégal"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl object-cover"
                />
                <div className="absolute -bottom-6 -left-6 bg-senegal-green text-white p-6 rounded-xl">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm">Satisfaction client</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nos Valeurs
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Les principes qui guident notre action quotidienne pour servir au mieux nos clients
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-senegal-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <value.icon className="w-8 h-8 text-senegal-green" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Notre Équipe
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Des professionnels passionnés, dédiés à votre satisfaction
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        style={member.imageStyle}
                      />
                    </div>
                    <CardContent className="p-6 text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                      <Badge className="mb-4">{member.role}</Badge>
                      <p className="text-gray-600 text-sm">{member.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Notre Histoire
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                4 années de croissance et d'innovation au service de la mobilité sénégalaise
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-senegal-green h-full"></div>
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className="w-1/2 px-8">
                      <Card className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-senegal-green text-white rounded-full flex items-center justify-center font-bold">
                            {milestone.year}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                        </div>
                        <p className="text-gray-600">{milestone.description}</p>
                      </Card>
                    </div>
                    <div className="w-4 h-4 bg-senegal-green rounded-full relative z-10"></div>
                    <div className="w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Certifications & Partenariats
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Reconnus par les institutions sénégalaises pour notre excellence
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                    <Award className="w-12 h-12 text-senegal-green mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.name}</h3>
                    <p className="text-gray-600 text-sm">{cert.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="py-20 bg-gradient-to-r from-senegal-green to-senegal-yellow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Prêt à découvrir le Sénégal ?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Rejoignez les milliers de Sénégalais qui nous font confiance pour leurs déplacements
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/catalogue">
                  <Button size="lg" className="bg-white text-senegal-green hover:bg-gray-100">
                    <Car className="mr-2 w-5 h-5" />
                    Voir nos véhicules
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-senegal-green">
                    <Phone className="mr-2 w-5 h-5" />
                    Nous contacter
                  </Button>
                </Link>
              </div>
              
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
                <div>
                  <MapPin className="w-8 h-8 mx-auto mb-4" />
                  <h4 className="font-bold mb-2">Nos Agences</h4>
                  <p className="text-white/80">Dakar • Thiès • Saint-Louis</p>
                </div>
                <div>
                  <Clock className="w-8 h-8 mx-auto mb-4" />
                  <h4 className="font-bold mb-2">Support 24h/7j</h4>
                  <p className="text-white/80">+221 33 123 45 67</p>
                </div>
                <div>
                  <Mail className="w-8 h-8 mx-auto mb-4" />
                  <h4 className="font-bold mb-2">Email</h4>
                  <p className="text-white/80">contact@senerentcar.sn</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}