import Link from 'next/link'
import { GuideMetadata } from '@/lib/guides'

// "Updated" is only worth showing while it is still news. Sixty days was too
// generous — after a fortnight of revisions nearly every card carried the
// badge, which is the same "everything looks identical" problem the dates had.
// Two weeks keeps it rare enough to mean something.
function isRecent(iso: string): boolean {
  const days = (Date.now() - new Date(iso).getTime()) / 86400000
  return days <= 14
}

export default function GuideCard({ guide }: { guide: GuideMetadata }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="block group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
    >
      {/*
        Deliberately plain. This card used to carry an eighteen-colour category
        palette, a generic icon, and five stacked hover effects. None of it told
        the reader anything: the colours were assigned arbitrarily, four guides
        fell back to a star icon unrelated to their subject, and the motion was
        decoration rather than feedback. What survives is a border that responds
        to hover and a title that changes colour — enough to show the card is
        interactive, and nothing more.
      */}
      <article className="bg-white rounded-xl p-5 h-full border border-stone-200 transition-colors duration-150 group-hover:border-stone-400">
        <p className="text-[11px] font-medium uppercase tracking-wider text-stone-400 mb-2.5">
          {guide.category}
        </p>

        <h3
          className="font-bold text-stone-900 leading-snug mb-2 text-balance transition-colors duration-150 group-hover:text-amber-700"
          style={{ fontFamily: 'var(--font-display), serif', fontSize: '1rem' }}
        >
          {guide.title}
        </h3>

        <p className="text-sm text-stone-500 leading-relaxed line-clamp-2 mb-4">
          {guide.cardBlurb ?? guide.description}
        </p>

        <div className="flex items-center gap-2 text-xs text-stone-400">
          <span>{guide.readingTime}</span>
          <span aria-hidden="true">·</span>
          {/* The card shows when it was published. A recent edit gets its own
              marker instead of overwriting the date, so a guide from May that
              was revised last week reads as exactly that. */}
          <time dateTime={guide.date}>
            {new Date(guide.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </time>
          {guide.updated && isRecent(guide.updated) && (
            <span className="text-amber-700 font-medium">· Updated</span>
          )}
        </div>
      </article>
    </Link>
  )
}
