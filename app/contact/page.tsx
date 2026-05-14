'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)
    const res = await fetch('https://formspree.io/f/xlgzkpdg', {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    })
    if (res.ok) {
      setStatus('success')
      form.reset()
    } else {
      setStatus('error')
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <nav className="flex items-center gap-2 text-sm text-stone-400 mb-10">
        <Link href="/" className="hover:text-amber-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-stone-600">Contact</span>
      </nav>

      <h1
        className="text-3xl font-bold text-stone-900 mb-3"
        style={{ fontFamily: 'var(--font-display), serif' }}
      >
        Get in touch
      </h1>
      <p className="text-stone-500 mb-2 leading-relaxed">
        Found something outdated? Have a question we didn&apos;t answer? Want to work together?
      </p>
      <p className="text-stone-500 mb-10 leading-relaxed">
        Every message goes directly to the author — I read and reply to everything.
      </p>

      {status === 'success' ? (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 text-center">
          <div className="text-2xl mb-3">✓</div>
          <p className="font-semibold text-stone-800 mb-1">Message received</p>
          <p className="text-stone-500 text-sm">I&apos;ll get back to you within a few days.</p>
          <Link href="/" className="inline-block mt-6 text-sm text-amber-600 hover:underline">
            ← Back to guides
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5" htmlFor="reason">
              Reason
            </label>
            <select
              id="reason"
              name="reason"
              required
              className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm text-stone-700 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            >
              <option value="">Select a reason…</option>
              <option value="Feedback / correction">Feedback or correction</option>
              <option value="Question">Question</option>
              <option value="Partnership / advertising">Partnership or advertising</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5" htmlFor="email">
              Your email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm text-stone-700 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="What's on your mind?"
              className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm text-stone-700 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-[#0d1117] text-white font-semibold py-3 rounded-lg text-sm hover:bg-stone-800 transition-colors disabled:opacity-60"
          >
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>

          {status === 'error' && (
            <p className="text-sm text-red-500 text-center">
              Something went wrong. Try again or email me directly.
            </p>
          )}
        </form>
      )}
    </div>
  )
}
