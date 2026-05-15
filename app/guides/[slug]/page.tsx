import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getGuideBySlug, getAllGuideSlugs } from '@/lib/guides'
import AffiliateBox from '@/components/AffiliateBox'
import RecommendationCard from '@/components/RecommendationCard'
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

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
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
          <div className="flex items-center gap-3 text-sm text-stone-400">
            <span>
              By{' '}
              <Link href="/about" className="text-stone-600 hover:text-amber-600 hover:underline font-medium">
                Xiangan
              </Link>
            </span>
            <span>·</span>
            <span>{guide.readingTime}</span>
            <span>·</span>
            <span>
              Updated{' '}
              {new Date(guide.date).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        <hr className="border-stone-200 mb-10" />

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
                url: 'https://www.getnomad.app',
                description: 'Most reliable for China, Google, WhatsApp, etc. all work',
                badge: 'Best Overall',
              },
              {
                name: 'Airalo',
                url: 'https://www.airalo.com',
                description: 'Budget option from $5, great for short trips',
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
                name: 'Nomad eSIM',
                url: 'https://www.getnomad.app',
                description: 'Install before crossing, works without VPN in China',
                badge: 'Essential',
              },
              {
                name: 'Klook: Shenzhen Attractions',
                url: 'https://www.klook.com',
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
                url: 'https://www.getnomad.app',
                description: 'Compare prices on the spot with working internet',
                badge: 'Essential',
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
              title: 'Nomad eSIM',
              description: 'Reliable data in China, no VPN needed. Works with Google, WhatsApp, Instagram.',
              url: 'https://www.getnomad.app',
              badge: 'Must-Have',
            },
            {
              icon: '🏨',
              title: 'Booking.com',
              description: 'Best price guarantee on Shenzhen hotels. Free cancellation on most rooms.',
              url: 'https://www.booking.com',
            },
            {
              icon: '🎫',
              title: 'Klook',
              description: 'Book Shenzhen attractions and experiences with instant confirmation.',
              url: 'https://www.klook.com',
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
