import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    description: 'Korisnici koji mogu pristupiti admin panelu',
    group: 'Administracija',
  },
  auth: {
    tokenExpiration: 604800,
    maxLoginAttempts: 5,
    lockTime: 600,
  },
  fields: [
    { name: 'firstName', type: 'text', label: 'Ime', required: true },
    { name: 'lastName', type: 'text', label: 'Prezime', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'manager',
      options: [
        { label: 'Super Admin', value: 'super-admin' },
        { label: 'Manager', value: 'manager' },
      ],
      access: {
        update: ({ req }) => {
          return req.user?.role === 'super-admin'
        },
      },
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telefon',
      required: false,
      admin: {
        placeholder: '+385 91 234 5678',
      },
    },
    {
      name: 'managedProperties',
      type: 'relationship',
      label: 'Upravlja nekretninama',
      relationTo: 'properties',
      hasMany: true,
      admin: {
        condition: (data) => data?.role === 'manager',
        description: 'Odaberi koje nekretnine ovaj manager moze uredivati',
      },
    },
  ],

  timestamps: true,
}
