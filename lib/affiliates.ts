// Affiliate destination URLs, kept in one place so tracked links can be
// swapped in without touching pages.
//
// Status, verified in Travelpayouts on 2026-10-04 (project 564243):
//   Klook   — LIVE via Travelpayouts (marker 766893), lands on Shenzhen search
//   Saily   — tracked China plans, SubID szg_site_saily; first bookings only.
//   Airalo  — available via Travelpayouts despite the earlier direct Impact
//             rejection. SubID szg_payment_airalo; web purchases only.
//   Nomad   — creator programme status unverified. Bare link for now.
//   Booking — programme status unverified. Bare link.
//
// Article-specific SubIDs live in the eSIM guide. See MONETIZATION-EXPERIMENT.md.
// A bare link earns nothing but is still a real recommendation, so it stays.
// Anything listed here must be something we'd link to regardless of payout.
export const AFFILIATE = {
  nomad: 'https://www.getnomad.app',
  saily: 'https://saily.tpm.li/aOtfZGhF',
  airalo: 'https://airalo.tpm.li/DnYqRNx8',
  klook: 'https://klook.tpm.li/n4ZpJqIc',
  booking: 'https://www.booking.com',
  bookingShenzhen: 'https://www.booking.com/city/cn/shenzhen.html',
}
