import type { Answers, Scores } from './types'

const ANSWERS_KEY = 'vark:answers:v1'
const SCORES_KEY = 'vark:scores:v1'

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Private mode or a full quota. Progress is a convenience, not a requirement.
  }
}

export function loadAnswers(): Answers | null {
  return read<Answers>(ANSWERS_KEY)
}

export function saveAnswers(answers: Answers) {
  write(ANSWERS_KEY, answers)
}

export function loadScores(): Scores | null {
  return read<Scores>(SCORES_KEY)
}

export function saveScores(scores: Scores) {
  write(SCORES_KEY, scores)
}

export function clearAll() {
  try {
    localStorage.removeItem(ANSWERS_KEY)
    localStorage.removeItem(SCORES_KEY)
  } catch {
    // ignore
  }
}

export function answeredCount(answers: Answers): number {
  return Object.values(answers).filter((selected) => selected.length > 0).length
}
