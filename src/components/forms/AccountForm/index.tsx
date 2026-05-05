'use client'

import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/providers/Auth'
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const AccountForm: React.FC = () => {
  const { setUser, user } = useAuth()
  const [changePassword, setChangePassword] = useState(false)

  const {
    formState: { errors, isLoading, isSubmitting, isDirty },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<any>()

  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit = useCallback(
    async (data: any) => {
      if (!user) return

      const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || ''
      const endpoint = baseURL + '/api/users/' + user.id

      const response = await fetch(endpoint, {
        body: JSON.stringify(data),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        method: 'PATCH',
      })

      if (response.ok) {
        const json = await response.json()
        setUser(json.doc)

        toast.success('IDENTIDAD ACTUALIZADA CORRECTAMENTE', {
          style: {
            background: '#111',
            color: '#fff',
            border: '1px solid #262626',
          },
        })

        setChangePassword(false)
        reset({ name: json.doc.name, email: json.doc.email })
      }
    },
    [user, setUser, reset],
  )

  useEffect(() => {
    if (user) {
      reset({ name: user.name, email: user.email })
    }
  }, [user, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex flex-wrap items-center gap-4 border-b border-[#ece5da] pb-6">
        <button
          onClick={() => setChangePassword(false)}
          type="button"
          className={`rounded-full border px-5 py-2 text-[10px] uppercase tracking-[0.28em] transition-all duration-300 ${
            !changePassword
              ? 'border-neutral-950 bg-neutral-950 text-white'
              : 'border-[#e5ddd0] bg-transparent text-neutral-600 hover:border-neutral-900 hover:text-neutral-900'
          }`}
        >
          Datos
        </button>

        <button
          onClick={() => setChangePassword(true)}
          type="button"
          className={`rounded-full border px-5 py-2 text-[10px] uppercase tracking-[0.28em] transition-all duration-300 ${
            changePassword
              ? 'border-neutral-950 bg-neutral-950 text-white'
              : 'border-[#e5ddd0] bg-transparent text-neutral-600 hover:border-neutral-900 hover:text-neutral-900'
          }`}
        >
          Contraseña
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {!changePassword ? (
          <Fragment>
            <FormItem>
              <Label className="mb-3 block text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                Correo electrónico
              </Label>
              <Input
                {...register('email', { required: 'CAMPO OBLIGATORIO' })}
                className="h-14 rounded-[18px] border-[#e7e1d6] bg-[#fbfaf7] px-5 text-[13px] tracking-[0.04em] text-neutral-900 transition-all duration-300 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-0"
              />
              {errors.email && <FormError message={errors.email.message as string} />}
            </FormItem>

            <FormItem>
              <Label className="mb-3 block text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                Nombre
              </Label>
              <Input
                {...register('name', { required: 'CAMPO OBLIGATORIO' })}
                className="h-14 rounded-[18px] border-[#e7e1d6] bg-[#fbfaf7] px-5 text-[13px] tracking-[0.04em] text-neutral-900 transition-all duration-300 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-0"
              />
              {errors.name && <FormError message={errors.name.message as string} />}
            </FormItem>
          </Fragment>
        ) : (
          <Fragment>
            <FormItem>
              <Label className="mb-3 block text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                Nueva contraseña
              </Label>
              <Input
                type="password"
                {...register('password', { required: 'CAMPO OBLIGATORIO' })}
                className="h-14 rounded-[18px] border-[#e7e1d6] bg-[#fbfaf7] px-5 text-[13px] tracking-[0.04em] text-neutral-900 transition-all duration-300 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-0"
              />
            </FormItem>

            <FormItem>
              <Label className="mb-3 block text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                Confirmar contraseña
              </Label>
              <Input
                type="password"
                {...register('passwordConfirm', {
                  validate: (val: string) =>
                    val === password.current || 'LAS CLAVES NO COINCIDEN',
                })}
                className="h-14 rounded-[18px] border-[#e7e1d6] bg-[#fbfaf7] px-5 text-[13px] tracking-[0.04em] text-neutral-900 transition-all duration-300 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-0"
              />
              {errors.passwordConfirm && (
                <FormError message={errors.passwordConfirm.message as string} />
              )}
            </FormItem>
          </Fragment>
        )}
      </div>

      <div className="pt-2">
        <Button
          disabled={isLoading || isSubmitting || !isDirty}
          type="submit"
          className="h-14 rounded-full bg-neutral-950 px-10 text-[10px] font-bold uppercase tracking-[0.36em] text-white transition-all duration-300 hover:bg-neutral-800 disabled:opacity-30"
        >
          {isLoading || isSubmitting ? 'PROCESANDO...' : 'GUARDAR CAMBIOS'}
        </Button>
      </div>
    </form>
  )
}