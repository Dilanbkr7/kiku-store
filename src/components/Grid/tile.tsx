import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import clsx from 'clsx'
import React from 'react'

type Props = {
  active?: boolean
  isInteractive?: boolean
  label?: {
    amount: number
    position?: 'bottom' | 'center'
    title: string
  }
  media: MediaType
}

function formatLuxuryPrice(amount?: number) {
  if (typeof amount !== 'number') return ''
  return '$' + Math.floor(amount / 100)
}

export const GridTileImage: React.FC<Props> = ({
  active,
  isInteractive = true,
  label,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'group relative flex h-full w-full items-center justify-center overflow-hidden rounded-[24px] border bg-white',
        active ? 'border-neutral-950' : 'border-[#e7e2d9]',
      )}
    >
      {props.media ? (
        <Media
          className={clsx('relative h-full w-full object-cover', {
            'transition duration-700 ease-out group-hover:scale-[1.03]': isInteractive,
          })}
          height={80}
          imgClassName="h-full w-full object-cover"
          resource={props.media}
          width={80}
        />
      ) : null}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-black/[0.03] to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

      {label ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <p
                className="text-[15px] leading-6 tracking-[-0.01em] text-white"
                style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
              >
                {label.title}
              </p>

              <p
                className="mt-2 text-[10px] uppercase tracking-[0.26em] text-white/80"
                style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
              >
                {formatLuxuryPrice(label.amount)}
              </p>
            </div>

            <span
              className="inline-flex shrink-0 items-center justify-center rounded-full border border-white/60 bg-white/10 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-white backdrop-blur-sm"
              style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
            >
              Shop now
            </span>
          </div>
        </div>
      ) : null}
    </div>
  )
}