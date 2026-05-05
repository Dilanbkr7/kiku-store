function LoadingIcon({ variant }: { variant: 'summer' | 'autumn' | 'winter' | 'spring' }) {
  if (variant === 'summer') {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.35">
        <circle cx="12" cy="12" r="4.1" />
        <path d="M12 2.8v3M12 18.2v3M21.2 12h-3M5.8 12h-3M18.5 5.5l-2.1 2.1M7.6 16.4l-2.1 2.1M18.5 18.5l-2.1-2.1M7.6 7.6 5.5 5.5" />
      </svg>
    )
  }

  if (variant === 'autumn') {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.35">
        <path d="M12.5 3.6c3.7 2.1 6 5.2 6 8.8 0 4-2.9 7.1-6.8 7.1-3.6 0-6.1-2.6-6.1-5.9 0-3.4 2.3-6.4 6.9-10Z" />
        <path d="M12 8.5c.3 3.6-.6 7-2.3 10" />
      </svg>
    )
  }

  if (variant === 'winter') {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.35">
        <path d="M12 2.8v18.4M4.8 7l14.4 10M19.2 7 4.8 17M7.2 4.8 12 12l4.8-7.2M7.2 19.2 12 12l4.8 7.2" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.35">
      <path d="M12 20.4V10.3" />
      <path d="M12 10.3c0-3.7 2.1-6.2 6-7-.1 3.8-2 6.3-6 7Z" />
      <path d="M12 13.1c-.2-3.2-2.1-5.3-6-5.9.2 3.6 2.1 5.7 6 5.9Z" />
    </svg>
  )
}

const loadingOccasions = [
  { label: 'SUMMER', variant: 'summer' as const },
  { label: 'AUTUMN', variant: 'autumn' as const },
  { label: 'WINTER', variant: 'winter' as const },
  { label: 'SPRING', variant: 'spring' as const },
]

export default function ShopLoading() {
  return (
    <main className="bg-[#f8f5ef] text-neutral-900">
      <div className="mx-auto max-w-[1560px] px-6 py-12 md:px-10 md:py-14">
        <div className="mb-10 border-b border-neutral-200 pb-8">
          <div className="h-12 w-full animate-pulse rounded-[18px] bg-neutral-200" />
        </div>

        <div className="grid gap-14 xl:grid-cols-[240px_minmax(0,1fr)] xl:gap-20">
          {/* SIDEBAR */}
          <aside className="xl:pt-2">
            <div className="space-y-12">
              <div className="animate-pulse">
                <div className="mb-5 h-3 w-24 rounded bg-neutral-200" />
                <div className="space-y-5">
                  <div className="h-4 w-20 rounded bg-neutral-200" />
                  <div className="h-4 w-24 rounded bg-neutral-200" />
                  <div className="h-4 w-24 rounded bg-neutral-200" />
                  <div className="h-4 w-16 rounded bg-neutral-200" />
                </div>
              </div>

              <div>
                <div className="mb-5 h-3 w-24 animate-pulse rounded bg-neutral-200" />
                <div className="space-y-3">
                  {loadingOccasions.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 rounded-[14px] border border-neutral-200 bg-white px-3 py-3 text-neutral-300"
                    >
                      <LoadingIcon variant={item.variant} />
                      <div className="h-3 w-20 animate-pulse rounded bg-neutral-200" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[22px] border border-neutral-200 bg-[linear-gradient(180deg,#ffffff_0%,#faf8f3_100%)] px-6 py-7 animate-pulse">
                <div className="mb-3 h-3 w-14 rounded bg-neutral-200" />
                <div className="space-y-3">
                  <div className="h-4 w-full rounded bg-neutral-200" />
                  <div className="h-4 w-[88%] rounded bg-neutral-200" />
                  <div className="h-4 w-[75%] rounded bg-neutral-200" />
                </div>
                <div className="mt-6 border-t border-neutral-200 pt-5">
                  <div className="h-3 w-24 rounded bg-neutral-200" />
                </div>
              </div>
            </div>
          </aside>

          {/* CONTENT */}
          <section>
            <div className="mb-12 grid gap-8 border-b border-neutral-200 pb-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div className="animate-pulse">
                <div className="mb-5 h-3 w-16 rounded bg-neutral-200" />
                <div className="h-14 w-[260px] rounded bg-neutral-200 md:h-20 md:w-[360px]" />
              </div>

              <div className="animate-pulse lg:ml-auto lg:max-w-[38ch]">
                <div className="h-4 w-full rounded bg-neutral-200" />
                <div className="mt-4 h-4 w-[92%] rounded bg-neutral-200" />
                <div className="mt-4 h-4 w-[70%] rounded bg-neutral-200" />
              </div>
            </div>

            <div className="mb-10 flex items-center justify-between gap-6 border-b border-neutral-200 pb-5">
              <div className="h-3 w-20 animate-pulse rounded bg-neutral-200" />
              <div className="h-3 w-28 animate-pulse rounded bg-neutral-200" />
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/5] w-full rounded-[24px] bg-neutral-200" />
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div className="h-5 w-2/3 rounded bg-neutral-200" />
                    <div className="h-5 w-12 rounded bg-neutral-200" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}