export default function FAQPage() {
    const items = [
      {
        q: '¿Cómo elijo mi talla?',
        a: 'Puedes revisar la selección disponible en cada producto. Si necesitas una recomendación más precisa, nuestro equipo puede ayudarte antes de tu compra.',
      },
      {
        q: '¿Los colores pueden variar?',
        a: 'Los tonos pueden variar ligeramente según la luz de la fotografía o la pantalla desde donde visualices la pieza.',
      },
      {
        q: '¿Qué pasa si una talla está agotada?',
        a: 'Algunas piezas pueden volver a estar disponibles. Puedes escribirnos para confirmar reposición o alternativas similares.',
      },
      {
        q: '¿Puedo recibir asesoría antes de comprar?',
        a: 'Sí. KIKÚ ofrece atención personalizada para ayudarte con tallas, colores, disponibilidad y selección de producto.',
      },
    ]
  
    return (
      <main className="bg-[#f8f5ef] text-neutral-900">
        <section className="container py-20 md:py-28">
          <p className="mb-4 text-[10px] uppercase tracking-[0.45em] text-neutral-400">
            Ayuda
          </p>
  
          <h1 className="max-w-[14ch] text-4xl font-[300] leading-[0.95] tracking-[-0.04em] md:text-6xl">
            Preguntas frecuentes
          </h1>
  
          <div className="mt-14 divide-y divide-[#e7e2d9] border-y border-[#e7e2d9] bg-white/60">
            {items.map((item) => (
              <div key={item.q} className="grid gap-4 px-6 py-8 md:grid-cols-[0.9fr_1.1fr] md:px-8">
                <h2 className="text-[18px] font-medium text-neutral-900">{item.q}</h2>
                <p className="text-[15px] leading-7 text-neutral-700">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    )
  }