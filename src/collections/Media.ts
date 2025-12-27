/**
 * MEDIA COLLECTION
 * =================
 *
 * Ovo je UPLOAD collection - služi za spremanje slika i datoteka.
 *
 * Što je posebno?
 * - upload: true -> Payload zna da ovo prima datoteke
 * - Automatski generira različite veličine slika (thumbnail, medium, large)
 * - Sprema metapodatke (dimenzije, veličina, mime type)
 *
 * Gdje se slike spremaju?
 * - Lokalno: /public/media folder
 * - Ili na cloud: S3, Cloudinary (to ćemo kasnije ako treba)
 */

import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',

  // ═══════════════════════════════════════════════════════════
  // UPLOAD KONFIGURACIJA
  // ═══════════════════════════════════════════════════════════
  upload: {
    // Gdje se spremaju datoteke (relativno od projekta)
    staticDir: 'public/media',

    // URL prefix za pristup slikama
    // Slika će biti dostupna na: /media/ime-slike.jpg
    //staticURL: '/media',

    // Koje tipove datoteka prihvaćamo
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'],

    // Maksimalna veličina datoteke (u bajtovima)
    // 10MB = 10 * 1024 * 1024
    // filesizeLimit: 10 * 1024 * 1024,

    // ─────────────────────────────────────────────────────────
    // AUTOMATSKO GENERIRANJE RAZLIČITIH VELIČINA
    // ─────────────────────────────────────────────────────────
    // Payload automatski stvara ove verzije svake slike
    imageSizes: [
      {
        name: 'thumbnail', // Za prikaz u listi/gridu
        width: 400,
        height: 300,
        position: 'centre', // Kako cropati: centre, top, bottom, left, right
        formatOptions: {
          format: 'webp', // Konvertira u WebP (manji file size)
          //quality: 80,
        },
      },
      {
        name: 'card', // Za kartice apartmana
        width: 800,
        height: 600,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          //quality: 85,
        },
      },
      {
        name: 'hero', // Za velike hero slike
        width: 1920,
        height: 1080,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          // quality: 90,
        },
      },
    ],

    // Admin panel preview
    adminThumbnail: 'thumbnail',
  },

  // ═══════════════════════════════════════════════════════════
  // ADMIN PANEL POSTAVKE
  // ═══════════════════════════════════════════════════════════
  admin: {
    useAsTitle: 'alt', // Prikazuje alt text kao naziv
    description: 'Slike i mediji za stranicu',
    group: 'Sadržaj',

    // Lijep grid prikaz umjesto liste
    // components: {
    //   views: {
    //     List: 'path/to/GridView', // Custom komponenta za grid
    //   },
    // },
  },

  // ═══════════════════════════════════════════════════════════
  // POLJA
  // ═══════════════════════════════════════════════════════════
  // NAPOMENA: filename, mimeType, filesize, width, height su AUTOMATSKI
  // dodani jer imamo upload: true

  fields: [
    // ─────────────────────────────────────────────────────────
    // Alt tekst (za SEO i pristupačnost)
    // ─────────────────────────────────────────────────────────
    {
      name: 'alt',
      type: 'text',
      label: 'Alt tekst',
      required: true,
      admin: {
        description: 'Opis slike za SEO i čitače ekrana. Npr: "Pogled na bazen iz dnevnog boravka"',
        placeholder: 'Opišite što je na slici...',
      },
    },

    // ─────────────────────────────────────────────────────────
    // Kategorija slike
    // ─────────────────────────────────────────────────────────
    {
      name: 'category',
      type: 'select',
      label: 'Kategorija',
      required: true,
      defaultValue: 'interior',

      options: [
        { label: 'Eksterijer', value: 'exterior' },
        { label: 'Interijer', value: 'interior' },
        { label: 'Bazen & Wellness', value: 'pool-wellness' },
        { label: 'Spavaće sobe', value: 'bedrooms' },
        { label: 'Kuhinja & Blagovaonica', value: 'kitchen-dining' },
        { label: 'Kupaonica', value: 'bathroom' },
        { label: 'Okućnica & Vrt', value: 'garden' },
        { label: 'Pogled', value: 'view' },
        { label: 'Okolica & Atrakcije', value: 'surroundings' },
      ],

      admin: {
        description: 'Pomaže organizirati galeriju na stranici',
      },
    },

    // ─────────────────────────────────────────────────────────
    // Kojoj nekretnini pripada
    // ─────────────────────────────────────────────────────────
    {
      name: 'property',
      type: 'relationship',
      label: 'Nekretnina',
      relationTo: 'properties',
      hasMany: false, // Jedna slika pripada jednoj nekretnini
      required: false, // Može biti "globalna" slika (logo, itd.)

      admin: {
        description: 'Ostavite prazno za globalne slike (logo, pozadine...)',
      },
    },

    // ─────────────────────────────────────────────────────────
    // Redoslijed u galeriji
    // ─────────────────────────────────────────────────────────
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Redoslijed',
      defaultValue: 0,
      admin: {
        description: 'Manji broj = prije se prikazuje. 0, 1, 2, 3...',
      },
    },

    // ─────────────────────────────────────────────────────────
    // Istaknuta slika (za thumbnail property-a)
    // ─────────────────────────────────────────────────────────
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Istaknuta slika',
      defaultValue: false,
      admin: {
        description: 'Istaknuta slika se koristi kao glavna slika nekretnine',
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════
  // HOOKS - Automatske akcije
  // ═══════════════════════════════════════════════════════════
  hooks: {
    // Prije nego se slika prikaže (možeš modificirati podatke)
    // afterRead: [
    //   ({ doc }) => {
    //     // Dodaj full URL ako treba
    //     return doc
    //   },
    // ],
  },

  timestamps: true,
}
