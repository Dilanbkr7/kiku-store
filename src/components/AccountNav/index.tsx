'use client'

import { cn } from '@/utilities/cn'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const navItems = [
  { label: 'Configuración de cuenta', href: '/account' },
  { label: 'Direcciones', href: '/account/addresses' },
  { label: 'Mis pedidos', href: '/account/orders' },
]

export const AccountNav: React.FC<{ className?: string }> = ({ className }) => {
  const pathname = usePathname()

  return (
    <nav className={cn('flex flex-col gap-10', className)}>
      <ul className="flex flex-col gap-3">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/account' && pathname.includes(item.href))

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'group flex items-center justify-between rounded-[20px] border px-5 py-4 text-[11px] uppercase tracking-[0.34em] transition-all duration-500',
                  isActive
                    ? 'border-[#e7e0d5] bg-white text-neutral-950 shadow-[0_12px_30px_rgba(0,0,0,0.04)]'
                    : 'border-transparent bg-transparent text-neutral-500 hover:border-[#ebe3d7] hover:bg-white/75 hover:text-neutral-900',
                )}
              >
                <span className="leading-relaxed">{item.label}</span>

                <span
                  className={cn(
                    'ml-4 h-[7px] w-[7px] rounded-full transition-all duration-500',
                    isActive
                      ? 'bg-neutral-900 scale-100'
                      : 'bg-neutral-300 group-hover:bg-neutral-500 group-hover:scale-110',
                  )}
                />
              </Link>
            </li>
          )
        })}
      </ul>

      <div className="h-px w-full bg-[#e5ddd0]" />

      <Link
        href="/logout"
        className="inline-flex w-fit border-b border-neutral-900 pb-1 text-[10px] uppercase tracking-[0.34em] text-neutral-700 transition-opacity duration-300 hover:opacity-60"
      >
        Cerrar sesión
      </Link>
    </nav>
  )
}