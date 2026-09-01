import { forwardRef } from 'react'
import { MODALITY_BLOCKS, resultTitle } from '../data/results'
import QrCode from './QrCode'
import { MODALITIES, type Modality } from '../lib/types'

export const SHARE_CARD_SIZE = 1080

/**
 * Rendered off-screen at full 1080x1080 so html-to-image captures it at the
 * exact size we want to post to LINE, with no upscaling.
 */
const ShareCard = forwardRef<HTMLDivElement, { set: Modality[] }>(function ShareCard({ set }, ref) {
  const key = set.join('')
  const single = set.length === 1

  return (
    <div
      ref={ref}
      style={{
        width: SHARE_CARD_SIZE,
        height: SHARE_CARD_SIZE,
        backgroundColor: '#ffffff',
        padding: 80,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: '"Noto Sans Thai", sans-serif',
        color: '#1c1c28',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
        <span style={{ fontSize: 40, fontWeight: 700, color: 'oklch(0.51 0.19 275)' }}>VARK</span>
        <span style={{ fontSize: 26, color: 'rgba(0,0,0,0.45)' }}>แบบประเมินสไตล์การเรียนรู้</span>
      </div>

      <div style={{ display: 'flex', gap: 20 }}>
        {MODALITIES.map((m) => {
          const inSet = set.includes(m)
          const block = MODALITY_BLOCKS[m]
          return (
            <div
              key={m}
              style={{
                flex: 1,
                height: 240,
                borderRadius: 32,
                backgroundColor: inSet ? block.colorVar : 'rgba(0,0,0,0.04)',
                color: inSet ? '#ffffff' : 'rgba(0,0,0,0.25)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <span style={{ fontSize: 96, fontWeight: 700, lineHeight: 1 }}>{m}</span>
              <span style={{ fontSize: 22, fontWeight: 600 }}>{block.english}</span>
            </div>
          )
        })}
      </div>

      <div>
        <p style={{ margin: 0, fontSize: 30, color: 'rgba(0,0,0,0.45)' }}>
          {single ? 'สไตล์การเรียนรู้ของฉันคือ' : 'ผลลัพธ์ของฉัน'}
        </p>
        <p style={{ margin: '12px 0 0', fontSize: 58, fontWeight: 700, lineHeight: 1.3 }}>
          {resultTitle(key)}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32 }}>
        <p style={{ margin: 0, fontSize: 26, color: 'rgba(0,0,0,0.4)', maxWidth: 620 }}>
          สแกนเพื่อทำแบบประเมินของคุณเอง
          <br />
          dragonkorn.github.io/VARK
        </p>
        <QrCode size={150} />
      </div>
    </div>
  )
})

export default ShareCard
