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
    description: "Lancement de la première plateforme de location de véhicules 100% sénégalaise et cap-verdienne"
  },
  {
    year: "2021", 
    title: "Expansion Dakar et Praia",
    description: "Ouverture de 3 agences à Dakar et à Praia et constitution d'une flotte de 50 véhicules"
  },
  {
    year: "2022",
    title: "Couverture nationale",
    description: "Extension à Thiès, Saint-Louis, Santiago et Boa Vista, partenariats avec hôtels et agences de voyage"
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
        <section className="overflow-hidden relative py-24 bg-gradient-to-r from-senegal-green via-senegal-yellow to-senegal-red">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative px-4 mx-auto max-w-7xl text-center sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">
                À propos de Senerentcar
              </h1>
              <p className="mx-auto mb-8 max-w-3xl text-xl md:text-2xl text-white/90">
                La première plateforme de location de véhicules 100% sénégalaise et cap-verdienne, 
                créée par des Sénégalais pour les Sénégalais et leurs invités.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-6 min-w-[150px]"
                  >
                    <stat.icon className="mx-auto mb-2 w-8 h-8 text-white" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-white">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
                  Notre Mission
                </h2>
                <p className="mb-6 text-lg text-gray-600">
                  Démocratiser l'accès à la location de véhicules au Sénégal et au Cap-Vert en proposant 
                  une solution moderne, accessible et transparente. Nous croyons que chaque 
                  Sénégalais doit pouvoir se déplacer librement et découvrir les merveilles 
                  de notre beau pays.
                </p>
                <p className="mb-8 text-lg text-gray-600">
                  Chez Senerentcar, nous combinons la technologie moderne avec l'hospitalité 
                  traditionnelle sénégalaise (Teranga) pour offrir une expérience unique 
                  de location automobile.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex gap-3 items-center">
                    <CheckCircle className="w-5 h-5 text-senegal-green" />
                    <span>Service 24h/7j</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <CheckCircle className="w-5 h-5 text-senegal-green" />
                    <span>Tarifs transparents</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <CheckCircle className="w-5 h-5 text-senegal-green" />
                    <span>Véhicules récents</span>
                  </div>
                  <div className="flex gap-3 items-center">
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
                  className="object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 p-6 text-white rounded-xl bg-senegal-green">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm">Satisfaction client</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-50">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-16 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Nos Valeurs
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Les principes qui guident notre action quotidienne pour servir au mieux nos clients
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full text-center transition-shadow hover:shadow-lg">
                    <CardContent className="p-8">
                      <div className="flex justify-center items-center mx-auto mb-6 w-16 h-16 rounded-full bg-senegal-green/10">
                        <value.icon className="w-8 h-8 text-senegal-green" />
                      </div>
                      <h3 className="mb-4 text-xl font-bold text-gray-900">{value.title}</h3>
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
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-16 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Notre Équipe
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Des professionnels passionnés, dédiés à votre satisfaction
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                    <div className="overflow-hidden aspect-square">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                        style={member.imageStyle}
                      />
                    </div>
                    <CardContent className="p-6 text-center">
                      <h3 className="mb-2 text-xl font-bold text-gray-900">{member.name}</h3>
                      <Badge className="mb-4">{member.role}</Badge>
                      <p className="text-sm text-gray-600">{member.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-gray-50">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-16 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Notre Histoire
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                4 années de croissance et d'innovation au service de la mobilité sénégalaise et cap-verdienne
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-1/2 w-1 h-full transform -translate-x-1/2 bg-senegal-green"></div>
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className="px-8 w-1/2">
                      <Card className="p-6">
                        <div className="flex gap-4 items-center mb-4">
                          <div className="flex justify-center items-center w-12 h-12 font-bold text-white rounded-full bg-senegal-green">
                            {milestone.year}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                        </div>
                        <p className="text-gray-600">{milestone.description}</p>
                      </Card>
                    </div>
                    <div className="relative z-10 w-4 h-4 rounded-full bg-senegal-green"></div>
                    <div className="w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="py-20 bg-white">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-16 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Certifications & Partenariats
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Reconnus par les institutions sénégalaises pour notre excellence
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 text-center transition-shadow hover:shadow-lg">
                    <Award className="mx-auto mb-4 w-12 h-12 text-senegal-green" />
                    <h3 className="mb-2 text-lg font-bold text-gray-900">{cert.name}</h3>
                    <p className="text-sm text-gray-600">{cert.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="py-20 bg-gradient-to-r from-senegal-green to-senegal-yellow">
          <div className="px-4 mx-auto max-w-7xl text-center sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                Prêt à découvrir le Sénégal et le Cap-Vert ?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90">
                Rejoignez les milliers de Sénégalais et Cap-verdien qui nous font confiance pour leurs déplacements
              </p>
              <div className="flex flex-col gap-4 justify-center sm:flex-row">
                <Link href="/catalogue">
                  <Button size="lg" className="bg-white text-senegal-green hover:bg-gray-100">
                    <Car className="mr-2 w-5 h-5" />
                    Voir nos véhicules
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-senegal-green">
                    <Phone className="mr-2 w-5 h-5" />
                    Nous contacter
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 gap-8 mt-12 text-white md:grid-cols-3">
                <div>
                  <MapPin className="mx-auto mb-4 w-8 h-8" />
                  <h4 className="mb-2 font-bold">Nos Agences</h4>
                  <p className="text-white/80">Dakar • Thiès • Saint-Louis • Praia • Santiago • Boa Vista </p>
                </div>
                <div>
                  <Clock className="mx-auto mb-4 w-8 h-8" />
                  <h4 className="mb-2 font-bold">Support 24h/7j</h4>
                  <p className="text-white/80">+221 33 123 45 67</p>
                </div>
                <div>
                  <Mail className="mx-auto mb-4 w-8 h-8" />
                  <h4 className="mb-2 font-bold">Email</h4>
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