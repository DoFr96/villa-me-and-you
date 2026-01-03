// components/VillaGallery.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X } from 'lucide-react'
import InnerNav from '@/app/components/InnerNav'
import InfoIcons from '@/app/components/Gallery/InfoIcons'
import Opremljenost from '@/app/components/Gallery/Opremljenost'

interface GalleryProps {
  images: {
    src: string
    alt: string
  }[]
}

export default function Gallery({ images }: GalleryProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isLightboxOpen) overlayRef.current?.focus()
  }, [isLightboxOpen])

  const getRoundedClass = (index: number) => {
    const classes: Record<number, string> = {
      0: 'rounded-tl-2xl rounded-tr-2xl md:rounded-tr-none md:rounded-bl-2xl',
      1: 'rounded-bl-2xl md:rounded-bl-none md:rounded-tr-2xl lg:rounded-tr-none',
      2: 'md:rounded-br-2xl lg:rounded-br-none lg:rounded-tr-2xl',
      3: 'rounded-br-2xl lg:rounded-br-none',
      4: 'lg:rounded-br-2xl',
    }
    return classes[index] || ''
  }

  const getShowMoreClass = (index: number) => {
    if (index === 1) return 'hidden md:flex lg:hidden'
    if (index === 2) return 'flex md:hidden'
    if (index === 3) return 'hidden lg:flex'
    return 'hidden'
  }

  const openLightbox = (id: number) => {
    setCurrentIndex(id)
    setIsLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    document.body.style.overflow = 'auto'
  }

  const goToPrev = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  const goToNext = () => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrev()
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowRight') goToNext()
  }

  return (
    <section className="relative min-h-screen">
      {/* Background orbs */}
      <div className="pointer-events-none absolute top-20 left-10 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-secondary/15 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-secondary/10 to-transparent blur-3xl" />

      {/* Navigation */}
      <InnerNav rightLabel="Cjenik" rightHref="/cjenik" />

      {/* Content wrapper */}
      <div className="relative  md:px-12 lg:px-14 xl:px-20 max-w-[1500px] mx-auto">
        {/* Header */}
        <header className="text-center py-12 md:py-16">
          <span className="inline-block text-xs tracking-[0.4em] uppercase text-stone-400 mb-4 font-light">
            Virtualna Šetnja
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl text-stone-800 mb-6 font-light tracking-tight">
            <span className="font-playfair">Galerija</span>
            <span className="text-secondary"> & </span>
            <span>Info</span>
          </h1>
          <div className="mx-auto max-w-2xl flex items-center justify-center gap-6">
            <span className="hidden sm:block h-[1px] w-12 bg-secondary/50" />
            <p className="text-stone-500 text-lg font-light">
              Zavirite u svaki kutak naše vile i zamislite svoj savršeni odmor.
            </p>
            <span className="hidden sm:block h-[1px] w-12 bg-secondary/50" />
          </div>
        </header>

        {/* Gallery Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 md:grid-rows-2 gap-2 md:gap-3 md:h-[600px]">
          {/* Main image */}
          <div
            className={`col-span-3 md:col-span-2 row-span-1 md:row-span-2 cursor-pointer relative group overflow-hidden aspect-[16/10] md:aspect-auto ${getRoundedClass(0)}`}
            onClick={() => openLightbox(0)}
          >
            <Image
              src={images[0].src}
              alt={images[0].alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
          {/* Other images */}
          {images.slice(1, 6).map((image, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx + 1)}
              className={`relative cursor-pointer group overflow-hidden aspect-square md:aspect-auto md:col-span-2 lg:col-span-1 
                ${idx >= 3 ? 'hidden md:block' : ''}
                ${getRoundedClass(idx + 1)}
              `}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

              {/* Show more overlay */}
              {images.length > 5 && (
                <div
                  className={`absolute inset-0 bg-black/50 flex items-center justify-center text-white ${getShowMoreClass(idx)}`}
                >
                  <span className="text-sm md:text-lg font-medium">
                    +{images.length - 5} fotografija
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info Icons */}
        <InfoIcons />

        {/* Description */}
        <div className="relative max-w-3xl mx-auto text-center py-8">
          <div
            className="pointer-events-none absolute -inset-20 md:-inset-32"
            style={{
              background:
                'radial-gradient(circle, rgba(163,158,110,0.08) 0%, rgba(163,158,110,0.05) 35%, transparent 65%)',
            }}
          />
          <p className="relative text-stone-600 text-lg leading-relaxed font-light">
            Uživajte u vili gdje se tradicija Istre spaja s modernim komforom: istarski kamen,
            masline starije od 300 godina i potpuni mir. Grijani bazen dostupan je od 1.3. do 1.12.,
            a privatni wellness donosi saunu, jacuzzi, ležaljku i tuš — za reset bez izlaska iz
            kuće. Podno grijanje, klime u svakoj prostoriji te TV s Netflixom brinu za udobnost u
            svako doba, dok vas vanjska natkrivena kuhinja zove na duga, opuštena druženja.
          </p>
        </div>

        {/* Opremljenost */}
        <Opremljenost />
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col"
            onKeyDown={handleKeyDown}
            ref={overlayRef}
            tabIndex={0}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 text-white w-full max-w-5xl mx-auto">
              <span className="text-sm font-light tabular-nums">
                {currentIndex + 1} / {images.length}
              </span>
              <button
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                onClick={closeLightbox}
              >
                <X size={24} />
              </button>
            </div>

            {/* Main Image with swipe */}
            <div className="relative flex-1 flex items-center justify-center px-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.3}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 80) goToPrev()
                    else if (info.offset.x < -80) goToNext()
                  }}
                  className="relative w-full h-full max-w-6xl max-h-[70vh] cursor-grab active:cursor-grabbing"
                >
                  <Image
                    src={images[currentIndex].src}
                    alt={images[currentIndex].alt}
                    fill
                    priority
                    className="object-contain pointer-events-none"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnails */}
            <div className="p-4">
              <div className="flex gap-2 justify-center overflow-x-auto pb-2 pt-2 scrollbar-hide snap-x snap-mandatory">
                {images.map((image, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative flex-shrink-0 w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden snap-center transition-all
                      ${
                        currentIndex === idx
                          ? 'ring-2 ring-white ring-offset-2 ring-offset-black opacity-100'
                          : 'opacity-40 hover:opacity-70'
                      }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image src={image.src} alt={image.alt} fill className="object-cover" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
