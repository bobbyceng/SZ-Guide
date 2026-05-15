import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'

const guidesDirectory = path.join(process.cwd(), 'content/guides')

export interface GuideMetadata {
  slug: string
  title: string
  description: string
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
  return { slug, contentHtml: processed.toString(), ...data } as Guide
}

export function getAllGuideSlugs(): string[] {
  return fs
    .readdirSync(guidesDirectory)
    .filter((name) => name.endsWith('.md') && !name.startsWith('.'))
    .map((name) => name.replace(/\.md$/, ''))
}
