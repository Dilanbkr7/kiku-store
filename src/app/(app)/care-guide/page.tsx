export default function CareGuidePage() {
    return (
      <main className="bg-[#f8f5ef] text-neutral-900">
        <section className="container py-20 md:py-28">
          <p className="mb-4 text-[10px] uppercase tracking-[0.45em] text-neutral-400">
            Cuidado de prenda
          </p>
  
          <h1 className="max-w-[12ch] text-4xl font-[300] leading-[0.95] tracking-[-0.04em] md:text-6xl">
            Guía de cuidados
          </h1>
  
          <div className="mt-12 max-w-[70ch] space-y-8 text-[16px] leading-8 text-neutral-700">
            <p>
              Para conservar la forma, textura y acabado de cada pieza, recomendamos
              seguir cuidadosamente las instrucciones de lavado y almacenamiento.
            </p>
  
            <p>
              Evita el uso de procesos agresivos, secado excesivo o exposición prolongada
              a superficies que puedan alterar el material.
            </p>
  
            <p>
              Si tienes dudas sobre una prenda específica, puedes escribirnos para
              recibir orientación personalizada sobre su cuidado.
            </p>
          </div>
        </section>
      </main>
    )
  }