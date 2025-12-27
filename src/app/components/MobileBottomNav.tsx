import Link from 'next/link'
import { Home, Euro, Info, Phone } from 'lucide-react'

export function MobileBottomNav() {
  return (
    <nav className="md:hidden fixed bottom-10 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-2 rounded-2xl px-1 bg-gray-500/30 backdrop-blur-md">
        {/* Objekt */}
        <Link href="/object" className="flex flex-col items-center px-3 py-1 text-sm text-white/80">
          <Info size={18} />
          Objekt
        </Link>

        {/* Home – aktivni */}
        <Link
          href="/"
          className="flex items-center gap-1 rounded-full bg-yellow-300/80 px-5 py-3 text-sm font-medium text-white"
        >
          <Home size={18} />
          Home
        </Link>

        {/* Cijena */}
        <Link
          href="/pricing"
          className="flex flex-col items-center px-3 py-1 text-sm text-white/80"
        >
          <Euro size={18} />
          Cijena
        </Link>

        {/* Kontakt */}
        <Link
          href="/contact"
          className="flex flex-col items-center px-3 py-1  text-sm text-white/80"
        >
          <Phone size={18} />
          Kontakt
        </Link>
      </div>
    </nav>
  )
}
