import { getAllGuides, STAGES } from '@/lib/guides'
import GuideCard from '@/components/GuideCard'
import Link from 'next/link'

export const metadata = {
  title: 'All Guides',
  description: 'Practical guides for foreigners visiting Shenzhen, border crossings, electronics, payment, transport, and more.',
  alternates: { canonical: 'https://www.shenzhen-guide.com/guides' },
}

const ALL_CATEGORIES = [
  'Border Crossing', 'Electronics', 'Connectivity', 'Payment',
  'Getting Around', 'Accommodation', 'Visa & Transit',
]

export default async function GuidesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const all = getAllGuides()

  // Category filtering stays because the nav and footer link into it. Without a
  // category the page groups by stage instead, so a reader lands on structure
  // rather than on eleven identical cards.
  const filtered = category ? all.filter((g) => g.category === category) : null

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1
          className="text-3xl font-bold text-stone-900 mb-2"
          style={{ fontFamily: 'var(--font-display), serif' }}
        >
          {category ?? 'All Guides'}
        </h1>
        <p className="text-stone-500">
          {category
            ? 'Practical information for foreigners visiting Shenzhen.'
            : 'Grouped by where you are in the trip. Start wherever you actually are.'}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        <Link
          href="/guides"
          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
            !category
              ? 'bg-stone-900 text-white border-stone-900'
              : 'bg-white text-stone-600 border-stone-200 hover:border-amber-400 hover:text-amber-700'
          }`}
        >
          All
        </Link>
        {ALL_CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/guides?category=${encodeURIComponent(cat)}`}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              category === cat
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-white text-stone-600 border-stone-200 hover:border-amber-400 hover:text-amber-700'
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {filtered ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-stone-400">
              <p>
                No guides in this category yet.{' '}
                <Link href="/guides" className="text-amber-600 hover:underline">
                  View all guides →
                </Link>
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-14">
          {STAGES.map((stage) => {
            const guides = all.filter((g) => g.stage === stage.key)
            if (guides.length === 0) return null
            const isEvent = stage.key === 'apec'

            return (
              <section key={stage.key}>
                <div className="mb-5 pb-3 border-b border-stone-200">
                  <h2
                    className={`text-xl font-bold mb-1 ${isEvent ? 'text-amber-700' : 'text-stone-900'}`}
                    style={{ fontFamily: 'var(--font-display), serif' }}
                  >
                    {isEvent && <span className="mr-1.5">★</span>}
                    {stage.title}
                  </h2>
                  <p className="text-sm text-stone-500 max-w-2xl">{stage.blurb}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {guides.map((guide) => (
                    <GuideCard key={guide.slug} guide={guide} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}
