'use client'

import { DeleteItemButton } from './DeleteItemButton'
import { EditItemQuantityButton } from './EditItemQuantityButton'
import { OpenCartButton } from './OpenCart'

import { Price } from '@/components/Price'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import type { Product, Variant } from '@/payload-types'
import { useCart } from '@payloadcms/plugin-ecommerce/client/react'
import { ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'

export function CartModal() {
  const { cart } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const totalQuantity = useMemo(() => {
    if (!cart?.items?.length) return undefined
    return cart.items.reduce((quantity, item) => (item.quantity || 0) + quantity, 0)
  }, [cart])

  const computedSubtotal = useMemo(() => {
    if (!cart?.items?.length) return 0

    return cart.items.reduce((total, item) => {
      const product = item.product
      const variant = item.variant

      if (typeof product !== 'object' || !product) return total

      const unitPrice =
        variant && typeof variant === 'object' && typeof variant.priceInUSD === 'number'
          ? variant.priceInUSD
          : typeof product.priceInUSD === 'number'
            ? product.priceInUSD
            : 0

      return total + unitPrice * (item.quantity || 0)
    }, 0)
  }, [cart])

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <OpenCartButton quantity={totalQuantity} />
      </SheetTrigger>

      <SheetContent className="flex w-full max-w-[460px] flex-col border-l border-[#e7e1d6] bg-[linear-gradient(180deg,#ffffff_0%,#faf7f2_100%)] px-0 shadow-[0_20px_80px_rgba(0,0,0,0.10)]">
        <SheetHeader className="border-b border-[#ece5da] px-7 pb-6 pt-7 text-left">
          <SheetTitle
            className="text-[28px] font-[300] leading-[0.98] tracking-[-0.04em] text-neutral-950"
            style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
          >
            Tu bolsa
          </SheetTitle>

          <SheetDescription
            className="mt-2 text-[14px] leading-7 text-neutral-500"
            style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
          >
            Revisa tu selección antes de continuar al checkout.
          </SheetDescription>
        </SheetHeader>

        {!cart || !cart.items || cart.items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#e7e1d6] bg-white">
              <ShoppingBag className="h-6 w-6 text-neutral-700" />
            </span>

            <p
              className="text-[28px] font-[300] leading-[1] tracking-[-0.04em] text-neutral-950"
              style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
            >
              Tu bolsa está vacía
            </p>

            <p
              className="mt-4 max-w-[28ch] text-[14px] leading-7 text-neutral-500"
              style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
            >
              Añade piezas de la colección para comenzar tu compra.
            </p>

            <div className="mt-8">
              <Button asChild>
                <Link href="/shop">Explorar colección</Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-7 py-6">
              <ul className="flex flex-col gap-5">
                {cart.items.map((item, i) => {
                  const product = item.product
                  const variant = item.variant

                  if (typeof product !== 'object' || !product || !product.slug) {
                    return <React.Fragment key={i} />
                  }

                  const metaImage =
                    product.meta?.image && typeof product.meta.image === 'object'
                      ? product.meta.image
                      : undefined

                  const firstGalleryImage =
                    typeof product.gallery?.[0]?.image === 'object'
                      ? product.gallery?.[0]?.image
                      : undefined

                  let image = firstGalleryImage || metaImage

                  const isVariant = Boolean(variant) && typeof variant === 'object'

                  if (isVariant) {
                    const imageVariant = product.gallery?.find((galleryItem) => {
                      if (!galleryItem.variantOption) return false

                      const variantOptionID =
                        typeof galleryItem.variantOption === 'object'
                          ? galleryItem.variantOption.id
                          : galleryItem.variantOption

                      const hasMatch = (variant as Variant)?.options?.some((option) => {
                        if (typeof option === 'object') return option.id === variantOptionID
                        return option === variantOptionID
                      })

                      return hasMatch
                    })

                    if (imageVariant && typeof imageVariant.image === 'object') {
                      image = imageVariant.image
                    }
                  }

                  const unitPrice =
                    isVariant && typeof (variant as Variant).priceInUSD === 'number'
                      ? (variant as Variant).priceInUSD
                      : typeof product.priceInUSD === 'number'
                        ? product.priceInUSD
                        : 0

                  const lineTotal = unitPrice * (item.quantity || 0)

                  return (
                    <li
                      key={i}
                      className="rounded-[24px] border border-[#ece5da] bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
                    >
                      <div className="flex gap-4">
                        <div className="relative shrink-0">
                          <Link
                            href={`/products/${(item.product as Product)?.slug}`}
                            className="block overflow-hidden rounded-[16px] border border-[#ece5da] bg-[#f5f2ec]"
                          >
                            <div className="relative h-[96px] w-[82px] overflow-hidden">
                              {image?.url ? (
                                <Image
                                  alt={image?.alt || product?.title || ''}
                                  className="h-full w-full object-cover"
                                  height={96}
                                  src={image.url}
                                  width={82}
                                />
                              ) : null}
                            </div>
                          </Link>

                          <div className="absolute -right-2 -top-2 z-20">
                            <DeleteItemButton item={item} />
                          </div>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <Link
                                href={`/products/${(item.product as Product)?.slug}`}
                                className="block"
                              >
                                <p
                                  className="text-[18px] font-[300] leading-[1.05] tracking-[-0.03em] text-neutral-950"
                                  style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                                >
                                  {product.title}
                                </p>
                              </Link>

                              {isVariant && variant ? (
                                <p
                                  className="mt-2 text-[11px] uppercase tracking-[0.20em] text-neutral-500"
                                  style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                                >
                                  {(variant as Variant).options
                                    ?.map((option) =>
                                      typeof option === 'object' ? option.label : null,
                                    )
                                    .filter(Boolean)
                                    .join(' · ')}
                                </p>
                              ) : null}
                            </div>

                            <div className="shrink-0 text-right">
                              <Price
                                amount={lineTotal}
                                className="text-[15px] font-[300] tracking-[-0.02em] text-neutral-900"
                              />
                            </div>
                          </div>

                          <div className="mt-5 flex items-center justify-end">
                            <div className="flex h-11 items-center rounded-full border border-[#e2dbcf] bg-[#fcfaf6] px-2">
                              <EditItemQuantityButton item={item} type="minus" />
                              <p
                                className="w-10 text-center text-[13px] text-neutral-900"
                                style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                              >
                                {item.quantity}
                              </p>
                              <EditItemQuantityButton item={item} type="plus" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="border-t border-[#ece5da] bg-[linear-gradient(180deg,#fffdf9_0%,#f8f5ef_100%)] px-7 pb-7 pt-6">
              <div className="mb-5 flex items-center justify-between">
                <p
                  className="text-[11px] uppercase tracking-[0.24em] text-neutral-500"
                  style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                >
                  Subtotal
                </p>

                <Price
                  amount={computedSubtotal}
                  className="text-[26px] font-[300] tracking-[-0.04em] text-neutral-950"
                />
              </div>

              <p
                className="mb-6 text-[13px] leading-7 text-neutral-500"
                style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
              >
                Costos de envío e impuestos se calculan en el checkout.
              </p>

              <Button asChild className="w-full">
                <Link href="/checkout">Continuar al checkout</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}