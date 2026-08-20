// Affiliate destination URLs, kept in one place so tracked links can be
// swapped in without touching pages.
//
// Status, last updated 2026-08-20:
//   Klook   — LIVE via Travelpayouts (marker 766893), lands on Shenzhen search
//   Nomad   — creator programme applied for, awaiting reply. Bare link for now.
//   Airalo  — declined by Impact (traffic threshold). Bare link. Retry when
//             traffic supports it; do not reapply in the meantime.
//   Booking — no approved programme yet. Bare link.
//
// A bare link earns nothing but is still a real recommendation, so it stays.
// Anything listed here must be something we'd link to regardless of payout.
export const AFFILIATE = {
  nomad: 'https://www.getnomad.app',
  airalo: 'https://www.airalo.com',
  klook: 'https://klook.tpm.li/n4ZpJqIc',
  booking: 'https://www.booking.com',
  bookingShenzhen: 'https://www.booking.com/city/cn/shenzhen.html',
}
