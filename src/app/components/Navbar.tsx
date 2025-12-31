'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MobileBottomNav } from './MobileBottomNav'
import { BookingWidget } from './booking/BookingWidget'
import logoImage from '@/../public/media/logo1.png'
import { twMerge } from 'tailwind-merge'
import { AnimatePresence, motion } from 'framer-motion'
const items = ['Home', 'Vila', 'Cjenik', 'Kontakt']

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])
  return (
    <>
      <div className="mx-auto w-full pt-6 md:py-10 px-6 md:px-12 lg:px-14 xl:px-20 flex flex-row items-center justify-between relative z-50">
        <Link href="/">
          <Image src={logoImage} alt="logoImage" className="h-auto w-[150px] md:w-[200px]" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-10">
          {items.map((item, index) => (
            <Link
              key={item}
              href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className="relative text-[18px] text-stone-600 tracking-[0.1em] uppercase font-serif font-medium hover:text-stone-900 transition-colors group flex items-center"
            >
              {item}
              {index !== items.length - 1 && (
                <span className="ml-6 w-1 h-1 bg-[#a39e6e] rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <div className="flex justify-end gap-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="cursor-pointer text-[#a39e6e] hover:text-[#a39e6e]/70 transition"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <line
              x1="3"
              y1="6"
              x2="21"
              y2="6"
              className={twMerge(
                'origin-left transition duration-300',
                isOpen && 'rotate-45 -translate-y-1',
              )}
            />
            <line
              x1="3"
              y1="12"
              x2="21"
              y2="12"
              className={twMerge('transition duration-300', isOpen && 'opacity-0')}
            />
            <line
              x1="3"
              y1="18"
              x2="21"
              y2="18"
              className={twMerge(
                'origin-left transition duration-300',
                isOpen && '-rotate-45 translate-y-1',
              )}
            />
          </svg>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed top-20 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl z-50 lg:hidden overflow-hidden"
            >
              <nav className="flex flex-col items-center gap-4 py-8 px-6">
                {items.map((item) => (
                  <Link
                    key={item}
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-base text-stone-500 tracking-[0.12em] uppercase font-light hover:text-stone-800 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
