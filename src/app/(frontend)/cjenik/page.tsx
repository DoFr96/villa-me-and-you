'use client'

import InnerNav from '@/app/components/InnerNav'
import { useState } from 'react'

interface Season {
  name: string
  period: string
  weekdayPrice: number
  weekendPrice: number | null
  minNights: number
  highlight?: boolean
  badge?: string
}

const seasons: Season[] = [
  {
    name: 'Zimska Čarolija',
    period: '10.01 – 30.04',
    weekdayPrice: 190,
    weekendPrice: 210,
    minNights: 2,
    badge: 'Off-Season',
  },
  {
    name: 'Proljetni Bijeg',
    period: '01.05 – 31.05',
    weekdayPrice: 210,
    weekendPrice: 230,
    minNights: 3,
  },
  {
    name: 'Ljetna Idila',
    period: '01.06 – 30.06',
    weekdayPrice: 250,
    weekendPrice: null,
    minNights: 5,
  },
  {
    name: 'Vrhunac Ljeta',
    period: '01.07 – 31.08',
    weekdayPrice: 350,
    weekendPrice: null,
    minNights: 7,
    highlight: true,
    badge: 'Peak Season',
  },
  {
    name: 'Zlatna Jesen',
    period: '01.09 – 30.09',
    weekdayPrice: 250,
    weekendPrice: null,
    minNights: 5,
  },
  {
    name: 'Jesenska Toplina',
    period: '01.10 – 31.10',
    weekdayPrice: 210,
    weekendPrice: 230,
    minNights: 2,
  },
  {
    name: 'Mirna Zima',
    period: '01.11 – 19.12',
    weekdayPrice: 190,
    weekendPrice: 210,
    minNights: 2,
    badge: 'Off-Season',
  },
  {
    name: 'Blagdanska Čarolija',
    period: '20.12 – 09.01',
    weekdayPrice: 230,
    weekendPrice: null,
    minNights: 3,
    highlight: true,
    badge: 'Holidays',
  },
]

