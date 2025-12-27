'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { DateRange } from 'react-day-picker'

type BookingCalendarProps = {
  onDateChange?: (range: DateRange | undefined, nights: number) => void
  bookedDates?: Date[]
  minStay?: number
  maxStay?: number
  pricePerNight?: number
}

export function BookingCalendar({
  onDateChange,
  bookedDates = [],
  minStay = 1,
  maxStay = 30,
  pricePerNight = 0,
}: BookingCalendarProps) {
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined)
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined)
  const [error, setError] = useState<string | null>(null)

  function calculateNights(from: Date, to: Date): number {
    const diffTime = to.getTime() - from.getTime()
    return Math.round(diffTime / (1000 * 60 * 60 * 24))
  }

  function handleSelect(date: Date | undefined) {
    if (!date) return
    setError(null)

    // Prvi klik - postavi check-in
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date)
      setCheckOut(undefined)
      if (onDateChange) {
        onDateChange({ from: date, to: undefined }, 0)
      }
      return
    }

    // Drugi klik - postavi check-out
    if (checkIn && !checkOut) {
      // Ako je kliknuti datum prije check-in, zamijeni
      if (date <= checkIn) {
        setCheckIn(date)
        if (onDateChange) {
          onDateChange({ from: date, to: undefined }, 0)
        }
        return
      }

      const nights = calculateNights(checkIn, date)

      // Validacija min/max
      if (nights < minStay) {
        setError(`Minimalni boravak je ${minStay} noći`)
        return
      }

      if (nights > maxStay) {
        setError(`Maksimalni boravak je ${maxStay} noći`)
        return
      }

      // Provjera blokiranih datuma u rasponu
      const hasBlocked = bookedDates.some((blocked) => blocked > checkIn && blocked < date)

      if (hasBlocked) {
        setError('Odabrani raspon uključuje zauzete datume')
        return
      }

      setCheckOut(date)
      if (onDateChange) {
        onDateChange({ from: checkIn, to: date }, nights)
      }
    }
  }

  const numberOfNights = checkIn && checkOut ? calculateNights(checkIn, checkOut) : 0
  const totalPrice = numberOfNights * pricePerNight

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      {/* Header info */}
      <div className="mb-4 pb-4 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">Check-in</p>
            <p className="font-semibold">{checkIn ? checkIn.toLocaleDateString('hr-HR') : '—'}</p>
          </div>
          <div className="text-2xl text-gray-300">→</div>
          <div>
            <p className="text-sm text-gray-500">Check-out</p>
            <p className="font-semibold">{checkOut ? checkOut.toLocaleDateString('hr-HR') : '—'}</p>
          </div>
        </div>

        {numberOfNights > 0 && (
          <div className="mt-4 p-3 bg-amber-50 rounded-lg">
            <div className="flex justify-between">
              <span>{numberOfNights} noći</span>
              {pricePerNight > 0 && <span className="font-bold">{totalPrice} €</span>}
            </div>
          </div>
        )}

        {error && <div className="mt-3 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}
      </div>

      {/* Kalendar */}
      <Calendar
        mode="single"
        selected={checkOut || checkIn}
        onSelect={handleSelect}
        numberOfMonths={2}
        disabled={[{ before: new Date() }, ...bookedDates]}
        modifiers={{
          booked: bookedDates,
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
          range_start: {
            backgroundColor: '#f59e0b',
            color: 'white',
            borderRadius: '50%',
          },
          range_end: {
            backgroundColor: '#f59e0b',
            color: 'white',
            borderRadius: '50%',
          },
          range_middle: {
            backgroundColor: '#fef3c7',
          },
        }}
      />

      {/* Legenda */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 rounded" />
          <span>Zauzeto</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-amber-100 rounded" />
          <span>Odabrano</span>
        </div>
      </div>

      <p className="mt-2 text-xs text-gray-400">
        Min. {minStay} noći • Max. {maxStay} noći
      </p>
    </div>
  )
}
