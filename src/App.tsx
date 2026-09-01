import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Intro from './pages/Intro'
import Quiz from './pages/Quiz'
import Projector from './pages/Projector'
import Result from './pages/Result'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/quiz/:n" element={<Quiz />} />
        <Route path="/result/:key" element={<Result />} />
        <Route path="/share" element={<Projector />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
