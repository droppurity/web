import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.droppurity.in'
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/thank-you', '/form'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
