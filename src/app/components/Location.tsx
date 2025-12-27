'use client'
import { MapPin, Coffee, ShoppingBag, UtensilsCrossed, Car } from 'lucide-react'

const nearbyPlaces = [
  { icon: Coffee, label: 'Kafić', distance: '3.3 km' },
  { icon: ShoppingBag, label: 'Market', distance: '3.3 km' },
  { icon: UtensilsCrossed, label: 'Restoran', distance: '3.3 km' },
]

const destinations = [
  { name: 'Rovinj', distance: '23 km', time: '25 min' },
  { name: 'Fažana', distance: '25 km', time: '25 min' },
  { name: 'Pula Arena', distance: '28 km', time: '30 min' },
  { name: 'Poreč', distance: '35 km', time: '35 min' },
  { name: 'Motovun', distance: '40 km', time: '40 min' },
]

export default function Location() {
  return (
    <div className="w-full px-2 sm:px-3  overflow-hidden ">
      <div className="h-full w-full rounded-[2rem] bg-white overflow-hidden">
        <section className="px-6 md:px-12 lg:px-20 py-20 md:py-32 overflow-hidden">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
              <div>
                <p className="text-stone-400 text-xs tracking-[0.3em] uppercase mb-2">Lokacija</p>
                <h2 className="text-4xl text-stone-900 sm:text-4xl md:text-5xl leading-tight tracking-tight font-playfair">
                  Svetvinčenat, <span className="text-[#a39e6e]">Istra</span>
                </h2>
              </div>
              <p className="text-stone-500 font-light max-w-md lg:text-right">
                Smješteni u srcu Istre, idealna polazna točka za istraživanje najljepših gradova
                poluotoka.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Lijevo - Mapa placeholder */}
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[250px] md:min-h-[300px] rounded-2xl overflow-hidden bg-stone-100 w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11264.285234679045!2d13.8721!3d45.0361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477cd2de9b0f7e97%3A0x400ad50862bd490!2s52342%2C%20Svetvin%C4%8Denat!5e0!3m2!1sen!2shr!4v1703612800000!5m2!1sen!2shr"
                  className="absolute inset-0 w-full h-full border-0 grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Desno - Distances */}
              <div className="flex flex-col justify-center">
                {/* Nearby */}
                <div className="mb-12">
                  <p className="text-xs text-stone-400 uppercase tracking-wider mb-6">U blizini</p>
                  <div className="flex gap-8">
                    {nearbyPlaces.map((place, i) => (
                      <div key={i} className="flex flex-col items-center text-center">
                        <place.icon className="w-5 h-5 text-[#a39e6e] mb-2" strokeWidth={1.5} />
                        <span className="text-sm text-stone-600">{place.label}</span>
                        <span className="text-xs text-stone-400">{place.distance}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Destinations */}
                <div>
                  <p className="text-xs text-stone-400 uppercase tracking-wider mb-6">
                    Istražite Istru
                  </p>
                  <div className="space-y-4">
                    {destinations.map((dest, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-3 border-b border-stone-100 last:border-0"
                      >
                        <span className="font-medium text-stone-800">{dest.name}</span>
                        <div className="flex items-center gap-4 text-sm text-stone-400">
                          <span>{dest.distance}</span>
                          <div className="flex items-center gap-1">
                            <Car className="w-3.5 h-3.5" />
                            <span>{dest.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>{' '}
    </div>
  )
}
