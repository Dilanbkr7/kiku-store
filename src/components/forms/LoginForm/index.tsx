'use client'

import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Message } from '@/components/Message'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/providers/Auth'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'

type FormData = { email: string; password: string }

export const LoginForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const redirect = useRef(searchParams.get('redirect'))
  const { login } = useAuth()
  const router = useRouter()
  const [error, setError] = React.useState<null | string>(null)

  const { formState: { errors, isLoading }, handleSubmit, register } = useForm<FormData>()

  const onSubmit = useCallback(async (data: FormData) => {
    try {
      await login(data)
      if (redirect?.current) router.push(redirect.current)
      else router.push('/account')
    } catch (_) {
      setError('CREDENCIALES INVÁLIDAS. REVISA TUS DATOS.')
    }
  }, [login, router])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
      <Message error={error} className="text-[9px] uppercase tracking-[0.2em] font-bold text-red-500" />
      
      <div className="flex flex-col gap-10">
        <FormItem>
          <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500 mb-4 block">
            CORREO ELECTRÓNICO
          </Label>
          <Input
            id="email"
            type="email"
            {...register('email', { required: 'EL CORREO ES OBLIGATORIO' })}
            className="bg-neutral-900/50 border-white/5 focus:border-white h-16 rounded-none uppercase text-xs tracking-widest px-6 transition-all"
            placeholder="EMAIL@KIKU.COM"
          />
          {errors.email && <FormError message={errors.email.message} />}
        </FormItem>

        <FormItem>
          <Label htmlFor="password" className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500 mb-4 block">
            CONTRASEÑA
          </Label>
          <Input
            id="password"
            type="password"
            {...register('password', { required: 'LA CONTRASEÑA ES OBLIGATORIA' })}
            className="bg-neutral-900/50 border-white/5 focus:border-white h-16 rounded-none px-6 transition-all"
            placeholder="••••••••"
          />
          {errors.password && <FormError message={errors.password.message} />}
        </FormItem>

        <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500 flex justify-between">
          <Link href={`/recover-password${allParams}`} className="hover:text-white transition-colors underline underline-offset-8">
            ¿OLVIDASTE TU CONTRASEÑA?
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-6">
        <Button className="w-full bg-white text-black hover:bg-neutral-200 h-16 rounded-none uppercase text-[11px] font-black tracking-[0.4em]" disabled={isLoading} type="submit">
          {isLoading ? 'VALIDANDO...' : 'ENTRAR'}
        </Button>
        
        <Button asChild variant="outline" className="w-full border-white/10 h-16 rounded-none uppercase text-[11px] font-black tracking-[0.4em] hover:bg-white hover:text-black transition-all">
          <Link href={`/create-account${allParams}`}>
            CREAR UNA CUENTA
          </Link>
        </Button>
      </div>
    </form>
  )
}