'use client'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'
import type { Page } from '@/payload-types'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  return (
    <div
      className="relative -mt-[10.4rem] flex min-h-screen items-center justify-center text-white"
      data-theme="dark"
    >
      <div className="container z-10 relative flex flex-col items-center justify-center text-center">
        <div className="max-w-[800px]">
          {richText && (
            <RichText 
              className="mb-8 text-5xl md:text-8xl font-serif italic" 
              data={richText} 
              enableGutter={false} 
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex justify-center gap-6">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink 
                    {...link} 
                    className="border border-white px-8 py-3 uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-black transition-all"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* FONTO: La foto de la modelo subida en el CMS */}
      <div className="absolute inset-0 -z-10 select-none overflow-hidden">
        {media && typeof media === 'object' && (
          <>
            <div className="absolute inset-0 bg-black/30 z-10" /> {/* Overlay para legibilidad */}
            <Media 
              fill 
              imgClassName="object-cover" 
              priority 
              resource={media} 
            />
          </>
        )}
      </div>
    </div>
  )
}