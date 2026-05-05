export default function ShippingReturnsPage() {
    return (
      <main className="bg-[#f8f5ef] text-neutral-900">
        <section className="container py-20 md:py-28">
          <p className="mb-4 text-[10px] uppercase tracking-[0.45em] text-neutral-400">
            Información
          </p>
  
          <h1 className="max-w-[12ch] text-4xl font-[300] leading-[0.95] tracking-[-0.04em] md:text-6xl">
            Envíos y devoluciones
          </h1>
  
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <div className="border border-[#e7e2d9] bg-white/70 p-8">
              <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-neutral-400">
                Envíos
              </p>
              <div className="space-y-4 text-[15px] leading-7 text-neutral-700">
                <p>
                  Procesamos pedidos en días hábiles. Los tiempos de entrega pueden
                  variar según tu ubicación y la disponibilidad de la pieza.
                </p>
                <p>
                  Una vez confirmado tu pedido, recibirás la información correspondiente
                  para dar seguimiento a tu compra.
                </p>
              </div>
            </div>
  
            <div className="border border-[#e7e2d9] bg-white/70 p-8">
              <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-neutral-400">
                Devoluciones
              </p>
              <div className="space-y-4 text-[15px] leading-7 text-neutral-700">
                <p>
                  Si necesitas gestionar un cambio o devolución, escríbenos para revisar
                  tu caso y ayudarte con el proceso correspondiente.
                </p>
                <p>
                  Las piezas deben conservar su estado original y cumplir con las
                  condiciones indicadas por KIKÚ.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }