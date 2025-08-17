import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Catalogue de véhicules - Location voiture Sénégal",
  description: "Découvrez notre large catalogue de véhicules de location au Sénégal. Toyota, Hyundai, Peugeot, Mercedes. Plus de 100 véhicules disponibles à Dakar, Thiès, Saint-Louis et Ziguinchor.",
  keywords: [
    "catalogue véhicules Sénégal",
    "location voiture Dakar",
    "Toyota location Sénégal", 
    "Hyundai rent car",
    "SUV location Thiès",
    "véhicules disponibles",
    "prix location voiture",
    "réservation auto Sénégal"
  ],
  openGraph: {
    title: "Catalogue de véhicules - SeneRentCar",
    description: "Plus de 100 véhicules modernes disponibles pour votre location au Sénégal. Réservez maintenant !",
    url: "/catalogue",
    images: [
      {
        url: "/og-catalogue.jpg",
        width: 1200,
        height: 630,
        alt: "Catalogue de véhicules SeneRentCar Sénégal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Catalogue de véhicules - SeneRentCar",
    description: "Plus de 100 véhicules modernes disponibles pour votre location au Sénégal.",
  },
  alternates: {
    canonical: "/catalogue",
  },
}

export default function CatalogueLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}