import { Image } from '@/components/Media/Image'
import { ProductGridItem } from '@/components/ProductGridItem'
import Link from 'next/link'

export const KikuHome = ({ newArrivals, hero, categories }: any) => {
  const normalize = (text: string) =>
    text?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  const orderKeys = ['lino', 'cuerina', 'basic', 'limit']

  return (
    <main>
      {/* HERO */}
      <section className="relative flex h-[100vh] w-full items-center justify-center bg-neutral-900">
        <div className="absolute inset-0 opacity-90">
          {hero?.media && (
            <Image
              resource={hero.media}
              fill
              imgClassName="object-cover scale-105"
              alt="Kiku Banner"
            />
          )}
        </div>

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 space-y-10 px-4 text-center text-white">
          <h1 className="text-5xl font-serif italic leading-tight tracking-tight md:text-8xl">
            Elegante, atemporal, única
          </h1>

          <Link
            href="/shop"
            className="inline-block border border-white px-12 py-5 text-[10px] uppercase tracking-[0.5em] transition-all duration-500 hover:bg-white hover:text-black"
          >
            Descubre la Colección
          </Link>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="relative overflow-hidden py-40">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f6f2] via-white to-[#f8f6f2]" />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-multiply"
          style={{
            backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
          }}
        />

        <div className="relative container text-center">
          <div className="mb-20 space-y-4">
            <p className="text-[10px] uppercase tracking-[0.6em] text-neutral-400">
              Selección por Material
            </p>

            <h2 className="text-3xl font-serif italic tracking-tight text-neutral-900 md:text-5xl">
              Piezas Icónicas
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {orderKeys.map((key) => {
              const cat = categories?.find((c: any) => normalize(c.title).includes(key))

              if (!cat) return null

              const media = cat.media
              const imageUrl =
                typeof media === 'object' && media !== null ? media.url : null

              return (
                <Link key={cat.id} href={`/shop?category=${cat.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={cat.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                      />
                    )}

                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-90 transition-all duration-500 group-hover:opacity-100">
                      <span className="text-center text-xs uppercase tracking-[0.4em] text-white">
                        {normalize(cat.title).includes('basic') ? 'BASICS' : cat.title}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="bg-white py-32">
        <div className="container">
          <div className="mb-16 flex items-end justify-between gap-6 border-b border-neutral-200 pb-6">
            <div className="space-y-3">
              <p
                className="text-[10px] uppercase tracking-[0.42em] text-neutral-400"
                style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
              >
                New arrivals
              </p>

              <h2
                className="text-[34px] font-[400] leading-none tracking-[-0.04em] text-neutral-950 md:text-[46px]"
                style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
              >
                New In
              </h2>
            </div>

            <Link
              href="/shop"
              className="inline-flex border-b border-neutral-900 pb-1 text-[10px] uppercase tracking-[0.34em] text-neutral-700 transition-opacity duration-300 hover:opacity-60"
              style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
            >
              Ver todo
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-14 lg:grid-cols-4">
            {newArrivals?.map((product: any) => (
              <ProductGridItem key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}