export default function PricingTable() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <>
      <section className="relative min-h-screen max-w-7xl mx-auto px-4 py-8 overflow-hidden">
        <InnerNav rightLabel="Galerija" rightHref="/galerija" />
        {/* Subtle background texture */}
        <div
          className="absolute -z-10 inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Decorative gradient orbs */}
        <div className="pointer-events-none absolute top-20 left-10 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#a39e6e]/18 via-[#c8c39a]/10 to-transparent blur-3xl mix-blend-multiply" />

        <div className="pointer-events-none absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-[#8f8a60]/14 via-[#a39e6e]/8 to-transparent blur-3xl mix-blend-multiply" />

        <div className="relative mx-auto max-w-6xl pt-5 md:">
          {/* Header */}
          <div className="text-center mb-20">
            <span className="inline-block text-xs tracking-[0.4em] uppercase text-stone-400 mb-4 font-light">
              Sezonski Cjenik
            </span>
            <h2 className="text-5xl sm:text-6xl md:text-7xl leading-tighter font-playfair text-stone-800 mb-6 font-light tracking-tight">
              Odaberite Svoju
              <span className="block pb-2 mt-2 bg-gradient-to-r from-[#8f8a60] via-[#a39e6e] to-[#b8b37f] bg-clip-text text-transparent">
                Sezonu Bijega
              </span>
            </h2>
            <p className="text-stone-500 mt-5 text-[clamp(1.1rem,1.3vw,1.3rem)] max-w-xl mx-auto text-lg font-light leading-relaxed">
              Svaka sezona donosi jedinstveni doživljaj. Od mirnih zimskih večeri uz jacuzzi do
              sunčanih ljetnih dana uz bazen.
            </p>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {seasons.map((season, index) => (
              <div
                key={season.name}
                className={`flex flex-col group relative rounded-3xl p-6 transition-all duration-500 cursor-pointer shadow-sm 
                ${
                  season.highlight
                    ? 'bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white shadow-2xl shadow-stone-900/20 scale-[1.02]'
                    : 'bg-white/80 backdrop-blur-sm text-stone-800 hover:bg-white hover:shadow-xl hover:shadow-stone-200/50'
                }
              ${hoveredIndex === index ? 'shadow-2xl shadow-stone-300/40 -translate-y-1' : ''}

              `}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Badge */}
                {season.badge && (
                  <span
                    className={`absolute -top-3 left-6 px-3 py-1 text-[10px] tracking-widest uppercase rounded-full
                  ${
                    season.highlight
                      ? 'bg-gradient-to-r from-[#8f8a60] via-secondary to-[#b8b37f] text-white/70 '
                      : 'bg-stone-100 text-stone-500'
                  }`}
                  >
                    {season.badge}
                  </span>
                )}

                {/* Season Name */}
                <h3
                  className={`font-playfair text-xl mb-1 ${season.highlight ? 'text-white' : 'text-stone-800'}`}
                >
                  {season.name}
                </h3>

                {/* Period */}
                <p
                  className={`text-sm mb-6 ${season.highlight ? 'text-stone-400' : 'text-stone-400'}`}
                >
                  {season.period}
                </p>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-4xl font-light ${season.highlight ? 'text-secondary/90' : 'text-stone-800'}`}
                    >
                      {season.weekdayPrice}
                    </span>
                    <span
                      className={`text-lg ${season.highlight ? 'text-stone-400' : 'text-stone-400'}`}
                    >
                      €
                    </span>
                    <span
                      className={`text-sm ${season.highlight ? 'text-stone-500' : 'text-stone-400'}`}
                    >
                      /noć
                    </span>
                  </div>

                  {season.weekendPrice && (
                    <p
                      className={`text-sm mt-1 ${season.highlight ? 'text-stone-400' : 'text-stone-500'}`}
                    >
                      Pet – Sub:{' '}
                      <span className={season.highlight ? 'text-amber-300' : 'text-stone-700'}>
                        {season.weekendPrice}€
                      </span>
                    </p>
                  )}
                </div>

                {/* Min Nights */}
                <div
                  className={`mt-auto flex items-center gap-2 pt-4 border-t ${season.highlight ? 'border-stone-700' : 'border-stone-100'}`}
                >
                  <svg
                    className={`w-4 h-4 ${season.highlight ? 'text-secondary/90' : 'text-secondary'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                  <span
                    className={`text-sm ${season.highlight ? 'text-stone-400' : 'text-stone-500'}`}
                  >
                    Min.{' '}
                    <span className={season.highlight ? 'text-white' : 'text-stone-700'}>
                      {season.minNights}
                    </span>{' '}
                    {season.minNights === 1 ? 'noć' : season.minNights < 5 ? 'noći' : 'noći'}
                  </span>
                </div>

                {/* Hover indicator */}
                <div
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full transition-all duration-300
                ${season.highlight ? 'bg-secondary' : 'bg-stone-200 group-hover:bg-secondary group-hover:w-20'}
                ${hoveredIndex === index && !season.highlight ? 'w-20 bg-secondary' : ''}
              `}
                />
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#A89A68]/10 mb-4">
                  <svg
                    className="w-6 h-6  text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-playfair text-lg text-stone-800 mb-2">Check-in / Check-out</h4>
                <p className="text-stone-500 text-sm leading-relaxed">
                  Check-in od 15:00
                  <br />
                  Check-out do 10:00
                </p>
              </div>

              <div className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#A89A68]/10 mb-4">
                  <svg
                    className="w-6 h-6 text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-playfair text-lg text-stone-800 mb-2">Kapacitet</h4>
                <p className="text-stone-500 text-sm leading-relaxed">
                  Do 3 osoba
                  <br />1 spavaća soba
                </p>
              </div>

              <div className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#A89A68]/10 mb-4">
                  <svg
                    className="w-6 h-6 text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <h4 className="font-playfair text-lg text-stone-800 mb-2">Plaćanje</h4>
                <p className="text-stone-500 text-sm leading-relaxed">
                  30% akontacija pri rezervaciji
                  <br />
                  Ostatak 30 dana prije dolaska
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
