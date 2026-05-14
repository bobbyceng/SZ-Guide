import { getAllGuides } from '@/lib/guides'
import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.shenzhen-guide.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const guides = getAllGuides()

  const guideUrls: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${BASE_URL}/guides/${guide.slug}`,
    lastModified: new Date(guide.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...guideUrls,
  ]
}
