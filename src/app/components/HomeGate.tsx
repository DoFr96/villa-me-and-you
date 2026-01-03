'use client'

import { useEffect, useRef, useState } from 'react'
import PageLoader from './PageLoader'

export default function HomeWithLoader({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(false)
  const ran = useRef(false)

  useEffect(() => {
    // guard za dev StrictMode (zna okinut effect 2x)
    if (ran.current) return
    ran.current = true

    const key = 'homeLoaderShown'

    // ako je već prikazan u ovom tabu -> ne prikazuj
    const already = sessionStorage.getItem(key)
    if (already) {
      setShowLoader(false)
      return
    }

    // BITNO: upiši ODMAH, ne čekaj kraj animacije
    sessionStorage.setItem(key, '1')
    setShowLoader(true)
  }, [])

  return (
    <>
      {showLoader && <PageLoader onComplete={() => setShowLoader(false)} />}
      {children}
    </>
  )
}
