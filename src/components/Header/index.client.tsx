'use client'

import { Cart } from '@/components/Cart'
import { OpenCartButton } from '@/components/Cart/OpenCart'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { Header } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { Search, User } from 'lucide-react'
import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import { MobileMenu } from './MobileMenu'

export function HeaderClient({ header }: { header: Header }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const menu = header?.navItems || []
  const logo = header?.logo

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out',
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm border-b border-neutral-100' 
          : 'bg-transparent py-8'
      )}
    >
      <nav className="container mx-auto flex items-center justify-between px-6 lg:px-10">
        
        {/* IZQUIERDA: LOGO Y LINKS */}
        <div className="flex items-center gap-10">
          
          {/* LOGO DINÁMICO DESDE EL CMS */}
          <Link href="/" className="flex items-center transition-opacity hover:opacity-70">
            {logo && typeof logo === 'object' ? (
              <Media 
                resource={logo} 
                className={cn(
                  "h-7 md:h-8 w-auto object-contain transition-all duration-500", 
                  // Invertimos el color del logo solo si el header es transparente (sobre el Hero oscuro)
                  !isScrolled && "brightness-0 invert" 
                )} 
              />
            ) : (
              <span className={cn(
                "font-serif italic text-2xl tracking-widest uppercase transition-colors duration-500",
                isScrolled ? "text-black" : "text-white"
              )}>
                kikú
              </span>
            )}
          </Link>

          {/* MENÚ DE NAVEGACIÓN DESDE EL CMS */}
          <div className="hidden lg:flex items-center gap-8 pt-[6px]">
            {menu.map((item) => (
              <CMSLink 
                key={item.id} 
                {...item.link} 
                className={cn(
                  "text-[11px] tracking-[0.3em] uppercase font-bold transition-all duration-500 hover:opacity-50",
                  isScrolled ? "text-black" : "text-white"
                )}
              />
            ))}
          </div>
        </div>

        {/* DERECHA: ICONOS Y CARRITO */}
        <div className="flex items-center gap-7 pt-[6px]">
          
          <button className={cn("flex items-center transition-all duration-500 hover:opacity-50", isScrolled ? "text-black" : "text-white")}>
            <Search size={18} strokeWidth={1.5} />
          </button>

          <Link href="/login" className={cn("flex items-center transition-all duration-500 hover:opacity-50", isScrolled ? "text-black" : "text-white")}>
            <User size={18} strokeWidth={1.5} />
          </Link>

          {/* CARRITO */}
          <div className={cn(
            "flex items-center text-[11px] tracking-[0.2em] uppercase font-bold transition-colors duration-500",
            isScrolled ? "text-black" : "text-white"
          )}>
            <Suspense fallback={<OpenCartButton />}>
              <Cart />
            </Suspense>
          </div>
          
          {/* MENÚ MÓVIL */}
          <div className={cn("lg:hidden flex items-center transition-colors duration-500", isScrolled ? "text-black" : "text-white")}>
            <MobileMenu menu={menu} />
          </div>
        </div>

      </nav>
    </header>
  )
}