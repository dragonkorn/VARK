/**
 * Post-build step. GitHub Pages serves static files only, so every result URL
 * gets its own HTML file with the right title and OG tags baked in — link
 * previews in LINE and Facebook never run our JavaScript.
 *
 * Copy is read from the same modalities.json the app uses, so the two cannot
 * drift apart.
 */
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'

const DIST = new URL('../dist/', import.meta.url)
const SITE = 'https://dragonkorn.github.io/vark'
const MODALITIES = ['V', 'A', 'R', 'K']

const copy = JSON.parse(
  await readFile(new URL('../src/data/modalities.json', import.meta.url), 'utf8'),
)

/** All 15 non-empty preference sets, in canonical V, A, R, K order. */
function allResultKeys() {
  const keys = []
  for (let mask = 1; mask < 1 << MODALITIES.length; mask++) {
    keys.push(MODALITIES.filter((_, i) => mask & (1 << i)).join(''))
  }
  return keys
}

function titleFor(key) {
  const set = key.split('')
  if (set.length === 1) return copy.modalities[set[0]].name
  return `${copy.multimodal.title} (${set.map((m) => copy.modalities[m].short).join(' + ')})`
}

function descriptionFor(key) {
  const set = key.split('')
  return set.length === 1 ? copy.modalities[set[0]].summary : copy.multimodal.summary
}

function imageFor(key) {
  return key.length === 1 ? `${SITE}/og/${key}.png` : `${SITE}/og/multimodal.png`
}

function escapeAttr(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

/** Swap the head tags of the built index.html for this result's values. */
function stamp(html, key) {
  const title = `${titleFor(key)} · แบบประเมิน VARK`
  const description = descriptionFor(key)
  const url = `${SITE}/result/${key}`
  const replacements = [
    [/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(title)}</title>`],
    [
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${escapeAttr(description)}" />`,
    ],
    [
      /<meta\s+property="og:title"[\s\S]*?\/>/,
      `<meta property="og:title" content="${escapeAttr(title)}" />`,
    ],
    [
      /<meta\s+property="og:description"[\s\S]*?\/>/,
      `<meta property="og:description" content="${escapeAttr(description)}" />`,
    ],
    [/<meta\s+property="og:url"[\s\S]*?\/>/, `<meta property="og:url" content="${url}" />`],
    [
      /<meta\s+property="og:image"[\s\S]*?\/>/,
      `<meta property="og:image" content="${imageFor(key)}" />`,
    ],
  ]

  return replacements.reduce((out, [pattern, value]) => {
    if (!pattern.test(out)) throw new Error(`prerender: no match for ${pattern} (key ${key})`)
    return out.replace(pattern, value)
  }, html)
}

const index = await readFile(new URL('index.html', DIST), 'utf8')

for (const key of allResultKeys()) {
  const dir = new URL(`result/${key}/`, DIST)
  await mkdir(dir, { recursive: true })
  await writeFile(new URL('index.html', dir), stamp(index, key))
}

// Deep links such as /vark/quiz/7 have no file on disk; Pages serves 404.html,
// which boots the same SPA and routes client-side.
await copyFile(new URL('index.html', DIST), new URL('404.html', DIST))

console.log(`prerendered ${allResultKeys().length} result pages + 404.html`)
