/**
 * PAYMENT SETTINGS GLOBAL
 * =======================
 *
 * Sve postavke vezane uz plaćanje.
 * Stripe API ključevi, webhooks, itd.
 *
 * VAŽNO: API ključevi se NE spremaju ovdje!
 * Koristi .env datoteku za osjetljive podatke.
 * Ovdje su samo postavke koje nisu tajne.
 */

import type { GlobalConfig } from 'payload'

export const PaymentSettings: GlobalConfig = {
  slug: 'payment-settings',

  admin: {
    group: 'Postavke',
  },

  label: 'Postavke plaćanja',

  // Tko može vidjeti/uređivati
  access: {
    read: ({ req }) => req.user?.role === 'super-admin',
    update: ({ req }) => req.user?.role === 'super-admin',
  },

  fields: [
    {
      type: 'tabs',
      tabs: [
        // ╔═══════════════════════════════════════════════════╗
        // ║ TAB: STRIPE                                       ║
        // ╚═══════════════════════════════════════════════════╝
        {
          label: 'Stripe',
          description: 'Postavke za Stripe plaćanje',
          fields: [
            {
              name: 'stripe',
              type: 'group',
              label: 'Stripe konfiguracija',
              fields: [
                {
                  name: 'isEnabled',
                  type: 'checkbox',
                  label: 'Stripe plaćanje aktivno',
                  defaultValue: false,
                  admin: {
                    description: 'Omogući online plaćanje putem Stripe-a',
                  },
                },
                {
                  name: 'mode',
                  type: 'select',
                  label: 'Način rada',
                  defaultValue: 'test',
                  options: [
                    { label: '🧪 Test (sandbox)', value: 'test' },
                    { label: '🚀 Live (produkcija)', value: 'live' },
                  ],
                  admin: {
                    description: 'VAŽNO: Koristi Test dok testiraš!',
                  },
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'testPublishableKey',
                      type: 'text',
                      label: 'Test Publishable Key',
                      admin: {
                        width: '50%',
                        placeholder: 'pk_test_...',
                        description: 'Javni ključ za test mode',
                      },
                    },
                    {
                      name: 'livePublishableKey',
                      type: 'text',
                      label: 'Live Publishable Key',
                      admin: {
                        width: '50%',
                        placeholder: 'pk_live_...',
                        description: 'Javni ključ za produkciju',
                      },
                    },
                  ],
                },
                {
                  name: 'secretKeyNote',
                  type: 'ui',
                  admin: {
                    components: {
                      //Field: () => null, // Prazan component
                    },
                    // description:
                    //   '⚠️ STRIPE SECRET KEY se postavlja u .env datoteci kao STRIPE_SECRET_KEY, NIKADA ga ne spremaj ovdje!',
                  },
                },
                {
                  name: 'webhookEndpoint',
                  type: 'text',
                  label: 'Webhook Endpoint',
                  admin: {
                    readOnly: true,
                    description: 'URL za Stripe webhook (postavi u Stripe Dashboard)',
                  },
                  hooks: {
                    beforeChange: [
                      ({ data }) => {
                        // Automatski generiraj webhook URL
                        return '/api/webhooks/stripe'
                      },
                    ],
                  },
                },
              ],
            },

            {
              name: 'stripeOptions',
              type: 'group',
              label: 'Opcije plaćanja',
              fields: [
                {
                  name: 'allowedPaymentMethods',
                  type: 'select',
                  label: 'Dozvoljene metode plaćanja',
                  hasMany: true,
                  defaultValue: ['card'],
                  options: [
                    { label: '💳 Kartica', value: 'card' },
                    { label: '🏦 Bankovni transfer', value: 'sepa_debit' },
                    { label: '📱 Apple Pay', value: 'apple_pay' },
                    { label: '📱 Google Pay', value: 'google_pay' },
                  ],
                },
                {
                  name: 'statementDescriptor',
                  type: 'text',
                  label: 'Statement Descriptor',
                  maxLength: 22,
                  admin: {
                    placeholder: 'VILLA BOOKING',
                    description: 'Što piše na bankovnom izvodu gosta (max 22 znaka)',
                  },
                },
              ],
            },
          ],
        },

        // ╔═══════════════════════════════════════════════════╗
        // ║ TAB: OSTALE OPCIJE                                ║
        // ╚═══════════════════════════════════════════════════╝
        {
          label: 'Ostale opcije',
          fields: [
            {
              name: 'alternativePayments',
              type: 'group',
              label: 'Alternativne metode plaćanja',
              fields: [
                {
                  name: 'bankTransfer',
                  type: 'group',
                  label: 'Bankovni prijenos',
                  fields: [
                    {
                      name: 'isEnabled',
                      type: 'checkbox',
                      label: 'Omogući plaćanje bankovnim prijenosom',
                      defaultValue: true,
                    },
                    {
                      name: 'bankName',
                      type: 'text',
                      label: 'Naziv banke',
                      admin: {
                        condition: (data, siblingData) => siblingData?.isEnabled,
                      },
                    },
                    {
                      name: 'iban',
                      type: 'text',
                      label: 'IBAN',
                      admin: {
                        placeholder: 'HR12 3456 7890 1234 5678 9',
                        condition: (data, siblingData) => siblingData?.isEnabled,
                      },
                    },
                    {
                      name: 'swift',
                      type: 'text',
                      label: 'SWIFT/BIC',
                      admin: {
                        condition: (data, siblingData) => siblingData?.isEnabled,
                      },
                    },
                    {
                      name: 'accountHolder',
                      type: 'text',
                      label: 'Vlasnik računa',
                      admin: {
                        condition: (data, siblingData) => siblingData?.isEnabled,
                      },
                    },
                  ],
                },

                {
                  name: 'cashOnArrival',
                  type: 'group',
                  label: 'Gotovina pri dolasku',
                  fields: [
                    {
                      name: 'isEnabled',
                      type: 'checkbox',
                      label: 'Omogući plaćanje gotovinom',
                      defaultValue: false,
                    },
                    {
                      name: 'maxAmount',
                      type: 'number',
                      label: 'Maksimalni iznos (€)',
                      admin: {
                        description: 'Maksimalni iznos za gotovinska plaćanja',
                        condition: (data, siblingData) => siblingData?.isEnabled,
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },

        // ╔═══════════════════════════════════════════════════╗
        // ║ TAB: REFUND POLITIKA                              ║
        // ╚═══════════════════════════════════════════════════╝
        {
          label: 'Refund',
          fields: [
            {
              name: 'refundPolicy',
              type: 'group',
              label: 'Politika povrata',
              fields: [
                {
                  name: 'fullRefundDays',
                  type: 'number',
                  label: 'Puni povrat (dana prije check-in)',
                  defaultValue: 30,
                  admin: {
                    description: 'Do koliko dana prije dolaska je moguć 100% povrat',
                  },
                },
                {
                  name: 'partialRefundDays',
                  type: 'number',
                  label: 'Djelomični povrat (dana)',
                  defaultValue: 14,
                  admin: {
                    description: 'Do koliko dana prije dolaska je moguć djelomični povrat',
                  },
                },
                {
                  name: 'partialRefundPercentage',
                  type: 'number',
                  label: 'Postotak djelomičnog povrata',
                  defaultValue: 50,
                  min: 0,
                  max: 100,
                },
                {
                  name: 'noRefundDays',
                  type: 'number',
                  label: 'Bez povrata (dana)',
                  defaultValue: 7,
                  admin: {
                    description: 'Unutar ovog roka nema povrata',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
