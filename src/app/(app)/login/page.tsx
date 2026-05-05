import { LoginForm } from '@/components/forms/LoginForm'
import { RenderParams } from '@/components/RenderParams'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { headers as getHeaders } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

export default async function Login() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  if (user) {
    redirect(`/account?warning=${encodeURIComponent('SESIÓN YA INICIADA.')}`)
  }

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-neutral-900">
      <div className="container py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <section className="max-w-[520px]">
            <p className="mb-4 text-[10px] uppercase tracking-[0.45em] text-neutral-400">
              Acceso privado
            </p>

            <h1 className="max-w-[9ch] text-4xl font-[300] leading-[0.95] tracking-[-0.05em] text-neutral-950 md:text-6xl">
              Inicia sesión en KIKÚ
            </h1>

            <div className="mt-10 h-px w-24 bg-[#d9d2c7]" />

            <div className="mt-10 max-w-[48ch] space-y-6 text-[16px] leading-8 text-neutral-600">
              <p>
                Accede a tu cuenta para revisar tus pedidos, direcciones guardadas
                y continuar una experiencia de compra más cuidada y personalizada.
              </p>

              <p>
                Si todavía no tienes cuenta, tu registro puede completarse durante el
                proceso de compra o desde el área privada.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-4 text-[14px] text-neutral-500">
              <Link
                href="/shop"
                className="inline-flex w-fit border-b border-neutral-900 pb-1 text-[10px] uppercase tracking-[0.35em] text-neutral-700 transition-opacity hover:opacity-60"
              >
                Explorar colección
              </Link>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e7e2d9] bg-white/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-sm md:p-10 lg:p-12">
            <RenderParams />

            <div className="mb-8">
              <p className="mb-3 text-[10px] uppercase tracking-[0.42em] text-neutral-400">
                Bienvenida de nuevo
              </p>

              <h2 className="text-2xl font-[300] leading-tight tracking-[-0.03em] text-neutral-950 md:text-3xl">
                Tu espacio personal KIKÚ
              </h2>
            </div>

            <div className="border-t border-[#ece6dc] pt-8">
              <LoginForm />
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export const metadata: Metadata = {
  title: 'Login | KIKÚ',
  description: 'Inicia sesión en tu cuenta KIKÚ.',
}