import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import { ShoppingCart } from 'lucide-react'

export function OpenCartButton({
  className,
  quantity,
  ...rest
}: {
  className?: string
  quantity?: number
}) {
  return (
    <Button
      variant="nav"
      size="clear"
      className={clsx(
        "relative flex items-center justify-center hover:cursor-pointer",
        className
      )}
      {...rest}
    >
      {/* ICONO */}
      <div className="relative">
        <ShoppingCart
          size={18}
          strokeWidth={1.4}
          className="transition-all duration-300 hover:scale-105"
        />

        {/* BADGE PREMIUM */}
        {quantity && quantity > 0 && (
          <span
            className="
              absolute -top-2 -right-2
              flex items-center justify-center
              min-w-[18px] h-[18px]
              px-[5px]
              text-[10px] font-medium
              rounded-full
              bg-black text-white
              tracking-tight
              shadow-[0_4px_10px_rgba(0,0,0,0.2)]
              transition-all duration-300
              animate-in fade-in zoom-in-75
            "
          >
            {quantity}
          </span>
        )}
      </div>
    </Button>
  )
}