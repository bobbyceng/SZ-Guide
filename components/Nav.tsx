import Link from 'next/link'
import { STAGES } from '@/lib/guides'

const linkBase =
  'text-sm font-medium text-stone-500 hover:text-white transition-colors ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117] rounded'

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-[#0d1117] border-b border-white/[0.06]">
      {/* Skip link: first thing a keyboard or screen reader user reaches. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-amber-400 focus:text-stone-900 focus:px-3 focus:py-1.5 focus:rounded focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>

      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-14 gap-4">
          <Link
            href="/"
            className="flex items-center gap-0.5 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded"
          >
            <span className="text-xl font-bold text-amber-400" style={{ fontFamily: 'var(--font-display), serif' }}>
              SZ
            </span>
            <span className="text-xl font-bold text-white/90">Guide</span>
          </Link>

          {/* Visible at every width. Most readers are on a phone, standing in a
              station — hiding navigation from them was the wrong trade. */}
          <nav className="flex items-center gap-4 sm:gap-5">
            <Link href="/guides" className={linkBase}>
              All&nbsp;Guides
            </Link>
            <Link href="/about" className={linkBase}>
              About
            </Link>
          </nav>
        </div>

        {/* Trip stage, the site's only navigation axis. This row used to list
            categories, which meant the header taught one vocabulary and the
            page it linked to used another. Each link lands on the matching
            group heading on the listing page.

            Scrolls horizontally instead of disappearing on narrow screens. No
            JS, no drawer to open — the links stay reachable. */}
        <div className="flex items-center gap-1 pb-2.5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {STAGES.map((stage) => (
            <Link
              key={stage.key}
              href={`/guides#${stage.key}`}
              className="text-xs text-stone-500 hover:text-amber-400 hover:bg-white/5 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              {stage.short}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
