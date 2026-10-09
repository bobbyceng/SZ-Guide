import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getGuideBySlug, getAllGuideSlugs } from '@/lib/guides'
import AffiliateBox from '@/components/AffiliateBox'
import RecommendationCard from '@/components/RecommendationCard'
import { AFFILIATE } from '@/lib/affiliates'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  try {
    const guide = await getGuideBySlug(slug)
    const url = `https://www.shenzhen-guide.com/guides/${slug}`
    return {
      title: guide.title,
      description: guide.description,
      alternates: { canonical: url },
      openGraph: {
        title: guide.title,
        description: guide.description,
        url,
        type: 'article',
        publishedTime: guide.date,
        ...(guide.cover && { images: [{ url: guide.cover.src, alt: guide.cover.alt }] }),
      },
    }
  } catch {
    return { title: 'Guide Not Found' }
  }
}

const categoryBadge: Record<string, string> = {
  'Border Crossing': 'bg-red-50 text-red-700 border-red-100',
  'Electronics':     'bg-violet-50 text-violet-700 border-violet-100',
  'Payment':         'bg-emerald-50 text-emerald-700 border-emerald-100',
  'Getting Around':  'bg-amber-50 text-amber-700 border-amber-100',
  'Accommodation':   'bg-sky-50 text-sky-700 border-sky-100',
  'Visa & Transit':  'bg-blue-50 text-blue-700 border-blue-100',
  'Food':            'bg-pink-50 text-pink-700 border-pink-100',
  'Shopping':        'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100',
  'Planning':        'bg-teal-50 text-teal-700 border-teal-100',
  'Language':        'bg-lime-50 text-lime-700 border-lime-100',
  'Entertainment':   'bg-indigo-50 text-indigo-700 border-indigo-100',
  'Connectivity':    'bg-cyan-50 text-cyan-700 border-cyan-100',
  'Lifestyle':       'bg-cyan-50 text-cyan-700 border-cyan-100',
  'Day Trips':       'bg-orange-50 text-orange-700 border-orange-100',
  'Safety':          'bg-rose-50 text-rose-700 border-rose-100',
  'Transport':       'bg-yellow-50 text-yellow-700 border-yellow-100',
  'Family':          'bg-purple-50 text-purple-700 border-purple-100',
  'Culture':         'bg-stone-50 text-stone-700 border-stone-100',
  'Attractions':     'bg-green-50 text-green-700 border-green-100',
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let guide
  try {
    guide = await getGuideBySlug(slug)
  } catch {
    notFound()
  }

  const badgeClass = categoryBadge[guide.category] ?? 'bg-stone-50 text-stone-700 border-stone-100'

  const pageUrl = `https://www.shenzhen-guide.com/guides/${slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    datePublished: guide.date,
    dateModified: guide.updated ?? guide.date,
    url: pageUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    ...(guide.cover && { image: new URL(guide.cover.src, pageUrl).href }),
    author: {
      '@type': 'Person',
      name: 'Xiangan Zeng',
      url: 'https://www.shenzhen-guide.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Shenzhen Guide',
      url: 'https://www.shenzhen-guide.com',
    },
  }

  // HowTo, only for the guides that genuinely describe one procedure. Google
  // retired HowTo rich results in 2023, so expect nothing in the SERP; this is
  // here because assistants that cite step-by-step answers can read it.
  const howToJsonLd = guide.howTo
    ? {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: guide.howTo.name,
        description: guide.description,
        step: guide.howTo.steps.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: s.name,
          text: s.text,
          url: `${pageUrl}#step-${i + 1}`,
        })),
      }
    : null

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {howToJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      )}
      <div className="max-w-2xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-stone-400 mb-8">
          <Link href="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-amber-600 transition-colors">Guides</Link>
          <span>/</span>
          <span className="text-stone-600 truncate">{guide.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-3xl">{guide.categoryIcon}</span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${badgeClass}`}>
              {guide.category}
            </span>
          </div>
          <h1
            className="text-2xl md:text-4xl font-bold text-stone-900 leading-tight mb-4"
            style={{ fontFamily: 'var(--font-display), serif', letterSpacing: '-0.01em' }}
          >
            {guide.title}
          </h1>
          <p className="text-stone-500 text-lg leading-relaxed mb-5">{guide.description}</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone-500">
            <span>
              By{' '}
              <Link href="/about" className="text-stone-600 hover:text-amber-600 hover:underline font-medium">
                Xiangan
              </Link>
            </span>
            <span>·</span>
            <span>{guide.readingTime}</span>
            <span>·</span>
            {/* <time> so the freshness signal is machine-readable, not just visible.
                Shows the last edit when there has been one, otherwise the
                publication date — never dressing one up as the other. */}
            <time dateTime={guide.updated ?? guide.date}>
              {guide.updated ? 'Updated' : 'Published'}{' '}
              {new Date(guide.updated ?? guide.date).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </time>
          </div>
        </div>

        <hr className="border-stone-200 mb-10" />

        {guide.cover && (
          <figure className="mb-8">
            <Image src={guide.cover.src} alt={guide.cover.alt} width={1400} height={1050}
              sizes="(max-width: 704px) calc(100vw - 32px), 672px"
              className="w-full h-auto rounded-xl" />
            <figcaption className="mt-2 text-xs leading-relaxed text-stone-500">
              {guide.cover.caption}{' '}Photo: <a href={guide.cover.source} className="underline underline-offset-2">{guide.cover.credit}</a>
              {' · '}<a href={guide.cover.licenseUrl} className="underline underline-offset-2">{guide.cover.license}</a>.
            </figcaption>
          </figure>
        )}

        {guide.quickSummary && (
          <section aria-labelledby="quick-guide-title" className="quick-guide mb-6">
            <h2 id="quick-guide-title" className="text-xl font-semibold text-stone-900 mb-4"
              style={{ fontFamily: 'var(--font-display), serif' }}>The short version</h2>
            <ul className="space-y-3">
              {guide.quickSummary.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-stone-700">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-600 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {guide.contents.length > 2 && (
          <nav aria-label="On this page" className="guide-contents mb-10">
            <details>
              <summary className="cursor-pointer font-semibold text-sm text-stone-800 py-4">On this page <span className="font-normal text-stone-500">({guide.contents.length} sections)</span></summary>
              <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2 pb-5 text-sm">
                {guide.contents.map((item) => (
                  <li key={item.id}><a href={`#${item.id}`} className="text-stone-600 hover:text-amber-800 underline decoration-stone-300 underline-offset-4">{item.title}</a></li>
                ))}
              </ul>
            </details>
          </nav>
        )}

        {/* Article body */}
        <article
          className="article-body"
          dangerouslySetInnerHTML={{ __html: guide.contentHtml }}
        />

        {/* Affiliate recommendations based on category */}
        {guide.category === 'Payment' && (
          <AffiliateBox
            title="Recommended eSIM for your trip"
            links={[
              {
                name: 'Nomad eSIM',
                url: AFFILIATE.nomad,
                description: 'Most reliable for China, Google, WhatsApp, etc. all work',
                badge: 'Best Overall',
              },
              {
                name: 'Airalo',
                url: AFFILIATE.airalo,
                description: 'China plans from $4 for 1GB / 3 days; check current prices',
                badge: 'Budget Pick',
              },
            ]}
          />
        )}

        {guide.category === 'Border Crossing' && (
          <AffiliateBox
            title="Set up before you cross"
            links={[
              {
                name: 'Saily China eSIM',
                url: AFFILIATE.saily,
                description: 'Check phone compatibility and install before crossing; China coverage',
                badge: 'China Data',
              },
              {
                name: 'Klook: Shenzhen Attractions',
                url: AFFILIATE.klook,
                description: 'Book tickets in advance with foreign payment',
                badge: 'Tickets',
              },
            ]}
          />
        )}

        {guide.category === 'Electronics' && (
          <AffiliateBox
            title="Get connected for your shopping trip"
            links={[
              {
                name: 'Nomad eSIM',
                url: AFFILIATE.nomad,
                description: 'Compare prices on the spot with working internet',
                badge: 'Essential',
              },
            ]}
          />
        )}

        {guide.category === 'Visa & Transit' && (
          <AffiliateBox
            title="Book before you fly"
            links={[
              {
                name: 'Klook: Shenzhen Hotels',
                url: AFFILIATE.klookHotels,
                description: 'Keep your accommodation confirmation; check cancellation terms before booking',
                badge: 'Recommended',
              },
              {
                name: 'Nomad eSIM',
                url: AFFILIATE.nomad,
                description: 'Install before departure, works without VPN in China',
                badge: 'Essential',
              },
            ]}
          />
        )}

        {guide.category === 'Accommodation' && (
          <AffiliateBox
            title="Book your Shenzhen stay"
            links={[
              {
                name: 'Klook: Shenzhen Hotels',
                url: AFFILIATE.klookHotels,
                description: 'Choose your dates, compare areas, and check cancellation terms before booking',
                badge: 'Compare Hotels',
              },
            ]}
          />
        )}

        {/* Universal recommendation card */}
        <RecommendationCard
          title="Essential for your Shenzhen trip"
          items={[
            {
              icon: '📶',
              title: 'Saily China eSIM',
              description: 'Compare China data plans and check phone compatibility. Install before arrival.',
              url: AFFILIATE.saily,
              badge: 'China Data',
            },
            {
              icon: '🏨',
              title: 'Klook: Shenzhen Hotels',
              description: 'Compare hotels for your travel dates. Check the location and cancellation deadline.',
              url: AFFILIATE.klookHotels,
            },
            {
              icon: '🎫',
              title: 'Klook',
              description: 'Book Shenzhen attractions and experiences with instant confirmation.',
              url: AFFILIATE.klook,
            },
          ]}
        />

        {/* Feedback prompt */}
        <div className="mt-14 bg-stone-50 border border-stone-200 rounded-xl p-6 text-center">
          <p className="text-stone-600 text-sm mb-3">
            Found something outdated or have a question? The author reads every message.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:text-amber-700 hover:underline transition-colors"
          >
            Leave feedback or get in touch →
          </Link>
        </div>

        {/* Back links */}
        <div className="mt-8 pt-8 border-t border-stone-200 flex items-center gap-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 hover:underline font-medium text-sm"
          >
            ← Back to Home
          </Link>
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-600 hover:underline text-sm"
          >
            All guides
          </Link>
        </div>
      </div>
    </div>
  )
}
