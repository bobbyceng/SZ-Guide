'use client'

import { useId, useRef, useState } from 'react'
import Link from 'next/link'

const choices = [
  { value: 'yes', label: 'Yes, it helped' },
  { value: 'partly', label: 'Partly' },
  { value: 'no', label: 'I still have questions' },
] as const

type Helpfulness = (typeof choices)[number]['value']

export default function GuideFeedback({ slug, title }: { slug: string; title: string }) {
  const id = useId()
  const [helpfulness, setHelpfulness] = useState<Helpfulness | null>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const inFlight = useRef(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!helpfulness || inFlight.current) return
    inFlight.current = true
    setStatus('sending')

    const data = new FormData(event.currentTarget)
    data.set('reason', 'Guide usefulness')
    data.set('guide', `https://www.shenzhen-guide.com/guides/${slug}`)
    data.set('guide_title', title)
    data.set('helpfulness', helpfulness)
    data.set('experiment', 'guide-feedback-v1')
    if (!String(data.get('email') ?? '').trim()) data.delete('email')

    // Only retain campaign tags, never arbitrary URL parameters or browsing history.
    const params = new URLSearchParams(window.location.search)
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
      const value = params.get(key)
      if (value) data.set(key, value.slice(0, 80))
    }

    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 15000)
    try {
      const response = await fetch('https://formspree.io/f/xlgzkpdg', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      })
      setStatus(response.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    } finally {
      window.clearTimeout(timeout)
      inFlight.current = false
    }
  }

  return (
    <section id="guide-feedback" aria-labelledby={`${id}-title`} className="mt-14 scroll-mt-36 rounded-xl border border-stone-200 bg-stone-50 p-6">
      <h2 id={`${id}-title`} className="text-base font-semibold text-stone-900">
        Did this guide help you plan your next step?
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-stone-600">
        Tell me what worked or what is still missing. No name or account needed.
      </p>

      {status === 'success' ? (
        <p role="status" className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          Thanks — your feedback was sent. If you included an email, the author can reply.
        </p>
      ) : (
        <>
          <div role="group" aria-labelledby={`${id}-title`} className="mt-4 flex flex-wrap gap-2">
            {choices.map((choice) => (
              <button
                key={choice.value}
                type="button"
                aria-pressed={helpfulness === choice.value}
                disabled={status === 'sending'}
                onClick={() => { setHelpfulness(choice.value); setStatus('idle') }}
                className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:opacity-60 ${
                  helpfulness === choice.value
                    ? 'border-amber-600 bg-amber-50 text-amber-900'
                    : 'border-stone-300 bg-white text-stone-700 hover:border-amber-600'
                }`}
              >
                {choice.label}
              </button>
            ))}
          </div>

          {helpfulness && (
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <fieldset disabled={status === 'sending'} className="space-y-4">
                <legend className="sr-only">Guide feedback details</legend>
                <div>
                  <label htmlFor={`${id}-topic`} className="mb-1.5 block text-sm font-medium text-stone-700">
                    Which part matters most to you? <span className="font-normal">(optional)</span>
                  </label>
                  <select id={`${id}-topic`} name="topic" className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option value="">Choose a topic…</option>
                    <option value="entry-border">Entry documents or border crossing</option>
                    <option value="transport">Metro, taxi or airport transport</option>
                    <option value="payment-connectivity">Payment or mobile data</option>
                    <option value="accommodation">Where to stay</option>
                    <option value="shopping-sightseeing">Shopping or things to do</option>
                    <option value="apec">APEC visit planning</option>
                    <option value="other">Something else</option>
                  </select>
                </div>
                <div>
                  <label htmlFor={`${id}-message`} className="mb-1.5 block text-sm font-medium text-stone-700">
                    What would make this guide more useful? <span className="font-normal">(optional)</span>
                  </label>
                  <textarea id={`${id}-message`} name="message" rows={3} maxLength={2000} placeholder="For example: I couldn't work out which station exit to use." className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
                <div>
                  <label htmlFor={`${id}-email`} className="mb-1.5 block text-sm font-medium text-stone-700">
                    Email for a reply <span className="font-normal">(optional)</span>
                  </label>
                  <input id={`${id}-email`} name="email" type="email" autoComplete="email" maxLength={254} placeholder="Leave blank to send without an email" className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
                <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                <p className="text-xs leading-relaxed text-stone-500">
                  Sent to the site&apos;s author through Formspree. Please leave out passport, card and booking details. Adding an email allows a reply, not a newsletter subscription.
                </p>
                <button type="submit" className="rounded-lg bg-[#0d1117] px-5 py-2.5 text-sm font-semibold text-white hover:bg-stone-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:opacity-60">
                  {status === 'sending' ? 'Sending…' : 'Send feedback'}
                </button>
              </fieldset>
              {status === 'error' && (
                <p role="alert" className="text-sm text-red-700">
                  Feedback could not be sent. Your answers are still here — please try again, or use the contact page below.
                </p>
              )}
            </form>
          )}
        </>
      )}
      <Link href="/contact" className="mt-5 inline-block text-sm font-medium text-amber-800 underline underline-offset-4">
        Contact the author about something else →
      </Link>
      <noscript><p className="mt-2 text-sm text-stone-600">Use the contact link to leave feedback when JavaScript is off.</p></noscript>
    </section>
  )
}
