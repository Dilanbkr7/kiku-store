import { CollectionArchive } from '@/components/CollectionArchive'
import { RichText } from '@/components/RichText'
import type { ArchiveBlock as ArchiveBlockProps } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

export const ArchiveBlock: React.FC<ArchiveBlockProps & { id?: string }> = async (props) => {
  const { id, introContent, limit: limitFromProps, relationTo, selectedDocs, populateBy } = props
  const limit = limitFromProps || 4
  const payload = await getPayload({ config: configPromise })

  let dataToRender: any[] = []

  // Si en el CMS elegiste "Categories"
  if (relationTo === 'categories') {
    const fetchedCategories = await payload.find({
      collection: 'categories',
      limit,
      depth: 1, // Esto es vital para traer la URL de la foto
    })
    dataToRender = fetchedCategories.docs
  } 
  // Si elegiste Productos (lo que venía por defecto)
  else if (populateBy === 'collection') {
    const fetchedProducts = await payload.find({
      collection: 'products',
      limit,
      depth: 1,
    })
    dataToRender = fetchedProducts.docs
  } else {
    dataToRender = selectedDocs?.map(doc => doc.value) || []
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-12">
          <RichText className="ml-0 max-w-3xl" data={introContent} enableGutter={false} />
        </div>
      )}
      {/* Pasamos los datos al pintor */}
      <CollectionArchive posts={dataToRender} />
    </div>
  )
}