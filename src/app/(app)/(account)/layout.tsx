import { RenderParams } from '@/components/RenderParams'
import type { ReactNode } from 'react'

export default async function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7f4ee]">
      <div className="container mx-auto px-6 pt-28 lg:px-10">
        <RenderParams className="text-neutral-600" />
      </div>

      <div className="container mx-auto px-6 pb-24 lg:px-10">
        <main className="max-w-full overflow-hidden">{children}</main>
      </div>
    </div>
  )
}