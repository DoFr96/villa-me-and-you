/**
 * ICAL FEEDS COLLECTION
 * =====================
 *
 * Za sinkronizaciju kalendara s vanjskim platformama.
 *
 * Kako radi iCal sync?
 * ────────────────────
 *
 * 1. IMPORT (Booking.com/Airbnb → Tvoja app):
 *    - Booking.com i Airbnb nude iCal URL s njihovim rezervacijama
 *    - Tvoja app periodično dohvaća taj URL
 *    - Nove rezervacije se automatski dodaju kao BlockedDates
 *
 * 2. EXPORT (Tvoja app → Booking.com/Airbnb):
 *    - Tvoja app generira iCal URL sa svim zauzetim datumima
 *    - Taj URL daš Booking.com/Airbnb da uvezu
 *    - Kada netko rezervira direktno, platforme to vide
 *
 * Primjer Booking.com iCal URL-a:
 * https://admin.booking.com/hotel/hoteladmin/ical.html?t=xxx
 *
 * Primjer Airbnb iCal URL-a:
 * https://www.airbnb.com/calendar/ical/xxx.ics?s=xxx
 */

import type { CollectionConfig } from 'payload'

export const ICalFeeds: CollectionConfig = {
  slug: 'ical-feeds',

  // ═══════════════════════════════════════════════════════════
  // ADMIN PANEL POSTAVKE
  // ═══════════════════════════════════════════════════════════
  admin: {
    useAsTitle: 'name',
    description: 'Sinkronizacija kalendara s Booking.com, Airbnb i drugim platformama',
    group: 'Integracije',
    defaultColumns: ['name', 'property', 'platform', 'direction', 'lastSync', 'isActive'],
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
        description: 'Za koju nekretninu je ovaj feed',
      },
    },

    // Status
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Aktivan',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Neaktivni feedovi se ne sinkroniziraju',
      },
    },

    // ─────────────────────────────────────────────────────────
    // Naziv feeda
    // ─────────────────────────────────────────────────────────
    {
      name: 'name',
      type: 'text',
      label: 'Naziv',
      required: true,
      admin: {
        placeholder: 'npr. Booking.com - Vila Adriatica',
      },
    },

    // ─────────────────────────────────────────────────────────
    // Platforma
    // ─────────────────────────────────────────────────────────
    {
      name: 'platform',
      type: 'select',
      label: 'Platforma',
      required: true,
      options: [
        { label: '🅱️ Booking.com', value: 'booking-com' },
        { label: '🏠 Airbnb', value: 'airbnb' },
        { label: '🏡 VRBO/HomeAway', value: 'vrbo' },
        { label: '📅 Google Calendar', value: 'google' },
        { label: '🔗 Drugi iCal', value: 'other' },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Smjer sinkronizacije
    // ─────────────────────────────────────────────────────────
    {
      name: 'direction',
      type: 'select',
      label: 'Smjer',
      required: true,
      defaultValue: 'import',
      options: [
        {
          label: '⬇️ Import (platforma → naša app)',
          value: 'import',
        },
        {
          label: '⬆️ Export (naša app → platforma)',
          value: 'export',
        },
        {
          label: '🔄 Oboje',
          value: 'both',
        },
      ],
      admin: {
        description: 'Import = dohvaćamo njihove rezervacije. Export = oni dohvaćaju naše.',
      },
    },

    // ─────────────────────────────────────────────────────────
    // IMPORT POSTAVKE
    // ─────────────────────────────────────────────────────────
    {
      name: 'importSettings',
      type: 'group',
      label: 'Import postavke',
      admin: {
        condition: (data) => data?.direction === 'import' || data?.direction === 'both',
      },
      fields: [
        {
          name: 'importUrl',
          type: 'text',
          label: 'iCal Import URL',
          admin: {
            placeholder: 'https://admin.booking.com/hotel/hoteladmin/ical.html?t=xxx',
            description: 'URL koji dohvaćamo za uvoz rezervacija',
          },
        },
        {
          name: 'syncFrequency',
          type: 'select',
          label: 'Učestalost sinkronizacije',
          defaultValue: 'hourly',
          options: [
            { label: 'Svakih 15 minuta', value: '15min' },
            { label: 'Svakih 30 minuta', value: '30min' },
            { label: 'Svaki sat', value: 'hourly' },
            { label: 'Svaka 2 sata', value: '2hours' },
            { label: 'Svaka 6 sati', value: '6hours' },
            { label: 'Dnevno', value: 'daily' },
          ],
        },
        {
          name: 'autoBlockDates',
          type: 'checkbox',
          label: 'Automatski blokiraj datume',
          defaultValue: true,
          admin: {
            description: 'Automatski kreira BlockedDates za uvezene rezervacije',
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // EXPORT POSTAVKE
    // ─────────────────────────────────────────────────────────
    {
      name: 'exportSettings',
      type: 'group',
      label: 'Export postavke',
      admin: {
        condition: (data) => data?.direction === 'export' || data?.direction === 'both',
      },
      fields: [
        {
          name: 'exportUrl',
          type: 'text',
          label: 'Naš iCal Export URL',
          admin: {
            readOnly: true,
            description: 'Ovaj URL daš platformi za uvoz naših rezervacija. Automatski generiran.',
          },
        },
        {
          name: 'includeBlockedDates',
          type: 'checkbox',
          label: 'Uključi blokirane datume',
          defaultValue: true,
          admin: {
            description: 'Eksportira i ručno blokirane datume, ne samo rezervacije',
          },
        },
        {
          name: 'includeBuffer',
          type: 'checkbox',
          label: 'Uključi buffer dane',
          defaultValue: false,
          admin: {
            description: 'Dodaj dan prije i poslije svake rezervacije (za čišćenje)',
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // SYNC STATUS
    // ─────────────────────────────────────────────────────────
    {
      name: 'syncStatus',
      type: 'group',
      label: 'Status sinkronizacije',
      admin: {
        description: 'Automatski ažurirano',
      },
      fields: [
        {
          name: 'lastSync',
          type: 'date',
          label: 'Zadnja sinkronizacija',
          admin: {
            readOnly: true,
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
        {
          name: 'lastSyncStatus',
          type: 'select',
          label: 'Status',
          admin: {
            readOnly: true,
          },
          options: [
            { label: '✅ Uspješno', value: 'success' },
            { label: '❌ Greška', value: 'error' },
            { label: '⏳ U tijeku', value: 'in-progress' },
            { label: '⏸️ Nikada', value: 'never' },
          ],
          defaultValue: 'never',
        },
        {
          name: 'lastSyncError',
          type: 'textarea',
          label: 'Zadnja greška',
          admin: {
            readOnly: true,
            condition: (data, siblingData) => siblingData?.lastSyncStatus === 'error',
          },
        },
        {
          name: 'eventsImported',
          type: 'number',
          label: 'Uvezeno događaja',
          admin: {
            readOnly: true,
            description: 'Ukupan broj uvezenih rezervacija',
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // NAPOMENE
    // ─────────────────────────────────────────────────────────
    {
      name: 'notes',
      type: 'textarea',
      label: 'Napomene',
      admin: {
        description: 'Interne napomene',
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════
  // HOOKS
  // ═══════════════════════════════════════════════════════════
  hooks: {
    // Generiraj export URL pri kreiranju
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && data) {
          // Generiraj jedinstveni token za export URL
          const token = Math.random().toString(36).substring(2, 15)

          if (data.direction === 'export' || data.direction === 'both') {
            data.exportSettings = data.exportSettings || {}
            // URL će biti nešto poput: /api/ical/export/[token]
            data.exportSettings.exportUrl = `/api/ical/export/${token}`
          }
        }
        return data
      },
    ],
  },

  timestamps: true,
}
