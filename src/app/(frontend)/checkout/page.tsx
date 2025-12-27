import { Suspense } from 'react'
import { getBookingWidgetData, calculatePrice } from '@/lib/booking/api'
import CheckoutClient from './CheckoutClient'
import Link from 'next/link'

type SearchParams = {
  propertySlug?: string
  checkIn?: string
  checkOut?: string
  guests?: string
}

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams

  const propertySlug = params.propertySlug || 'villa-me-and-you'
  const checkIn = params.checkIn
  const checkOut = params.checkOut
  const guests = params.guests ? parseInt(params.guests) : 2

  if (!checkIn || !checkOut) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Nedostaju datumi rezervacije</p>
      </div>
    )
  }

  let propertyData = null
  let priceData = null
  let error = null

  try {
    const [availability, price] = await Promise.all([
      getBookingWidgetData(propertySlug),
      calculatePrice(propertySlug, checkIn, checkOut),
    ])

    propertyData = availability
    priceData = price
  } catch (e) {
    error = e instanceof Error ? e.message : 'Greška pri dohvaćanju podataka'
  }

  if (error || !propertyData || !priceData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-2">Greška</p>
          <p className="text-gray-500">{error || 'Nekretnina nije pronađena'}</p>
          <Link href="/" className="text-amber-600 underline mt-4 block">
            Natrag na početnu
          </Link>
        </div>
      </div>
    )
  }

  return (
    <Suspense fallback={<div>Učitavanje...</div>}>
      <CheckoutClient
        propertySlug={propertySlug}
        propertyData={propertyData}
        priceData={priceData}
        checkIn={checkIn}
        checkOut={checkOut}
        guests={guests}
      />
    </Suspense>
  )
}
