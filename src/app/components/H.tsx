'use client'

import Image from 'next/image'
import Navbar from './Navbar'
import { BookingWidget } from './booking/BookingWidget'

export default function H() {
  return (
    <main className="h-[100svh] w-full p-2 sm:p-3 overflow-hidden">
      <div className="h-full w-full rounded-[2rem] bg-white overflow-hidden flex flex-col">
        <Navbar />

        <div className=" flex-1 flex flex-col md:flex-row">
          {/* LEFT */}
          <div className=" w-full lg:w-1/2 flex flex-col md:gap-10 gap-5 justify-center px-6 md:px-12 lg:px-14 xl:px-20  py-10 md:py-12 ">
            {/* Na manjim ekranima NE raste u visinu (da ne pojede sliku) */}
            <div className="flex flex-col ">
              <p className="text-stone-400 text-xs md:text-sm tracking-[0.3em] uppercase mb-4">
                Istra, Hrvatska
              </p>

              <h1 className="font-serif text-stone-900 leading-[1.05] text-[clamp(3.5rem,4.5vw,5.5rem)]">
                Vaše utočište
                <br />
                <span className="text-[#a39e6e]">mira i luksuza</span>
              </h1>

              <p className="text-stone-500 mt-5 max-w-md font-light leading-relaxed text-[clamp(1.1rem,1.3vw,1.4rem)]">
                Privatna vila s grijanim bazenom, wellness sadržajima i pogledom na istarske
                brežuljke.
              </p>
            </div>

            <div className="sm:mt-6 my-1 ">
              <BookingWidget />
            </div>
          </div>

          {/* RIGHT (IMAGE) */}
          <div className="min-h-0 w-full lg:w-1/2 flex-1 p-3 md:p-4 lg:p-6">
            {/* min-h da nikad ne padne na 0 na tablet/mob */}
            <div className="relative h-full min-h-[220px]  w-full overflow-hidden rounded-2xl bg-stone-100">
              <Image
                src="/media/coverTesting.jpg"
                alt="Villa Me and You"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
