/**
 * BLOCKED DATES COLLECTION
 * ========================
 *
 * Za blokiranje datuma kada nekretnina nije dostupna.
 *
 * Kada koristiti?
 * - Ti želiš koristiti vilu (privatno)
 * - Imaš rezervaciju s Booking.com ili Airbnb
 * - Radovi/održavanje
 * - Bilo koji drugi razlog
 *
 * iCal Sync:
 * - Kasnije ćemo dodati automatski import iz Booking.com i Airbnb
 * - Kada netko rezervira preko Booking.com, automatski se blokira ovdje
 * - I obrnuto: tvoje rezervacije se šalju njima
 */

import type { CollectionConfig } from 'payload'

export const BlockedDates: CollectionConfig = {
  slug: 'blocked-dates',

  // ═══════════════════════════════════════════════════════════
  // ADMIN PANEL POSTAVKE
  // ═══════════════════════════════════════════════════════════
  admin: {
    useAsTitle: 'reason',
    description: 'Datumi kada nekretnina nije dostupna za rezervaciju',
    group: 'Nekretnine',
    defaultColumns: ['property', 'startDate', 'endDate', 'source', 'reason'],
  },

  // ═══════════════════════════════════════════════════════════
  // POLJA
  // ═══════════════════════════════════════════════════════════
  fields: [
    // ─────────────────────────────────────────────────────────
    // Poveznica na nekretninu
    // ─────────────────────────────────────────────────────────
    {
      name: 'property',
      type: 'relationship',
      label: 'Nekretnina',
      relationTo: 'properties',
      required: true,
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },

    // ─────────────────────────────────────────────────────────
    // Datumi blokade
    // ─────────────────────────────────────────────────────────
    {
      type: 'row',
      fields: [
        {
          name: 'startDate',
          type: 'date',
          label: 'Od datuma',
          required: true,
          admin: {
            width: '50%',
            date: {
              pickerAppearance: 'dayOnly',
              displayFormat: 'd.M.yyyy',
            },
          },
        },
        {
          name: 'endDate',
          type: 'date',
          label: 'Do datuma',
          required: true,
          admin: {
            width: '50%',
            date: {
              pickerAppearance: 'dayOnly',
              displayFormat: 'd.M.yyyy',
            },
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Izvor blokade
    // ─────────────────────────────────────────────────────────
    {
      name: 'source',
      type: 'select',
      label: 'Izvor',
      required: true,
      defaultValue: 'manual',
      options: [
        {
          label: '✍️ Ručno uneseno',
          value: 'manual',
        },
        {
          label: '🅱️ Booking.com',
          value: 'booking-com',
        },
        {
          label: '🏠 Airbnb',
          value: 'airbnb',
        },
        {
          label: '📅 VRBO/HomeAway',
          value: 'vrbo',
        },
        {
          label: '🔗 Drugi iCal',
          value: 'ical-other',
        },
      ],
      admin: {
        description: 'Odakle dolazi ova blokada',
      },
    },

    // ─────────────────────────────────────────────────────────
    // Razlog blokade
    // ─────────────────────────────────────────────────────────
    {
      name: 'reason',
      type: 'select',
      label: 'Razlog',
      required: true,
      defaultValue: 'owner-use',
      options: [
        { label: '🏠 Privatno korištenje', value: 'owner-use' },
        { label: '🔧 Održavanje/Radovi', value: 'maintenance' },
        { label: '📅 Vanjska rezervacija', value: 'external-booking' },
        { label: '🧹 Čišćenje', value: 'cleaning' },
        { label: '❓ Ostalo', value: 'other' },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Dodatne napomene
    // ─────────────────────────────────────────────────────────
    {
      name: 'notes',
      type: 'textarea',
      label: 'Napomene',
      admin: {
        placeholder: 'npr. Rezervacija preko Booking.com #12345, Gost: Ivan Horvat',
        description: 'Interne napomene',
      },
    },

    // ─────────────────────────────────────────────────────────
    // iCal podaci (za sync)
    // ─────────────────────────────────────────────────────────
    {
      name: 'icalData',
      type: 'group',
      label: 'iCal podaci',
      admin: {
        description: 'Automatski popunjeno kod iCal importa',
        condition: (data) => data?.source !== 'manual',
      },
      fields: [
        {
          name: 'uid',
          type: 'text',
          label: 'iCal UID',
          admin: {
            readOnly: true,
            description: 'Jedinstveni ID iz iCal feeda',
          },
        },
        {
          name: 'summary',
          type: 'text',
          label: 'iCal Summary',
          admin: {
            readOnly: true,
            description: 'Naslov iz iCal eventa',
          },
        },
        {
          name: 'lastSynced',
          type: 'date',
          label: 'Zadnja sinkronizacija',
          admin: {
            readOnly: true,
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Status
    // ─────────────────────────────────────────────────────────
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Aktivna blokada',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Neaktivne blokade se ignoriraju',
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════
  // HOOKS
  // ═══════════════════════════════════════════════════════════
  hooks: {
    beforeValidate: [
      ({ data }) => {
        // Provjeri datume
        if (data?.startDate && data?.endDate) {
          const start = new Date(data.startDate)
          const end = new Date(data.endDate)
          if (end < start) {
            throw new Error('Datum kraja mora biti nakon datuma početka')
          }
        }
        return data
      },
    ],
  },

  timestamps: true,
}
