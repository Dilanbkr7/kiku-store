'use client'

import type { Product } from '@/payload-types'
import { createUrl } from '@/utilities/createUrl'
import clsx from 'clsx'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const normalize = (value?: string) =>
  value
    ?.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') || ''

const getColorClasses = (label?: string) => {
  const value = normalize(label)

  if (value.includes('blanco') || value.includes('white') || value.includes('ivory')) {
    return 'bg-white border-neutral-300'
  }

  if (
    value.includes('gris') ||
    value.includes('gray') ||
    value.includes('grey') ||
    value.includes('slate')
  ) {
    return 'bg-neutral-400 border-neutral-500'
  }

  if (value.includes('negro') || value.includes('black')) {
    return 'bg-black border-black'
  }

  if (
    value.includes('dusty rose') ||
    value.includes('rose') ||
    value.includes('pink') ||
    value.includes('blush') ||
    value.includes('terracotta')
  ) {
    return 'bg-rose-300 border-rose-400'
  }

  if (value.includes('beige') || value.includes('cream') || value.includes('arena')) {
    return 'bg-stone-200 border-stone-300'
  }

  if (value.includes('azul') || value.includes('blue') || value.includes('navy')) {
    return 'bg-slate-700 border-slate-800'
  }

  if (value.includes('verde') || value.includes('green') || value.includes('olive')) {
    return 'bg-lime-800 border-lime-900'
  }

  if (value.includes('marron') || value.includes('brown') || value.includes('cafe')) {
    return 'bg-amber-700 border-amber-800'
  }

  return 'bg-neutral-200 border-neutral-300'
}

export function VariantSelector({ product }: { product: Product }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const variants = product.variants?.docs
  const variantTypes = product.variantTypes
  const hasVariants = Boolean(product.enableVariants && variants?.length && variantTypes?.length)

  if (!hasVariants) return null

  return (
    <div className="flex flex-col gap-10">
      {variantTypes?.map((type) => {
        if (!type || typeof type !== 'object') return null

        const options = type.options?.docs
        if (!options || !Array.isArray(options) || !options.length) return null

        const normalizedTypeName = normalize(type.name)
        const isColorType =
          normalizedTypeName.includes('color') || normalizedTypeName.includes('colour')
        const isSizeType =
          normalizedTypeName.includes('size') || normalizedTypeName.includes('talla')

        const selectedOptionID = searchParams.get(type.name)

        const selectedOption = options.find((option) => {
          if (!option || typeof option !== 'object') return false
          return String(option.id) === selectedOptionID
        })

        return (
          <dl key={type.id} className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <dt
                className="text-[10px] uppercase tracking-[0.34em] text-neutral-400"
                style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
              >
                {isColorType ? 'Color' : isSizeType ? 'Talla' : type.label}
              </dt>

              {selectedOption && typeof selectedOption === 'object' ? (
                <dd
                  className="text-[10px] uppercase tracking-[0.28em] text-neutral-700"
                  style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                >
                  {selectedOption.label}
                </dd>
              ) : (
                <dd
                  className="text-[10px] uppercase tracking-[0.28em] text-neutral-300"
                  style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                >
                  Selecciona
                </dd>
              )}
            </div>

            <dd className="flex flex-wrap gap-3">
              {options.map((option) => {
                if (!option || typeof option !== 'object') return null

                const optionID = option.id
                const optionKey = type.name

                const optionSearchParams = new URLSearchParams(searchParams.toString())
                optionSearchParams.delete('variant')
                optionSearchParams.delete('image')
                optionSearchParams.set(optionKey, String(optionID))

                const currentOptions = Array.from(optionSearchParams.values())

                let isAvailableForSale = true

                if (variants) {
                  const matchingVariant = variants
                    .filter((variant) => typeof variant === 'object')
                    .find((variant) => {
                      if (!variant.options || !Array.isArray(variant.options)) return false

                      return variant.options.every((variantOption) => {
                        if (typeof variantOption !== 'object') {
                          return currentOptions.includes(String(variantOption))
                        }

                        return currentOptions.includes(String(variantOption.id))
                      })
                    })

                  if (matchingVariant) {
                    optionSearchParams.set('variant', String(matchingVariant.id))
                    isAvailableForSale = Boolean(
                      matchingVariant.inventory && matchingVariant.inventory > 0,
                    )
                  }
                }

                const optionUrl = createUrl(pathname, optionSearchParams)

                const isActive =
                  Boolean(isAvailableForSale) && searchParams.get(optionKey) === String(optionID)

                if (isColorType) {
                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-disabled={!isAvailableForSale}
                      disabled={!isAvailableForSale}
                      onClick={() => {
                        router.replace(optionUrl, { scroll: false })
                      }}
                      className={clsx(
                        'group relative flex flex-col items-center gap-3 transition-all duration-300',
                        !isAvailableForSale && 'cursor-not-allowed opacity-30',
                      )}
                      title={`${option.label}${!isAvailableForSale ? ' · Agotado' : ''}`}
                    >
                      <span
                        className={clsx(
                          'flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300',
                          getColorClasses(option.label),
                          isActive
                            ? 'scale-[1.06] ring-2 ring-neutral-950 ring-offset-2 ring-offset-white'
                            : 'hover:scale-[1.05]',
                        )}
                      />
                      <span
                        className={clsx(
                          'text-[10px] uppercase tracking-[0.22em] transition-colors duration-300',
                          isActive ? 'text-neutral-900' : 'text-neutral-500',
                        )}
                        style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                      >
                        {option.label}
                      </span>
                    </button>
                  )
                }

                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-disabled={!isAvailableForSale}
                    disabled={!isAvailableForSale}
                    onClick={() => {
                      router.replace(optionUrl, { scroll: false })
                    }}
                    className={clsx(
                      'min-w-[62px] rounded-full border px-5 py-3 text-[10px] uppercase tracking-[0.28em] transition-all duration-300',
                      isActive
                        ? 'border-neutral-950 bg-neutral-950 text-white shadow-[0_8px_24px_rgba(0,0,0,0.08)]'
                        : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-950 hover:text-neutral-950',
                      !isAvailableForSale &&
                        'cursor-not-allowed border-neutral-200 text-neutral-300 line-through',
                    )}
                    title={`${option.label}${!isAvailableForSale ? ' · Agotado' : ''}`}
                    style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                  >
                    {option.label}
                  </button>
                )
              })}
            </dd>
          </dl>
        )
      })}
    </div>
  )
}