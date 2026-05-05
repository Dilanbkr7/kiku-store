import type { Footer as FooterType } from '@/payload-types'

import FooterMenu from '@/components/Footer/menu'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Instagram } from 'lucide-react'
import Link from 'next/link'
import React, { Suspense } from 'react'

const { COMPANY_NAME, SITE_NAME } = process.env
const BRAND_NAME = SITE_NAME || COMPANY_NAME || 'KIKU'
const INSTAGRAM_URL = 'https://www.instagram.com/kiku_latin_america/'

export async function Footer() {
  const footer: FooterType = await getCachedGlobal('footer', 1)

  const menu = footer?.navItems || []
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200'

  return (
    <footer className="border-t border-[#e7e2d9] bg-[#f8f5ef] text-neutral-600">
      <div className="container py-20 md:py-24">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-4">
          {/* BRAND */}
          <div className="max-w-[300px]">
            <p className="mb-5 text-[10px] uppercase tracking-[0.55em] text-neutral-400">
              KIKÚ
            </p>

            <p className="text-[16px] leading-8 text-neutral-600">
              Siluetas atemporales, piezas cuidadosamente seleccionadas y una
              experiencia de compra pensada para una mujer que viste con intención.
            </p>

            <div className="mt-8">
              <p className="mb-4 text-[10px] uppercase tracking-[0.42em] text-neutral-400">
                Follow Us
              </p>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-[15px] text-neutral-800 transition-opacity hover:opacity-60"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ded7cc] bg-white/70">
                  <Instagram className="h-4 w-4" />
                </span>
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* SHOP */}
          <div>
            <h3 className="mb-6 text-[10px] uppercase tracking-[0.42em] text-neutral-400">
              Shop
            </h3>

            <Suspense
              fallback={
                <div className="flex max-w-[220px] flex-col gap-3">
                  <div className={skeleton} />
                  <div className={skeleton} />
                  <div className={skeleton} />
                  <div className={skeleton} />
                </div>
              }
            >
              <FooterMenu menu={menu} />
            </Suspense>
          </div>

          {/* HELP */}
          <div>
            <h3 className="mb-6 text-[10px] uppercase tracking-[0.42em] text-neutral-400">
              Ayuda
            </h3>

            <nav>
              <ul className="flex flex-col gap-4 text-[16px] leading-7">
                <li>
                  <Link href="/contact" className="transition-opacity hover:opacity-60">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="transition-opacity hover:opacity-60">
                    Preguntas frecuentes
                  </Link>
                </li>
                <li>
                  <Link href="/shipping-returns" className="transition-opacity hover:opacity-60">
                    Envíos y devoluciones
                  </Link>
                </li>
                <li>
                  <Link href="/care-guide" className="transition-opacity hover:opacity-60">
                    Guía de cuidados
                  </Link>
                </li>
                <li>
                  <Link href="/wishlist" className="transition-opacity hover:opacity-60">
                    Lista de deseos
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* BRAND / LEGAL */}
          <div>
            <h3 className="mb-6 text-[10px] uppercase tracking-[0.42em] text-neutral-400">
              Marca
            </h3>

            <nav>
              <ul className="flex flex-col gap-4 text-[16px] leading-7">
                <li>
                  <Link href="/about-us" className="transition-opacity hover:opacity-60">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="transition-opacity hover:opacity-60">
                    Política de privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/terms-conditions" className="transition-opacity hover:opacity-60">
                    Términos y condiciones
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-[#e7e2d9]">
        <div className="container flex flex-col items-center justify-center gap-3 py-6 text-center text-[11px] uppercase tracking-[0.28em] text-neutral-400">
          <p>All rights reserved</p>

          <p className="tracking-[0.35em]">
            Siluetas atemporales · Edición KIKÚ · Piezas Únicas
          </p>
        </div>
      </div>
    </footer>
  )
}