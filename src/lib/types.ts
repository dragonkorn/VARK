export const MODALITIES = ['V', 'A', 'R', 'K'] as const

export type Modality = (typeof MODALITIES)[number]

/** Canonical key for a preference set, e.g. "V", "VA", "VARK". */
export type ResultKey = string

export type Option = {
  modality: Modality
  text: string
}

export type Question = {
  id: number
  prompt: string
  options: Option[]
}

/** Index of the selected options for each question, keyed by question id. */
export type Answers = Record<number, number[]>

export type Scores = Record<Modality, number>
