import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MobileBottomNav } from './MobileBottomNav'
import { BookingWidget } from './booking/BookingWidget'

const items = ['Home', 'Vila', 'Cjenik', 'Kontakt']

const Navbar = () => {
  return (
    <div className="mx-auto w-full pt-6 md:py-10 px-6 md:px-12 lg:px-14 xl:px-20 flex flex-row items-center justify-between">
      <Link href="/">
        <Image
          src="/media/logo1.png"
          alt="Villa Me and You"
          width={140}
          height={30}
          priority
          className="h-auto w-auto md:block hidden"
        />
        <Image
          src="/media/logo1.png"
          alt="Villa Me and You"
          width={160}
          height={40}
          priority
          className="h-auto  md:hidden block"
        />
      </Link>

      <div className="hidden  lg:flex items-center gap-10">
        {items.map((item, index) => (
          <Link
            key={item}
            href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
            className="relative text-[18px] text-stone-600 tracking-[0.1em] uppercase font-serif font-medium hover:text-stone-900  transition-colors group flex items-center"
          >
            {item}
            {index !== items.length - 1 && (
              <span className="ml-6 w-1 h-1 bg-[#a39e6e] rounded-full" />
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Navbar
