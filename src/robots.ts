import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.droppurity.in'
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/thank-you', '/form', '/rajababuadmin', '/image-manager'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
