import type { Metadata } from 'next'

// The contact page itself is a client component and cannot export metadata,
// so it lives here. Without this the page inherits the root canonical and
// tells Google it is a duplicate of the homepage.
export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch about Shenzhen Guide, corrections, questions, or partnership enquiries.',
  alternates: { canonical: 'https://www.shenzhen-guide.com/contact' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
