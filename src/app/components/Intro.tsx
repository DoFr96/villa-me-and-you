import { Bath, Bed, House, Trees } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Intro = () => {
  return (
    <div className="w-full px-2 sm:px-3  overflow-hidden ">
      <div className="h-full w-full rounded-[2rem] bg-white overflow-hidden">
        <section className=" max-w-[1500px] mx-auto px-3 md:px-6 xl:px-20 pt-20 pb-3 xs:pb-0 sm:py-28 lg:py-32">
          {' '}
          <div className="flex md:flex-row flex-col justify-between gap-20">
            {/*LIJEVA STRANA GORE I DOLE*/}
            <div className="flex-1 flex flex-col justify-center gap-10 px-2 md:order-2">
              {/*CIJELA LIJEVA STRANA GORE*/}
              <div className="flex flex-col  gap-10">
                {/*NASLOV SECTION*/}
                <div className="flex flex-1 flex-col">
                  <span className="text-sm text-black/50 uppercase mb-1 tracking-wider">
                    Zasto Villa you & me
                  </span>
                  <h2 className="text-4xl sm:text-4xl md:text-5xl leading-tight tracking-tight font-playfair">
                    Unikatna villa za <span className="text-[#a39e6e] ">posebne </span> trenutke
                  </h2>
                </div>
                {/*DESCRIPTION SECTION*/}
                <p className="flex items-center font-light text-lg flex-1">
                  Dođite se isključiti iz svijeta i ponovno povezati — jedno s drugim i sa samim
                  sobom. Naša kuća za odmor dizajnirana je za dvoje (i jednu posebnu osobu više)
                </p>
              </div>
              {/*RED ISPOD SECTION*/}
              <div className="flex flex-row justify-between">
                <p className="flex flex-col items-center gap-1">
                  <House className="text-[#a39e6e] " />
                  <span className="font-medium tracking-wide">100m2</span>{' '}
                </p>
                <p className="flex flex-col items-center gap-1">
                  <Trees className="text-[#a39e6e] " />{' '}
                  <span className="font-medium tracking-wide">750m2</span>
                </p>
                <p className="flex flex-col items-center gap-1">
                  <Bed className="text-[#a39e6e] " />{' '}
                  <span className="font-medium tracking-wide">2 + 1</span>
                </p>
                <p className="flex flex-col items-center gap-1">
                  <Bath className="text-[#a39e6e] " />{' '}
                  <span className="font-medium tracking-wide">1.5</span>
                </p>
              </div>
            </div>
            {/*DESNA STRANA*/}
            <div className="relative md:aspect-[5/4] aspect-[5/5] md:w-1/2 w-full rounded-2xl md:order-1">
              <Image
                src="/media/outsideTEsting1.jpg"
                fill
                objectFit="cover"
                alt="health"
                sizes="50vh"
                className="rounded-2xl bg-yellow-200"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Intro
