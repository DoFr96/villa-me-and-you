'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X } from 'lucide-react'
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
  const [direction, setDirection] = useState(0) // 1 za naprijed, -1 za natrag

  const overlayRef = useRef<HTMLDivElement>(null)
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Fokus na overlay za accessibility
  useEffect(() => {
    if (isLightboxOpen) overlayRef.current?.focus()
  }, [isLightboxOpen])

  // Sinkronizacija thumbnail trake
  useEffect(() => {
    if (isLightboxOpen && thumbnailRefs.current[currentIndex]) {
      thumbnailRefs.current[currentIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }
  }, [currentIndex, isLightboxOpen])

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
    setDirection(-1)
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  // ... (getRoundedClass i getShowMoreClass ostaju isti)
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

  return (
    <section>
      <InnerNav rightLabel="Cjenik" rightHref="/cjenik" />

      {/* Header sekcija */}
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

      {/* Grid Galerija */}
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
            className="fixed inset-0 bg-black/95 z-[100] flex flex-col"
            ref={overlayRef}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') goToPrev()
              if (e.key === 'ArrowRight') goToNext()
              if (e.key === 'Escape') closeLightbox()
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 text-white w-full">
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

            {/* Main Image - Poboljšan Swipe dio */}
            {/* Main Image Container */}
            <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={{
                    enter: (direction: number) => ({
                      x: direction > 0 ? '100%' : '-100%',
                      opacity: 0,
                    }),
                    center: {
                      x: 0,
                      opacity: 1,
                      zIndex: 1,
                    },
                    exit: (direction: number) => ({
                      x: direction < 0 ? '100%' : '-100%',
                      opacity: 0,
                      zIndex: 0,
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  // Koristimo 'tween' umjesto 'spring' za glađi osjećaj bez odskoka
                  transition={{
                    x: { type: 'tween', duration: 0.3, ease: 'easeInOut' },
                    opacity: { duration: 0.2 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragEnd={(_, info) => {
                    const swipe = info.offset.x
                    const threshold = 50
                    if (swipe > threshold) goToPrev()
                    else if (swipe < -threshold) goToNext()
                  }}
                  // VAŽNO: fiksiramo element da ne "šeće"
                  className="absolute inset-0 flex items-center justify-center p-4 touch-none"
                >
                  <div className="relative w-full h-full max-w-6xl max-h-[75vh]">
                    <Image
                      src={images[currentIndex].src}
                      alt={images[currentIndex].alt}
                      fill
                      priority
                      className="object-contain pointer-events-none" // pointer-events-none sprečava browser ghosting slike
                      sizes="(max-width: 768px) 100vw, 80vw"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnail Strip */}
            <div className="p-4 bg-black/50 backdrop-blur-md">
              <div className="flex gap-2 justify-start overflow-x-auto pb-2 pt-2 scrollbar-hide">
                {images.map((image, idx) => (
                  <motion.button
                    key={idx}
                    ref={(el) => (thumbnailRefs.current[idx] = el)}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1)
                      setCurrentIndex(idx)
                    }}
                    className={`relative flex-shrink-0 w-20 h-14 md:w-24 md:h-16 rounded-lg transition-all duration-300
                      ${
                        currentIndex === idx
                          ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-105 opacity-100'
                          : 'opacity-40 hover:opacity-75'
                      }`}
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
  )
}
