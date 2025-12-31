// components/PageLoader.tsx
'use client'

import { motion, AnimatePresence, useAnimate } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import logoImage from '@/../public/media/logo1.png'

export default function PageLoader2() {
  const [logoScope, logoAnimate] = useAnimate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const width = window.innerWidth

    let targetX, targetY

    if (width < 768) {
      // Mobile
      targetX = -100
      targetY = -350
    } else if (width < 1024) {
      // Tablet
      targetX = -150
      targetY = -390
    } else {
      // Desktop
      targetX = -420
      targetY = -360
    }

    const totalTime = 2
    const moveDuration = 0.8
    const holdDuration = totalTime - moveDuration

    logoAnimate([
      [logoScope.current, { opacity: 1 }, { duration: holdDuration }],
      [logoScope.current, { y: targetY, x: targetX }, { duration: moveDuration }],
    ])
    const timer = setTimeout(() => setIsLoading(false), (totalTime - 0.2) * 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 bg-neutral-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <div className="relative h-full">
            <motion.div
              ref={logoScope}
              initial={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <Image src={logoImage} alt="logoImage" className="h-auto w-[200px] md:w-[300px]" />
            </motion.div>
          </div>

          {/* Jednostavan pulsing dot */}
          {/*
            
               <Image src="/media/logo1.png" alt="logo" width={140} className="h-auto" />
          <motion.div
            className="h-4 w-4 rounded-full bg-white"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          />  */}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
