import { Image } from '@/components/Media/Image'
import Link from 'next/link'

export const KikuHome = ({ hero, categories }: any) => {
  const normalize = (text: string) =>
    text?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  const materialKeys = ['lino', 'cuerina', 'basic']

  const materialIcons: Record<string, string> = {
    lino: '/media/linofs.png',
    cuerina: '/media/cuerinaf.png',
    basic: '/media/basicof.png',
  }

  const shopByLookItems = [
    {
      image: '/media/shop-look-1.png.png',
      alt: 'Look editorial KIKÚ 1',
      href: '/shop',
    },
    {
      image: '/media/shop-look-2.png.png',
      alt: 'Look editorial KIKÚ 2',
      href: '/shop',
    },
    {
      image: '/media/shop-look-3.png',
      alt: 'Look editorial KIKÚ 3',
      href: '/shop',
    },
  ]

  const materials =
    materialKeys
      .map((key) => categories?.find((c: any) => normalize(c.title).includes(key)))
      .filter(Boolean) || []

  const getMaterialIcon = (title: string) => {
    const normalizedTitle = normalize(title)

    if (normalizedTitle.includes('lino')) return materialIcons.lino
    if (normalizedTitle.includes('cuerina')) return materialIcons.cuerina

    return materialIcons.basic
  }

  return (
    <main className="bg-[#1f2029] text-white">
      {/* HERO */}
      <section className="relative min-h-[100svh] overflow-hidden bg-[#1f2029]">
        {hero?.media && (
          <Image
            resource={hero.media}
            fill
            imgClassName="object-cover object-center"
            alt="Kiku Hero"
          />
        )}

        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1f2029]/95 via-[#1f2029]/68 to-[#1f2029]/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1f2029] via-transparent to-transparent" />

        <div className="container relative z-10 flex min-h-[92svh] items-center pt-20">
          <div className="max-w-[680px] pb-20">
            <h1 className="text-[50px] font-black leading-[0.9] tracking-[-0.055em] text-white sm:text-[76px] md:text-[96px] lg:text-[112px] xl:text-[124px]">
              Elegante,
              <br />
              <span className="text-[#d58cff]">atemporal,</span>
              <br />
              única
            </h1>

            <div className="mt-7 max-w-[510px] space-y-3 text-[13px] leading-6 text-white/76 sm:text-sm sm:leading-7 md:text-[15px]">
              <p>Creemos que la atemporalidad es lo más valioso.</p>
              <p>Trabajamos con propósito, apoyando y empoderando mujeres.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MATERIALS ARCH CARDS */}
      <section className="relative bg-[#1f2029] px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-28">
        <div className="container">
          <div className="grid grid-cols-1 gap-14 sm:grid-cols-3 sm:gap-8 lg:gap-12">
            {materials.map((cat: any) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className="group block"
              >
                <div className="text-center">
                  <div className="relative mx-auto aspect-[0.92/1] w-full max-w-[380px] overflow-hidden rounded-t-full bg-white/5">
                    {cat?.media && (
                      <Image
                        resource={cat.media}
                        fill
                        imgClassName="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                        alt={cat.title}
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>

                  <h2 className="mt-4 font-serif text-[34px] font-bold leading-none tracking-[-0.04em] text-white sm:text-[28px] md:text-[34px] lg:text-[42px]">
                    {normalize(cat.title).includes('basic') ? 'Básicos' : cat.title}
                  </h2>

                  <div className="mt-4 flex justify-center">
                    <img
                      src={getMaterialIcon(cat.title)}
                      alt=""
                      className="h-[58px] w-[58px] object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.28)] transition-transform duration-500 group-hover:scale-110 sm:h-[70px] sm:w-[70px] lg:h-[82px] lg:w-[82px]"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP BY LOOK TITLE BAR */}
      <section className="bg-[#efedf0] py-5 text-center">
        <h2 className="text-sm font-black uppercase tracking-[0.16em] text-[#1f2029] sm:text-base">
          Shop by Look
        </h2>
      </section>

      {/* SHOP BY LOOK */}
      <section className="bg-[#1f2029] py-14 sm:py-16 lg:py-20">
        <div className="container">
          <div className="grid grid-cols-1 gap-9 sm:grid-cols-3 lg:gap-12">
            {shopByLookItems.map((item) => (
              <Link key={item.image} href={item.href} className="group block">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden bg-white/5">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                    <div className="flex h-8 min-w-[150px] items-center justify-center bg-white px-7 text-[10px] font-bold uppercase tracking-[0.16em] text-[#1f2029] transition-all duration-300 group-hover:bg-[#d58cff] group-hover:text-white">
                      Shop now
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
