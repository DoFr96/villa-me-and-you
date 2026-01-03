'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Autoplay, Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const images = [
  { src: '/media/bedroomTesting1.jpg', alt: 'Spavaca soba' },
  { src: '/media/dinningTesting1.jpg', alt: 'Blagovaonica' },
  { src: '/media/kitchenTesting2.jpg', alt: 'Kuhinja' },
  { src: '/media/kitcheTestingOutside1.jpg', alt: 'Kuhinjski otok' },
  { src: '/media/livingRoomTesting1.jpg', alt: 'Dnevni boravak' },
]

export default function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const scrollAmount = 420 // širina kartice + gap
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <div className="w-full px-2 sm:px-3  overflow-hidden ">
      <div className="h-full w-full rounded-[2rem] bg-white overflow-hidden">
        <section className="px-3 md:px-6 xl:px-20 pt-20 pb-3 xs:pb-0 sm:py-28 lg:py-32">
          <div className="px-3 md:px-16 lg:px-20 mb-12 flex justify-between items-end">
            <div>
              <p className="text-stone-400 text-xs tracking-[0.3em] uppercase md:mb-4 mb-2">
                Galerija
              </p>
              <h2 className="text-4xl sm:text-4xl md:text-5xl leading-tight tracking-tight font-playfair">
                Prostori koji <span className="text-[#a39e6e]">inspiriraju</span>
              </h2>
            </div>

            {/* Strelice - samo desktop */}
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => scroll('left')}
                className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center hover:border-stone-400 hover:bg-stone-50 transition"
              >
                <ChevronLeft className="w-5 h-5 text-stone-600" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center hover:border-stone-400 hover:bg-stone-50 transition"
              >
                <ChevronRight className="w-5 h-5 text-stone-600" />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto px-8 md:px-16 lg:px-20 pb-4 snap-x snap-mandatory scrollbar-hide overscroll-x-contain touch-auto"
          >
            {images.map((img, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 w-[280px] md:w-[350px] lg:w-[400px] aspect-[3/4] rounded-2xl overflow-hidden snap-start snap-always group cursor-pointer"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 "
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                {/* Label */}
                <div className="absolute bottom-6 left-6">
                  <p className="text-white text-sm font-light">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Swipe hint - samo mobitel */}
          <p className="md:hidden text-center text-stone-400 text-xs mt-2">← Povuci za više →</p>
        </section>
      </div>
    </div>
  )
}
