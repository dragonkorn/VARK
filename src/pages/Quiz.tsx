import { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { QUESTIONS, displayOrder } from '../data/questions'
import { scoreAnswers } from '../lib/scoring'
import { saveScores } from '../lib/storage'
import { useAnswers } from '../lib/useAnswers'

export default function Quiz() {
  const { n } = useParams()
  const navigate = useNavigate()
  const { answers, toggle } = useAnswers()

  const index = Number(n) - 1
  const valid = Number.isInteger(index) && index >= 0 && index < QUESTIONS.length

  useEffect(() => {
    if (valid) window.scrollTo(0, 0)
  }, [valid, index])

  if (!valid) return <Navigate to="/" replace />

  const question = QUESTIONS[index]
  const selected = answers[question.id] ?? []
  const isLast = index === QUESTIONS.length - 1
  const progress = ((index + 1) / QUESTIONS.length) * 100

  function next() {
    if (isLast) {
      const { scores, key } = scoreAnswers(answers)
      saveScores(scores)
      navigate(`/result/${key}`)
      return
    }
    navigate(`/quiz/${index + 2}`)
  }

  function back() {
    if (index === 0) navigate('/')
    else navigate(`/quiz/${index}`)
  }

  return (
    <Layout>
      <div className="flex items-center justify-between text-xs text-black/50">
        <span>
          ข้อ {index + 1} จาก {QUESTIONS.length}
        </span>
        <span>เลือกได้มากกว่าหนึ่งข้อ</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-black/5">
        <div
          className="h-full rounded-full bg-brand transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <h1 className="mt-8 text-xl font-semibold leading-relaxed sm:text-2xl">{question.prompt}</h1>

      <ul className="mt-6 space-y-3">
        {displayOrder(question.id, question.options.length).map((optionIndex) => {
          const option = question.options[optionIndex]
          const checked = selected.includes(optionIndex)
          return (
            <li key={optionIndex}>
              <label
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                  checked
                    ? 'border-brand bg-brand-soft'
                    : 'border-black/10 bg-white hover:border-black/25'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(question.id, optionIndex)}
                  className="mt-1 size-4 shrink-0 accent-[var(--color-brand)]"
                />
                <span className="text-[15px] leading-relaxed">{option.text}</span>
              </label>
            </li>
          )
        })}
      </ul>

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          onClick={back}
          className="rounded-xl border border-black/15 px-5 py-3 text-sm font-medium text-black/60 transition hover:border-black/30"
        >
          ย้อนกลับ
        </button>
        <button
          onClick={next}
          className="rounded-xl bg-brand px-6 py-3 font-semibold text-white transition hover:opacity-90"
        >
          {isLast ? 'ดูผลลัพธ์' : 'ถัดไป'}
        </button>
      </div>

      {selected.length === 0 && (
        <p className="mt-3 text-right text-xs text-black/40">ข้อนี้ข้ามได้ถ้าไม่มีข้อไหนตรงกับคุณ</p>
      )}
    </Layout>
  )
}
