import copy from './modalities.json'
import { MODALITIES, type Modality, type ResultKey } from '../lib/types'

export type ModalityBlock = {
  code: Modality
  /** Plain VARK label, no mascots. */
  name: string
  short: string
  english: string
  colorVar: string
  summary: string
  tips: string[]
}

/**
 * Copy lives in modalities.json because the prerender script needs the same
 * strings to build per-result OG tags, and it runs outside the TypeScript build.
 */
export const MODALITY_BLOCKS: Record<Modality, ModalityBlock> = MODALITIES.reduce(
  (blocks, code) => {
    const { color, ...rest } = copy.modalities[code]
    blocks[code] = { code, colorVar: color, ...rest }
    return blocks
  },
  {} as Record<Modality, ModalityBlock>,
)

export const MULTIMODAL_INTRO = copy.multimodal
export const DISCLAIMER = copy.disclaimer

export function resultTitle(key: ResultKey): string {
  const set = key.split('') as Modality[]
  if (set.length === 1) return MODALITY_BLOCKS[set[0]].name
  return `${MULTIMODAL_INTRO.title} (${set.map((m) => MODALITY_BLOCKS[m].short).join(' + ')})`
}

export function resultDescription(key: ResultKey): string {
  const set = key.split('') as Modality[]
  if (set.length === 1) return MODALITY_BLOCKS[set[0]].summary
  return MULTIMODAL_INTRO.summary
}
