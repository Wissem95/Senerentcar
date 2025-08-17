import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact SeneRentCar - Nos agences au Sénégal",
  description: "Contactez SeneRentCar pour votre location de véhicule. 5 agences au Sénégal : Dakar, Thiès, Saint-Louis, Ziguinchor et Aéroport LSS. Service client 24h/7j.",
  keywords: [
    "contact SeneRentCar",
    "agence location voiture Dakar",
    "bureau SeneRentCar Thiès",
    "contact Saint-Louis",
    "agence Ziguinchor",
    "aéroport Blaise Diagne",
    "téléphone SeneRentCar",
    "service client 24h"
  ],
  openGraph: {
    title: "Contact SeneRentCar - Nos agences au Sénégal",
    description: "5 agences à votre service à travers le Sénégal. Contactez-nous pour votre location de véhicule.",
    url: "/contact",
    images: [
      {
        url: "/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Agences SeneRentCar au Sénégal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact SeneRentCar",
    description: "5 agences à votre service à travers le Sénégal.",
  },
  alternates: {
    canonical: "/contact",
  },
  other: {
    "business:contact_data:street_address": "Avenue Léopold Sédar Senghor",
    "business:contact_data:locality": "Dakar",
    "business:contact_data:region": "Dakar",
    "business:contact_data:country_name": "Sénégal",
    "business:contact_data:phone_number": "+221 77 123 45 67",
    "business:contact_data:email": "contact@senerentcar.sn",
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}