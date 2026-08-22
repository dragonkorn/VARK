import { useCallback, useEffect, useState } from 'react'
import type { Answers } from './types'
import { loadAnswers, saveAnswers } from './storage'

/** Answer sheet backed by localStorage so a refresh does not lose progress. */
export function useAnswers() {
  const [answers, setAnswers] = useState<Answers>(() => loadAnswers() ?? {})

  useEffect(() => {
    saveAnswers(answers)
  }, [answers])

  const toggle = useCallback((questionId: number, optionIndex: number) => {
    setAnswers((prev) => {
      const selected = prev[questionId] ?? []
      const next = selected.includes(optionIndex)
        ? selected.filter((i) => i !== optionIndex)
        : [...selected, optionIndex]
      return { ...prev, [questionId]: next }
    })
  }, [])

  const reset = useCallback(() => setAnswers({}), [])

  return { answers, toggle, reset, setAnswers }
}
