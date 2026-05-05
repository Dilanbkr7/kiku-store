import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'

import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const serif = Playfair_Display({
  subsets: ['latin'],
  style: ['italic', 'normal'],
  variable: '--font-serif',
})

const BRAND_NAME = process.env.SITE_NAME || 'KIKÚ'
const baseUrl = 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  robots: {
    follow: true,
    index: true,
  },
  title: {
    default: BRAND_NAME,
    template: '%s | ' + BRAND_NAME,
  },
  description: 'KIKÚ is a minimal luxury womenswear label for considered wardrobes.',
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      className={[sans.variable, serif.variable].filter(Boolean).join(' ')}
      lang="es"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>

      <body className="bg-[#f8f5ef] font-sans text-neutral-900 antialiased selection:bg-black/10">
        <Providers>
          <AdminBar />
          <LivePreviewListener />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}