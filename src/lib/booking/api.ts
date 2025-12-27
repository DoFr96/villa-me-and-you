'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

// ═══════════════════════════════════════════════════════════
// DOHVATI PROPERTY PO SLUG-u
// ═══════════════════════════════════════════════════════════
export async function getPropertyBySlug(slug: string) {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'properties',
    where: {
      slug: { equals: slug },
      status: { equals: 'active' },
    },
    limit: 1,
  })

  return result.docs[0] || null
}

// ═══════════════════════════════════════════════════════════
// DOHVATI SEZONE ZA PROPERTY
// ═══════════════════════════════════════════════════════════
export async function getSeasonsForProperty(propertyId: number) {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'seasons',
    where: {
      property: { equals: propertyId },
      isActive: { equals: true },
    },
    sort: 'startDate',
    depth: 0,
  })

  return result.docs
}

// ═══════════════════════════════════════════════════════════
// DOHVATI BLOKIRANE DATUME
// ═══════════════════════════════════════════════════════════
export async function getBlockedDatesForProperty(propertyId: number) {
  const payload = await getPayload({ config })

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const result = await payload.find({
    collection: 'blocked-dates',
    where: {
      property: { equals: propertyId },
      isActive: { equals: true },
      endDate: { greater_than_equal: today.toISOString() },
    },
    depth: 0,
  })

  return result.docs
}

// ═══════════════════════════════════════════════════════════
// DOHVATI POSTOJEĆE REZERVACIJE
// ═══════════════════════════════════════════════════════════
export async function getBookingsForProperty(propertyId: number) {
  const payload = await getPayload({ config })

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const result = await payload.find({
    collection: 'bookings',
    where: {
      property: { equals: propertyId },
      status: { not_in: ['cancelled', 'no-show'] },
      checkOut: { greater_than_equal: today.toISOString() },
    },
    depth: 0,
  })

  return result.docs
}

// ═══════════════════════════════════════════════════════════
// DOHVATI SVE PODATKE ZA KALENDAR (JEDNA FUNKCIJA)
// ═══════════════════════════════════════════════════════════
export async function getBookingWidgetData(propertySlug: string) {
  const property = await getPropertyBySlug(propertySlug)

  if (!property) {
    throw new Error('Property not found')
  }

  const propertyId = property.id

  const [seasons, blockedDates, bookings] = await Promise.all([
    getSeasonsForProperty(propertyId),
    getBlockedDatesForProperty(propertyId),
    getBookingsForProperty(propertyId),
  ])

  // Generiraj sve blokirane datume kao stringove
  const allBlockedDates: string[] = []

  blockedDates.forEach((blocked) => {
    const start = new Date(blocked.startDate)
    const end = new Date(blocked.endDate)

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      allBlockedDates.push(d.toISOString().split('T')[0])
    }
  })

  bookings.forEach((booking) => {
    const start = new Date(booking.checkIn)
    const end = new Date(booking.checkOut)

    for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
      allBlockedDates.push(d.toISOString().split('T')[0])
    }
  })

  // Vrati SVE sezone s njihovim pravilima
  const seasonRules = seasons.map((s) => ({
    startDate: s.startDate,
    endDate: s.endDate,
    minStay: s.stayRules?.minStay || 2,
    pricePerNight: s.pricing?.pricePerNight || 0,
  }))

  return {
    propertyId,
    propertySlug: property.slug,
    propertyName: property.name,
    propertyCity: property.address?.city || '',
    blockedDates: allBlockedDates,
    maxGuests: property.maxGuests || 10,
    defaultMinStay: property.rules?.minStay || 2,
    seasonRules,
  }
}

