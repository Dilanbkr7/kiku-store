import { RenderParams } from '@/components/RenderParams'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import { CreateAccountForm } from '@/components/forms/CreateAccountForm'

export default async function CreateAccount() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  if (user) {
    redirect(/account?warning=${encodeURIComponent('Ya tienes una sesión activa.')})
  }

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-neutral-900">
      <div className="container py-24 md:py-32">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-start">

          {/* LEFT SIDE */}
          <section className="max-w-[520px]">
            <p className="mb-4 text-[10px] uppercase tracking-[0.45em] text-neutral-400">
              Registro
            </p>

            <h1 className="text-4xl md:text-6xl font-[300] leading-[0.95] tracking-[-0.05em] text-neutral-950 max-w-[10ch]">
              Crea tu cuenta KIKÚ
            </h1>

            <div className="mt-10 h-px w-24 bg-[#d9d2c7]" />

            <div className="mt-10 space-y-6 text-[15px] leading-8 text-neutral-600 max-w-[48ch]">
              <p>
                Accede a una experiencia más cuidada: guarda tus pedidos,
                direcciones y continúa tus compras de forma más fluida.
              </p>

              <p>
                También puedes comprar como invitado y decidir crear tu cuenta más adelante.
              </p>
            </div>
          </section>

          {/* RIGHT SIDE FORM */}
          <section className="rounded-[28px] border border-[#e7e2d9] bg-white/80 p-8 md:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-sm">

            <RenderParams />

            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-[0.42em] text-neutral-400 mb-3">
                Nuevo acceso
              </p>

              <h2 className="text-2xl md:text-3xl font-[300] tracking-[-0.03em] text-neutral-950">
                Ingresa tus datos
              </h2>
            </div>

            <div className="border-t border-[#ece6dc] pt-8">
              <CreateAccountForm />
            </div>
          </section>

        </div>
      </div>
    </main>
  )
}