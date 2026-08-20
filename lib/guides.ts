import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'

const guidesDirectory = path.join(process.cwd(), 'content/guides')

/**
 * Domains we have (or may have) a commercial relationship with. Links to these
 * must carry rel="sponsored" so Google doesn't read them as editorial
 * endorsements we're passing ranking signal to.
 *
 * Everything else external — government sources, official event sites — stays
 * unsponsored on purpose: citing authoritative sources is an E-E-A-T positive,
 * and marking those "sponsored" would throw that away.
 */
const AFFILIATE_DOMAINS = [
  'getnomad.app',
  'airalo.com',
  'holafly.com',
  'klook.com',
  'booking.com',
  'agoda.com',
  'trip.com',
  'getyourguide.com',
  'yesim.app',
  'kiwitaxi.com',
  'welcomepickups.com',
  'tp.media',
  'travelpayouts.com',
]

/**
 * Markdown links render as bare <a href>. Add the attributes external links
 * need: sponsored for commercial destinations, and new-tab plus noopener for
 * all of them.
 */
function annotateExternalLinks(html: string): string {
  return html.replace(/<a href="(https?:\/\/[^"]+)"/g, (match, url: string) => {
    let hostname: string
    try {
      hostname = new URL(url).hostname.replace(/^www\./, '')
    } catch {
      return match
    }
    if (hostname === 'shenzhen-guide.com') return match

    const isAffiliate = AFFILIATE_DOMAINS.some(
      (d) => hostname === d || hostname.endsWith(`.${d}`)
    )
    const rel = isAffiliate ? 'sponsored noopener noreferrer' : 'noopener noreferrer'
    return `<a href="${url}" target="_blank" rel="${rel}"`
  })
}

export interface GuideMetadata {
  slug: string
  title: string
  /** Written for search engines. Used in <meta> and on the article page. */
  description: string
  /** Written for people. Short blurb shown on cards; falls back to description. */
  cardBlurb?: string
  category: string
  categoryIcon: string
  date: string
  readingTime: string
  featured: boolean
}

export interface Guide extends GuideMetadata {
  contentHtml: string
}

export function getAllGuides(): GuideMetadata[] {
  const fileNames = fs.readdirSync(guidesDirectory)
  return fileNames
    .filter((name) => name.endsWith('.md') && !name.startsWith('.'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(guidesDirectory, fileName)
      const { data } = matter(fs.readFileSync(fullPath, 'utf8'))
      return { slug, ...data } as GuideMetadata
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getGuidesByCategory(category: string): GuideMetadata[] {
  return getAllGuides().filter((g) => g.category === category)
}

export function getFeaturedGuides(): GuideMetadata[] {
  return getAllGuides().filter((g) => g.featured)
}

export async function getGuideBySlug(slug: string): Promise<Guide> {
  const fullPath = path.join(guidesDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const processed = await remark().use(gfm).use(html, { sanitize: false }).process(content)
  return { slug, contentHtml: annotateExternalLinks(processed.toString()), ...data } as Guide
}

export function getAllGuideSlugs(): string[] {
  return fs
    .readdirSync(guidesDirectory)
    .filter((name) => name.endsWith('.md') && !name.startsWith('.'))
    .map((name) => name.replace(/\.md$/, ''))
}
