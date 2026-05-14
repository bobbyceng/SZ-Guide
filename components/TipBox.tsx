interface TipBoxProps {
  children: React.ReactNode
  title?: string
}

export default function TipBox({ children, title = 'Quick Tip' }: TipBoxProps) {
  return (
    <div className="my-6 rounded-xl border-l-4 border-amber-400 bg-amber-50/60 px-5 py-4">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-base">💡</span>
        <span className="text-sm font-semibold text-amber-800">{title}</span>
      </div>
      <div className="text-sm text-stone-700 leading-relaxed">
        {children}
      </div>
    </div>
  )
}
