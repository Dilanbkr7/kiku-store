'use client'

import { useCart } from '@payloadcms/plugin-ecommerce/client/react'
import clsx from 'clsx'
import { MinusIcon, PlusIcon } from 'lucide-react'
import React, { useMemo } from 'react'

type CartItem = {
  id?: string | null
  quantity?: number | null
  variant?: any
  product?: any
}

export function EditItemQuantityButton({ type, item }: { item: CartItem; type: 'minus' | 'plus' }) {
  const { decrementItem, incrementItem, isLoading } = useCart()

  const disabled = useMemo(() => {
    if (!item.id) return true

    const target =
      item.variant && typeof item.variant === 'object'
        ? item.variant
        : item.product && typeof item.product === 'object'
          ? item.product
          : null

    if (
      target &&
      typeof target === 'object' &&
      target.inventory !== undefined &&
      target.inventory !== null
    ) {
      if (type === 'plus' && item.quantity !== undefined && item.quantity !== null) {
        return item.quantity >= target.inventory
      }
    }

    if (type === 'minus' && (item.quantity || 0) <= 1) {
      return false
    }

    return false
  }, [item, type])

  return (
    <form>
      <button
        disabled={disabled || isLoading}
        aria-label={type === 'plus' ? 'Aumentar cantidad' : 'Reducir cantidad'}
        className={clsx(
          'flex h-8 w-8 items-center justify-center rounded-full text-neutral-700 transition-all duration-300',
          disabled || isLoading
            ? 'cursor-not-allowed opacity-35'
            : 'hover:bg-white hover:text-neutral-950',
        )}
        onClick={(e: React.FormEvent<HTMLButtonElement>) => {
          e.preventDefault()

          if (item.id) {
            if (type === 'plus') {
              incrementItem(item.id)
            } else {
              decrementItem(item.id)
            }
          }
        }}
        type="button"
      >
        {type === 'plus' ? (
          <PlusIcon className="h-[15px] w-[15px]" strokeWidth={1.8} />
        ) : (
          <MinusIcon className="h-[15px] w-[15px]" strokeWidth={1.8} />
        )}
      </button>
    </form>
  )
}