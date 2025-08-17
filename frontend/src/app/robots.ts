import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://senerentcar.sn'

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/catalogue',
          '/vehicles/',
          '/about',
          '/contact',
          '/services/',
          '/locations/',
          '/faq',
          '/terms',
          '/privacy',
          '/mentions',
          '/login',
          '/register',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/profile/',
          '/booking/',
          '/*.json',
          '/private/',
          '/_next/',
          '/static/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/catalogue',
          '/vehicles/',
          '/about',
          '/contact',
          '/services/',
          '/locations/',
          '/faq',
          '/terms',
          '/privacy',
          '/mentions',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/profile/',
          '/booking/',
          '/private/',
          '/_next/',
          '/static/',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: [
          '/',
          '/catalogue',
          '/vehicles/',
          '/about',
          '/contact',
          '/services/',
          '/locations/',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/profile/',
          '/booking/',
          '/private/',
        ],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}