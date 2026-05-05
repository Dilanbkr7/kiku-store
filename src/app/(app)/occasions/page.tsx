import configPromise from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'

const seasonMeta = {
  summer: {
    title: 'SUMMER',
    subtitle: 'LIGHTNESS WITH PRESENCE',
    description:
      'Piezas ligeras, refinadas y silenciosas, pensadas para una presencia elegante en días de mayor claridad.',
    cover: '/media/occasions/primc.png',
  },
  autumn: {
    title: 'AUTUMN',
    subtitle: 'TEXTURE AND BALANCE',
    description:
      'Texturas con carácter, tonos profundos y una feminidad serena para una transición sofisticada.',
    cover: '/media/occasions/oton.png',
  },
  winter: {
    title: 'WINTER',
    subtitle: 'QUIET SOPHISTICATION',
    description:
      'Una selección con estructura, profundidad y una elegancia contenida diseñada para destacar con sutileza.',
    cover: '/media/occasions/parque.png',
  },
  spring: {
    title: 'SPRING',
    subtitle: 'RENEWED FEMININITY',
    description:
      'Líneas más suaves, presencia luminosa y piezas que acompañan nuevos comienzos con naturalidad.',
    cover: '/media/occasions/vera.png',
  },
} as const

function SummerIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v3.2M12 18.3v3.2M21.5 12h-3.2M5.7 12H2.5M18.7 5.3l-2.2 2.2M7.5 16.5l-2.2 2.2M18.7 18.7l-2.2-2.2M7.5 7.5L5.3 5.3" />
    </svg>
  )
}

function AutumnIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M12.5 3.5c3.8 2.2 6.2 5.4 6.2 9.1 0 4.2-3 7.4-7.1 7.4-3.7 0-6.3-2.7-6.3-6.1 0-3.5 2.4-6.6 7.2-10.4Z" />
      <path d="M12 8.5c.3 3.7-.6 7.3-2.4 10.4" />
    </svg>
  )
}

function WinterIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M12 2.8v18.4M4.8 7l14.4 10M19.2 7 4.8 17M7.2 4.8 12 12l4.8-7.2M7.2 19.2 12 12l4.8 7.2" />
    </svg>
  )
}

function SpringIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M12 20.5V10.3" />
      <path d="M12 10.3c0-3.8 2.2-6.4 6.2-7.3-.1 3.9-2.1 6.6-6.2 7.3Z" />
      <path d="M12 13.2c-.2-3.4-2.2-5.6-6.2-6.2.2 3.8 2.2 6 6.2 6.2Z" />
    </svg>
  )
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

function formatLuxuryPrice(priceInUSD?: number | null) {
  if (typeof priceInUSD !== 'number') return ''
  return '$' + Math.floor(priceInUSD / 100)
}

