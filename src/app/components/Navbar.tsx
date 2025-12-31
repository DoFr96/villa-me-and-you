import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MobileBottomNav } from './MobileBottomNav'
import { BookingWidget } from './booking/BookingWidget'
import logoImage from '@/../public/media/logo1.png'

const items = ['Home', 'Vila', 'Cjenik', 'Kontakt']

const Navbar = () => {
  return (
    <div className="mx-auto w-full pt-6 md:py-10 px-6 md:px-12 lg:px-14 xl:px-20 flex flex-row items-center justify-between">
      <Link href="/">
        <Image src={logoImage} alt="logoImage" className="h-auto w-[150px] md:w-[200px]" />
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
