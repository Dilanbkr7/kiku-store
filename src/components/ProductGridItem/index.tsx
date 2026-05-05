import type { Product } from '@/payload-types'

import { Media } from '@/components/Media'
import Link from 'next/link'
import React from 'react'

type Props = {
  product: Partial<Product>
}

const formatLuxuryPrice = (amount?: number | null) => {
  if (typeof amount !== 'number') return ''
  return '$' + Math.floor(amount / 100)
}

export const ProductGridItem: React.FC<Props> = ({ product }) => {
  const { gallery, priceInUSD, title } = product

  let price = priceInUSD

  const variants = product.variants?.docs

  if (variants && variants.length > 0) {
    const firstVariant = variants[0]

    if (
      firstVariant &&
      typeof firstVariant === 'object' &&
      typeof firstVariant.priceInUSD === 'number'
    ) {
      price = firstVariant.priceInUSD
    }
  }

  const images =
    gallery?.filter((g) => g?.image && typeof g.image !== 'string') || []

  const mainImage = images?.[0]?.image || null
  const hoverImage = images?.[1]?.image || null

  return (
    <div className="group block w-full">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-neutral-100">
        <Link href={`/products/${product.slug}`} className="absolute inset-0 z-[1] block">
          {mainImage && (
            <Media
              resource={mainImage}
              imgClassName="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:opacity-0 group-hover:scale-[1.03]"
              size="(max-width: 768px) 100vw, (max-width: 1400px) 33vw, 25vw"
            />
          )}

          {hoverImage ? (
            <Media
              resource={hoverImage}
              imgClassName="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-[1.03]"
              size="(max-width: 768px) 100vw, (max-width: 1400px) 33vw, 25vw"
            />
          ) : null}

          <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/[0.06]" />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/28 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </Link>

        <div className="absolute inset-x-4 bottom-4 z-10 translate-y-3 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <Link
            href={`/products/${product.slug}`}
            className="flex h-12 w-full items-center justify-center rounded-full bg-black px-8 text-[10px] uppercase tracking-[0.38em] text-white shadow-[0_10px_25px_rgba(0,0,0,0.22)] transition-all duration-300 hover:bg-neutral-900"
            style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
          >
            Shop now
          </Link>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <Link
            href={`/products/${product.slug}`}
            className="block text-[15px] font-normal leading-6 tracking-[-0.01em] text-neutral-900 transition-opacity duration-300 hover:opacity-70"
            style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
          >
            {title}
          </Link>
        </div>

        {typeof price === 'number' && (
          <div
            className="shrink-0 text-[15px] font-[300] tracking-[-0.01em] text-neutral-500"
            style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
          >
            {formatLuxuryPrice(price)}
          </div>
        )}
      </div>
    </div>
  )
}