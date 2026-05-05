export default function AboutUsPage() {
    return (
      <main className="bg-[#f8f5ef] text-neutral-900">
        <section className="container py-20 md:py-28">
          <p className="mb-4 text-[10px] uppercase tracking-[0.45em] text-neutral-400">
            KIKÚ
          </p>
  
          <h1 className="max-w-[10ch] text-4xl font-[300] leading-[0.95] tracking-[-0.04em] md:text-6xl">
            About Us
          </h1>
  
          <div className="mt-12 max-w-[70ch] space-y-8 text-[16px] leading-8 text-neutral-700">
            <p>
              KIKÚ nace de una visión simple: vestir con intención. Cada pieza es
              seleccionada para transmitir una estética limpia, femenina y atemporal,
              pensada para una mujer que aprecia la elegancia sin esfuerzo.
            </p>
  
            <p>
              Creemos en siluetas que permanecen, en colores que acompañan y en
              prendas que elevan el día a día. Nuestra propuesta mezcla una
              sensibilidad contemporánea con una mirada editorial, cuidando el detalle
              en cada textura, caída y composición.
            </p>
  
            <p>
              Más que vender ropa, buscamos construir una experiencia. KIKÚ es una
              curaduría de piezas con carácter, diseñadas para integrarse con
              naturalidad en un guardarropa sofisticado.
            </p>
          </div>
        </section>
  
        <section className="border-t border-[#e7e2d9] bg-white/70">
          <div className="container grid gap-10 py-16 md:grid-cols-3">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.42em] text-neutral-400">
                Esencia
              </p>
              <p className="text-[15px] leading-7 text-neutral-700">
                Minimalismo, textura y una visión de elegancia moderna.
              </p>
            </div>
  
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.42em] text-neutral-400">
                Curaduría
              </p>
              <p className="text-[15px] leading-7 text-neutral-700">
                Cada pieza es elegida para dialogar con un guardarropa atemporal.
              </p>
            </div>
  
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.42em] text-neutral-400">
                Experiencia
              </p>
              <p className="text-[15px] leading-7 text-neutral-700">
                Una compra más cercana, más cuidada y más alineada con el estilo KIKÚ.
              </p>
            </div>
          </div>
        </section>
      </main>
    )
  }