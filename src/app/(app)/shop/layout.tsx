import { Categories } from '@/components/layout/search/Categories'
import { Search } from '@/components/Search'
import Link from 'next/link'
import React, { Suspense } from 'react'

function SummerIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.35">
      <circle cx="12" cy="12" r="4.1" />
      <path d="M12 2.8v3M12 18.2v3M21.2 12h-3M5.8 12h-3M18.5 5.5l-2.1 2.1M7.6 16.4l-2.1 2.1M18.5 18.5l-2.1-2.1M7.6 7.6 5.5 5.5" />
    </svg>
  )
}

function AutumnIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.35">
      <path d="M12.5 3.6c3.7 2.1 6 5.2 6 8.8 0 4-2.9 7.1-6.8 7.1-3.6 0-6.1-2.6-6.1-5.9 0-3.4 2.3-6.4 6.9-10Z" />
      <path d="M12 8.5c.3 3.6-.6 7-2.3 10" />
    </svg>
  )
}

function WinterIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.35">
      <path d="M12 2.8v18.4M4.8 7l14.4 10M19.2 7 4.8 17M7.2 4.8 12 12l4.8-7.2M7.2 19.2 12 12l4.8 7.2" />
    </svg>
  )
}

function SpringIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.35">
      <path d="M12 20.4V10.3" />
      <path d="M12 10.3c0-3.7 2.1-6.2 6-7-.1 3.8-2 6.3-6 7Z" />
      <path d="M12 13.1c-.2-3.2-2.1-5.3-6-5.9.2 3.6 2.1 5.7 6 5.9Z" />
    </svg>
  )
}

const occasions = [
  { label: 'SUMMER', href: '/shop?season=summer', icon: <SummerIcon /> },
  { label: 'AUTUMN', href: '/shop?season=autumn', icon: <AutumnIcon /> },
  { label: 'WINTER', href: '/shop?season=winter', icon: <WinterIcon /> },
  { label: 'SPRING', href: '/shop?season=spring', icon: <SpringIcon /> },
]

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <div className="mx-auto max-w-[1560px] px-6 py-12 md:px-10 md:py-14">
        <div className="mb-10 border-b border-neutral-200 pb-8">
          <Search className="mb-0" />
        </div>

        <div className="grid gap-14 xl:grid-cols-[240px_minmax(0,1fr)] xl:gap-20">
          <aside className="xl:pt-2">
            <div className="xl:sticky xl:top-28">
              <div className="space-y-12">
                <div>
                  <Categories />
                </div>

                <div>
                  <p className="mb-5 text-[10px] uppercase tracking-[0.38em] text-neutral-400">
                    Occasions
                  </p>

                  <div className="space-y-3">
                    {occasions.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="group flex items-center gap-3 rounded-[14px] border border-transparent px-3 py-3 text-[13px] tracking-[0.18em] text-neutral-700 uppercase transition-all duration-300 hover:border-neutral-200 hover:bg-white hover:text-neutral-950"
                      >
                        <span className="text-neutral-500 transition-colors duration-300 group-hover:text-neutral-900">
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="rounded-[22px] border border-neutral-200 bg-[linear-gradient(180deg,#ffffff_0%,#faf8f3_100%)] px-6 py-7">
                  <p className="mb-3 text-[10px] uppercase tracking-[0.34em] text-neutral-400">
                    KIKÚ
                  </p>

                  <p className="text-[13px] leading-7 text-neutral-500">
                    Siluetas limpias, materiales honestos y una selección diseñada para
                    acompañar una estética atemporal.
                  </p>

                  <div className="mt-6 border-t border-neutral-200 pt-5">
                    <Link
                      href="/occasions"
                      className="inline-flex border-b border-neutral-900 pb-1 text-[10px] uppercase tracking-[0.34em] text-neutral-700 transition-opacity hover:opacity-60"
                    >
                      Ver editorial
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </Suspense>
  )
}