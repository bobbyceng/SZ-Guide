import { getAllGuides, getAllCategories, STAGES } from '@/lib/guides'
import GuideCard from '@/components/GuideCard'
import Link from 'next/link'

export const metadata = {
  title: 'All Guides',
  description: 'Practical guides for foreigners visiting Shenzhen, border crossings, electronics, payment, transport, and more.',
  alternates: { canonical: 'https://www.shenzhen-guide.com/guides' },
}

export default async function GuidesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const all = getAllGuides()

  // Trip stage is the primary view. Category filtering still works because the
  // footer links into it, but its controls only appear once you are actually
  // filtering — in the default view they competed with the group headings for
  // attention while duplicating links the footer already carries.
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

      {filtered ? (
        <>
          <div className="flex flex-wrap items-center gap-2 mb-10">
            <Link
              href="/guides"
              className="px-3 py-1.5 rounded-full text-xs font-semibold border bg-white text-stone-600 border-stone-200 hover:border-amber-400 hover:text-amber-700 transition-colors"
            >
              ← All guides
            </Link>
            {getAllCategories().map((cat) => (
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
              // The id is what the header's stage links land on. scroll-mt
              // clears the sticky header so the heading is not hidden under it.
              <section key={stage.key} id={stage.key} className="scroll-mt-28">
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
                {/* Column count follows the group, never a hardcoded slug: the
                    dated event group stays wide, and any group too small to
                    fill three columns uses two rather than leaving a hole in
                    the row. Both rules keep working as guides are added, and
                    deleting the APEC stage after November touches nothing
                    else. */}
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 gap-5 ${
                    isEvent || guides.length < 3 ? '' : 'lg:grid-cols-3'
                  }`}
                >
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
