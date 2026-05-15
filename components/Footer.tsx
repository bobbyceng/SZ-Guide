import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#0d1117] border-t border-white/[0.06] mt-16">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-0.5 mb-4">
              <span
                className="text-xl font-bold text-amber-400"
                style={{ fontFamily: 'var(--font-display), serif' }}
              >
                SZ
              </span>
              <span className="text-xl font-bold text-white/90">Guide</span>
            </div>
            <p className="text-sm text-stone-500 leading-relaxed">
              Practical guides for foreigners visiting Shenzhen, written by a local who grew up here.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-4">Popular Guides</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/guides/hong-kong-to-shenzhen" className="text-sm text-stone-500 hover:text-amber-400 transition-colors">
                  Hong Kong → Shenzhen
                </Link>
              </li>
              <li>
                <Link href="/guides/huaqiangbei-electronics-guide" className="text-sm text-stone-500 hover:text-amber-400 transition-colors">
                  Huaqiangbei Shopping
                </Link>
              </li>
              <li>
                <Link href="/guides/best-esim-for-shenzhen" className="text-sm text-stone-500 hover:text-amber-400 transition-colors">
                  Best eSIM for Shenzhen
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-4">Categories</h4>
            <ul className="space-y-2.5">
              {['Border Crossing', 'Electronics', 'Payment', 'Getting Around', 'Accommodation'].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/guides?category=${encodeURIComponent(cat)}`}
                    className="text-sm text-stone-500 hover:text-amber-400 transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
              <li className="pt-1 border-t border-white/[0.06] mt-1">
                <Link href="/about" className="text-sm text-stone-500 hover:text-amber-400 transition-colors">
                  About Myself
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-stone-500 hover:text-amber-400 transition-colors">
                  Contact / Feedback
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/[0.06] pt-6">
          <p className="text-xs text-stone-600 leading-relaxed">
            Some links on this site are affiliate links. If you purchase through them, we earn a small commission at no extra cost to you.
          </p>
          <p className="text-xs text-stone-700 mt-2">© {new Date().getFullYear()} SZGuide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
