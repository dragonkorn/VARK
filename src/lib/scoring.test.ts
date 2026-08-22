import { describe, expect, it } from 'vitest'
import { QUESTIONS } from '../data/questions'
import {
  ALL_RESULT_KEYS,
  keyToSet,
  preferenceSet,
  resultKey,
  scoreAnswers,
  stepFor,
  tally,
  totalScore,
} from './scoring'
import { MODALITIES, type Answers, type Modality } from './types'

/** Pick the option matching `modality` for every question. */
function answerAll(modalities: Modality[]): Answers {
  const answers: Answers = {}
  for (const question of QUESTIONS) {
    answers[question.id] = modalities.map((m) =>
      question.options.findIndex((o) => o.modality === m),
    )
  }
  return answers
}

describe('question set', () => {
  it('has 16 questions with one option per modality', () => {
    expect(QUESTIONS).toHaveLength(16)
    for (const question of QUESTIONS) {
      expect(question.options.map((o) => o.modality).sort()).toEqual([...MODALITIES].sort())
    }
  })

  it('has unique ids', () => {
    expect(new Set(QUESTIONS.map((q) => q.id)).size).toBe(QUESTIONS.length)
  })
})

describe('tally', () => {
  it('counts every selected option', () => {
    expect(tally(answerAll(['V']))).toEqual({ V: 16, A: 0, R: 0, K: 0 })
    expect(tally(answerAll(['V', 'A']))).toEqual({ V: 16, A: 16, R: 0, K: 0 })
  })

  it('ignores unanswered questions', () => {
    expect(totalScore(tally({}))).toBe(0)
  })
})

describe('stepFor', () => {
  it('follows the published thresholds', () => {
    expect(stepFor(16)).toBe(1)
    expect(stepFor(17)).toBe(2)
    expect(stepFor(22)).toBe(2)
    expect(stepFor(23)).toBe(3)
    expect(stepFor(27)).toBe(3)
    expect(stepFor(28)).toBe(4)
  })
})

describe('preferenceSet', () => {
  it('returns a single modality for a clear winner', () => {
    expect(preferenceSet({ V: 10, A: 2, R: 2, K: 2 })).toEqual(['V'])
  })

  it('includes a runner-up within the stepping distance', () => {
    // total 16 -> step 1, so the 1-point gap keeps A in the set
    expect(resultKey(preferenceSet({ V: 7, A: 6, R: 2, K: 1 }))).toBe('VA')
  })

  it('stops at the first gap wider than the step', () => {
    // total 16 -> step 1; V-A gap is 1 (in), A-R gap is 3 (out)
    expect(resultKey(preferenceSet({ V: 7, A: 6, R: 3, K: 0 }))).toBe('VA')
  })

  it('returns all four when scores are flat', () => {
    expect(resultKey(preferenceSet({ V: 4, A: 4, R: 4, K: 4 }))).toBe('VARK')
  })

  it('treats an untouched questionnaire as multimodal rather than crashing', () => {
    expect(resultKey(preferenceSet({ V: 0, A: 0, R: 0, K: 0 }))).toBe('VARK')
  })

  it('widens the step for high totals so near-ties stay together', () => {
    // total 40 -> step 4; every gap is 3, so all four join
    expect(resultKey(preferenceSet({ V: 13, A: 10, R: 9, K: 8 }))).toBe('VARK')
  })
})

describe('resultKey', () => {
  it('always spells the set in V, A, R, K order', () => {
    expect(resultKey(['K', 'V'])).toBe('VK')
    expect(resultKey(['R', 'A', 'K', 'V'])).toBe('VARK')
  })
})

describe('keyToSet', () => {
  it('accepts every canonical key', () => {
    for (const key of ALL_RESULT_KEYS) {
      expect(keyToSet(key)).not.toBeNull()
    }
  })

  it('rejects junk, duplicates and non-canonical order', () => {
    expect(keyToSet('')).toBeNull()
    expect(keyToSet('X')).toBeNull()
    expect(keyToSet('VV')).toBeNull()
    expect(keyToSet('AV')).toBeNull()
    expect(keyToSet('VARKV')).toBeNull()
  })
})

describe('ALL_RESULT_KEYS', () => {
  it('lists exactly the 15 non-empty sets', () => {
    expect(ALL_RESULT_KEYS).toHaveLength(15)
    expect(new Set(ALL_RESULT_KEYS).size).toBe(15)
    expect(ALL_RESULT_KEYS).toContain('V')
    expect(ALL_RESULT_KEYS).toContain('VARK')
  })

  it('is reachable: every key is produced by some score vector', () => {
    const produced = new Set<string>()
    const values = [0, 1, 2, 3, 4, 8, 12, 16]
    for (const V of values)
      for (const A of values)
        for (const R of values)
          for (const K of values) {
            produced.add(resultKey(preferenceSet({ V, A, R, K })))
          }
    for (const key of ALL_RESULT_KEYS) {
      expect(produced).toContain(key)
    }
  })
})

describe('scoreAnswers', () => {
  it('scores a real answer sheet end to end', () => {
    const result = scoreAnswers(answerAll(['K']))
    expect(result.scores).toEqual({ V: 0, A: 0, R: 0, K: 16 })
    expect(result.key).toBe('K')
  })
})
