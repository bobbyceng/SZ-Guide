import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import test from 'node:test'
import { parseFrontmatter } from '../lib/frontmatter.mjs'

test('preserves quoted dates, booleans, lists and body separators', () => {
  const source = '---\ntitle: "Metro"\nupdated: "2026-10-15"\nfeatured: true\nquickSummary:\n  - "Use the same card"\n---\n\nBody\n---\nMore body\n'
  assert.deepEqual(parseFrontmatter(source), {
    data: { title: 'Metro', updated: '2026-10-15', featured: true, quickSummary: ['Use the same card'] },
    content: '\nBody\n---\nMore body\n',
  })
})

test('accepts BOM and CRLF without changing the article body', () => {
  assert.deepEqual(parseFrontmatter('\uFEFF---\r\ntitle: Metro\r\n---\r\nBody\r\n'), {
    data: { title: 'Metro' }, content: 'Body\r\n',
  })
})

test('rejects missing, malformed, duplicate or non-mapping metadata', () => {
  for (const source of ['Body only', '---\ntitle: [\n---\nBody', '---\ntitle: A\ntitle: B\n---\n', '---\n- item\n---\n']) {
    assert.throws(() => parseFrontmatter(source))
  }
})

test('rejects YAML aliases instead of expanding attacker-controlled references', () => {
  assert.throws(() => parseFrontmatter('---\na: &a [hello]\nb: [*a, *a]\n---\n'))
})

test('all published guides keep the metadata required by listing and article pages', () => {
  const directory = new URL('../content/guides/', import.meta.url)
  const names = readdirSync(directory).filter(name => !name.startsWith('.') && name.endsWith('.md'))
  assert.ok(names.length > 0)
  for (const name of names) {
    const { data, content } = parseFrontmatter(readFileSync(new URL(name, directory), 'utf8'))
    for (const key of ['title', 'description', 'date']) {
      assert.equal(typeof data[key], 'string', `${name}: ${key}`)
    }
    if (data.updated !== undefined) assert.equal(typeof data.updated, 'string', name)
    if (data.quickSummary !== undefined) assert.ok(Array.isArray(data.quickSummary), name)
    assert.ok(content.trim().length > 0, name)
  }
})
