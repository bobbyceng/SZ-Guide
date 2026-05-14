import Link from 'next/link'

interface Recommendation {
  icon: string
  title: string
  description: string
  url: string
  badge?: string
}

interface RecommendationCardProps {
  title?: string
  items: Recommendation[]
}

export default function RecommendationCard({
  title = 'Recommended for your Shenzhen trip',
  items,
}: RecommendationCardProps) {
  return (
    <section className="my-10 rounded-2xl bg-[#0d1117] p-6 md:p-8">
      <h3
        className="text-lg font-bold text-white/90 mb-5"
        style={{ fontFamily: 'var(--font-display), serif' }}
      >
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/30 hover:bg-white/10 transition-all group"
          >
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-white/90 group-hover:text-amber-400 transition-colors">
                {item.title}
              </span>
              {item.badge && (
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-amber-400/20 text-amber-400">
                  {item.badge}
                </span>
              )}
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">{item.description}</p>
          </Link>
        ))}
      </div>
      <p className="text-[11px] text-stone-600 mt-4 italic">
        Some links may be affiliate links — we may earn a commission at no extra cost to you.
      </p>
    </section>
  )
}
