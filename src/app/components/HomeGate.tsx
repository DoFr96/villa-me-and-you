'use client'

import { useEffect, useState } from 'react'
import PageLoader from '../components/PageLoader'

export default function HomeGate({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState<boolean | null>(null)

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('hasSeenLoader')
    setShowLoader(!hasSeen)
  }, [])

  if (showLoader === null) {
    // spriječi flash dok ne pročitamo sessionStorage
    return <div className="min-h-screen bg-white" />
  }

  if (showLoader) {
    return (
      <PageLoader
        onComplete={() => {
          sessionStorage.setItem('hasSeenLoader', '1')
          setShowLoader(false)
        }}
      />
    )
  }

  return <>{children}</>
}
