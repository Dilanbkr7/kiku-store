'use client'

import { Heart } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  productId: string | number
  productTitle: string
}

const STORAGE_KEY = 'kiku-wishlist'

export function WishlistButton({ productId, productTitle }: Props) {
  const normalizedId = useMemo(() => String(productId), [productId])
  const [isSaved, setIsSaved] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const items: string[] = raw ? JSON.parse(raw) : []
      setIsSaved(items.includes(normalizedId))
    } catch {
      setIsSaved(false)
    }
  }, [normalizedId])

  const toggleWishlist = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const items: string[] = raw ? JSON.parse(raw) : []

      let next: string[]

      if (items.includes(normalizedId)) {
        next = items.filter((id) => id !== normalizedId)
        setIsSaved(false)
        toast.success('Eliminado de tu lista de deseos')
      } else {
        next = [...items, normalizedId]
        setIsSaved(true)
        toast.success('Añadido a tu lista de deseos: ' + productTitle)
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      toast.error('No se pudo actualizar tu lista de deseos')
    }
  }

  if (!mounted) return null

  return (
    <button
      type="button"
      onClick={toggleWishlist}
      aria-label={isSaved ? 'Quitar de lista de deseos' : 'Añadir a lista de deseos'}
      className="group inline-flex items-center gap-3 rounded-full border border-neutral-200 bg-white px-4 py-3 text-neutral-700 transition-all duration-300 hover:border-neutral-900 hover:text-neutral-950"
      style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${
          isSaved
            ? 'border-neutral-950 bg-neutral-950 text-white'
            : 'border-neutral-200 bg-white text-neutral-700 group-hover:border-neutral-900'
        }`}
      >
        <Heart
          className={`h-[14px] w-[14px] transition-all duration-300 ${
            isSaved ? 'fill-current' : ''
          }`}
        />
      </span>

      <span className="text-[10px] uppercase tracking-[0.28em]">
        {isSaved ? 'En tu lista' : 'Lista de deseos'}
      </span>
    </button>
  )
}