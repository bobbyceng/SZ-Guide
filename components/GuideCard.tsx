import Link from 'next/link'
import { GuideMetadata } from '@/lib/guides'

const categoryBadge: Record<string, string> = {
  'Border Crossing': 'bg-red-50 text-red-700 border-red-100',
  'Electronics':     'bg-violet-50 text-violet-700 border-violet-100',
  'Payment':         'bg-emerald-50 text-emerald-700 border-emerald-100',
  'Getting Around':  'bg-amber-50 text-amber-700 border-amber-100',
  'Accommodation':   'bg-sky-50 text-sky-700 border-sky-100',
  'Visa & Transit':  'bg-blue-50 text-blue-700 border-blue-100',
  'Food':            'bg-pink-50 text-pink-700 border-pink-100',
  'Shopping':        'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100',
  'Planning':        'bg-teal-50 text-teal-700 border-teal-100',
  'Language':        'bg-lime-50 text-lime-700 border-lime-100',
  'Entertainment':   'bg-indigo-50 text-indigo-700 border-indigo-100',
  'Connectivity':    'bg-cyan-50 text-cyan-700 border-cyan-100',
  'Lifestyle':       'bg-cyan-50 text-cyan-700 border-cyan-100',
  'Day Trips':       'bg-orange-50 text-orange-700 border-orange-100',
  'Safety':          'bg-rose-50 text-rose-700 border-rose-100',
  'Transport':       'bg-yellow-50 text-yellow-700 border-yellow-100',
  'Family':          'bg-purple-50 text-purple-700 border-purple-100',
  'Culture':         'bg-stone-50 text-stone-700 border-stone-100',
}

const categoryIconPath: Record<string, string> = {
  'Border Crossing': 'M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 3M21 7.5H7.5',
  'Electronics':     'M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3',
  'Payment':         'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z',
  'Getting Around':  'M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z',
  'Accommodation':   'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25',
  'Visa & Transit':  'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
  'Food':            'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z',
}

const defaultIconPath = 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'

export default function GuideCard({ guide }: { guide: GuideMetadata }) {
  const badgeClass = categoryBadge[guide.category] ?? 'bg-stone-50 text-stone-700 border-stone-100'
  const iconPath = categoryIconPath[guide.category] ?? defaultIconPath

  return (
    <Link href={`/guides/${guide.slug}`} className="block group">
      <div className="bg-white rounded-xl p-5 h-full border border-stone-200 shadow-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:border-amber-200 group-hover:shadow-lg group-hover:shadow-amber-50/80 relative overflow-hidden">
        {/* Left accent bar — grows from center on hover */}
        <div className="absolute left-0 inset-y-0 w-[3px] bg-amber-400 rounded-r-full scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />

        <div className="flex items-start justify-between gap-3 mb-3">
          {/* SVG icon replacing emoji */}
          <div className="text-stone-400 group-hover:text-amber-500 transition-colors duration-200 flex-shrink-0 mt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
            </svg>
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap ${badgeClass}`}>
            {guide.category}
          </span>
        </div>

        <h3
          className="font-bold text-stone-900 leading-snug mb-2 group-hover:text-amber-700 transition-colors"
          style={{ fontFamily: 'var(--font-display), serif', fontSize: '1rem' }}
        >
          {guide.title}
        </h3>

        <p className="text-sm text-stone-500 leading-relaxed line-clamp-2 mb-4">
          {guide.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <span>{guide.readingTime}</span>
            <span>·</span>
            <span>
              {new Date(guide.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </span>
          </div>
          <span className="text-xs text-stone-300 group-hover:text-amber-400 transition-all duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </div>
      </div>
    </Link>
  )
}
