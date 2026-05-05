'use client'

import { cn } from '@/utilities/cn'
import { createUrl } from '@/utilities/createUrl'
import { SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type Props = {
  className?: string
}

export const Search: React.FC<Props> = ({ className }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const val = e.target as HTMLFormElement
    const search = val.search as HTMLInputElement
    const newParams = new URLSearchParams(searchParams.toString())

    if (search.value) {
      newParams.set('q', search.value)
    } else {
      newParams.delete('q')
    }

    router.push(createUrl('/shop', newParams))
  }

  return (
    <form
      className={cn(
        'relative w-full rounded-[20px] border border-neutral-200 bg-[linear-gradient(180deg,#ffffff_0%,#faf8f3_100%)] px-5 py-1 transition-all duration-300 focus-within:border-neutral-900 focus-within:shadow-[0_12px_40px_rgba(0,0,0,0.04)]',
        className,
      )}
      onSubmit={onSubmit}
    >
      <input
        autoComplete="off"
        className="w-full border-0 bg-transparent py-4 pr-12 text-[15px] tracking-[-0.01em] text-neutral-900 outline-none placeholder:text-neutral-400 focus:ring-0"
        defaultValue={searchParams?.get('q') || ''}
        key={searchParams?.get('q')}
        name="search"
        placeholder="Buscar por nombre, textura o estilo"
        type="text"
        style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
      />

      <button
        type="submit"
        aria-label="Buscar"
        className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-500 transition-all duration-300 hover:text-neutral-900"
      >
        <SearchIcon className="h-[17px] w-[17px]" strokeWidth={1.5} />
      </button>
    </form>
  )
}