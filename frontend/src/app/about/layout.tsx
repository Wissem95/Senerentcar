import { Metadata } from "next"

export const metadata: Metadata = {
  title: "À propos de SeneRentCar - Notre histoire et mission",
  description: "Découvrez l'histoire de SeneRentCar, leader de la location de véhicules au Sénégal depuis 2015. Notre mission : vous offrir une mobilité de qualité à travers tout le Sénégal.",
  keywords: [
    "SeneRentCar histoire",
    "à propos location voiture Sénégal",
    "équipe SeneRentCar",
    "mission entreprise",
    "location véhicule Dakar histoire",
    "entreprise sénégalaise",
    "valeurs SeneRentCar"
  ],
  openGraph: {
    title: "À propos de SeneRentCar - Notre histoire et mission",
    description: "Leader de la location de véhicules au Sénégal depuis 2015. Découvrez notre équipe et nos valeurs.",
    url: "/about",
    images: [
      {
        url: "/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "Équipe SeneRentCar - À propos de nous",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "À propos de SeneRentCar",
    description: "Leader de la location de véhicules au Sénégal depuis 2015.",
  },
  alternates: {
    canonical: "/about",
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}