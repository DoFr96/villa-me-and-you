// components/VillaGallery.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Navbar from '@/app/components/Navbar'
import Link from 'next/link'
import InnerNav from '@/app/components/InnerNav'

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

  // Zadnja vidljiva slika po breakpointu
  const getShowMoreClass = (index: number) => {
    if (index === 1) return 'hidden md:flex lg:hidden' // tablet - 2. slika (zadnja od 2)
    if (index === 2) return 'flex md:hidden' // mobile - 3. slika (zadnja od 3)
    if (index === 3) return 'hidden lg:flex' // desktop - 5. slika (zadnja od 5)
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

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrev()
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowRight') goToNext()
  }

  return (
    <>
      <section>
        <InnerNav rightLabel="Cjenik" rightHref="/cjenik" />
        {/* Breadcrumb */}

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-black/50 mb-2 block mt-8">
            Virtualna Šetnja
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-playfair text-stone-800 mb-4 font-light tracking-tight">
            Galerija
          </h1>
          <div className="flex items-center gap-6">
            <div className="w-12 h-[2px] bg-secondary" />
            <p className="text-stone-500 max-w-lg text-lg font-light">
              Zavirite u svaki kutak naše vile i zamislite svoj savršeni odmor.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 grid-rows-2 gap-2 md:gap-3 md:h-[600px]">
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
            <div className="group-hover:bg-black/10 transition-colors duration-300 absolute inset-0" />
          </div>
          {images.slice(1, 6).map((image, imageId) => (
            <div
              key={imageId}
              onClick={() => openLightbox(imageId + 1)}
              className={`relative cursor-pointer group overflow-hidden aspect-square md:aspect-auto md:col-span-2 lg:col-span-1 
              ${imageId >= 3 ? 'hidden md:block' : ''}
              ${getRoundedClass(imageId + 1)}
            `}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="group-hover:bg-black/10 transition-colors duration-300 absolute inset-0" />
              {/* Vidi više overlay */}
              {images.length > 5 && (
                <div
                  className={`absolute inset-0 bg-black/50 flex items-center justify-center text-white ${getShowMoreClass(imageId)}`}
                >
                  <span className=" text-sm md:text-lg font-medium">
                    +{images.length - 5} fotografija
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Fullscreen Lightbox */}
        <AnimatePresence>
          {isLightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 flex flex-col "
              onKeyDown={handleKeyDown}
              ref={overlayRef}
              tabIndex={0}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 text-white w-full max-w-5xl mx-auto ">
                <span className="text-sm font-light">
                  {currentIndex + 1} / {images.length}
                </span>

                <button
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  onClick={closeLightbox}
                >
                  <X size={24} />
                </button>
              </div>
              {/* Main Image */}
              <div className="relative flex-1 flex items-center justify-center px-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full max-w-6xl max-h-[70vh]"
                  >
                    <Image
                      src={images[currentIndex].src}
                      alt={images[currentIndex].src}
                      fill
                      priority
                      className="object-contain"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* Thumbnail Strip */}
              <div className="p-4">
                <div className="flex gap-2 justify-center overflow-x-auto pb-2 pt-2 scrollbar-hide">
                  {images.map((image, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative flex-shrink-0 w-20 h-14 md:w-24 md:h-16 rounded-lg
  ${currentIndex === idx ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : 'opacity-50 hover:opacity-75'}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="relative w-full h-full overflow-hidden rounded-lg">
                        <Image src={image.src} alt={image.alt} fill className="object-cover" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  )
}
