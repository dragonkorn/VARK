import { MODALITY_BLOCKS } from '../data/results'
import { MODALITIES, type Modality, type Scores } from '../lib/types'

export default function ScoreBars({
  scores,
  highlight,
}: {
  scores: Scores
  highlight: Modality[]
}) {
  const max = Math.max(1, ...MODALITIES.map((m) => scores[m]))

  return (
    <ul className="space-y-3">
      {MODALITIES.map((m) => {
        const block = MODALITY_BLOCKS[m]
        const inSet = highlight.includes(m)
        return (
          <li key={m} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-sm font-semibold" style={{ color: block.colorVar }}>
              {block.short}
            </span>
            <span className="h-3 flex-1 overflow-hidden rounded-full bg-black/5">
              <span
                className="block h-full rounded-full transition-[width] duration-500"
                style={{
                  width: `${(scores[m] / max) * 100}%`,
                  backgroundColor: block.colorVar,
                  opacity: inSet ? 1 : 0.35,
                }}
              />
            </span>
            <span className="w-8 shrink-0 text-right text-sm tabular-nums text-black/60">
              {scores[m]}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
