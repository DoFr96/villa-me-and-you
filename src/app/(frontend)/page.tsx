import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'
import { BookingCalendar } from '../components/booking/BookingCalendar'
import { BookingWidget } from '../components/booking/BookingWidget'
import Hero from '../components/Hero'
import Intro from '../components/Intro'
import Gallery from '../components/Gallery'
import Location from '../components/Location'
import { Amenities } from '../components/Amenities'
import Contact from '../components/Contact'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <>
      {/* samo za homepage postavi boju overscrola / safe-area */}
      <style>{`:root { --page-bg: #a39e6e; }`}</style>

      {/* traka gore (ispod notcha) */}
      <div
        className="fixed inset-x-0 top-0 z-[9999] h-[env(safe-area-inset-top)]"
        style={{ background: 'var(--page-bg)' }}
      />

      {/* da sadržaj ne uđe pod notch */}
      <div className="pt-[env(safe-area-inset-top)]">
        <section>
          <Hero />
          <Intro />
          <Gallery />
          <Location />
          <Contact />
        </section>
      </div>
    </>
  )
}
