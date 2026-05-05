'use client'

import type { Product, Variant } from '@/payload-types'

import { AddToCart } from '@/components/Cart/AddToCart'
import { Price } from '@/components/Price'
import { ProductAssistantDialog } from '@/components/product/ProductAssistantDialog'
import { StockIndicator } from '@/components/product/StockIndicator'
import { VariantSelector } from '@/components/product/VariantSelector'
import { WishlistButton } from '@/components/product/WishlistButton'
import { RichText } from '@/components/RichText'
import { useCurrency } from '@payloadcms/plugin-ecommerce/client/react'
import { Suspense } from 'react'

export function ProductDescription({ product }: { product: Product }) {
  const { currency } = useCurrency()

  let amount = 0
  let lowestAmount = 0
  let highestAmount = 0

  const priceField = ('priceIn' + currency.code) as keyof Product
  const hasVariants = product.enableVariants && Boolean(product.variants?.docs?.length)

  if (hasVariants) {
    const variantPriceField = ('priceIn' + currency.code) as keyof Variant

    const variantsOrderedByPrice = (product.variants?.docs || [])
      .filter((variant): variant is Variant => Boolean(variant && typeof variant === 'object'))
      .sort((a, b) => {
        const aPrice = a[variantPriceField]
        const bPrice = b[variantPriceField]

        if (typeof aPrice === 'number' && typeof bPrice === 'number') {
          return aPrice - bPrice
        }

        return 0
      })

    const lowestVariant = variantsOrderedByPrice[0]?.[variantPriceField]
    const highestVariant =
      variantsOrderedByPrice[variantsOrderedByPrice.length - 1]?.[variantPriceField]

    if (typeof lowestVariant === 'number' && typeof highestVariant === 'number') {
      lowestAmount = lowestVariant
      highestAmount = highestVariant
    }
  } else {
    const basePrice = product[priceField]
    if (typeof basePrice === 'number') {
      amount = basePrice
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="border-b border-neutral-200 pb-8">
        <div className="mb-6 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[560px]">
            <p
              className="mb-3 text-[10px] uppercase tracking-[0.42em] text-neutral-400"
              style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
            >
              KIKÚ SIGNATURE
            </p>

            <h1
              className="max-w-[11ch] text-4xl font-[300] leading-[0.92] tracking-[-0.05em] text-neutral-950 md:text-6xl"
              style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
            >
              {product.title}
            </h1>
          </div>

          <div className="shrink-0 md:pt-2">
            <div
              className="rounded-full border border-neutral-200 bg-white px-5 py-3 text-[11px] uppercase tracking-[0.24em] text-neutral-700 shadow-[0_8px_24px_rgba(0,0,0,0.03)]"
              style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
            >
              {hasVariants ? (
                <Price highestAmount={highestAmount} lowestAmount={lowestAmount} />
              ) : (
                <Price amount={amount} />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <WishlistButton productId={product.id} productTitle={product.title} />
        </div>
      </div>

      {product.description ? (
        <div className="max-w-[60ch]">
          <div
            className="mb-4 text-[10px] uppercase tracking-[0.34em] text-neutral-400"
            style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
          >
            Descripción
          </div>

          <div
            className="text-[15px] leading-8 text-neutral-700"
            style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
          >
            <RichText className="" data={product.description} enableGutter={false} />
          </div>
        </div>
      ) : null}

      <div className="rounded-[24px] border border-neutral-200 bg-[linear-gradient(180deg,#ffffff_0%,#faf8f3_100%)] p-6 md:p-8">
        {hasVariants && (
          <div className="mb-8 border-b border-neutral-200 pb-8">
            <div
              className="mb-4 text-[10px] uppercase tracking-[0.34em] text-neutral-400"
              style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
            >
              Selección
            </div>

            <Suspense fallback={null}>
              <VariantSelector product={product} />
            </Suspense>
          </div>
        )}

        <div className="mb-8 flex items-center justify-between border-b border-neutral-200 pb-6">
          <div
            className="text-[10px] uppercase tracking-[0.34em] text-neutral-400"
            style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
          >
            Disponibilidad
          </div>

          <Suspense fallback={null}>
            <StockIndicator product={product} />
          </Suspense>
        </div>

        <div className="flex flex-col gap-5">
          <Suspense fallback={null}>
            <AddToCart product={product} />
          </Suspense>

          <div className="pt-1">
            <ProductAssistantDialog productTitle={product.title} />
          </div>

          <div className="border-t border-neutral-200 pt-5">
            <p
              className="text-[11px] uppercase tracking-[0.26em] text-neutral-400"
              style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
            >
              Piezas seleccionadas cuidadosamente · Siluetas atemporales · Edición KIKÚ
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}