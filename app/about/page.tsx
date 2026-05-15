import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Myself',
  description:
    'Xiangan grew up in Shenzhen and writes this guide for foreigners visiting the city. Born in Hunan, studied in Ohio and Hong Kong, lives in Shenzhen.',
  alternates: { canonical: 'https://www.shenzhen-guide.com/about' },
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-wider uppercase text-amber-600 mb-3">
          About
        </p>
        <h1
          className="text-3xl md:text-5xl font-bold text-stone-900 leading-tight mb-5"
          style={{ fontFamily: 'var(--font-display), serif', letterSpacing: '-0.01em' }}
        >
          Hi, I&apos;m Xiangan.
        </h1>
        <p className="text-stone-500 text-lg leading-relaxed">
          I grew up in Shenzhen. Most of what you&apos;ll read on the internet about this city
          was written by people passing through. This guide is what I&apos;d tell a friend who
          asked me how to actually get around here.
        </p>
      </div>

      <div className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-2xl overflow-hidden mb-10 bg-stone-100">
        <Image
          src="/images/about/profile.jpg"
          alt="Xiangan, the author"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 448px"
          priority
        />
      </div>

      <div className="prose-content space-y-5 text-stone-700 leading-relaxed">
        <p>
          I was born in Hunan and moved to Shenzhen as a kid, back when the city still felt
          half-finished. I watched it become what it is now: the metro lines opening one by
          one, Huaqiangbei going from gritty parts market to a tourist stop, Futian filling
          up with glass towers.
        </p>
        <p>
          I studied business English at university, spent a semester at Kent State in Ohio,
          served in the military, and finished a master&apos;s degree in Hong Kong focused on
          AI. Now I&apos;m back in Shenzhen, working on AI products and writing this guide on
          the side.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100">
          <Image
            src="/images/about/shenzhen.jpg"
            alt="Track bike on a bridge with the Futian CBD skyline"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100">
          <Image
            src="/images/about/spartan.jpg"
            alt="Spartan Race mud pit"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      <div className="prose-content space-y-5 text-stone-700 leading-relaxed">
        <p>
          A few years ago I weighed 100kg (220 lbs). I stabilized around 86kg through a slow,
          unglamorous process of weightlifting, running, and learning to cook. That period
          taught me more about systems and discipline than any class did, and it&apos;s where
          most of how I work on things now comes from.
        </p>
        <p>
          I cycle around Shenzhen, run on the coastal paths, lift at neighborhood gyms, and
          occasionally do Spartan races. If you see someone covered in mud at a Shenzhen
          obstacle race, it might be me.
        </p>
      </div>

      <div className="my-12 p-7 rounded-2xl bg-stone-50 border border-stone-200">
        <h2
          className="text-2xl font-bold text-stone-900 mb-4"
          style={{ fontFamily: 'var(--font-display), serif' }}
        >
          Why this guide exists
        </h2>
        <div className="space-y-4 text-stone-700 leading-relaxed">
          <p>
            When I talk to friends visiting from overseas, the same questions come up: which
            border crossing is fastest, can I use my credit card, how does DiDi work, is the
            metro hard to figure out. The answers exist online but they&apos;re scattered,
            often outdated, and written by people who visited for three days.
          </p>
          <p>
            I figured it would be more useful to write down what I actually know: current,
            specific, and from someone who lives here. That&apos;s what this site is.
          </p>
        </div>
      </div>

      <div className="prose-content space-y-5 text-stone-700 leading-relaxed">
        <p>
          I write every article myself. If a recommendation links to an affiliate (eSIMs,
          hotels), it&apos;s flagged in the footer of every page. I only recommend things I&apos;d
          tell a friend to use. If something I&apos;ve written is outdated or wrong, I want to
          know. There&apos;s a contact form on every page and I read every message.
        </p>
      </div>

      <div className="mt-14 pt-10 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Link
          href="/guides"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors font-medium text-sm"
        >
          Read the guides →
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 hover:underline font-medium text-sm"
        >
          Get in touch
        </Link>
      </div>
    </div>
  )
}
