# SZGuide — Shenzhen, explained for foreigners

**Live site: [szguide-bice.vercel.app](https://szguide-bice.vercel.app)**

Practical, up-to-date English guides for visiting or living in Shenzhen, China. Written for the wave of travelers arriving under China's visa-free policies who hit the same walls: payments don't work, Google Maps doesn't work, and nobody explains the border crossing.

## Guides

- **China's 240-Hour Visa-Free Transit** — who qualifies and how to use it
- **Hong Kong → Shenzhen Border Crossing** — ports, hours, step-by-step
- **Alipay & WeChat Pay Setup** — link a foreign card, pay like a local
- **Shenzhen Metro Guide** — lines, tickets, QR codes
- **DiDi (Ride-hailing) Guide** — the Uber alternative that actually works here
- **Best eSIM for Shenzhen** — data that works behind the Great Firewall
- **Huaqiangbei Electronics Market** — navigating the world's biggest electronics market

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Markdown content pipeline: `content/guides/*.md` → gray-matter + remark → static pages
- SEO: per-page metadata, `sitemap.ts`, `robots.ts`
- Deployed on Vercel

## Development

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build
```

Add a guide: drop a Markdown file with frontmatter (`title`, `description`, `category`, `date`, `featured`) into `content/guides/` — it's picked up automatically.

## License

Code is MIT. Guide content © SZGuide.
