import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { Analytics } from '@vercel/analytics/next'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Shenzhen Guide – Insider Travel Guide for Foreigners',
    template: '%s | Shenzhen Guide',
  },
  description:
    'Practical guides for foreigners visiting Shenzhen. Border crossings, Huaqiangbei electronics, payment setup, eSIM, and more, written by a local.',
  keywords: ['shenzhen travel guide', 'shenzhen for foreigners', 'hong kong to shenzhen', 'huaqiangbei guide', 'shenzhen guide'],
  metadataBase: new URL('https://www.shenzhen-guide.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Shenzhen Guide',
    url: 'https://www.shenzhen-guide.com',
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    canonical: 'https://www.shenzhen-guide.com',
  },
  verification: {
    google: 'w6qWZooeGxEFMPx4vOk186m-8UjlQpQBJ6jKGTQFtaw',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`antialiased ${playfair.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body
        className="min-h-screen flex flex-col"
        style={{ fontFamily: 'var(--font-body), system-ui, sans-serif' }}
      >
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        {/*
          Travelpayouts Drive. Required to get past their onboarding gate before
          you can join affiliate programmes; it is not otherwise needed, since
          tracking links live in lib/affiliates.ts.

          Loaded with afterInteractive rather than the raw <script> tag they
          hand out, so it stays off the critical rendering path.

          IMPORTANT: keep "Keyword Linking" and auto-optimisation DISABLED in
          the Travelpayouts dashboard. Those features inject affiliate links
          into article text automatically, which would contradict the editorial
          promise on /about and bypass our rel="sponsored" handling.

          To remove: delete this block and the next/script import.
        */}
        <Script
          id="travelpayouts-drive"
          src="https://emrldtp.com/NTY0MjQz.js?t=564243"
          strategy="afterInteractive"
          data-cmp-ab="2"
        />
      </body>
    </html>
  )
}
