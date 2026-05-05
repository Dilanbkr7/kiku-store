'use client'

import { useCart } from '@payloadcms/plugin-ecommerce/client/react'
import clsx from 'clsx'
import { XIcon } from 'lucide-react'
import React from 'react'

type CartItem = {
  id?: string | null
}

export function DeleteItemButton({ item }: { item: CartItem }) {
  const { isLoading, removeItem } = useCart()
  const itemId = item.id

  return (
    <form>
      <button
        aria-label="Eliminar producto"
        className={clsx(
          'flex h-7 w-7 items-center justify-center rounded-full border border-[#d9d1c4] bg-white text-neutral-600 shadow-[0_6px_18px_rgba(0,0,0,0.08)] transition-all duration-300 hover:border-neutral-900 hover:text-neutral-950',
          {
            'cursor-not-allowed opacity-40': !itemId || isLoading,
          },
        )}
        disabled={!itemId || isLoading}
        onClick={(e: React.FormEvent<HTMLButtonElement>) => {
          e.preventDefault()
          if (itemId) removeItem(itemId)
        }}
        type="button"
      >
        <XIcon className="h-[14px] w-[14px]" strokeWidth={1.75} />
      </button>
    </form>
  )
}