// ═══════════════════════════════════════════════════════════
// IZRAČUNAJ CIJENU
// ═══════════════════════════════════════════════════════════
export async function calculatePrice(propertySlug: string, checkIn: string, checkOut: string) {
  const property = await getPropertyBySlug(propertySlug)

  if (!property) {
    throw new Error('Property not found')
  }

  const seasons = await getSeasonsForProperty(property.id)

  const checkInDate = new Date(checkIn)
  const checkOutDate = new Date(checkOut)

  let totalPrice = 0
  let cleaningFee = 0
  const nightlyBreakdown: Array<{ date: string; price: number; isWeekend: boolean }> = []

  const currentDate = new Date(checkInDate)

  while (currentDate < checkOutDate) {
    const dayOfWeek = currentDate.getDay()
    const isFriday = dayOfWeek === 5
    const isSaturday = dayOfWeek === 6

    const season = seasons.find((s) => {
      const start = new Date(s.startDate)
      const end = new Date(s.endDate)
      return currentDate >= start && currentDate <= end
    })

    if (!season) {
      throw new Error(`Nema definirane cijene za datum ${currentDate.toLocaleDateString()}`)
    }

    let nightPrice = season.pricing.pricePerNight

    if (season.pricing.weekendPricing?.enabled) {
      if (season.pricing.weekendPricing.usePercentage) {
        const percentage = season.pricing.weekendPricing.weekendPercentage || 0
        if (isFriday || isSaturday) {
          nightPrice = nightPrice * (1 + percentage / 100)
        }
      } else {
        if (isFriday && season.pricing.weekendPricing.fridayPrice) {
          nightPrice = season.pricing.weekendPricing.fridayPrice
        }
        if (isSaturday && season.pricing.weekendPricing.saturdayPrice) {
          nightPrice = season.pricing.weekendPricing.saturdayPrice
        }
      }
    }

    nightlyBreakdown.push({
      date: currentDate.toISOString().split('T')[0],
      price: nightPrice,
      isWeekend: isFriday || isSaturday,
    })

    totalPrice += nightPrice

    if (cleaningFee === 0 && season.pricing.cleaningFee) {
      cleaningFee = season.pricing.cleaningFee
    }

    currentDate.setDate(currentDate.getDate() + 1)
  }

  const nights = nightlyBreakdown.length
  const grandTotal = totalPrice + cleaningFee
  const depositAmount = Math.round(grandTotal * 0.3)

  return {
    nights,
    nightlyBreakdown,
    accommodationTotal: totalPrice,
    cleaningFee,
    totalPrice: grandTotal,
    depositAmount,
    remainingAmount: grandTotal - depositAmount,
  }
}

// ═══════════════════════════════════════════════════════════
// KREIRAJ REZERVACIJU
// ═══════════════════════════════════════════════════════════
export async function createBooking(data: {
  propertySlug: string
  checkIn: string
  checkOut: string
  guests: number
  guestInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address?: string
    city?: string
    postalCode?: string
    country?: string
  }
  notes?: string
}) {
  const payload = await getPayload({ config })

  const property = await getPropertyBySlug(data.propertySlug)

  if (!property) {
    throw new Error('Property not found')
  }

  const priceData = await calculatePrice(data.propertySlug, data.checkIn, data.checkOut)

  const booking = await payload.create({
    collection: 'bookings',
    data: {
      bookingNumber: `BK-${Date.now()}`,
      property: property.id,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      numberOfGuests: data.guests,
      guestFirstName: data.guestInfo.firstName,
      guestLastName: data.guestInfo.lastName,
      guestEmail: data.guestInfo.email,
      guestPhone: data.guestInfo.phone,
      guestCountry: data.guestInfo.country || '',
      specialRequests: data.notes || '',
      status: 'pending',
      paymentStatus: 'unpaid',
      paymentDetails: {
        totalPrice: priceData.totalPrice,
        depositPercentage: 30,
        depositAmount: priceData.depositAmount,
        remainingAmount: priceData.remainingAmount,
      },
      priceBreakdown: {
        nightlyRates: priceData.nightlyBreakdown.map((n) => ({
          date: n.date,
          price: n.price,
          isWeekend: n.isWeekend,
        })),
        accommodationTotal: priceData.accommodationTotal,
        cleaningFee: priceData.cleaningFee,
      },
    },
  })

  return {
    id: booking.id,
    bookingNumber: booking.bookingNumber,
    totalPrice: priceData.totalPrice,
    depositAmount: priceData.depositAmount,
  }
}
