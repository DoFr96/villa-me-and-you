'use client'

import { useState } from 'react'
import { BookingCalendar } from './BookingCalendar'
import { DateRange } from 'react-day-picker'

type GuestInfo = {
  firstName: string
  lastName: string
  email: string
  phone: string
}

type BookingFormProps = {
  propertyName: string
  pricePerNight: number
  bookedDates?: Date[]
  minStay?: number
  maxGuests?: number
  onSubmit: (data: {
    dateRange: DateRange
    guests: number
    guestInfo: GuestInfo
    totalPrice: number
  }) => void
}

export function BookingForm({
  propertyName,
  pricePerNight,
  bookedDates = [],
  minStay = 1,
  maxGuests = 10,
  onSubmit,
}: BookingFormProps) {
  const [step, setStep] = useState(1)
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
  const [nights, setNights] = useState(0)
  const [guests, setGuests] = useState(2)
  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })

  const totalPrice = nights * pricePerNight
  const depositAmount = Math.round(totalPrice * 0.3)

  function handleDateChange(range: DateRange | undefined, nightCount: number) {
    setDateRange(range)
    setNights(nightCount)
  }

  function handleInputChange(field: keyof GuestInfo, value: string) {
    setGuestInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  function canProceed(): boolean {
    switch (step) {
      case 1:
        return nights >= minStay
      case 2:
        return guests >= 1 && guests <= maxGuests
      case 3:
        return (
          guestInfo.firstName.trim() !== '' &&
          guestInfo.lastName.trim() !== '' &&
          guestInfo.email.includes('@') &&
          guestInfo.phone.trim() !== ''
        )
      default:
        return true
    }
  }

  function handleSubmit() {
    if (!dateRange?.from || !dateRange?.to) return

    onSubmit({
      dateRange,
      guests,
      guestInfo,
      totalPrice,
    })
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {['Datumi', 'Gosti', 'Podaci', 'Potvrda'].map((label, index) => (
            <span
              key={label}
              className={`text-sm ${step > index ? 'text-amber-600' : 'text-gray-400'}`}
            >
              {label}
            </span>
          ))}
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-amber-500 rounded-full transition-all"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Datumi */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Odaberite datume</h2>
          <BookingCalendar
            bookedDates={bookedDates}
            minStay={minStay}
            pricePerNight={pricePerNight}
            onDateChange={handleDateChange}
          />
        </div>
      )}

      {/* Step 2: Gosti */}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Broj gostiju</h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Gosti</p>
                <p className="text-sm text-gray-500">Maksimalno {maxGuests}</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-10 h-10 rounded-full border border-gray-300 hover:border-gray-400 transition text-xl"
                >
                  -
                </button>
                <span className="text-2xl font-bold w-8 text-center">{guests}</span>
                <button
                  onClick={() => setGuests(Math.min(maxGuests, guests + 1))}
                  className="w-10 h-10 rounded-full border border-gray-300 hover:border-gray-400 transition text-xl"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Podaci gosta */}
      {step === 3 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Vaši podaci</h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ime *</label>
                <input
                  type="text"
                  value={guestInfo.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition"
                  placeholder="Ivan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prezime *</label>
                <input
                  type="text"
                  value={guestInfo.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition"
                  placeholder="Horvat"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                value={guestInfo.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition"
                placeholder="ivan@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefon *</label>
              <input
                type="tel"
                value={guestInfo.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition"
                placeholder="+385 91 234 5678"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Potvrda */}
      {step === 4 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Potvrdite rezervaciju</h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
            <div className="pb-4 border-b border-gray-100">
              <p className="text-sm text-gray-500">Nekretnina</p>
              <p className="font-bold text-lg">{propertyName}</p>
            </div>

            <div className="flex justify-between pb-4 border-b border-gray-100">
              <div>
                <p className="text-sm text-gray-500">Check-in</p>
                <p className="font-medium">{dateRange?.from?.toLocaleDateString('hr-HR')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Check-out</p>
                <p className="font-medium">{dateRange?.to?.toLocaleDateString('hr-HR')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Noći</p>
                <p className="font-medium">{nights}</p>
              </div>
            </div>

            <div className="pb-4 border-b border-gray-100">
              <p className="text-sm text-gray-500">Gost</p>
              <p className="font-medium">
                {guestInfo.firstName} {guestInfo.lastName}
              </p>
              <p className="text-sm text-gray-600">{guestInfo.email}</p>
              <p className="text-sm text-gray-600">{guestInfo.phone}</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>
                  {pricePerNight} € × {nights} noći
                </span>
                <span>{totalPrice} €</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-100">
                <span>Ukupno</span>
                <span>{totalPrice} €</span>
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl p-4 mt-4">
              <p className="font-medium text-amber-800">Kapara (30%): {depositAmount} €</p>
              <p className="text-sm text-amber-700">
                Ostatak od {totalPrice - depositAmount} € plaćate 14 dana prije dolaska.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 transition"
          >
            ← Natrag
          </button>
        ) : (
          <div />
        )}

        {step < 4 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
            className="px-8 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full font-medium transition"
          >
            Nastavi →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium transition"
          >
            Potvrdi i plati {depositAmount} €
          </button>
        )}
      </div>
    </div>
  )
}
