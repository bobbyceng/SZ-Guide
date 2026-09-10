import Link from 'next/link'
import { getFeaturedGuides, getAllGuides } from '@/lib/guides'
import GuideCard from '@/components/GuideCard'
import LeadGuideCard from '@/components/LeadGuideCard'

// Canonical is declared per page rather than in the root layout, so a new
// page can never silently inherit the homepage URL and de-index itself.
export const metadata = {
  alternates: { canonical: 'https://www.shenzhen-guide.com' },
}

export default function HomePage() {
  const featured = getFeaturedGuides()
  const [lead, ...restFeatured] = featured
  const featuredSlugs = new Set(featured.map((g) => g.slug))
  const rest = getAllGuides().filter((g) => !featuredSlugs.has(g.slug))

  return (
    <div>
      {/* Hero, editorial split: cream text left, city photo right */}
      <section className="relative bg-[#faf7f2] overflow-hidden">
        {/* Photo panel, right half, full bleed */}
        <div
          className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block"
          aria-hidden="true"
        >
          <img
            src="https://images.unsplash.com/photo-1657639809496-6a4af16ce1a2?auto=format&fit=crop&w=1400&q=80"
            alt=""
            width={1400}
            height={933}
            fetchPriority="high"
            className="w-full h-full object-cover object-center"
          />
          {/* Blend left edge into cream background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#faf7f2] via-[#faf7f2]/50 to-transparent" />
          {/* Subtle bottom vignette */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#faf7f2]/30 to-transparent" />
        </div>

        {/* Text content */}
        <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-32">
          <div className="max-w-md">
            {/* Live badge */}
            <div className="fade-up inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs mb-8 border border-stone-200 text-stone-500 bg-white shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse flex-shrink-0" />
              Written by someone who grew up in Shenzhen
            </div>

            <h1
              className="fade-up-1 text-5xl md:text-[3.5rem] font-bold leading-[1.1] text-stone-900 mb-6"
              style={{ fontFamily: 'var(--font-display), serif', letterSpacing: '-0.025em' }}
            >
              The insider<br />guide to{' '}
              <span className="relative inline-block">
                <span className="text-amber-500">Shenzhen</span>
                <span
                  className="absolute left-0 right-0 h-[3px] bg-amber-400/70 rounded-full"
                  style={{ bottom: '0.08em' }}
                />
              </span>
            </h1>

            <p className="fade-up-2 text-stone-500 text-lg leading-relaxed mb-4">
              Border crossings, electronics, payment setup, the real information most travel sites get wrong.
            </p>

            <p className="fade-up-2 text-sm text-stone-500 mb-10">
              By{' '}
              <Link
                href="/about"
                className="font-semibold text-stone-700 hover:text-amber-600 hover:underline transition-colors"
              >
                Xiangan
              </Link>
              , born and raised in Shenzhen.
            </p>

            <div className="fade-up-3 flex flex-col sm:flex-row gap-3">
              <Link
                href="/guides/hong-kong-to-shenzhen"
                className="group inline-flex items-center justify-center gap-2 bg-[#0d1117] text-white font-semibold px-6 py-3 rounded-lg text-sm hover:bg-stone-800 transition-colors"
              >
                HK → Shenzhen Guide
                <span className="text-amber-400 transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile photo strip */}
        <div className="md:hidden relative h-44 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1657639809496-6a4af16ce1a2?auto=format&fit=crop&w=800&q=60"
            alt="Shenzhen city skyline"
            width={800}
            height={533}
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf7f2]/60 via-transparent to-[#faf7f2]" />
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-14">
        {/* Lead story, the newest featured guide */}
        {lead && (
          <section className="mb-14">
            <LeadGuideCard guide={lead} eyebrow="Latest" />
          </section>
        )}

        {/* Essential guides */}
        {restFeatured.length > 0 && (
          <section className="mb-14">
            <h2
              className="text-2xl font-bold text-stone-900 mb-6"
              style={{ fontFamily: 'var(--font-display), serif' }}
            >
              Start here
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {restFeatured.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </section>
        )}

        {/* Everything else, deduplicated against the sections above */}
        {rest.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-2xl font-bold text-stone-900"
                style={{ fontFamily: 'var(--font-display), serif' }}
              >
                More guides
              </h2>
              <Link
                href="/guides"
                className="text-sm text-amber-600 hover:text-amber-700 hover:underline font-medium transition-colors"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rest.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </section>
        )}

        {/* Trust section */}
        <section className="mt-14 bg-[#0d1117] rounded-2xl p-8 md:p-10">
          <h2
            className="text-xl font-bold text-white/90 mb-6"
            style={{ fontFamily: 'var(--font-display), serif' }}
          >
            Why trust SZGuide?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div>
              <div className="font-semibold text-amber-400 mb-2">Local knowledge</div>
              <p className="text-stone-500 leading-relaxed">
                Born and raised in Shenzhen. Not a travel blogger guessing from abroad.
              </p>
            </div>
            <div>
              <div className="font-semibold text-amber-400 mb-2">Kept up to date</div>
              <p className="text-stone-500 leading-relaxed">
                Visa policies and payment rules change fast. Guides updated when things change.
              </p>
            </div>
            <div>
              <div className="font-semibold text-amber-400 mb-2">No fluff</div>
              <p className="text-stone-500 leading-relaxed">
                Just the information you need, without the padding that most travel sites add.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
