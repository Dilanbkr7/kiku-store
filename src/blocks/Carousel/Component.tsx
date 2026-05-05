import type { CarouselBlock as CarouselBlockProps, Product } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Suspense } from 'react'

import { CarouselClient } from './Component.client'

type Props = CarouselBlockProps & {
  id?: string | number
}

export async function CarouselBlock(props: Props) {
  const { categories, limit = 3, populateBy, selectedDocs } = props

  let products: Product[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.length
      ? categories.map((category) => {
          if (typeof category === 'object' && category?.id) return category.id
          return category
        })
      : null

    const fetchedProducts = await payload.find({
      collection: 'products',
      depth: 1,
      limit: limit || undefined,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    products = fetchedProducts.docs as Product[]
  }

  if (populateBy === 'selection' && selectedDocs?.length) {
    products = selectedDocs
      .map((doc) => {
        if (doc && typeof doc.value !== 'string') return doc.value
        return null
      })
      .filter(Boolean) as Product[]
  }

  if (!products?.length) return null

  return (
    <div className="w-full pb-6 pt-1">
      <Suspense
        fallback={<div className="h-[300px] w-full animate-pulse rounded-lg bg-neutral-100" />}
      >
        <CarouselClient products={products} />
      </Suspense>
    </div>
  )
}