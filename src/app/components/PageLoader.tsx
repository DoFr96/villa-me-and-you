'use client'

import { motion, AnimatePresence, useAnimate } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import logoImage from '@/../public/media/logo1.png'

type PageLoaderProps = {
  onComplete?: () => void
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [logoScope, logoAnimate] = useAnimate()
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (!logoScope.current) return

    logoAnimate([[logoScope.current, { y: 0 }, { duration: 1.7, ease: [0.16, 1, 0.3, 1] }]])

    const timer = setTimeout(() => {
      setShow(false) // ovo triggera exit animaciju
      onComplete?.()
    }, 2000)

    return () => clearTimeout(timer)
  }, [logoAnimate, logoScope, onComplete])

  return (
    <AnimatePresence>
      {show && (
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
            transition={{ type: 'spring', stiffness: 100, damping: 20, mass: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Image src={logoImage} alt="logo" className="h-auto w-[200px] md:w-[300px]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
