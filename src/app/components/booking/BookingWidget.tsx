'use client'

import { useState, useEffect } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { useRouter } from 'next/navigation'
import { getBookingWidgetData } from '@/lib/booking/api'

const PROPERTY_SLUG = 'villa-me-and-you'

type SeasonRule = {
  startDate: string
  endDate: string
  minStay: number
  pricePerNight: number
}

export function BookingWidget() {
  const router = useRouter()

  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined)
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined)
  const [guests, setGuests] = useState(2)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const [blockedDates, setBlockedDates] = useState<Date[]>([])
  const [maxGuests, setMaxGuests] = useState(10)
  const [defaultMinStay, setDefaultMinStay] = useState(2)
  const [seasonRules, setSeasonRules] = useState<SeasonRule[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBookingWidgetData(PROPERTY_SLUG)
        setBlockedDates(data.blockedDates.map((d) => new Date(d)))
        setMaxGuests(data.maxGuests)
        setDefaultMinStay(data.defaultMinStay)
        setSeasonRules(data.seasonRules)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  function getSeasonForDate(date: Date): SeasonRule | undefined {
    return seasonRules.find((s) => {
      const start = new Date(s.startDate)
      const end = new Date(s.endDate)
      return date >= start && date <= end
    })
  }

  function getMinStayForDate(date: Date): number {
    return getSeasonForDate(date)?.minStay || defaultMinStay
  }

  function getPricePerNightForDate(date: Date): number {
    return getSeasonForDate(date)?.pricePerNight || 0
  }

  function formatDate(date: Date): string {
    return date.toLocaleDateString('hr-HR', {
      day: 'numeric',
      month: 'short',
    })
  }

  function handleDateSelect(date: Date | undefined) {
    if (!date) return

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date)
      setCheckOut(undefined)
    } else {
      if (date > checkIn) {
        const nights = Math.round((date.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
        const minStay = getMinStayForDate(checkIn)

        if (nights < minStay) {
          alert(`Minimalni boravak za ovaj period je ${minStay} noći`)
          return
        }

        const hasBlocked = blockedDates.some((blocked) => blocked > checkIn && blocked < date)
        if (hasBlocked) {
          alert('Odabrani raspon uključuje zauzete datume')
          return
        }

        setCheckOut(date)
        setIsCalendarOpen(false)
      } else {
        setCheckIn(date)
        setCheckOut(undefined)
      }
    }
  }

  function handleSubmit() {
    if (!checkIn || !checkOut) return

    const params = new URLSearchParams({
      propertySlug: PROPERTY_SLUG,
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      guests: guests.toString(),
    })

    router.push(`/checkout?${params}`)
  }

  const nights =
    checkIn && checkOut
      ? Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
      : 0

  const pricePerNight = checkIn ? getPricePerNightForDate(checkIn) : 0
  const currentMinStay = checkIn ? getMinStayForDate(checkIn) : defaultMinStay

  return (
    <div className="relative w-full md:w-auto md:inline-flex">
      <div className="grid grid-cols-3 md:grid-cols-4 p-1 md:p-1.5 border border-stone-200 rounded-full bg-white shadow-sm w-full md:w-auto">
        {/* Check-in */}
        <button
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          className="flex items-center justify-center px-3 md:px-4 py-2 hover:bg-stone-50 rounded-full transition border-r border-stone-200"
        >
          <div className="text-center md:text-left">
            <p className="text-[10px] md:text-[12px] text-stone-400 uppercase tracking-wider">
              Dolazak
            </p>
            <p className="text-xs md:text-sm font-medium text-stone-800">
              {checkIn ? formatDate(checkIn) : 'Datum'}
            </p>
          </div>
        </button>

        {/* Check-out */}
        <button
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          className="flex items-center justify-center px-3 md:px-4 py-2 hover:bg-stone-50 rounded-full transition border-r border-stone-200"
        >
          <div className="text-center md:text-left">
            <p className="text-[10px] md:text-[12px] text-stone-400 uppercase tracking-wider">
              Odlazak
            </p>
            <p className="text-xs md:text-sm font-medium text-stone-800">
              {checkOut ? formatDate(checkOut) : 'Datum'}
            </p>
          </div>
        </button>

        {/* Gosti - hidden on mobile */}
        <div className="hidden md:flex items-center justify-center px-4 py-2">
          <div className="text-center">
            <p className="text-[12px] text-stone-400 uppercase tracking-wider">Gosti</p>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="w-5 h-5 rounded-full bg-stone-100 hover:bg-stone-200 transition text-xs text-stone-600"
              >
                −
              </button>
              <span className="text-sm font-medium text-stone-800 w-3 text-center">{guests}</span>
              <button
                onClick={() => setGuests(Math.min(maxGuests, guests + 1))}
                className="w-5 h-5 rounded-full bg-stone-100 hover:bg-stone-200 transition text-xs text-stone-600"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!checkIn || !checkOut}
          className="flex items-center justify-center px-4 md:px-5 py-2.5 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 disabled:cursor-not-allowed text-white text-[10px] md:text-xs uppercase tracking-wider rounded-full transition"
        >
          Rezerviraj
        </button>
      </div>

      {/* Cijena */}
      {nights > 0 && pricePerNight > 0 && (
        <div className="absolute -bottom-8 md:-bottom-10 left-3 md:left-4 text-sm md:text-base text-stone-500">
          {nights} noći{' '}
          <span className="text-[#a39e6e] font-medium">~{nights * pricePerNight} €</span>
        </div>
      )}

      {/* Calendar dropdown */}
      {isCalendarOpen && (
        <div className="absolute left-0 right-0 md:right-auto bottom-full mb-2 bg-white rounded-2xl shadow-xl border border-stone-100 p-3 md:p-4 z-50">
          {isLoading ? (
            <div className="p-6 md:p-8 text-center text-stone-400">Učitavanje...</div>
          ) : (
            <>
              <Calendar
                mode="single"
                selected={checkOut || checkIn}
                onSelect={handleDateSelect}
                numberOfMonths={1}
                disabled={[{ before: new Date() }, ...blockedDates]}
                modifiers={{
                  booked: blockedDates,
                  range_start: checkIn ? [checkIn] : [],
                  range_end: checkOut ? [checkOut] : [],
                  range_middle: checkIn && checkOut ? { after: checkIn, before: checkOut } : [],
                }}
                modifiersStyles={{
                  booked: {
                    backgroundColor: '#fee2e2',
                    color: '#991b1b',
                    textDecoration: 'line-through',
                  },
                  range_start: { backgroundColor: '#a39e6e', color: 'white', borderRadius: '50%' },
                  range_end: { backgroundColor: '#a39e6e', color: 'white', borderRadius: '50%' },
                  range_middle: { backgroundColor: '#e8e6d9' },
                }}
              />
              <p className="text-[10px] md:text-[11px] text-stone-400 mt-2 md:mt-3 text-center">
                Min. {currentMinStay} noći
              </p>
            </>
          )}
        </div>
      )}
    </div>
  )
}
