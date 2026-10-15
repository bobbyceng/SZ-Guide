import { parse } from 'yaml'

/** Parse the YAML header of a repository-authored guide without executable engines.
 * @param {string} source
 * @returns {{ data: Record<string, unknown>, content: string }}
 */
export function parseFrontmatter(source) {
  const header = /^\uFEFF?---[\t ]*\r?\n([\s\S]*?)\r?\n---[\t ]*(?:\r?\n|$)/.exec(source)
  if (!header) throw new Error('Guide must start with a YAML frontmatter block')

  const data = parse(header[1], { maxAliasCount: 0 })
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Guide frontmatter must be a YAML mapping')
  }

  return { data, content: source.slice(header[0].length) }
}
