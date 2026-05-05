'use client'


export function BeforeLogin() {
  return (
    <div
      style={{
        width: '100%',
        marginBottom: '1.5rem',
      }}
    >
      <div
        style={{
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: '24px',
          padding: '32px 28px',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,246,242,0.98) 100%)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
        }}
      >
        <div
          style={{
            fontSize: '12px',
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.42)',
            marginBottom: '14px',
          }}
        >
          KIKÚ Admin
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: '40px',
            lineHeight: 0.95,
            fontWeight: 300,
            letterSpacing: '-0.06em',
            color: '#111111',
          }}
        >
          Store management
          <br />
          with quiet luxury.
        </h1>

        <p
          style={{
            marginTop: '18px',
            marginBottom: 0,
            maxWidth: '48ch',
            fontSize: '14px',
            lineHeight: 1.8,
            color: 'rgba(0,0,0,0.58)',
          }}
        >
          Accede al panel de administración de KIKÚ para gestionar productos,
          colecciones, media, pedidos y contenido de marca desde un solo lugar.
        </p>
      </div>
    </div>
  )
}