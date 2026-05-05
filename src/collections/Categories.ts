import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { adminOnly } from '@/access/adminOnly'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: () => true,
    update: adminOnly,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content', // Organizado en la pestaña de Contenido
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Título de Categoría',
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media', // Conecta con tu colección de imágenes
      label: 'Imagen de Portada',
      admin: {
        description: 'Imagen principal para mostrar en la cuadrícula de categorías de la Home.',
      },
    },
    slugField({
      position: undefined,
    }),
  ],
}