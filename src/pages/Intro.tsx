import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { QUESTIONS } from '../data/questions'
import { DISCLAIMER } from '../data/results'
import { answeredCount } from '../lib/storage'
import { useAnswers } from '../lib/useAnswers'

export default function Intro() {
  const navigate = useNavigate()
  const { answers, reset } = useAnswers()
  const done = answeredCount(answers)
  const hasProgress = done > 0 && done < QUESTIONS.length

  function start() {
    reset()
    navigate('/quiz/1')
  }

  function resume() {
    const nextUnanswered = QUESTIONS.findIndex((q) => (answers[q.id] ?? []).length === 0)
    navigate(`/quiz/${nextUnanswered === -1 ? 1 : nextUnanswered + 1}`)
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        คุณรับข้อมูลใหม่ได้ดีที่สุดในรูปแบบไหน
      </h1>
      <p className="mt-4 text-black/70 leading-relaxed">
        แบบประเมินนี้ใช้กรอบแนวคิด VARK แบ่งช่องทางการรับข้อมูลออกเป็น 4 แบบ ได้แก่ Visual (ภาพ),
        Aural (การฟัง), Read/Write (อ่านและเขียน) และ Kinesthetic (การลงมือทำ)
        คำถามทั้งหมดเป็นสถานการณ์ในที่ทำงานจริง
      </p>

      <dl className="mt-8 grid grid-cols-3 gap-3 text-center">
        {[
          ['16', 'ข้อ'],
          ['~3', 'นาที'],
          ['0', 'ข้อมูลที่ถูกเก็บ'],
        ].map(([value, label]) => (
          <div key={label} className="rounded-xl border border-black/5 bg-white p-4">
            <dt className="text-2xl font-bold text-brand">{value}</dt>
            <dd className="mt-1 text-xs text-black/50">{label}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 rounded-xl border border-black/5 bg-white p-5">
        <h2 className="text-sm font-semibold">ก่อนเริ่ม</h2>
        <ul className="mt-3 space-y-2 text-sm text-black/70">
          <li>· แต่ละข้อ เลือกได้มากกว่าหนึ่งคำตอบ ถ้าตรงกับคุณหลายข้อ</li>
          <li>· ถ้าไม่มีข้อไหนตรงเลย ข้ามได้</li>
          <li>· ตอบตามที่ทำจริง ไม่ใช่ตามที่คิดว่าควรทำ</li>
        </ul>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          onClick={start}
          className="rounded-xl bg-brand px-6 py-3 font-semibold text-white transition hover:opacity-90"
        >
          {hasProgress ? 'เริ่มใหม่ตั้งแต่ต้น' : 'เริ่มทำแบบประเมิน'}
        </button>
        {hasProgress && (
          <button
            onClick={resume}
            className="rounded-xl border border-brand px-6 py-3 font-semibold text-brand transition hover:bg-brand-soft"
          >
            ทำต่อจากข้อที่ค้างไว้ ({done}/{QUESTIONS.length})
          </button>
        )}
      </div>

      <p className="mt-10 text-xs leading-relaxed text-black/45">{DISCLAIMER}</p>
    </Layout>
  )
}
