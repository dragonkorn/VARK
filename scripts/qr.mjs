/**
 * Generates the static QR code for the site URL. The URL never changes, so this
 * runs once at build time and ships as a plain SVG — no QR library in the app
 * bundle, and nothing to render on the client.
 */
import { writeFile } from 'node:fs/promises'
import QRCode from 'qrcode'

const URL_TO_ENCODE = 'https://dragonkorn.github.io/VARK/'
const OUT = new URL('../public/qr.svg', import.meta.url)

const svg = await QRCode.toString(URL_TO_ENCODE, {
  type: 'svg',
  margin: 1,
  errorCorrectionLevel: 'M',
  color: { dark: '#1c1c28', light: '#ffffff' },
})

await writeFile(OUT, svg)
console.log(`wrote public/qr.svg for ${URL_TO_ENCODE}`)
