import configPromise from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'

type SearchParams = Promise<{
  category?: string
  season?: string
}>

const seasonMeta = {
  summer: { title: 'SUMMER' },
  autumn: { title: 'AUTUMN' },
  winter: { title: 'WINTER' },
  spring: { title: 'SPRING' },
} as const

const categoryMeta = [
  { title: 'Basics', slug: 'basics' },
  { title: 'Cuerina', slug: 'cuerina' },
  { title: 'Limitados', slug: 'limitados' },
  { title: 'Lino', slug: 'lino' },
]

function formatLuxuryPrice(priceInUSD?: number | null) {
  if (typeof priceInUSD !== 'number') return ''
  return '$' + Math.floor(priceInUSD / 100)
}

function getProductImage(product: any) {
  if (product?.meta?.image && typeof product.meta.image === 'object' && product.meta.image?.url) {
    return product.meta.image
  }

  if (Array.isArray(product?.gallery) && product.gallery.length > 0) {
    const firstGalleryImage = product.gallery[0]?.image
    if (firstGalleryImage && typeof firstGalleryImage === 'object' && firstGalleryImage?.url) {
      return firstGalleryImage
    }
  }

  return null
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const payload = await getPayload({ config: configPromise })
  const resolvedSearchParams = await searchParams

  const selectedCategory = resolvedSearchParams?.category || ''
  const selectedSeason = resolvedSearchParams?.season || ''

  let categoryID: number | null = null

  if (selectedCategory) {
    const categoryResult = await payload.find({
      collection: 'categories',
      limit: 1,
      where: {
        slug: {
          equals: selectedCategory,
        },
      },
    })

    const foundCategory = categoryResult.docs?.[0]
    if (foundCategory?.id) categoryID = foundCategory.id
  }

  const filters: any[] = [
    {
      _status: {
        equals: 'published',
      },
    },
  ]

  if (categoryID) {
    filters.push({
      categories: {
        in: [categoryID],
      },
    })
  }

  if (selectedSeason) {
    filters.push({
      seasons: {
        in: [selectedSeason],
      },
    })
  }

  const productsResult = await payload.find({
    collection: 'products',
    depth: 2,
    limit: 24,
    sort: '-createdAt',
    where: {
      and: filters,
    },
  })

  const products = productsResult.docs || []

  const currentCategoryLabel =
    categoryMeta.find((item) => item.slug === selectedCategory)?.title || null

  const currentSeasonLabel =
    selectedSeason && selectedSeason in seasonMeta
      ? seasonMeta[selectedSeason as keyof typeof seasonMeta].title
      : null

  let heroTitle = 'Shop'

  if (currentCategoryLabel && currentSeasonLabel) {
    heroTitle = currentCategoryLabel + ' · ' + currentSeasonLabel
  } else if (currentCategoryLabel) {
    heroTitle = currentCategoryLabel
  } else if (currentSeasonLabel) {
    heroTitle = currentSeasonLabel
  }

  const heroDescription =
    currentCategoryLabel || currentSeasonLabel
      ? 'Explora una selección refinada filtrada por material o temporada dentro del universo KIKÚ.'
      : 'Descubre la selección completa de KIKÚ: siluetas limpias, materiales honestos y piezas pensadas para una elegancia atemporal.'

  return (
    <main className="min-w-0">
      {/* HERO */}
      <section className="mb-12 border-b border-neutral-200 pb-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="mb-5 text-[10px] uppercase tracking-[0.45em] text-neutral-400">
              Shop
            </p>

            <h1
              className="max-w-[8ch] text-4xl font-[300] leading-[0.9] tracking-[-0.06em] text-neutral-950 md:text-6xl"
              style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
            >
              {heroTitle}
            </h1>
          </div>

          <div className="max-w-[38ch] lg:ml-auto">
            <p
              className="text-[15px] leading-8 text-neutral-600"
              style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
            >
              {heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* TOP BAR */}
      <section className="mb-10 flex items-center justify-between gap-6 border-b border-neutral-200 pb-5">
        <p
          className="text-[10px] uppercase tracking-[0.34em] text-neutral-400"
          style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
        >
          {products.length} pieza{products.length === 1 ? '' : 's'}
        </p>

        <Link
          href="/occasions"
          className="inline-flex border-b border-neutral-900 pb-1 text-[10px] uppercase tracking-[0.34em] text-neutral-700 transition-opacity hover:opacity-60"
          style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
        >
          Ver página editorial
        </Link>
      </section>

      {/* GRID */}
      {products.length === 0 ? (
        <div className="rounded-[28px] border border-neutral-200 bg-neutral-50 px-8 py-12">
          <p
            className="text-[14px] leading-7 text-neutral-500"
            style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
          >
            No encontramos productos con esos filtros todavía.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {products.map((product: any) => {
            const image = getProductImage(product)

            return (
              <Link key={product.id} href={'/products/' + product.slug} className="group block">
                <div className="overflow-hidden rounded-[24px] bg-neutral-100">
                  {image?.url ? (
                    <div className="relative aspect-[4/5] w-full">
                      <Image
                        src={image.url}
                        alt={product.title}
                        fill
                        className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-black/[0.02] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>
                  ) : (
                    <div className="aspect-[4/5] w-full bg-neutral-100" />
                  )}
                </div>

                <div className="mt-4 flex items-start justify-between gap-5">
                  <div className="min-w-0">
                    <p
                      className="text-[15px] tracking-[-0.01em] text-neutral-900 transition-all duration-300 group-hover:opacity-70"
                      style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                    >
                      {product.title}
                    </p>
                  </div>

                  <p
                    className="shrink-0 text-[15px] font-[300] tracking-[-0.01em] text-neutral-500 transition-all duration-300 group-hover:opacity-70"
                    style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                  >
                    {formatLuxuryPrice(product.priceInUSD)}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </main>
  )
}