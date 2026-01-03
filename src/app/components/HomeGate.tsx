'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import PageLoader from './PageLoader'

export default function HomeWithLoader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    // Loader samo na homepage
    if (pathname !== '/') {
      setShowLoader(false)
      return
    }

    // Ako je već prikazan u ovom tabu, ne prikazuj opet
    const alreadyShown = sessionStorage.getItem('homeLoaderShown')
    if (alreadyShown) {
      setShowLoader(false)
      return
    }

    setShowLoader(true)
  }, [pathname])

  const handleComplete = () => {
    sessionStorage.setItem('homeLoaderShown', '1')
    setShowLoader(false)
  }

  return (
    <>
      {showLoader && <PageLoader onComplete={handleComplete} />}
      {children}
    </>
  )
}
