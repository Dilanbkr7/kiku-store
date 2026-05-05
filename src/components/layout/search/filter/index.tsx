import type { SortFilterItem } from '@/lib/constants'

import { Suspense } from 'react'

import { FilterItem } from './FilterItem'
import { FilterItemDropdown } from './FilterItemDropdown'

export type ListItem = PathFilterItem | SortFilterItem
export type PathFilterItem = { path: string; title: string }

function FilterItemList({ list }: { list: ListItem[] }) {
  return (
    <>
      {list.map((item: ListItem, i) => (
        <FilterItem item={item} key={i} />
      ))}
    </>
  )
}

export function FilterList({ list, title }: { list: ListItem[]; title?: string }) {
  return (
    <nav>
      {title ? (
        <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-neutral-400">
          {title}
        </p>
      ) : null}

      <ul className="hidden flex-col gap-3 md:flex">
        <Suspense fallback={null}>
          <FilterItemList list={list} />
        </Suspense>
      </ul>

      <div className="md:hidden">
        <Suspense fallback={null}>
          <FilterItemDropdown list={list} />
        </Suspense>
      </div>
    </nav>
  )
}