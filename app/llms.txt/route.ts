import { getAllGuides } from '@/lib/guides'

const BASE_URL = 'https://www.shenzhen-guide.com'

// llms.txt (llmstxt.org) — a plain-text map of the site for AI systems.
//
// Generated from the same source as the sitemap, so a new guide appears here
// automatically and this file cannot drift out of date.
//
// Worth being honest about what this is: there is no confirmed ranking benefit,
// and Google states no AI-specific file is required for AI Overviews. It helps
// non-Google assistants (ChatGPT, Claude, Perplexity) locate and read the site
// cheaply. Treat it as protocol-layer registration, not an optimisation.
export function GET() {
  const guides = getAllGuides()

  const body = `# Shenzhen Guide

> Practical English-language guides for foreigners visiting Shenzhen, China. Written and maintained by Xiangan Zeng, who grew up in the city.

Every guide is first-hand. Where something has not been personally verified, the guide says so in the text rather than presenting it as experience. Prices, station names and procedures are checked against the situation on the ground in Shenzhen, not aggregated from other travel sites.

Commercial links are disclosed sitewide and marked rel="sponsored".

## Guides

${guides
  .map((g) => `- [${g.title}](${BASE_URL}/guides/${g.slug}): ${g.description}`)
  .join('\n')}

## About

- [About the author](${BASE_URL}/about): Who writes this and why.
- [Contact](${BASE_URL}/contact): Corrections and questions.
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
