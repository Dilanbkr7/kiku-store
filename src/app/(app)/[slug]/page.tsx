import type { Metadata } from 'next'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { homeStaticData } from '@/endpoints/seed/home-static'
import React from 'react'
import type { Media, Page, Product } from '@/payload-types'
import { notFound } from 'next/navigation'
import { KikuHome } from '@/components/home/KikuHome'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => doc.slug !== 'home')
    .map(({ slug }) => ({ slug }))

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params }: Args) {
  const { slug = 'home' } = await params

  let page = await queryPageBySlug({ slug })

  if (!page && slug === 'home') {
    page = homeStaticData() as Page
  }

  if (!page) {
    return notFound()
  }

  // 🔥 HOME PERSONALIZADO
  if (slug === 'home') {
    const payload = await getPayload({ config: configPromise })

    const [productsQuery, mediaQuery, categoriesQuery] = await Promise.all([
      payload.find({
        collection: 'products',
        draft: false,
        limit: 8,
        overrideAccess: false,
        pagination: false,
        sort: '-createdAt',
        where: {
          _status: { equals: 'published' },
        },
      }),
      payload.find({
        collection: 'media',
        limit: 8,
        overrideAccess: false,
        pagination: false,
        sort: '-createdAt',
      }),
      payload.find({
        collection: 'categories',
        depth: 1, // 🔥 clave para imágenes
        limit: 10,
        overrideAccess: false,
        pagination: false,
      }),
    ])

    return (
      <KikuHome
        newArrivals={productsQuery.docs as Product[]}
        galleryMedia={mediaQuery.docs as Media[]}
        categories={categoriesQuery.docs}
        hero={page.hero}
      />
    )
  }

  // 📄 PÁGINAS NORMALES
  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = 'home' } = await params
  const page = await queryPageBySlug({ slug })
  return generateMeta({ doc: page })
}

const queryPageBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        ...(draft ? [] : [{ _status: { equals: 'published' } }]),
      ],
    },
  })

  return result.docs?.[0] || null
}