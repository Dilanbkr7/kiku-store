'use client'

import Link from 'next/link'
import React from 'react'

const cardStyle: React.CSSProperties = {
  border: '1px solid rgba(0,0,0,0.08)',
  borderRadius: '24px',
  padding: '22px',
  background: 'rgba(255,255,255,0.96)',
  boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
  transition: 'transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease',
}

const labelStyle: React.CSSProperties = {
  fontSize: '11px',
  letterSpacing: '0.28em',
  textTransform: 'uppercase',
  color: 'rgba(0,0,0,0.40)',
  marginBottom: '10px',
}

const titleStyle: React.CSSProperties = {
  fontSize: '28px',
  lineHeight: 0.95,
  letterSpacing: '-0.05em',
  fontWeight: 300,
  margin: 0,
  color: '#111111',
}

const descStyle: React.CSSProperties = {
  marginTop: '14px',
  marginBottom: 0,
  fontSize: '14px',
  lineHeight: 1.8,
  color: 'rgba(0,0,0,0.58)',
}

const quickLinkStyle: React.CSSProperties = {
  display: 'block',
  padding: '16px 18px',
  borderRadius: '18px',
  border: '1px solid rgba(0,0,0,0.08)',
  background: '#fff',
  color: '#111',
  textDecoration: 'none',
}

export function BeforeDashboard() {
  return (
    <div
      style={{
        width: '100%',
        marginBottom: '2rem',
      }}
    >
      {/* HERO */}
      <section
        style={{
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: '28px',
          padding: '34px 28px',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(247,244,238,0.98) 100%)',
          boxShadow: '0 14px 38px rgba(0,0,0,0.04)',
          marginBottom: '20px',
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
          KIKÚ Dashboard
        </div>

        <h2
          style={{
            margin: 0,
            fontSize: '44px',
            lineHeight: 0.92,
            fontWeight: 300,
            letterSpacing: '-0.065em',
            color: '#111111',
            maxWidth: '12ch',
          }}
        >
          Elegancia,
          <br />
          control y
          <br />
          gestión.
        </h2>

        <p
          style={{
            marginTop: '18px',
            marginBottom: 0,
            maxWidth: '56ch',
            fontSize: '14px',
            lineHeight: 1.9,
            color: 'rgba(0,0,0,0.58)',
          }}
        >
          Administra productos, temporadas, imágenes, páginas y pedidos desde una
          interfaz más alineada con el universo visual de KIKÚ.
        </p>
      </section>

      {/* QUICK ACTIONS */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '14px',
          marginBottom: '20px',
        }}
      >
        <Link href="/admin/collections/products" style={quickLinkStyle}>
          <div style={labelStyle}>Productos</div>
          <div style={{ fontSize: '22px', fontWeight: 300, letterSpacing: '-0.04em' }}>
            Manage products
          </div>
          <p style={{ ...descStyle, marginTop: '10px' }}>
            Edita catálogo, precios, variantes y temporadas.
          </p>
        </Link>

        <Link href="/admin/collections/orders" style={quickLinkStyle}>
          <div style={labelStyle}>Pedidos</div>
          <div style={{ fontSize: '22px', fontWeight: 300, letterSpacing: '-0.04em' }}>
            Review orders
          </div>
          <p style={{ ...descStyle, marginTop: '10px' }}>
            Revisa órdenes, estados, pagos y seguimiento.
          </p>
        </Link>

        <Link href="/admin/collections/media" style={quickLinkStyle}>
          <div style={labelStyle}>Media</div>
          <div style={{ fontSize: '22px', fontWeight: 300, letterSpacing: '-0.04em' }}>
            Upload assets
          </div>
          <p style={{ ...descStyle, marginTop: '10px' }}>
            Gestiona campañas, fotos editoriales y contenido visual.
          </p>
        </Link>

        <Link href="/admin/collections/pages" style={quickLinkStyle}>
          <div style={labelStyle}>Contenido</div>
          <div style={{ fontSize: '22px', fontWeight: 300, letterSpacing: '-0.04em' }}>
            Edit pages
          </div>
          <p style={{ ...descStyle, marginTop: '10px' }}>
            Actualiza páginas, bloques y narrativa de marca.
          </p>
        </Link>
      </section>

      {/* INFO GRID */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '14px',
        }}
      >
        <div
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 16px 34px rgba(0,0,0,0.05)'
            e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.03)'
            e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'
          }}
        >
          <div style={labelStyle}>Store flow</div>
          <h3 style={titleStyle}>Products · Orders · Media</h3>
          <p style={descStyle}>
            La tienda está estructurada para separar catálogo, contenido visual y
            operación comercial de forma clara.
          </p>
        </div>

        <div
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 16px 34px rgba(0,0,0,0.05)'
            e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.03)'
            e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'
          }}
        >
          <div style={labelStyle}>Brand system</div>
          <h3 style={titleStyle}>Editorial consistency</h3>
          <p style={descStyle}>
            Utiliza el panel para mantener consistencia entre temporadas, grids,
            assets y narrativa visual.
          </p>
        </div>

        <div
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 16px 34px rgba(0,0,0,0.05)'
            e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.03)'
            e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'
          }}
        >
          <div style={labelStyle}>KIKÚ</div>
          <h3 style={titleStyle}>Quiet luxury admin</h3>
          <p style={descStyle}>
            El panel puede sentirse técnico por defecto; aquí lo convertimos en una
            experiencia más alineada con la marca.
          </p>
        </div>
      </section>
    </div>
  )
}