import { OrderStatus } from '@/components/OrderStatus'
import { Price } from '@/components/Price'
import { Order } from '@/payload-types'
import { formatDateTime } from '@/utilities/formatDateTime'
import Link from 'next/link'

export const OrderItem: React.FC<{ order: Order }> = ({ order }) => {
  return (
    <div className="group rounded-[22px] border border-[#e9e1d5] bg-[#fbfaf7] p-6 transition-all duration-500 hover:border-[#ddd3c5] hover:bg-white hover:shadow-[0_18px_50px_rgba(0,0,0,0.045)] md:p-7">
      <div className="mb-8 flex items-start justify-between gap-6">
        <div>
          <span className="mb-3 block text-[10px] uppercase tracking-[0.28em] text-neutral-400">
            Ref: {String(order.id)}
          </span>

          <p className="text-[22px] font-[300] leading-none tracking-[-0.03em] text-neutral-950">
            {formatDateTime({ date: order.createdAt, format: 'MMMM dd, yyyy' })}
          </p>
        </div>

        <div className="origin-top-right scale-[0.82] transition-all duration-500 group-hover:scale-[0.86]">
          <OrderStatus status={order.status} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-6 border-t border-[#ece5da] pt-6">
        <div className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">
          Volumen: {order.items?.length || 0} unidad(es)
        </div>

        <div className="flex items-center gap-6">
          <div className="text-[20px] font-[300] tracking-[-0.03em] text-neutral-950">
            <Price amount={order.amount} />
          </div>

          <Link
            href={`/orders/${order.id}`}
            className="inline-flex border-b border-neutral-900 pb-1 text-[10px] uppercase tracking-[0.32em] text-neutral-700 transition-opacity duration-300 hover:opacity-60"
          >
            Ver
          </Link>
        </div>
      </div>
    </div>
  )
}