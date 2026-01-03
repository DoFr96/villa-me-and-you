// components/PageLoader.tsx
'use client'

import { motion, AnimatePresence, useAnimate } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import logoImage from '@/../public/media/logo1.png'

type PageLoaderProps = {
  onComplete?: () => void
}
export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [logoScope, logoAnimate] = useAnimate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!logoScope.current) return
    {
      /*
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
    */
    }

    logoAnimate([
      [logoScope.current, { y: 0 }, { duration: 1.7, ease: [0.16, 1, 0.3, 1] }],
      // [logoScope.current, { y: 0 }, { duration: 0.8 }],
    ])
    const timer = setTimeout(() => {
      setIsLoading(false)
      onComplete?.()
    }, 2000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] bg-white"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
        >
          <motion.div
            ref={logoScope}
            initial={{ y: '100vh', scale: 0.8 }}
            animate={{ y: 0, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 20,
              mass: 1,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Image src={logoImage} alt="logoImage" className="h-auto w-[200px] md:w-[300px]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
