import type { Media } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { GridTileImage } from '@/components/Grid/tile'
import { Gallery } from '@/components/product/Gallery'
import { ProductDescription } from '@/components/product/ProductDescription'
import { Button } from '@/components/ui/button'
import configPromise from '@payload-config'
import { ChevronLeftIcon } from 'lucide-react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React, { Suspense } from 'react'

type Args = {
  params: Promise<{
    slug: string
  }>
}

function formatLuxuryPrice(priceInUSD?: number | null) {
  if (typeof priceInUSD !== 'number') return ''
  return '$' + Math.floor(priceInUSD / 100)
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const product = await queryProductBySlug({ slug })

  if (!product) return notFound()

  const gallery = product.gallery?.filter((item) => typeof item.image === 'object') || []

  const metaImage = typeof product.meta?.image === 'object' ? product.meta?.image : undefined
  const canIndex = product._status === 'published'

  const seoImage = metaImage || (gallery.length ? (gallery[0]?.image as Media) : undefined)

  return {
    description: product.meta?.description || '',
    openGraph: seoImage?.url
      ? {
          images: [
            {
              alt: seoImage?.alt,
              height: seoImage.height!,
              url: seoImage?.url,
              width: seoImage.width!,
            },
          ],
        }
      : null,
    robots: {
      follow: canIndex,
      googleBot: {
        follow: canIndex,
        index: canIndex,
      },
      index: canIndex,
    },
    title: product.meta?.title || product.title,
  }
}

export default async function ProductPage({ params }: Args) {
  const { slug } = await params
  const product = await queryProductBySlug({ slug })

  if (!product) return notFound()

  const gallery =
    product.gallery
      ?.filter((item) => typeof item.image === 'object')
      .map((item) => ({
        ...item,
        image: item.image as Media,
      })) || []

  const metaImage = typeof product.meta?.image === 'object' ? product.meta?.image : undefined

  const hasStock = product.enableVariants
    ? product?.variants?.docs?.some((variant) => {
        if (typeof variant !== 'object') return false
        return !!variant.inventory && variant.inventory > 0
      })
    : (product.inventory || 0) > 0

  let price = product.priceInUSD

  if (product.enableVariants && product?.variants?.docs?.length) {
    price = product?.variants?.docs?.reduce((acc, variant) => {
      if (
        typeof variant === 'object' &&
        typeof variant?.priceInUSD === 'number' &&
        typeof acc === 'number' &&
        variant.priceInUSD > acc
      ) {
        return variant.priceInUSD
      }

      return acc
    }, price)
  }

  const productJsonLd = {
    name: product.title,
    '@context': 'https://schema.org',
    '@type': 'Product',
    description: product.description,
    image: metaImage?.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: hasStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      price: price,
      priceCurrency: 'usd',
    },
  }

  const relatedProducts =
    product.relatedProducts?.filter((relatedProduct) => typeof relatedProduct === 'object') ?? []

  return (
    <React.Fragment>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
        type="application/ld+json"
      />

      <section className="bg-[#f8f5ef]">
        <div className="mx-auto max-w-[1560px] px-6 pb-20 pt-10 md:px-10 md:pb-24 md:pt-14">
          <div className="mb-8">
            <Button
              asChild
              variant="ghost"
              className="h-auto px-0 py-0 text-[10px] uppercase tracking-[0.34em] text-neutral-700 hover:bg-transparent hover:text-neutral-950"
              style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
            >
              <Link href="/shop" className="inline-flex items-center gap-2">
                <ChevronLeftIcon className="h-4 w-4" />
                Volver a shop
              </Link>
            </Button>
          </div>

          <div className="mb-8 border-t border-neutral-200" />

          <div className="rounded-[30px] border border-[#e7e2d9] bg-[linear-gradient(180deg,#ffffff_0%,#fbf9f5_100%)] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.04)] md:p-8 lg:p-10 xl:p-12">
            <div className="grid gap-10 xl:grid-cols-[1.08fr_0.92fr] xl:gap-14">
              <div>
                <div className="mb-6 flex items-center justify-between border-b border-neutral-200 pb-4">
                  <div>
                    <p
                      className="text-[10px] uppercase tracking-[0.42em] text-neutral-400"
                      style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                    >
                      Product
                    </p>
                  </div>

                  <div className="text-right">
                    <p
                      className="text-[10px] uppercase tracking-[0.34em] text-neutral-400"
                      style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                    >
                      {hasStock ? 'Disponible' : 'Agotado'}
                    </p>

                    {price ? (
                      <p
                        className="mt-2 text-[14px] font-[300] tracking-[-0.01em] text-neutral-600"
                        style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                      >
                        Desde {formatLuxuryPrice(price)}
                      </p>
                    ) : null}
                  </div>
                </div>

                <Suspense
                  fallback={
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] bg-neutral-100" />
                  }
                >
                  {Boolean(gallery?.length) ? (
                    <Gallery gallery={gallery} />
                  ) : (
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] bg-neutral-100" />
                  )}
                </Suspense>
              </div>

              <div className="xl:pt-2">
                <ProductDescription product={product} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {product.layout?.length ? <RenderBlocks blocks={product.layout} /> : null}

      {relatedProducts.length ? (
        <section className="bg-white">
          <div className="mx-auto max-w-[1560px] px-6 py-20 md:px-10 md:py-24">
            <div className="mb-12 flex flex-col gap-5 border-b border-neutral-200 pb-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-[440px]">
                <p
                  className="mb-3 text-[10px] uppercase tracking-[0.42em] text-neutral-400"
                  style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                >
                  Selección relacionada
                </p>

                <h2
                  className="text-[30px] font-[300] leading-[0.96] tracking-[-0.04em] text-neutral-950 md:text-[40px]"
                  style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                >
                  También podría interesarte
                </h2>
              </div>

              <Link
                href="/shop"
                className="inline-flex w-fit border-b border-neutral-900 pb-1 text-[10px] uppercase tracking-[0.34em] text-neutral-700 transition-opacity hover:opacity-60"
                style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
              >
                Ver colección completa
              </Link>
            </div>

            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((product) => (
                <li key={product.id} className="group">
                  <Link className="block" href={`/products/${product.slug}`}>
                    <div className="overflow-hidden rounded-[24px] bg-neutral-100">
                      <GridTileImage
                        label={{
                          amount: product.priceInUSD!,
                          title: product.title,
                        }}
                        media={product.meta?.image as Media}
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </React.Fragment>
  )
}

const queryProductBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    depth: 3,
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        ...(draft ? [] : [{ _status: { equals: 'published' } }]),
      ],
    },
    populate: {
      variants: {
        title: true,
        priceInUSD: true,
        inventory: true,
        options: true,
      },
    },
  })

  return result.docs?.[0] || null
}