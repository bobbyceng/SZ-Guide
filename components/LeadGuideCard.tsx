import Link from 'next/link'
import { GuideMetadata } from '@/lib/guides'

/**
 * Lead story treatment for the single most important guide on the homepage.
 * Deliberately heavier than GuideCard so the page has a clear entry point
 * instead of a uniform grid.
 */
export default function LeadGuideCard({
  guide,
  eyebrow,
}: {
  guide: GuideMetadata
  eyebrow?: string
}) {
  return (
    <Link href={`/guides/${guide.slug}`} className="block group">
      <div className="relative overflow-hidden rounded-2xl bg-[#0d1117] p-7 md:p-10 transition-all duration-200 group-hover:-translate-y-0.5">
        {/* Amber edge, always visible on the lead card */}
        <div className="absolute left-0 inset-y-0 w-[3px] bg-amber-400" />

        <div className="md:flex md:items-end md:justify-between md:gap-10">
          <div className="md:max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              {eyebrow && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse flex-shrink-0" />
                  {eyebrow}
                </span>
              )}
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/[0.06] text-stone-400 border border-white/[0.08]">
                {guide.category}
              </span>
            </div>

            <h3
              className="text-2xl md:text-[2rem] font-bold text-white leading-[1.15] mb-3 transition-colors group-hover:text-amber-100"
              style={{ fontFamily: 'var(--font-display), serif', letterSpacing: '-0.02em' }}
            >
              {guide.title}
            </h3>

            <p className="text-stone-400 leading-relaxed md:text-lg">
              {guide.cardBlurb ?? guide.description}
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-4 md:flex-col md:items-end md:gap-3 flex-shrink-0">
            <span className="text-xs text-stone-500 whitespace-nowrap">{guide.readingTime}</span>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 whitespace-nowrap transition-transform duration-200 group-hover:translate-x-0.5">
              Read the guide →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
