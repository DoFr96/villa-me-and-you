/**
 * SEASONS COLLECTION
 * ==================
 *
 * Ovdje definiraš cijene po sezonama za svaku nekretninu.
 *
 * Tvoji zahtjevi:
 * ✓ Sezonske cijene (visoka, srednja, niska)
 * ✓ Vikend cijene (petak/subota skuplje) - van visoke sezone
 * ✓ Minimalni boravak po sezoni
 *
 * Kako radi:
 * 1. Kreiraš sezonu za nekretninu (npr. "Visoka sezona 2025")
 * 2. Postaviš baznu cijenu po noći
 * 3. Opcionalno: dodaš vikend dodatak
 * 4. Aplikacija računa ukupnu cijenu ovisno o datumima
 *
 * Primjer izračuna (5 noći, niska sezona, sri-pon):
 * - Sri: 120€ (bazna)
 * - Čet: 120€ (bazna)
 * - Pet: 150€ (bazna + 30€ vikend)
 * - Sub: 150€ (bazna + 30€ vikend)
 * - Ned: 120€ (bazna)
 * = UKUPNO: 660€
 */

import type { CollectionConfig } from 'payload'

export const Seasons: CollectionConfig = {
  slug: 'seasons',

  // ═══════════════════════════════════════════════════════════
  // ADMIN PANEL POSTAVKE
  // ═══════════════════════════════════════════════════════════
  admin: {
    useAsTitle: 'name',
    description: 'Sezone i cijene za nekretnine',
    group: 'Nekretnine',
    defaultColumns: ['name', 'property', 'startDate', 'endDate', 'pricePerNight'],
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
        description: 'Za koju nekretninu vrijedi ova sezona',
      },
    },

    // ─────────────────────────────────────────────────────────
    // Naziv sezone
    // ─────────────────────────────────────────────────────────
    {
      name: 'name',
      type: 'text',
      label: 'Naziv sezone',
      required: true,
      admin: {
        placeholder: 'npr. Visoka sezona 2025',
        description: 'Interno ime za lakše snalaženje',
      },
    },

    // ─────────────────────────────────────────────────────────
    // Tip sezone
    // ─────────────────────────────────────────────────────────
    {
      name: 'type',
      type: 'select',
      label: 'Tip sezone',
      required: true,
      options: [
        { label: '🔥 Visoka sezona', value: 'high' },
        { label: '☀️ Srednja sezona', value: 'mid' },
        { label: '❄️ Niska sezona', value: 'low' },
        { label: '🎄 Blagdani', value: 'holiday' },
        { label: '⭐ Specijalna', value: 'special' },
      ],
      admin: {
        description: 'Pomaže kategorizirati sezone',
      },
    },

    // ─────────────────────────────────────────────────────────
    // Datumi sezone
    // ─────────────────────────────────────────────────────────
    {
      type: 'row',
      fields: [
        {
          name: 'startDate',
          type: 'date',
          label: 'Početak sezone',
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
          label: 'Kraj sezone',
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
    // CIJENE
    // ─────────────────────────────────────────────────────────
    {
      name: 'pricing',
      type: 'group',
      label: 'Cijene',
      fields: [
        // Bazna cijena
        {
          name: 'pricePerNight',
          type: 'number',
          label: 'Cijena po noći (€)',
          required: true,
          min: 0,
          admin: {
            description: 'Bazna cijena za običan dan (pon-čet)',
            placeholder: '150',
          },
        },

        // Vikend cijena
        {
          name: 'weekendPricing',
          type: 'group',
          label: 'Vikend cijene',
          admin: {
            description: 'Petak i subota mogu imati višu cijenu',
          },
          fields: [
            {
              name: 'enabled',
              type: 'checkbox',
              label: 'Aktiviraj vikend cijene',
              defaultValue: false,
              admin: {
                description: 'Ako nije aktivno, vikend ima istu cijenu kao i ostali dani',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'fridayPrice',
                  type: 'number',
                  label: 'Cijena za petak (€)',
                  min: 0,
                  admin: {
                    width: '50%',
                    placeholder: '180',
                    condition: (data, siblingData) => siblingData?.enabled,
                  },
                },
                {
                  name: 'saturdayPrice',
                  type: 'number',
                  label: 'Cijena za subotu (€)',
                  min: 0,
                  admin: {
                    width: '50%',
                    placeholder: '180',
                    condition: (data, siblingData) => siblingData?.enabled,
                  },
                },
              ],
            },
            // Alternativa: dodatak umjesto fiksne cijene
            {
              name: 'usePercentage',
              type: 'checkbox',
              label: 'Koristi postotak umjesto fiksne cijene',
              defaultValue: false,
              admin: {
                description: 'Umjesto fiksne vikend cijene, dodaj postotak na baznu cijenu',
                condition: (data, siblingData) => siblingData?.enabled,
              },
            },
            {
              name: 'weekendPercentage',
              type: 'number',
              label: 'Vikend dodatak (%)',
              min: 0,
              max: 100,
              admin: {
                placeholder: '20',
                description: 'npr. 20 = bazna cijena + 20%',
                condition: (data, siblingData) =>
                  siblingData?.enabled && siblingData?.usePercentage,
              },
            },
          ],
        },

        // Čišćenje
        {
          name: 'cleaningFee',
          type: 'number',
          label: 'Naknada za čišćenje (€)',
          min: 0,
          defaultValue: 0,
          admin: {
            description: 'Jednokratna naknada po rezervaciji. 0 = nema naknade.',
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // PRAVILA BORAVKA
    // ─────────────────────────────────────────────────────────
    {
      name: 'stayRules',
      type: 'group',
      label: 'Pravila boravka',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'minStay',
              type: 'number',
              label: 'Minimalno noćenja',
              min: 2,
              defaultValue: 2,
              admin: {
                width: '33%',
                description: 'Minimum dana za rezervaciju',
              },
            },

            {
              name: 'maxStay',
              type: 'number',
              label: 'Maksimalno noćenja',
              min: 2,
              defaultValue: 30,
              admin: { width: '33%' },
            },
          ],
        },

        // Dani za check-in
        {
          name: 'allowedCheckInDays',
          type: 'select',
          label: 'Dozvoljeni dani za check-in',
          hasMany: true,
          defaultValue: [
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday',
          ],
          options: [
            { label: 'Ponedjeljak', value: 'monday' },
            { label: 'Utorak', value: 'tuesday' },
            { label: 'Srijeda', value: 'wednesday' },
            { label: 'Četvrtak', value: 'thursday' },
            { label: 'Petak', value: 'friday' },
            { label: 'Subota', value: 'saturday' },
            { label: 'Nedjelja', value: 'sunday' },
          ],
          admin: {
            description:
              'Ostavi sve odabrano za bilo koji dan. U visokoj sezoni možda samo subota.',
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // BOJA (za kalendar prikaz)
    // ─────────────────────────────────────────────────────────
    {
      name: 'color',
      type: 'text',
      label: 'Boja u kalendaru',
      defaultValue: '#3B82F6',
      admin: {
        position: 'sidebar',
        description: 'HEX boja za prikaz u kalendaru',
        // TODO: Dodati color picker komponentu
      },
    },

    // ─────────────────────────────────────────────────────────
    // STATUS
    // ─────────────────────────────────────────────────────────
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Aktivna sezona',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Neaktivne sezone se ignoriraju pri izračunu cijena',
      },
    },

    // ─────────────────────────────────────────────────────────
    // NAPOMENE
    // ─────────────────────────────────────────────────────────
    {
      name: 'notes',
      type: 'textarea',
      label: 'Interne napomene',
      admin: {
        description: 'Samo za internu upotrebu, gosti ne vide',
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════
  // HOOKS - Automatske provjere
  // ═══════════════════════════════════════════════════════════
  hooks: {
    // Provjera prije spremanja
    beforeValidate: [
      ({ data }) => {
        // Provjeri da endDate nije prije startDate
        if (data?.startDate && data?.endDate) {
          const start = new Date(data.startDate)
          const end = new Date(data.endDate)
          if (end < start) {
            throw new Error('Datum kraja sezone mora biti nakon datuma početka')
          }
        }
        return data
      },
    ],
  },

  timestamps: true,
}
