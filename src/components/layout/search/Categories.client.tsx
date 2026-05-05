'use client'

import clsx from 'clsx'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'

import { Category } from '@/payload-types'

type Props = {
  category: Category
}

export const CategoryItem: React.FC<Props> = ({ category }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const slug =
    typeof category.slug === 'string' && category.slug.length
      ? category.slug
      : String(category.id)

  const activeValue = searchParams.get('category')

  const isActive = useMemo(() => {
    return activeValue === slug || activeValue === String(category.id)
  }, [activeValue, slug, category.id])

  const setQuery = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (isActive) {
      params.delete('category')
    } else {
      params.set('category', slug)
    }

    const queryString = params.toString()
    router.push(queryString ? pathname + '?' + queryString : pathname)
  }, [isActive, pathname, router, searchParams, slug])

  return (
    <button
      type="button"
      onClick={setQuery}
      className={clsx(
        'group flex w-full items-center justify-between rounded-[14px] px-3 py-3 text-left transition-all duration-300',
        isActive
          ? 'bg-white text-neutral-950 shadow-[0_8px_24px_rgba(0,0,0,0.04)]'
          : 'text-neutral-600 hover:bg-white hover:text-neutral-950',
      )}
      style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
    >
      <span className="text-[14px] leading-6 tracking-[-0.01em]">{category.title}</span>

      <span
        className={clsx(
          'h-[6px] w-[6px] rounded-full transition-all duration-300',
          isActive
            ? 'bg-neutral-900'
            : 'bg-neutral-300 group-hover:bg-neutral-500',
        )}
      />
    </button>
  )
}