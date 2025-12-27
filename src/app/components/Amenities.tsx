import {
  Waves,
  Flame,
  Dog,
  Coffee,
  Wind,
  UtensilsCrossed,
  Thermometer,
  WashingMachine,
} from 'lucide-react'

const amenities = [
  { icon: Waves, label: 'Jacuzzi' },
  { icon: Flame, label: 'Sauna' },
  { icon: Thermometer, label: 'Grijani bazen' },
  { icon: UtensilsCrossed, label: 'Vanjska kuhinja' },
  { icon: Dog, label: 'Pet friendly' },
  { icon: Wind, label: 'Klima & grijanje' },
  { icon: Coffee, label: 'Aparat za kavu' },
  { icon: WashingMachine, label: 'Perilica rublja' },
]

export function Amenities() {
  return (
    <div className="w-full px-2 sm:px-3  overflow-hidden ">
      <div className="h-full w-full rounded-[2rem] bg-white overflow-hidden">
        <section className="px-3 sm:px-12 lg:px-20 pt-20 pb-3 xs:pb-0 sm:py-28 lg:py-32 ">
          <div className="flex gap-8 md:gap-12 overflow-x-auto px-8 md:px-16 lg:px-20 scrollbar-hide">
            {amenities.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-shrink-0">
                <item.icon className="w-6 h-6 text-[#a39e6e]" strokeWidth={1.5} />
                <span className="text-xs text-stone-500 whitespace-nowrap">{item.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
