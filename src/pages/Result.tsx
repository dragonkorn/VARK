import { useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { toBlob } from 'html-to-image'
import Layout from '../components/Layout'
import ScoreBars from '../components/ScoreBars'
import ShareCard, { SHARE_CARD_SIZE } from '../components/ShareCard'
import { DISCLAIMER, MODALITY_BLOCKS, MULTIMODAL_INTRO, resultTitle } from '../data/results'
import { keyToSet } from '../lib/scoring'
import { clearAll, loadScores } from '../lib/storage'
import { totalScore } from '../lib/scoring'

type ShareState = 'idle' | 'working' | 'downloaded' | 'copied' | 'error'

export default function Result() {
  const { key = '' } = useParams()
  const navigate = useNavigate()
  const cardRef = useRef<HTMLDivElement>(null)
  const [shareState, setShareState] = useState<ShareState>('idle')
  const [scores] = useState(() => loadScores())

  const set = keyToSet(key)
  if (!set) return <Navigate to="/" replace />

  const single = set.length === 1
  const hasScores = scores !== null && totalScore(scores) > 0
  const shareUrl = window.location.href

  async function renderCard(): Promise<Blob | null> {
    if (!cardRef.current) return null
    return toBlob(cardRef.current, {
      width: SHARE_CARD_SIZE,
      height: SHARE_CARD_SIZE,
      pixelRatio: 1,
      backgroundColor: '#ffffff',
      cacheBust: true,
    })
  }

  async function shareImage() {
    setShareState('working')
    try {
      const blob = await renderCard()
      if (!blob) throw new Error('render failed')
      const file = new File([blob], `vark-${key}.png`, { type: 'image/png' })

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'ผลแบบประเมิน VARK ของฉัน',
          text: resultTitle(key),
        })
        setShareState('idle')
        return
      }

      // Desktop browsers mostly cannot share files; hand over a PNG instead.
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `vark-${key}.png`
      link.click()
      URL.revokeObjectURL(url)
      setShareState('downloaded')
    } catch (error) {
      // A user dismissing the native share sheet is not a failure worth shouting about.
      if (error instanceof DOMException && error.name === 'AbortError') {
        setShareState('idle')
        return
      }
      setShareState('error')
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setShareState('copied')
    } catch {
      setShareState('error')
    }
  }

  function retake() {
    clearAll()
    navigate('/quiz/1')
  }

  return (
    <Layout>
      <p className="text-sm text-black/50">ผลลัพธ์ของคุณ</p>
      <h1 className="mt-2 text-3xl font-bold leading-snug tracking-tight sm:text-4xl">
        {resultTitle(key)}
      </h1>

      <div className="mt-6 flex gap-2">
        {set.map((m) => (
          <span
            key={m}
            className="rounded-lg px-3 py-1.5 text-sm font-semibold text-white"
            style={{ backgroundColor: MODALITY_BLOCKS[m].colorVar }}
          >
            {m} · {MODALITY_BLOCKS[m].short}
          </span>
        ))}
      </div>

      <p className="mt-6 leading-relaxed text-black/75">
        {single ? MODALITY_BLOCKS[set[0]].summary : MULTIMODAL_INTRO.summary}
      </p>
      {!single && <p className="mt-3 text-sm text-black/55">{MULTIMODAL_INTRO.note}</p>}

      {hasScores && (
        <section className="mt-8 rounded-xl border border-black/5 bg-white p-5">
          <h2 className="text-sm font-semibold">คะแนนแต่ละช่องทาง</h2>
          <div className="mt-4">
            <ScoreBars scores={scores} highlight={set} />
          </div>
        </section>
      )}

      {set.map((m) => {
        const block = MODALITY_BLOCKS[m]
        return (
          <section key={m} className="mt-6 rounded-xl border border-black/5 bg-white p-5">
            <h2 className="flex items-center gap-2 text-base font-semibold">
              <span
                className="inline-flex size-7 items-center justify-center rounded-lg text-sm font-bold text-white"
                style={{ backgroundColor: block.colorVar }}
              >
                {m}
              </span>
              แนวทางสำหรับ {block.short}
            </h2>
            {!single && <p className="mt-3 text-sm leading-relaxed text-black/65">{block.summary}</p>}
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-black/75">
              {block.tips.map((tip) => (
                <li key={tip} className="flex gap-2">
                  <span style={{ color: block.colorVar }}>·</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>
        )
      })}

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          onClick={shareImage}
          disabled={shareState === 'working'}
          className="rounded-xl bg-brand px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {shareState === 'working' ? 'กำลังสร้างรูป…' : 'แชร์เป็นรูปภาพ'}
        </button>
        <button
          onClick={copyLink}
          className="rounded-xl border border-brand px-6 py-3 font-semibold text-brand transition hover:bg-brand-soft"
        >
          คัดลอกลิงก์
        </button>
        <button
          onClick={retake}
          className="rounded-xl border border-black/15 px-6 py-3 font-medium text-black/60 transition hover:border-black/30"
        >
          ทำใหม่อีกครั้ง
        </button>
      </div>

      <p className="mt-3 text-xs text-black/45">
        {shareState === 'downloaded' && 'บันทึกรูปแล้ว เปิดจากโฟลเดอร์ดาวน์โหลดแล้วส่งเข้า LINE ได้เลย'}
        {shareState === 'copied' && 'คัดลอกลิงก์แล้ว'}
        {shareState === 'error' && 'ทำรายการไม่สำเร็จ ลองอีกครั้ง'}
        {shareState === 'idle' &&
          'บนมือถือจะเปิดเมนูแชร์ของเครื่องให้ส่งเข้า LINE ได้โดยตรง บนคอมพิวเตอร์จะบันทึกเป็นไฟล์รูปแทน'}
      </p>

      {!hasScores && (
        <p className="mt-6 text-sm text-black/55">
          คุณเปิดหน้านี้จากลิงก์ที่แชร์มา จึงไม่มีคะแนนรายช่องทางแสดง{' '}
          <Link to="/" className="font-semibold text-brand underline">
            ทำแบบประเมินของตัวเอง
          </Link>
        </p>
      )}

      <p className="mt-10 text-xs leading-relaxed text-black/45">{DISCLAIMER}</p>

      <div style={{ position: 'fixed', top: -20000, left: -20000, pointerEvents: 'none' }} aria-hidden>
        <ShareCard ref={cardRef} set={set} />
      </div>
    </Layout>
  )
}
