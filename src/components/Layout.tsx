import type { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto w-full max-w-3xl px-5 py-4 flex items-baseline gap-3">
          <span className="text-lg font-bold tracking-tight text-brand">VARK</span>
          <span className="text-sm text-black/50">แบบประเมินสไตล์การเรียนรู้</span>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-8">{children}</main>
      <footer className="mx-auto w-full max-w-3xl px-5 py-6 text-xs text-black/40">
        ไม่มีการเก็บข้อมูลผู้ทำแบบประเมิน
      </footer>
    </div>
  )
}
