import Link from 'next/link'

const categories = [
  { label: 'Border Crossing', href: '/guides?category=Border+Crossing' },
  { label: 'Electronics', href: '/guides?category=Electronics' },
  { label: 'Payment', href: '/guides?category=Payment' },
  { label: 'Getting Around', href: '/guides?category=Getting+Around' },
  { label: 'Accommodation', href: '/guides?category=Accommodation' },
]

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-[#0d1117] border-b border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-0.5">
            <span
              className="text-xl font-bold text-amber-400"
              style={{ fontFamily: 'var(--font-display), serif' }}
            >
              SZ
            </span>
            <span className="text-xl font-bold text-white/90">Guide</span>
          </Link>
          <nav className="hidden md:flex items-center gap-5">
            <Link
              href="/guides"
              className="nav-link text-sm font-medium text-stone-500 hover:text-white transition-colors"
            >
              All Guides
            </Link>
            <Link
              href="/guides?category=Border+Crossing"
              className="nav-link text-sm font-medium text-stone-500 hover:text-white transition-colors"
            >
              Border
            </Link>
            <Link
              href="/guides?category=Electronics"
              className="nav-link text-sm font-medium text-stone-500 hover:text-white transition-colors"
            >
              Electronics
            </Link>
            <Link
              href="/about"
              className="nav-link text-sm font-medium text-stone-500 hover:text-white transition-colors"
            >
              About Myself
            </Link>
          </nav>
        </div>
        <div className="hidden md:flex items-center gap-1 pb-2.5 overflow-x-auto">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="text-xs text-stone-600 hover:text-amber-400 hover:bg-white/5 px-3 py-1 rounded-full transition-colors whitespace-nowrap"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
