/**
 * The QR is generated at build time (scripts/qr.mjs) and always points at the
 * site root, so scanning it from a projected screen starts a fresh assessment.
 */
export const SITE_URL = 'https://dragonkorn.github.io/VARK/'

export default function QrCode({ size, className }: { size: number; className?: string }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}qr.svg`}
      alt={`QR code สำหรับเปิด ${SITE_URL}`}
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size, imageRendering: 'pixelated' }}
    />
  )
}
