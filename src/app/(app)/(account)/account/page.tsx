import { AccountNav } from '@/components/AccountNav'
import { AccountForm } from '@/components/forms/AccountForm'
import { OrderItem } from '@/components/OrderItem'
import { Order } from '@/payload-types'
import configPromise from '@payload-config'
import { headers as getHeaders } from 'next/headers.js'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

export default async function AccountPage() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  if (!user) redirect('/login')

  let orders: Order[] = []

  try {
    const ordersResult = await payload.find({
      collection: 'orders',
      limit: 3,
      user,
      where: { customer: { equals: user?.id } },
    })

    orders = ordersResult?.docs || []
  } catch (error) {}

  const firstName = user.name?.split(' ')[0] || 'KIKÚ'

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-neutral-900">
      <div className="container py-14 md:py-20">
        <div className="grid gap-10 xl:grid-cols-[300px_minmax(0,1fr)] xl:gap-16">
          <aside className="xl:pt-4">
            <div className="xl:sticky xl:top-28">
              <p className="mb-4 text-[10px] uppercase tracking-[0.42em] text-neutral-400">
                Mi cuenta
              </p>

              <h1 className="max-w-[8ch] text-4xl font-[300] leading-[0.9] tracking-[-0.06em] text-neutral-950 md:text-5xl">
                Hola,
                <br />
                {firstName}
              </h1>

              <p className="mt-5 max-w-[26ch] text-[15px] leading-8 text-neutral-600">
                Aquí puedes actualizar tus datos, revisar tus pedidos y mantener tu
                información al día.
              </p>

              <div className="mt-8 h-px w-full max-w-[240px] bg-[#e5ddd0]" />

              <div className="mt-8 max-w-[240px]">
                <AccountNav />
              </div>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="rounded-[34px] border border-[#e9e1d5] bg-[linear-gradient(180deg,#ffffff_0%,#fcfaf6_100%)] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.045)] md:p-10 lg:p-12">
              <div className="mb-8 border-b border-[#ece5da] pb-6">
                <p className="mb-3 text-[10px] uppercase tracking-[0.42em] text-neutral-400">
                  Datos personales
                </p>

                <h2 className="text-[32px] font-[300] leading-[0.94] tracking-[-0.045em] text-neutral-950 md:text-[44px]">
                  Ingresa tus datos
                </h2>

                <p className="mt-4 max-w-[42ch] text-[15px] leading-8 text-neutral-600">
                  Edita tu correo, tu nombre y tu contraseña desde un solo lugar.
                </p>
              </div>

              <div className="max-w-[720px]">
                <AccountForm />
              </div>
            </div>

            <div className="rounded-[34px] border border-[#e9e1d5] bg-[linear-gradient(180deg,#ffffff_0%,#fcfaf6_100%)] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.045)] md:p-10">
              <div className="mb-8 flex flex-col gap-4 border-b border-[#ece5da] pb-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="mb-3 text-[10px] uppercase tracking-[0.42em] text-neutral-400">
                    Pedidos
                  </p>

                  <h2 className="text-[28px] font-[300] leading-[0.96] tracking-[-0.04em] text-neutral-950 md:text-[36px]">
                    Tu historial de compras
                  </h2>
                </div>

                <Link
                  href="/account/orders"
                  className="inline-flex w-fit border-b border-neutral-900 pb-1 text-[10px] uppercase tracking-[0.34em] text-neutral-700 transition-opacity duration-300 hover:opacity-60"
                >
                  Ver todo
                </Link>
              </div>

              {orders.length === 0 ? (
                <div className="rounded-[20px] border border-[#ece5da] bg-[#fbfaf7] px-6 py-8">
                  <p className="text-[14px] leading-7 text-neutral-600">
                    Aún no tienes pedidos registrados.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {orders.map((order) => (
                    <OrderItem key={order.id} order={order} />
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}