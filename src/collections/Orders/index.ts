import { adminOnly } from '@/access/adminOnly'
import type { CollectionOverride } from '@payloadcms/plugin-ecommerce/types'

export const Orders: CollectionOverride = ({ defaultCollection }) => ({
  ...defaultCollection,
  // DEFINIMOS EL ACCESO ESTRICTO AQUÍ
  access: {
    read: ({ req: { user } }) => {
      // El admin ve todo
      if (user?.role === 'admin') return true
      // El usuario solo ve sus propias órdenes (usando el campo 'customer' del plugin)
      return { customer: { equals: user?.id } }
    },
    create: () => true, // Permitimos compras como invitado
    update: adminOnly,  // Solo el admin puede editar una orden (ej. cambiar estado)
    delete: adminOnly,  // Solo el admin puede borrar
  },
  admin: {
    ...defaultCollection?.admin,
    group: 'Ecommerce',
    defaultColumns: ['id', 'createdAt', 'total', 'shippingMethod'],
  },
  fields: [
    ...defaultCollection.fields,
    {
      name: 'shippingMethod',
      type: 'select',
      label: 'Método de Envío',
      options: [
        { label: 'Retiro en Local (Gratis)', value: 'local' },
        { label: 'Servientrega ($5.00)', value: 'servientrega' },
      ],
      required: true,
    },
    {
      name: 'shippingCost',
      type: 'number',
      label: 'Costo de Envío Aplicado',
    },
    {
      name: 'stripePaymentIntentID',
      type: 'text',
      label: 'ID de Pago Stripe',
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'accessToken',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      hooks: {
        beforeValidate: [
          ({ value, operation }) => {
            if (operation === 'create' || !value) {
              return crypto.randomUUID()
            }
            return value
          },
        ],
      },
    },
  ],
})