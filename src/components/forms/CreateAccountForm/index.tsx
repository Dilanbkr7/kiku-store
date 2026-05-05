'use client'

import { FormError } from '@/components/forms/FormError'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/providers/Auth'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  email: string
  password: string
  passwordConfirm: string
}

export const CreateAccountForm: React.FC = () => {
  const searchParams = useSearchParams()
  const { login } = useAuth()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<FormData>()

  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit = useCallback(
    async (data: FormData) => {
      setLoading(true)
      setError(null)

      const res = await fetch(${process.env.NEXT_PUBLIC_SERVER_URL}/api/users, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        setLoading(false)
        setError('No se pudo crear la cuenta. Intenta nuevamente.')
        return
      }

      try {
        await login(data)
        router.push('/account')
      } catch {
        setLoading(false)
        setError('Error al iniciar sesión automáticamente.')
      }
    },
    [login, router],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

      {error && <FormError message={error} />}

      {/* EMAIL */}
      <div>
        <label className="block text-[10px] uppercase tracking-[0.35em] text-neutral-400 mb-3">
          Email
        </label>
        <Input
          type="email"
          {...register('email', { required: 'Campo obligatorio' })}
          className="h-14 rounded-none border-[#e7e2d9] bg-transparent px-4 text-sm tracking-wide focus:border-black transition-all"
        />
        {errors.email && <FormError message={errors.email.message} />}
      </div>

      {/* PASSWORD */}
      <div>
        <label className="block text-[10px] uppercase tracking-[0.35em] text-neutral-400 mb-3">
          Contraseña
        </label>
        <Input
          type="password"
          {...register('password', { required: 'Campo obligatorio' })}
          className="h-14 rounded-none border-[#e7e2d9] bg-transparent px-4 text-sm tracking-wide focus:border-black transition-all"
        />
      </div>

      {/* CONFIRM */}
      <div>
        <label className="block text-[10px] uppercase tracking-[0.35em] text-neutral-400 mb-3">
          Confirmar contraseña
        </label>
        <Input
          type="password"
          {...register('passwordConfirm', {
            required: 'Campo obligatorio',
            validate: (value) =>
              value === password.current || 'Las contraseñas no coinciden',
          })}
          className="h-14 rounded-none border-[#e7e2d9] bg-transparent px-4 text-sm tracking-wide focus:border-black transition-all"
        />
        {errors.passwordConfirm && (
          <FormError message={errors.passwordConfirm.message} />
        )}
      </div>

      {/* CTA */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full h-14 bg-black text-white uppercase text-[10px] tracking-[0.4em] hover:bg-neutral-800 transition-all"
      >
        {loading ? 'Creando...' : 'Crear cuenta'}
      </Button>

      {/* LOGIN LINK */}
      <div className="text-center text-[12px] text-neutral-500">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="underline underline-offset-4 text-neutral-900">
          Iniciar sesión
        </Link>
      </div>

    </form>
  )
}