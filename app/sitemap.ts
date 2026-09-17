import { getAllGuides } from '@/lib/guides'
import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.shenzhen-guide.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const guides = getAllGuides()

  // lastmod has to be true to be useful: Google only trusts it when it is
  // consistently accurate. Guides report their last real edit (`updated`,
  // falling back to first publication). Listing pages change when a guide
  // does, so they take the newest guide's date. About and contact carry no
  // lastmod at all — stamping them with the build time made every deploy
  // claim they had changed, which teaches Google to ignore the field.
  const lastEdit = (g: { date: string; updated?: string }) => new Date(g.updated ?? g.date)
  const newestGuide = new Date(Math.max(...guides.map((g) => lastEdit(g).getTime())))

  const guideUrls: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${BASE_URL}/guides/${guide.slug}`,
    lastModified: lastEdit(guide),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: newestGuide,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/guides`,
      lastModified: newestGuide,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...guideUrls,
  ]
}
