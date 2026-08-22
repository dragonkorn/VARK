import { MODALITIES, type Answers, type Modality, type ResultKey, type Scores } from './types'
import { QUESTIONS } from '../data/questions'

/**
 * Stepping distance thresholds, as published with the VARK questionnaire.
 * The instrument here is original, but the table is calibrated for exactly this
 * shape (16 questions x 4 options, multi-select), so it transfers. Tune here.
 */
export const STEP_TABLE: { maxTotal: number; step: number }[] = [
  { maxTotal: 16, step: 1 },
  { maxTotal: 22, step: 2 },
  { maxTotal: 27, step: 3 },
  { maxTotal: Infinity, step: 4 },
]

export function emptyScores(): Scores {
  return { V: 0, A: 0, R: 0, K: 0 }
}

export function tally(answers: Answers): Scores {
  const scores = emptyScores()
  for (const question of QUESTIONS) {
    for (const optionIndex of answers[question.id] ?? []) {
      const option = question.options[optionIndex]
      if (option) scores[option.modality] += 1
    }
  }
  return scores
}

export function totalScore(scores: Scores): number {
  return MODALITIES.reduce((sum, m) => sum + scores[m], 0)
}

export function stepFor(total: number): number {
  return STEP_TABLE.find((row) => total <= row.maxTotal)!.step
}

/**
 * Walk the scores from highest down. A modality joins the preference set while
 * its gap to the previous one is within the stepping distance; the first gap
 * wider than the step ends the set.
 */
export function preferenceSet(scores: Scores): Modality[] {
  const total = totalScore(scores)
  if (total === 0) return [...MODALITIES]

  const step = stepFor(total)
  const ranked = [...MODALITIES].sort((a, b) => scores[b] - scores[a])

  const set: Modality[] = [ranked[0]]
  for (let i = 1; i < ranked.length; i++) {
    const gap = scores[ranked[i - 1]] - scores[ranked[i]]
    if (gap > step) break
    set.push(ranked[i])
  }
  return set
}

/** Preference set as a canonical key in V, A, R, K order, e.g. "VA", "ARK". */
export function resultKey(set: Modality[]): ResultKey {
  return MODALITIES.filter((m) => set.includes(m)).join('')
}

export function keyToSet(key: string): Modality[] | null {
  const set = key.split('') as Modality[]
  const valid =
    set.length > 0 &&
    set.length <= MODALITIES.length &&
    new Set(set).size === set.length &&
    set.every((m) => (MODALITIES as readonly string[]).includes(m))
  if (!valid) return null
  // Reject out-of-order or otherwise non-canonical spellings such as "AV".
  return resultKey(set) === key ? (MODALITIES.filter((m) => set.includes(m)) as Modality[]) : null
}

export function scoreAnswers(answers: Answers): { scores: Scores; set: Modality[]; key: ResultKey } {
  const scores = tally(answers)
  const set = preferenceSet(scores)
  return { scores, set, key: resultKey(set) }
}

/** All 15 non-empty preference sets, used by the prerender step. */
export const ALL_RESULT_KEYS: ResultKey[] = (() => {
  const keys: ResultKey[] = []
  for (let mask = 1; mask < 1 << MODALITIES.length; mask++) {
    keys.push(MODALITIES.filter((_, i) => mask & (1 << i)).join(''))
  }
  return keys
})()
