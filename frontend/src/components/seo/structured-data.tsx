interface StructuredDataProps {
  type?: 'organization' | 'autoRental' | 'localBusiness' | 'breadcrumb' | 'website'
  data?: any
}

export function StructuredData({ type = 'organization', data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "SeneRentCar",
          "alternateName": "Sene Rent Car",
          "url": "https://senerentcar.sn",
          "logo": "https://senerentcar.sn/logo.png",
          "image": "https://senerentcar.sn/og-image.jpg",
          "description": "Leader de la location de véhicules au Sénégal. Véhicules modernes, service 24/7, présent à Dakar, Thiès, Saint-Louis et Ziguinchor.",
          "foundingDate": "2015",
          "founder": {
            "@type": "Person",
            "name": "Amadou Diallo"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Avenue Léopold Sédar Senghor, Immeuble Fahd",
            "addressLocality": "Dakar",
            "addressRegion": "Dakar",
            "postalCode": "10000",
            "addressCountry": "SN"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+221-77-123-45-67",
            "contactType": "customer service",
            "availableLanguage": ["French", "Wolof"],
            "areaServed": "SN"
          },
          "sameAs": [
            "https://facebook.com/senerentcar",
            "https://instagram.com/senerentcar",
            "https://twitter.com/senerentcar",
            "https://linkedin.com/company/senerentcar"
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "247",
            "bestRating": "5",
            "worstRating": "1"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Véhicules de location",
            "itemListElement": [
              {
                "@type": "OfferCatalog",
                "name": "Véhicules économiques",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Car",
                      "name": "Toyota Yaris",
                      "brand": "Toyota"
                    }
                  }
                ]
              }
            ]
          }
        }

      case 'autoRental':
        return {
          "@context": "https://schema.org",
          "@type": "AutoRental",
          "name": "SeneRentCar",
          "url": "https://senerentcar.sn",
          "image": "https://senerentcar.sn/og-image.jpg",
          "description": "Location de véhicules au Sénégal avec SeneRentCar",
          "provider": {
            "@type": "Organization",
            "name": "SeneRentCar"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Sénégal"
          },
          "availableChannel": {
            "@type": "ServiceChannel",
            "serviceUrl": "https://senerentcar.sn/catalogue",
            "serviceType": "online booking"
          }
        }

      case 'localBusiness':
        return {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://senerentcar.sn",
          "name": "SeneRentCar",
          "image": "https://senerentcar.sn/og-image.jpg",
          "telephone": "+221-77-123-45-67",
          "email": "contact@senerentcar.sn",
          "url": "https://senerentcar.sn",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Avenue Léopold Sédar Senghor",
            "addressLocality": "Dakar",
            "addressRegion": "Dakar",
            "addressCountry": "SN",
            "postalCode": "10000"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 14.6937,
            "longitude": -17.4441
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday", 
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "opens": "08:00",
              "closes": "19:00"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Saturday", "Sunday"],
              "opens": "09:00",
              "closes": "17:00"
            }
          ],
          "priceRange": "10000 - 65000 FCFA",
          "currenciesAccepted": "XOF",
          "paymentAccepted": "Cash, Credit Card, Orange Money, Wave",
          "category": "Car Rental"
        }

      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "SeneRentCar",
          "url": "https://senerentcar.sn",
          "description": "Location de véhicules au Sénégal",
          "inLanguage": "fr-SN",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://senerentcar.sn/catalogue?search={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          },
          "publisher": {
            "@type": "Organization",
            "name": "SeneRentCar"
          }
        }

      case 'breadcrumb':
        return data || {}

      default:
        return {}
    }
  }

  const structuredData = getStructuredData()

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}