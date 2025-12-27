/**
 * BOOKINGS COLLECTION
 * ===================
 *
 * Ovo je SRCE booking sistema - sve rezervacije.
 *
 * Tvoji zahtjevi:
 * ✓ Kapara 30% pri rezervaciji
 * ✓ Ostatak (70%) plaća se 14 dana prije check-in
 * ✓ Izračun cijene prema sezonama + vikend cijene
 *
 * Životni ciklus rezervacije:
 *
 * 1. PENDING      → Gost je ispunio formu, čeka plaćanje kapare
 * 2. DEPOSIT_PAID → Kapara plaćena, rezervacija potvrđena
 * 3. FULLY_PAID   → Cijeli iznos plaćen
 * 4. CHECKED_IN   → Gost je stigao
 * 5. COMPLETED    → Gost je otišao, sve OK
 * 6. CANCELLED    → Otkazano (može biti refund)
 *
 * Plaćanje:
 * - depositAmount = 30% od totalPrice
 * - remainingAmount = 70% od totalPrice
 * - remainingDueDate = checkIn - 14 dana
 */

import type { CollectionConfig } from 'payload'

export const Bookings: CollectionConfig = {
  slug: 'bookings',

  // ═══════════════════════════════════════════════════════════
  // ADMIN PANEL POSTAVKE
  // ═══════════════════════════════════════════════════════════
  admin: {
    useAsTitle: 'bookingNumber',
    description: 'Sve rezervacije nekretnina',
    group: 'Rezervacije',
    defaultColumns: [
      'bookingNumber',
      'property',
      'guestName',
      'checkIn',
      'checkOut',
      'status',
      'paymentStatus',
      'totalPrice',
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // POLJA
  // ═══════════════════════════════════════════════════════════
  fields: [
    // ╔═══════════════════════════════════════════════════════╗
    // ║ IDENTIFIKACIJA                                        ║
    // ╚═══════════════════════════════════════════════════════╝
    {
      name: 'bookingNumber',
      type: 'text',
      label: 'Broj rezervacije',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Automatski generiran',
      },
      hooks: {
        beforeValidate: [
          ({ value }) => {
            // Ako nema vrijednost, generiraj
            if (!value) {
              // Format: BK-YYYYMMDD-XXXX (npr. BK-20250715-A1B2)
              const date = new Date()
              const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '')
              const random = Math.random().toString(36).substring(2, 6).toUpperCase()
              return `BK-${dateStr}-${random}`
            }
            return value
          },
        ],
      },
    },

    // Poveznica na nekretninu
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

    // ╔═══════════════════════════════════════════════════════╗
    // ║ STATUS REZERVACIJE                                    ║
    // ╚═══════════════════════════════════════════════════════╝
    {
      name: 'status',
      type: 'select',
      label: 'Status rezervacije',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: '⏳ Čeka plaćanje', value: 'pending' },
        { label: '💰 Kapara plaćena', value: 'deposit-paid' },
        { label: '✅ Potpuno plaćeno', value: 'fully-paid' },
        { label: '🏠 Gost u objektu', value: 'checked-in' },
        { label: '✨ Završeno', value: 'completed' },
        { label: '❌ Otkazano', value: 'cancelled' },
        { label: '⚠️ No-show', value: 'no-show' },
      ],
      admin: {
        position: 'sidebar',
      },
    },

    // ╔═══════════════════════════════════════════════════════╗
    // ║ TAB: PODACI O GOSTU                                   ║
    // ╚═══════════════════════════════════════════════════════╝
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Gost',
          description: 'Podaci o gostu',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'guestFirstName',
                  type: 'text',
                  label: 'Ime',
                  required: true,
                  admin: { width: '50%' },
                },
                {
                  name: 'guestLastName',
                  type: 'text',
                  label: 'Prezime',
                  required: true,
                  admin: { width: '50%' },
                },
              ],
            },

            // Virtual field za puno ime
            {
              name: 'guestName',
              type: 'text',
              label: 'Puno ime',
              admin: {
                hidden: true, // Ne prikazuj u formi
              },
              hooks: {
                beforeChange: [
                  ({ data }) => {
                    return `${data?.guestFirstName || ''} ${data?.guestLastName || ''}`.trim()
                  },
                ],
              },
            },

            {
              type: 'row',
              fields: [
                {
                  name: 'guestEmail',
                  type: 'email',
                  label: 'Email',
                  required: true,
                  admin: { width: '50%' },
                },
                {
                  name: 'guestPhone',
                  type: 'text',
                  label: 'Telefon',
                  required: true,
                  admin: {
                    width: '50%',
                    placeholder: '+385 91 234 5678',
                  },
                },
              ],
            },

            {
              type: 'row',
              fields: [
                {
                  name: 'guestCountry',
                  type: 'text',
                  label: 'Država',
                  admin: {
                    width: '50%',
                    placeholder: 'Hrvatska',
                  },
                },
                {
                  name: 'guestLanguage',
                  type: 'select',
                  label: 'Jezik komunikacije',
                  defaultValue: 'hr',
                  options: [
                    { label: 'Hrvatski', value: 'hr' },
                    { label: 'English', value: 'en' },
                    { label: 'Deutsch', value: 'de' },
                    { label: 'Italiano', value: 'it' },
                  ],
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },

        // ╔═══════════════════════════════════════════════════╗
        // ║ TAB: DATUMI I GOSTI                               ║
        // ╚═══════════════════════════════════════════════════╝
        {
          label: 'Boravak',
          description: 'Datumi i broj gostiju',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'checkIn',
                  type: 'date',
                  label: 'Check-in',
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
                  name: 'checkOut',
                  type: 'date',
                  label: 'Check-out',
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

            {
              type: 'row',
              fields: [
                {
                  name: 'numberOfGuests',
                  type: 'number',
                  label: 'Broj odraslih',
                  required: true,
                  min: 1,
                  defaultValue: 2,
                  admin: { width: '33%' },
                },
                {
                  name: 'numberOfChildren',
                  type: 'number',
                  label: 'Broj djece',
                  min: 0,
                  defaultValue: 0,
                  admin: { width: '33%' },
                },
                {
                  name: 'numberOfNights',
                  type: 'number',
                  label: 'Broj noćenja',
                  min: 2,
                  admin: {
                    width: '33%',
                    readOnly: true,
                    description: 'Automatski izračunato',
                  },
                },
              ],
            },

            {
              name: 'specialRequests',
              type: 'textarea',
              label: 'Posebni zahtjevi',
              admin: {
                placeholder: 'npr. Dolazimo s psom, Trebamo dječji krevetić...',
              },
            },

            {
              name: 'estimatedArrivalTime',
              type: 'text',
              label: 'Očekivano vrijeme dolaska',
              admin: {
                placeholder: '16:00 - 18:00',
              },
            },
          ],
        },

        // ╔═══════════════════════════════════════════════════╗
        // ║ TAB: CIJENE I PLAĆANJE                            ║
        // ╚═══════════════════════════════════════════════════╝
        {
          label: 'Plaćanje',
          description: 'Cijene i status plaćanja',
          fields: [
            // ─────────────────────────────────────────────────
            // IZRAČUN CIJENE
            // ─────────────────────────────────────────────────
            {
              name: 'priceBreakdown',
              type: 'group',
              label: 'Izračun cijene',
              admin: {
                description: 'Detaljan pregled cijene',
              },
              fields: [
                {
                  name: 'nightlyRates',
                  type: 'array',
                  label: 'Cijena po noćima',
                  admin: {
                    description: 'Automatski generirano iz sezona',
                    readOnly: true,
                  },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'date',
                          type: 'date',
                          label: 'Datum',
                          admin: { width: '40%' },
                        },
                        {
                          name: 'price',
                          type: 'number',
                          label: 'Cijena (€)',
                          admin: { width: '30%' },
                        },
                        {
                          name: 'isWeekend',
                          type: 'checkbox',
                          label: 'Vikend',
                          admin: { width: '30%' },
                        },
                      ],
                    },
                  ],
                },

                {
                  type: 'row',
                  fields: [
                    {
                      name: 'accommodationTotal',
                      type: 'number',
                      label: 'Smještaj ukupno (€)',
                      admin: { width: '50%', readOnly: true },
                    },
                    {
                      name: 'cleaningFee',
                      type: 'number',
                      label: 'Čišćenje (€)',
                      defaultValue: 0,
                      admin: { width: '50%' },
                    },
                  ],
                },

                {
                  name: 'extras',
                  type: 'array',
                  label: 'Dodaci',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'description',
                          type: 'text',
                          label: 'Opis',
                          admin: { width: '60%', placeholder: 'npr. Rani check-in' },
                        },
                        {
                          name: 'amount',
                          type: 'number',
                          label: 'Iznos (€)',
                          admin: { width: '40%' },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            // ─────────────────────────────────────────────────
            // UKUPNO I KAPARA
            // ─────────────────────────────────────────────────
            {
              name: 'paymentDetails',
              type: 'group',
              label: 'Detalji plaćanja',
              fields: [
                // Ukupna cijena
                {
                  name: 'totalPrice',
                  type: 'number',
                  label: 'UKUPNA CIJENA (€)',
                  required: true,
                  min: 0,
                  admin: {
                    description: 'Ukupan iznos rezervacije',
                  },
                },

                // Postotak kapare
                {
                  name: 'depositPercentage',
                  type: 'number',
                  label: 'Postotak kapare (%)',
                  defaultValue: 30,
                  min: 0,
                  max: 100,
                  admin: {
                    description: 'Koliki postotak se plaća odmah',
                  },
                },

                {
                  type: 'row',
                  fields: [
                    // Iznos kapare (30%)
                    {
                      name: 'depositAmount',
                      type: 'number',
                      label: 'Kapara (€)',
                      min: 0,
                      admin: {
                        width: '50%',
                        readOnly: true,
                        description: 'Plaća se pri rezervaciji',
                      },
                    },
                    // Ostatak (70%)
                    {
                      name: 'remainingAmount',
                      type: 'number',
                      label: 'Ostatak (€)',
                      min: 0,
                      admin: {
                        width: '50%',
                        readOnly: true,
                        description: 'Plaća se prije dolaska',
                      },
                    },
                  ],
                },

                // Rok za plaćanje ostatka
                {
                  name: 'remainingDueDate',
                  type: 'date',
                  label: 'Rok za plaćanje ostatka',
                  admin: {
                    description: 'Automatski: 14 dana prije check-in',
                    date: {
                      pickerAppearance: 'dayOnly',
                      displayFormat: 'd.M.yyyy',
                    },
                  },
                },
              ],
            },

            // ─────────────────────────────────────────────────
            // STATUS PLAĆANJA
            // ─────────────────────────────────────────────────
            {
              name: 'paymentStatus',
              type: 'select',
              label: 'Status plaćanja',
              required: true,
              defaultValue: 'unpaid',
              options: [
                { label: '⏳ Nije plaćeno', value: 'unpaid' },
                { label: '💰 Kapara plaćena', value: 'deposit-paid' },
                { label: '✅ Potpuno plaćeno', value: 'fully-paid' },
                { label: '↩️ Djelomični refund', value: 'partial-refund' },
                { label: '↩️ Puni refund', value: 'full-refund' },
              ],
            },

            // ─────────────────────────────────────────────────
            // STRIPE PODACI
            // ─────────────────────────────────────────────────
            {
              name: 'stripeData',
              type: 'group',
              label: 'Stripe podaci',
              admin: {
                description: 'Automatski popunjeno nakon plaćanja',
              },
              fields: [
                {
                  name: 'depositPaymentIntent',
                  type: 'text',
                  label: 'Deposit Payment Intent ID',
                  admin: { readOnly: true },
                },
                {
                  name: 'depositPaidAt',
                  type: 'date',
                  label: 'Kapara plaćena',
                  admin: {
                    readOnly: true,
                    date: { pickerAppearance: 'dayAndTime' },
                  },
                },
                {
                  name: 'remainingPaymentIntent',
                  type: 'text',
                  label: 'Remaining Payment Intent ID',
                  admin: { readOnly: true },
                },
                {
                  name: 'remainingPaidAt',
                  type: 'date',
                  label: 'Ostatak plaćen',
                  admin: {
                    readOnly: true,
                    date: { pickerAppearance: 'dayAndTime' },
                  },
                },
              ],
            },
          ],
        },

        // ╔═══════════════════════════════════════════════════╗
        // ║ TAB: INTERNE NAPOMENE                             ║
        // ╚═══════════════════════════════════════════════════╝
        {
          label: 'Napomene',
          description: 'Interne bilješke',
          fields: [
            {
              name: 'internalNotes',
              type: 'textarea',
              label: 'Interne napomene',
              admin: {
                description: 'Samo za osoblje, gost ne vidi',
                placeholder: 'npr. VIP gost, traži posebnu pažnju...',
              },
            },

            {
              name: 'source',
              type: 'select',
              label: 'Izvor rezervacije',
              defaultValue: 'direct',
              options: [
                { label: '🌐 Direktna (web)', value: 'direct' },
                { label: '📞 Telefon', value: 'phone' },
                { label: '📧 Email', value: 'email' },
                { label: '🔄 Povratni gost', value: 'returning' },
                { label: '👥 Preporuka', value: 'referral' },
              ],
            },

            {
              name: 'cancellation',
              type: 'group',
              label: 'Podaci o otkazivanju',
              admin: {
                condition: (data) => data?.status === 'cancelled',
              },
              fields: [
                {
                  name: 'cancelledAt',
                  type: 'date',
                  label: 'Datum otkazivanja',
                  admin: {
                    date: { pickerAppearance: 'dayAndTime' },
                  },
                },
                {
                  name: 'cancelledBy',
                  type: 'select',
                  label: 'Tko je otkazao',
                  options: [
                    { label: 'Gost', value: 'guest' },
                    { label: 'Vlasnik', value: 'owner' },
                    { label: 'Sistem', value: 'system' },
                  ],
                },
                {
                  name: 'cancellationReason',
                  type: 'textarea',
                  label: 'Razlog otkazivanja',
                },
                {
                  name: 'refundAmount',
                  type: 'number',
                  label: 'Iznos refunda (€)',
                },
              ],
            },
          ],
        },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════
  // HOOKS - Automatske akcije
  // ═══════════════════════════════════════════════════════════
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data

        // Izračunaj broj noćenja
        if (data.checkIn && data.checkOut) {
          const checkIn = new Date(data.checkIn)
          const checkOut = new Date(data.checkOut)
          const diffTime = checkOut.getTime() - checkIn.getTime()
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
          data.numberOfNights = diffDays > 0 ? diffDays : 1
        }

        // Izračunaj kaparu i ostatak
        if (data.paymentDetails?.totalPrice) {
          const total = data.paymentDetails.totalPrice
          const percentage = data.paymentDetails?.depositPercentage || 30

          data.paymentDetails.depositAmount = Math.round(total * (percentage / 100))
          data.paymentDetails.remainingAmount = total - data.paymentDetails.depositAmount
        }

        // Izračunaj rok za plaćanje ostatka (14 dana prije check-in)
        if (data.checkIn) {
          const checkIn = new Date(data.checkIn)
          const dueDate = new Date(checkIn)
          dueDate.setDate(dueDate.getDate() - 14)

          // Ako je dueDate u prošlosti, stavi danas + 1 dan
          const today = new Date()
          if (dueDate < today) {
            dueDate.setTime(today.getTime() + 24 * 60 * 60 * 1000)
          }

          data.paymentDetails = data.paymentDetails || {}
          data.paymentDetails.remainingDueDate = dueDate.toISOString()
        }

        return data
      },
    ],

    // Validacija datuma
    beforeChange: [
      ({ data }) => {
        if (data?.checkIn && data?.checkOut) {
          const checkIn = new Date(data.checkIn)
          const checkOut = new Date(data.checkOut)

          if (checkOut <= checkIn) {
            throw new Error('Check-out mora biti nakon check-in datuma')
          }
        }
        return data
      },
    ],
  },

  timestamps: true,
}
