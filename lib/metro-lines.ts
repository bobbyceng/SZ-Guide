/**
 * Shenzhen Metro line colours.
 *
 * Source: zh.wikipedia.org Template:深圳地铁颜色, cross-checked against the
 * official SZMC system map legend.
 *
 * Caveat worth keeping in mind: the official standard specifies Pantone values,
 * not hex. Converting Pantone to RGB has no single correct answer, so these are
 * the widely-used approximations rather than an authoritative spec. They are
 * close enough that a reader matches them to the signage, which is the point.
 */
export const LINE_COLORS: Record<string, string> = {
  '1': '#00ab39',  '2': '#db6d1c',  '3': '#00a2e1',  '4': '#dc241f',
  '5': '#9950b2',  '6': '#3abca8',  '7': '#0035ad',  '8': '#db6d1c',
  '9': '#846e74',  '10': '#f8779e', '11': '#6a1d44', '12': '#a192b2',
  '13': '#de7c00', '14': '#f2c75c', '16': '#1e22aa', '20': '#88dbdf',
}

/**
 * Wraps the line numbers in "Line 4", "Line 2/8", "Lines 1, 5 and 11" in chips
 * carrying that line's real colour, so the page matches what the reader sees on
 * station signage.
 *
 * Handles a list of any length and keeps the original separators, so the
 * sentence still reads normally. Only fires on the exact pattern
 * "Line(s) <numbers>" — prose that merely contains the word "line" is
 * untouched. If any number in the run is not a line we know, the whole match is
 * left alone rather than half-annotated.
 */
export function annotateMetroLines(html: string): string {
  return html.replace(
    /\bLines?\s+(\d{1,2}(?:\s*(?:[,/&]|and)\s*\d{1,2})*)/g,
    (match, seq: string) => {
      const numbers = seq.match(/\d{1,2}/g) ?? []
      if (numbers.some((n) => !LINE_COLORS[n])) return match

      const label = match.startsWith('Lines') ? 'Lines' : 'Line'
      const annotated = seq.replace(
        /\d{1,2}/g,
        (n) => `<span class="metro-line" style="--line:${LINE_COLORS[n]}">${n}</span>`
      )
      return `${label} ${annotated}`
    }
  )
}
