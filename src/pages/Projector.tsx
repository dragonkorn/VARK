import { Link } from 'react-router-dom'
import QrCode, { SITE_URL } from '../components/QrCode'

/**
 * Full-screen QR for the front of a training room. No header, no footer, no
 * scrolling — the whole viewport is the thing people scan from their seats.
 */
export default function Projector() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-white px-6 py-10 text-center">
      <div>
        <p className="text-xl font-semibold text-brand sm:text-2xl">แบบประเมินสไตล์การเรียนรู้ VARK</p>
        <p className="mt-3 text-black/60 sm:text-lg">สแกนเพื่อทำแบบประเมิน · 16 ข้อ ประมาณ 3 นาที</p>
      </div>

      <div className="rounded-3xl border border-black/10 p-5 shadow-sm">
        <QrCode size={360} className="max-w-[70vw]" />
      </div>

      <p className="text-sm text-black/50 sm:text-base">{SITE_URL}</p>

      <Link to="/" className="text-sm font-semibold text-brand underline">
        กลับหน้าแรก
      </Link>
    </div>
  )
}
