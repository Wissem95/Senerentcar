"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "Amadou Diallo",
    location: "Dakar, Plateau",
    profession: "Entrepreneur",
    rating: 5,
    comment: "Service impeccable ! J'ai loué une Toyota Corolla pour mes déplacements professionnels. Le véhicule était propre, en parfait état, et la prise en charge très professionnelle. Je recommande vivement SeneRentCar.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Fatou Sow",
    location: "Thiès, Escale", 
    profession: "Consultante",
    rating: 5,
    comment: "Excellente expérience avec SeneRentCar ! J'ai loué un SUV pour un voyage familial vers Saint-Louis. Le processus de réservation était simple et rapide. L'équipe est très accueillante et professionnelle.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b1e0?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Ousmane Ba",
    location: "Saint-Louis, Sor",
    profession: "Guide touristique", 
    rating: 5,
    comment: "Je loue régulièrement chez SeneRentCar pour mes clients touristes. Ils ont toujours des véhicules disponibles et adaptés. Leurs tarifs sont très compétitifs. Une référence dans le secteur !",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "Aissatou Diop",
    location: "Ziguinchor, Centre",
    profession: "Médecin",
    rating: 5,
    comment: "Service client exceptionnel ! Quand ma voiture est tombée en panne, SeneRentCar m'a dépannée en urgence avec un véhicule de remplacement. Merci pour votre professionnalisme et votre réactivité.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 5,
    name: "Mbaye Ndiaye", 
    location: "Kaolack, Médina",
    profession: "Commerçant",
    rating: 5,
    comment: "SeneRentCar m'accompagne depuis 3 ans pour mes déplacements commerciaux. Véhicules fiables, équipe sérieuse, prix corrects. Je n'hésite pas à les recommander à mes partenaires d'affaires.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 6,
    name: "Mariama Cissé",
    location: "Rufisque, Est",
    profession: "Enseignante",
    rating: 5,
    comment: "Parfait pour les weekends en famille ! Nous louons souvent un minibus pour nos sorties. Les enfants adorent et nous sommes toujours satisfaits du service. Continuez comme ça !",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  }
]

export function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Ce que disent nos clients sénégalais
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            La confiance de plus de 15,000 clients à travers le Sénégal
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-senegal-green/20 mb-4" />
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-senegal-yellow fill-current"
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    "{testimonial.comment}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {testimonial.profession}
                      </p>
                      <p className="text-xs text-senegal-green">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <div className="p-6">
            <div className="text-3xl font-bold text-senegal-green mb-2">98%</div>
            <div className="text-gray-600">Taux de satisfaction</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-senegal-green mb-2">15,000+</div>
            <div className="text-gray-600">Clients satisfaits</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-senegal-green mb-2">4.9/5</div>
            <div className="text-gray-600">Note moyenne</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}