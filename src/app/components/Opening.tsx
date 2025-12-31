'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type Props = {
  logoSrc: string
  logoWidth?: number
  logoHeight?: number
  totalMs?: number
  oncePerSession?: boolean
}

export default function Opening({
  logoSrc,
  logoWidth = 900,
  logoHeight = 220,
  totalMs = 2800,
  oncePerSession = true,
}: Props) {
  const reduceMotion = useReducedMotion()

  // KLJUČNO: mounted state za hydration fix
  const [mounted, setMounted] = useState(false)
  const [show, setShow] = useState(false)
  const [phase, setPhase] = useState<'logo' | 'reveal' | 'done'>('logo')

  // Prvo čekamo mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Tek nakon mounta provjeravamo sessionStorage i pokrećemo animaciju
  useEffect(() => {
    if (!mounted) return
    if (reduceMotion) return

    if (oncePerSession) {
      const seen = sessionStorage.getItem('luxury_unfold_seen')
      if (seen) return
      sessionStorage.setItem('luxury_unfold_seen', '1')
    }

    setShow(true)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const revealTimer = setTimeout(() => setPhase('reveal'), 1200)
    const doneTimer = setTimeout(() => {
      setShow(false)
      document.body.style.overflow = prev
    }, totalMs)

    return () => {
      clearTimeout(revealTimer)
      clearTimeout(doneTimer)
      document.body.style.overflow = prev
    }
  }, [mounted, reduceMotion, totalMs, oncePerSession])

  // Ne renderiramo ništa dok se ne mountamo (spriječava hydration mismatch)
  if (!mounted) return null
  if (reduceMotion) return null

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
        >
          {/* Pozadina */}
          <div className="absolute inset-0 bg-[#0a0a09]" />

          {/* Suptilna tekstura - grain */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Ambient light - topla zlatna */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-[radial-gradient(ellipse_at_center,rgba(212,189,120,0.08)_0%,transparent_70%)]" />
          </motion.div>

          {/* Gornji panel - curtain */}
          <motion.div
            className="absolute left-0 top-0 h-[50.5%] w-full origin-top"
            style={{
              background: 'linear-gradient(180deg, #111110 0%, #0a0a09 100%)',
              boxShadow: '0 2px 40px rgba(0,0,0,0.5)',
            }}
            initial={{ y: 0 }}
            animate={
              phase === 'reveal'
                ? {
                    y: '-102%',
                    transition: {
                      duration: 1.1,
                      ease: [0.76, 0, 0.24, 1],
                    },
                  }
                : {}
            }
          >
            {/* Zlatna linija na rubu */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[1px]"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(212,189,120,0.4) 50%, transparent 100%)',
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            />
          </motion.div>

          {/* Donji panel - curtain */}
          <motion.div
            className="absolute left-0 bottom-0 h-[50.5%] w-full origin-bottom"
            style={{
              background: 'linear-gradient(0deg, #111110 0%, #0a0a09 100%)',
              boxShadow: '0 -2px 40px rgba(0,0,0,0.5)',
            }}
            initial={{ y: 0 }}
            animate={
              phase === 'reveal'
                ? {
                    y: '102%',
                    transition: {
                      duration: 1.1,
                      ease: [0.76, 0, 0.24, 1],
                    },
                  }
                : {}
            }
          >
            {/* Zlatna linija na rubu */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[1px]"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(212,189,120,0.4) 50%, transparent 100%)',
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            />
          </motion.div>

          {/* Logo container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{
                opacity: phase === 'reveal' ? 0 : 1,
                y: phase === 'reveal' ? -30 : 0,
                scale: phase === 'reveal' ? 1.02 : 1,
              }}
              transition={{
                opacity: { duration: 0.6, ease: 'easeOut', delay: phase === 'reveal' ? 0 : 0.2 },
                y: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: phase === 'reveal' ? 0 : 0.2 },
                scale: {
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: phase === 'reveal' ? 0 : 0.2,
                },
              }}
            >
              {/* Glow layer - iza loga */}
              <motion.div
                className="absolute inset-0 -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.6] }}
                transition={{
                  duration: 1.4,
                  times: [0, 0.5, 1],
                  delay: 0.5,
                  ease: 'easeInOut',
                }}
              >
                <div
                  className="absolute inset-[-50%] blur-3xl"
                  style={{
                    background:
                      'radial-gradient(ellipse at center, rgba(212,189,120,0.15) 0%, transparent 70%)',
                  }}
                />
              </motion.div>

              {/* Logo */}
              <motion.div
                animate={{
                  filter: [
                    'drop-shadow(0 0 0px rgba(212,189,120,0))',
                    'drop-shadow(0 0 20px rgba(212,189,120,0.3))',
                    'drop-shadow(0 0 8px rgba(212,189,120,0.15))',
                  ],
                }}
                transition={{
                  duration: 1.6,
                  times: [0, 0.4, 1],
                  delay: 0.4,
                  ease: 'easeOut',
                }}
              >
                <Image
                  src={logoSrc}
                  alt="Logo"
                  width={logoWidth}
                  height={logoHeight}
                  priority
                  className="h-auto w-[min(680px,80vw)] select-none"
                />
              </motion.div>

              {/* Tagline */}
              <motion.p
                className="mt-6 text-center text-[11px] tracking-[0.35em] uppercase text-[#d4bd78]/60 font-light"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
              >
                Exclusive Holiday Retreat
              </motion.p>
            </motion.div>
          </div>

          {/* Blokira interakciju */}
          <div className="absolute inset-0 pointer-events-auto" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
