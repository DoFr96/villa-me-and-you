'use client'

const badges = [
  {
    label: 'Indoor jacuzzi',
    topDesktop: '54%',
    leftDesktop: '55%',
    topMobile: '47%',
    leftMobile: '35%',
  },
  {
    label: 'Pet Friendly',
    topDesktop: '59%',
    leftDesktop: '38%',
    topMobile: '52%',
    leftMobile: '71%',
  },
  {
    label: 'Heated swimming pool',
    topDesktop: '61%',
    leftDesktop: '65%',
    topMobile: '65%',
    leftMobile: '45%',
  },
  {
    label: 'Sauna',
    topDesktop: '66%',
    leftDesktop: '50%',
    topMobile: '57%',
    leftMobile: '41%',
  },
]

import { useEffect, useState } from 'react'

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)')
    const update = () => setIsDesktop(media.matches)

    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return isDesktop
}

export function FloatingBadges() {
  const isDesktop = useIsDesktop()

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {badges.map((badge) => (
        <span
          key={badge.label}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-sm text-white backdrop-blur-md"
          style={{
            top: isDesktop ? badge.topDesktop : badge.topMobile,
            left: isDesktop ? badge.leftDesktop : badge.leftMobile,
          }}
        >
          {badge.label}
        </span>
      ))}
    </div>
  )
}
