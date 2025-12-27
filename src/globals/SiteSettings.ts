/**
 * SITE SETTINGS GLOBAL
 * ====================
 *
 * Što je "Global" u Payloadu?
 * - Za razliku od Collection, Global ima samo JEDAN zapis
 * - Savršeno za postavke stranice, kontakt info, uvjete korištenja...
 *
 * Razlika:
 * - Collection = puno zapisa (npr. 50 rezervacija)
 * - Global = jedan zapis (postavke stranice)
 */

import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',

  // ═══════════════════════════════════════════════════════════
  // ADMIN PANEL POSTAVKE
  // ═══════════════════════════════════════════════════════════
  admin: {
    group: 'Postavke',
  },

  label: 'Postavke stranice',

  // ═══════════════════════════════════════════════════════════
  // POLJA
  // ═══════════════════════════════════════════════════════════
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ╔═══════════════════════════════════════════════════╗
        // ║ TAB: OPĆE POSTAVKE                                ║
        // ╚═══════════════════════════════════════════════════╝
        {
          label: 'Općenito',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              label: 'Naziv stranice',
              required: true,
              defaultValue: 'Villa Booking',
              admin: {
                placeholder: 'npr. Villa Adriatica',
              },
            },
            {
              name: 'tagline',
              type: 'text',
              label: 'Slogan',
              admin: {
                placeholder: 'npr. Vaše privatno utočište mira i luksuza',
              },
            },
            {
              name: 'logo',
              type: 'upload',
              label: 'Logo',
              relationTo: 'media',
            },
            {
              name: 'favicon',
              type: 'upload',
              label: 'Favicon',
              relationTo: 'media',
            },
          ],
        },

        // ╔═══════════════════════════════════════════════════╗
        // ║ TAB: KONTAKT                                      ║
        // ╚═══════════════════════════════════════════════════╝
        {
          label: 'Kontakt',
          fields: [
            {
              name: 'contact',
              type: 'group',
              label: 'Kontakt podaci',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'email',
                      type: 'email',
                      label: 'Email',
                      admin: {
                        width: '50%',
                        placeholder: 'info@villa.com',
                      },
                    },
                    {
                      name: 'phone',
                      type: 'text',
                      label: 'Telefon',
                      admin: {
                        width: '50%',
                        placeholder: '+385 91 234 5678',
                      },
                    },
                  ],
                },
                {
                  name: 'whatsapp',
                  type: 'text',
                  label: 'WhatsApp',
                  admin: {
                    placeholder: '+385 91 234 5678',
                    description: 'Za WhatsApp widget na stranici',
                  },
                },
                {
                  name: 'address',
                  type: 'textarea',
                  label: 'Adresa',
                  admin: {
                    placeholder: 'Ul. Mora 15\n52210 Rovinj\nHrvatska',
                  },
                },
              ],
            },

            {
              name: 'socialMedia',
              type: 'group',
              label: 'Društvene mreže',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'facebook',
                      type: 'text',
                      label: 'Facebook',
                      admin: {
                        width: '50%',
                        placeholder: 'https://facebook.com/...',
                      },
                    },
                    {
                      name: 'instagram',
                      type: 'text',
                      label: 'Instagram',
                      admin: {
                        width: '50%',
                        placeholder: 'https://instagram.com/...',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'tiktok',
                      type: 'text',
                      label: 'TikTok',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'youtube',
                      type: 'text',
                      label: 'YouTube',
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },
          ],
        },

        // ╔═══════════════════════════════════════════════════╗
        // ║ TAB: BOOKING POSTAVKE                             ║
        // ╚═══════════════════════════════════════════════════╝
        {
          label: 'Rezervacije',
          description: 'Postavke vezane uz rezervacije',
          fields: [
            {
              name: 'booking',
              type: 'group',
              label: 'Postavke rezervacija',
              fields: [
                // Kapara
                {
                  name: 'depositPercentage',
                  type: 'number',
                  label: 'Postotak kapare (%)',
                  defaultValue: 30,
                  min: 0,
                  max: 100,
                  admin: {
                    description: 'Koliko posto ukupne cijene gost plaća odmah',
                  },
                },

                // Rok za ostatak
                {
                  name: 'remainingPaymentDays',
                  type: 'number',
                  label: 'Rok za plaćanje ostatka (dana)',
                  defaultValue: 14,
                  min: 1,
                  admin: {
                    description: 'Koliko dana prije check-in treba platiti ostatak',
                  },
                },

                // Besplatni otkaz
                {
                  name: 'freeCancellationDays',
                  type: 'number',
                  label: 'Besplatni otkaz (dana)',
                  defaultValue: 14,
                  min: 0,
                  admin: {
                    description: 'Do koliko dana prije check-in je otkaz besplatan',
                  },
                },

                // Valuta
                {
                  name: 'currency',
                  type: 'select',
                  label: 'Valuta',
                  defaultValue: 'EUR',
                  options: [
                    { label: '€ EUR', value: 'EUR' },
                    { label: '$ USD', value: 'USD' },
                    { label: '£ GBP', value: 'GBP' },
                    { label: 'kn HRK', value: 'HRK' },
                  ],
                },
              ],
            },

            {
              name: 'availability',
              type: 'group',
              label: 'Dostupnost',
              fields: [
                {
                  name: 'advanceBookingDays',
                  type: 'number',
                  label: 'Rezervacija unaprijed (dana)',
                  defaultValue: 365,
                  admin: {
                    description: 'Koliko dana unaprijed gost može rezervirati',
                  },
                },
                {
                  name: 'lastMinuteBookingHours',
                  type: 'number',
                  label: 'Last-minute rezervacija (sati)',
                  defaultValue: 24,
                  admin: {
                    description: 'Minimalno sati prije check-in za online rezervaciju',
                  },
                },
              ],
            },
          ],
        },

        // ╔═══════════════════════════════════════════════════╗
        // ║ TAB: SEO                                          ║
        // ╚═══════════════════════════════════════════════════╝
        {
          label: 'SEO',
          fields: [
            {
              name: 'seo',
              type: 'group',
              label: 'SEO postavke',
              fields: [
                {
                  name: 'metaTitle',
                  type: 'text',
                  label: 'Default Meta Title',
                  maxLength: 60,
                  admin: {
                    description: 'Naslov u Google rezultatima (max 60 znakova)',
                  },
                },
                {
                  name: 'metaDescription',
                  type: 'textarea',
                  label: 'Default Meta Description',
                  maxLength: 160,
                  admin: {
                    description: 'Opis u Google rezultatima (max 160 znakova)',
                  },
                },
                {
                  name: 'ogImage',
                  type: 'upload',
                  label: 'Default OG Image',
                  relationTo: 'media',
                  admin: {
                    description: 'Slika za dijeljenje na društvenim mrežama',
                  },
                },
              ],
            },

            {
              name: 'analytics',
              type: 'group',
              label: 'Analytics',
              fields: [
                {
                  name: 'googleAnalyticsId',
                  type: 'text',
                  label: 'Google Analytics ID',
                  admin: {
                    placeholder: 'G-XXXXXXXXXX',
                  },
                },
                {
                  name: 'facebookPixelId',
                  type: 'text',
                  label: 'Facebook Pixel ID',
                  admin: {
                    placeholder: 'XXXXXXXXXXXXXXXX',
                  },
                },
              ],
            },
          ],
        },

        // ╔═══════════════════════════════════════════════════╗
        // ║ TAB: TEKSTOVI                                     ║
        // ╚═══════════════════════════════════════════════════╝
        {
          label: 'Tekstovi',
          description: 'Prilagodljivi tekstovi za stranicu',
          fields: [
            {
              name: 'texts',
              type: 'group',
              label: 'Tekstovi',
              fields: [
                {
                  name: 'bookingConfirmationMessage',
                  type: 'textarea',
                  label: 'Poruka nakon rezervacije',
                  defaultValue: 'Hvala na Vašoj rezervaciji! Poslali smo Vam email s potvrdom.',
                },
                {
                  name: 'cancellationPolicy',
                  type: 'richText',
                  label: 'Uvjeti otkazivanja',
                },
                {
                  name: 'houseRules',
                  type: 'richText',
                  label: 'Opća pravila kuće',
                },
                {
                  name: 'privacyPolicy',
                  type: 'richText',
                  label: 'Politika privatnosti',
                },
                {
                  name: 'termsAndConditions',
                  type: 'richText',
                  label: 'Uvjeti korištenja',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
