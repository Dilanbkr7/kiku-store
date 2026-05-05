'use client'

import { Product, Variant } from '@/payload-types'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

type Props = {
  product: Product
}

export const StockIndicator: React.FC<Props> = ({ product }) => {
  const searchParams = useSearchParams()
  const variants = product.variants?.docs || []

  const selectedVariant = useMemo<Variant | undefined>(() => {
    if (product.enableVariants && variants.length) {
      const variantId = searchParams.get('variant')

      const validVariant = variants.find((variant) => {
        if (typeof variant === 'object') {
          return String(variant.id) === variantId
        }

        return String(variant) === variantId
      })

      if (validVariant && typeof validVariant === 'object') {
        return validVariant
      }
    }

    return undefined
  }, [product.enableVariants, searchParams, variants])

  const stockQuantity = useMemo(() => {
    if (product.enableVariants) {
      if (selectedVariant) return selectedVariant.inventory || 0
      return 0
    }

    return product.inventory || 0
  }, [product.enableVariants, selectedVariant, product.inventory])

  if (product.enableVariants && !selectedVariant) {
    return (
      <div
        className="inline-flex rounded-full border border-neutral-200 bg-white px-4 py-2 text-[10px] uppercase tracking-[0.26em] text-neutral-400"
        style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
      >
        Selecciona una opción
      </div>
    )
  }

  if (stockQuantity === 0) {
    return (
      <div
        className="inline-flex rounded-full border border-neutral-200 bg-white px-4 py-2 text-[10px] uppercase tracking-[0.26em] text-neutral-400"
        style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
      >
        Agotado
      </div>
    )
  }

  if (stockQuantity < 10) {
    return (
      <div
        className="inline-flex rounded-full border border-neutral-200 bg-white px-4 py-2 text-[10px] uppercase tracking-[0.26em] text-neutral-600"
        style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
      >
        Últimas piezas · {stockQuantity}
      </div>
    )
  }

  return (
    <div
      className="inline-flex rounded-full border border-neutral-200 bg-white px-4 py-2 text-[10px] uppercase tracking-[0.26em] text-neutral-600"
      style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
    >
      Disponible
    </div>
  )
}