import { MetadataRoute } from 'next'

const cities = [
  'bengaluru', 'chennai', 'delhi', 'faridabad', 'ghaziabad', 
  'gurugram', 'hyderabad', 'kolkata', 'mumbai', 'noida', 'pune'
];
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.droppurity.in'

  const cityPages = cities.map(city => ({
    url: `${baseUrl}/${city}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/plans`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.7,
    },
    {
        url: `${baseUrl}/faq`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    },
    {
        url: `${baseUrl}/careers`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.5,
    },
    {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
    },
    {
        url: `${baseUrl}/privacy`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
    },
    {
        url: `${baseUrl}/terms`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
    },
    {
        url: `${baseUrl}/form`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.5,
    },
    {
        url: `${baseUrl}/trial`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.7,
    },
    ...cityPages,
  ]
}
