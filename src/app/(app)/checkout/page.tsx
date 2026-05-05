import type { Metadata } from 'next'
import { Fragment } from 'react'

import { CheckoutPage } from '@/components/checkout/CheckoutPage'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export default function Checkout() {
  return (
    <div className="min-h-screen bg-[#f8f5ef]">
      {!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && (
        <div className="container py-20">
          <div className="rounded-[28px] border border-[#e8e1d6] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
            <p className="mb-4 text-[10px] uppercase tracking-[0.42em] text-neutral-400">
              Stripe
            </p>

            <h1 className="text-3xl font-[300] leading-[0.96] tracking-[-0.04em] text-neutral-950">
              Configura tus claves de pago
            </h1>

            <div className="mt-6 max-w-[60ch] text-[15px] leading-8 text-neutral-600">
              <Fragment>
                {'Para habilitar el checkout debes '}
                <a
                  href="https://dashboard.stripe.com/test/apikeys"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="border-b border-neutral-900 text-neutral-900"
                >
                  obtener tus claves de Stripe
                </a>
                {' y agregarlas como variables de entorno. Revisa también el '}
                <a
                  href="https://github.com/payloadcms/payload/blob/main/templates/ecommerce/README.md#stripe"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="border-b border-neutral-900 text-neutral-900"
                >
                  README
                </a>
                {' para más detalles.'}
              </Fragment>
            </div>
          </div>
        </div>
      )}

      <h1 className="sr-only">Checkout</h1>

      <CheckoutPage />
    </div>
  )
}

export const metadata: Metadata = {
  description: 'Checkout',
  openGraph: mergeOpenGraph({
    title: 'Checkout',
    url: '/checkout',
  }),
  title: 'Checkout | KIKÚ',
}