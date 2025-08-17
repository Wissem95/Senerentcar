import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services de location - SeneRentCar Sénégal",
  description: "Découvrez tous nos services de location de véhicules au Sénégal : location courte/longue durée, véhicules avec chauffeur, transferts aéroport. Devis gratuit.",
  keywords: [
    "services location voiture Sénégal",
    "location courte durée",
    "location longue durée",
    "véhicule avec chauffeur",
    "transfert aéroport Dakar",
    "chauffeur professionnel Sénégal",
    "service transport",
    "location entreprise"
  ],
  openGraph: {
    title: "Services de location - SeneRentCar",
    description: "Location courte/longue durée, véhicules avec chauffeur, transferts aéroport. Tous nos services au Sénégal.",
    url: "/services",
    images: [
      {
        url: "/og-services.jpg",
        width: 1200,
        height: 630,
        alt: "Services SeneRentCar - Location véhicules Sénégal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services de location - SeneRentCar",
    description: "Tous nos services de location de véhicules au Sénégal.",
  },
  alternates: {
    canonical: "/services",
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}