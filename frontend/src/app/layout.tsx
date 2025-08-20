import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { AuthProvider } from "@/providers/auth-provider"; // DISABLED FOR DEMO
import { ThemeProvider } from "@/providers/theme-provider";
import { NotificationProvider } from "@/components/ui/notification-system";
import { PushNotificationProvider } from "@/components/ui/push-notifications";
import { StructuredData } from "@/components/seo/structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SeneRentCar - Location de véhicules au Sénégal",
    template: "%s | SeneRentCar"
  },
  description: "Louez votre voiture au Sénégal avec SeneRentCar. Véhicules modernes, tarifs transparents, service 24/7 à Dakar, Thiès, Saint-Louis et Ziguinchor. Réservation en ligne rapide et sécurisée.",
  keywords: [
    "location voiture Sénégal",
    "rent car Dakar", 
    "véhicule location Thiès",
    "car rental Saint-Louis",
    "location auto Ziguinchor",
    "Toyota Sénégal",
    "Hyundai location",
    "voyage Sénégal",
    "transport Dakar",
    "location longue durée",
    "chauffeur Sénégal",
    "transfert aéroport",
    "voiture avec chauffeur",
    "4x4 Casamance"
  ],
  authors: [{ name: "SeneRentCar", url: "https://senerentcar.sn" }],
  creator: "SeneRentCar",
  publisher: "SeneRentCar",
  applicationName: "SeneRentCar",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  metadataBase: new URL("https://senerentcar.sn"),
  alternates: {
    canonical: "/",
    languages: {
      "fr-SN": "/",
      "fr": "/",
    },
  },
  openGraph: {
    title: "SeneRentCar - Location de véhicules au Sénégal",
    description: "Découvrez le Sénégal en toute liberté avec nos véhicules modernes et fiables. Plus de 100 véhicules disponibles dans 4 villes.",
    url: "https://senerentcar.sn",
    siteName: "SeneRentCar",
    locale: "fr_SN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SeneRentCar - Location de véhicules au Sénégal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SeneRentCar - Location de véhicules au Sénégal",
    description: "Découvrez le Sénégal en toute liberté avec nos véhicules modernes et fiables.",
    creator: "@senerentcar",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    noarchive: false,
    nosnippet: false,
    noimageindex: false,
    nocache: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  category: "automotive",
  classification: "vehicle rental service",
  other: {
    "business:contact_data:street_address": "Avenue Léopold Sédar Senghor, Dakar",
    "business:contact_data:locality": "Dakar",
    "business:contact_data:region": "Dakar",
    "business:contact_data:postal_code": "10000",
    "business:contact_data:country_name": "Sénégal",
    "geo.region": "SN-DK",
    "geo.placename": "Dakar",
    "geo.position": "14.6937;-17.4441",
    "ICBM": "14.6937, -17.4441",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <StructuredData type="organization" />
        <StructuredData type="localBusiness" />
        <StructuredData type="website" />
        <StructuredData type="autoRental" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {/* <AuthProvider> DISABLED FOR DEMO */}
            <NotificationProvider>
              <PushNotificationProvider>
                {children}
              </PushNotificationProvider>
            </NotificationProvider>
          {/* </AuthProvider> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
