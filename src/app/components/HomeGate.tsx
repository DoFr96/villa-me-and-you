// components/HomeGate.tsx
'use client'

import { useState, useEffect } from 'react'
import PageLoader from './PageLoader'
import { AnimatePresence, motion } from 'framer-motion'

export default function HomeGate({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false)
  const [shouldShowLoader, setShouldShowLoader] = useState(true)

  useEffect(() => {
    // 1. Čim se komponenta učita, provjeri session
    const hasVisited = sessionStorage.getItem('home-loader-played')

    if (hasVisited) {
      setShouldShowLoader(false)
    }

    // 2. Dozvoli renderiranje
    setIsHydrated(true)
  }, [])

  // Dok se JS ne učita, renderiraj samo bijeli ekran (nema flickera!)
  if (!isHydrated) {
    return <div className="fixed inset-0 z-[100] bg-white" />
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {shouldShowLoader && (
          <PageLoader
            key="page-loader"
            onComplete={() => {
              sessionStorage.setItem('home-loader-played', 'true')
              setShouldShowLoader(false)
            }}
          />
        )}
      </AnimatePresence>

      {/* Sadržaj stranice - ako loader radi, držimo ga skrivenim ali renderiranim */}
      <div
        className={shouldShowLoader ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}
      >
        {children}
      </div>
    </>
  )
}
