import Link from 'next/link'
import { getFeaturedGuides, getAllGuides } from '@/lib/guides'
import GuideCard from '@/components/GuideCard'

function Icon({ d, className = '' }: { d: string; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`w-6 h-6 ${className}`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  )
}

const categories = [
  {
    d: 'M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 3M21 7.5H7.5',
    label: 'Border Crossing',
    desc: 'HK ↔ SZ, documents, timings',
    href: '/guides?category=Border+Crossing',
  },
  {
    d: 'M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3',
    label: 'Electronics',
    desc: 'Huaqiangbei insider tips',
    href: '/guides?category=Electronics',
  },
  {
    d: 'M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z',
    label: 'Connectivity',
    desc: 'eSIM, internet in China',
    href: '/guides?category=Connectivity',
  },
  {
    d: 'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z',
    label: 'Payment',
    desc: 'Alipay & WeChat setup',
    href: '/guides?category=Payment',
  },
  {
    d: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z',
    label: 'Getting Around',
    desc: 'Metro, DiDi, buses',
    href: '/guides?category=Getting+Around',
  },
  {
    d: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25',
    label: 'Accommodation',
    desc: 'Where to stay by area',
    href: '/guides?category=Accommodation',
  },
  {
    d: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
    label: 'Visa & Transit',
    desc: '240-hour visa-free guide',
    href: '/guides?category=Visa+%26+Transit',
  },
]

export default function HomePage() {
  const featured = getFeaturedGuides()
  const all = getAllGuides()

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
              , born and raised in Shenzhen.{' '}
              <Link
                href="/about"
                className="text-amber-600 hover:text-amber-700 hover:underline transition-colors"
              >
                Read my story →
              </Link>
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
              <Link
                href="/guides"
                className="inline-flex items-center justify-center border border-stone-300 text-stone-600 font-medium px-6 py-3 rounded-lg text-sm hover:border-amber-400 hover:text-amber-700 transition-colors"
              >
                Browse All Guides
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile photo strip */}
        <div className="md:hidden relative h-44 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1657639809496-6a4af16ce1a2?auto=format&fit=crop&w=800&q=60"
            alt="Shenzhen city skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf7f2]/60 via-transparent to-[#faf7f2]" />
        </div>
      </section>

      {/* Categories */}
      <section className="border-y border-stone-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="border border-stone-100 rounded-xl p-4 hover:border-amber-300 hover:bg-amber-50/50 transition-all text-center group"
              >
                <div className="flex justify-center mb-2.5 text-stone-400 transition-all duration-200 group-hover:text-amber-500 group-hover:-translate-y-0.5">
                  <Icon d={cat.d} />
                </div>
                <div className="text-xs font-semibold text-stone-700 group-hover:text-amber-700 mb-1 transition-colors">
                  {cat.label}
                </div>
                <div className="text-xs text-stone-400 leading-tight">{cat.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-14">
        {/* Featured guides */}
        {featured.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-2xl font-bold text-stone-900"
                style={{ fontFamily: 'var(--font-display), serif' }}
              >
                Essential Guides
              </h2>
              <Link
                href="/guides"
                className="text-sm text-amber-600 hover:text-amber-700 hover:underline font-medium transition-colors"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {featured.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </section>
        )}

        {/* All guides */}
        <section>
          <h2
            className="text-2xl font-bold text-stone-900 mb-6"
            style={{ fontFamily: 'var(--font-display), serif' }}
          >
            All Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {all.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </section>

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
          <div className="mt-8 pt-6 border-t border-white/[0.06]">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 hover:underline transition-colors"
            >
              Meet the author →
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
