'use client'

import { CheckoutForm } from '@/components/forms/CheckoutForm'
import { Message } from '@/components/Message'
import { Price } from '@/components/Price'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/providers/Auth'
import { useCart, usePayments } from '@payloadcms/plugin-ecommerce/client/react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Link from 'next/link'
import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react'

const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
const stripePromise = STRIPE_PUBLISHABLE_KEY ? loadStripe(STRIPE_PUBLISHABLE_KEY) : null

type DeliveryCountry = 'ecuador' | 'colombia' | 'usa'
type ShippingMethod =
  | 'local'
  | 'servientrega'
  | 'international_co'
  | 'international_us'

export const CheckoutPage: React.FC = () => {
  const { cart } = useCart()
  const { initiatePayment } = usePayments()
  const { user } = useAuth()

  const [deliveryCountry, setDeliveryCountry] = useState<DeliveryCountry>('ecuador')
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('local')
  const [paymentData, setPaymentData] = useState<any>(null)
  const [processingPayment, setProcessingPayment] = useState(false)
  const [customerEmail, setCustomerEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [paymentError, setPaymentError] = useState('')

  useEffect(() => {
    if (user?.email) {
      setCustomerEmail(user.email)
    }
  }, [user])

  useEffect(() => {
    if (deliveryCountry === 'ecuador') setShippingMethod('local')
    if (deliveryCountry === 'colombia') setShippingMethod('international_co')
    if (deliveryCountry === 'usa') setShippingMethod('international_us')
  }, [deliveryCountry])

  // TODO EN CENTAVOS
  const shippingCost = useMemo(() => {
    switch (shippingMethod) {
      case 'local':
        return 0
      case 'servientrega':
        return 500
      case 'international_co':
        return 1500
      case 'international_us':
        return 2500
      default:
        return 0
    }
  }, [shippingMethod])

  const computedSubtotal = useMemo(() => {
    if (!cart?.items?.length) return 0

    return cart.items.reduce((total: number, item: any) => {
      const product = item.product
      const variant = item.variant

      if (!product || typeof product !== 'object') return total

      const unitPrice =
        variant && typeof variant === 'object' && typeof variant.priceInUSD === 'number'
          ? variant.priceInUSD
          : typeof product.priceInUSD === 'number'
            ? product.priceInUSD
            : 0

      return total + unitPrice * (item.quantity || 0)
    }, 0)
  }, [cart])

  const total = computedSubtotal + shippingCost

  const totalItems = useMemo(() => {
    return cart?.items?.reduce((acc: number, item: any) => acc + (item.quantity || 0), 0) || 0
  }, [cart])

  const validateEmail = useCallback((email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }, [])

  const getShippingLabel = useCallback(() => {
    switch (shippingMethod) {
      case 'local':
        return 'Retiro en showroom'
      case 'servientrega':
        return 'Servientrega'
      case 'international_co':
        return 'Envío internacional Colombia'
      case 'international_us':
        return 'Envío internacional USA'
      default:
        return 'Envío'
    }
  }, [shippingMethod])

  const handlePayment = useCallback(async () => {
    const normalizedEmail = customerEmail.trim().toLowerCase()

    if (!validateEmail(normalizedEmail)) {
      setEmailError('Ingresa un correo válido para continuar.')
      return
    }

    setEmailError('')
    setPaymentError('')

    if (!STRIPE_PUBLISHABLE_KEY) {
      setPaymentError(
        'Stripe aún no está configurado. Puedes dejar esta parte lista y conectar las claves cuando el cliente las comparta.',
      )
      return
    }

    try {
      const data = await initiatePayment('stripe', {
        additionalData: {
          deliveryCountry,
          shippingMethod,
          shippingCost,
          total,
          customerEmail: normalizedEmail,
        },
      })

      if (data) {
        setPaymentData(data)
        return
      }

      setPaymentError('No se pudo iniciar el pago. Revisa la configuración de Stripe.')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error initiating payment.'
      setPaymentError(msg)
    }
  }, [
    customerEmail,
    deliveryCountry,
    initiatePayment,
    shippingCost,
    shippingMethod,
    total,
    validateEmail,
  ])

  if (!cart?.items?.length) {
    return (
      <main className="min-h-screen bg-[#f8f5ef] text-neutral-900">
        <div className="mx-auto flex min-h-[70vh] max-w-[900px] items-center justify-center px-6 py-24">
          <div className="text-center">
            <p
              className="mb-4 text-[10px] uppercase tracking-[0.42em] text-neutral-400"
              style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
            >
              Checkout
            </p>

            <h1
              className="text-4xl font-[400] leading-[1.02] tracking-[-0.04em] text-neutral-950 md:text-5xl"
              style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
            >
              Tu carrito está vacío
            </h1>

            <p
              className="mx-auto mt-5 max-w-[34ch] text-[15px] leading-8 text-neutral-500"
              style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
            >
              Añade piezas a tu selección para continuar con el checkout.
            </p>

            <div className="mt-8">
              <Button asChild className="rounded-full">
                <Link href="/shop">Explorar colección</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-neutral-900">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-20">
        <div className="mb-16 max-w-[760px]">
          <p
            className="mb-4 text-[10px] uppercase tracking-[0.42em] text-neutral-400"
            style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
          >
            Checkout
          </p>

          <h1
            className="max-w-[12ch] text-[42px] font-[400] leading-[0.95] tracking-[-0.05em] text-neutral-950 md:text-[62px]"
            style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
          >
            Finaliza tu compra con calma y claridad.
          </h1>

          <p
            className="mt-6 max-w-[52ch] text-[15px] leading-8 text-neutral-500"
            style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
          >
            Continúa como invitado o accede a tu cuenta. Tu pago se procesará de forma segura.
          </p>
        </div>

        <div className="grid gap-16 xl:grid-cols-[minmax(0,1fr)_420px]">
          <section className="space-y-10">
            <div className="rounded-[28px] border border-[#e5e0d8] bg-white px-8 py-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
              <p
                className="mb-3 text-[10px] uppercase tracking-[0.35em] text-neutral-400"
                style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
              >
                Contacto
              </p>

              <h2
                className="mb-6 text-[28px] font-[400] leading-[1] tracking-[-0.03em] text-neutral-950"
                style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
              >
                Continúa tu compra
              </h2>

              <Input
                type="email"
                value={customerEmail}
                onChange={(e) => {
                  setCustomerEmail(e.target.value)
                  if (emailError) setEmailError('')
                }}
                placeholder="correo@ejemplo.com"
                className="h-14 rounded-full border-[#d9d3c8] px-6 text-[14px] text-neutral-900 placeholder:text-neutral-400"
              />

              {emailError ? (
                <p
                  className="mt-3 text-[13px] text-red-600"
                  style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                >
                  {emailError}
                </p>
              ) : null}

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-[22px] border border-[#ece5da] bg-[#fbfaf7] p-6">
                  <p
                    className="mb-3 text-[10px] uppercase tracking-[0.32em] text-neutral-400"
                    style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                  >
                    Opción rápida
                  </p>
                  <h3
                    className="text-[20px] font-[400] tracking-[-0.02em] text-neutral-950"
                    style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                  >
                    Compra como invitado
                  </h3>
                  <p
                    className="mt-3 text-[14px] leading-7 text-neutral-500"
                    style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                  >
                    Solo necesitamos tu correo para continuar con tu pedido.
                  </p>
                </div>

                <div className="rounded-[22px] border border-[#ece5da] bg-[#fbfaf7] p-6">
                  <p
                    className="mb-3 text-[10px] uppercase tracking-[0.32em] text-neutral-400"
                    style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                  >
                    Cuenta KIKÚ
                  </p>
                  <h3
                    className="text-[20px] font-[400] tracking-[-0.02em] text-neutral-950"
                    style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                  >
                    Guarda tu experiencia
                  </h3>
                  <p
                    className="mt-3 text-[14px] leading-7 text-neutral-500"
                    style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                  >
                    Revisa pedidos, administra direcciones y compra más rápido en el futuro.
                  </p>

                  {!user && (
                    <div className="mt-5 flex flex-wrap gap-4">
                      <Link
                        href="/login?redirect=/checkout"
                        className="inline-flex border-b border-neutral-900 pb-1 text-[10px] uppercase tracking-[0.34em] text-neutral-700 transition-opacity hover:opacity-60"
                        style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                      >
                        Iniciar sesión
                      </Link>

                      <Link
                        href="/create-account?redirect=/checkout"
                        className="inline-flex border-b border-neutral-900 pb-1 text-[10px] uppercase tracking-[0.34em] text-neutral-700 transition-opacity hover:opacity-60"
                        style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                      >
                        Crear cuenta
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#e5e0d8] bg-white px-8 py-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
              <p
                className="mb-3 text-[10px] uppercase tracking-[0.35em] text-neutral-400"
                style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
              >
                Envío
              </p>

              <h2
                className="mb-6 text-[28px] font-[400] leading-[1] tracking-[-0.03em] text-neutral-950"
                style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
              >
                Selecciona tu destino
              </h2>

              <div className="flex flex-wrap gap-4">
                {[
                  { key: 'ecuador', label: 'Ecuador' },
                  { key: 'colombia', label: 'Colombia' },
                  { key: 'usa', label: 'USA' },
                ].map((country) => {
                  const active = deliveryCountry === country.key

                  return (
                    <button
                      key={country.key}
                      type="button"
                      onClick={() => setDeliveryCountry(country.key as DeliveryCountry)}
                      className={`rounded-full border px-6 py-3 text-[13px] transition-all duration-300 ${
                        active
                          ? 'border-neutral-950 bg-neutral-950 text-white'
                          : 'border-[#d8d2c7] bg-white text-neutral-700 hover:border-neutral-950'
                      }`}
                      style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                    >
                      {country.label}
                    </button>
                  )
                })}
              </div>

              <div className="mt-8 grid gap-4">
                {deliveryCountry === 'ecuador' && (
                  <>
                    <button
                      type="button"
                      onClick={() => setShippingMethod('local')}
                      className={`rounded-[22px] border p-6 text-left transition-all duration-300 ${
                        shippingMethod === 'local'
                          ? 'border-neutral-950 bg-[#fbfaf7]'
                          : 'border-[#e8e1d6] bg-white hover:border-[#d9d1c4]'
                      }`}
                    >
                      <p
                        className="text-[10px] uppercase tracking-[0.32em] text-neutral-400"
                        style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                      >
                        Opción 01
                      </p>
                      <h3
                        className="mt-3 text-[18px] font-[400] tracking-[-0.02em] text-neutral-950"
                        style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                      >
                        Retiro en showroom
                      </h3>
                      <p
                        className="mt-3 text-[14px] leading-7 text-neutral-500"
                        style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                      >
                        Retira tu pedido en Cumbayá, Ecuador.
                      </p>
                      <div
                        className="mt-5 text-[13px] text-neutral-950"
                        style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                      >
                        Gratis
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShippingMethod('servientrega')}
                      className={`rounded-[22px] border p-6 text-left transition-all duration-300 ${
                        shippingMethod === 'servientrega'
                          ? 'border-neutral-950 bg-[#fbfaf7]'
                          : 'border-[#e8e1d6] bg-white hover:border-[#d9d1c4]'
                      }`}
                    >
                      <p
                        className="text-[10px] uppercase tracking-[0.32em] text-neutral-400"
                        style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                      >
                        Opción 02
                      </p>
                      <h3
                        className="mt-3 text-[18px] font-[400] tracking-[-0.02em] text-neutral-950"
                        style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                      >
                        Servientrega
                      </h3>
                      <p
                        className="mt-3 text-[14px] leading-7 text-neutral-500"
                        style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                      >
                        Entrega nacional dentro de Ecuador.
                      </p>
                      <div
                        className="mt-5 text-[13px] text-neutral-950"
                        style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                      >
                        <Price amount={500} />
                      </div>
                    </button>
                  </>
                )}

                {deliveryCountry === 'colombia' && (
                  <button
                    type="button"
                    onClick={() => setShippingMethod('international_co')}
                    className="rounded-[22px] border border-neutral-950 bg-[#fbfaf7] p-6 text-left"
                  >
                    <p
                      className="text-[10px] uppercase tracking-[0.32em] text-neutral-400"
                      style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                    >
                      Colombia
                    </p>
                    <h3
                      className="mt-3 text-[18px] font-[400] tracking-[-0.02em] text-neutral-950"
                      style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                    >
                      Envío internacional
                    </h3>
                    <p
                      className="mt-3 text-[14px] leading-7 text-neutral-500"
                      style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                    >
                      Despacho internacional a Colombia con tarifa fija.
                    </p>
                    <div
                      className="mt-5 text-[13px] text-neutral-950"
                      style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                    >
                      <Price amount={1500} />
                    </div>
                  </button>
                )}

                {deliveryCountry === 'usa' && (
                  <button
                    type="button"
                    onClick={() => setShippingMethod('international_us')}
                    className="rounded-[22px] border border-neutral-950 bg-[#fbfaf7] p-6 text-left"
                  >
                    <p
                      className="text-[10px] uppercase tracking-[0.32em] text-neutral-400"
                      style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                    >
                      USA
                    </p>
                    <h3
                      className="mt-3 text-[18px] font-[400] tracking-[-0.02em] text-neutral-950"
                      style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                    >
                      International shipping
                    </h3>
                    <p
                      className="mt-3 text-[14px] leading-7 text-neutral-500"
                      style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                    >
                      Envío internacional a Estados Unidos con tarifa fija.
                    </p>
                    <div
                      className="mt-5 text-[13px] text-neutral-950"
                      style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                    >
                      <Price amount={2500} />
                    </div>
                  </button>
                )}
              </div>
            </div>

            <div className="rounded-[28px] border border-[#e5e0d8] bg-white px-8 py-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
              <p
                className="mb-3 text-[10px] uppercase tracking-[0.35em] text-neutral-400"
                style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
              >
                Pago
              </p>

              <h2
                className="mb-6 text-[28px] font-[400] leading-[1] tracking-[-0.03em] text-neutral-950"
                style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
              >
                Confirma tu pago
              </h2>

              {paymentError ? <Message error={paymentError} /> : null}

              {!paymentData ? (
                <div className="space-y-6">
                  <p
                    className="text-[14px] leading-7 text-neutral-500"
                    style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                  >
                    Cuando continúes, se abrirá el formulario de pago seguro para completar tu orden.
                  </p>

                  <Button
                    onClick={handlePayment}
                    className="h-14 w-full rounded-full bg-black text-[11px] tracking-[0.25em] text-white transition-all duration-300 hover:bg-neutral-800 active:scale-[0.98]"
                    style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                  >
                    CONTINUAR AL PAGO
                  </Button>
                </div>
              ) : stripePromise ? (
                <Suspense>
                  <Elements stripe={stripePromise} options={{ clientSecret: paymentData.clientSecret }}>
                    <CheckoutForm
                      customerEmail={customerEmail.trim().toLowerCase()}
                      setProcessingPayment={setProcessingPayment}
                    />
                  </Elements>
                </Suspense>
              ) : null}
            </div>
          </section>

          <aside className="h-fit rounded-[28px] border border-[#e5e0d8] bg-white px-8 py-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] xl:sticky xl:top-28">
            <p
              className="mb-3 text-[10px] uppercase tracking-[0.35em] text-neutral-400"
              style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
            >
              Resumen
            </p>

            <h3
              className="mb-8 text-[28px] font-[400] leading-[1] tracking-[-0.03em] text-neutral-950"
              style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
            >
              Tu selección
            </h3>

            <p
              className="mb-6 text-[14px] leading-7 text-neutral-500"
              style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
            >
              {totalItems} pieza(s) en tu pedido.
            </p>

            <div className="space-y-5 border-b border-[#ece5da] pb-6">
              {cart.items.map((item: any, i) => {
                const product = item.product
                const variant = item.variant

                if (!product || typeof product !== 'object') return null

                const unitPrice =
                  variant && typeof variant === 'object' && typeof variant.priceInUSD === 'number'
                    ? variant.priceInUSD
                    : typeof product.priceInUSD === 'number'
                      ? product.priceInUSD
                      : 0

                const lineTotal = unitPrice * (item.quantity || 0)

                return (
                  <div key={i} className="flex items-start justify-between gap-6">
                    <div className="min-w-0">
                      <p
                        className="text-[14px] leading-6 text-neutral-900"
                        style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                      >
                        {product.title}
                      </p>
                      <p
                        className="mt-1 text-[11px] uppercase tracking-[0.2em] text-neutral-400"
                        style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                      >
                        Cantidad: {item.quantity}
                      </p>
                    </div>

                    <div
                      className="shrink-0 text-[14px] font-[400] tracking-[-0.02em] text-neutral-950"
                      style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                    >
                      <Price amount={lineTotal} />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-[14px] text-neutral-500">
                <span
                  style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                >
                  Subtotal
                </span>
                <span
                  style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                >
                  <Price amount={computedSubtotal} />
                </span>
              </div>

              <div className="flex items-center justify-between text-[14px] text-neutral-500">
                <span
                  style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                >
                  {getShippingLabel()}
                </span>
                <span
                  style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                >
                  {shippingCost === 0 ? 'Gratis' : <Price amount={shippingCost} />}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-[#ece5da] pt-4">
                <span
                  className="text-[12px] uppercase tracking-[0.24em] text-neutral-500"
                  style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                >
                  Total
                </span>
                <span
                  className="text-[28px] font-[500] tracking-[-0.04em] text-neutral-950"
                  style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                >
                  <Price amount={total} />
                </span>
              </div>
            </div>

            {processingPayment ? (
              <div className="mt-6 rounded-[20px] border border-[#ece5da] bg-[#fbfaf7] px-5 py-5">
                <p
                  className="text-[13px] leading-7 text-neutral-500"
                  style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
                >
                  Estamos procesando tu pago. No cierres esta ventana hasta completar la operación.
                </p>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </main>
  )
}