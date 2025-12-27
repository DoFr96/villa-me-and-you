'use client'
import Image from 'next/image'
import Navbar from './Navbar'
import { FloatingBadges } from './FloatingBadges'

export default function Hero1() {
  return (
    // 1) Hero je točno visine ekrana (100vh) i služi kao referenca za absolute slojeve
    <main className="relative h-screen w-full overflow-hidden">
      {/* Full-bleed background image */}
      <Image
        src="/media/coverTesting.jpg"
        alt="Hero background"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Optional overlay (darken image for contrast) */}
      <div className="absolute inset-0 bg-black/20" />

      {/* This wrapper creates the “distance from image edges” */}
      {/* 4) Content layer: apsolutno preko cijelog hero-a (TOČNO 100vh, ne dodaje visinu stranici) */}
      <div className="absolute inset-0 z-10 p-6 sm:pt-15 sm:pb-20">
        {/* 5) Frame (border box): h-full znači “stani u prostor koji je ostao nakon paddinga” */}
        <div className="relative mx-auto flex h-full  max-w-[1500px] flex-col md:border-1 border-0 rounded-[50px] border-white/70 overflow-visible">
          {/* Make it a column so navbar is on top and content fills remaining space */}

          <div className="flex items-center md:h-[calc(100%-20rem)] flex-col ">
            {/* 6) Navbar je sada unutar okvira */}
            <Navbar />

            {/* 7) Hero content zauzima ostatak visine (flex-1) */}
            <section className="flex flex-1 items-center">
              <div className="w-full px-6 py-20 sm:py-28  sm:px-12 lg:px-20   md:mt-0 mt-10   ">
                <h1 className="relative text-white leading-tight text-5xl sm:text-6xl md:text-7xl  max-w-3xl font-playfair tracking-tight  font-medium text-center text-white md:text-6xl">
                  {/* 
                   <span className="absolute inset-0 -z-10  blur-2xl bg-black/40" />
                  */}
                  Vase Privatno Utociste Mira i
                  <span className="bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent px-1">
                    Luksuza
                  </span>
                </h1>
              </div>
            </section>
          </div>

          <div className="text-white absolute left-1/2 bottom-0 z-30 w-[min(700px,92%)] -translate-x-1/2 translate-y-1/2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl">
            <div className="sm:flex hidden items-center justify-between px-8 py-3">
              <div className="flex items-center gap-12">
                <div className="group cursor-pointer">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-white/50">
                    Dolazak
                  </span>
                  <span className="mt-1 block text-[13px] font-light text-white">
                    Odaberite datum
                  </span>
                </div>

                <div className="h-8 w-px bg-white/20" />

                <div className="group cursor-pointer">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-white/50">
                    Odlazak
                  </span>
                  <span className="mt-1 block text-[13px] font-light text-white">
                    Odaberite datum
                  </span>
                </div>

                <div className="h-8 w-px bg-white/20" />

                <div className="group cursor-pointer">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-white/50">
                    Gosti
                  </span>
                  <span className="mt-1 block text-[13px] font-light text-white">2 gosta</span>
                </div>

                <button className="rounded-full bg-white px-5 py-1.5 text-[12px] font-medium uppercase tracking-[0.15em] text-neutral-900 transition-all duration-300 hover:bg-white/90 hover:scale-[1.02]">
                  Rezerviraj
                </button>
              </div>
            </div>
          </div>

          <div className=" flex flex-1 justify-center items-end md:mb-20 mb-30">
            <p className="text-white font-base text-2xl text-center">
              Romantican bijeg za dvoje. <br className=" " />
              Vikend za dusu.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
