export default function ContactPage() {
    return (
      <main className="bg-[#f8f5ef] text-neutral-900">
        <section className="container py-20 md:py-28">
          <p className="mb-4 text-[10px] uppercase tracking-[0.45em] text-neutral-400">
            Contacto
          </p>
  
          <h1 className="max-w-[12ch] text-4xl font-[300] leading-[0.95] tracking-[-0.04em] md:text-6xl">
            Hablemos
          </h1>
  
          <div className="mt-12 grid gap-12 md:grid-cols-[1.1fr_0.9fr]">
            <div className="max-w-[64ch] space-y-8 text-[16px] leading-8 text-neutral-700">
              <p>
                Nuestro equipo está disponible para ayudarte con disponibilidad,
                colores, tallas, recomendaciones y cualquier duda antes de finalizar
                tu compra.
              </p>
  
              <p>
                Si buscas una atención más personalizada, puedes escribirnos
                directamente y acompañaremos tu compra de forma más cercana.
              </p>
            </div>
  
            <div className="border border-[#e7e2d9] bg-white/70 p-8">
              <div className="space-y-6">
                <div>
                  <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-neutral-400">
                    Email
                  </p>
                  <p className="text-[16px] text-neutral-800">hello@kiku-store.com</p>
                </div>
  
                <div>
                  <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-neutral-400">
                    WhatsApp
                  </p>
                  <p className="text-[16px] text-neutral-800">+593 99 999 9999</p>
                </div>
  
                <div>
                  <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-neutral-400">
                    Horario
                  </p>
                  <p className="text-[16px] text-neutral-800">
                    Lunes a viernes · 10:00 a 18:00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }