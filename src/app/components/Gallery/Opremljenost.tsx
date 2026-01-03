// components/Gallery/Opremljenost.tsx
import React from 'react'
import {
  Clock,
  Wifi,
  Tv,
  Snowflake,
  Coffee,
  UtensilsCrossed,
  Refrigerator,
  WashingMachine,
  Flame,
  CigaretteOff,
  Shirt,
  ShowerHead,
  Wind,
  Microwave,
  Layers,
} from 'lucide-react'
import {
  GrillIcon,
  SaunaIcon,
  WellnessIcon,
  HairdryerIcon,
  RobeIcon,
  TowelIcon,
} from '@/app/components/icons/AmenitiesIcons'

const columns = [
  {
    title: 'Dolazak & Info',
    items: [
      { icon: Clock, text: 'Ulaz: od 15:00h' },
      { icon: Clock, text: 'Izlaz: do 10:00h' },
      { icon: Wifi, text: 'Besplatan Wi-Fi' },
      { icon: CigaretteOff, text: 'Zabranjeno pušenje' },
    ],
  },
  {
    title: 'Generalno',
    items: [
      { icon: Snowflake, text: 'Klima uređaj' },
      { icon: Flame, text: 'Podno grijanje' },
      { icon: Tv, text: 'Smart TV & Netflix' },
      { icon: WashingMachine, text: 'Perilica rublja' },
      { icon: GrillIcon, text: 'Vanjska kuhinja' },
    ],
  },
  {
    title: 'Kuhinja',
    items: [
      { icon: Coffee, text: 'Aparat za kavu' },
      { icon: Refrigerator, text: 'Hladnjak & Zamrzivač' },
      { icon: UtensilsCrossed, text: 'Perilica posuđa' },
      { icon: Microwave, text: 'Pećnica & Mikrovalna' },
    ],
  },
  {
    title: 'Kupaonica',
    items: [
      { icon: TowelIcon, text: 'Ručnici' },
      { icon: HairdryerIcon, text: 'Sušilo za kosu' },
    ],
  },
  {
    title: 'Wellness',
    items: [
      { icon: WellnessIcon, text: 'Jacuzzi' },
      { icon: SaunaIcon, text: 'Sauna' },
      { icon: ShowerHead, text: 'Tuš' },
      { icon: RobeIcon, text: 'Ogrtači' },
    ],
  },
]

const Opremljenost = () => {
  return (
    <section className="py-16">
      {/* Header */}
      <div className="mb-12">
        <span className="text-xs uppercase tracking-[0.3em] text-stone-400 font-medium">
          Opremljenost
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12">
        {columns.map((column) => (
          <div key={column.title} className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-widest text-stone-400 mb-6 pb-2 border-b border-stone-100">
              {column.title}
            </h4>
            {column.items.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-stone-600 group">
                <Icon
                  size={18}
                  strokeWidth={1.5}
                  className="text-secondary flex-shrink-0 transition-colors group-hover:text-secondary/70"
                />
                <span className="text-sm">{text}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Opremljenost
