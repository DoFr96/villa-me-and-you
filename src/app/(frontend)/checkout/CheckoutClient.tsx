'use client'

import { useState } from 'react'
import Image from 'next/image'
import { createBooking } from '@/lib/booking/api'
import Link from 'next/link'

type GuestInfo = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  country: string
  notes: string
}

type Props = {
  propertySlug: string
  propertyData: {
    propertyName: string
    propertyCity: string
  }
  priceData: {
    nights: number
    accommodationTotal: number
    cleaningFee: number
    totalPrice: number
    depositAmount: number
    remainingAmount: number
  }
  checkIn: string
  checkOut: string
  guests: number
}

export default function CheckoutClient({
  propertySlug,
  propertyData,
  priceData,
  checkIn,
  checkOut,
  guests,
}: Props) {
  const checkInDate = new Date(checkIn)
  const checkOutDate = new Date(checkOut)

  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    notes: '',
  })
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [newsletter, setNewsletter] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleInputChange(field: keyof GuestInfo, value: string) {
    setGuestInfo((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit() {
    if (!acceptTerms) {
      alert('Morate prihvatiti uvjete korištenja')
      return
    }

    setIsSubmitting(true)

    try {
      const booking = await createBooking({
        propertySlug,
        checkIn,
        checkOut,
        guests,
        guestInfo,
        notes: guestInfo.notes,
      })

      console.log('Booking created:', booking)
      alert(`Rezervacija kreirana! Broj: ${booking.bookingNumber}`)
    } catch (error) {
      console.error('Error:', error)
      alert('Greška pri kreiranju rezervacije')
    } finally {
      setIsSubmitting(false)
    }
  }

  function formatDate(date: Date): string {
    return date.toLocaleDateString('hr-HR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/" className="font-serif text-2xl tracking-wide">
            Villa Me and You
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-stone-500 mb-8">
          <Link href="/" className="hover:text-stone-900 transition">
            Početna
          </Link>
          <span className="mx-2">/</span>
          <span className="text-stone-900">Završetak rezervacije</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* LIJEVA STRANA - Forma */}
          <div className="lg:col-span-3 space-y-10">
            {/* Vaš boravak */}
            <section>
              <h2 className="font-serif text-3xl mb-6">Vaš boravak</h2>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
                <div className="flex gap-6">
                  <div className="w-40 h-28 bg-stone-200 rounded-xl overflow-hidden relative flex-shrink-0">
                    <Image src="/images/villa.jpg" alt="Villa" fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-amber-600 font-medium tracking-wide uppercase mb-1">
                      Privatna vila
                    </p>
                    <h3 className="font-serif text-2xl mb-2">{propertyData.propertyName}</h3>
                    <p className="text-stone-500">{propertyData.propertyCity}, Hrvatska</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mt-6 pt-6 border-t border-stone-100">
                  <div>
                    <p className="text-sm text-stone-500 mb-1">Dolazak</p>
                    <p className="font-medium">{formatDate(checkInDate)}</p>
                    <p className="text-sm text-stone-400">od 15:00</p>
                  </div>
                  <div>
                    <p className="text-sm text-stone-500 mb-1">Odlazak</p>
                    <p className="font-medium">{formatDate(checkOutDate)}</p>
                    <p className="text-sm text-stone-400">do 10:00</p>
                  </div>
                  <div>
                    <p className="text-sm text-stone-500 mb-1">Gosti</p>
                    <p className="font-medium">
                      {guests} {guests === 1 ? 'gost' : guests < 5 ? 'gosta' : 'gostiju'}
                    </p>
                    <p className="text-sm text-stone-400">{priceData.nights} noći</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Osobni podaci */}
            <section>
              <h2 className="font-serif text-3xl mb-6">Osobni podaci</h2>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Ime *</label>
                    <input
                      type="text"
                      value={guestInfo.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-4 py-3 bg-stone-50 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition"
                      placeholder="Ivan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Prezime *
                    </label>
                    <input
                      type="text"
                      value={guestInfo.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-4 py-3 bg-stone-50 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition"
                      placeholder="Horvat"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={guestInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-stone-50 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition"
                      placeholder="ivan@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      value={guestInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 bg-stone-50 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition"
                      placeholder="+385 91 234 5678"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-stone-700 mb-2">Adresa *</label>
                  <input
                    type="text"
                    value={guestInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-4 py-3 bg-stone-50 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition"
                    placeholder="Ulica i kućni broj"
                  />
                </div>

                <div className="grid grid-cols-3 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Grad *</label>
                    <input
                      type="text"
                      value={guestInfo.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-4 py-3 bg-stone-50 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition"
                      placeholder="Zagreb"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Poštanski broj *
                    </label>
                    <input
                      type="text"
                      value={guestInfo.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      className="w-full px-4 py-3 bg-stone-50 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition"
                      placeholder="10000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Država *
                    </label>
                    <select
                      value={guestInfo.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full px-4 py-3 bg-stone-50 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition"
                    >
                      <option value="">Odaberi</option>
                      <option value="HR">Hrvatska</option>
                      <option value="SI">Slovenija</option>
                      <option value="AT">Austrija</option>
                      <option value="DE">Njemačka</option>
                      <option value="IT">Italija</option>
                      <option value="CH">Švicarska</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Posebne želje ili napomene
                  </label>
                  <textarea
                    value={guestInfo.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-stone-50 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition resize-none"
                    placeholder="Npr. kasni dolazak, potreban dječji krevetić..."
                  />
                </div>
              </div>
            </section>

            {/* Način plaćanja */}
            <section>
              <h2 className="font-serif text-3xl mb-6">Način plaćanja</h2>
              <div className="space-y-3">
                <label
                  className={`flex items-center gap-4 p-5 bg-white rounded-2xl border-2 cursor-pointer transition ${
                    paymentMethod === 'card'
                      ? 'border-amber-500 shadow-sm'
                      : 'border-stone-100 hover:border-stone-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="w-5 h-5 text-amber-500 focus:ring-amber-500"
                  />
                  <div className="flex-1">
                    <p className="font-medium">Kreditna kartica</p>
                    <p className="text-sm text-stone-500">Visa, Mastercard, American Express</p>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-4 p-5 bg-white rounded-2xl border-2 cursor-pointer transition ${
                    paymentMethod === 'bank'
                      ? 'border-amber-500 shadow-sm'
                      : 'border-stone-100 hover:border-stone-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'bank'}
                    onChange={() => setPaymentMethod('bank')}
                    className="w-5 h-5 text-amber-500 focus:ring-amber-500"
                  />
                  <div className="flex-1">
                    <p className="font-medium">Bankovna doznaka</p>
                    <p className="text-sm text-stone-500">Plaćanje unaprijed na račun</p>
                  </div>
                </label>
              </div>
            </section>
          </div>

          {/* DESNA STRANA - Sažetak */}
          <div className="lg:col-span-2">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100">
                <h3 className="font-serif text-2xl mb-6">Sažetak rezervacije</h3>

                <div className="space-y-3 pb-6 border-b border-stone-100">
                  <div className="flex justify-between text-stone-600">
                    <span>Smještaj ({priceData.nights} noći)</span>
                    <span>{priceData.accommodationTotal} €</span>
                  </div>
                  {priceData.cleaningFee > 0 && (
                    <div className="flex justify-between text-stone-600">
                      <span>Završno čišćenje</span>
                      <span>{priceData.cleaningFee} €</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between py-6 border-b border-stone-100">
                  <span className="text-lg font-medium">Ukupno</span>
                  <span className="text-2xl font-serif">{priceData.totalPrice} €</span>
                </div>

                <div className="mt-6 p-4 bg-amber-50 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-amber-900">Plaćanje sada (30%)</span>
                    <span className="text-xl font-serif text-amber-900">
                      {priceData.depositAmount} €
                    </span>
                  </div>
                  <p className="text-sm text-amber-700">
                    Ostatak od {priceData.remainingAmount} € plaćate 14 dana prije dolaska.
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-stone-100 space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="mt-0.5 w-5 h-5 rounded text-amber-500 focus:ring-amber-500"
                    />
                    <span className="text-sm text-stone-600">
                      Prihvaćam{' '}
                      <Link href="/terms" className="text-amber-600 hover:underline">
                        uvjete korištenja
                      </Link>
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newsletter}
                      onChange={(e) => setNewsletter(e.target.checked)}
                      className="mt-0.5 w-5 h-5 rounded text-amber-500 focus:ring-amber-500"
                    />
                    <span className="text-sm text-stone-600">
                      Želim primati posebne ponude i novosti
                    </span>
                  </label>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !acceptTerms}
                  className="w-full mt-6 py-4 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-medium rounded-xl transition"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Obrada...
                    </span>
                  ) : (
                    `Plati ${priceData.depositAmount} € i rezerviraj`
                  )}
                </button>

                <p className="text-center text-xs text-stone-400 mt-4">
                  Sigurno plaćanje. Vaši podaci su zaštićeni.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
