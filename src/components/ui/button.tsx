import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/utilities/cn'

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-0",
  {
    variants: {
      variant: {
        default:
          'rounded-full border border-neutral-950 bg-neutral-950 px-6 py-3 text-[10px] uppercase tracking-[0.34em] text-white hover:bg-white hover:text-neutral-950',
        destructive:
          'rounded-full border border-red-600 bg-red-600 px-6 py-3 text-[10px] uppercase tracking-[0.34em] text-white hover:bg-white hover:text-red-600',
        outline:
          'rounded-full border border-neutral-200 bg-white px-6 py-3 text-[10px] uppercase tracking-[0.34em] text-neutral-800 hover:border-neutral-950 hover:text-neutral-950',
        secondary:
          'rounded-full border border-neutral-200 bg-[#faf8f3] px-6 py-3 text-[10px] uppercase tracking-[0.34em] text-neutral-700 hover:bg-white hover:text-neutral-950',
        ghost:
          'px-0 py-0 text-[10px] uppercase tracking-[0.34em] text-neutral-700 hover:text-neutral-950',
        link:
          'px-0 py-0 text-[10px] uppercase tracking-[0.34em] text-neutral-700 underline-offset-4 hover:underline',
        nav:
          'px-0 py-0 text-[10px] uppercase tracking-[0.34em] text-neutral-500 hover:text-neutral-950',
      },
      size: {
        clear: '',
        default: 'h-11',
        sm: 'h-9 px-4',
        lg: 'h-14 px-8',
        icon: 'h-10 w-10 rounded-full border border-neutral-200 bg-white',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        'font-sans not-italic',
      )}
      {...props}
    />
  )
}

export { Button, buttonVariants }
