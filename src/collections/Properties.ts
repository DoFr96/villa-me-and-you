/**
 * PROPERTIES COLLECTION
 * =====================
 *
 * Ovo je SRCE tvoje aplikacije - ovdje su vile i apartmani.
 *
 * Zašto "Properties" a ne "Villas"?
 * - Fleksibilnije ime za template
 * - Može biti vila, apartman, kuća, studio...
 *
 * Struktura:
 * - Osnovni podaci (ime, opis, lokacija)
 * - Kapacitet (gosti, spavaće sobe, kupaonice)
 * - Sadržaji (amenities) - bazen, jacuzzi, WiFi...
 * - Pravila (check-in vrijeme, kućni ljubimci...)
 * - SEO podaci
 */

import type { CollectionConfig } from 'payload'

export const Properties: CollectionConfig = {
  slug: 'properties',

  // ═══════════════════════════════════════════════════════════
  // ADMIN PANEL POSTAVKE
  // ═══════════════════════════════════════════════════════════
  admin: {
    useAsTitle: 'name',
    description: 'Vile, apartmani i druge nekretnine za najam',
    group: 'Nekretnine',

    // Zadani stupci u listi
    defaultColumns: ['name', 'type', 'maxGuests', 'status', 'updatedAt'],
  },

  // ═══════════════════════════════════════════════════════════
  // POLJA
  // ═══════════════════════════════════════════════════════════
  fields: [
    // ╔═══════════════════════════════════════════════════════╗
    // ║ TAB: OSNOVNI PODACI                                   ║
    // ╚═══════════════════════════════════════════════════════╝
    {
      type: 'tabs', // Organizira polja u tabove
      tabs: [
        {
          label: 'Osnovni podaci',
          description: 'Naziv, opis i tip nekretnine',
          fields: [
            // ─────────────────────────────────────────────────
            // Status (aktivna/neaktivna)
            // ─────────────────────────────────────────────────
            {
              name: 'status',
              type: 'select',
              label: 'Status',
              required: true,
              defaultValue: 'draft',
              options: [
                { label: '📝 Skica', value: 'draft' },
                { label: '✅ Aktivna', value: 'active' },
                { label: '⏸️ Pauzirana', value: 'paused' },
                { label: '🔒 Arhivirana', value: 'archived' },
              ],
              admin: {
                description: 'Samo "Aktivna" nekretnina se prikazuje na stranici',
                position: 'sidebar', // Prikazuje se u sidebar-u, ne u glavnom dijelu
              },
            },

            // ─────────────────────────────────────────────────
            // Naziv nekretnine
            // ─────────────────────────────────────────────────
            {
              name: 'name',
              type: 'text',
              label: 'Naziv nekretnine',
              required: true,
              minLength: 3,
              maxLength: 100,
              admin: {
                placeholder: 'npr. Villa Adriatica',
              },
            },

            // ─────────────────────────────────────────────────
            // Slug (URL-friendly ime)
            // ─────────────────────────────────────────────────
            {
              name: 'slug',
              type: 'text',
              label: 'Slug (URL)',
              required: true,
              unique: true, // Mora biti jedinstven
              admin: {
                placeholder: 'npr. villa-adriatica',
                description: 'Koristi se u URL-u: /properties/villa-adriatica',
              },
              // Automatski generira slug iz imena
              hooks: {
                beforeValidate: [
                  ({ value, data }) => {
                    // Ako nema slug, generiraj ga iz imena
                    if (!value && data?.name) {
                      return data.name
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-') // Zamijeni sve osim slova i brojeva s -
                        .replace(/^-|-$/g, '') // Ukloni - s početka i kraja
                    }
                    return value
                  },
                ],
              },
            },

            // ─────────────────────────────────────────────────
            // Tip nekretnine
            // ─────────────────────────────────────────────────
            {
              name: 'type',
              type: 'select',
              label: 'Tip nekretnine',
              required: true,
              defaultValue: 'villa',
              options: [
                { label: 'Vila', value: 'villa' },
                { label: 'Apartman', value: 'apartment' },
                { label: 'Kuća', value: 'house' },
                { label: 'Studio', value: 'studio' },
                { label: 'Penthouse', value: 'penthouse' },
              ],
            },

            // ─────────────────────────────────────────────────
            // Kratki opis (za kartice)
            // ─────────────────────────────────────────────────
            {
              name: 'shortDescription',
              type: 'textarea',
              label: 'Kratki opis',
              required: true,
              maxLength: 200,
              admin: {
                description: 'Prikazuje se na karticama i u pretrazi. Max 200 znakova.',
                placeholder: 'Luksuzna vila s privatnim bazenom i pogledom na more...',
              },
            },

            // ─────────────────────────────────────────────────
            // Puni opis (rich text)
            // ─────────────────────────────────────────────────
            {
              name: 'description',
              type: 'richText', // WYSIWYG editor
              label: 'Puni opis',
              required: true,
              admin: {
                description: 'Detaljan opis nekretnine za stranicu',
              },
            },
          ],
        },

        // ╔═══════════════════════════════════════════════════╗
        // ║ TAB: KAPACITET                                    ║
        // ╚═══════════════════════════════════════════════════╝
        {
          label: 'Kapacitet',
          description: 'Broj gostiju, soba i kupaonice',
          fields: [
            {
              type: 'row', // Polja u istom redu
              fields: [
                {
                  name: 'maxGuests',
                  type: 'number',
                  label: 'Maksimalno gostiju',
                  required: true,
                  min: 1,
                  max: 30,
                  defaultValue: 6,
                  admin: {
                    width: '25%',
                    description: 'Ukupan kapacitet',
                  },
                },
                {
                  name: 'bedrooms',
                  type: 'number',
                  label: 'Spavaće sobe',
                  required: true,
                  min: 0,
                  max: 20,
                  defaultValue: 3,
                  admin: { width: '25%' },
                },
                {
                  name: 'beds',
                  type: 'number',
                  label: 'Kreveti',
                  required: true,
                  min: 1,
                  max: 30,
                  defaultValue: 4,
                  admin: { width: '25%' },
                },
                {
                  name: 'bathrooms',
                  type: 'number',
                  label: 'Kupaonice',
                  required: true,
                  min: 1,
                  max: 15,
                  defaultValue: 2,
                  admin: { width: '25%' },
                },
              ],
            },

            // Kvadratura
            {
              type: 'row',
              fields: [
                {
                  name: 'sizeM2',
                  type: 'number',
                  label: 'Površina (m²)',
                  min: 0,
                  admin: {
                    width: '50%',
                    placeholder: '250',
                  },
                },
                {
                  name: 'plotSizeM2',
                  type: 'number',
                  label: 'Parcela (m²)',
                  min: 0,
                  admin: {
                    width: '50%',
                    placeholder: '1000',
                    description: 'Za vile s okućnicom',
                  },
                },
              ],
            },
          ],
        },

        // ╔═══════════════════════════════════════════════════╗
        // ║ TAB: LOKACIJA                                     ║
        // ╚═══════════════════════════════════════════════════╝
        {
          label: 'Lokacija',
          fields: [
            {
              name: 'address',
              type: 'group', // Grupira povezana polja
              label: 'Adresa',
              fields: [
                {
                  name: 'street',
                  type: 'text',
                  label: 'Ulica i broj',
                  admin: { placeholder: 'Ul. Mora 15' },
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'city',
                      type: 'text',
                      label: 'Grad',
                      required: true,
                      admin: { width: '50%', placeholder: 'Rovinj' },
                    },
                    {
                      name: 'postalCode',
                      type: 'text',
                      label: 'Poštanski broj',
                      admin: { width: '50%', placeholder: '52210' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'region',
                      type: 'text',
                      label: 'Regija/Županija',
                      admin: { width: '50%', placeholder: 'Istra' },
                    },
                    {
                      name: 'country',
                      type: 'text',
                      label: 'Država',
                      required: true,
                      defaultValue: 'Hrvatska',
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },

            // GPS koordinate
            {
              name: 'coordinates',
              type: 'group',
              label: 'GPS koordinate',
              admin: {
                description: 'Za prikaz na karti',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'latitude',
                      type: 'number',
                      label: 'Latitude',
                      admin: { width: '50%', placeholder: '45.0812' },
                    },
                    {
                      name: 'longitude',
                      type: 'number',
                      label: 'Longitude',
                      admin: { width: '50%', placeholder: '13.6387' },
                    },
                  ],
                },
              ],
            },

            // Udaljenosti
            {
              name: 'distances',
              type: 'array', // Lista stavki
              label: 'Udaljenosti od točaka interesa',
              admin: {
                description: 'npr. Plaža 500m, Centar grada 2km, Zračna luka 45km',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'place',
                      type: 'text',
                      label: 'Mjesto',
                      required: true,
                      admin: { width: '60%', placeholder: 'Plaža' },
                    },
                    {
                      name: 'distance',
                      type: 'text',
                      label: 'Udaljenost',
                      required: true,
                      admin: { width: '40%', placeholder: '500m' },
                    },
                  ],
                },
              ],
            },
          ],
        },

        // ╔═══════════════════════════════════════════════════╗
        // ║ TAB: SADRŽAJI (AMENITIES)                         ║
        // ╚═══════════════════════════════════════════════════╝
        {
          label: 'Sadržaji',
          description: 'Što nekretnina nudi',
          fields: [
            // Glavni sadržaji (checkboxes)
            {
              name: 'amenities',
              type: 'group',
              label: 'Sadržaji',
              fields: [
                // Outdoor
                {
                  name: 'outdoor',
                  type: 'group',
                  label: '🌴 Vanjski sadržaji',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'pool', type: 'checkbox', label: 'Bazen' },
                        { name: 'poolHeated', type: 'checkbox', label: 'Grijani bazen' },
                        { name: 'jacuzzi', type: 'checkbox', label: 'Jacuzzi' },
                        { name: 'garden', type: 'checkbox', label: 'Vrt' },
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        { name: 'terrace', type: 'checkbox', label: 'Terasa' },
                        { name: 'bbq', type: 'checkbox', label: 'Roštilj' },
                        { name: 'outdoorDining', type: 'checkbox', label: 'Vanjska blagovaonica' },
                        { name: 'parking', type: 'checkbox', label: 'Parking' },
                      ],
                    },
                  ],
                },

                // Wellness
                {
                  name: 'wellness',
                  type: 'group',
                  label: '🧖 Wellness',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'sauna', type: 'checkbox', label: 'Sauna' },
                        { name: 'steamBath', type: 'checkbox', label: 'Parna kupelj' },
                        { name: 'gym', type: 'checkbox', label: 'Teretana' },
                        { name: 'massageRoom', type: 'checkbox', label: 'Soba za masažu' },
                      ],
                    },
                  ],
                },

                // Indoor
                {
                  name: 'indoor',
                  type: 'group',
                  label: '🏠 Unutarnji sadržaji',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'wifi', type: 'checkbox', label: 'WiFi', defaultValue: true },
                        {
                          name: 'airConditioning',
                          type: 'checkbox',
                          label: 'Klima',
                          defaultValue: true,
                        },
                        { name: 'heating', type: 'checkbox', label: 'Grijanje' },
                        { name: 'fireplace', type: 'checkbox', label: 'Kamin' },
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        { name: 'tv', type: 'checkbox', label: 'TV', defaultValue: true },
                        { name: 'satelliteTV', type: 'checkbox', label: 'Satelitska TV' },
                        { name: 'netflix', type: 'checkbox', label: 'Netflix/Streaming' },
                        { name: 'soundSystem', type: 'checkbox', label: 'Sound sistem' },
                      ],
                    },
                  ],
                },

                // Kitchen
                {
                  name: 'kitchen',
                  type: 'group',
                  label: '🍳 Kuhinja',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'fullKitchen',
                          type: 'checkbox',
                          label: 'Potpuna kuhinja',
                          defaultValue: true,
                        },
                        { name: 'dishwasher', type: 'checkbox', label: 'Perilica posuđa' },
                        { name: 'washingMachine', type: 'checkbox', label: 'Perilica rublja' },
                        { name: 'dryer', type: 'checkbox', label: 'Sušilica' },
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        { name: 'coffeeMachine', type: 'checkbox', label: 'Aparat za kavu' },
                        { name: 'oven', type: 'checkbox', label: 'Pećnica' },
                        { name: 'microwave', type: 'checkbox', label: 'Mikrovalna' },
                        { name: 'freezer', type: 'checkbox', label: 'Zamrzivač' },
                      ],
                    },
                  ],
                },

                // Additional
                {
                  name: 'additional',
                  type: 'group',
                  label: '➕ Dodatno',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'petsAllowed',
                          type: 'checkbox',
                          label: 'Kućni ljubimci dozvoljeni',
                        },
                        { name: 'smokingAllowed', type: 'checkbox', label: 'Pušenje dozvoljeno' },
                        {
                          name: 'wheelchairAccessible',
                          type: 'checkbox',
                          label: 'Pristupačno za invalide',
                        },
                        { name: 'evCharger', type: 'checkbox', label: 'Punjač za EV' },
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        { name: 'babyFriendly', type: 'checkbox', label: 'Oprema za bebe' },
                        { name: 'workDesk', type: 'checkbox', label: 'Radni stol' },
                        { name: 'bicycles', type: 'checkbox', label: 'Bicikli' },
                        { name: 'kayaks', type: 'checkbox', label: 'Kajaci' },
                      ],
                    },
                  ],
                },
              ],
            },

            // Posebni sadržaji (custom lista)
            {
              name: 'specialFeatures',
              type: 'array',
              label: 'Posebni sadržaji',
              admin: {
                description: 'Jedinstvene karakteristike koje izdvajaju nekretninu',
              },
              fields: [
                {
                  name: 'feature',
                  type: 'text',
                  label: 'Sadržaj',
                  required: true,
                  admin: {
                    placeholder: 'npr. Privatna plaža, Heliodrom, Vinski podrum...',
                  },
                },
              ],
            },
          ],
        },

        // ╔═══════════════════════════════════════════════════╗
        // ║ TAB: PRAVILA                                      ║
        // ╚═══════════════════════════════════════════════════╝
        {
          label: 'Pravila',
          description: 'Check-in/out vrijeme i pravila kuće',
          fields: [
            {
              name: 'rules',
              type: 'group',
              label: 'Pravila nekretnine',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'checkInTime',
                      type: 'text',
                      label: 'Check-in vrijeme',
                      required: true,
                      defaultValue: '16:00',
                      admin: { width: '25%' },
                    },
                    {
                      name: 'checkOutTime',
                      type: 'text',
                      label: 'Check-out vrijeme',
                      required: true,
                      defaultValue: '10:00',
                      admin: { width: '25%' },
                    },
                    {
                      name: 'minStay',
                      type: 'number',
                      label: 'Min. noćenja',
                      defaultValue: 2,
                      min: 2,
                      admin: {
                        width: '25%',
                        description: 'Zadano (sezone mogu imati svoje)',
                      },
                    },
                    {
                      name: 'maxStay',
                      type: 'number',
                      label: 'Max. noćenja',
                      defaultValue: 30,
                      min: 1,
                      admin: { width: '25%' },
                    },
                  ],
                },

                {
                  name: 'houseRules',
                  type: 'textarea',
                  label: 'Kućni red',
                  admin: {
                    placeholder: 'Bez glasne glazbe nakon 22h...\nKoristiti tuš prije bazena...',
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
          description: 'Optimizacija za tražilice',
          fields: [
            {
              name: 'seo',
              type: 'group',
              label: 'SEO postavke',
              fields: [
                {
                  name: 'metaTitle',
                  type: 'text',
                  label: 'Meta naslov',
                  maxLength: 60,
                  admin: {
                    description: 'Naslov u Google rezultatima. Max 60 znakova.',
                    placeholder: 'Villa Adriatica | Luksuzna vila s bazenom u Rovinju',
                  },
                },
                {
                  name: 'metaDescription',
                  type: 'textarea',
                  label: 'Meta opis',
                  maxLength: 160,
                  admin: {
                    description: 'Opis u Google rezultatima. Max 160 znakova.',
                    placeholder:
                      'Uživajte u luksuzu naše vile s privatnim bazenom, wellnessom i pogledom na more. Idealno za obitelji i parove.',
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════
    // SIDEBAR POLJA
    // ═══════════════════════════════════════════════════════════

    // Istaknuta slika (glavna slika)
    {
      name: 'featuredImage',
      type: 'upload',
      label: 'Glavna slika',
      relationTo: 'media',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Prikazuje se kao thumbnail u listama',
      },
    },

    // Galerija slika
    {
      name: 'gallery',
      type: 'relationship',
      label: 'Galerija',
      relationTo: 'media',
      hasMany: true,
      admin: {
        position: 'sidebar',
        description: 'Dodatne slike za galeriju',
      },
    },
  ],

  timestamps: true,
}
