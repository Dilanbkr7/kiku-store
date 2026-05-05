import configPromise from '@payload-config'
import clsx from 'clsx'
import { getPayload } from 'payload'
import { Suspense } from 'react'

import { CategoryItem } from './Categories.client'

async function CategoryList() {
  const payload = await getPayload({ config: configPromise })

  const categories = await payload.find({
    collection: 'categories',
    sort: 'title',
  })

  return (
    <div>
      <p
        className="mb-5 text-[10px] uppercase tracking-[0.38em] text-neutral-400"
        style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
      >
        Categorías
      </p>

      <div className="rounded-[22px] border border-neutral-200 bg-[linear-gradient(180deg,#ffffff_0%,#faf8f3_100%)] px-4 py-4">
        <ul className="flex flex-col gap-2">
          {categories.docs.map((category) => {
            return (
              <li key={category.id}>
                <CategoryItem category={category} />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

const skeleton = 'rounded bg-neutral-200 animate-pulse'
const title = 'h-3 w-24'
const line = 'h-11 w-full rounded-[14px]'

export function Categories() {
  return (
    <Suspense
      fallback={
        <div className="w-full">
          <div className={clsx(skeleton, title, 'mb-5')} />

          <div className="rounded-[22px] border border-neutral-200 bg-[linear-gradient(180deg,#ffffff_0%,#faf8f3_100%)] px-4 py-4">
            <div className="flex flex-col gap-2">
              <div className={clsx(skeleton, line)} />
              <div className={clsx(skeleton, line)} />
              <div className={clsx(skeleton, line)} />
              <div className={clsx(skeleton, line)} />
            </div>
          </div>
        </div>
      }
    >
      <CategoryList />
    </Suspense>
  )
}