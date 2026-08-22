/**
 * Generates the static OG images. Run locally with `npm run og`; the PNGs are
 * committed, so CI never needs fonts or sharp installed.
 *
 * Latin text only on purpose: sharp rasterises SVG text with whatever fonts the
 * machine has, and a missing Thai face would silently render as tofu. The Thai
 * wording lives in the og:title/og:description text instead.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const WIDTH = 1200
const HEIGHT = 630
const OUT = new URL('../public/og/', import.meta.url)

const COLORS = { V: '#d99a20', A: '#2a9d9a', R: '#4f46e5', K: '#e2596b' }
const LABELS = { V: 'Visual', A: 'Aural', R: 'Read/Write', K: 'Kinesthetic' }
const MODALITIES = ['V', 'A', 'R', 'K']

function escapeXml(value) {
  return value.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[c])
}

function card({ set, heading, sub }) {
  const tileWidth = 244
  const gap = 24
  const startX = (WIDTH - (tileWidth * 4 + gap * 3)) / 2

  const tiles = MODALITIES.map((m, i) => {
    const active = set.includes(m)
    const x = startX + i * (tileWidth + gap)
    return `
      <rect x="${x}" y="250" width="${tileWidth}" height="220" rx="28"
            fill="${active ? COLORS[m] : '#eceaf3'}"/>
      <text x="${x + tileWidth / 2}" y="372" text-anchor="middle" font-size="96" font-weight="700"
            fill="${active ? '#ffffff' : '#b9b5c9'}" font-family="Helvetica,Arial,sans-serif">${m}</text>
      <text x="${x + tileWidth / 2}" y="418" text-anchor="middle" font-size="24" font-weight="600"
            fill="${active ? '#ffffff' : '#b9b5c9'}" font-family="Helvetica,Arial,sans-serif">${LABELS[m]}</text>`
  }).join('')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
    <rect width="${WIDTH}" height="${HEIGHT}" fill="#ffffff"/>
    <rect width="${WIDTH}" height="10" fill="#4f46e5"/>
    <text x="80" y="120" font-size="40" font-weight="700" fill="#4f46e5"
          font-family="Helvetica,Arial,sans-serif">VARK</text>
    <text x="80" y="190" font-size="52" font-weight="700" fill="#1c1c28"
          font-family="Helvetica,Arial,sans-serif">${escapeXml(heading)}</text>
    ${tiles}
    <text x="80" y="560" font-size="28" fill="#8a86a0"
          font-family="Helvetica,Arial,sans-serif">${escapeXml(sub)}</text>
  </svg>`
}

const IMAGES = [
  ...MODALITIES.map((m) => ({
    file: `${m}.png`,
    svg: card({ set: [m], heading: `${LABELS[m]} learner`, sub: 'dragonkorn.github.io/VARK' }),
  })),
  {
    file: 'multimodal.png',
    svg: card({
      set: MODALITIES,
      heading: 'Multimodal learner',
      sub: 'dragonkorn.github.io/VARK',
    }),
  },
  {
    file: 'default.png',
    svg: card({
      set: MODALITIES,
      heading: 'Learning style assessment',
      sub: '16 questions · about 3 minutes',
    }),
  },
]

await mkdir(OUT, { recursive: true })
for (const { file, svg } of IMAGES) {
  const png = await sharp(Buffer.from(svg)).png().toBuffer()
  await writeFile(new URL(file, OUT), png)
  console.log('wrote public/og/' + file)
}
