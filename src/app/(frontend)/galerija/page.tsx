import React from 'react'
import Gallery from './Gallery'
const villaImages = [
  { src: '/media/bedroomTesting1.jpg', alt: 'Spavaca soba' },
  { src: '/media/dinningTesting1.jpg', alt: 'Blagovaonica' },
  { src: '/media/kitchenTesting2.jpg', alt: 'Kuhinja' },
  { src: '/media/kitcheTestingOutside1.jpg', alt: 'Kuhinjski otok' },
  { src: '/media/livingRoomTesting1.jpg', alt: 'Dnevni boravak' },
  { src: '/media/kitcheTestingOutside1.jpg', alt: 'Kuhinjski otok' },
  { src: '/media/livingRoomTesting1.jpg', alt: 'Dnevni boravak' },
  { src: '/media/kitchenTesting2.jpg', alt: 'Kuhinja' },
  { src: '/media/kitcheTestingOutside1.jpg', alt: 'Kuhinjski otok' },
  { src: '/media/livingRoomTesting1.jpg', alt: 'Dnevni boravak' },
  { src: '/media/kitcheTestingOutside1.jpg', alt: 'Kuhinjski otok' },
  { src: '/media/livingRoomTesting1.jpg', alt: 'Dnevni boravak' },
  { src: '/media/kitchenTesting2.jpg', alt: 'Kuhinja' },
  { src: '/media/kitcheTestingOutside1.jpg', alt: 'Kuhinjski otok' },
  { src: '/media/livingRoomTesting1.jpg', alt: 'Dnevni boravak' },
  { src: '/media/kitcheTestingOutside1.jpg', alt: 'Kuhinjski otok' },
  { src: '/media/livingRoomTesting1.jpg', alt: 'Dnevni boravak' },
]

export default function GalleryServer() {
  return (
    <section className="max-w-7xl mx-auto px-5 py-8">
      <Gallery images={villaImages} />
    </section>
  )
}
