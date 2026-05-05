'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ChevronRight, MessageCircle, Phone } from 'lucide-react'
import Link from 'next/link'

type Props = {
  productTitle: string
}

const WHATSAPP_NUMBER = '593999099325'
const PHONE_NUMBER = '+593 99 909 9325'

export function ProductAssistantDialog({ productTitle }: Props) {
  const whatsappMessage = encodeURIComponent(
    'Hola KIKÚ, quiero recibir asesoría sobre este producto: ' + productTitle,
  )

  const whatsappHref = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + whatsappMessage
  const phoneHref = 'tel:' + PHONE_NUMBER.replace(/\s+/g, '')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center border-b border-neutral-900 pb-1 text-[10px] uppercase tracking-[0.34em] text-neutral-700 transition-all duration-300 hover:opacity-60"
          style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
        >
          Hablar con un asistente KIKÚ
        </button>
      </DialogTrigger>

      <DialogContent
        className="max-w-[760px] rounded-none border-0 bg-transparent p-0 shadow-none data-[state=open]:duration-700 data-[state=open]:slide-in-from-bottom-8 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[0.985] data-[state=closed]:duration-500"
        showCloseButton={true}
      >
        <div className="overflow-hidden rounded-[28px] border border-[#e7e2d9] bg-[linear-gradient(180deg,#ffffff_0%,#f8f5ef_100%)] shadow-[0_30px_80px_rgba(0,0,0,0.08)]">
          <div className="relative overflow-hidden px-8 py-10 md:px-12 md:py-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),transparent_38%)]" />

            <div className="relative">
              <p
                className="mb-4 text-[10px] uppercase tracking-[0.42em] text-neutral-400"
                style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
              >
                Asesoría KIKÚ
              </p>

              <DialogTitle
                className="max-w-[10ch] text-left text-4xl font-[300] leading-[0.92] tracking-[-0.05em] text-neutral-950 md:text-5xl"
                style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
              >
                Habla con KIKÚ
              </DialogTitle>

              <DialogDescription
                className="mt-6 max-w-[36ch] text-left text-[15px] leading-8 text-neutral-600"
                style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
              >
                Te ayudamos a elegir la talla ideal, confirmar disponibilidad y resolver tu compra con una atención más directa.
              </DialogDescription>

              <div className="mt-10 rounded-[22px] border border-neutral-200 bg-white/80 px-6 py-6">
                <p
                  className="mb-3 text-[10px] uppercase tracking-[0.34em] text-neutral-400"
                  style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                >
                  Consulta actual
                </p>

                <h3
                  className="max-w-[14ch] text-3xl font-[300] leading-[1] tracking-[-0.04em] text-neutral-950 md:text-4xl"
                  style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                >
                  {productTitle}
                </h3>

                <p
                  className="mt-5 max-w-[34ch] text-[15px] leading-8 text-neutral-600"
                  style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                >
                  Atención personalizada para acompañarte antes de finalizar tu compra.
                </p>
              </div>

              <div className="mt-8 grid gap-4">
                <a
                  href={phoneHref}
                  className="group flex items-center justify-between rounded-[20px] border border-neutral-200 bg-white px-5 py-5 transition-all duration-300 hover:border-neutral-300 hover:shadow-[0_14px_30px_rgba(0,0,0,0.05)]"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900 transition-transform duration-300 group-hover:scale-105">
                      <Phone className="h-4 w-4" />
                    </span>

                    <div>
                      <p
                        className="mb-1 text-[10px] uppercase tracking-[0.34em] text-neutral-400"
                        style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                      >
                        Llámanos
                      </p>
                      <p
                        className="text-[16px] leading-7 text-neutral-950"
                        style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                      >
                        {PHONE_NUMBER}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="h-4 w-4 text-neutral-400 transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-[20px] border border-neutral-200 bg-white px-5 py-5 transition-all duration-300 hover:border-neutral-300 hover:shadow-[0_14px_30px_rgba(0,0,0,0.05)]"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900 transition-transform duration-300 group-hover:scale-105">
                      <MessageCircle className="h-4 w-4" />
                    </span>

                    <div>
                      <p
                        className="mb-1 text-[10px] uppercase tracking-[0.34em] text-neutral-400"
                        style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                      >
                        WhatsApp
                      </p>
                      <p
                        className="text-[16px] leading-7 text-neutral-950"
                        style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                      >
                        Asesoría inmediata
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="h-4 w-4 text-neutral-400 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>

              <div className="mt-10 border-t border-neutral-200 pt-6">
                <div className="flex flex-col gap-4">
                  <Link
                    href="/about-us"
                    className="group flex items-center justify-between text-[14px] text-neutral-800 transition-opacity hover:opacity-65"
                    style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                  >
                    <span>Preguntas frecuentes</span>
                    <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/shop"
                    className="group flex items-center justify-between text-[14px] text-neutral-800 transition-opacity hover:opacity-65"
                    style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                  >
                    <span>Explorar colección</span>
                    <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}