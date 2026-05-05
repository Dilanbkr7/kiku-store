'use client'

import { ChevronDownIcon } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import type { ListItem } from '.'
import { FilterItem } from './FilterItem'

export function FilterItemDropdown({ list }: { list: ListItem[] }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [active, setActive] = useState('Seleccionar')
  const [openSelect, setOpenSelect] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenSelect(false)
      }
    }

    window.addEventListener('click', handleClickOutside)
    return () => window.removeEventListener('click', handleClickOutside)
  }, [])

  useEffect(() => {
    let found = 'Seleccionar'

    list.forEach((listItem: ListItem) => {
      if (
        ('path' in listItem && pathname === listItem.path) ||
        ('slug' in listItem && searchParams.get('sort') === listItem.slug) ||
        ('slug' in listItem && !searchParams.get('sort') && listItem.slug === null)
      ) {
        found = listItem.title
      }
    })

    setActive(found)
  }, [pathname, list, searchParams])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-[14px] border border-[#e7e2d9] bg-white px-4 py-3 text-[14px] text-neutral-700 transition-all hover:border-neutral-900"
        onClick={() => setOpenSelect(!openSelect)}
      >
        <span>{active}</span>
        <ChevronDownIcon
          className={`h-4 w-4 transition-transform duration-300 ${openSelect ? 'rotate-180' : ''}`}
        />
      </button>

      {openSelect && (
        <div
          className="absolute z-40 mt-2 w-full rounded-[18px] border border-[#e7e2d9] bg-white p-4 shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
          onClick={() => setOpenSelect(false)}
        >
          <ul className="flex flex-col gap-3">
            {list.map((item: ListItem, i) => (
              <FilterItem item={item} key={i} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}