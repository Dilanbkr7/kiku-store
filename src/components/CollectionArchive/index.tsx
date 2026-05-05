'use client'

import Link from 'next/link'

export const CollectionArchive = ({ posts }: { posts?: any[] }) => {
  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts?.map((result, index) => {
          const media = result.media
          // Payload entrega la URL empezando con /api
          const imageUrl = typeof media === 'object' ? media?.url : ''
          const title = result.title || 'SÉLECTION'
          const slug = result.slug || ''

          return (
            <Link 
              href={`/shop?category=${slug}`} 
              key={index}
              className="group relative aspect-[4/5] overflow-hidden bg-neutral-100 block border border-neutral-200"
            >
              {/* LA IMAGEN: Forzamos que sea visible siempre */}
              {imageUrl && (
                <img 
                  src={imageUrl} 
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover z-0 opacity-100 transition-transform duration-700 group-hover:scale-105"
                />
              )}

              {/* Filtro sutil para que el nombre se lea */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all z-10" />

              <div className="absolute inset-0 flex items-center justify-center p-8 z-20">
                <h3 className="text-white text-[12px] font-bold uppercase tracking-[0.5em] text-center drop-shadow-lg">
                  {title}
                </h3>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}