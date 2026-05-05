'use client'

import { Message } from '@/components/Message'
import { Button } from '@/components/ui/button'
import { Address } from '@/payload-types'
import { useCart, usePayments } from '@payloadcms/plugin-ecommerce/client/react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useCallback } from 'react'

type Props = {
  customerEmail?: string
  billingAddress?: Partial<Address>
  shippingAddress?: Partial<Address>
  setProcessingPayment: React.Dispatch<React.SetStateAction<boolean>>
}

export const CheckoutForm: React.FC<Props> = ({
  customerEmail,
  billingAddress,
  setProcessingPayment,
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = React.useState<null | string>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()
  const { clearCart } = useCart()
  const { confirmOrder } = usePayments()

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      setIsLoading(true)
      setProcessingPayment(true)

      if (stripe && elements) {
        try {
          const baseUrl =
            process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

          const returnUrl =
            baseUrl +
            '/checkout/confirm-order' +
            (customerEmail ? '?email=' + encodeURIComponent(customerEmail) : '')

          const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
            confirmParams: {
              return_url: returnUrl,
              payment_method_data: {
                billing_details: {
                  email: customerEmail,
                  phone: billingAddress?.phone,
                  address: {
                    line1: billingAddress?.addressLine1,
                    line2: billingAddress?.addressLine2,
                    city: billingAddress?.city,
                    state: billingAddress?.state,
                    postal_code: billingAddress?.postalCode,
                    country: billingAddress?.country,
                  },
                },
              },
            },
            elements,
            redirect: 'if_required',
          })

          if (paymentIntent && paymentIntent.status === 'succeeded') {
            try {
              const confirmResult = await confirmOrder('stripe', {
                additionalData: {
                  paymentIntentID: paymentIntent.id,
                  ...(customerEmail ? { customerEmail } : {}),
                },
              })

              if (
                confirmResult &&
                typeof confirmResult === 'object' &&
                'orderID' in confirmResult &&
                confirmResult.orderID
              ) {
                const accessToken =
                  'accessToken' in confirmResult ? (confirmResult.accessToken as string) : ''

                const queryParams = new URLSearchParams()

                if (customerEmail) {
                  queryParams.set('email', customerEmail)
                }

                if (accessToken) {
                  queryParams.set('accessToken', accessToken)
                }

                const queryString = queryParams.toString()
                const redirectUrl =
                  '/orders/' +
                  confirmResult.orderID +
                  (queryString ? '?' + queryString : '')

                clearCart()
                router.push(redirectUrl)
                return
              }
            } catch (err) {
              const msg = err instanceof Error ? err.message : 'Something went wrong.'
              setError('Error al confirmar tu pedido: ' + msg)
              setIsLoading(false)
              setProcessingPayment(false)
              return
            }
          }

          if (stripeError?.message) {
            setError(stripeError.message)
            setIsLoading(false)
            setProcessingPayment(false)
            return
          }

          setIsLoading(false)
          setProcessingPayment(false)
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'Something went wrong.'
          setError('Error al procesar el pago: ' + msg)
          setIsLoading(false)
          setProcessingPayment(false)
        }
      } else {
        setIsLoading(false)
        setProcessingPayment(false)
      }
    },
    [
      setProcessingPayment,
      stripe,
      elements,
      customerEmail,
      billingAddress?.phone,
      billingAddress?.addressLine1,
      billingAddress?.addressLine2,
      billingAddress?.city,
      billingAddress?.state,
      billingAddress?.postalCode,
      billingAddress?.country,
      confirmOrder,
      clearCart,
      router,
    ],
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <Message error={error} />}

      <div className="rounded-[22px] border border-[#ece5da] bg-[#fbfaf7] p-5">
        <PaymentElement />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] leading-7 text-neutral-500">
          Al continuar, tu pago será validado de forma segura.
        </p>

        <Button
          disabled={!stripe || isLoading}
          type="submit"
          className="h-14 rounded-full bg-neutral-950 px-8 text-[10px] uppercase tracking-[0.38em] text-white transition-all duration-300 hover:bg-neutral-800"
        >
          {isLoading ? 'Procesando...' : 'Pagar ahora'}
        </Button>
      </div>
    </form>
  )
}