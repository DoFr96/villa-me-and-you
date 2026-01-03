// components/Gallery/InfoIcons.tsx
import React from 'react'
import { House, Trees, Bed, Bath, Waves } from 'lucide-react'
import { WellnessIcon } from '@/app/components/icons/AmenitiesIcons'

const stats = [
  { icon: House, label: 'Objekt', value: '100m²' },
  { icon: Trees, label: 'Okućnica', value: '750m²' },
  { icon: Bed, label: 'Spavaće', value: '2 + 1' },
  { icon: Bath, label: 'Kupaonice', value: '1.5' },
  { icon: Waves, label: 'Bazen', value: '24m²' },
  { icon: WellnessIcon, label: 'Wellness', value: 'Da', highlight: true },
]

const InfoIcons = () => {
  return (
    <section className="py-5 md:py-10 border-y border-stone-100 my-8 md:my-10">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-y-8 gap-x-4">
        {stats.map(({ icon: Icon, label, value, highlight }) => (
          <div key={label} className="flex flex-col items-center gap-3 group">
            <Icon
              size={24}
              strokeWidth={1.5}
              className="text-secondary transition-transform duration-300 group-hover:-translate-y-1"
            />
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-[0.15em] text-stone-400">
                {label}
              </span>
              <span
                className={`font-medium tracking-wide ${highlight ? 'text-secondary' : 'text-stone-800'}`}
              >
                {value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default InfoIcons
