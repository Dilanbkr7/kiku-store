export default function EssencePage() {
    return (
      <div className="bg-[#f8f6f2] text-black">
  
        {/* HERO */}
        <section className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-40 pb-28">
          <h1 className="text-[38px] md:text-[64px] leading-[1.1] tracking-tight font-light max-w-4xl">
            Una marca creada para impulsar a mujeres a través de cada pieza.
          </h1>
  
          <div className="mt-10 w-16 h-[1px] bg-black/20" />
        </section>
  
        {/* BLOQUE 1 */}
        <section className="max-w-[1200px] mx-auto px-6 lg:px-10 pb-32 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* TEXTO */}
          <div>
            <p className="text-[11px] tracking-[0.4em] uppercase text-neutral-500 mb-6">
              Origen
            </p>
  
            <h2 className="text-[28px] md:text-[40px] leading-[1.2] font-light mb-6">
              Cada prenda inicia con intención
            </h2>
  
            <p className="text-neutral-600 leading-7 max-w-md">
              Seleccionamos cuidadosamente materiales que respetan el proceso, 
              el tiempo y el valor real de cada pieza. Nada es masivo, todo tiene propósito.
            </p>
          </div>
  
          {/* IMAGEN */}
          <div className="overflow-hidden rounded-2xl">
            <img
              src="/media/regla.png"
              className="w-full h-[420px] object-cover transition duration-700 hover:scale-105"
            />
          </div>
        </section>
  
        {/* BLOQUE 2 */}
        <section className="max-w-[1200px] mx-auto px-6 lg:px-10 pb-32 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* IMAGEN */}
          <div className="overflow-hidden rounded-2xl lg:order-1 order-2">
            <img
              src="/media/mujeres.jpg"
              className="w-full h-[420px] object-cover transition duration-700 hover:scale-105"
            />
          </div>
  
          {/* TEXTO */}
          <div className="lg:order-2 order-1">
            <p className="text-[11px] tracking-[0.4em] uppercase text-neutral-500 mb-6">
              Impacto
            </p>
  
            <h2 className="text-[28px] md:text-[40px] leading-[1.2] font-light mb-6">
              Mujeres creando para mujeres
            </h2>
  
            <p className="text-neutral-600 leading-7 max-w-md">
              KIKÚ nace con una misión clara: generar oportunidades reales. 
              Cada prenda es creada por mujeres que encuentran aquí una forma 
              de crecimiento, estabilidad y autonomía.
            </p>
          </div>
        </section>
  
        {/* BLOQUE 3 */}
        <section className="max-w-[1200px] mx-auto px-6 lg:px-10 pb-40 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* TEXTO */}
          <div>
            <p className="text-[11px] tracking-[0.4em] uppercase text-neutral-500 mb-6">
              Propósito
            </p>
  
            <h2 className="text-[28px] md:text-[40px] leading-[1.2] font-light mb-6">
              Cada compra tiene un significado
            </h2>
  
            <p className="text-neutral-600 leading-7 max-w-md">
              Cuando eliges KIKÚ, no solo adquieres una pieza. 
              Formas parte de un sistema donde el diseño, la producción 
              y el impacto social están conectados.
            </p>
          </div>
  
          {/* IMAGEN */}
          <div className="overflow-hidden rounded-2xl">
            <img
              src="/media/chicakiku.png"
              className="w-full h-[420px] object-cover transition duration-700 hover:scale-105"
            />
          </div>
        </section>
  
        {/* CTA FINAL */}
        <section className="text-center pb-40 px-6">
          <p className="text-[11px] tracking-[0.4em] uppercase text-neutral-500 mb-6">
            KIKÚ
          </p>
  
          <h3 className="text-[28px] md:text-[42px] font-light mb-8 max-w-2xl mx-auto leading-[1.2]">
            Siluetas atemporales con impacto real.
          </h3>
  
          <a
            href="/shop"
            className="inline-block border border-black px-10 py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-black hover:text-white transition-all duration-500"
          >
            Explorar colección
          </a>
        </section>
  
      </div>
    )
  }