export default async function OccasionsPage() {
  const payload = await getPayload({ config: configPromise })

  const seasons = ['summer', 'autumn', 'winter', 'spring'] as const

  const data = await Promise.all(
    seasons.map(async (season) => {
      const res = await payload.find({
        collection: 'products',
        limit: 4,
        sort: '-createdAt',
        where: {
          and: [
            {
              _status: {
                equals: 'published',
              },
            },
            {
              seasons: {
                in: [season],
              },
            },
          ],
        },
      })

      return {
        season,
        products: res.docs,
      }
    }),
  )

  return (
    <main className="mx-auto max-w-[1520px] px-6 py-16 md:px-10 md:py-24">
      {/* HERO */}
      <section className="mb-28">
        <div className="mx-auto flex max-w-[1080px] flex-col items-center text-center">
          <p
            className="mb-5 text-[10px] uppercase tracking-[0.5em] text-neutral-400"
            style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
          >
            OCCASIONS
          </p>

          <h1
            className="max-w-[12ch] text-4xl font-[300] leading-[0.9] tracking-[-0.07em] text-neutral-950 md:text-[72px]"
            style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
          >
            Edits con presencia.
            <br />
            Quiet luxury
            <br />
            para cada season.
          </h1>

          <p
            className="mt-8 max-w-[58ch] text-[15px] leading-8 text-neutral-500 md:text-[16px]"
            style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
          >
            Una selección que mezcla textura, intención y elegancia contemporánea para acompañar distintos moods del año.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-[1040px] border-t border-neutral-200 pt-10">
          <div className="grid grid-cols-2 gap-y-8 md:grid-cols-4">
            <div className="group flex flex-col items-center gap-3 text-neutral-900">
              <div className="transition-transform duration-500 group-hover:scale-110">
                <SummerIcon />
              </div>
              <span
                className="text-[11px] uppercase tracking-[0.32em] text-neutral-500 transition-opacity duration-300 group-hover:opacity-70"
                style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
              >
                Summer
              </span>
            </div>

            <div className="group flex flex-col items-center gap-3 text-neutral-900">
              <div className="transition-transform duration-500 group-hover:scale-110">
                <AutumnIcon />
              </div>
              <span
                className="text-[11px] uppercase tracking-[0.32em] text-neutral-500 transition-opacity duration-300 group-hover:opacity-70"
                style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
              >
                Autumn
              </span>
            </div>

            <div className="group flex flex-col items-center gap-3 text-neutral-900">
              <div className="transition-transform duration-500 group-hover:scale-110">
                <WinterIcon />
              </div>
              <span
                className="text-[11px] uppercase tracking-[0.32em] text-neutral-500 transition-opacity duration-300 group-hover:opacity-70"
                style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
              >
                Winter
              </span>
            </div>

            <div className="group flex flex-col items-center gap-3 text-neutral-900">
              <div className="transition-transform duration-500 group-hover:scale-110">
                <SpringIcon />
              </div>
              <span
                className="text-[11px] uppercase tracking-[0.32em] text-neutral-500 transition-opacity duration-300 group-hover:opacity-70"
                style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
              >
                Spring
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SEASONS */}
      <div className="flex flex-col gap-32">
        {data.map(({ season, products }, index) => {
          const isReversed = index % 2 === 1

          return (
            <section
              key={season}
              id={season}
              className={`grid items-start gap-12 border-t border-neutral-200 pt-12 md:grid-cols-[340px_minmax(0,1fr)] md:gap-20 ${
                isReversed ? 'md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1' : ''
              }`}
            >
              {/* TEXT COLUMN */}
              <div className="h-fit md:sticky md:top-28">
                <p
                  className="mb-4 text-[10px] uppercase tracking-[0.38em] text-neutral-400"
                  style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                >
                  {seasonMeta[season].subtitle}
                </p>

                <h2
                  className="text-[42px] font-[300] leading-none tracking-[-0.045em] text-neutral-950 md:text-[68px]"
                  style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                >
                  {seasonMeta[season].title}
                </h2>

                <div className="mt-6 h-px w-16 bg-neutral-200" />

                <p
                  className="mt-6 max-w-[30ch] text-[15px] leading-8 text-neutral-500"
                  style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                >
                  {seasonMeta[season].description}
                </p>
              </div>

              {/* VISUAL COLUMN */}
              <div>
                {/* COVER */}
                <div className="group mb-10 overflow-hidden rounded-[30px] bg-neutral-100">
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={seasonMeta[season].cover}
                      alt={seasonMeta[season].title}
                      fill
                      className="object-cover object-center transition duration-1000 ease-out group-hover:scale-[1.035]"
                    />
                    <div className="absolute inset-0 bg-black/[0.02] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  </div>
                </div>

                {/* PRODUCTS */}
                {products.length > 0 && (
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    {products.map((product: any) => {
                      const image = getProductImage(product)

                      return (
                        <Link
                          key={product.id}
                          href={`/products/${product.slug}`}
                          className="group block"
                        >
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
                              className="shrink-0 text-[15px] font-light tracking-[0.03em] text-neutral-700 transition-all duration-300 group-hover:opacity-70"
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
              </div>
            </section>
          )
        })}
      </div>
    </main>
  )
}