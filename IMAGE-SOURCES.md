# Image sources and visual review — 2026-10-09

## Newly added photographs

### Futian night skyline

- File: `public/images/home/futian-night-cai-fang.webp`
- Photographer: Cai Fang; published 27 June 2024.
- Source: https://unsplash.com/photos/a-city-skyline-with-skyscrapers-lit-up-at-night-qpFEUCV-xmI
- Original image endpoint: https://images.unsplash.com/photo-1719482029770-6d97f4bdeb06
- Source page explicitly identifies Futian, Shenzhen and marks this image free under the Unsplash License.
- License checked 2026-10-09: https://unsplash.com/license
- Processing: resized to 1600 × 2415, WebP compression; responsive presentation crops the view. No scene changes.
- Use: homepage city atmosphere with visible photographer/source credit. It is not a photograph of the APEC venue or proof of event-week conditions.

### Huaqiangbei pedestrian street

- File: `public/images/guides/huaqiangbei/walking-street-cc0.webp`
- Subject: Huaqiangbei pedestrian street, Shenzhen.
- Photographer: Mx. Granger; photographed 27 February 2019.
- Source: https://commons.wikimedia.org/wiki/File:Huaqiangbei_walking_street.jpg
- Original: https://upload.wikimedia.org/wikipedia/commons/6/67/Huaqiangbei_walking_street.jpg
- License checked 2026-10-09: CC0 1.0, https://creativecommons.org/publicdomain/zero/1.0/
- Processing: resized to 1400 × 1050, WebP compression. No scene changes.
- Use: Huaqiangbei article cover and listing card. Article caption identifies the date and notes that shops/signs may have changed. This photo does not establish current stock, prices or directions.
- Attribution is retained even though CC0 does not require it. No payment, login or third-party permission request was made.

## Existing images used in this iteration

- `public/images/guides/metro/01-intl-card-reader.jpg`: existing photo credited in the article to the author, September 2026. Original pixels retained unchanged; two numbered HTML markers and a legend identify the visible card logos and tap target. No screen text or device details were fabricated.
- Removed the eSIM buying illustration from the article: it displayed specific data packages and prices that should not be mistaken for current offers. The source file remains in the repository.
- Other existing photographs and illustrations have not had their provenance comprehensively audited in this iteration.

## Useful future first-hand material

These are optional additions, not blockers for this release. Avoid faces, passports, payment codes, bank details and active bookings.

1. A wide view of a metro gate row showing where the international-card readers are, paired with a close-up. Existing close-up is sufficient for the current page.
2. Line 11 business-carriage entrance and its second barrier, if taking that route anyway. Stock photography cannot verify the current boarding procedure.
3. Shenzhen Airport ride-hailing signs and the route to a pickup zone; record date and exact location. Avoid implying one bay applies to every booking.
4. New Huanggang crossing signs and the actual route after an officially confirmed opening. Do not label older checkpoint photos as the new building.

## Review scope

- Reusable article contents links are derived from the Markdown heading tree, with unique anchors, without browser JavaScript.
- Quick summaries are editorial extracts from existing articles, not a complete fresh audit of their policy or product claims.
- APEC official homepage checked 2026-10-09: https://www.apec.org/ lists Shenzhen and 18–19 November 2026. This check does not confirm road closures, attendee access or live registration status.
- Visual improvements are not evidence of increased search traffic, affiliate conversions or revenue. Compare those separately using the existing experiment records.

## Local verification results

- Production build and TypeScript validation passed; changed TypeScript files passed ESLint with no errors or warnings.
- All 15 generated guide pages checked: 131 contents destinations resolve to unique IDs; all nine links in `MONETIZATION-EXPERIMENT.md` remain present with sponsored attributes.
- Browser checked at 390 × 844 and 1440 × 1000: homepage photos load, no horizontal document overflow; metro contents navigation lands the heading below the sticky navigation; photo markers match the visible logos and tap area.
- Huaqiangbei photo source, date and license are visible in the article caption. The original photo is 2019, not a claim about 2026 shopfronts.
- Homepage uses one responsive image element, avoiding simultaneous hidden desktop/mobile image requests.
- This is local verification only. No production deployment or fresh affiliate report was checked in this iteration.
