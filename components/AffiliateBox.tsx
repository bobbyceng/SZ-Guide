import Link from 'next/link'

interface AffiliateLink {
  name: string
  url: string
  description: string
  badge?: string
}

interface AffiliateBoxProps {
  title?: string
  links: AffiliateLink[]
  disclosure?: string
}

export default function AffiliateBox({
  title = 'Recommended for your trip',
  links,
  disclosure = 'If you buy through these links, we may earn a commission at no extra cost to you.',
}: AffiliateBoxProps) {
  return (
    <div className="my-8 rounded-xl border border-amber-200 bg-amber-50/50 p-5">
      <div className="flex items-center gap-2 mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-amber-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
        <span className="text-sm font-semibold text-amber-800">{title}</span>
      </div>
      <div className="space-y-2.5">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-lg bg-white border border-amber-100 hover:border-amber-300 hover:shadow-sm transition-all group"
          >
            <div>
              <span className="text-sm font-semibold text-stone-800 group-hover:text-amber-700 transition-colors">
                {link.name}
              </span>
              <p className="text-xs text-stone-500 mt-0.5">{link.description}</p>
            </div>
            {link.badge && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 whitespace-nowrap ml-3">
                {link.badge}
              </span>
            )}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-stone-300 group-hover:text-amber-400 transition-colors ml-2 flex-shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        ))}
      </div>
      <p className="text-[11px] text-stone-400 mt-3 italic">{disclosure}</p>
    </div>
  )
}
