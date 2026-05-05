import { ProductGridItem } from '@/components/ProductGridItem'
import type { Metadata, Product } from '@/payload-types'
import configPromise from '@payload-config'
import Link from 'next/link'
import { getPayload } from 'payload'

export default async function NewArrivalsPage() {
  const payload = await getPayload({ config: configPromise })

  const productsQuery = await payload.find({
    collection: 'products',
    draft: false,
    limit: 8,
    overrideAccess: false,
    pagination: false,
    sort: '-createdAt',
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  const products = productsQuery.docs as Product[]

  return (
    <main className="bg-[#f8f5ef] text-neutral-900">
      {/* HERO */}
      <section className="border-b border-[#e7e2d9]">
        <div className="container py-20 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div className="max-w-[620px]">
              <p className="mb-5 text-[10px] uppercase tracking-[0.48em] text-neutral-400">
                NEW ARRIVALS
              </p>

              <h1 className="max-w-[10ch] text-4xl font-[300] leading-[0.92] tracking-[-0.06em] text-neutral-950 md:text-6xl !font-sans !not-italic">
                Nuevas piezas para un guardarropa construido con intención.
              </h1>

              <div className="mt-10 h-px w-24 bg-[#d9d2c7]" />

              <p className="mt-10 max-w-[54ch] text-[16px] leading-8 text-neutral-600">
                Descubre las últimas incorporaciones a la selección KIKÚ: siluetas
                limpias, texturas refinadas y piezas pensadas para elevar lo cotidiano
                con una elegancia silenciosa.
              </p>

              <Link
                href="/shop"
                className="mt-10 inline-flex border border-neutral-900 px-8 py-4 text-[10px] uppercase tracking-[0.35em] text-neutral-900 transition-all hover:bg-neutral-900 hover:text-white"
              >
                Ver colección completa
              </Link>
            </div>

            <div className="overflow-hidden rounded-[28px] border border-[#e7e2d9] bg-white/60">
              <img
                src="/media/chicakiku.png"
                alt="New arrivals KIKÚ"
                className="h-[520px] w-full object-cover transition duration-700 hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="container py-16 md:py-20">
        <div className="max-w-[760px]">
          <p className="mb-4 text-[10px] uppercase tracking-[0.42em] text-neutral-400">
            Latest selection
          </p>

          <h2 className="max-w-[14ch] text-3xl font-[300] leading-[0.98] tracking-[-0.05em] text-neutral-950 md:text-5xl !font-sans !not-italic">
            Diseñadas para llegar con fuerza, sutileza y presencia.
          </h2>

          <p className="mt-8 max-w-[58ch] text-[16px] leading-8 text-neutral-600">
            Esta selección reúne nuevas prendas que conservan el lenguaje de KIKÚ:
            una visión femenina, atemporal y precisa, pensada para mujeres que eligen
            vestir con intención.
          </p>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="border-t border-[#e7e2d9]">
        <div className="container py-16 md:py-20">
          {products.length === 0 ? (
            <div className="border border-[#e7e2d9] bg-white/70 px-8 py-12">
              <p className="text-[15px] leading-7 text-neutral-600">
                Aún no hay nuevas piezas publicadas.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
              {products.map((product) => (
                <ProductGridItem key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="border-t border-[#e7e2d9]">
        <div className="container py-20 md:py-24">
          <div className="max-w-[820px]">
            <p className="mb-4 text-[10px] uppercase tracking-[0.42em] text-neutral-400">
              KIKÚ
            </p>

            <h3 className="max-w-[14ch] text-3xl font-[300] leading-[0.98] tracking-[-0.05em] text-neutral-950 md:text-5xl !font-sans !not-italic">
              Nuevas piezas, misma visión atemporal.
            </h3>

            <p className="mt-8 max-w-[54ch] text-[16px] leading-8 text-neutral-600">
              Explora la colección completa y descubre prendas que elevan la presencia
              cotidiana con una estética limpia, cuidada y duradera.
            </p>

            <Link
              href="/shop"
              className="mt-10 inline-flex border-b border-neutral-900 pb-1 text-[10px] uppercase tracking-[0.35em] text-neutral-700 transition-opacity hover:opacity-60"
            >
              Explorar todo
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export const metadata: Metadata = {
  title: 'NEW ARRIVALS | KIKÚ',
  description:
    'Descubre las últimas incorporaciones a la selección KIKÚ.',
}