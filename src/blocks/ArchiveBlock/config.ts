import type { Block } from 'payload'
// ... (manten tus imports de lexicalEditor, etc.)

export const Archive: Block = {
  slug: 'archive',
  interfaceName: 'ArchiveBlock',
  fields: [
    {
      name: 'introContent',
      type: 'richText',
      label: 'Intro Content',
      // ... (manten tu configuración de editor)
    },
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      options: [
        { label: 'Collection', value: 'collection' },
        { label: 'Individual Selection', value: 'selection' },
      ],
    },
    {
      name: 'relationTo',
      type: 'select',
      defaultValue: 'products',
      label: 'Collections To Show',
      options: [
        { label: 'Products', value: 'products' },
        { label: 'Categories', value: 'categories' }, // AÑADIDO: Ahora puedes elegir categorías
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => 
          siblingData.populateBy === 'collection' && 
          siblingData.relationTo === 'products', // Solo si vas a mostrar productos filtrados
      },
      hasMany: true,
      label: 'Filter Products by Categories',
      relationTo: 'categories',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 10,
      label: 'Limit',
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      label: 'Selection',
      relationTo: ['products', 'categories'], // AÑADIDO: Puedes seleccionar categorías manualmente
    },
  ],
}